from app.ml.categorizer import categorize


def analyze_transactions(transactions):

    income = 0
    expense = 0
    breakdown = {}

    for t in transactions:

        desc = t.get("description", "")
        amount = float(t.get("amount", 0))

        category = categorize(desc)

        if category == "Income":
            income += amount
        else:
            expense += amount

        breakdown[category] = breakdown.get(category, 0) + amount

    savings = income - expense
    savings_percent = (savings / income * 100) if income > 0 else 0

    return {
        "total_income": income,
        "total_expense": expense,
        "savings": savings,
        "savings_percent": savings_percent,
        "category_breakdown": breakdown
    }