def analyze_transactions(text: str):
    # SIMPLE MVP LOGIC (replace ML later)
    lines = text.split("\n")

    income = 0
    expense = 0

    for line in lines:
        if "credit" in line.lower():
            income += 100
        if "debit" in line.lower():
            expense += 50

    return {
        "total_income": income,
        "total_expense": expense,
        "net": income - expense,
        "transactions_count": len(lines)
    }