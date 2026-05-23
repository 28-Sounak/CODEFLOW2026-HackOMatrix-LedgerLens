from fastapi import APIRouter
from app.services.insights import generate_insights

router = APIRouter()


@router.get("/")
def insights():
    dummy_analysis = {
        "total_income": 50000,
        "total_expense": 32000,
        "savings_percent": 36,
        "category_breakdown": {
            "Food": 8000,
            "Travel": 4000
        }
    }

    return generate_insights(dummy_analysis)