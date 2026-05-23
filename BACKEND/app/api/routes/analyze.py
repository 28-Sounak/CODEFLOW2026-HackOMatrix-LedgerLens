from fastapi import APIRouter
from app.services.analytics import analyze_transactions

router = APIRouter()


@router.post("/")
def analyze(transactions: list):
    return analyze_transactions(transactions)