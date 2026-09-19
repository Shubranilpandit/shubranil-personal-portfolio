import React from 'react';
import { GraduationCap, BookOpen, Award } from 'lucide-react';
import { sound } from '../services/soundService';

export default function Education({ educationList }) {
  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-tron-cyan/10 border border-tron-cyan/30 text-tron-cyan text-xs font-mono mb-2">
            <span>// ACADEMIC TIMELINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-wider">
            EDUCATION <span className="text-glow-cyan text-tron-cyan">MATRIX</span>
          </h2>
          <p className="font-mono text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mt-2">
            Formal degrees, specializations, and foundational curricula
          </p>
        </div>

        {/* Timeline with Glowing Nodes */}
        <div className="relative border-l-2 border-tron-border/80 ml-4 sm:ml-8 space-y-10">
          {educationList.map((edu, idx) => (
            <div
              key={edu.id || idx}
              onMouseEnter={() => sound.playHover()}
              className="relative pl-6 sm:pl-8 group"
            >
              {/* Glowing Timeline Node */}
              <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-tron-dark border-2 border-tron-cyan flex items-center justify-center shadow-cyan-glow group-hover:scale-110 transition-transform">
                <GraduationCap className="w-4 h-4 text-tron-cyan" />
              </div>

              {/* Education Card */}
              <div className="tron-panel p-6 relative">
                <div className="hud-corner hud-corner-tl" />
                <div className="hud-corner hud-corner-tr" />
                <div className="hud-corner hud-corner-bl" />
                <div className="hud-corner hud-corner-br" />

                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-xs text-tron-cyan font-bold tracking-wider">
                    {edu.duration}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-tron-cyan/10 border border-tron-cyan/30 text-tron-cyan">
                    {edu.current_status}
                  </span>
                </div>

                <h3 className="text-xl font-display font-bold text-white group-hover:text-tron-cyan transition-colors">
                  {edu.degree}
                </h3>
                <div className="text-sm font-mono text-tron-cyanBright mt-0.5">
                  Field: {edu.field_of_study}
                </div>
                <div className="text-xs font-mono text-slate-400 mt-1">
                  Institution: {edu.institution}
                </div>

                {edu.grade && (
                  <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-xs font-mono text-tron-green">
                    <Award className="w-3.5 h-3.5" />
                    <span>{edu.grade}</span>
                  </div>
                )}

                {/* Coursework Tags */}
                {edu.coursework && edu.coursework.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-tron-border/60">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 mb-2">
                      <BookOpen className="w-3.5 h-3.5 text-tron-cyan" />
                      <span>RELEVANT COURSEWORK & FOCUS MODULES:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {edu.coursework.map((course, cIdx) => (
                        <span key={cIdx} className="cyber-tag text-[11px]">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
