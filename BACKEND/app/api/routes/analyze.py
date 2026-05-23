from fastapi import APIRouter
from app.services.analytics import analyze_transactions

router = APIRouter()

@router.post("/")
def analyze(data: dict):
    text = data.get("text", "")
    return analyze_transactions(text)