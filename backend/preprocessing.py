import spacy
import nltk
from nltk.corpus import stopwords

# Ensure resources are available
try:
    nlp = spacy.load("en_core_web_sm")
except:
    import subprocess
    subprocess.run(["python", "-m", "spacy", "download", "en_core_web_sm"])
    nlp = spacy.load("en_core_web_sm")

nltk.download('stopwords')
STOP_WORDS = set(stopwords.words('english'))

def clean_text(text: str) -> str:
    """
    Cleans text by removing stopwords, punctuation, and performing lemmatization.
    """
    doc = nlp(text.lower())
    tokens = [
        token.lemma_ for token in doc 
        if not token.is_stop and not token.is_punct and token.text not in STOP_WORDS
    ]
    return " ".join(tokens)