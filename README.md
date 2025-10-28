# 🍽️ Food Allergen & Nutrition Extractor

An intelligent web application that automatically extracts allergen information and nutritional values from food product PDF documents using AI.

## 🌟 Features

- **PDF Support**: Handles both text-based and scanned (image) PDFs
- **Multilingual**: Supports English, Hungarian, and other languages
- **AI-Powered**: Uses OpenAI GPT-4 for intelligent data extraction
- **Automatic OCR**: Scanned PDFs are processed using Tesseract OCR
- **Modern UI**: Beautiful dark blue and yellow themed interface
- **JSON Export**: Download extracted data in JSON format

## 📋 Extracted Data

### Allergens
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

### Nutritional Values
- Energy (kcal/kJ)
- Fat (g)
- Carbohydrate (g)
- Sugar (g)
- Protein (g)
- Sodium (mg/g)

## 🏗️ Technology Stack

### Backend
- **FastAPI**: High-performance Python web framework
- **PyPDF2**: PDF text extraction
- **pdf2image + Tesseract**: OCR for scanned PDFs
- **OpenAI GPT-4**: AI-powered data extraction
- **Uvicorn**: ASGI server

### Frontend
- **React 18**: Modern UI library
- **Axios**: HTTP client
- **CSS3**: Custom styling with animations

## 📦 Installation

### Prerequisites
- Python 3.11+
- Node.js 18+
- Tesseract OCR (for local development)
- OpenAI API key

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Install Tesseract OCR:
- **Ubuntu/Debian**: `sudo apt-get install tesseract-ocr poppler-utils`
- **macOS**: `brew install tesseract poppler`
- **Windows**: Download from https://github.com/UB-Mannheim/tesseract/wiki

5. Create `.env` file:
```bash
cp .env.example .env
```

6. Add your OpenAI API key to `.env`:
```
OPENAI_API_KEY=sk-your-key-here
```

7. Run the server:
```bash
uvicorn main:app --reload
```

Backend will run at `http://localhost:8000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your backend URL:
```
REACT_APP_API_URL=http://localhost:8000
```

5. Start development server:
```bash
npm start
```

Frontend will run at `http://localhost:3000`

## 🚀 Deployment

### Backend Deployment (Render)

1. Create a new Web Service on Render
2. Connect your repository
3. Configure:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Add environment variable:
   - `OPENAI_API_KEY`: Your OpenAI API key
5. **Important**: Add system dependencies in Render dashboard:
   - Go to Environment → Native Environment
   - Add: `tesseract-ocr poppler-utils`
   
   OR use the included `render.yaml` for automatic configuration.

6. Deploy!

### Frontend Deployment (Vercel)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Navigate to frontend directory:
```bash
cd frontend
```

3. Deploy:
```bash
vercel
```

4. Add environment variable in Vercel dashboard:
   - `REACT_APP_API_URL`: Your Render backend URL

5. Redeploy for environment variable to take effect

## 📡 API Documentation

### Endpoints

#### `GET /`
Health check and API information

#### `GET /health`
Service health status

#### `POST /extract`
Extract allergens and nutritional values from PDF

**Request:**
- Content-Type: `multipart/form-data`
- Body: PDF file

**Response:**
```json
{
  "allergens": {
    "gluten": true,
    "egg": false,
    ...
  },
  "nutritional_values": {
    "energy": "250 kcal",
    "fat": "10g",
    ...
  },
  "raw_text_preview": "Product description...",
  "processing_method": "text_extraction" or "ocr"
}
```

## 🔧 Configuration

### Backend Environment Variables
- `OPENAI_API_KEY`: Your OpenAI API key (required)

### Frontend Environment Variables
- `REACT_APP_API_URL`: Backend API URL (required)

## 🛠️ Troubleshooting

### OCR Not Working
- Ensure Tesseract is installed: `tesseract --version`
- Check poppler is installed: `pdftoppm -v`
- On Render, verify system dependencies are configured

### CORS Errors
- Verify backend CORS settings include your frontend domain
- Check `REACT_APP_API_URL` is correct

### OpenAI API Errors
- Verify API key is valid
- Check you have sufficient credits
- Ensure you're using a model you have access to

## 📄 License

This project is created for educational purposes.

## 🤝 Support

For issues and questions, please check the documentation or create an issue in the repository.