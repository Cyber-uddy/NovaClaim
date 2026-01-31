
import React, { useState, useEffect, useMemo } from 'react';
import { ShieldAlert, Search, Filter, Download, ExternalLink, SlidersHorizontal, AlertTriangle, Scale, FileText, Bookmark, Loader2, X, CheckCircle, Zap } from 'lucide-react';
import { useStrategicData } from '../App';
import { ConflictDetail, ExplorerFilter, AdvancedFilterParams, AnalysisResult } from '../types';
import { getExplorerResults, exportExplorerData, getDeepAnalysis } from '../services/geminiService';
import { motion, AnimatePresence } from 'framer-motion';

const Explorer: React.FC = () => {
  const { data: strategicData } = useStrategicData();
  const [activeConflicts, setActiveConflicts] = useState<ConflictDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<ExplorerFilter>('all');
  const [isExporting, setIsExporting] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null);
  const [deepAnalysis, setDeepAnalysis] = useState<Partial<AnalysisResult> | null>(null);
  const [isDeepAnalyzing, setIsDeepAnalyzing] = useState(false);
  
  // Advanced Filter state
  const [advancedParams, setAdvancedParams] = useState<AdvancedFilterParams>({
    riskLevel: undefined,
    similarityThreshold: 50,
    type: undefined
  });

  // Load results whenever filters change
  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const results = await getExplorerResults(selectedFilter, showAdvanced ? advancedParams : undefined);
        setActiveConflicts(results);
      } catch (err) {
        console.error("Failed to fetch explorer results", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [selectedFilter, showAdvanced, advancedParams]);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const url = await exportExplorerData(activeConflicts);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `Novaclaim_Export_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Export failed", err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDeepAnalysis = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeepAnalyzing(true);
    setDeepAnalysis(null);
    try {
      const result = await getDeepAnalysis(id);
      setDeepAnalysis(result);
    } catch (err) {
      console.error("Deep analysis failed", err);
    } finally {
      setIsDeepAnalyzing(false);
    }
  };

  const handleRowClick = (id: string) => {
    setSelectedRowId(selectedRowId === id ? null : id);
    setDeepAnalysis(null);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-brand-charcoal tracking-tight">IP <span className="text-brand-teal">Risk</span> & Conflict</h2>
          <p className="text-brand-muted mt-1 font-medium text-sm">Legal & competitive technology exposure analysis • Multi-modal collision probability.</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-xs font-bold transition-all ${showAdvanced ? 'bg-brand-teal text-white border-brand-teal' : 'bg-white border-brand-border text-brand-muted hover:text-brand-charcoal'}`}
          >
            <SlidersHorizontal size={14} />
            Advanced Risk Filter
          </button>
          <button 
            onClick={handleExport}
            disabled={isExporting || activeConflicts.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-brand-teal text-white rounded-lg text-xs font-bold shadow-lg shadow-brand-teal/10 hover:bg-brand-deepTeal transition-all disabled:opacity-50"
          >
            {isExporting ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
            Export Conflict Map
          </button>
        </div>
      </div>

      {/* Advanced Filter Modal/Panel (Logic Only integrated into flow) */}
      <AnimatePresence>
        {showAdvanced && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white p-6 rounded-xl border border-brand-border shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-brand-muted tracking-widest">Risk Exposure Level</label>
                <select 
                  value={advancedParams.riskLevel || ''} 
                  onChange={(e) => setAdvancedParams({...advancedParams, riskLevel: e.target.value as any || undefined})}
                  className="w-full bg-brand-cream border border-brand-border rounded-lg p-2 text-xs font-bold outline-none focus:border-brand-teal"
                >
                  <option value="">All Levels</option>
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium Exposure</option>
                  <option value="Low">Low Risk</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-brand-muted tracking-widest">Similarity Threshold ({advancedParams.similarityThreshold}%)</label>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={advancedParams.similarityThreshold}
                  onChange={(e) => setAdvancedParams({...advancedParams, similarityThreshold: parseInt(e.target.value)})}
                  className="w-full accent-brand-teal" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-brand-muted tracking-widest">Asset Category</label>
                <select 
                  value={advancedParams.type || ''} 
                  onChange={(e) => setAdvancedParams({...advancedParams, type: e.target.value as any || undefined})}
                  className="w-full bg-brand-cream border border-brand-border rounded-lg p-2 text-xs font-bold outline-none focus:border-brand-teal"
                >
                  <option value="">All Categories</option>
                  <option value="Patent">Patents</option>
                  <option value="Trademark">Trademarks</option>
                  <option value="Research Paper">Academic Work</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white rounded-xl border border-brand-border shadow-sm">
        <div className="p-4 border-b border-brand-border flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Assets' },
              { id: 'litigation', label: 'Litigation Watch' },
              { id: 'cluster', label: 'High-Overlap Cluster' },
              { id: 'phonetic', label: 'Phonetic Conflict' },
              { id: 'semantic', label: 'Semantic Priority' }
            ].map(filter => (
              <button 
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id as any)}
                className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md flex items-center gap-1.5 border transition-all ${
                  selectedFilter === filter.id 
                    ? 'bg-brand-teal text-white border-brand-teal' 
                    : 'bg-brand-cream text-brand-muted border-brand-border hover:border-brand-teal/50'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase text-red-500 bg-red-50 px-3 py-1 rounded-lg border border-red-100">
            <AlertTriangle size={12} />
            {loading ? "Scanning..." : `${activeConflicts.length} Potential Risks Detected`}
          </div>
        </div>
        
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-20 flex flex-col items-center justify-center text-brand-muted gap-4">
              <Loader2 className="animate-spin" size={40} />
              <p className="text-xs font-black uppercase tracking-widest">Querying IP Collision Database...</p>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-brand-cream/30 text-[10px] font-black text-brand-muted uppercase tracking-[0.2em]">
                <tr>
                  <th className="px-6 py-4">IP Identity</th>
                  <th className="px-6 py-4">Technical Field / Brand & Entity</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Similarity Index</th>
                  <th className="px-6 py-4">Conflict Status</th>
                  <th className="px-6 py-4 text-right">Deep Analysis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border">
                {activeConflicts.map((doc) => (
                  <React.Fragment key={doc.id}>
                    <tr 
                      onClick={() => handleRowClick(doc.id)}
                      className={`hover:bg-brand-cream/20 transition-colors cursor-pointer group ${selectedRowId === doc.id ? 'bg-brand-teal/5' : ''}`}
                    >
                      <td className="px-6 py-4 font-mono text-xs text-brand-teal font-bold">{doc.id}</td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-brand-charcoal text-sm">{doc.title}</p>
                        <p className="text-[10px] text-brand-muted mt-1 font-medium uppercase tracking-tight">Owner/Assignee: {doc.owner}</p>
                        <p className="text-[10px] text-brand-teal italic mt-0.5">{doc.reasoning}</p>
                      </td>
                      <td className="px-6 py-4">
                         <div className="flex items-center gap-2">
                            {doc.type === 'Patent' ? <Scale size={14} className="text-brand-muted" /> : 
                             doc.type === 'Trademark' ? <Bookmark size={14} className="text-brand-muted" /> : 
                             <FileText size={14} className="text-brand-muted" />}
                            <span className="text-[10px] font-black uppercase tracking-widest text-brand-muted">{doc.type}</span>
                         </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-mono font-bold ${doc.similarity > 0.8 ? 'text-red-500' : 'text-brand-teal'}`}>
                            {(doc.similarity * 100).toFixed(0)}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                          doc.conflict_level === 'High' ? 'bg-red-50 text-red-600 border-red-100' : 
                          doc.conflict_level === 'Medium' ? 'bg-orange-50 text-orange-600 border-orange-100' : 
                          'bg-green-50 text-green-600 border-green-100'
                        }`}>
                          {doc.conflict_level} CONFLICT
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={(e) => handleDeepAnalysis(doc.id, e)}
                          className="p-2 text-brand-muted hover:text-brand-teal transition-all relative group"
                        >
                          {isDeepAnalyzing ? <Loader2 size={16} className="animate-spin" /> : <ExternalLink size={16} />}
                          <span className="absolute bottom-full right-0 mb-2 hidden group-hover:block bg-brand-charcoal text-white text-[8px] px-2 py-1 rounded uppercase tracking-widest whitespace-nowrap z-50">Deep AI Dive</span>
                        </button>
                      </td>
                    </tr>
                    <AnimatePresence>
                      {selectedRowId === doc.id && (
                        <tr>
                          <td colSpan={6} className="px-8 py-0">
                            <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="py-8 border-t border-brand-border/50 grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-4">
                                  <div className="flex items-center gap-2 text-brand-teal">
                                    <FileText size={16} />
                                    <h4 className="text-[10px] font-black uppercase tracking-widest">Overlap Analysis Summary</h4>
                                  </div>
                                  <p className="text-xs text-brand-muted leading-relaxed font-medium">
                                    {doc.reasoning} System detected phonetic and semantic collisions in the primary claim set. Market proximity index for {doc.owner} is high.
                                  </p>
                                  {deepAnalysis ? (
                                    <div className="p-4 bg-brand-teal/5 rounded-xl border border-brand-teal/10 space-y-3">
                                       <div className="flex items-center gap-2 text-brand-teal">
                                          {/* Fix: Icon 'Zap' is now correctly imported and used below */}
                                          <Zap size={14} />
                                          <span className="text-[10px] font-black uppercase trackingest">AI Decision: {deepAnalysis.patentable_decision}</span>
                                       </div>
                                       <p className="text-[11px] text-brand-charcoal font-bold italic leading-relaxed">
                                          "{deepAnalysis.summary}"
                                       </p>
                                       <div className="flex flex-wrap gap-2 pt-2">
                                          {deepAnalysis.risk_flags?.map(flag => (
                                            <span key={flag} className="bg-white px-2 py-0.5 rounded text-[8px] font-black uppercase text-red-500 border border-red-100">{flag}</span>
                                          ))}
                                       </div>
                                    </div>
                                  ) : isDeepAnalyzing ? (
                                    <div className="flex items-center gap-2 text-brand-muted p-4 italic text-[11px]">
                                       <Loader2 size={14} className="animate-spin" /> Synthesizing prior art overlap...
                                    </div>
                                  ) : (
                                    <button 
                                      onClick={(e) => handleDeepAnalysis(doc.id, e)}
                                      className="text-brand-teal text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all"
                                    >
                                      Initiate Deep AI Analysis <ArrowRight size={14} />
                                    </button>
                                  )}
                                </div>
                                <div className="bg-brand-cream/50 p-6 rounded-2xl border border-brand-border space-y-4">
                                   <div className="flex items-center justify-between">
                                      <h5 className="text-[10px] font-black uppercase tracking-widest text-brand-muted">Collision Map Status</h5>
                                      <span className="text-[9px] font-bold text-brand-teal">LITIGATION SCAN: READY</span>
                                   </div>
                                   <div className="space-y-3">
                                      <div className="flex justify-between items-center text-[10px] font-bold">
                                         <span className="text-brand-charcoal">Structural Similarity</span>
                                         <span className="text-brand-teal">{(doc.similarity * 100).toFixed(0)}%</span>
                                      </div>
                                      <div className="w-full h-1 bg-white rounded-full overflow-hidden">
                                         <div className="h-full bg-brand-teal" style={{ width: `${doc.similarity * 100}%` }} />
                                      </div>
                                      <div className="flex justify-between items-center text-[10px] font-bold mt-4">
                                         <span className="text-brand-charcoal">Market Proximity</span>
                                         <span className="text-orange-500">82%</span>
                                      </div>
                                      <div className="w-full h-1 bg-white rounded-full overflow-hidden">
                                         <div className="h-full bg-orange-500" style={{ width: '82%' }} />
                                      </div>
                                   </div>
                                </div>
                              </div>
                            </motion.div>
                          </td>
                        </tr>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                ))}
                {activeConflicts.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-20 text-center text-brand-muted">
                      <Search size={32} className="mx-auto mb-4 opacity-20" />
                      <p className="text-xs font-black uppercase tracking-widest">No matching conflicts found in repository</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper component for Arrow icon
const ArrowRight: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

export default Explorer;
