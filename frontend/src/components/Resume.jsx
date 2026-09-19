import React from 'react';
import { FileText, Download, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { sound } from '../services/soundService';

export default function Resume() {
  const resumeDownloadUrl = "/api/resume/download";
  const resumeViewUrl = "/api/resume/view";

  return (
    <section id="resume" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-tron-cyan/10 border border-tron-cyan/30 text-tron-cyan text-xs font-mono mb-2">
            <span>// CURRICULUM VITAE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-wider">
            RESUME & <span className="text-glow-cyan text-tron-cyan">CREDENTIALS</span>
          </h2>
          <p className="font-mono text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mt-2">
            Direct access to full professional and academic documentation
          </p>
        </div>

        {/* Resume HUD Terminal Box */}
        <div className="tron-panel p-8 relative">
          <div className="hud-corner hud-corner-tl" />
          <div className="hud-corner hud-corner-tr" />
          <div className="hud-corner hud-corner-bl" />
          <div className="hud-corner hud-corner-br" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-lg bg-tron-cyan/10 border border-tron-cyan flex items-center justify-center shadow-cyan-glow">
                <FileText className="w-8 h-8 text-tron-cyan" />
              </div>
              <div>
                <div className="text-xs font-mono text-tron-green flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>VERIFIED & READY FOR PLACEMENTS / INTERNSHIPS</span>
                </div>
                <h3 className="text-2xl font-display font-bold text-white mt-1">
                  Shubranil_Pandit_Resume.pdf
                </h3>
                <div className="text-xs font-mono text-slate-400 mt-1">
                  Specialization: MCA Data Science // Format: Standard PDF // Updated 2026
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <a
                href={resumeViewUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="cyber-btn flex items-center gap-2 text-xs flex-1 md:flex-initial justify-center"
              >
                <ExternalLink className="w-4 h-4" />
                <span>VIEW RESUME</span>
              </a>

              <a
                href={resumeDownloadUrl}
                download="Shubranil_Pandit_Resume.pdf"
                onClick={() => sound.playClick()}
                className="cyber-btn cyber-btn-amber flex items-center gap-2 text-xs flex-1 md:flex-initial justify-center"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD PDF</span>
              </a>
            </div>
          </div>

          {/* Quick Resume Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-tron-border/60 font-mono text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-tron-cyan flex-shrink-0" />
              <span>Full-Stack & Python Specialization</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-tron-cyan flex-shrink-0" />
              <span>FAERS Healthcare Data Analytics</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-tron-cyan flex-shrink-0" />
              <span>GenAI RAG & Distributed Computing</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
