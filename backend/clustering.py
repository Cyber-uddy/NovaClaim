import hdbscan
import numpy as np

def perform_clustering(embeddings: np.ndarray):
    """
    Groups embeddings into clusters. -1 indicates noise.
    """
    clusterer = hdbscan.HDBSCAN(
        min_cluster_size=2, 
        metric='euclidean', 
        cluster_selection_method='eom'
    )
    cluster_labels = clusterer.fit_predict(embeddings)
    return cluster_labels