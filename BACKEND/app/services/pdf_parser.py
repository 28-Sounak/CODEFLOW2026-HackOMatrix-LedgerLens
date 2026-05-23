import io
from PyPDF2 import PdfReader

def parse_pdf(file_bytes: bytes) -> str:
    pdf = PdfReader(io.BytesIO(file_bytes))
    text = ""

    for page in pdf.pages:
        text += page.extract_text() or ""

    return text