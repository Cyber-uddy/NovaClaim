
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, InnovationIdea, GraphData, ConflictDetail, PatentDocument, JobStatus, ExplorerFilter, AdvancedFilterParams } from "../types";
import { knowledgeBase, getKnowledgeBaseStats } from "../data/knowledgeBase";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Simulated Local Job Store
const jobQueue: Record<string, JobStatus> = {};

/**
 * Local Semantic Search Simulation
 * Cross-references input against pre-indexed knowledgeBase assets.
 */
const searchInternalKnowledge = (queryText: string): { 
  conflicts: ConflictDetail[], 
  patents: PatentDocument[] 
} => {
  const queryWords = queryText.toLowerCase().split(/\s+/);
  const matches = knowledgeBase.map(entry => {
    let score = 0;
    const searchable = (entry.title + " " + entry.abstract + " " + entry.technology_domain).toLowerCase();
    queryWords.forEach(word => {
      if (searchable.includes(word)) score += 0.25;
    });
    return { ...entry, score: Math.min(score, 0.96) };
  })
  .filter(m => m.score > 0.15)
  .sort((a, b) => b.score - a.score);

  const conflicts: ConflictDetail[] = matches.slice(0, 15).map(m => ({
    id: m.id,
    type: (m.source_type === 'Thesis' ? 'Research Paper' : m.source_type) as any,
    title: m.title,
    owner: m.organization,
    similarity: m.score,
    conflict_level: m.risk_category,
    reasoning: `Semantic match detected in ${m.technology_domain} domain.`
  }));

  const patents: PatentDocument[] = matches
    .filter(m => m.source_type === 'Patent')
    .slice(0, 10)
    .map(m => ({
      id: m.id,
      title: m.title,
      assignee: m.organization,
      date: `${m.year}-01-01`,
      similarity: m.score,
      status: m.ip_status as any,
      exposure: m.risk_category
    }));

  return { conflicts, patents };
};

/**
 * IP EXPLORER: Base filtered results for Strategists.
 */
export const getExplorerResults = async (filter: ExplorerFilter, advanced?: AdvancedFilterParams): Promise<ConflictDetail[]> => {
  // Logic to simulate backend filtering
  const allResults = searchInternalKnowledge("").conflicts;
  
  let filtered = allResults;

  if (filter !== 'all') {
    if (filter === 'phonetic') {
      filtered = allResults.filter(r => r.type === 'Trademark');
    } else if (filter === 'cluster') {
      filtered = allResults.filter(r => r.similarity > 0.85);
    } else if (filter === 'litigation') {
      filtered = allResults.filter(r => r.conflict_level === 'High');
    }
  }

  if (advanced) {
    if (advanced.riskLevel) {
      filtered = filtered.filter(r => r.conflict_level === advanced.riskLevel);
    }
    if (advanced.type) {
      filtered = filtered.filter(r => r.type === advanced.type);
    }
    if (advanced.similarityThreshold) {
      filtered = filtered.filter(r => r.similarity >= advanced.similarityThreshold / 100);
    }
  }

  return filtered;
};

/**
 * IP EXPLORER: Deep AI-driven analysis for a specific IP asset.
 */
export const getDeepAnalysis = async (id: string): Promise<Partial<AnalysisResult>> => {
  const item = knowledgeBase.find(k => k.id === id);
  if (!item) throw new Error("Item not found");

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Perform a deep strategic IP analysis on the following asset:
    ID: ${item.id}
    TITLE: ${item.title}
    ABSTRACT: ${item.abstract}
    
    Provide a novelty score, patentability decision, and specific risk reasonings.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          novelty_score: { type: Type.NUMBER },
          patentable_decision: { type: Type.STRING },
          strategic_recommendation: { type: Type.STRING },
          risk_flags: { type: Type.ARRAY, items: { type: Type.STRING } },
          summary: { type: Type.STRING }
        }
      }
    }
  });

  return JSON.parse(response.text || "{}");
};

/**
 * IP EXPLORER: Simulated export functionality.
 */
export const exportExplorerData = async (data: ConflictDetail[]): Promise<string> => {
  const csvRows = [
    ["ID", "Title", "Type", "Owner", "Similarity", "Risk Level", "Reasoning"],
    ...data.map(r => [r.id, r.title, r.type, r.owner, r.similarity, r.conflict_level, r.reasoning])
  ];
  const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
  return encodeURI(csvContent);
};

/**
 * Starts an asynchronous analysis job (Full-Stack Simulation).
 */
export const startAnalysisJob = async (fileName: string, content: string): Promise<string> => {
  const jobId = `job_${Math.random().toString(36).substr(2, 9)}`;
  
  jobQueue[jobId] = {
    id: jobId,
    status: 'QUEUED',
    progress: 0
  };

  // Demo shortcut for instant results
  if (fileName.includes('demo_patent.pdf')) {
    setTimeout(() => runJobPipeline(jobId, fileName, content, true), 100);
  } else {
    runJobPipeline(jobId, fileName, content);
  }

  return jobId;
};

/**
 * Checks the status of a specific job.
 */
export const getJobStatus = (jobId: string): JobStatus => {
  return jobQueue[jobId] || { id: jobId, status: 'FAILED', progress: 0, error: 'Job not found' };
};

/**
 * Background Worker Pipeline Simulation
 */
const runJobPipeline = async (jobId: string, fileName: string, content: string, instant = false) => {
  const update = (status: JobStatus['status'], progress: number) => {
    jobQueue[jobId].status = status;
    jobQueue[jobId].progress = progress;
  };

  try {
    if (!instant) {
      update('EXTRACTING', 20);
      await new Promise(r => setTimeout(r, 1500));
      update('EMBEDDING', 50);
      await new Promise(r => setTimeout(r, 1500));
      update('ANALYZING', 80);
    }

    const stats = getKnowledgeBaseStats();
    const dbMeta = `Scanning ${stats.total} assets: ${stats.patents} Patents, ${stats.papers} Research Papers.`;

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Perform Strategic IP Intelligence analysis on: "${fileName}". 
      Compare against database summary: ${dbMeta}.
      
      CONTENT:
      ${content.substring(0, 4000)}

      STRICT SCHEMA REQUIRED.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            ip_type: { type: Type.STRING },
            similarity_score: { type: Type.NUMBER },
            novelty_score: { type: Type.NUMBER },
            patentable_probability: { type: Type.STRING },
            patentable_decision: { type: Type.STRING },
            innovation_type: { type: Type.STRING },
            summary: { type: Type.STRING },
            strategic_recommendation: { type: Type.STRING },
            innovation_gaps: { type: Type.ARRAY, items: { type: Type.STRING } },
            risk_flags: { type: Type.ARRAY, items: { type: Type.STRING } },
            domains: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  children: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        name: { type: Type.STRING },
                        size: { type: Type.NUMBER },
                        maturity: { type: Type.STRING },
                        ipStrength: { type: Type.NUMBER }
                      }
                    }
                  }
                }
              }
            },
            projects: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  name: { type: Type.STRING },
                  x: { type: Type.NUMBER },
                  y: { type: Type.NUMBER },
                  z: { type: Type.NUMBER },
                  action: { type: Type.STRING }
                }
              }
            }
          },
          required: ["ip_type", "similarity_score", "novelty_score", "patentable_decision", "strategic_recommendation", "summary", "domains", "projects"]
        }
      }
    });

    const aiResult = JSON.parse(response.text || "{}");
    const internalMatches = searchInternalKnowledge(content || fileName);

    jobQueue[jobId].result = {
      ...aiResult,
      top_similar_patents: internalMatches.patents,
      conflicts: internalMatches.conflicts
    };
    update('COMPLETED', 100);
  } catch (error) {
    jobQueue[jobId].status = 'FAILED';
    jobQueue[jobId].error = String(error);
  }
};

/**
 * Strategy Engine recommendations filtered by layer.
 */
export const getAIRecommendations = async (layer: string): Promise<InnovationIdea[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Strategist Audit for infrastructure layer: "${layer}". 
      Return 3 unique strategic investment vectors.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              potentialImpact: { type: Type.STRING },
              domain: { type: Type.STRING }
            },
            required: ["id", "title", "description", "potentialImpact", "domain"]
          }
        }
      }
    });
    return JSON.parse(response.text || "[]");
  } catch (error) {
    return [
      {
        id: "REC-DEF-001",
        title: `${layer} Optimization Vector`,
        description: `Refining systemic inter-dependencies within the ${layer} to maximize throughput.`,
        potentialImpact: "High",
        domain: layer
      }
    ];
  }
};

/**
 * Fetch failure propagation graph data for the selected infrastructure layer.
 */
export const getInfrastructureGraphData = async (layer: string): Promise<GraphData> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a failure propagation graph for the "${layer}" layer.
      5 nodes, 4 links.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            risk_score: { type: Type.NUMBER },
            nodes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  name: { type: Type.STRING },
                  val: { type: Type.NUMBER }
                }
              }
            },
            links: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  source: { type: Type.STRING },
                  target: { type: Type.STRING },
                  value: { type: Type.NUMBER }
                }
              }
            }
          },
          required: ["risk_score", "nodes", "links"]
        }
      }
    });
    return JSON.parse(response.text || "{}") as GraphData;
  } catch (error) {
    return {
      nodes: [
        { id: '1', name: 'Database', val: 70 },
        { id: '2', name: 'Auth', val: 50 },
        { id: '3', name: 'Gateway', val: 90 },
        { id: '4', name: 'Edge', val: 30 },
        { id: '5', name: 'Cache', val: 60 },
      ],
      links: [
        { source: '1', target: '2', value: 0.5 },
        { source: '2', target: '3', value: 0.7 },
        { source: '3', target: '4', value: 0.9 },
        { source: '5', target: '1', value: 0.2 },
      ],
      risk_score: 65
    };
  }
};
