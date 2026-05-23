import re


def clean_text(text: str):
    return re.sub(r"\s+", " ", text).strip()


def is_number(value):
    try:
        float(value)
        return True
    except:
        return False