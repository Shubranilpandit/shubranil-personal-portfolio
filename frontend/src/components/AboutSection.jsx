import React from 'react';
import { Cpu, Database, Code, Eye } from 'lucide-react';

/**
 * Minimal TRON About Dossier
 * Concise professional summary, futuristic typography layout, generous negative space.
 * Section #about
 */
export default function AboutSection() {
  const pillars = [
    {
      icon: <Code className="w-4 h-4 text-tron-cyan" />,
      title: "SOFTWARE DEVELOPMENT",
      desc: "Full-stack web application engineering using Python Flask, modern React, and modular REST APIs.",
    },
    {
      icon: <Database className="w-4 h-4 text-tron-cyan" />,
      title: "DATA & SQL PIPELINES",
      desc: "Relational database modeling with PostgreSQL, data standardization, and statistical signal mining.",
    },
    {
      icon: <Eye className="w-4 h-4 text-tron-cyan" />,
      title: "COMPUTER VISION & AI",
      desc: "Real-time facial landmark detection with MediaPipe and practical exploratory data analysis (EDA).",
    },
    {
      icon: <Cpu className="w-4 h-4 text-tron-cyan" />,
      title: "TECHNICAL ARCHITECTURE",
      desc: "Pursuing MCA at MIT Vishwaprayag University, focused on turning algorithms into production solutions.",
    },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative select-none">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="font-mono text-xs text-tron-cyan tracking-[0.25em] mb-2">
            // 01. DOSSIER
          </div>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-[0.18em] uppercase">
            ABOUT SYSTEM CORE
          </h2>
          <div className="w-16 h-[2px] bg-tron-cyan mt-3 shadow-[0_0_10px_#00f0ff]" />
        </div>

        {/* Futuristic Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Statement */}
          <div className="lg:col-span-6 space-y-6">
            <p className="font-sans text-lg sm:text-xl text-slate-200 leading-relaxed font-light">
              I am an <span className="text-white font-semibold">MCA student</span> specializing in{' '}
              <span className="text-tron-cyan font-semibold">Data Science</span> at MIT Vishwaprayag University, Solapur.
            </p>

            <p className="font-sans text-sm sm:text-base text-slate-400 leading-relaxed">
              My technical focus spans full-stack software development, REST API engineering with Python and Flask,
              and data-intensive analytical pipelines. I combine solid foundational knowledge of data structures, SQL,
              and PostgreSQL with applied experience in computer vision (MediaPipe) and large-scale healthcare data processing.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 font-mono text-[11px] text-tron-cyan">
              <span className="px-2.5 py-1 rounded bg-tron-dark border border-tron-cyan/30">
                #MCA_DATA_SCIENCE
              </span>
              <span className="px-2.5 py-1 rounded bg-tron-dark border border-tron-cyan/30">
                #FULL_STACK_DEV
              </span>
              <span className="px-2.5 py-1 rounded bg-tron-dark border border-tron-cyan/30">
                #COMPUTER_VISION
              </span>
              <span className="px-2.5 py-1 rounded bg-tron-dark border border-tron-cyan/30">
                #POSTGRESQL
              </span>
            </div>
          </div>

          {/* Right Column: 4 Minimalist Grid Pillars */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded bg-tron-void/70 border border-tron-border/80 hover:border-tron-cyan/60 transition-all hover:shadow-[0_0_15px_rgba(0,240,255,0.15)] group"
              >
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="p-1.5 rounded bg-tron-cyan/10 border border-tron-cyan/30 group-hover:border-tron-cyan transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="font-mono text-xs font-bold text-white tracking-wider">
                    {item.title}
                  </h3>
                </div>
                <p className="font-sans text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
