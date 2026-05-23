def categorize(text: str):
    text = text.lower()

    if "food" in text:
        return "Food"
    if "rent" in text:
        return "Rent"
    if "salary" in text:
        return "Income"

    return "Other"