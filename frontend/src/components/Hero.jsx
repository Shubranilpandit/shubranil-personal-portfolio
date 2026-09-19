import React from 'react';
import { ArrowDown, FileText, Send, Terminal, Sparkles } from 'lucide-react';
import { sound } from '../services/soundService';

export default function Hero({ profile, onOpenTerminal }) {
  const title = profile?.title || "MCA Student | Data Science | Developer | Problem Solver";
  const status = profile?.status || "● SYSTEM ONLINE";

  return (
    <section
      id="system"
      className="relative min-h-screen flex items-center justify-center pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Radial ambient cyber glow behind hero */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-tron-cyan/5 blur-[120px] pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] -top-20 -right-20 rounded-full bg-tron-blue/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left column: Text & CTAs */}
        <div className="lg:col-span-7 text-left space-y-6">
          
          {/* System Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-tron-panel border border-tron-cyan/40 shadow-cyan-glow-sm">
            <span className="w-2 h-2 rounded-full bg-tron-green animate-pulse" />
            <span className="text-xs font-mono font-semibold tracking-wider text-tron-cyan">
              {status}
            </span>
            <span className="text-xs font-mono text-slate-500">|</span>
            <span className="text-xs font-mono text-slate-300">TRON-OS v2.5.0</span>
          </div>

          {/* Main Name & Title */}
          <div className="space-y-2">
            <div className="text-xs sm:text-sm font-mono tracking-[0.25em] text-tron-cyan uppercase">
              // PERSONAL DIGITAL IDENTITY SYSTEM
            </div>
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-display font-black tracking-tight text-white uppercase">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-tron-cyan drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                SHUBRANIL
              </span>
              <br />
              <span className="text-glow-cyan text-tron-cyan">
                PANDIT
              </span>
            </h1>
            <p className="text-lg sm:text-xl font-mono text-tron-cyanBright/90 font-medium tracking-wide">
              {title}
            </p>
          </div>

          {/* Professional Introduction Quote */}
          <div className="border-l-2 border-tron-cyan/60 pl-4 py-1 max-w-2xl bg-tron-cyan/5 rounded-r">
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans italic">
              "I build intelligent systems, data-driven applications, and practical software solutions while exploring the intersection of AI, Data Science and Software Engineering."
            </p>
          </div>

          {/* Telemetry Micro Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            <div className="bg-tron-panel/70 border border-tron-border p-2.5 rounded clip-chamfer">
              <div className="text-[10px] font-mono text-slate-400">PROGRAM</div>
              <div className="text-xs font-mono font-bold text-tron-cyan">MCA (Data Science)</div>
            </div>
            <div className="bg-tron-panel/70 border border-tron-border p-2.5 rounded clip-chamfer">
              <div className="text-[10px] font-mono text-slate-400">PRIMARY FOCUS</div>
              <div className="text-xs font-mono font-bold text-tron-cyan">AI / ML / Big Data</div>
            </div>
            <div className="bg-tron-panel/70 border border-tron-border p-2.5 rounded clip-chamfer">
              <div className="text-[10px] font-mono text-slate-400">ENGINEERING</div>
              <div className="text-xs font-mono font-bold text-tron-cyan">Full-Stack Dev</div>
            </div>
            <div className="bg-tron-panel/70 border border-tron-border p-2.5 rounded clip-chamfer">
              <div className="text-[10px] font-mono text-slate-400">STATUS</div>
              <div className="text-xs font-mono font-bold text-tron-green">Building & Research</div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-3 sm:gap-4 pt-4">
            <a
              href="#projects"
              onClick={() => sound.playClick()}
              className="cyber-btn flex items-center gap-2 group"
            >
              <span>VIEW PROJECTS</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </a>

            <a
              href="/api/resume/download"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              className="cyber-btn cyber-btn-amber flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>DOWNLOAD RESUME</span>
            </a>

            <a
              href="#contact"
              onClick={() => sound.playClick()}
              className="cyber-btn flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>CONTACT ME</span>
            </a>

            <button
              onClick={() => {
                sound.playClick();
                onOpenTerminal();
              }}
              className="px-4 py-2.5 rounded bg-slate-900/80 border border-slate-700 hover:border-tron-cyan text-slate-300 hover:text-tron-cyan font-mono text-xs flex items-center gap-2 transition-all"
            >
              <Terminal className="w-4 h-4 text-tron-cyan" />
              <span>OPEN TERMINAL</span>
            </button>
          </div>
        </div>

        {/* Right column: Digital Identity Core HUD */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div className="relative w-72 h-72 sm:w-88 sm:h-88 xl:w-96 xl:h-96 flex items-center justify-center">
            
            {/* Outer coordinate ring with tick marks */}
            <div className="absolute inset-0 rounded-full border border-tron-cyan/20 animate-spin-slow">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[9px] font-mono text-tron-cyan/60">000°</div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[9px] font-mono text-tron-cyan/60">180°</div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 text-[9px] font-mono text-tron-cyan/60">270°</div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[9px] font-mono text-tron-cyan/60">090°</div>
            </div>

            {/* Middle counter-rotating dashed ring */}
            <div className="absolute inset-6 rounded-full border-2 border-dashed border-tron-blue/40 animate-spin-reverse" />

            {/* Radar sweep line */}
            <div className="absolute inset-10 rounded-full border border-tron-cyan/30 overflow-hidden">
              <div className="w-full h-full bg-[conic-gradient(from_0deg,transparent_0deg,transparent_300deg,rgba(0,240,255,0.35)_360deg)] animate-radar" />
            </div>

            {/* Glowing Hexagon Core */}
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-tron-panel/90 border border-tron-cyan shadow-cyan-glow flex flex-col items-center justify-center p-4 text-center z-10 backdrop-blur-md">
              <Sparkles className="w-6 h-6 text-tron-cyan mb-2 animate-pulse" />
              <div className="font-display font-black text-base sm:text-lg tracking-wider text-white">
                SHUBRANIL
              </div>
              <div className="text-[10px] font-mono text-tron-cyan uppercase tracking-widest mt-0.5">
                DATA SCIENCE CORE
              </div>
              <div className="mt-2 text-[9px] font-mono px-2 py-0.5 rounded bg-tron-cyan/15 border border-tron-cyan/40 text-tron-cyan">
                NODE_ONLINE // 100%
              </div>
            </div>

            {/* Surrounding technical badges */}
            <div className="absolute -top-2 right-4 text-[10px] font-mono bg-tron-panel/90 border border-tron-border px-2 py-1 text-slate-400 rounded">
              AZIMUTH: <span className="text-tron-cyan">312.4°</span>
            </div>
            <div className="absolute -bottom-2 left-4 text-[10px] font-mono bg-tron-panel/90 border border-tron-border px-2 py-1 text-slate-400 rounded">
              SYNC: <span className="text-tron-green">ACTIVE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
