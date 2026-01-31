from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import pandas as pd

from .preprocessing import clean_text
from .embeddings import generate_embeddings
from .clustering import perform_clustering
from .gap_detection import detect_gaps
from .utils import save_to_csv, load_from_csv
from .schemas import GapAnalysisResponse

app = FastAPI(title="NOVACLAIM AI Backend")

# -------------------- CORS --------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------- ROOT --------------------
@app.get("/")
def root():
    return {"message": "NovaClaim backend running"}

# -------------------- HEALTH --------------------
@app.get("/health")
def health_check():
    return {"status": "ok"}

# -------------------- FILE UPLOAD --------------------
@app.post("/upload")
async def upload_data(file: UploadFile = File(...)):
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Only CSV files accepted")

    content = await file.read()
    df = pd.read_csv(pd.io.common.BytesIO(content))

    if "abstract" not in df.columns:
        raise HTTPException(status_code=400, detail="CSV must contain 'abstract' column")

    save_to_csv(df.to_dict("records"))

    return {
        "message": "Data ingested successfully",
        "rows": len(df)
    }

# -------------------- ANALYZE --------------------
class AnalyzeRequest(BaseModel):
    trigger: Optional[str] = "run"   # keeps frontend POST happy

@app.post("/analyze", response_model=GapAnalysisResponse)
def analyze_pipeline(_: AnalyzeRequest):
    df = load_from_csv()

    if df.empty:
        raise HTTPException(status_code=400, detail="No data found. Upload first.")

    # Step 1: Clean text
    df["cleaned_abstract"] = df["abstract"].astype(str).apply(clean_text)

    # Step 2: Embeddings
    vectors = generate_embeddings(df["cleaned_abstract"].tolist())

    # Step 3: Clustering
    df["cluster"] = perform_clustering(vectors)

    # Step 4: Gap detection
    insights = detect_gaps(df)

    return {
        "domains": insights,
        "total_processed": len(df)
    }

# -------------------- DOMAINS --------------------
@app.get("/domains")
def get_domains():
    df = load_from_csv()

    if df.empty or "cluster" not in df.columns:
        return {"message": "Run /analyze first"}

    return df.groupby("cluster")["abstract"].apply(list).to_dict()

# -------------------- LOCAL RUN --------------------
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
