import React, { useState } from 'react';
import { Volume2, VolumeX, Terminal, Shield, Activity, Menu, X } from 'lucide-react';
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
    <header className="fixed top-0 left-0 right-0 z-40 bg-tron-void/85 backdrop-blur-md border-b border-tron-border/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Brand Identity & Status */}
        <a
          href="#system"
          onClick={() => sound.playClick()}
          className="flex items-center gap-3 group"
        >
          <div className="relative w-8 h-8 rounded-full border border-tron-cyan/60 flex items-center justify-center group-hover:border-tron-cyan transition-colors">
            <div className="w-4 h-4 rounded-full bg-tron-cyan/20 border border-tron-cyan shadow-cyan-glow-sm" />
            <div className="absolute inset-0 rounded-full border border-dashed border-tron-blue animate-spin-slow opacity-60" />
          </div>
          <div>
            <div className="font-display font-bold text-sm tracking-wider text-white group-hover:text-tron-cyan transition-colors flex items-center gap-1.5">
              SHUBRANIL PANDIT
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-tron-cyan/10 border border-tron-cyan/30 text-tron-cyan">
                MCA
              </span>
            </div>
            <div className="text-[10px] font-mono text-slate-400">DATA SCIENCE SPECIALIZATION</div>
          </div>
        </a>

        {/* Center: Desktop Nav Links */}
        <nav className="hidden xl:flex items-center space-x-5 text-xs font-mono tracking-wider">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => sound.playHover()}
              className="text-slate-300 hover:text-tron-cyan transition-colors relative py-1 hover:drop-shadow-[0_0_8px_rgba(0,240,255,0.7)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Actions (Health, Terminal, Sound, Admin, Mobile Toggle) */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* System Health Badge */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenHealth();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded bg-tron-panel border border-tron-border hover:border-tron-cyan transition-colors"
            title="Inspect Live System Health Telemetry"
          >
            <Activity className="w-3.5 h-3.5 text-tron-green animate-pulse" />
            <span className="hidden sm:inline text-slate-300 text-[11px]">STATUS:</span>
            <span className={`font-semibold text-[11px] ${systemStatus === 'ONLINE' ? 'text-tron-green' : 'text-tron-amber'}`}>
              {systemStatus || 'ONLINE'}
            </span>
          </button>

          {/* Interactive Terminal Button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenTerminal();
            }}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-mono rounded bg-tron-cyan/10 border border-tron-cyan/40 text-tron-cyan hover:bg-tron-cyan/20 transition-all shadow-cyan-glow-sm"
            title="Launch Interactive Terminal (CLI)"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span className="hidden md:inline font-bold">TERMINAL</span>
          </button>

          {/* Procedural Audio FX Toggle */}
          <button
            onClick={() => {
              onToggleSound();
            }}
            className={`p-1.5 rounded border transition-all ${
              soundMuted
                ? 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-slate-200'
                : 'bg-tron-cyan/20 border-tron-cyan text-tron-cyan shadow-cyan-glow-sm'
            }`}
            title={soundMuted ? "Enable HUD Sound FX" : "Mute Sound FX"}
          >
            {soundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Admin Room Button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenAdmin();
            }}
            className="p-1.5 rounded border border-tron-border hover:border-tron-amber hover:text-tron-amber text-slate-400 transition-colors"
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
            className="xl:hidden p-1.5 rounded border border-tron-border text-slate-300 hover:text-tron-cyan transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-tron-dark/95 border-b border-tron-border px-4 pt-3 pb-5 backdrop-blur-xl animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleNavClick}
                className="px-3 py-2 rounded bg-tron-panel/60 border border-tron-border/70 text-slate-300 hover:text-tron-cyan hover:border-tron-cyan transition-colors"
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
