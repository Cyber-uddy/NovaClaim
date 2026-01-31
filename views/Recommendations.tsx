
import React, { useState, useEffect } from 'react';
import { Network, ChevronRight, Loader2, Server, Database, AlertCircle, Search } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { getAIRecommendations, getInfrastructureGraphData } from '../services/geminiService';
import { getKnowledgeBaseStats } from '../data/knowledgeBase';
import { InnovationIdea, GraphData } from '../types';
import { useStrategicData } from '../App';

const Recommendations: React.FC = () => {
  const { data: strategicData } = useStrategicData();
  const [recommendations, setRecommendations] = useState<InnovationIdea[]>([]);
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [loading, setLoading] = useState(true);
  const [graphLoading, setGraphLoading] = useState(true);
  const [selectedLayer, setSelectedLayer] = useState('Foundational Stack');
  const stats = getKnowledgeBaseStats();

  // Load different datasets per layer, integrating Knowledge Repository search
  useEffect(() => {
    const fetchRecs = async () => {
      setLoading(true);
      try {
        const baseRecs = await getAIRecommendations(selectedLayer);
        
        // If we have top-level strategic data from the Intelligence Engine, 
        // inject it into the first slots to show "Semantic Overlap" results.
        if (strategicData) {
          const semanticRec: InnovationIdea = {
            id: "SEMANTIC-IP-001",
            title: `Semantic Match: ${strategicData.ip_type}`,
            description: `Cross-referenced against ${stats.total} indexed assets. Analysis reveals ${strategicData.similarity_score}% overlap with existing portfolio. Strategy: ${strategicData.patentable_decision}.`,
            potentialImpact: strategicData.patentable_decision === 'YES' ? 'High' : 'Medium',
            domain: strategicData.domains[0]?.name || selectedLayer
          };
          
          const gapRec: InnovationIdea = {
            id: "GAP-ANALYSIS-002",
            title: "Internal Whitespace Detected",
            description: `Whitespace detection identified 3 major gaps in current R&D: ${strategicData.innovation_gaps.join(", ")}.`,
            potentialImpact: 'High',
            domain: 'Strategy Gaps'
          };

          setRecommendations([semanticRec, gapRec, ...baseRecs.slice(0, 1)]);
        } else {
          setRecommendations(baseRecs);
        }
      } catch (err) {
        console.error("Failed to load recommendations", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchGraph = async () => {
      setGraphLoading(true);
      try {
        const gData = await getInfrastructureGraphData(selectedLayer);
        setGraphData(gData);
      } catch (err) {
        console.error("Failed to load graph data", err);
      } finally {
        setGraphLoading(false);
      }
    };

    fetchRecs();
    fetchGraph();
  }, [selectedLayer, strategicData, stats.total]);

  const radarData = graphData?.nodes.map(node => ({
    subject: node.name,
    A: node.val,
    fullMark: 100,
  })) || [];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold text-brand-charcoal tracking-tight">Strategy <span className="text-brand-teal">Engine</span> Command</h2>
          <div className="flex items-center gap-3 mt-1">
            <p className="text-brand-muted font-medium text-sm italic">Scanning {stats.total}+ Knowledge Assets •</p>
            <span className="text-[10px] font-black uppercase text-brand-teal tracking-widest bg-brand-teal/5 px-2 py-0.5 rounded border border-brand-teal/10">Patent Corpus Indexed</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white border border-brand-border rounded-lg p-1">
            {['Foundational Stack', 'Core Platform', 'Edge Systems'].map(layer => (
              <button
                key={layer}
                onClick={() => setSelectedLayer(layer)}
                className={`px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${
                  selectedLayer === layer 
                    ? 'bg-brand-teal text-white shadow-md' 
                    : 'text-brand-muted hover:text-brand-charcoal'
                }`}
              >
                {layer}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="h-96 flex flex-col items-center justify-center text-brand-muted">
          <Loader2 className="animate-spin mb-4" size={48} />
          <p className="text-lg font-extrabold tracking-tight">Accessing Pre-Indexed Knowledge Repository...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {recommendations.map((rec) => (
            <div key={rec.id} className="bg-white rounded-xl border border-brand-border p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col group relative overflow-hidden">
              <div className="flex items-center justify-between mb-4 relative z-10">
                <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 ${
                  rec.potentialImpact === 'High' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-blue-50 text-blue-600 border border-blue-100'
                }`}>
                  <AlertCircle size={10} />
                  Strategy Vector: {rec.potentialImpact} Impact
                </span>
                <span className="text-[10px] font-black text-brand-muted tracking-widest uppercase">SEMANTIC MATCH</span>
              </div>
              <h3 className="text-xl font-bold text-brand-charcoal mb-3 group-hover:text-brand-teal transition-colors leading-snug relative z-10">
                {rec.title}
              </h3>
              <p className="text-brand-muted text-[13px] leading-relaxed mb-6 flex-1 italic relative z-10">
                {rec.description}
              </p>
              <div className="pt-6 border-t border-brand-border flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2 text-brand-teal">
                  <Server size={14} />
                  <span className="text-[10px] font-black uppercase tracking-widest">{rec.domain}</span>
                </div>
                <button className="bg-brand-teal/5 text-brand-teal p-2 rounded-full hover:bg-brand-teal hover:text-white transition-all shadow-sm">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          ))}

          <div className="bg-brand-teal text-white rounded-xl p-8 flex flex-col justify-center items-center text-center shadow-lg shadow-brand-teal/20 relative overflow-hidden border border-brand-teal">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 to-transparent"></div>
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm border border-white/20">
              <Database size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3 relative z-10 tracking-tight">Internal Repository Sync</h3>
            <p className="text-brand-cream/80 text-[11px] font-bold mb-6 relative z-10 uppercase tracking-[0.12em] leading-relaxed">
              Semantically connected to {stats.total} global patents, research literature, and IP risk signals.
            </p>
            <button className="w-full bg-white text-brand-teal text-[10px] font-black uppercase tracking-widest py-3 rounded-lg hover:bg-brand-cream transition-colors relative z-10 shadow-lg active:scale-95">
              Force Sync Database
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-brand-border overflow-hidden shadow-sm">
        <div className="bg-brand-cream/30 px-6 py-4 border-b border-brand-border flex items-center justify-between">
          <h3 className="font-extrabold text-brand-charcoal text-sm uppercase tracking-wider">Strategic Dependency Radar: {selectedLayer}</h3>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-brand-teal rounded-full animate-pulse"></div>
                <span className="text-[9px] font-black text-brand-teal uppercase tracking-widest">
                  Index Coverage: 100% Verified
                </span>
             </div>
             <span className="text-[9px] font-bold text-brand-muted/50 uppercase tracking-tighter italic">Mapping {stats.total} assets</span>
          </div>
        </div>
        <div className="p-8 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6 w-full">
            <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-brand-cream/20 transition-all border border-transparent hover:border-brand-border group">
              <div className="w-10 h-10 bg-brand-teal/10 text-brand-teal rounded-lg flex items-center justify-center border border-brand-teal/20 shadow-sm">
                <Search size={20} />
              </div>
              <div>
                <h4 className="font-bold text-brand-charcoal text-sm">Semantic Retrieval Active</h4>
                <p className="text-[11px] text-brand-muted font-medium uppercase tracking-tight leading-tight">
                  {strategicData ? `Querying ${stats.total} assets for "${strategicData.ip_type}" overlaps...` : "Continuous scanning of internal R&D literature enabled."}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl opacity-60 hover:opacity-100 transition-all border border-transparent hover:border-brand-border group">
              <div className="w-10 h-10 bg-slate-100 text-slate-400 rounded-lg flex items-center justify-center border border-brand-border">
                <AlertCircle size={20} />
              </div>
              <div>
                <h4 className="font-bold text-brand-charcoal text-sm">IP Risk Signals Evaluated</h4>
                <p className="text-[11px] text-brand-muted font-medium uppercase tracking-tight leading-tight">
                  Scanning for phonetic, semantic, and structural conflicts across {stats.trademarks} pre-indexed trademarks.
                </p>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-96 h-64 bg-brand-cream/20 rounded-xl border border-dashed border-brand-border flex flex-col items-center justify-center relative group overflow-hidden">
             {graphLoading ? (
               <Loader2 className="animate-spin text-brand-teal" size={24} />
             ) : radarData.length > 0 ? (
               <ResponsiveContainer width="100%" height="100%">
                 <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                   <PolarGrid stroke="#E8E4DB" />
                   <PolarAngleAxis dataKey="subject" tick={{ fontSize: 9, fontWeight: 'bold', fill: '#6B7C80' }} />
                   <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                   <Radar
                     name="Database Overlap"
                     dataKey="A"
                     stroke="#0FB9B1"
                     fill="#0FB9B1"
                     fillOpacity={0.4}
                   />
                   <RechartsTooltip 
                      contentStyle={{ borderRadius: '8px', border: '1px solid #E8E4DB', fontSize: '10px' }}
                   />
                 </RadarChart>
               </ResponsiveContainer>
             ) : (
               <div className="text-center p-6">
                 <Network size={24} className="mb-3 opacity-30 mx-auto" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-brand-muted">Local Cache Online</span>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
