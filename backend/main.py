from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
import json
import io
from typing import Dict, List, Optional
import PyPDF2
from pdf2image import convert_from_bytes
import pytesseract
from PIL import Image
from openai import OpenAI
from pydantic import BaseModel
from dotenv import load_dotenv
from fastapi import Response

load_dotenv()

app = FastAPI(title="Food Allergen & Nutrition Extractor")

# CORS configuration for Vercel frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your Vercel domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Response model
class ExtractionResult(BaseModel):
    allergens: Dict[str, bool]
    nutritional_values: Dict[str, Optional[str]]
    raw_text_preview: str
    processing_method: str


def extract_text_from_pdf(pdf_file_bytes: bytes) -> tuple[str, str]:
    """
    Extract text from PDF. Try text extraction first, fall back to OCR.
    Returns: (extracted_text, method_used)
    """
    try:
        # Try standard PDF text extraction
        pdf_reader = PyPDF2.PdfReader(io.BytesIO(pdf_file_bytes))
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text() + "\n"
        
        # If we got substantial text, return it
        if len(text.strip()) > 100:
            return text, "text_extraction"
        
        # Otherwise, fall back to OCR
        return extract_text_with_ocr(pdf_file_bytes), "ocr"
    
    except Exception as e:
        # If text extraction fails, try OCR
        try:
            return extract_text_with_ocr(pdf_file_bytes), "ocr"
        except Exception as ocr_error:
            raise HTTPException(
                status_code=500,
                detail=f"Failed to extract text: {str(e)}, OCR error: {str(ocr_error)}"
            )


def extract_text_with_ocr(pdf_file_bytes: bytes) -> str:
    """
    Extract text from scanned PDF using OCR.
    """
    try:
        # Convert PDF to images
        images = convert_from_bytes(pdf_file_bytes, dpi=300)
        
        text = ""
        for i, image in enumerate(images):
            # Perform OCR on each page
            page_text = pytesseract.image_to_string(image, lang='eng+hun')
            text += f"\n--- Page {i+1} ---\n{page_text}\n"
        
        return text
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"OCR processing failed: {str(e)}"
        )


def extract_data_with_openai(text: str) -> Dict:
    """
    Use OpenAI GPT-4 to extract allergens and nutritional values.
    """
    try:
        prompt = f"""
You are an expert food safety analyst. Extract allergen information and nutritional values from the following product description text. The text may be in multiple languages. Try Hungarian first then English, then others.

ALLERGENS TO CHECK (return true if present, false if not present or not mentioned):
- Gluten
- Egg
- Crustaceans
- Fish
- Peanut
- Soy
- Milk
- Tree nuts
- Celery
- Mustard

NUTRITIONAL VALUES TO EXTRACT (per 100g or per serving, include units):
- Energy (kcal or kJ)
- Fat (g)
- Carbohydrate (g)
- Sugar (g)
- Protein (g)
- Sodium (mg or g)

Return ONLY a valid JSON object with this exact structure:
{{
  "allergens": {{
    "gluten": true/false,
    "egg": true/false,
    "crustaceans": true/false,
    "fish": true/false,
    "peanut": true/false,
    "soy": true/false,
    "milk": true/false,
    "tree_nuts": true/false,
    "celery": true/false,
    "mustard": true/false
  }},
  "nutritional_values": {{
    "energy": "value with unit or null",
    "fat": "value with unit or null",
    "carbohydrate": "value with unit or null",
    "sugar": "value with unit or null",
    "protein": "value with unit or null",
    "sodium": "value with unit or null"
  }}
}}

If a value is not found, use null. Translate all Hungarian or other language terms to English in your analysis.

TEXT TO ANALYZE:
{text[:4000]}
"""

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a food safety data extraction expert. Always respond with valid JSON only."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.1,
            max_tokens=1000
        )
        
        # Parse the JSON response
        result_text = response.choices[0].message.content.strip()
        
        # Remove markdown code blocks if present
        if result_text.startswith("```json"):
            result_text = result_text[7:]
        if result_text.startswith("```"):
            result_text = result_text[3:]
        if result_text.endswith("```"):
            result_text = result_text[:-3]
        
        result = json.loads(result_text.strip())
        return result
    
    except json.JSONDecodeError as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to parse OpenAI response as JSON: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"OpenAI API error: {str(e)}"
        )


@app.get("/")
def read_root():
    return {
        "message": "Food Allergen & Nutrition Extractor API",
        "version": "1.0.0",
        "endpoints": {
            "/extract": "POST - Upload PDF file for extraction"
        }
    }

# Accept HEAD on "/" explicitly
@app.head("/")
def read_root_head():
    return Response(status_code=200)


@app.get("/health")
def health_check():
    """Health check endpoint for Render"""
    return {"status": "healthy"}

# Accept HEAD on "/health" explicitly
@app.head("/health")
def health_head():
    return Response(status_code=200)

@app.post("/extract", response_model=ExtractionResult)
async def extract_allergens_and_nutrition(file: UploadFile = File(...)):
    """
    Extract allergens and nutritional values from uploaded PDF.
    """
    # Validate file type
    if not file.filename.endswith('.pdf'):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are supported"
        )
    
    try:
        # Read file content
        pdf_content = await file.read()
        
        # Extract text from PDF
        extracted_text, method = extract_text_from_pdf(pdf_content)
        
        if not extracted_text.strip():
            raise HTTPException(
                status_code=400,
                detail="Could not extract any text from the PDF"
            )
        
        # Use OpenAI to extract structured data
        extracted_data = extract_data_with_openai(extracted_text)
        
        # Prepare response
        return ExtractionResult(
            allergens=extracted_data.get("allergens", {}),
            nutritional_values=extracted_data.get("nutritional_values", {}),
            raw_text_preview=extracted_text[:500] + "..." if len(extracted_text) > 500 else extracted_text,
            processing_method=method
        )
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Processing error: {str(e)}"
        )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)