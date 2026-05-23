def generate_insights(analysis):

    suggestions = []

    if analysis["savings_percent"] < 20:
        suggestions.append("Increase savings to at least 20%")

    if analysis["category_breakdown"].get("Food", 0) > analysis["total_expense"] * 0.3:
        suggestions.append("Reduce food expenses")

    if analysis["category_breakdown"].get("Shopping", 0) > analysis["total_expense"] * 0.3:
        suggestions.append("Control shopping spending")

    return {
        "financial_health": "Good" if analysis["savings_percent"] > 20 else "Needs Improvement",
        "suggestions": suggestions
    }