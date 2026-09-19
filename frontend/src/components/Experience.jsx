import React from 'react';
import { Briefcase, Calendar, CheckSquare, Terminal } from 'lucide-react';
import { sound } from '../services/soundService';

export default function Experience({ experienceList }) {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-tron-cyan/10 border border-tron-cyan/30 text-tron-cyan text-xs font-mono mb-2">
            <span>// PRACTICAL OPERATIONS LOG</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-wider">
            EXPERIENCE & <span className="text-glow-cyan text-tron-cyan">RESEARCH</span>
          </h2>
          <p className="font-mono text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mt-2">
            Applied research, technical activities, and hackathon engagements
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="space-y-6">
          {experienceList.map((exp, idx) => (
            <div
              key={exp.id || idx}
              onMouseEnter={() => sound.playHover()}
              className="tron-panel p-6 relative group hover:border-tron-cyan/70 transition-all"
            >
              <div className="hud-corner hud-corner-tl" />
              <div className="hud-corner hud-corner-tr" />
              <div className="hud-corner hud-corner-bl" />
              <div className="hud-corner hud-corner-br" />

              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-tron-blue/20 border border-tron-blue/50 text-blue-300 font-semibold">
                  {exp.type}
                </span>
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-tron-cyan" />
                  {exp.duration}
                </span>
              </div>

              <h3 className="text-xl font-display font-bold text-white group-hover:text-tron-cyan transition-colors">
                {exp.role}
              </h3>
              <div className="text-sm font-mono text-tron-cyanBright mt-0.5">
                {exp.organization}
              </div>

              <div className="mt-4 space-y-2 text-sm text-slate-300 font-sans leading-relaxed">
                <div>
                  <span className="font-mono text-xs text-slate-400 uppercase block mb-1">
                    OPERATIONAL RESPONSIBILITIES:
                  </span>
                  <p>{exp.responsibilities}</p>
                </div>

                {exp.achievements && (
                  <div className="p-3 bg-tron-dark/80 border border-tron-border/70 rounded mt-2">
                    <span className="font-mono text-xs text-tron-cyan uppercase block mb-0.5 font-bold">
                      KEY DELIVERABLES & OUTCOMES:
                    </span>
                    <p className="text-slate-300">{exp.achievements}</p>
                  </div>
                )}
              </div>

              {/* Technologies */}
              {exp.technologies && exp.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-tron-border/50">
                  {exp.technologies.map((tech, tIdx) => (
                    <span key={tIdx} className="cyber-tag text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
