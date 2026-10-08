import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Disc } from 'lucide-react';
import { audioSystem } from '../services/audioService';

/**
 * Minimal TRON Navigation HUD
 * 100% Full-width responsive header.
 * Exactly 7 sections: SYSTEM, ABOUT, SKILLS, PROJECTS, EDUCATION, RESUME, CONTACT.
 * Mobile Menu Layer: z-50 (strictly ABOVE Floating Audio Player z-30).
 * Zoom resilient (80% - 200%).
 */
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('system');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const menuRef = useRef(null);
  const toggleBtnRef = useRef(null);

  const navItems = [
    { id: 'system', label: 'SYSTEM' },
    { id: 'about', label: 'ABOUT' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'education', label: 'EDUCATION' },
    { id: 'resume', label: 'RESUME' },
    { id: 'contact', label: 'CONTACT' },
  ];

  // Subscribe to audio state for small indicator
  useEffect(() => {
    const unsub = audioSystem.subscribe((state) => {
      setIsAudioPlaying(state.isPlaying);
    });
    return () => unsub();
  }, []);

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sections = navItems.map((item) => document.getElementById(item.id));
      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop - 120 <= scrollY) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleNavClick = (id) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const topOffset = 70;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - topOffset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/* 100% Full-Width Desktop / Mobile Navbar Header (Layer 5: z-40) */}
      <header className="fixed top-0 left-0 right-0 w-full z-40 bg-tron-void/85 backdrop-blur-md border-b border-tron-cyan/25 select-none transition-all duration-200">
        <div className="w-full px-[clamp(1rem,4vw,3rem)] py-3.5 flex items-center justify-between">
          
          {/* Brand Identity */}
          <button
            onClick={() => handleNavClick('system')}
            className="flex items-center gap-3 text-left group"
          >
            <div className="w-8 h-8 rounded-full border border-tron-cyan/60 flex items-center justify-center group-hover:border-tron-cyan group-hover:shadow-[0_0_12px_rgba(0,240,255,0.5)] transition-all">
              <span className={`w-2 h-2 rounded-full bg-tron-cyan ${isAudioPlaying ? 'animate-ping' : ''}`} />
            </div>
            <div>
              <span className="font-display font-black text-sm sm:text-base tracking-[0.2em] text-white group-hover:text-tron-cyan transition-colors">
                SHUBRANIL
              </span>
              <span className="block font-mono text-[9px] tracking-widest text-tron-cyan/70">
                MCA // DATA SCIENCE
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-[clamp(1rem,1.8vw,2rem)]" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`font-mono text-xs tracking-[0.18em] transition-all relative py-1 px-1 ${
                    isActive
                      ? 'text-tron-cyan font-bold drop-shadow-[0_0_8px_rgba(0,240,255,0.7)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-tron-cyan shadow-[0_0_8px_#00f0ff]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Mobile Trigger & Audio Quick Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              ref={toggleBtnRef}
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded border border-tron-cyan/40 bg-tron-cyan/10 text-tron-cyan hover:bg-tron-cyan hover:text-black transition-all shadow-[0_0_10px_rgba(0,240,255,0.2)]"
              aria-label={menuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay & Drawer (Layer 6: z-50 — ALWAYS ABOVE AUDIO PLAYER z-30) */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Full Backdrop */}
        <div
          className="absolute inset-0 bg-black/85 backdrop-blur-xl"
          onClick={() => setMenuOpen(false)}
        />

        {/* Slide-in Cyber Navigation Drawer */}
        <div
          ref={menuRef}
          className={`absolute top-0 right-0 w-[min(340px,85vw)] h-full bg-tron-void/95 border-l border-tron-cyan/50 shadow-[-10px_0_40px_rgba(0,0,0,0.9)] p-6 flex flex-col justify-between transition-transform duration-300 ease-out ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Drawer Header */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-tron-border mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-tron-cyan animate-pulse" />
                <span className="font-mono text-xs font-bold tracking-[0.2em] text-white">
                  NAVIGATION CORE
                </span>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-1.5 rounded text-slate-400 hover:text-tron-cyan transition-colors"
                aria-label="Close Navigation Menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Menu Items List */}
            <nav className="flex flex-col gap-2">
              {navItems.map((item, idx) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-left px-4 py-3 rounded border transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-tron-cyan/15 border-tron-cyan text-tron-cyan font-bold shadow-[0_0_15px_rgba(0,240,255,0.25)]'
                        : 'bg-tron-dark/50 border-tron-border/60 text-slate-300 hover:border-tron-cyan/40 hover:text-white'
                    }`}
                  >
                    <span className="font-mono text-xs tracking-wider">
                      <span className="text-slate-500 mr-2">0{idx + 1} //</span>
                      {item.label}
                    </span>
                    <span className="text-tron-cyan text-xs">→</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Drawer Footer Telemetry */}
          <div className="pt-6 border-t border-tron-border text-center">
            <div className="font-mono text-[10px] text-slate-500 tracking-widest">
              SHUBRANIL PANDIT // MCA DATA SCIENCE
            </div>
            <div className="font-mono text-[9px] text-tron-cyan/70 mt-1">
              SYSTEM STATUS: ONLINE
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
