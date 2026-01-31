
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, change, trend, icon: Icon }) => {
  return (
    <motion.div 
      whileHover={{ y: -4, borderColor: 'rgba(15, 185, 177, 0.4)' }}
      className="card-enterprise p-7 rounded-2xl flex flex-col justify-between"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-black text-brand-muted uppercase tracking-[0.2em] mb-2">{label}</p>
          <h3 className="text-3xl font-extrabold text-brand-charcoal tracking-tight">{value}</h3>
        </div>
        <div className="p-3 bg-brand-teal/5 rounded-xl text-brand-teal border border-brand-teal/10">
          <Icon size={24} />
        </div>
      </div>
      
      {change && (
        <div className="mt-4 flex items-center gap-2">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
            trend === 'up' ? 'bg-teal-50 text-teal-600' : 
            trend === 'down' ? 'bg-red-50 text-red-600' : 
            'bg-slate-50 text-slate-500'
          }`}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '•'} {change}
          </span>
          <span className="text-[10px] font-bold text-brand-muted uppercase tracking-widest">Delta</span>
        </div>
      )}
    </motion.div>
  );
};

export default StatCard;
