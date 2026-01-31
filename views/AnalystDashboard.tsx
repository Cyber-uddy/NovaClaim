
import React, { useState } from 'react';
import { 
  Database, 
  Brain, 
  Search, 
  Download,
  Share2,
  Info,
  CheckCircle,
  FileSearch,
  Eye,
  GitBranch,
  PlayCircle,
  AlertTriangle,
  Zap,
  ShieldCheck,
  TrendingUp,
  X,
  // Fix: Added missing Activity import from lucide-react
  Activity
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import StatCard from '../components/StatCard';
import { motion, AnimatePresence } from 'framer-motion';

const accuracyData = [
  { name: 'Jan', value: 88, maturity: 0.72 },
  { name: 'Feb', value: 90, maturity: 0.74 },
  { name: 'Mar', value: 91, maturity: 0.75 },
  { name: 'Apr', value: 93, maturity: 0.78 },
  { name: 'May', value: 95, maturity: 0.81 },
  { name: 'Jun', value: 94, maturity: 0.83 },
];

const sourceData = [
  { name: 'WIPO USPTO', value: 145, color: '#0FB9B1' },
  { name: 'EPO Archives', value: 110, color: '#10B981' },
  { name: 'JPO Data', value: 85, color: '#3B82F6' },
  { name: 'SIPO Feed', value: 70, color: '#F59E0B' },
  { name: 'Legacy PDF', value: 30, color: '#6B7C80' },
];

const AnalystDashboard: React.FC = () => {
  const [evidenceMode, setEvidenceMode] = useState(false);
  const [showDependencies, setShowDependencies] = useState(false);
  const [activeDrilldown, setActiveDrilldown] = useState<string | null>(null);
  const [showSimulator, setShowSimulator] = useState(false);

  const batches = [
    { id: "USPTO_2024_Q2_Bulk", density: 0.98, gaps: 2, impact: "Semantic", status: "Verified", talent: 0.9, infra: 0.85, tools: 0.95, vendor: 0.7, friction: { integration: 'Low', compliance: 'Med', resource: 'Low', lockin: 'Low' } },
    { id: "EPO_CLEAN_ENERGY_SET", density: 0.85, gaps: 0, impact: "Classification", status: "Verified", talent: 0.75, infra: 0.9, tools: 0.88, vendor: 0.8, friction: { integration: 'Low', compliance: 'High', resource: 'Med', lockin: 'Low' } },
    { id: "LEGACY_CONVERSION_B3", density: 0.62, gaps: 14, impact: "OCR Processing", status: "Review", talent: 0.4, infra: 0.5, tools: 0.6, vendor: 0.4, friction: { integration: 'High', compliance: 'Low', resource: 'High', lockin: 'Med' } },
    { id: "SIPO_AUTONOMOUS_V1", density: 0.45, gaps: 4, impact: "Translation", status: "Processing", talent: 0.6, infra: 0.7, tools: 0.75, vendor: 0.9, friction: { integration: 'Med', compliance: 'Med', resource: 'Med', lockin: 'High' } },
  ];

  return (
    <div className="space-y-10 max-w-7xl mx-auto relative">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-extrabold text-brand-charcoal tracking-tight"
          >
            Analysis <span className="text-brand-teal">Accuracy</span> Dashboard
          </motion.h2>
          <p className="text-brand-muted mt-1 font-medium text-sm italic">Semantic integrity metrics • Processing pipeline telemetry</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowSimulator(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-brand-border rounded-xl text-[10px] font-black uppercase tracking-widest text-brand-charcoal hover:bg-brand-cream transition-all shadow-sm"
          >
            <PlayCircle size={14} className="text-brand-teal" />
            Impact Simulator
          </button>
          <button 
            onClick={() => setEvidenceMode(!evidenceMode)}
            className={`flex items-center gap-2 px-4 py-2 border rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm ${evidenceMode ? 'bg-brand-teal text-white border-brand-teal' : 'bg-white border-brand-border text-brand-charcoal'}`}
          >
            <ShieldCheck size={14} />
            Evidence Mode
          </button>
          <button 
            onClick={() => setShowDependencies(!showDependencies)}
            className={`flex items-center gap-2 px-4 py-2 border rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm ${showDependencies ? 'bg-brand-teal text-white border-brand-teal' : 'bg-white border-brand-border text-brand-charcoal'}`}
          >
            <GitBranch size={14} />
            Dependency View
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-brand-teal text-white rounded-xl text-xs font-bold shadow-lg shadow-brand-teal/10 hover:bg-brand-deepTeal transition-all">
            <Download size={14} />
            Export Data Log
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Semantic Confidence" 
          value="94.2%" 
          change="1.8%" 
          trend="up" 
          icon={Brain} 
        />
        <StatCard 
          label="Ingestion Rate" 
          value="2.4k/hr" 
          change="400" 
          trend="up" 
          icon={Database} 
        />
        <StatCard 
          label="Data Integrity" 
          value="99.8%" 
          change="0.1%" 
          trend="neutral" 
          icon={CheckCircle} 
        />
        <StatCard 
          label="Stability Index" 
          value="7.2/10" 
          change="0.4" 
          trend="up" 
          icon={Activity} 
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Research Trends */}
        <div className="card-enterprise p-8 rounded-2xl bg-white shadow-sm relative overflow-hidden">
          {showDependencies && (
             <div className="absolute inset-0 pointer-events-none opacity-20">
               <svg className="w-full h-full">
                 <path d="M100,100 Q200,150 300,100" stroke="#0FB9B1" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                 <path d="M400,200 Q300,250 200,200" stroke="#0FB9B1" strokeWidth="2" fill="none" strokeDasharray="4 4" />
               </svg>
             </div>
          )}
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-brand-charcoal flex items-center gap-2 text-sm uppercase tracking-wider">
              Semantic Accuracy & Maturity Timeline
              <Info size={14} className="text-brand-muted" />
            </h3>
            <select className="text-[10px] font-black uppercase tracking-widest border border-brand-border bg-brand-cream rounded-lg px-3 py-1.5 text-brand-muted outline-none focus:border-brand-teal">
              <option>Last Quarter</option>
              <option>Year to Date</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={accuracyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8E4DB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6B7C80', fontWeight: 'bold' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6B7C80', fontWeight: 'bold' }} domain={[80, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #E8E4DB', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', color: '#1F2A2E' }}
                  itemStyle={{ color: '#0FB9B1' }}
                  formatter={(value, name, props) => {
                    if (name === 'value') return [`${value}% Accuracy`, 'Semantic Confidence'];
                    return [`${(props.payload.maturity * 100).toFixed(0)}%`, 'Tech Maturity'];
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#0FB9B1" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#0FB9B1', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6, fill: '#0FB9B1', strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cluster Distribution */}
        <div className="card-enterprise p-8 rounded-2xl bg-white shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-brand-charcoal flex items-center gap-2 text-sm uppercase tracking-wider">
              Ingestion Source Volume
              <Info size={14} className="text-brand-muted" />
            </h3>
            <span className="text-[9px] font-black uppercase tracking-[0.15em] text-brand-teal bg-brand-teal/5 px-3 py-1.5 rounded-full border border-brand-teal/10">Priority: USPTO</span>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sourceData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E8E4DB" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={110} tick={{ fontSize: 11, fill: '#6B7C80', fontWeight: 'bold' }} />
                <Tooltip cursor={{ fill: '#F7F5EF' }} contentStyle={{ borderRadius: '12px', border: '1px solid #E8E4DB' }} />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={20}>
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Strategic Table Section */}
      <div className="card-enterprise bg-white rounded-2xl overflow-hidden shadow-sm relative">
        <div className="p-8 border-b border-brand-border flex items-center justify-between bg-brand-cream/30">
          <h3 className="text-lg font-extrabold text-brand-charcoal tracking-tight">Recent Processing Batches</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-brand-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-teal"></span> Friction Threshold
            </div>
            <button className="text-brand-teal text-[10px] font-black uppercase tracking-widest hover:underline decoration-2 underline-offset-8 transition-all">Full Processing Log</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-brand-cream/50 text-[10px] font-black text-brand-muted uppercase tracking-[0.2em]">
              <tr>
                <th className="px-8 py-5">Batch ID</th>
                <th className="px-8 py-5">{evidenceMode ? 'Validation Mode' : 'Validation Progress'}</th>
                <th className="px-8 py-5 text-center">{evidenceMode ? 'Citations' : 'Conflict Count'}</th>
                <th className="px-8 py-5">{evidenceMode ? 'Benchmark Δ' : 'Analysis Type'}</th>
                <th className="px-8 py-5">Pipeline Status</th>
                <th className="px-8 py-5">Friction</th>
                <th className="px-2 py-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {batches.map((row, i) => (
                <tr key={i} className="group hover:bg-brand-cream/20 transition-all duration-200">
                  <td className="px-8 py-5">
                    <span className="font-bold text-brand-charcoal text-sm group-hover:text-brand-teal transition-colors flex items-center gap-2">
                      {row.id}
                      {showDependencies && i === 0 && <GitBranch size={12} className="text-brand-teal animate-pulse" />}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    {evidenceMode ? (
                      <span className="text-[10px] font-bold text-brand-muted uppercase">Test Report V2.4</span>
                    ) : (
                      <div className="w-32 h-1.5 bg-brand-cream rounded-full overflow-hidden border border-brand-border">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${row.density * 100}%` }}
                          transition={{ duration: 1, delay: 0.2 + i * 0.1 }}
                          className="h-full bg-brand-teal" 
                        />
                      </div>
                    )}
                  </td>
                  <td className="px-8 py-5 text-center text-sm text-brand-muted font-mono font-bold tracking-tighter">
                    {evidenceMode ? (row.gaps * 12 + 10) : row.gaps.toString().padStart(2, '0')}
                  </td>
                  <td className="px-8 py-5">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                      row.impact === 'Semantic' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-slate-50 text-slate-600 border-slate-100'
                    }`}>
                      {evidenceMode ? '+4.2%' : row.impact}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${
                      row.status === 'Verified' ? 'text-brand-teal' : row.status === 'Processing' ? 'text-blue-500' : 'text-orange-500'
                    }`}>
                      <span className={`relative flex h-1.5 w-1.5`}>
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                          row.status === 'Verified' ? 'bg-brand-teal' : 'bg-blue-500'
                        }`}></span>
                        <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${
                          row.status === 'Verified' ? 'bg-brand-teal' : 'bg-blue-500'
                        }`}></span>
                      </span>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex gap-1">
                      <div className={`w-2 h-2 rounded-full ${row.friction.integration === 'High' ? 'bg-red-400' : 'bg-brand-teal/20'}`} title="Integration Delay" />
                      <div className={`w-2 h-2 rounded-full ${row.friction.compliance === 'High' ? 'bg-red-400' : 'bg-brand-teal/20'}`} title="Compliance Overhead" />
                      <div className={`w-2 h-2 rounded-full ${row.friction.resource === 'High' ? 'bg-red-400' : 'bg-brand-teal/20'}`} title="Resource Contention" />
                      <div className={`w-2 h-2 rounded-full ${row.friction.lockin === 'High' ? 'bg-red-400' : 'bg-brand-teal/20'}`} title="Vendor Lock-in" />
                    </div>
                  </td>
                  <td className="px-2 py-5 text-right">
                    <button 
                      onClick={() => setActiveDrilldown(activeDrilldown === row.id ? null : row.id)}
                      className="p-1.5 hover:bg-brand-teal/10 rounded-lg text-brand-muted hover:text-brand-teal transition-colors"
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Drill-down Intelligence Panel (Overlay) */}
        <AnimatePresence>
          {activeDrilldown && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute top-0 right-0 h-full w-72 bg-white border-l border-brand-border shadow-2xl z-40 p-8"
            >
              <div className="flex justify-between items-start mb-6">
                <h4 className="font-bold text-brand-charcoal text-sm uppercase tracking-tight">Intelligence Drill-down</h4>
                <button onClick={() => setActiveDrilldown(null)} className="text-brand-muted hover:text-brand-charcoal"><X size={18} /></button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-black text-brand-muted uppercase tracking-widest mb-3">Confidence Breakdown</p>
                  <div className="space-y-4">
                    {[
                      { label: 'Talent Availability', val: 0.85 },
                      { label: 'Infrastructure Readiness', val: 0.92 },
                      { label: 'Toolchain Stability', val: 0.78 },
                      { label: 'Vendor Reliability', val: 0.64 },
                      { label: 'Historical Performance', val: 0.88 },
                    ].map(item => (
                      <div key={item.label}>
                        <div className="flex justify-between text-[10px] font-bold mb-1">
                          <span className="text-brand-charcoal">{item.label}</span>
                          <span className="text-brand-teal">{(item.val * 100).toFixed(0)}%</span>
                        </div>
                        <div className="w-full h-1 bg-brand-cream rounded-full overflow-hidden">
                           <div className="h-full bg-brand-teal" style={{ width: `${item.val * 100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-6 border-t border-brand-border">
                  <p className="text-[10px] font-black text-brand-muted uppercase tracking-widest mb-3">Stability Signals</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 bg-brand-cream/50 rounded-lg border border-brand-border text-center">
                      <p className="text-[9px] font-black text-brand-muted uppercase">Churn Rate</p>
                      <p className="text-xs font-bold text-brand-charcoal">Low</p>
                    </div>
                    <div className="p-3 bg-brand-cream/50 rounded-lg border border-brand-border text-center">
                      <p className="text-[9px] font-black text-brand-muted uppercase">Architecture</p>
                      <p className="text-xs font-bold text-brand-teal">Stable</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Scenario Impact Simulator Overlay */}
      <AnimatePresence>
        {showSimulator && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-charcoal/20 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-brand-border overflow-hidden"
            >
              <div className="bg-brand-cream/50 px-8 py-5 border-b border-brand-border flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-teal/10 text-brand-teal rounded-lg">
                    <PlayCircle size={20} />
                  </div>
                  <h3 className="font-bold text-brand-charcoal tracking-tight">Scenario Impact Simulator</h3>
                </div>
                <button onClick={() => setShowSimulator(false)} className="text-brand-muted hover:text-brand-charcoal"><X size={20} /></button>
              </div>
              
              <div className="p-8 space-y-6">
                <div className="space-y-4">
                  <label className="block">
                    <span className="text-[10px] font-black text-brand-muted uppercase tracking-widest block mb-2">Confidence Level Adjuster</span>
                    <input type="range" className="w-full h-1.5 bg-brand-cream rounded-full appearance-none accent-brand-teal" />
                  </label>
                  <label className="block">
                    <span className="text-[10px] font-black text-brand-muted uppercase tracking-widest block mb-2">Resource Allocation Load</span>
                    <input type="range" className="w-full h-1.5 bg-brand-cream rounded-full appearance-none accent-brand-teal" />
                  </label>
                </div>
                
                <div className="bg-brand-cream/30 p-6 rounded-xl border border-dashed border-brand-border">
                  <p className="text-[10px] font-black text-brand-muted uppercase tracking-[0.2em] mb-4">Downstream Forecast</p>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs font-bold text-brand-charcoal mb-1">Release Velocity</p>
                      <p className="text-2xl font-black text-brand-teal tracking-tighter">+12.4%</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-brand-charcoal mb-1">Risk Exposure</p>
                      <p className="text-2xl font-black text-red-500 tracking-tighter">-4.8%</p>
                    </div>
                  </div>
                </div>
                
                <button className="w-full py-4 bg-brand-teal text-white font-bold rounded-xl text-xs uppercase tracking-[0.2em] shadow-lg shadow-brand-teal/20 active:scale-95 transition-all">
                  Run Monte Carlo Simulation
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnalystDashboard;
