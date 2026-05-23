import pdfplumber
import pandas as pd


def parse_file(file_path):

    if file_path.endswith(".csv"):
        df = pd.read_csv(file_path)
        return df.to_dict(orient="records")

    transactions = []

    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            text = page.extract_text()

            if text:
                for line in text.split("\n"):
                    transactions.append({
                        "description": line,
                        "amount": extract_amount(line)
                    })

    return transactions


def extract_amount(text):
    nums = [float(s) for s in text.split() if s.replace(".", "").isdigit()]
    return nums[-1] if nums else 0