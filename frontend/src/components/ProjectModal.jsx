import React, { useEffect, useRef } from 'react';
import { X, ExternalLink, Calendar, Users, Cpu, GitBranch, ShieldCheck } from 'lucide-react';

/**
 * TRON Project Intel Detail Modal
 * Layer 7: z-60.
 * Includes: Close button ×, ESC key support, Outside click support, and browser back button support.
 * ONLY [ VIEW GITHUB REPOSITORY ], strictly NO Live Demo.
 */
export default function ProjectModal({ project, onClose }) {
  const modalRef = useRef(null);

  // Close on ESC key & handle browser back history navigation
  useEffect(() => {
    if (!project) return;

    // Push state into browser history so mobile back button closes modal rather than navigating away
    window.history.pushState({ modalOpen: true }, '');

    const handlePopState = () => {
      onClose();
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('keydown', handleKeyDown);

    // Prevent body scrolling while modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  // Close on outside click
  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md select-none animate-fade-in"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      {/* Modal Dialog Card */}
      <div
        ref={modalRef}
        className="w-full max-w-2xl bg-tron-void/95 border border-tron-cyan/60 rounded-lg p-6 sm:p-8 shadow-[0_0_50px_rgba(0,240,255,0.25)] relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Lines */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-tron-cyan to-transparent" />

        {/* Header Row */}
        <div className="flex items-start justify-between border-b border-tron-border/80 pb-4 mb-6">
          <div>
            <div className="font-mono text-[11px] text-tron-cyan tracking-[0.2em] mb-1">
              // OPERATION SPECIFICATION
            </div>
            <h2
              id="modal-project-title"
              className="font-display font-black text-xl sm:text-2xl text-white tracking-wider uppercase"
            >
              {project.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded border border-tron-border/70 text-slate-400 hover:text-tron-cyan hover:border-tron-cyan transition-colors"
            aria-label="Close project intel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Telemetry Row: Period & Team */}
        <div className="grid grid-cols-2 gap-4 font-mono text-xs mb-6 p-3 rounded bg-tron-dark/70 border border-tron-border">
          <div className="flex items-center gap-2 text-slate-300">
            <Calendar className="w-4 h-4 text-tron-cyan shrink-0" />
            <div>
              <span className="text-slate-500 block text-[10px]">PROJECT PERIOD</span>
              <span>{project.period}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Users className="w-4 h-4 text-tron-cyan shrink-0" />
            <div>
              <span className="text-slate-500 block text-[10px]">TEAM COLLABORATION</span>
              <span>{project.teamSize} Members</span>
            </div>
          </div>
        </div>

        {/* Detailed Description */}
        <div className="space-y-4 mb-6">
          <div>
            <h4 className="font-mono text-xs font-bold text-tron-cyan tracking-wider mb-1.5">
              SYSTEM OVERVIEW
            </h4>
            <p className="font-sans text-sm text-slate-300 leading-relaxed">
              {project.fullDescription}
            </p>
          </div>

          {/* Key Contributions */}
          <div>
            <h4 className="font-mono text-xs font-bold text-tron-cyan tracking-wider mb-2">
              KEY TECHNICAL CONTRIBUTIONS
            </h4>
            <ul className="space-y-2">
              {project.contributions.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 font-sans text-xs sm:text-sm text-slate-300">
                  <span className="text-tron-cyan font-mono mt-0.5">▸</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tech Stack Badges */}
        <div className="mb-8">
          <h4 className="font-mono text-xs font-bold text-slate-400 tracking-wider mb-2.5">
            TECHNOLOGY STACK
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="font-mono text-xs px-2.5 py-1 rounded bg-tron-dark border border-tron-cyan/30 text-tron-cyan"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action: ONLY GitHub Button */}
        <div className="pt-4 border-t border-tron-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="font-mono text-[10px] text-slate-500 tracking-widest">
            SOURCE CODE: VERIFIED PUBLIC REPOSITORY
          </div>

          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-2.5 rounded bg-tron-cyan/15 border border-tron-cyan text-tron-cyan hover:bg-tron-cyan hover:text-black font-mono font-bold text-xs tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] flex items-center justify-center gap-2"
          >
            <span>[ VIEW GITHUB REPOSITORY ]</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
