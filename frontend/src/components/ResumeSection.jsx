import React from 'react';
import { FileText, Download, ExternalLink, ShieldCheck } from 'lucide-react';

/**
 * Minimal TRON Resume & Credentials Section
 * Direct access to Shubranil_Pandit_Resume.pdf with View & Download actions.
 * Section #resume
 */
export default function ResumeSection() {
  const resumeUrl = "/Shubranil_Pandit_Resume.pdf";

  return (
    <section id="resume" className="py-24 px-4 sm:px-6 lg:px-8 relative select-none">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="font-mono text-xs text-tron-cyan tracking-[0.25em] mb-2">
            // 05. OFFICIAL CREDENTIALS
          </div>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-[0.18em] uppercase">
            CURRICULUM VITAE
          </h2>
          <div className="w-16 h-[2px] bg-tron-cyan mt-3 shadow-[0_0_10px_#00f0ff]" />
        </div>

        {/* Minimal Futuristic Terminal Card */}
        <div className="p-8 sm:p-10 rounded-lg bg-tron-void/85 border border-tron-cyan/40 shadow-[0_0_30px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(0,240,255,0.05)] relative group">
          {/* Corner Accents */}
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-tron-cyan" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-tron-cyan" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            
            {/* Left: Icon & Meta */}
            <div className="flex items-center gap-5 text-left w-full md:w-auto">
              <div className="w-16 h-16 rounded bg-tron-cyan/10 border border-tron-cyan flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                <FileText className="w-8 h-8 text-tron-cyan" />
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 font-mono text-[10px] text-tron-cyan mb-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>VERIFIED DOSSIER // MCA DATA SCIENCE</span>
                </div>
                <h3 className="font-display font-black text-xl text-white tracking-wider">
                  Shubranil_Pandit_Resume.pdf
                </h3>
                <p className="font-mono text-xs text-slate-400 mt-0.5">
                  Format: Standard PDF // Updated 2026 // Solapur, India
                </p>
              </div>
            </div>

            {/* Right: Actions [ VIEW RESUME ] & [ DOWNLOAD RESUME ] */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-start md:justify-end">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial px-5 py-3 rounded bg-tron-cyan/15 border border-tron-cyan text-tron-cyan hover:bg-tron-cyan hover:text-black font-mono font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] flex items-center justify-center gap-2"
              >
                <span>[ VIEW RESUME ]</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={resumeUrl}
                download="Shubranil_Pandit_Resume.pdf"
                className="flex-1 sm:flex-initial px-5 py-3 rounded bg-tron-dark border border-tron-border text-slate-300 hover:border-tron-cyan hover:text-white font-mono font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2"
              >
                <span>[ DOWNLOAD RESUME ]</span>
                <Download className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
