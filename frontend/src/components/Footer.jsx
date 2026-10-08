import React from 'react';
import { ChevronUp, GitBranch, Mail } from 'lucide-react';

/**
 * Minimal TRON System Footer
 */
export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-tron-border/60 bg-tron-void/90 select-none">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Brand & Identity */}
        <div>
          <div className="font-display font-black text-sm text-white tracking-[0.2em] uppercase">
            SHUBRANIL GOUTAM PANDIT
          </div>
          <div className="font-mono text-[10px] text-tron-cyan/70 tracking-widest mt-0.5">
            MCA — DATA SCIENCE // DIGITAL IDENTITY CORE // 2026
          </div>
        </div>

        {/* Links & Scroll to Top */}
        <div className="flex items-center gap-6 font-mono text-xs">
          <a
            href="https://github.com/Shubranilpandit"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-tron-cyan flex items-center gap-1.5 transition-colors"
          >
            <GitBranch className="w-3.5 h-3.5" />
            <span>GITHUB</span>
          </a>

          <a
            href="mailto:shubranilp@gmail.com"
            className="text-slate-400 hover:text-tron-cyan flex items-center gap-1.5 transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>EMAIL</span>
          </a>

          <button
            onClick={scrollToTop}
            className="p-2 rounded border border-tron-border text-slate-400 hover:text-tron-cyan hover:border-tron-cyan transition-colors"
            aria-label="Scroll to top of digital core"
            title="Return to top"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
