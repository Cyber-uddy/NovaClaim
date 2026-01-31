
import React, { useMemo } from 'react';
import { ResponsiveContainer, Treemap, Tooltip } from 'recharts';
import { BrainCircuit, Info, Download, Activity, Sparkles, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStrategicData } from '../App';

const defaultClusterData = [
  {
    name: 'Advanced Materials',
    children: [
      { name: 'Core Ceramics', size: 4500, maturity: 'Mature', ipStrength: 0.92 },
      { name: 'Composite Alloy', size: 3000, maturity: 'Scaling', ipStrength: 0.78 },
      { name: 'Nanofabrication', size: 1500, maturity: 'Emerging', ipStrength: 0.45 },
    ],
  },
  {
    name: 'Compute Systems',
    children: [
      { name: 'Hardware Design', size: 5200, maturity: 'Mature', ipStrength: 0.88 },
      { name: 'Edge Optimization', size: 2800, maturity: 'Scaling', ipStrength: 0.81 },
      { name: 'Encryption Logic', size: 2100, maturity: 'Emerging', ipStrength: 0.94 },
    ],
  },
];

const AIAnalysis: React.FC = () => {
  const { data } = useStrategicData();

  const activeData = useMemo(() => {
    if (data && data.domains) return data.domains;
    return defaultClusterData;
  }, [data]);

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-extrabold text-brand-charcoal tracking-tight">R&D <span className="text-brand-teal">Capability</span> Map</h2>
          <p className="text-brand-muted mt-1 font-medium text-sm italic underline underline-offset-4 decoration-brand-teal/30">
            Technical execution readiness • Strategic architecture alignment • Domain maturity telemetry.
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-brand-border rounded-xl text-xs font-bold text-brand-muted hover:text-brand-charcoal hover:bg-brand-cream transition-all shadow-sm">
          <Download size={16} />
          Export Capability Audit
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <div className="xl:col-span-3 card-enterprise bg-white p-8 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-black text-brand-charcoal flex items-center gap-2 uppercase tracking-wider">
              Technical Execution Readiness
              <Info size={14} className="text-brand-muted" />
            </h3>
            <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.2em] text-brand-muted">
               <div className="flex items-center gap-2 px-3 py-1.5 bg-brand-cream rounded-lg border border-brand-border">
                 <UserCheck size={14} className="text-brand-teal" />
                 {activeData.length} Core Tech Pillars
               </div>
               <div className="flex items-center gap-2 px-3 py-1.5 bg-brand-cream rounded-lg border border-brand-border">
                 <Activity size={14} className="text-brand-teal" />
                 {activeData.reduce((acc, curr) => acc + (curr.children?.length || 0), 0)} Technical Nodes
               </div>
            </div>
          </div>
          
          <div className="h-[550px] w-full bg-brand-cream/30 rounded-2xl overflow-hidden border border-brand-border relative">
            <ResponsiveContainer width="100%" height="100%">
              <Treemap
                data={activeData}
                dataKey="size"
                aspectRatio={4 / 3}
                stroke="#fff"
                fill="#0FB9B1"
              >
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #E8E4DB', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', color: '#1F2A2E' }}
                  itemStyle={{ color: '#0FB9B1' }}
                  formatter={(value, name, props) => {
                    const node = props.payload;
                    return [
                      `${value} (Rel. Weight)`,
                      `Status: ${node.maturity || 'Active'} | IP Strength: ${(node.ipStrength ? node.ipStrength * 100 : 0).toFixed(0)}%`
                    ];
                  }}
                />
              </Treemap>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="xl:col-span-1 space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card-enterprise bg-white p-8 rounded-2xl shadow-sm"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-brand-teal/5 rounded-xl text-brand-teal border border-brand-teal/10">
                <BrainCircuit size={22} />
              </div>
              <h3 className="font-extrabold text-lg text-brand-charcoal tracking-tight">Technology Capability Gaps</h3>
            </div>
            <div className="space-y-3">
              {(data?.innovation_gaps || ['Neural Architecture', 'Isotope Separation', 'Distributed Ledger']).map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-brand-cream/40 rounded-xl border border-brand-border hover:border-brand-teal/30 transition-all cursor-default group">
                  <div>
                    <span className="text-sm font-bold text-brand-charcoal block mb-0.5 group-hover:text-brand-teal transition-colors">{item}</span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-brand-muted opacity-80">Strategic Opportunity</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-black block uppercase tracking-tighter text-brand-teal">High</span>
                    <span className="text-[8px] font-bold text-brand-muted/60 uppercase">Impact</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="card-enterprise bg-brand-deepTeal text-white p-8 rounded-2xl shadow-xl border border-white/10 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 opacity-10 rotate-12">
              <BrainCircuit size={100} />
            </div>
            <h4 className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] mb-4 relative z-10">Technology Leadership Index</h4>
            <div className="flex items-end gap-2 mb-4 relative z-10">
              <span className="text-5xl font-extrabold text-white tracking-tighter">
                {data ? (data.novelty_score / 10).toFixed(1) : "7.4"}
              </span>
              <span className="text-white/50 font-black text-sm mb-2">/ 10</span>
            </div>
            <p className="text-[11px] text-white/80 font-medium leading-relaxed mb-6 relative z-10">
              Analysis based on IP velocity, system architecture maturity, technical decision efficiency, and milestone cycle time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAnalysis;
