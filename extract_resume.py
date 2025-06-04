from docx import Document
import json

def extract_resume_info(docx_path):
    doc = Document(docx_path)
    content = []
    
    for para in doc.paragraphs:
        if para.text.strip():
            content.append(para.text.strip())
    
    # Process the content to extract structured information
    # This is a basic extraction - you might need to adjust based on your resume's structure
    resume_data = {
        'full_text': '\n'.join(content),
        'education': [],
        'experience': [],
        'skills': []
    }
    
    # Add more sophisticated parsing here based on your resume's structure
    
    return resume_data

if __name__ == "__main__":
    resume_path = r"C:\Users\Supermen\Desktop\ab resume\Boris-Mojsa-Resume novi.docx"
    data = extract_resume_info(resume_path)
    print("Extracted resume data:")
    print(json.dumps(data, indent=2))
