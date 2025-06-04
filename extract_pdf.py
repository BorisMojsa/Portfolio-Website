import PyPDF2
import json

def extract_text_from_pdf(pdf_path):
    text = ""
    try:
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            for page in reader.pages:
                text += page.extract_text() + "\n\n"
    except Exception as e:
        print(f"Error reading PDF: {e}")
    return text

# Path to the PDF file
pdf_path = r"C:\Users\Supermen\Downloads\Boris Mojsa_ Track and Field Career Overview.pdf"

# Extract text from PDF
extracted_text = extract_text_from_pdf(pdf_path)

# Print the extracted text
print("=== EXTRACTED TEXT ===")
print(extracted_text)

# Save to a text file for reference
with open("track_field_overview.txt", "w", encoding="utf-8") as f:
    f.write(extracted_text)

print("\nText has been saved to track_field_overview.txt")
