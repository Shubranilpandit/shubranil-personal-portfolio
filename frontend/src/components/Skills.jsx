import React, { useState } from 'react';
import { Layers, CheckCircle2, Bookmark, Flame, Zap } from 'lucide-react';
import { sound } from '../services/soundService';

const PROFICIENCY_CONFIG = {
  "Project Experience": {
    label: "Project Experience",
    badgeClass: "bg-tron-cyan/20 border-tron-cyan text-tron-cyan shadow-cyan-glow-sm",
    barColor: "bg-tron-cyan shadow-cyan-glow-sm",
    percentage: "90%",
    icon: <Flame className="w-3.5 h-3.5 text-tron-cyan" />,
  },
  "Working Knowledge": {
    label: "Working Knowledge",
    badgeClass: "bg-tron-blue/20 border-tron-blue text-tron-blueGlow text-blue-300",
    barColor: "bg-tron-blue shadow-blue-glow",
    percentage: "75%",
    icon: <Zap className="w-3.5 h-3.5 text-blue-400" />,
  },
  "Familiar": {
    label: "Familiar",
    badgeClass: "bg-indigo-900/30 border-indigo-700 text-indigo-300",
    barColor: "bg-indigo-500",
    percentage: "60%",
    icon: <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />,
  },
  "Learning": {
    label: "Learning",
    badgeClass: "bg-tron-amber/20 border-tron-amber text-tron-amber shadow-amber-glow",
    barColor: "bg-tron-amber",
    percentage: "45%",
    icon: <Bookmark className="w-3.5 h-3.5 text-tron-amber" />,
  },
};

export default function Skills({ skillsData }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = skillsData?.categories || [];
  const allSkills = skillsData?.all_skills || [];

  const categoryNames = ["All", ...categories.map((c) => c.category)];

  const displayedSkills =
    activeCategory === "All"
      ? allSkills
      : allSkills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-tron-cyan/10 border border-tron-cyan/30 text-tron-cyan text-xs font-mono mb-2">
            <span>// TECHNICAL REPERTOIRE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-wider">
            SKILL <span className="text-glow-cyan text-tron-cyan">MATRIX</span>
          </h2>
          <p className="font-mono text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mt-2">
            Honest, verified technical competencies calibrated by project experience
          </p>

          {/* Realistic Legend Indicators */}
          <div className="flex flex-wrap justify-center gap-3 mt-5 font-mono text-[11px]">
            {Object.entries(PROFICIENCY_CONFIG).map(([key, cfg]) => (
              <div
                key={key}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-tron-panel border border-tron-border"
              >
                {cfg.icon}
                <span className="text-slate-300">{cfg.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categoryNames.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.playClick();
                setActiveCategory(cat);
              }}
              className={`px-3.5 py-1.5 text-xs font-mono tracking-wider transition-all clip-chamfer ${
                activeCategory === cat
                  ? 'bg-tron-cyan text-black font-bold shadow-cyan-glow'
                  : 'bg-tron-panel text-slate-400 hover:text-tron-cyan hover:border-tron-cyan/50 border border-tron-border'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {displayedSkills.map((skill) => {
            const config =
              PROFICIENCY_CONFIG[skill.proficiency_level] ||
              PROFICIENCY_CONFIG["Working Knowledge"];

            return (
              <div
                key={skill.id || skill.name}
                onMouseEnter={() => sound.playHover()}
                className="tron-panel p-4 relative group hover:border-tron-cyan/60"
              >
                <div className="hud-corner hud-corner-tl" />
                <div className="hud-corner hud-corner-tr" />
                <div className="hud-corner hud-corner-bl" />
                <div className="hud-corner hud-corner-br" />

                <div className="flex items-start justify-between mb-2">
                  <span className="text-[10px] font-mono text-slate-500 uppercase">
                    {skill.category}
                  </span>
                  <div className={`px-2 py-0.5 rounded border text-[10px] font-mono flex items-center gap-1 ${config.badgeClass}`}>
                    {config.icon}
                    <span>{skill.proficiency_level}</span>
                  </div>
                </div>

                <div className="font-mono text-sm sm:text-base font-bold text-white group-hover:text-tron-cyan transition-colors mb-2">
                  {skill.name}
                </div>

                {/* Technical Progress Meter */}
                <div className="w-full bg-slate-900 border border-tron-border/80 h-1.5 rounded overflow-hidden">
                  <div
                    className={`h-full ${config.barColor} transition-all duration-500`}
                    style={{ width: config.percentage }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Footer */}
        <div className="mt-8 text-center text-xs font-mono text-slate-500">
          TOTAL MATRIX ASSETS: <span className="text-tron-cyan">{displayedSkills.length}</span> / {allSkills.length} ACTIVE
        </div>

      </div>
    </section>
  );
}
