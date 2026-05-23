from fastapi import APIRouter, UploadFile, File
from app.services.pdf_parser import parse_pdf
from app.services.analytics import analyze_transactions

router = APIRouter()

@router.post("/")
async def upload_file(file: UploadFile = File(...)):
    content = await file.read()

    text = parse_pdf(content)
    result = analyze_transactions(text)

    return {
        "filename": file.filename,
        "analysis": result
    }