import pandas as pd
from io import StringIO
from .schemas import AbstractItem

def process_csv_upload(file_content: str):
    df = pd.read_csv(StringIO(file_content))
    # Basic validation
    required = ['id', 'title', 'abstract']
    if not all(col in df.columns for col in required):
        raise ValueError("Missing required columns: id, title, abstract")
    return df.to_dict('records')