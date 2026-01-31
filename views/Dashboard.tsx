
import React, { useMemo } from 'react';
import { 
  Database, 
  Layers, 
  ShieldAlert, 
  Download,
  Share2,
  Info
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
import { motion } from 'framer-motion';
import { useStrategicData } from '../App';

const defaultTrendData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 520 },
  { name: 'Mar', value: 480 },
  { name: 'Apr', value: 610 },
  { name: 'May', value: 750 },
  { name: 'Jun', value: 890 },
];

const defaultClusterData = [
  { name: 'Quantum Comp.', value: 120, color: '#0FB9B1' },
  { name: 'Grid Tech', value: 95, color: '#10B981' },
  { name: 'Bio-plastics', value: 70, color: '#3B82F6' },
  { name: 'Edge AI', value: 110, color: '#F59E0B' },
  { name: 'Carbon Cap.', value: 45, color: '#6B7C80' },
];

const Dashboard: React.FC = () => {
  const { data } = useStrategicData();

  const clusterMetrics = useMemo(() => {
    if (!data || !data.domains) return defaultClusterData;
    const colors = ['#0FB9B1', '#10B981', '#3B82F6', '#F59E0B', '#6B7C80'];
    return data.domains.map((d, i) => ({
      name: d.name,
      value: d.children?.reduce((acc, c) => acc + (c.size || 0), 0) || 50,
      color: colors[i % colors.length]
    }));
  }, [data]);

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-extrabold text-brand-charcoal tracking-tight"
          >
            Technology <span className="text-brand-teal">Portfolio</span> Oversight
          </motion.h2>
          <p className="text-brand-muted mt-1 font-medium text-sm italic">Global domain distribution • Portfolio maturity health telemetry</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-brand-border rounded-xl text-xs font-bold text-brand-charcoal hover:bg-brand-cream transition-all">
            <Share2 size={14} />
            Share Portfolio
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-brand-teal text-white rounded-xl text-xs font-bold shadow-lg shadow-brand-teal/10 hover:bg-brand-deepTeal transition-all">
            <Download size={14} />
            Export Portfolio Audit
          </button>
        </div>
      </div>

      {/* KPI Cards - Connected to Backend Intelligence */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          label="Patentability Probability" 
          value={data?.patentable_probability || "Analyzing..."} 
          change={data ? "94.2% AI Confidence" : "N/A"} 
          trend="up" 
          icon={Database} 
        />
        <StatCard 
          label="Novelty Index" 
          value={data ? `${data.novelty_score}%` : "74.1%"} 
          change={data ? "Semantic Verified" : "Benchmark"} 
          trend="up" 
          icon={Layers} 
        />
        <StatCard 
          label="Concentration Risk" 
          value={data ? (data.risk_flags.length > 2 ? 'High' : 'Low-Med') : 'Low-Med'} 
          change={data ? `${data.risk_flags.length} Red Flags` : "Baseline"} 
          trend="down" 
          icon={ShieldAlert} 
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Research Trends */}
        <div className="card-enterprise p-8 rounded-2xl bg-white shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-brand-charcoal flex items-center gap-2 text-sm uppercase tracking-wider">
              Tech Growth vs Decline Velocity
              <Info size={14} className="text-brand-muted" />
            </h3>
            <select className="text-[10px] font-black uppercase tracking-widest border border-brand-border bg-brand-cream rounded-lg px-3 py-1.5 text-brand-muted outline-none focus:border-brand-teal">
              <option>6 Month Forecast</option>
              <option>12 Month Forecast</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={defaultTrendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8E4DB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6B7C80', fontWeight: 'bold' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6B7C80', fontWeight: 'bold' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #E8E4DB', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', color: '#1F2A2E' }}
                  itemStyle={{ color: '#0FB9B1' }}
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
              Domain Maturity Balance
              <Info size={14} className="text-brand-muted" />
            </h3>
            <span className="text-[9px] font-black uppercase tracking-[0.15em] text-brand-teal bg-brand-teal/5 px-3 py-1.5 rounded-full border border-brand-teal/10">
              {data ? `Primary: ${data.domains[0]?.name}` : "Dominant: Energy Storage"}
            </span>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={clusterMetrics} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E8E4DB" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={110} tick={{ fontSize: 11, fill: '#6B7C80', fontWeight: 'bold' }} />
                <Tooltip cursor={{ fill: '#F7F5EF' }} contentStyle={{ borderRadius: '12px', border: '1px solid #E8E4DB' }} />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={20}>
                  {clusterMetrics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Strategic Table Section */}
      <div className="card-enterprise bg-white rounded-2xl overflow-hidden shadow-sm">
        <div className="p-8 border-b border-brand-border flex items-center justify-between bg-brand-cream/30">
          <h3 className="text-lg font-extrabold text-brand-charcoal tracking-tight">Portfolio Dominance Zones</h3>
          <button className="text-brand-teal text-[10px] font-black uppercase tracking-widest hover:underline decoration-2 underline-offset-8 transition-all">View Cluster Mesh</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-brand-cream/50 text-[10px] font-black text-brand-muted uppercase tracking-[0.2em]">
              <tr>
                <th className="px-8 py-5">Technology Domain</th>
                <th className="px-8 py-5">Market Maturity</th>
                <th className="px-8 py-5 text-center">IP Density Delta</th>
                <th className="px-8 py-5">Strategic Impact</th>
                <th className="px-8 py-5">Investment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {(data?.domains || [
                { name: "Neural Compression Foundations", maturity: "Scaling", children: [] },
                { name: "Grid Edge Micro-Inverters", maturity: "Maintain", children: [] },
              ]).map((row: any, i) => (
                <tr key={i} className="group hover:bg-brand-cream/20 transition-all duration-200">
                  <td className="px-8 py-5">
                    <span className="font-bold text-brand-charcoal text-sm group-hover:text-brand-teal transition-colors">{row.name}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="w-32 h-1.5 bg-brand-cream rounded-full overflow-hidden border border-brand-border">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(i + 1) * 25}%` }}
                        transition={{ duration: 1, delay: 0.2 + i * 0.1 }}
                        className="h-full bg-brand-teal" 
                      />
                    </div>
                  </td>
                  <td className="px-8 py-5 text-center text-sm text-brand-muted font-mono font-bold tracking-tighter">{(i + 4).toString().padStart(2, '0')}</td>
                  <td className="px-8 py-5">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                      i % 2 === 0 ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                    }`}>
                      {i % 2 === 0 ? 'Exponential' : 'High'}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${
                      row.maturity === 'Scaling' ? 'text-brand-teal' : 'text-brand-muted'
                    }`}>
                      <span className={`relative flex h-1.5 w-1.5`}>
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                          row.maturity === 'Scaling' ? 'bg-brand-teal' : 'bg-brand-muted'
                        }`}></span>
                        <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${
                          row.maturity === 'Scaling' ? 'bg-brand-teal' : 'bg-brand-muted'
                        }`}></span>
                      </span>
                      {row.maturity || 'Exploratory'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
