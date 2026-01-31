from pydantic import BaseModel
from typing import List, Optional

class AbstractItem(BaseModel):
    id: str
    title: str
    abstract: str
    metadata: Optional[dict] = None

class AnalysisRequest(BaseModel):
    items: List[AbstractItem]

class DomainInsight(BaseModel):
    cluster_id: int
    name: str
    size: int
    density_score: float
    is_gap: bool
    representative_terms: List[str]

class GapAnalysisResponse(BaseModel):
    domains: List[DomainInsight]
    total_processed: int