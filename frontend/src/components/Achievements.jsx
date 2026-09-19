import React from 'react';
import { Trophy, Award, Medal, ExternalLink, ShieldCheck } from 'lucide-react';
import { sound } from '../services/soundService';

export default function Achievements({ achievementsList }) {
  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'academic':
        return <Award className="w-5 h-5 text-tron-cyan" />;
      case 'technical competition':
        return <Trophy className="w-5 h-5 text-tron-amber" />;
      case 'certification':
        return <ShieldCheck className="w-5 h-5 text-tron-green" />;
      default:
        return <Medal className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <section id="achievements" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-tron-cyan/10 border border-tron-cyan/30 text-tron-cyan text-xs font-mono mb-2">
            <span>// COMMENDATIONS & VERIFIED CREDENTIALS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-wider">
            ACHIEVEMENT <span className="text-glow-cyan text-tron-cyan">DATABASE</span>
          </h2>
          <p className="font-mono text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mt-2">
            Recognitions, academic honors, technical certifications, and competition awards
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievementsList.map((ach) => (
            <div
              key={ach.id || ach.title}
              onMouseEnter={() => sound.playHover()}
              className="tron-panel p-6 relative group hover:border-tron-cyan/70 transition-all flex flex-col justify-between"
            >
              <div className="hud-corner hud-corner-tl" />
              <div className="hud-corner hud-corner-tr" />
              <div className="hud-corner hud-corner-bl" />
              <div className="hud-corner hud-corner-br" />

              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2.5 rounded bg-tron-panel border border-tron-border">
                    {getCategoryIcon(ach.category)}
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-400">
                    {ach.category} // {ach.issue_date}
                  </span>
                </div>

                <h3 className="text-lg font-display font-bold text-white group-hover:text-tron-cyan transition-colors">
                  {ach.title}
                </h3>
                {ach.organization && (
                  <div className="text-xs font-mono text-tron-cyanBright mt-1">
                    {ach.organization}
                  </div>
                )}
                {ach.description && (
                  <p className="text-sm text-slate-300 font-sans mt-3 leading-relaxed">
                    {ach.description}
                  </p>
                )}
              </div>

              {ach.credential_url && ach.credential_url !== '#' && (
                <div className="mt-4 pt-3 border-t border-tron-border/60">
                  <a
                    href={ach.credential_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    className="text-xs font-mono text-tron-cyan hover:underline flex items-center gap-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>VIEW VERIFIED CREDENTIAL</span>
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
