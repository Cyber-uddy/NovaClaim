import React, { useState, useEffect, useRef } from 'react';
import { Upload, Zap, TrendingUp, Search, Loader2, FileText, CheckCircle2 } from 'lucide-react';
import { useStrategicData } from '../App';
import { startAnalysisJob, getJobStatus } from '../services/geminiService';
import { JobStatus } from '../types';

const DataManagement: React.FC = () => {
  const { data, setData } = useStrategicData();
  const [jobStatus, setJobStatus] = useState<JobStatus | null>(null);
  const [uploadedFile, setUploadedFile] = useState<{ name: string; type: string } | null>(null);
  // Fixed: Use ReturnType<typeof setInterval> instead of NodeJS.Timeout to avoid namespace errors in browser environments
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [datasets] = useState([
    { 
      id: 'SIG-001', 
      name: 'Hydrogen Storage & Transport Velocity', 
      rows: 88, 
      status: 'Active', 
      date: '2024-03-12', 
      source: 'Research Acceleration',
      interpretation: '38% acceleration across EU and APAC indicates infrastructure planning relevance within 24 months.'
    },
    { 
      id: 'SIG-002', 
      name: 'Neural Compression & Edge Distillation', 
      rows: 94, 
      status: 'Surging', 
      date: '2024-06-01', 
      source: 'Funding Momentum',
      interpretation: 'Rapid convergence between mobile edge compute and neural distillation signals a shift in hardware dependency cycles.'
    },
    { 
      id: 'SIG-003', 
      name: 'Post-Quantum Cryptographic Protocols', 
      rows: 72, 
      status: 'Ready', 
      date: '2024-05-20', 
      source: 'Patent Velocity',
      interpretation: 'Standardization velocity suggests a 12-month window for enterprise-wide cryptographic migration readiness.'
    },
  ]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadedFile({ name: file.name, type: file.type });
    
    // In a production environment, we'd send the file blob to the server
    // Here we simulate text extraction for the "job"
    const jobId = await startAnalysisJob(file.name, `Content of ${file.name} simulated for analysis.`);
    
    // Start polling
    if (pollingRef.current) clearInterval(pollingRef.current);
    pollingRef.current = setInterval(() => {
      const status = getJobStatus(jobId);
      setJobStatus(status);
      
      if (status.status === 'COMPLETED' && status.result) {
        setData(status.result);
        if (pollingRef.current) clearInterval(pollingRef.current);
      } else if (status.status === 'FAILED') {
        if (pollingRef.current) clearInterval(pollingRef.current);
      }
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, []);

  const isAnalyzing = jobStatus && !['COMPLETED', 'FAILED'].includes(jobStatus.status);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-brand-charcoal tracking-tight">Innovation <span className="text-brand-teal">Signals</span></h2>
            <p className="text-brand-muted mt-1 font-medium text-sm italic">Technology Early Warning System • Emerging breakthrough radar.</p>
          </div>
          <div className="flex items-center gap-3 py-2 px-4 bg-brand-teal/5 border border-brand-teal/10 rounded-xl">
            {isAnalyzing ? (
              <Loader2 size={16} className="text-brand-teal animate-spin" />
            ) : (
              <TrendingUp size={16} className="text-brand-teal" />
            )}
            <span className="text-[10px] font-black uppercase text-brand-teal tracking-widest">
              {isAnalyzing ? `Pipeline: ${jobStatus?.status}` : (data ? "Breakthrough Deep-Dive Active" : "Early Breakthrough Detected")}
            </span>
          </div>
        </div>
        <div className="p-4 bg-brand-cream border border-brand-border rounded-xl">
          <p className="text-xs font-bold text-brand-charcoal leading-relaxed italic opacity-80">
            {data 
              ? `Detected ${data.ip_type}: ${data.summary}` 
              : '"This radar detects accelerating technologies before mainstream adoption, enabling proactive infrastructure, capability, and investment planning."'
            }
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Radar Expansion Panel */}
        <div className="lg:col-span-1 bg-white p-8 rounded-xl border-2 border-dashed border-brand-border flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-brand-teal/10 rounded-full flex items-center justify-center text-brand-teal mb-6">
            {isAnalyzing ? <Loader2 size={32} className="animate-spin" /> : <Upload size={32} />}
          </div>
          <h3 className="text-lg font-bold text-brand-charcoal mb-2">
            {isAnalyzing ? "Processing Technical Intelligence" : uploadedFile ? `Latest: ${uploadedFile.name}` : "Ingest Technical Intelligence"}
          </h3>
          <p className="text-sm text-brand-muted mb-6 leading-relaxed">
            {isAnalyzing 
              ? `Status: ${jobStatus?.status} (${jobStatus?.progress}%)` 
              : data 
              ? `Analysis: ${data.novelty_score}% Novelty | ${data.patentable_decision} Decision.` 
              : "Upload PDF patents, CSV datasets, JSON tech specs, or TXT reports to perform semantic cross-referencing."
            }
          </p>
          <input type="file" id="file-upload" className="hidden" onChange={handleFileUpload} accept=".json,.csv,.txt,.pdf" />
          <label 
            htmlFor="file-upload"
            className={`w-full py-3 rounded-lg font-bold cursor-pointer transition-colors text-xs uppercase tracking-widest text-center shadow-md ${
              isAnalyzing ? "bg-brand-muted text-white cursor-wait" : "bg-brand-teal text-white hover:bg-brand-deepTeal"
            }`}
          >
            {isAnalyzing ? "Async Worker Busy..." : "Select Source File"}
          </label>
        </div>

        {/* Radar Board Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-brand-border shadow-sm overflow-hidden">
          <div className="p-6 border-b border-brand-border flex items-center justify-between">
            <h3 className="font-extrabold text-brand-charcoal text-sm uppercase tracking-wider">Strategic Ingestion Log</h3>
            <span className="text-[10px] font-black bg-brand-cream text-brand-muted px-3 py-1.5 rounded-full uppercase tracking-widest">
              {data ? "Active Pipeline" : "Idle"}
            </span>
          </div>
          <table className="w-full text-left">
            <thead className="bg-brand-cream/30 text-[10px] font-black text-brand-muted uppercase tracking-[0.2em]">
              <tr>
                <th className="px-6 py-4">Intelligence Source</th>
                <th className="px-6 py-4 text-center">Similarity Index</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {uploadedFile && (
                <tr className="bg-brand-teal/5 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-brand-teal/5 text-brand-teal rounded">
                          <FileText size={14} />
                        </div>
                        <p className="font-bold text-brand-charcoal text-sm">{uploadedFile.name}</p>
                      </div>
                      {data && (
                        <p className="text-[11px] text-brand-muted font-medium italic leading-relaxed pl-7 border-l-2 border-brand-teal/20 ml-3">
                          {data.ip_type} Identified • Decision: {data.patentable_decision}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-mono text-brand-teal font-bold text-center">
                    {data ? `${data.similarity_score}%` : "---"}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                      isAnalyzing ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-brand-teal/10 text-brand-teal border-brand-teal/20'
                    }`}>
                      {isAnalyzing ? jobStatus?.status : 'Processed'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-brand-teal hover:bg-brand-teal/10 transition-colors rounded-lg">
                      <Search size={16} />
                    </button>
                  </td>
                </tr>
              )}
              {datasets.map((ds) => (
                <tr key={ds.id} className="hover:bg-brand-cream/20 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-brand-teal/5 text-brand-teal rounded">
                          <TrendingUp size={14} />
                        </div>
                        <p className="font-bold text-brand-charcoal text-sm">{ds.name}</p>
                      </div>
                      <p className="text-[11px] text-brand-muted font-medium italic leading-relaxed pl-7 border-l-2 border-brand-teal/20 ml-3">
                        {ds.interpretation}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-mono text-brand-teal font-bold text-center">
                    {ds.rows}%
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      ds.status === 'Surging' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {ds.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-brand-teal transition-colors">
                        <Search size={16} />
                      </button>
                    </div>
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

export default DataManagement;