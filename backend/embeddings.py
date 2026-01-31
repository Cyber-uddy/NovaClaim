from sentence_transformers import SentenceTransformer
import numpy as np

# Load local model (all-MiniLM-L6-v2 is lightweight and efficient)
model = SentenceTransformer('all-MiniLM-L6-v2')

def generate_embeddings(texts: list) -> np.ndarray:
    """
    Generates semantic embeddings for a list of cleaned strings.
    """
    return model.encode(texts, show_progress_bar=False)