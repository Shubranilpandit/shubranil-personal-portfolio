import React from 'react';
import { Terminal, Shield, ArrowUp, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './CyberIcons';
import { sound } from '../services/soundService';

export default function Footer({ onOpenTerminal, onOpenAdmin }) {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-tron-dark border-t border-tron-border/80 py-12 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Branding & Status */}
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-tron-cyan shadow-cyan-glow-sm" />
            <span className="font-display font-bold text-white tracking-wider text-sm">
              SHUBRANIL PANDIT
            </span>
            <span className="font-mono text-xs text-tron-cyan">
              // MCA DATA SCIENCE
            </span>
          </div>
          <p className="font-mono text-xs text-slate-400">
            Personal Digital Identity System & Portfolio Grid Architecture.
          </p>
          <div className="text-[11px] font-mono text-slate-500">
            &copy; 2026 Shubranil Pandit. Engineered with TRON: Legacy design language.
          </div>
        </div>

        {/* Center: Social Links */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/shubranil-pandit"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="p-2.5 rounded bg-tron-panel border border-tron-border hover:border-tron-cyan text-slate-400 hover:text-tron-cyan transition-colors"
            title="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com/in/shubranil-pandit"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="p-2.5 rounded bg-tron-panel border border-tron-border hover:border-tron-cyan text-slate-400 hover:text-tron-cyan transition-colors"
            title="LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href="mailto:shubranil.pandit@gmail.com"
            onClick={() => sound.playClick()}
            className="p-2.5 rounded bg-tron-panel border border-tron-border hover:border-tron-cyan text-slate-400 hover:text-tron-cyan transition-colors"
            title="Email Transmission"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        {/* Right: Quick Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onOpenTerminal();
            }}
            className="px-3 py-1.5 rounded bg-tron-panel border border-tron-border hover:border-tron-cyan text-slate-400 hover:text-tron-cyan font-mono text-xs flex items-center gap-1.5 transition-colors"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>CLI</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onOpenAdmin();
            }}
            className="px-3 py-1.5 rounded bg-tron-panel border border-tron-border hover:border-tron-amber text-slate-400 hover:text-tron-amber font-mono text-xs flex items-center gap-1.5 transition-colors"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>ADMIN</span>
          </button>

          <button
            onClick={scrollToTop}
            className="p-2 rounded bg-tron-cyan/10 border border-tron-cyan/40 text-tron-cyan hover:bg-tron-cyan hover:text-black transition-all shadow-cyan-glow-sm"
            title="Return to Grid Apex"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
