import React, { useState, useEffect } from 'react';
import { ChevronDown, Shield, Radio, Terminal } from 'lucide-react';
import { audioSystem } from '../services/audioService';

/**
 * Minimal TRON Identity & System Hero
 * High negative space, glowing identity disc, high-contrast typography.
 * Section #system
 */
export default function SystemHero() {
  const [beatIntensity, setBeatIntensity] = useState(0);

  useEffect(() => {
    const unsub = audioSystem.subscribe((state) => {
      setBeatIntensity(state.beatIntensity || 0);
    });
    return () => unsub();
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="system"
      className="relative min-h-[92vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16 select-none"
    >
      {/* Central Rotating Tron Identity Disc & Ambient Ring */}
      <div className="relative mb-10 flex items-center justify-center">
        {/* Outer Pulsing Ring */}
        <div
          className="w-44 h-44 sm:w-56 sm:h-56 rounded-full border border-dashed border-tron-cyan/40 animate-spin-slow transition-all duration-300"
          style={{
            boxShadow: `0 0 ${15 + beatIntensity * 30}px rgba(0, 240, 255, ${0.25 + beatIntensity * 0.4})`,
            transform: `scale(${1 + beatIntensity * 0.04})`,
          }}
        />

        {/* Inner Solid Identity Ring */}
        <div className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-tron-cyan/60 flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,240,255,0.2)]">
          {/* Center Glowing Core */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-tron-cyan/10 border border-tron-cyan flex items-center justify-center shadow-[0_0_25px_rgba(0,240,255,0.5)]">
            <span className="font-display font-black text-xl sm:text-2xl text-white tracking-widest">
              SP
            </span>
          </div>
        </div>

        {/* Horizontal Laser Tick Lines */}
        <div className="absolute left-[-40px] right-[-40px] h-[1px] bg-gradient-to-r from-transparent via-tron-cyan/40 to-transparent pointer-events-none" />
      </div>

      {/* Main Identity Typography */}
      <div className="max-w-3xl mx-auto space-y-4">
        {/* Status Telemetry Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tron-cyan/10 border border-tron-cyan/30 font-mono text-[11px] tracking-[0.2em] text-tron-cyan">
          <span className="w-1.5 h-1.5 rounded-full bg-tron-cyan animate-pulse" />
          <span>SYSTEM ONLINE // SECTOR: 01</span>
        </div>

        {/* Name */}
        <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-[0.18em] uppercase">
          SHUBRANIL PANDIT
        </h1>

        {/* Specialization */}
        <div className="font-mono text-xs sm:text-sm md:text-base tracking-[0.25em] text-tron-cyanBright font-semibold uppercase">
          MCA — COMPUTER APPLICATIONS // DATA SCIENCE • SOFTWARE DEV
        </div>

        {/* Concise Authentic Summary */}
        <p className="font-sans text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed pt-2">
          MCA student with hands-on experience in full-stack architecture, Python, Flask REST APIs,
          modern React, SQL, and applied data mining.
        </p>

        {/* Action Button */}
        <div className="pt-6 flex justify-center">
          <button
            onClick={() => scrollToSection('about')}
            className="px-6 py-3 rounded bg-tron-cyan/10 border border-tron-cyan/70 text-tron-cyan hover:bg-tron-cyan hover:text-black font-mono font-bold text-xs sm:text-sm tracking-[0.2em] uppercase transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.7)] flex items-center gap-2"
          >
            <span>[ ACCESS PORTFOLIO ]</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Telemetry Stream Footer */}
      <div className="mt-16 pt-8 border-t border-tron-border/40 w-full max-w-xl mx-auto flex items-center justify-between font-mono text-[10px] text-slate-500 tracking-widest">
        <span>CORE: OPTIMAL</span>
        <span>LATENCY: 12ms</span>
        <span>PROTOCOL: SECURE</span>
      </div>
    </section>
  );
}
