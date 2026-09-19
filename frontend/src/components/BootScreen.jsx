import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
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

export default function BootScreen({ onComplete, onEnableAudio }) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [bootReady, setBootReady] = useState(false);
  const [audioPromptStatus, setAudioPromptStatus] = useState('AUDIO MODULE READY');

  useEffect(() => {
    sound.playBootSequence();

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setBootReady(true);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 8) + 5;
        return Math.min(next, 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const logIdx = Math.min(
      Math.floor((progress / 100) * BOOT_LOGS.length),
      BOOT_LOGS.length - 1
    );
    setLogIndex(logIdx);
  }, [progress]);

  const handleEnableAudio = () => {
    sound.playClick();
    setAudioPromptStatus("AUDIO LINK ESTABLISHED");
    if (onEnableAudio) onEnableAudio();

    setTimeout(() => {
      setIsFading(true);
      setTimeout(onComplete, 350);
    }, 500);
  };

  const handleEnterSilently = () => {
    sound.playClick();
    setIsFading(true);
    setTimeout(onComplete, 250);
  };

  const handleSkip = () => {
    sound.playClick();
    setIsFading(true);
    setTimeout(onComplete, 200);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-tron-void px-4 transition-opacity duration-500 select-none ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      role="dialog"
      aria-label="System Boot Sequence"
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
      <div className="w-full max-w-md bg-tron-panel/95 border border-tron-border p-6 shadow-cyan-glow relative backdrop-blur-md clip-chamfer">
        <div className="hud-corner hud-corner-tl" />
        <div className="hud-corner hud-corner-tr" />
        <div className="hud-corner hud-corner-bl" />
        <div className="hud-corner hud-corner-br" />

        <div className="flex items-center justify-between text-xs font-mono text-tron-muted mb-3 border-b border-tron-border/60 pb-2">
          <span className="text-tron-cyan font-bold tracking-wider">BOOT PROTOCOL v2.5.0</span>
          <span className={bootReady ? "text-tron-green font-bold" : "text-tron-amber"}>
            STATUS: {bootReady ? "ONLINE" : "BOOTING"}
          </span>
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
        <div className="space-y-1.5 mb-4">
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

        {/* ============================================================ */}
        {/* BOOT COMPLETE: AUDIO MODULE PROMPT (NO AUTOPLAY)              */}
        {/* ============================================================ */}
        {bootReady ? (
          <div className="mt-4 pt-4 border-t border-tron-border space-y-3 animate-fadeIn">
            <div className="text-center font-mono space-y-1">
              <div className="text-xs font-bold text-tron-green">
                SYSTEM ONLINE
              </div>
              <div className="text-[11px] text-tron-cyan font-semibold">
                {audioPromptStatus}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-xs">
              <button
                onClick={handleEnableAudio}
                className="py-2 px-3 rounded bg-tron-cyan/20 border border-tron-cyan text-tron-cyan hover:bg-tron-cyan hover:text-black font-bold flex items-center justify-center gap-1.5 transition-all shadow-cyan-glow-sm"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>ENABLE AUDIO</span>
              </button>

              <button
                onClick={handleEnterSilently}
                className="py-2 px-3 rounded bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 font-semibold flex items-center justify-center gap-1.5 transition-all"
              >
                <VolumeX className="w-3.5 h-3.5" />
                <span>ENTER SILENTLY</span>
              </button>
            </div>
          </div>
        ) : (
          /* Skip Sequence CTA while booting */
          <div className="mt-4 pt-3 border-t border-tron-border/40 flex justify-between items-center text-xs">
            <span className="text-slate-500 font-mono text-[11px]">INITIALIZING IDENTITY MATRIX</span>
            <button
              onClick={handleSkip}
              className="text-tron-cyan/80 hover:text-tron-cyan hover:underline font-mono text-xs tracking-wider transition-colors"
            >
              [SKIP BOOT]
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
