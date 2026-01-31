
export interface User {
  email: string;
  organization: string;
  role: string;
  isAuthenticated: boolean;
}

export type IPType = 'Patent' | 'Trademark' | 'Copyright' | 'Research Paper';

export interface ConflictDetail {
  id: string;
  type: IPType;
  title: string;
  owner: string;
  similarity: number;
  conflict_level: 'Low' | 'Medium' | 'High';
  reasoning: string;
  detailed_analysis?: string;
}

export interface KPIStats {
  documentsAnalyzed: number;
  technologyClusters: number;
  innovationGaps: number;
  sdg9Alignment: number;
}

export interface ClusterData {
  name: string;
  value: number;
  density: 'High' | 'Medium' | 'Low';
  sdgAlignment: number;
  ipStrength?: number;
  maturity?: string;
  children?: ClusterData[];
}

export interface InnovationIdea {
  id: string;
  title: string;
  description: string;
  potentialImpact: 'High' | 'Medium' | 'Low';
  domain: string;
}

export interface PatentDocument {
  id: string;
  title: string;
  assignee: string;
  date: string;
  similarity: number;
  status: 'Published' | 'Pending' | 'Granted';
  exposure?: 'High' | 'Medium' | 'Low';
}

export interface StrategicProject {
  id: string;
  name: string;
  status: 'In Development' | 'Planned' | 'Under Review';
  action: 'BUILD' | 'PARTNER' | 'ACQUIRE';
  timestamp: string;
  risk?: string;
  reward?: number;
  x?: number;
  y?: number;
  z?: number;
}

export interface GraphNode {
  id: string;
  name: string;
  val: number;
}

export interface GraphLink {
  source: string;
  target: string;
  value: number;
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
  risk_score: number;
}

export interface JobStatus {
  id: string;
  status: 'QUEUED' | 'EXTRACTING' | 'EMBEDDING' | 'ANALYZING' | 'COMPLETED' | 'FAILED';
  progress: number;
  result?: AnalysisResult;
  error?: string;
}

export interface AnalysisResult {
  ip_type: IPType;
  similarity_score: number;
  novelty_score: number;
  patentable_probability: 'Low' | 'Medium' | 'High';
  patentable_decision: 'YES' | 'NO' | 'RISKY';
  innovation_type: 'incremental' | 'adjacent' | 'breakthrough';
  top_similar_patents: PatentDocument[];
  conflicts: ConflictDetail[];
  innovation_gaps: string[];
  strategic_recommendation: string;
  risk_flags: string[];
  domains: ClusterData[];
  projects: StrategicProject[];
  summary: string;
}

export interface SystemSignal {
  id: string;
  type: 'Opportunity' | 'Risk' | 'Breakthrough';
  message: string;
  timestamp: string;
}

export type ExplorerFilter = 'litigation' | 'cluster' | 'phonetic' | 'semantic' | 'all';

export interface AdvancedFilterParams {
  riskLevel?: 'Low' | 'Medium' | 'High';
  similarityThreshold?: number;
  type?: IPType;
}
