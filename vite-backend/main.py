from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pdfplumber
import io
import re

app = FastAPI()

# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Home route
@app.get("/")
def home():
    return {"message": "Backend running successfully"}

# Upload PDF route

@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):

    try:

        contents = await file.read()

        transactions = []

        with pdfplumber.open(io.BytesIO(contents)) as pdf:

            for page in pdf.pages:

                text = page.extract_text()

                if text:

                    lines = text.split("\n")

                    for line in lines:

                        line = line.strip()

                        # Skip short lines
                        if len(line) < 15:
                            continue

                        # Match date format
                        date_match = re.match(r"\d{2}\s\w{3}\s\d{2}", line)

                        if date_match:

                            date = date_match.group()

                            # Remove date from line
                            remaining = line[len(date):].strip()

                            parts = remaining.split()

                            if len(parts) >= 2:

                                balance = parts[-1]
                                amount = parts[-2]

                                description = " ".join(parts[:-2])

                                # Default category
                                category = "Others"

                                desc_lower = description.lower()

                                # Food
                                if "swiggy" in desc_lower or "zomato" in desc_lower:
                                    category = "Food"

                                # Shopping
                                elif "amazon" in desc_lower or "flipkart" in desc_lower:
                                    category = "Shopping"

                                # Travel
                                elif "uber" in desc_lower or "ola" in desc_lower:
                                    category = "Travel"

                                # Subscription
                                elif "netflix" in desc_lower or "spotify" in desc_lower:
                                    category = "Subscription"

                                # ATM
                                elif "atm" in desc_lower:
                                    category = "Cash Withdrawal"

                                # Salary
                                elif "salary" in desc_lower:
                                    category = "Income"

                                transactions.append({
                                    "date": date,
                                    "description": description,
                                    "amount": amount,
                                    "balance": balance,
                                    "category": category
                                })

        return {
            "transactions": transactions
        }

    except Exception as e:

        return {
            "error": str(e)
        }