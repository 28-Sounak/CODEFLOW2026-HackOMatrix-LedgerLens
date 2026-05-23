from fastapi import APIRouter
from app.services.insights import generate_insights

router = APIRouter()

@router.get("/")
def insights():
    return generate_insights()