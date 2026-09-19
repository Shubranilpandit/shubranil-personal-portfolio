import React from 'react';
import { User, Cpu, Code2, Database, Compass, CheckCircle2 } from 'lucide-react';
import { sound } from '../services/soundService';

export default function About({ profile }) {
  const infoCards = [
    {
      icon: <User className="w-5 h-5 text-tron-cyan" />,
      label: "IDENTITY",
      value: "MCA — Data Science",
      subtitle: "Master of Computer Applications",
    },
    {
      icon: <Cpu className="w-5 h-5 text-tron-cyan" />,
      label: "FOCUS",
      value: "AI / ML / Data Science",
      subtitle: "High-Dimensional Analytics & Models",
    },
    {
      icon: <Code2 className="w-5 h-5 text-tron-cyan" />,
      label: "DEVELOPMENT",
      value: "Full-Stack Development",
      subtitle: "Flask, React, RESTful Architecture",
    },
    {
      icon: <Database className="w-5 h-5 text-tron-cyan" />,
      label: "DATA SYSTEMS",
      value: "Big Data & Relational DBs",
      subtitle: "PostgreSQL, Hadoop, HDFS, MapReduce",
    },
    {
      icon: <Compass className="w-5 h-5 text-tron-cyan" />,
      label: "INTEREST",
      value: "Intelligent Systems & RAG",
      subtitle: "Retrieval-Augmented Generation & CV",
    },
    {
      icon: <CheckCircle2 className="w-5 h-5 text-tron-green" />,
      label: "STATUS",
      value: "Learning & Building",
      subtitle: "Available for Placements & Internships",
    },
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-tron-cyan/10 border border-tron-cyan/30 text-tron-cyan text-xs font-mono mb-2">
            <span>// SYSTEM SPECIFICATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-wider">
            ABOUT <span className="text-glow-cyan text-tron-cyan">ME</span>
          </h2>
          <p className="font-mono text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mt-2">
            Technical profile matrix and operational focus areas
          </p>
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {infoCards.map((card, idx) => (
            <div
              key={idx}
              onMouseEnter={() => sound.playHover()}
              className="tron-panel p-5 relative overflow-hidden group hover:border-tron-cyan/60"
            >
              <div className="hud-corner hud-corner-tl" />
              <div className="hud-corner hud-corner-tr" />
              <div className="hud-corner hud-corner-bl" />
              <div className="hud-corner hud-corner-br" />

              <div className="flex items-start justify-between mb-3">
                <div className="p-2 rounded bg-tron-panel border border-tron-border group-hover:border-tron-cyan/40 transition-colors">
                  {card.icon}
                </div>
                <span className="font-mono text-[10px] text-slate-500 tracking-wider">
                  NODE #{idx + 1}
                </span>
              </div>

              <div className="text-xs font-mono tracking-wider text-tron-cyan font-semibold">
                {card.label}
              </div>
              <div className="text-lg font-display font-bold text-white mt-1">
                {card.value}
              </div>
              <div className="text-xs font-mono text-slate-400 mt-1">
                {card.subtitle}
              </div>
            </div>
          ))}
        </div>

        {/* Narrative Information Panel */}
        <div className="tron-panel p-6 sm:p-8 relative">
          <div className="hud-corner hud-corner-tl" />
          <div className="hud-corner hud-corner-tr" />
          <div className="hud-corner hud-corner-bl" />
          <div className="hud-corner hud-corner-br" />

          <div className="flex items-center justify-between border-b border-tron-border/70 pb-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-tron-cyan animate-pulse" />
              <span className="font-mono text-xs text-tron-cyan font-bold tracking-wider">
                CORE DOSSIER // PROFESSIONAL SUMMARY
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              LOCATION: INDIA // AVAILABLE WORLDWIDE
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
              <p>
                {profile?.bio || (
                  "I am an MCA student specializing in Data Science with a solid foundation in software development, machine learning algorithms, and high-volume data analytics. My work centers on building systems that solve practical challenges—from mining serious adverse drug reaction signals in clinical datasets to engineering virtual try-on vision pipelines and intelligent retrieval-augmented generation engines."
                )}
              </p>
              <p>
                Bridging the gap between empirical data science and robust software engineering is my core philosophy. Rather than leaving models in isolated notebooks, I design modular REST APIs with Flask and modern interactive frontends to ensure every algorithm is performant, testable, and accessible.
              </p>
              <div className="pt-2">
                <div className="font-mono text-xs text-tron-cyan font-semibold mb-2">
                  // CURRENT OPERATIONAL PRIORITIES:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="text-tron-cyan">■</span> Advanced Statistical Mining on FAERS
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-tron-cyan">■</span> Multi-modal Computer Vision Pipelines
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-tron-cyan">■</span> Local Quantized LLM Ingestion & RAG
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-tron-cyan">■</span> Distributed Data Processing (Hadoop / HDFS)
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats Panel */}
            <div className="lg:col-span-4 bg-tron-dark/80 border border-tron-border p-5 rounded space-y-4">
              <div className="font-mono text-xs text-slate-400 border-b border-tron-border pb-2">
                ACADEMIC & TECHNICAL METRICS
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Degree</span>
                    <span className="text-tron-cyan font-bold">MCA (Master of Computer Applications)</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Specialization</span>
                    <span className="text-tron-cyan font-bold">Data Science</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Academic Standing</span>
                    <span className="text-tron-green font-bold">First Class with Distinction</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">Target Roles</span>
                    <span className="text-slate-200">Data Scientist / ML Engineer / Software Dev</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
