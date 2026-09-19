import React, { useState } from 'react';
import { User, Globe, Cpu, Database, Search, FileText, Bot, CheckCircle2, ArrowRight } from 'lucide-react';

const RAG_STEPS = [
  { id: 1, label: "USER", sub: "Input Query", icon: <User className="w-4 h-4 text-tron-cyan" />, desc: "Domain query entered via HUD web client" },
  { id: 2, label: "WEB APP", sub: "Flask API", icon: <Globe className="w-4 h-4 text-blue-400" />, desc: "Request normalization and authentication" },
  { id: 3, label: "EMBEDDING", sub: "HuggingFace", icon: <Cpu className="w-4 h-4 text-tron-cyan" />, desc: "Dense 768-dim semantic vector generation" },
  { id: 4, label: "VECTOR SEARCH", sub: "FAISS / Chroma", icon: <Search className="w-4 h-4 text-tron-amber" />, desc: "Cosine similarity top-k retrieval" },
  { id: 5, label: "RELEVANT DOCS", sub: "Context Ingestion", icon: <FileText className="w-4 h-4 text-emerald-400" />, desc: "Ranked chunk extraction with metadata" },
  { id: 6, label: "LOCAL LLM", sub: "Quantized Inference", icon: <Bot className="w-4 h-4 text-purple-400" />, desc: "Grounded context synthesis without hallucination" },
  { id: 7, label: "ANSWER", sub: "Verified Output", icon: <CheckCircle2 className="w-4 h-4 text-tron-green" />, desc: "Cited, deterministic domain response" },
];

export default function RagVisualizer() {
  const [activeStep, setActiveStep] = useState(3);

  return (
    <div className="bg-tron-panel/90 border border-tron-cyan/40 p-4 rounded clip-chamfer shadow-panel-inner my-4">
      <div className="flex items-center justify-between mb-3 border-b border-tron-border/80 pb-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-tron-cyan animate-pulse" />
          <span className="font-mono text-xs font-bold text-tron-cyan tracking-wider">
            GENAI RAG ARCHITECTURAL DATA FLOW PIPELINE
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-400">CLICK NODES TO INSPECT</span>
      </div>

      {/* Interactive Step Pipeline Nodes */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {RAG_STEPS.map((step, idx) => (
          <div key={step.id} className="flex flex-col items-center">
            <button
              onClick={() => setActiveStep(step.id)}
              className={`w-full p-2.5 rounded border transition-all text-center flex flex-col items-center gap-1 relative ${
                activeStep === step.id
                  ? 'bg-tron-cyan/20 border-tron-cyan shadow-cyan-glow-sm scale-105 z-10'
                  : 'bg-tron-dark border-tron-border hover:border-tron-cyan/50 opacity-80'
              }`}
            >
              <div className="p-1 rounded bg-slate-900 border border-slate-700">
                {step.icon}
              </div>
              <div className="font-mono text-[11px] font-bold text-white mt-1">
                {step.label}
              </div>
              <div className="font-mono text-[9px] text-slate-400">
                {step.sub}
              </div>
            </button>
            {idx < RAG_STEPS.length - 1 && (
              <div className="hidden lg:block my-1 text-slate-600 text-xs">
                ▼
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Active Step Telemetry Detail */}
      {activeStep && (
        <div className="mt-3 p-2.5 rounded bg-slate-950/70 border border-tron-border text-xs font-mono flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-tron-cyan font-bold">NODE [0{activeStep}]:</span>
            <span>{RAG_STEPS.find((s) => s.id === activeStep)?.desc}</span>
          </div>
          <span className="text-tron-green text-[10px] uppercase tracking-wider">ONLINE</span>
        </div>
      )}
    </div>
  );
}
