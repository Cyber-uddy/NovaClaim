import React from 'react';
import { 
  ShieldAlert, 
  Target, 
  Download,
  Share2,
  Info,
  Database,
  Zap,
  Activity,
  Cpu,
  TrendingUp,
  Layers
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

/**
 * CTO ANALYTICAL LOGIC: Technology Momentum Index
 * Composite signal derived from:
 * - Patent filing acceleration
 * - Research publication growth
 * - Technical investment velocity
 * - Infrastructure expansion (R&D scaling)
 */
const momentumIndexData = [
  { name: 'Jan', value: 42.4 },
  { name: 'Feb', value: 48.8 },
  { name: 'Mar', value: 45.2 },
  { name: 'Apr', value: 58.5 },
  { name: 'May', value: 72.9 },
  { name: 'Jun', value: 85.3 },
];

/**
 * CTO ANALYTICAL LOGIC: Innovation Cluster Intensity Distribution
 * Weighted index calculated from:
 * - Patent density in technical classes
 * - Startup funding in specific tech domains
 * - Global R&D expenditure signals
 * - Technical convergence indicators
 */
const innovationIntensityData = [
  { name: 'Neural Processing', value: 92, color: '#0FB9B1' },
  { name: 'Lattice Vaults', value: 78, color: '#10B981' },
  { name: 'Quantum Logic', value: 64, color: '#3B82F6' },
  { name: 'Bio-API Mesh', value: 45, color: '#F59E0B' },
  { name: 'Edge Nodes', value: 30, color: '#6B7C80' },
];

const CTODashboard: React.FC = () => {
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
            Technology <span className="text-brand-teal">Portfolio</span> Command
          </motion.h2>
          <p className="text-brand-muted mt-1 font-medium text-sm italic">
            Chief Technology Officer Oversight • R&D Capability & IP Risk Telemetry
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-brand-border rounded-xl text-xs font-bold text-brand-charcoal hover:bg-brand-cream transition-all">
            <Share2 size={14} />
            Share Tech Roadmap
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-brand-teal text-white rounded-xl text-xs font-bold shadow-lg shadow-brand-teal/10 hover:bg-brand-deepTeal transition-all">
            <Download size={14} />
            Export Portfolio Audit
          </button>
        </div>
      </div>

      {/* Logic Point 1: Top KPI Cards (Reinterpreted for CTO Context) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Count of distinct R&D technology clusters currently under active tracking */}
        <StatCard 
          label="Active Tech Domains" 
          value="14" 
          change="3" 
          trend="up" 
          icon={Database} 
        />
        {/* Probability score derived from patent overlap + competitor technical proximity */}
        <StatCard 
          label="IP Conflict Risk" 
          value="Low-Med" 
          change="0.05" 
          trend="down" 
          icon={ShieldAlert} 
        />
        {/* % match between internal technical strengths and external innovation gaps */}
        <StatCard 
          label="Capability Alignment" 
          value="86.4%" 
          change="2.1%" 
          trend="up" 
          icon={Target} 
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Logic Point 2: Technology Momentum Index (Line Graph) */}
        <div className="card-enterprise p-8 rounded-2xl bg-white shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-brand-charcoal flex items-center gap-2 text-sm uppercase tracking-wider">
              Technology Momentum Index
              <Info size={14} className="text-brand-muted" />
            </h3>
            <select className="text-[10px] font-black uppercase tracking-widest border border-brand-border bg-brand-cream rounded-lg px-3 py-1.5 text-brand-muted outline-none focus:border-brand-teal">
              <option>Current H1 Cycle</option>
              <option>24-Month Forecast</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={momentumIndexData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8E4DB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6B7C80', fontWeight: 'bold' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6B7C80', fontWeight: 'bold' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #E8E4DB', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', color: '#1F2A2E' }}
                  itemStyle={{ color: '#0FB9B1' }}
                  formatter={(value) => [`${value} Index`, 'Momentum']}
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
          <p className="mt-4 text-[10px] text-brand-muted font-medium italic">Signal: Detecting exponential growth in Neural Processing & Lattice Architectures.</p>
        </div>

        {/* Logic Point 3: Innovation Cluster Intensity Distribution (Bar Chart) */}
        <div className="card-enterprise p-8 rounded-2xl bg-white shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-brand-charcoal flex items-center gap-2 text-sm uppercase tracking-wider">
              Innovation Intensity Distribution
              <Info size={14} className="text-brand-muted" />
            </h3>
            <span className="text-[9px] font-black uppercase tracking-[0.15em] text-brand-teal bg-brand-teal/5 px-3 py-1.5 rounded-full border border-brand-teal/10">Active Convergence Zone</span>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={innovationIntensityData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E8E4DB" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={110} tick={{ fontSize: 11, fill: '#6B7C80', fontWeight: 'bold' }} />
                <Tooltip cursor={{ fill: '#F7F5EF' }} contentStyle={{ borderRadius: '12px', border: '1px solid #E8E4DB' }} />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={20}>
                  {innovationIntensityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-4 text-[10px] text-brand-muted font-medium italic">Metric: Based on patent density, startup activity, and cross-domain mesh scores.</p>
        </div>
      </div>

      {/* Logic Point 4: Strategic Technical Investment Engine (Table) */}
      <div className="card-enterprise bg-white rounded-2xl overflow-hidden shadow-sm">
        <div className="p-8 border-b border-brand-border flex items-center justify-between bg-brand-cream/30">
          <h3 className="text-lg font-extrabold text-brand-charcoal tracking-tight">Strategic Technical Investment Engine</h3>
          <button className="text-brand-teal text-[10px] font-black uppercase tracking-widest hover:underline decoration-2 underline-offset-8 transition-all">Foundational Tech Map</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-brand-cream/50 text-[10px] font-black text-brand-muted uppercase tracking-[0.2em]">
              <tr>
                <th className="px-8 py-5">Technical Field</th>
                <th className="px-8 py-5">Market Saturation</th>
                <th className="px-8 py-5 text-center">Risk Score</th>
                <th className="px-8 py-5">Growth Projection</th>
                <th className="px-8 py-5">Strategic Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {[
                { field: "Neural Compression Engines", saturation: 0.18, risk: 2, impact: "Exponential", action: "Invest" },
                { field: "Cryogenic Logic Architectures", saturation: 0.85, risk: 1, impact: "Linear", action: "Monitor" },
                { field: "Distributed Lattice Encryption", saturation: 0.35, risk: 9, impact: "High", action: "Explore" },
                { field: "Synthetic API Bio-Mesh", saturation: 0.23, risk: 12, impact: "High", action: "Deprioritize" },
              ].map((row, i) => (
                <tr key={i} className="group hover:bg-brand-cream/20 transition-all duration-200">
                  <td className="px-8 py-5">
                    <span className="font-bold text-brand-charcoal text-sm group-hover:text-brand-teal transition-colors">{row.field}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="w-32 h-1.5 bg-brand-cream rounded-full overflow-hidden border border-brand-border">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${row.saturation * 100}%` }}
                        transition={{ duration: 1, delay: 0.2 + i * 0.1 }}
                        className="h-full bg-brand-teal" 
                      />
                    </div>
                  </td>
                  <td className="px-8 py-5 text-center text-sm text-brand-muted font-mono font-bold tracking-tighter">
                    {row.risk.toString().padStart(2, '0')}
                  </td>
                  <td className="px-8 py-5">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                      row.impact === 'Exponential' ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                    }`}>
                      {row.impact}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${
                      row.action === 'Invest' ? 'text-brand-teal' : row.action === 'Deprioritize' ? 'text-red-500' : row.action === 'Explore' ? 'text-blue-500' : 'text-brand-muted'
                    }`}>
                      <span className={`relative flex h-1.5 w-1.5`}>
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                          row.action === 'Invest' ? 'bg-brand-teal' : row.action === 'Deprioritize' ? 'bg-red-500' : 'bg-brand-muted'
                        }`}></span>
                        <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${
                          row.action === 'Invest' ? 'bg-brand-teal' : row.action === 'Deprioritize' ? 'bg-red-500' : 'bg-brand-muted'
                        }`}></span>
                      </span>
                      {row.action}
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

export default CTODashboard;