import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Terminal, Shield, Activity, Menu, X, Disc, Play, Pause, Radio } from 'lucide-react';
import { sound } from '../services/soundService';

export default function Navbar({
  systemStatus,
  onOpenHealth,
  onOpenTerminal,
  onOpenAdmin,
  soundMuted,
  onToggleSound,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themePlaying, setThemePlaying] = useState(false);
  const [themeVolume, setThemeVolume] = useState(0.12);
  const [equalizerLevels, setEqualizerLevels] = useState([40, 75, 55, 90, 60]);

  useEffect(() => {
    const unsubscribe = sound.registerVisualizer((isPlaying) => {
      setThemePlaying(isPlaying);
      if (isPlaying) {
        setEqualizerLevels([
          Math.floor(Math.random() * 65) + 35,
          Math.floor(Math.random() * 75) + 25,
          Math.floor(Math.random() * 85) + 15,
          Math.floor(Math.random() * 95) + 20,
          Math.floor(Math.random() * 70) + 30,
        ]);
      }
    });
    return unsubscribe;
  }, []);

  const toggleThemeSong = () => {
    sound.playClick();
    const isPlaying = sound.toggleTronTheme();
    setThemePlaying(isPlaying);
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setThemeVolume(val);
    sound.setThemeVolume(val);
  };

  const navLinks = [
    { label: 'SYSTEM', href: '#system' },
    { label: 'ABOUT', href: '#about' },
    { label: 'SKILLS', href: '#skills' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'EDUCATION', href: '#education' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'ACHIEVEMENTS', href: '#achievements' },
    { label: 'GITHUB', href: '#github' },
    { label: 'RESUME', href: '#resume' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const handleNavClick = () => {
    sound.playClick();
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-tron-void/90 backdrop-blur-xl border-b border-tron-border/90 shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
      
      {/* Top Technical Telemetry Strip */}
      <div className="hidden lg:flex items-center justify-between px-6 py-1 bg-tron-dark/95 border-b border-tron-border/60 text-[10px] font-mono tracking-widest text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-tron-cyan font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-tron-cyan animate-pulse" />
            GRID DECK // SECTOR-01
          </span>
          <span className="text-slate-600">|</span>
          <span>IDENTITY: SHUBRANIL PANDIT [MCA DATA SCIENCE]</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">CORE ARCHITECTURE: TRON-OS v2.5</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-slate-400">
            FREQ: <span className="text-tron-cyan">104.2 MHz</span>
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-tron-green flex items-center gap-1">
            <Radio className="w-3 h-3" />
            TELEMETRY: NOMINAL
          </span>
        </div>
      </div>

      {/* Main Command Deck Bar (Spacious, breathing layout) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        
        {/* Left: Brand Identity & Animated Core */}
        <a
          href="#system"
          onClick={() => sound.playClick()}
          className="flex items-center gap-3.5 group flex-shrink-0"
        >
          <div className="relative w-10 h-10 rounded-full border border-tron-cyan/60 flex items-center justify-center group-hover:border-tron-cyan group-hover:shadow-cyan-glow-sm transition-all">
            <div className="w-5 h-5 rounded-full bg-tron-cyan/25 border border-tron-cyan shadow-cyan-glow-sm" />
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-tron-blue animate-spin-slow opacity-70" />
          </div>
          <div>
            <div className="font-display font-black text-base sm:text-lg tracking-wider text-white group-hover:text-tron-cyan transition-colors flex items-center gap-2">
              SHUBRANIL PANDIT
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-tron-cyan/15 border border-tron-cyan/40 text-tron-cyan font-bold tracking-normal">
                MCA
              </span>
            </div>
            <div className="text-[11px] font-mono text-tron-cyanBright/80 tracking-wide">
              DATA SCIENCE & AI SPECIALIST
            </div>
          </div>
        </a>

        {/* Center: Desktop Navigation Hub */}
        <nav className="hidden 2xl:flex items-center space-x-1 font-mono text-xs tracking-wider">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => sound.playHover()}
              className="px-3 py-1.5 rounded text-slate-300 hover:text-tron-cyan hover:bg-tron-cyan/10 transition-all border border-transparent hover:border-tron-cyan/30"
            >
              [{link.label}]
            </a>
          ))}
        </nav>

        {/* Right Action Suite: TRON Theme Music Player, Live Health, Terminal, Admin */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
          
          {/* ============================================================ */}
          {/* TRON: LEGACY MOVIE THEME CONTROLLER (SUBTLE ATMOSPHERIC AUDIO) */}
          {/* ============================================================ */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-tron-panel/90 border border-tron-cyan/50 shadow-cyan-glow-sm relative clip-chamfer">
            <div className="hud-corner hud-corner-tl" />
            <div className="hud-corner hud-corner-br" />

            <button
              onClick={toggleThemeSong}
              className={`flex items-center gap-1.5 text-xs font-mono font-bold transition-all ${
                themePlaying
                  ? 'text-tron-cyan drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]'
                  : 'text-slate-400 hover:text-tron-cyan'
              }`}
              title={themePlaying ? "Pause Tron Legacy Theme" : "Play Tron Legacy Movie Theme (Daft Punk)"}
            >
              {themePlaying ? (
                <Pause className="w-3.5 h-3.5 text-tron-cyan animate-pulse" />
              ) : (
                <Play className="w-3.5 h-3.5 text-tron-cyan" />
              )}
              <span className="hidden sm:inline">
                {themePlaying ? "TRON THEME: ON" : "TRON THEME"}
              </span>
            </button>

            {/* Live Equalizer Animation Wavebars */}
            <div className="flex items-end gap-0.5 h-3.5 w-7 sm:w-9 px-0.5">
              {equalizerLevels.map((lvl, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-t transition-all duration-150 ${
                    themePlaying ? 'bg-tron-cyan shadow-cyan-glow-sm' : 'bg-slate-700 h-1'
                  }`}
                  style={{ height: themePlaying ? `${lvl}%` : '20%' }}
                />
              ))}
            </div>

            {/* Subtle Volume Slider (hidden on extra small screens) */}
            <div className="hidden md:flex items-center gap-1 text-[10px] font-mono text-slate-400 pl-1 border-l border-tron-border/60">
              <span title="Subtle ambient volume">VOL</span>
              <input
                type="range"
                min="0.03"
                max="0.30"
                step="0.01"
                value={themeVolume}
                onChange={handleVolumeChange}
                className="w-12 h-1 bg-slate-800 rounded appearance-none cursor-pointer accent-tron-cyan"
                title={`Theme Volume: ${Math.round(themeVolume * 100)}% (Subtle)`}
              />
            </div>
          </div>

          {/* System Health Telemetry Badge */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenHealth();
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded bg-tron-panel border border-tron-border hover:border-tron-cyan transition-colors"
            title="Inspect Live System Health Telemetry"
          >
            <Activity className="w-3.5 h-3.5 text-tron-green animate-pulse" />
            <span className="text-slate-300 text-[11px]">STATUS:</span>
            <span className={`font-bold text-[11px] ${systemStatus === 'ONLINE' ? 'text-tron-green' : 'text-tron-amber'}`}>
              {systemStatus || 'ONLINE'}
            </span>
          </button>

          {/* Interactive Terminal (CLI) Button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenTerminal();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded bg-tron-cyan/10 border border-tron-cyan/40 text-tron-cyan hover:bg-tron-cyan/25 transition-all shadow-cyan-glow-sm"
            title="Launch Interactive Terminal (CLI)"
          >
            <Terminal className="w-3.5 h-3.5 text-tron-cyan" />
            <span className="hidden md:inline font-bold">CLI</span>
          </button>

          {/* Sound FX Mute Toggle */}
          <button
            onClick={() => onToggleSound()}
            className={`p-2 rounded border transition-all ${
              soundMuted
                ? 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-slate-200'
                : 'bg-tron-cyan/20 border-tron-cyan text-tron-cyan shadow-cyan-glow-sm'
            }`}
            title={soundMuted ? "Enable HUD Sound FX (Clicks/Hums)" : "Mute Sound FX"}
          >
            {soundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Admin Room Button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenAdmin();
            }}
            className="p-2 rounded border border-tron-border hover:border-tron-amber hover:text-tron-amber text-slate-400 transition-colors"
            title="Admin Control Room"
          >
            <Shield className="w-4 h-4" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => {
              sound.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="2xl:hidden p-2 rounded border border-tron-border text-slate-300 hover:text-tron-cyan transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Expanded Mobile & Medium Screen Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="2xl:hidden bg-tron-dark/98 border-t border-tron-border px-4 py-5 backdrop-blur-2xl animate-fadeIn">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs font-mono">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleNavClick}
                className="px-3 py-2.5 rounded bg-tron-panel border border-tron-border/80 text-slate-200 hover:text-tron-cyan hover:border-tron-cyan transition-all text-center"
              >
                &gt; {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
