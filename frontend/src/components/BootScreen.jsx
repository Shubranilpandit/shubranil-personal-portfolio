import React, { useState, useEffect } from 'react';
import { sound } from '../services/soundService';

const BOOT_LOGS = [
  "INITIALIZING SYSTEM ARCHITECTURE...",
  "VERIFYING IDENTITY: SHUBRANIL PANDIT [MCA DATA SCIENCE]...",
  "CONNECTING TO GRID DATABASE [POSTGRESQL-CORE]...",
  "MOUNTING PROJECT SUBSYSTEMS & MODELS...",
  "LOADING TECHNICAL SKILL MATRIX...",
  "CALIBRATING NEURAL RETRIEVAL PIPELINES...",
  "AUTHENTICATION PASSED // IDENTITY SECURE",
  "SYSTEM ONLINE // WELCOME TO THE GRID",
];

export default function BootScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    sound.playBootSequence();

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(onComplete, 400);
          }, 300);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 8) + 4;
        return Math.min(next, 100);
      });
    }, 110);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const logIdx = Math.min(
      Math.floor((progress / 100) * BOOT_LOGS.length),
      BOOT_LOGS.length - 1
    );
    setLogIndex(logIdx);
  }, [progress]);

  const handleSkip = () => {
    sound.playClick();
    setIsFading(true);
    setTimeout(onComplete, 200);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-tron-void px-4 transition-opacity duration-500 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background radial grid glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Cyber Identity Core Ring in center */}
      <div className="relative mb-8 flex items-center justify-center">
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border border-tron-cyan/30 flex items-center justify-center animate-spin-slow">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-dashed border-tron-blue/60 animate-spin-reverse flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-tron-cyan/10 border border-tron-cyan flex items-center justify-center shadow-cyan-glow animate-pulse-glow">
              <span className="font-display font-bold text-xs md:text-sm text-tron-cyan">
                SP-OS
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Futuristic Boot Content */}
      <div className="w-full max-w-md bg-tron-panel/90 border border-tron-border p-6 shadow-cyan-glow relative backdrop-blur-md clip-chamfer">
        <div className="hud-corner hud-corner-tl" />
        <div className="hud-corner hud-corner-tr" />
        <div className="hud-corner hud-corner-bl" />
        <div className="hud-corner hud-corner-br" />

        <div className="flex items-center justify-between text-xs font-mono text-tron-muted mb-3 border-b border-tron-border/60 pb-2">
          <span className="text-tron-cyan font-bold tracking-wider">BOOT PROTOCOL v2.5.0</span>
          <span className="text-tron-green">STATUS: BOOTING</span>
        </div>

        {/* Terminal Log Streams */}
        <div className="h-24 overflow-hidden font-mono text-xs space-y-1.5 mb-4 text-left">
          {BOOT_LOGS.slice(0, logIndex + 1).map((log, i) => (
            <div
              key={i}
              className={`transition-opacity duration-200 ${
                i === logIndex
                  ? 'text-tron-cyan font-semibold drop-shadow-[0_0_8px_rgba(0,240,255,0.7)]'
                  : 'text-slate-400 opacity-60'
              }`}
            >
              <span className="text-tron-blue mr-1.5">&gt;</span>
              {log}
            </div>
          ))}
        </div>

        {/* Cyber Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono text-tron-muted">
            <span>CORE LOAD SEQUENCE</span>
            <span className="text-tron-cyan font-bold">{progress}%</span>
          </div>
          <div className="w-full h-2 bg-slate-900 border border-tron-border overflow-hidden p-[1px]">
            <div
              className="h-full bg-gradient-to-r from-tron-blue to-tron-cyan shadow-cyan-glow transition-all duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Skip Sequence CTA */}
        <div className="mt-5 pt-3 border-t border-tron-border/40 flex justify-between items-center text-xs">
          <span className="text-slate-500 font-mono text-[11px]">INITIALIZING IDENTITY MATRIX</span>
          <button
            onClick={handleSkip}
            className="text-tron-cyan/80 hover:text-tron-cyan hover:underline font-mono text-xs tracking-wider transition-colors"
          >
            [SKIP BOOT]
          </button>
        </div>
      </div>
    </div>
  );
}
