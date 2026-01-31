import os
import pandas as pd

STORAGE_PATH = "data_store.csv"

def save_to_csv(data: list):
    df = pd.DataFrame(data)
    df.to_csv(STORAGE_PATH, index=False)

def load_from_csv():
    if os.path.exists(STORAGE_PATH):
        return pd.read_csv(STORAGE_PATH)
    return pd.DataFrame()