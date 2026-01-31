
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Globe, Leaf, Zap, ShieldCheck } from 'lucide-react';

const sdgData = [
  { subject: 'SDG-7 Clean Energy', A: 85, fullMark: 100 },
  { subject: 'SDG-9 Industry & Inf.', A: 98, fullMark: 100 },
  { subject: 'SDG-11 Sustainable Cities', A: 70, fullMark: 100 },
  { subject: 'SDG-12 Responsible Prod.', A: 45, fullMark: 100 },
  { subject: 'SDG-13 Climate Action', A: 90, fullMark: 100 },
];

const SDGImpact: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold text-brand-slate">SDG Impact Analysis</h2>
          <p className="text-slate-500 mt-1">Alignment of your patent portfolio with United Nations Sustainable Development Goals.</p>
        </div>
        <div className="flex gap-2">
          <div className="bg-green-50 px-4 py-2 rounded-lg border border-green-100 text-green-700 text-sm font-bold flex items-center gap-2">
            <Leaf size={16} />
            ESG Positive
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Radar Chart */}
        <div className="bg-white p-8 rounded-xl border border-brand-border shadow-sm">
          <h3 className="font-bold text-brand-slate mb-8 flex items-center gap-2">
            Sustainability Radar
            <span className="text-xs font-normal text-slate-400">Score Distribution</span>
          </h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={sdgData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#64748b' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} axisLine={false} tick={false} />
                <Radar
                  name="Portfolio"
                  dataKey="A"
                  stroke="#0D9488"
                  fill="#0D9488"
                  fillOpacity={0.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-brand-border shadow-sm">
            <h3 className="font-bold text-brand-slate mb-6">Key Sector Contribution</h3>
            <div className="space-y-6">
              {[
                { label: 'Renewable Power Systems', value: 92, icon: Zap, color: 'text-yellow-600', bg: 'bg-yellow-50' },
                { label: 'Carbon Abatement Tech', value: 84, icon: Leaf, color: 'text-green-600', bg: 'bg-green-50' },
                { label: 'Circular Economy Design', value: 42, icon: Globe, color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'Infrastructure Resilience', value: 76, icon: ShieldCheck, color: 'text-indigo-600', bg: 'bg-indigo-50' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${item.bg} ${item.color}`}>
                        <item.icon size={18} />
                      </div>
                      <span className="font-semibold text-brand-slate">{item.label}</span>
                    </div>
                    <span className="text-sm font-bold text-slate-600">{item.value}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-brand-teal transition-all duration-1000" 
                      style={{ width: `${item.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-brand-slate text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Globe size={120} />
            </div>
            <h4 className="text-lg font-bold mb-2">ESG Intelligence Insight</h4>
            <p className="text-brand-cream/80 text-sm leading-relaxed mb-4">
              Your recent R&D efforts in Hydrogen storage (Cluster 14) are driving a significant uplift in SDG-9 and SDG-13 alignment. We recommend highlighting this in the upcoming CSR report.
            </p>
            <button className="text-brand-teal font-bold text-sm hover:underline">View Policy Impact Report</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SDGImpact;
