import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { User } from '../types';
import { BrainCircuit, Target, ArrowRight, ShieldCheck, LucideIcon, Lock, Sparkles } from 'lucide-react';

interface LoginProps {
  onLogin: (userData: User) => void;
}

const BackgroundIntelligence = () => {
  // Generate stable random values for background nodes
  const nodes = useMemo(() => {
    return [...Array(40)].map((_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1.5 + Math.random() * 0.5, // radius 1.5-2 -> diameter 3-4px
      duration: 18 + Math.random() * 24, // Slower motion speed
      delay: Math.random() * -30,
      driftX: (Math.random() - 0.5) * 40,
      driftY: (Math.random() - 0.5) * 40,
      color: i % 2 === 0 ? '#9FE9E2' : '#7FE0D6',
    }));
  }, []);

  const lines = useMemo(() => {
    return [...Array(25)].map((_, i) => {
      const start = Math.floor(Math.random() * nodes.length);
      const end = Math.floor(Math.random() * nodes.length);
      return { start, end, duration: 6 + Math.random() * 8, delay: Math.random() * -10 };
    });
  }, [nodes]);

  const techLines = useMemo(() => {
    return [...Array(8)].map((_, i) => ({
      y: 10 + Math.random() * 80,
      angle: (Math.random() - 0.5) * 15,
      delay: Math.random() * -20,
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Premium Technical Grid Overlay */}
      <div className="absolute inset-0 bg-tech-grid opacity-100"></div>
      
      {/* Dark Contrast Radial Gradient behind particles */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{ background: 'radial-gradient(circle at 40% 45%, rgba(0,0,0,0.15), transparent 60%)' }}
      ></div>

      {/* Radial Lighting Diffusion */}
      <div 
        className="absolute top-[40%] left-[35%] -translate-y-1/2 -translate-x-1/2 w-[1200px] h-[1200px] rounded-full blur-[200px] opacity-[0.14]"
        style={{ background: 'radial-gradient(circle, #FFFFFF 0%, transparent 60%)' }}
      ></div>

      {/* Layer: Tech Scanning Lines */}
      <svg className="absolute inset-0 w-full h-full">
        {techLines.map((line, i) => (
          <line
            key={`tech-${i}`}
            x1="-10%"
            y1={`${line.y}%`}
            x2="110%"
            y2={`${line.y + line.angle}%`}
            stroke="rgba(255, 255, 255, 0.04)"
            strokeWidth="1"
            className="animate-tech-line"
            style={{ animationDelay: `${line.delay}s` } as any}
          />
        ))}
      </svg>

      {/* Layer: Animated Data Field (Neural Particles) */}
      <svg className="absolute inset-0 w-full h-full opacity-100">
        <defs>
          <filter id="nodeGlow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="lineGlow">
            <feGaussianBlur stdDeviation="1" result="lineBlur"/>
            <feMerge>
              <feMergeNode in="lineBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Dynamic Connecting Lines */}
        {lines.map((line, i) => (
          <line
            key={`line-${i}`}
            x1={`${nodes[line.start].x}%`}
            y1={`${nodes[line.start].y}%`}
            x2={`${nodes[line.end].x}%`}
            y2={`${nodes[line.end].y}%`}
            stroke="rgba(140, 255, 245, 0.22)"
            strokeWidth="1"
            filter="url(#lineGlow)"
            className="animate-neural-line"
            style={{ 
              '--duration': `${line.duration}s`, 
              '--delay': `${line.delay}s` 
            } as any}
          />
        ))}

        {/* Data Nodes (Dots) */}
        {nodes.map((node, i) => (
          <circle
            key={`node-${i}`}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r={node.size}
            fill={node.color}
            filter="url(#nodeGlow)"
            className="animate-data-node"
            style={{ 
              '--duration': `${node.duration}s`, 
              '--delay': `${node.delay}s`,
              '--drift-x': `${node.driftX}px`,
              '--drift-y': `${node.driftY}px`
            } as any}
          />
        ))}
      </svg>

      {/* Depth Static Elements */}
      <svg className="absolute inset-0 w-full h-full">
        <g className="opacity-[0.035]">
          <path d="M-200,300 Q200,100 600,300 T1400,300" fill="none" stroke="white" strokeWidth="1.5" />
          <path d="M-100,600 Q300,400 700,600 T1500,600" fill="none" stroke="white" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
};

const FeatureCard: React.FC<{ title: string, desc: string, icon: LucideIcon, delay: number }> = ({ title, desc, icon: Icon, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    className="card-feature-enterprise p-8 flex flex-col gap-5"
  >
    <div className="module-accent"></div>
    <div className="flex justify-between items-start">
      <div className="w-12 h-12 bg-brand-teal/10 rounded-lg flex items-center justify-center text-brand-teal border border-brand-teal/20 shadow-sm">
        <Icon size={24} />
      </div>
    </div>
    
    <div>
      <h4 className="font-bold text-brand-charcoal text-lg mb-2 tracking-tight">
        {title}
      </h4>
      <p className="text-sm text-brand-muted leading-relaxed font-medium">
        {desc}
      </p>
    </div>
  </motion.div>
);

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    organization: 'Global R&D Corp',
    role: 'Innovation Strategist'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({
      email: formData.email,
      organization: formData.organization,
      role: formData.role,
      isAuthenticated: true
    });
  };

  return (
    <div className="min-h-screen flex bg-command-center relative overflow-hidden selection:bg-brand-teal/20 selection:text-brand-charcoal">
      <BackgroundIntelligence />
      
      {/* Left Panel - System Narrative */}
      <div className="hidden lg:flex flex-col justify-center w-3/5 p-24 relative z-10 overflow-y-auto scrollbar-hide">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-16"
        >
          <div className="w-10 h-10 bg-brand-teal rounded-lg flex items-center justify-center shadow-lg shadow-brand-teal/10">
            <span className="text-white font-extrabold text-xl">N</span>
          </div>
          <h1 className="text-sm font-bold text-white tracking-[0.2em] uppercase opacity-90">Novaclaim AI</h1>
        </motion.div>
        
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 leading-tight tracking-tight text-white"
          >
            <span className="text-6xl font-bold block mb-2 text-luminous-intel">AI-Driven Patent Intelligence</span>
            <span className="text-5xl font-medium block text-luminous-intel">for Innovation Strategy</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-lg text-white/80 max-w-2xl leading-relaxed font-medium"
          >
            Deploying high-fidelity semantic analysis for Fortune 500 R&D teams to navigate global intellectual property and reveal hidden strategic opportunities.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          <FeatureCard 
            delay={0.6}
            icon={BrainCircuit}
            title="Domain Mapping"
            desc="Automated semantic clustering of emerging technologies into intuitive domain maps."
          />
          <FeatureCard 
            delay={0.7}
            icon={Target}
            title="Whitespace Analysis"
            desc="Strategic detection of low-density R&D clusters to identify high-impact innovation gaps."
          />
          <FeatureCard 
            delay={0.8}
            icon={ShieldCheck}
            title="Enterprise Security"
            desc="Structured data governance for mission-critical intellectual property assets."
          />
          <FeatureCard 
            delay={0.9}
            icon={Sparkles}
            title="Semantic Insight Engine"
            desc="AI-driven deep semantic analysis that uncovers hidden relationships between technologies, patents, and innovation signals."
          />
        </div>
      </div>

      {/* Right Panel - Elite Command Access */}
      <div className="flex-1 flex items-center justify-center p-12 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md elite-glass p-12 rounded-3xl relative overflow-hidden"
        >
          <div className="text-center mb-10 relative">
            <div className="w-16 h-16 bg-brand-teal/5 rounded-full flex items-center justify-center text-brand-teal mx-auto mb-6 border border-brand-teal/10">
              <Lock size={28} />
            </div>
            <h3 className="text-2xl font-bold text-brand-charcoal mb-2 tracking-tight">System Access</h3>
            <p className="text-[10px] font-bold text-brand-muted uppercase tracking-[0.2em]">R&D Intelligence Channel</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative">
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest ml-1">Identity Recon</label>
              <input 
                required
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="input-command w-full px-5 py-3.5 text-brand-charcoal rounded-xl placeholder-slate-400 text-sm font-medium"
                placeholder="analyst@organization.hq"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest ml-1">Access Token</label>
              <input 
                required
                type="password" 
                className="input-command w-full px-5 py-3.5 text-brand-charcoal rounded-xl placeholder-slate-400 text-sm font-medium"
                placeholder="••••••••"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest ml-1">Entity</label>
                <select 
                  value={formData.organization}
                  onChange={(e) => setFormData({...formData, organization: e.target.value})}
                  className="input-command w-full px-4 py-3.5 text-brand-charcoal rounded-xl text-xs font-bold cursor-pointer appearance-none bg-no-repeat bg-[right_1rem_center]"
                >
                  <option>Global R&D Corp</option>
                  <option>Sust. Partners LLC</option>
                  <option>TechVision Policy</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-brand-muted uppercase tracking-widest ml-1">Auth Level</label>
                <select 
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="input-command w-full px-4 py-3.5 text-brand-charcoal rounded-xl text-xs font-bold cursor-pointer appearance-none"
                >
                  <option>Strategist</option>
                  <option>CTO</option>
                  <option>Principal Analyst</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between py-1">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="checkbox-custom" />
                <span className="text-[11px] font-bold text-brand-muted group-hover:text-brand-charcoal transition-colors uppercase tracking-tight">Active Persistence</span>
              </label>
              <a href="#" className="text-[11px] font-bold text-brand-teal hover:underline underline-offset-4 decoration-2">Token Recovery</a>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02, boxShadow: '0 8px 20px rgba(18, 179, 166, 0.25)' }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="w-full h-12 bg-[linear-gradient(135deg,#18C4B3,#0F8F87)] text-white font-bold rounded-xl transition-all shadow-md shadow-brand-teal/10 flex items-center justify-center gap-3 mt-6 text-xs uppercase tracking-[0.2em]"
            >
              INITIALIZE SESSION
              <ArrowRight size={16} />
            </motion.button>
          </form>

          {/* Caffeine & Code Signature Strip */}
          <div className="mt-12 border-t border-brand-border pt-8 flex justify-center">
            <span className="text-[10px] font-bold text-brand-muted/60 tracking-[0.3em] uppercase">
              Caffeine & Code
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;