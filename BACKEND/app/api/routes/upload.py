from fastapi import APIRouter, UploadFile, File
import os

from app.services.pdf_parser import parse_file
from app.services.analytics import analyze_transactions

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/")
async def upload_file(file: UploadFile = File(...)):

    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as f:
        f.write(await file.read())

    transactions = parse_file(file_path)
    analysis = analyze_transactions(transactions)

    return {
        "filename": file.filename,
        "transactions": transactions,
        "analysis": analysis
    }