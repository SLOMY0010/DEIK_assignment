# 📖 User Manual - Food Allergen & Nutrition Extractor

## Getting Started

Welcome to the Food Allergen & Nutrition Extractor! This application helps you automatically extract allergen information and nutritional values from food product PDF documents.

## How to Use

### Step 1: Access the Application
Open your web browser and navigate to the application URL.

### Step 2: Upload Your PDF

You have two options to upload your PDF:

#### Option A: Drag and Drop
1. Find your PDF file on your computer
2. Drag the file to the upload area on the page
3. Drop the file when the area highlights

#### Option B: File Selector
1. Click the "Select PDF File" button
2. Browse your computer for the PDF file
3. Click "Open" to select the file

### Step 3: Start Extraction
Once your file is selected:
1. You'll see the filename and file size displayed
2. Click the "Extract Data" button
3. Wait while the application processes your document (this may take 10-30 seconds)

### Step 4: View Results

After processing, you'll see three sections:

#### 🚨 Allergens Section
- Shows all 10 allergens checked
- **Red boxes with ⚠️**: Allergen is PRESENT in the product
- **Green boxes with ✓**: Allergen is NOT detected

Allergens checked:
- Gluten
- Egg
- Crustaceans
- Fish
- Peanut
- Soy
- Milk
- Tree Nuts
- Celery
- Mustard

#### 📊 Nutritional Values Section
- Displays nutritional information found in the document
- Shows values with units (g, kcal, mg, etc.)
- "Not found" appears if information wasn't detected

Nutritional values extracted:
- Energy
- Fat
- Carbohydrate
- Sugar
- Protein
- Sodium

#### 📝 Text Preview Section
- Shows a preview of the extracted text
- Helps verify what the system read from your document

### Step 5: Download or Upload New File

After viewing results, you can:

**📥 Download JSON**: Click to download a JSON file containing all extracted data for your records or further processing.

**⬆️ Upload New File**: Click to return to the upload screen and process another document.

## Supported Documents

### PDF Types
- ✅ **Text-based PDFs**: Documents with selectable text
- ✅ **Scanned PDFs**: Image-based PDFs (uses OCR technology)
- ✅ **Mixed PDFs**: Documents containing both text and images

### Languages
- ✅ English
- ✅ Hungarian
- ✅ Other European languages
- ✅ Multilingual documents (mixed languages in one document)

**Note**: All output will be in English regardless of input language.

### Document Formats
- ✅ Tables
- ✅ Lists
- ✅ Paragraphs
- ✅ Mixed layouts

## Tips for Best Results

### 1. Document Quality
- Use clear, high-resolution scans for scanned PDFs
- Ensure text is readable and not too small
- Avoid heavily degraded or damaged documents

### 2. File Preparation
- File size: Keep under 10MB for best performance
- Format: Only PDF files are supported
- Pages: Works with single or multi-page documents

### 3. Information Completeness
The system can only extract information that exists in the document:
- If allergens aren't mentioned, they'll show as "Not detected"
- If nutritional values are missing, they'll show as "Not found"
- Partial information is normal and expected

## Understanding Results

### Processing Methods

You'll see one of two processing methods:

**📄 Text Extraction**
- Used for text-based PDFs
- Faster processing
- More accurate for structured documents

**🔍 OCR (Scanned PDF)**
- Used for image-based PDFs
- Takes longer to process
- Accuracy depends on scan quality

### Allergen Detection

**"Present"**: The AI detected this allergen in the document
**"Not detected"**: The allergen was not mentioned or found

⚠️ **Important**: Always verify results with original documents. This tool is designed to assist, not replace, human verification.

### Nutritional Values

Values are shown with their units as they appear in the document:
- Energy: Usually in kcal or kJ
- Others: Usually in grams (g) or milligrams (mg)
- Per 100g or per serving (as specified in document)

## Common Issues & Solutions

### Issue: Upload Failed
**Solutions:**
- Check file is PDF format
- Verify file size is under 10MB
- Try refreshing the page

### Issue: Processing Takes Too Long
**Solutions:**
- Wait up to 60 seconds for complex documents
- Check your internet connection
- Try a smaller or simpler PDF

### Issue: Incorrect or Missing Data
**Possible Causes:**
- Information not present in original document
- Poor scan quality for scanned PDFs
- Unusual document layout
- Text is too small or blurry

**Solutions:**
- Verify information exists in original document
- Try a better quality scan
- Check the text preview to see what was extracted

### Issue: Can't Download JSON
**Solutions:**
- Check browser allows downloads
- Try different browser
- Disable popup blockers temporarily

## Privacy & Security

- PDF files are processed securely
- Files are not stored permanently
- Data is only processed during your session
- Use secure internet connection for sensitive documents

## Technical Requirements

### Browser Support
- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- Mobile browsers supported

### Internet Connection
- Stable internet connection required
- Minimum 1 Mbps recommended
- Faster connection = faster processing

## FAQ

**Q: How long does processing take?**
A: Usually 10-30 seconds depending on document complexity and type.

**Q: Can I upload multiple files at once?**
A: No, please process one file at a time.

**Q: Is my data stored?**
A: No, files and results are not permanently stored.

**Q: What if the system makes an error?**
A: Always verify results against original documents. This is an assistance tool, not a replacement for human verification.

**Q: Can I use this for product labeling?**
A: This tool is for information extraction only. Always follow official food labeling regulations and verify all information.

**Q: Why did some values show as "Not found"?**
A: The information may not be in the document, or the layout made it difficult to extract.

## Support

If you encounter persistent issues:
1. Check this manual for solutions
2. Verify your document meets requirements
3. Try a different document to isolate the issue
4. Contact your system administrator

## Best Practices

1. **Always verify** extracted data against original documents
2. **Keep originals** - Don't rely solely on extracted data
3. **Check completeness** - Review all sections after extraction
4. **Download results** - Save JSON for your records
5. **Quality matters** - Better quality PDFs = better results

---

Thank you for using the Food Allergen & Nutrition Extractor! 🍽️