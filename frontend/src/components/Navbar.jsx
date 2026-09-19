import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Shield, Activity, Menu, X, Music, Radio, ChevronRight } from 'lucide-react';
import { sound } from '../services/soundService';

export default function Navbar({
  systemStatus,
  onOpenHealth,
  onOpenTerminal,
  onOpenAdmin,
  onToggleAudioPlayer,
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef(null);
  const menuButtonRef = useRef(null);

  const navLinks = [
    { num: '01', label: 'SYSTEM', desc: 'Core Identity & Status', href: '#system' },
    { num: '02', label: 'ABOUT', desc: 'Dossier & Focus Areas', href: '#about' },
    { num: '03', label: 'SKILLS', desc: 'Technical Competencies Matrix', href: '#skills' },
    { num: '04', label: 'PROJECTS', desc: 'Command Center & RAG Engine', href: '#projects' },
    { num: '05', label: 'EDUCATION', desc: 'MCA Data Science Timeline', href: '#education' },
    { num: '06', label: 'EXPERIENCE', desc: 'Research & Practical Operations', href: '#experience' },
    { num: '07', label: 'ACHIEVEMENTS', desc: 'Commendations & Awards', href: '#achievements' },
    { num: '08', label: 'GITHUB', desc: 'Repository Telemetry Radar', href: '#github' },
    { num: '09', label: 'RESUME', desc: 'Curriculum Vitae & PDF Stream', href: '#resume' },
    { num: '10', label: 'CONTACT', desc: 'Encrypted Transmission Console', href: '#contact' },
  ];

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && drawerOpen) {
        sound.playClick();
        setDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [drawerOpen]);

  // Close drawer on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        drawerOpen &&
        drawerRef.current &&
        !drawerRef.current.contains(e.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(e.target)
      ) {
        sound.playClick();
        setDrawerOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [drawerOpen]);

  const handleNavSelect = () => {
    sound.playClick();
    setDrawerOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-40 bg-tron-void/90 backdrop-blur-xl border-b border-tron-border/90 shadow-[0_4px_30px_rgba(0,0,0,0.85)] audio-reactive-border">
      
      {/* Top Telemetry Strip (100% full width, responsive padding) */}
      <div className="w-full px-[clamp(1rem,3vw,2.5rem)] py-1 bg-tron-dark/95 border-b border-tron-border/50 text-[clamp(0.6rem,0.7vw,0.75rem)] font-mono tracking-widest text-slate-400 flex items-center justify-between overflow-hidden">
        <div className="flex items-center gap-2 sm:gap-4 truncate">
          <span className="flex items-center gap-1.5 text-tron-cyan font-semibold shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-tron-cyan animate-pulse" />
            GRID-CORE // SECTOR-01
          </span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="truncate hidden md:inline">IDENTITY: SHUBRANIL PANDIT [MCA DATA SCIENCE]</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <span className="text-tron-green flex items-center gap-1">
            <Radio className="w-3 h-3" />
            <span className="hidden sm:inline">STATUS:</span> ONLINE
          </span>
        </div>
      </div>

      {/* Main Full-Width Command Deck */}
      <div className="w-full px-[clamp(1rem,3vw,2.5rem)] py-[clamp(0.6rem,1.2vh,0.9rem)] flex items-center justify-between gap-[clamp(0.5rem,1.5vw,2rem)]">
        
        {/* Left: Brand Identity with Rotating Cyber Core */}
        <a
          href="#system"
          onClick={() => sound.playClick()}
          className="flex items-center gap-2.5 sm:gap-3.5 group shrink-0 min-w-0"
        >
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-tron-cyan/60 flex items-center justify-center group-hover:border-tron-cyan group-hover:shadow-cyan-glow-sm transition-all shrink-0">
            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-tron-cyan/25 border border-tron-cyan shadow-cyan-glow-sm" />
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-tron-blue animate-spin-slow opacity-70" />
          </div>

          <div className="min-w-0">
            <div className="font-display font-black text-sm sm:text-base tracking-wider text-white group-hover:text-tron-cyan transition-colors flex items-center gap-1.5 sm:gap-2 truncate">
              <span className="truncate">SHUBRANIL PANDIT</span>
              <span className="text-[9px] sm:text-[10px] font-mono px-1.5 py-0.2 rounded bg-tron-cyan/15 border border-tron-cyan/40 text-tron-cyan font-bold tracking-normal shrink-0">
                MCA
              </span>
            </div>
            <div className="text-[10px] sm:text-[11px] font-mono text-tron-cyanBright/80 tracking-wide truncate">
              DATA SCIENCE & AI SPECIALIST
            </div>
          </div>
        </a>

        {/* Right Action Suite: Telemetry, Audio Trigger, Terminal, Admin & BURGER MENU */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          
          {/* Audio Quick Trigger */}
          <button
            onClick={() => {
              sound.playClick();
              if (onToggleAudioPlayer) onToggleAudioPlayer();
            }}
            className="hidden sm:flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded bg-tron-panel border border-tron-cyan/40 hover:border-tron-cyan text-tron-cyan font-mono text-[clamp(0.68rem,0.8vw,0.78rem)] transition-all shadow-cyan-glow-sm"
            title="Open TRON: Legacy Music Player"
          >
            <Music className="w-3.5 h-3.5 animate-pulse" />
            <span className="hidden lg:inline font-semibold">AUDIO: END OF LINE</span>
            <span className="lg:hidden font-semibold">AUDIO</span>
          </button>

          {/* System Telemetry Status Badge */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenHealth();
            }}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-tron-panel border border-tron-border hover:border-tron-cyan font-mono text-[clamp(0.68rem,0.8vw,0.78rem)] text-slate-300 transition-colors"
            title="Inspect System Telemetry"
          >
            <Activity className="w-3.5 h-3.5 text-tron-green animate-pulse" />
            <span className={`font-bold ${systemStatus === 'ONLINE' ? 'text-tron-green' : 'text-tron-amber'}`}>
              {systemStatus || 'ONLINE'}
            </span>
          </button>

          {/* Interactive Terminal (CLI) Button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenTerminal();
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded bg-tron-cyan/10 border border-tron-cyan/40 text-tron-cyan hover:bg-tron-cyan/25 font-mono text-[clamp(0.68rem,0.8vw,0.78rem)] font-bold transition-all shadow-cyan-glow-sm"
            title="Launch Interactive Terminal (CLI)"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">CLI</span>
          </button>

          {/* Admin Control Room */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenAdmin();
            }}
            className="p-1.5 sm:p-2 rounded border border-tron-border hover:border-tron-amber hover:text-tron-amber text-slate-400 transition-colors"
            title="Admin Control Room"
            aria-label="Admin Control Room"
          >
            <Shield className="w-4 h-4" />
          </button>

          {/* ============================================================ */}
          {/* FUTURISTIC BURGER MENU BUTTON (CLEAN & UNCLUTTERED)           */}
          {/* ============================================================ */}
          <button
            ref={menuButtonRef}
            onClick={() => {
              sound.playClick();
              setDrawerOpen(!drawerOpen);
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded border font-mono text-[clamp(0.7rem,0.85vw,0.82rem)] font-bold tracking-wider transition-all clip-chamfer ${
              drawerOpen
                ? 'bg-tron-cyan text-black border-tron-cyan shadow-cyan-glow'
                : 'bg-tron-panel border-tron-cyan/60 text-tron-cyan hover:bg-tron-cyan/20 hover:border-tron-cyan shadow-cyan-glow-sm'
            }`}
            aria-label={drawerOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={drawerOpen}
          >
            {drawerOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            <span className="hidden sm:inline">
              {drawerOpen ? 'CLOSE' : 'NAVIGATION CORE'}
            </span>
            <span className="sm:hidden">MENU</span>
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* FUTURISTIC TRON NAVIGATION DRAWER / HUD OVERLAY             */}
      {/* ============================================================ */}
      {drawerOpen && (
        <div
          className="fixed inset-0 top-[clamp(4.2rem,8vh,5.5rem)] z-30 bg-black/80 backdrop-blur-xl animate-fadeIn flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="Main Navigation Menu"
        >
          <div
            ref={drawerRef}
            className="w-full sm:w-[420px] h-[calc(100vh-clamp(4.2rem,8vh,5.5rem))] bg-tron-panel/95 border-l border-tron-cyan/60 p-6 shadow-cyan-glow-lg flex flex-col justify-between overflow-y-auto relative"
          >
            <div className="hud-corner hud-corner-tl" />
            <div className="hud-corner hud-corner-bl" />

            <div>
              {/* Drawer Title */}
              <div className="flex items-center justify-between border-b border-tron-border/80 pb-3 mb-4">
                <div>
                  <span className="text-[10px] font-mono text-tron-cyan uppercase tracking-widest block">
                    // SYSTEM DIRECTORY
                  </span>
                  <h3 className="text-lg font-display font-bold text-white tracking-wider">
                    GRID NAVIGATION
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-400">
                  ESC TO EXIT
                </span>
              </div>

              {/* Navigation Links Grid */}
              <nav className="space-y-1.5 font-mono text-xs">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={handleNavSelect}
                    className="flex items-center justify-between p-2.5 rounded bg-tron-dark/80 border border-tron-border/70 hover:border-tron-cyan hover:bg-tron-cyan/10 text-slate-300 hover:text-tron-cyan transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-tron-cyan/70 font-bold group-hover:text-tron-cyan">
                        [{link.num}]
                      </span>
                      <div>
                        <div className="font-bold text-white group-hover:text-tron-cyan tracking-wider">
                          {link.label}
                        </div>
                        <div className="text-[10px] text-slate-500 group-hover:text-slate-400">
                          {link.desc}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-tron-cyan group-hover:translate-x-0.5 transition-all" />
                  </a>
                ))}
              </nav>
            </div>

            {/* Bottom Drawer Telemetry Summary */}
            <div className="pt-4 border-t border-tron-border/60 mt-4 text-[10px] font-mono text-slate-500 space-y-1">
              <div className="flex justify-between">
                <span>IDENTITY:</span>
                <span className="text-tron-cyan">SHUBRANIL PANDIT</span>
              </div>
              <div className="flex justify-between">
                <span>SPECIALIZATION:</span>
                <span className="text-slate-300">MCA DATA SCIENCE</span>
              </div>
              <div className="flex justify-between">
                <span>SECURITY PROTOCOL:</span>
                <span className="text-tron-green">VERIFIED</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
