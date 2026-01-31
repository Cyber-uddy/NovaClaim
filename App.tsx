
import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './views/Login';
import CTODashboard from './views/CTODashboard';
import AnalystDashboard from './views/AnalystDashboard';
import Dashboard from './views/Dashboard';
import DataManagement from './views/DataManagement';
import AIAnalysis from './views/AIAnalysis';
import InnovationGaps from './views/InnovationGaps';
import Recommendations from './views/Recommendations';
import Explorer from './views/Explorer';
import Layout from './components/Layout';
import { User, AnalysisResult } from './types';

// Context for shared intelligence data
interface StrategicContextType {
  data: AnalysisResult | null;
  setData: (data: AnalysisResult | null) => void;
}

const StrategicContext = createContext<StrategicContextType>({
  data: null,
  setData: () => {},
});

export const useStrategicData = () => useContext(StrategicContext);

const ProtectedRoute: React.FC<{ 
  user: User, 
  allowedRoles: string[], 
  children: React.ReactElement 
}> = ({ user, allowedRoles, children }) => {
  const isAuthorized = allowedRoles.some(role => 
    user.role === role || (role === 'Strategist' && user.role === 'Innovation Strategist')
  );
  
  if (!user.isAuthenticated) return <Navigate to="/login" />;
  if (!isAuthorized) return <Navigate to="/" />;
  return children;
};

const DashboardSwitcher: React.FC<{ user: User }> = ({ user }) => {
  if (user.role === 'CTO') return <CTODashboard />;
  if (user.role === 'Principal Analyst') return <AnalystDashboard />;
  return <Dashboard />;
};

const App: React.FC = () => {
  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem('nova_user');
    return saved ? JSON.parse(saved) : {
      email: '',
      organization: '',
      role: '',
      isAuthenticated: false,
    };
  });

  const [strategicData, setStrategicData] = useState<AnalysisResult | null>(() => {
    const saved = localStorage.getItem('nova_intelligence_data');
    return saved ? JSON.parse(saved) : null;
  });

  // Persist state to simulation store
  useEffect(() => {
    localStorage.setItem('nova_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    if (strategicData) {
      localStorage.setItem('nova_intelligence_data', JSON.stringify(strategicData));
    }
  }, [strategicData]);

  const handleLogin = (userData: User) => {
    setUser({ ...userData, isAuthenticated: true });
  };

  const handleLogout = () => {
    setUser({ email: '', organization: '', role: '', isAuthenticated: false });
    setStrategicData(null);
    localStorage.removeItem('nova_user');
    localStorage.removeItem('nova_intelligence_data');
  };

  return (
    <StrategicContext.Provider value={{ data: strategicData, setData: setStrategicData }}>
      <HashRouter>
        <Routes>
          <Route 
            path="/login" 
            element={!user.isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} 
          />
          
          <Route 
            path="/" 
            element={user.isAuthenticated ? <Layout user={user} onLogout={handleLogout} /> : <Navigate to="/login" />}
          >
            <Route index element={<DashboardSwitcher user={user} />} />
            
            <Route 
              path="data" 
              element={
                <ProtectedRoute user={user} allowedRoles={['CTO', 'Strategist', 'Innovation Strategist', 'Principal Analyst']}>
                  <DataManagement />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="analysis" 
              element={
                <ProtectedRoute user={user} allowedRoles={['CTO', 'Strategist', 'Innovation Strategist', 'Principal Analyst']}>
                  <AIAnalysis />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="gaps" 
              element={
                <ProtectedRoute user={user} allowedRoles={['CTO', 'Strategist', 'Innovation Strategist']}>
                  <InnovationGaps />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="recommendations" 
              element={
                <ProtectedRoute user={user} allowedRoles={['CTO', 'Strategist', 'Innovation Strategist']}>
                  <Recommendations />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="explorer" 
              element={
                <ProtectedRoute user={user} allowedRoles={['CTO', 'Strategist', 'Innovation Strategist', 'Principal Analyst']}>
                  <Explorer />
                </ProtectedRoute>
              } 
            />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </HashRouter>
    </StrategicContext.Provider>
  );
};

export default App;
