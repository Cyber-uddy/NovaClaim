
import React, { useState, useMemo } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Target, ArrowRight, Zap, Info, TrendingUp, DollarSign, X, CheckCircle, Loader2, Download, Share2, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStrategicData } from '../App';

const defaultGapData = [
  { id: '1', x: 20, y: 85, z: 600, name: 'Neural Compression', risk: 'Architecture Disruption', reward: 92, action: 'BUILD' },
  { id: '3', x: 45, y: 55, z: 400, name: 'Solid-State Anodes', risk: 'Technical Uncertainty', reward: 65, action: 'PARTNER' },
  { id: '4', x: 15, y: 75, z: 800, name: 'Synthetic Bio-Synth', risk: 'Dependency Risk', reward: 88, action: 'ACQUIRE' },
];

const InnovationGaps: React.FC = () => {
  const { data } = useStrategicData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState<any | null>(null);
  const [showSignals, setShowSignals] = useState(false);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const activeData = useMemo(() => {
    if (data && data.projects) return data.projects;
    return defaultGapData;
  }, [data]);

  const filteredData = useMemo(() => {
    return activeData.filter(d => 
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (d.risk || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (d.action || "").toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, activeData]);

  const handleAction = (techName: string, actionType: string) => {
    setLoadingAction(techName);
    setTimeout(() => {
      setLoadingAction(null);
      setSuccessMsg(`${actionType} pipeline initiated for ${techName}`);
      setTimeout(() => setSuccessMsg(null), 3000);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 relative">
      <AnimatePresence>
        {successMsg && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-10 right-10 z-[200] bg-brand-charcoal text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-brand-teal/30"
          >
            <CheckCircle className="text-brand-teal" size={20} />
            <span className="text-sm font-bold uppercase tracking-widest">{successMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-extrabold text-brand-charcoal tracking-tight">Strategic <span className="text-brand-teal">Investment</span> Decisions</h2>
          <p className="text-brand-muted mt-1 font-medium text-sm">Technology Investment Decision Engine • Strategic architecture prioritization matrix.</p>
        </div>
        <button 
          onClick={() => setShowSignals(true)}
          className="bg-brand-teal/5 px-4 py-2 rounded-xl border border-brand-teal/10 text-brand-teal text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-sm hover:bg-brand-teal/10 transition-all active:scale-95"
        >
          <Zap size={14} />
          {data ? "12 Active Tech Opportunity Signals" : "8 Active Tech Opportunity Signals"}
        </button>
      </div>

      <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-brand-border shadow-sm">
        <TrendingUp size={18} className="text-brand-muted" />
        <input 
          type="text" 
          placeholder="Filter by name, risk profile, or strategic action (e.g. 'Build')..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium text-brand-charcoal placeholder-brand-muted"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-brand-border shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-black text-brand-charcoal flex items-center gap-2 uppercase tracking-wider">
              Architecture Impact vs Engineering Maturity
              <Info size={14} className="text-brand-muted" />
            </h3>
          </div>
          
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis type="number" dataKey="x" name="Technology Maturity" unit="%" tick={{ fontSize: 11, fontWeight: 'bold', fill: '#6B7C80' }} />
                <YAxis type="number" dataKey="y" name="Strategic Impact" unit="%" tick={{ fontSize: 11, fontWeight: 'bold', fill: '#6B7C80' }} />
                <ZAxis type="number" dataKey="z" range={[100, 1000]} name="Engineering Effort" />
                <Tooltip 
                   cursor={{ strokeDasharray: '3 3' }} 
                   contentStyle={{ borderRadius: '12px', border: '1px solid #E8E4DB' }}
                />
                <Scatter name="Tech Domains" data={filteredData} onClick={(data) => setSelectedTech(data)}>
                  {filteredData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.y > 60 ? '#0FB9B1' : '#E8E4DB'} className="cursor-pointer hover:opacity-80 transition-opacity" />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="font-black text-brand-charcoal text-[10px] uppercase tracking-[0.2em] px-2 flex items-center gap-2">
            <DollarSign size={14} className="text-brand-teal" />
            Engineering Investment Brief
          </h3>
          <div className="max-h-[600px] overflow-y-auto pr-2 space-y-6 scrollbar-hide">
            {filteredData.map((gap, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border-l-4 border-brand-teal shadow-sm border border-brand-border group hover:border-brand-teal transition-all">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-bold text-brand-charcoal text-sm group-hover:text-brand-teal transition-colors uppercase tracking-tight">{gap.name}</h4>
                  <div className="flex gap-1">
                    <button className="text-[9px] font-black px-2 py-1 rounded-lg border bg-brand-teal text-white border-brand-teal">
                      {gap.action || "BUILD"}
                    </button>
                  </div>
                </div>
                <button 
                  disabled={loadingAction === gap.name}
                  onClick={() => handleAction(gap.name, gap.action || 'Buildout')}
                  className="flex items-center gap-2 text-brand-teal text-[10px] font-black uppercase tracking-widest hover:gap-3 transition-all disabled:opacity-50 disabled:cursor-wait"
                >
                  {loadingAction === gap.name ? <Loader2 size={14} className="animate-spin" /> : <>Initiate Technical Buildout <ArrowRight size={14} /></>}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InnovationGaps;
