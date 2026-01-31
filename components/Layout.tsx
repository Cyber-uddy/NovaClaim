import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Database, 
  BrainCircuit, 
  Target, 
  Lightbulb, 
  FileSearch, 
  LogOut,
  Search,
  Bell,
  Activity,
  X,
  ChevronRight,
  Terminal,
  ShieldCheck,
  Settings
} from 'lucide-react';
import { User } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutProps {
  user: User;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ user, onLogout }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCommand, setShowCommand] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [commandInput, setCommandInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>(['System initialized...', 'Strategic analysis engine: Ready.']);

  // Detect if the user is a Strategist to apply specific labeling
  const isStrategist = user.role === 'Strategist' || user.role === 'Innovation Strategist';

  const navItems = [
    { 
      name: isStrategist ? 'Dashboard' : 'Technology Portfolio', 
      path: '/', 
      icon: LayoutDashboard 
    },
    { 
      name: isStrategist ? 'Data Ingestion' : 'Innovation Signals', 
      path: '/data', 
      icon: Database 
    },
    { 
      name: isStrategist ? 'AI Analysis' : 'R&D Capability Map', 
      path: '/analysis', 
      icon: BrainCircuit 
    },
    { 
      name: isStrategist ? 'Innovation Gaps' : 'Investment Decisions', 
      path: '/gaps', 
      icon: Target 
    },
    { 
      name: isStrategist ? 'Strategy Engine' : 'Tech Infrastructure', 
      path: '/recommendations', 
      icon: Lightbulb 
    },
    { 
      name: isStrategist ? 'IP Explorer' : 'IP Risk & Conflict', 
      path: '/explorer', 
      icon: FileSearch 
    },
  ];

  /**
   * RBAC VISIBILITY LOGIC:
   * Strategist: Sees all 6 core strategy modules with strategist-specific labels.
   * Principal Analyst: Sees Dashboard, Data, Analysis, and Explorer only.
   * CTO: Full access (untouched).
   */
  const filteredNavItems = navItems.filter(item => {
    const role = user.role;
    const path = item.path;
    
    // CTO access remains full.
    if (role === 'CTO') return true;
    
    // Strategist / Innovation Strategist access.
    if (role === 'Strategist' || role === 'Innovation Strategist') {
      return ['/', '/data', '/analysis', '/gaps', '/recommendations', '/explorer'].includes(path);
    }
    
    // Principal Analyst access restricted to analytical subset.
    if (role === 'Principal Analyst') {
      return ['/', '/data', '/analysis', '/explorer'].includes(path);
    }
    
    return path === '/';
  });

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commandInput.trim()) return;
    setCommandHistory(prev => [...prev, `> ${commandInput}`, `Executing: Processing strategy for "${commandInput}"...`]);
    setCommandInput('');
  };

  return (
    <div className="flex h-screen bg-dashboard-main relative overflow-hidden text-brand-charcoal">
      <div className="absolute inset-0 bg-dashboard-grid opacity-100 pointer-events-none"></div>
      
      {/* Sidebar - UI stays identical, labels updated dynamically */}
      <aside className="w-72 bg-brand-deepTeal flex flex-col z-30 relative shadow-2xl">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg ring-1 ring-white/10">
              <span className="text-brand-deepTeal font-bold text-xl">N</span>
            </div>
            <h1 className="text-lg font-bold text-white tracking-[0.15em] uppercase">Novaclaim</h1>
          </div>
          
          <nav className="space-y-1">
            {filteredNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `group flex items-center gap-3 px-5 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    isActive 
                      ? 'bg-white/10 text-white shadow-sm' 
                      : 'text-white/60 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <item.icon size={20} className="transition-transform group-hover:scale-110" />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="px-8 mt-4 space-y-4">
          <div className="pt-6 border-t border-white/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Portfolio Sync</span>
              <span className="text-[10px] font-bold text-brand-teal uppercase">Real-Time</span>
            </div>
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: "30%" }}
                animate={{ width: "85%" }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                className="h-full bg-brand-teal"
              />
            </div>
          </div>
        </div>

        <div className="mt-auto p-8 border-t border-white/5">
          <button 
            onClick={onLogout}
            className="flex items-center gap-3 px-5 py-3.5 w-full text-left text-sm font-bold text-white/50 hover:text-red-300 hover:bg-red-400/5 rounded-xl transition-all"
          >
            <LogOut size={20} />
            Terminate Session
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-20">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-brand-border flex items-center justify-between px-10">
          <div className="relative w-1/3 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted group-focus-within:text-brand-teal transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Query strategic tech vectors..." 
              className="w-full bg-brand-cream border border-brand-border rounded-xl py-2.5 pl-12 pr-4 text-sm text-brand-charcoal placeholder-brand-muted focus:outline-none focus:ring-4 focus:ring-brand-teal/5 focus:border-brand-teal transition-all"
            />
          </div>

          <div className="flex items-center gap-8">
            <button 
              onClick={() => setShowCommand(true)}
              className="flex items-center gap-4 py-2 px-4 bg-brand-cream rounded-full border border-brand-border hover:bg-brand-teal/5 hover:border-brand-teal/20 transition-all group"
            >
               <Activity size={14} className="text-brand-teal group-hover:scale-110 transition-transform" />
               <span className="text-[10px] font-black text-brand-muted uppercase tracking-widest group-hover:text-brand-charcoal transition-colors">Tech Command Online</span>
            </button>

            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative text-brand-muted hover:text-brand-teal transition-colors p-2 rounded-xl hover:bg-brand-cream"
            >
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-brand-teal rounded-full ring-2 ring-white"></span>
            </button>
            
            <div className="flex items-center gap-4 pl-8 border-l border-brand-border relative">
              <button 
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-4 text-right hover:opacity-80 transition-opacity"
              >
                <div>
                  <p className="text-[10px] font-black text-brand-charcoal uppercase tracking-wider">{user.organization}</p>
                  <p className="text-[9px] font-bold text-brand-teal uppercase tracking-widest">{user.role}</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-brand-cream flex items-center justify-center text-brand-teal border border-brand-border font-black text-sm shadow-sm transition-transform active:scale-95">
                  {user.organization.charAt(0)}
                </div>
              </button>

              <AnimatePresence>
                {showProfile && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowProfile(false)} />
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full right-0 mt-3 w-64 bg-white border border-brand-border rounded-2xl shadow-2xl z-50 p-6 space-y-4"
                    >
                      <div className="flex items-center gap-4 border-b border-brand-border pb-4">
                        <div className="w-10 h-10 bg-brand-teal rounded-lg flex items-center justify-center text-white font-bold">
                          {user.email.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-brand-charcoal">{user.email}</p>
                          <p className="text-[10px] text-brand-muted font-medium italic">Active Session</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <button className="flex items-center gap-3 w-full p-2.5 rounded-xl text-[11px] font-bold text-brand-muted hover:bg-brand-cream hover:text-brand-teal transition-all">
                          <ShieldCheck size={16} /> Permissions Matrix
                        </button>
                        <button className="flex items-center gap-3 w-full p-2.5 rounded-xl text-[11px] font-bold text-brand-muted hover:bg-brand-cream hover:text-brand-teal transition-all">
                          <Settings size={16} /> Preferences
                        </button>
                        <button onClick={onLogout} className="flex items-center gap-3 w-full p-2.5 rounded-xl text-[11px] font-bold text-red-400 hover:bg-red-50 transition-all">
                          <LogOut size={16} /> Logout Identity
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-10 scrollbar-hide">
          <Outlet />
        </main>
      </div>

      <AnimatePresence>
        {showNotifications && (
          <>
            <div className="fixed inset-0 bg-brand-charcoal/10 backdrop-blur-[1px] z-40" onClick={() => setShowNotifications(false)} />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-white shadow-2xl z-50 border-l border-brand-border flex flex-col"
            >
              <div className="p-8 border-b border-brand-border flex justify-between items-center bg-brand-cream/30">
                <h3 className="text-sm font-black uppercase tracking-widest text-brand-charcoal">System Alerts</h3>
                <button onClick={() => setShowNotifications(false)} className="p-2 hover:bg-brand-cream rounded-full transition-colors">
                  <X size={18} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {[
                  { id: 1, title: 'Portfolio Risk Update', time: '10m ago', type: 'urgent', text: 'Anode collision probability increased to 92%.' },
                  { id: 2, title: 'New Signal Detected', time: '1h ago', type: 'info', text: 'Breakthrough in solid-state electrolytes found.' },
                  { id: 3, title: 'Export Ready', time: '2h ago', type: 'success', text: 'Q3 Audit log generation complete.' },
                ].map(alert => (
                  <div key={alert.id} className="p-4 bg-brand-cream/30 rounded-xl border border-brand-border hover:border-brand-teal transition-all cursor-pointer group">
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-[11px] font-black uppercase tracking-tight text-brand-charcoal group-hover:text-brand-teal">{alert.title}</p>
                      <span className="text-[9px] font-bold text-brand-muted">{alert.time}</span>
                    </div>
                    <p className="text-[11px] text-brand-muted leading-tight">{alert.text}</p>
                  </div>
                ))}
              </div>
              <div className="p-6 border-t border-brand-border">
                <button className="w-full py-3 bg-brand-cream border border-brand-border rounded-xl text-[10px] font-black uppercase tracking-widest text-brand-muted hover:text-brand-teal hover:border-brand-teal transition-all">Clear All Logs</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCommand && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-brand-charcoal/20 backdrop-blur-md"
              onClick={() => setShowCommand(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-2xl bg-brand-charcoal rounded-3xl shadow-2xl overflow-hidden border border-white/10 relative z-10"
            >
              <div className="bg-white/5 p-8 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Terminal size={24} className="text-brand-teal" />
                  <h3 className="text-white font-black uppercase tracking-[0.2em] text-sm">Tech Command Interface</h3>
                </div>
                <button onClick={() => setShowCommand(false)} className="text-white/40 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <div className="h-64 overflow-y-auto p-8 font-mono text-xs space-y-2 scrollbar-hide bg-black/20">
                {commandHistory.map((line, i) => (
                  <p key={i} className={line.startsWith('>') ? 'text-brand-teal' : 'text-white/60'}>
                    {line}
                  </p>
                ))}
              </div>

              <form onSubmit={handleCommand} className="p-8 bg-white/5">
                <div className="relative">
                  <ChevronRight size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-teal" />
                  <input 
                    autoFocus
                    type="text" 
                    value={commandInput}
                    onChange={(e) => setCommandInput(e.target.value)}
                    placeholder="Enter strategic command (e.g. 'filter high-risk', 'compare quantum vs bio')..."
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white text-sm font-mono placeholder-white/20 focus:outline-none focus:border-brand-teal transition-all"
                  />
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Layout;
