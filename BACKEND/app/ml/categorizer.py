import numpy as np
from app.ml.embeddings import get_embedding
from app.ml.categories import CATEGORIES


category_vectors = {
    cat: get_embedding(" ".join(keywords))
    for cat, keywords in CATEGORIES.items()
}


def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))


def categorize(text: str):

    text_vec = get_embedding(text)

    best_cat = "Other"
    best_score = -1

    for cat, vec in category_vectors.items():
        score = cosine_similarity(text_vec, vec)

        if score > best_score:
            best_score = score
            best_cat = cat

    return best_cat