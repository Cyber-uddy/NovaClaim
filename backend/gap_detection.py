import pandas as pd
import numpy as np

def detect_gaps(df: pd.DataFrame):
    """
    Identifies clusters with low density relative to the dataset.
    Logic: Clusters with size below 20th percentile of mean cluster size
    and those specifically labeled as outliers/noise in sparse areas.
    """
    cluster_counts = df['cluster'].value_counts()
    mean_size = cluster_counts.mean()
    
    # Simple Gap Rule: If cluster size < 3 and total documents > 10
    # or if size is significantly lower than average.
    gap_threshold = max(2, int(mean_size * 0.3))
    
    insights = []
    for cluster_id, count in cluster_counts.items():
        if cluster_id == -1: continue # Handle noise separately if needed
        
        is_gap = count <= gap_threshold
        
        # In a real scenario, we'd extract keywords from titles in this cluster
        representative_terms = df[df['cluster'] == cluster_id]['title'].iloc[0].split()[:3]
        
        insights.append({
            "cluster_id": int(cluster_id),
            "name": f"Domain {cluster_id}",
            "size": int(count),
            "density_score": float(count / len(df)),
            "is_gap": bool(is_gap),
            "representative_terms": representative_terms
        })
        
    return insights