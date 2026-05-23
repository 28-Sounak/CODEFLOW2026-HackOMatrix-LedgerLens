from pydantic import BaseModel
from typing import List, Dict, Optional


class Transaction(BaseModel):
    date: Optional[str] = None
    description: str
    amount: float
    type: Optional[str] = None  # debit/credit


class AnalysisResponse(BaseModel):
    total_income: float
    total_expense: float
    savings: float
    savings_percent: float
    category_breakdown: Dict[str, float]