import React from 'react';
import { Terminal, Layout, Server, Database, Brain, Wrench } from 'lucide-react';

/**
 * Minimal TRON Technical Competencies Matrix
 * NO percentage bars. Authentic categorized skills directly from resume.
 * Section #skills
 */
export default function SkillsSection() {
  const skillCategories = [
    {
      title: "PROGRAMMING",
      icon: <Terminal className="w-4 h-4 text-tron-cyan" />,
      skills: ["Python", "JavaScript", "SQL"],
    },
    {
      title: "FRONTEND",
      icon: <Layout className="w-4 h-4 text-tron-cyan" />,
      skills: ["HTML5", "CSS3", "React", "Vite"],
    },
    {
      title: "BACKEND",
      icon: <Server className="w-4 h-4 text-tron-cyan" />,
      skills: ["Python Flask", "REST APIs"],
    },
    {
      title: "DATABASE",
      icon: <Database className="w-4 h-4 text-tron-cyan" />,
      skills: ["PostgreSQL", "SQL"],
    },
    {
      title: "DATA & AI",
      icon: <Brain className="w-4 h-4 text-tron-cyan" />,
      skills: ["Pandas", "NumPy", "Data Cleaning", "EDA", "Computer Vision", "MediaPipe"],
    },
    {
      title: "TOOLS",
      icon: <Wrench className="w-4 h-4 text-tron-cyan" />,
      skills: ["Git", "GitHub", "VS Code", "Postman"],
    },
  ];

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative select-none">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="font-mono text-xs text-tron-cyan tracking-[0.25em] mb-2">
            // 02. COMPETENCIES
          </div>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-[0.18em] uppercase">
            TECHNICAL MATRIX
          </h2>
          <div className="w-16 h-[2px] bg-tron-cyan mt-3 shadow-[0_0_10px_#00f0ff]" />
        </div>

        {/* Categories Grid (6 Cards, No Bars) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, idx) => (
            <div
              key={idx}
              className="p-6 rounded bg-tron-void/80 border border-tron-border/80 hover:border-tron-cyan/60 transition-all hover:shadow-[0_0_20px_rgba(0,240,255,0.12)] group relative"
            >
              {/* Corner Accents */}
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-tron-cyan/40 group-hover:border-tron-cyan transition-colors" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-tron-cyan/40 group-hover:border-tron-cyan transition-colors" />

              {/* Category Title */}
              <div className="flex items-center gap-3 mb-5 border-b border-tron-border/60 pb-3">
                <div className="p-1.5 rounded bg-tron-cyan/10 border border-tron-cyan/30 text-tron-cyan group-hover:border-tron-cyan">
                  {cat.icon}
                </div>
                <h3 className="font-mono text-xs font-bold text-white tracking-[0.18em]">
                  {cat.title}
                </h3>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="font-mono text-xs px-2.5 py-1.5 rounded bg-tron-dark/90 border border-tron-border/90 text-slate-300 group-hover:border-tron-cyan/40 group-hover:text-white transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
