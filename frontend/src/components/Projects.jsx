import React, { useState } from 'react';
import { ExternalLink, Layers, Sparkles, Terminal, X, ChevronRight } from 'lucide-react';
import { GithubIcon } from './CyberIcons';
import { sound } from '../services/soundService';
import RagVisualizer from './RagVisualizer';

export default function Projects({ projects, categories }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeProjectModal, setActiveProjectModal] = useState(null);

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());

  const openProjectModal = (proj) => {
    sound.playClick();
    setActiveProjectModal(proj);
  };

  const closeProjectModal = () => {
    sound.playClick();
    setActiveProjectModal(null);
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-tron-cyan/10 border border-tron-cyan/30 text-tron-cyan text-xs font-mono mb-2">
            <span>// DEPLOYMENT COMMAND CENTER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-wider">
            FEATURED <span className="text-glow-cyan text-tron-cyan">PROJECTS</span>
          </h2>
          <p className="font-mono text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto mt-2">
            Production systems, high-dimensional data pipelines, and research prototypes
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.playClick();
                setSelectedCategory(cat);
              }}
              className={`px-4 py-1.5 text-xs font-mono tracking-wider transition-all clip-chamfer ${
                selectedCategory.toLowerCase() === cat.toLowerCase()
                  ? 'bg-tron-cyan text-black font-bold shadow-cyan-glow'
                  : 'bg-tron-panel text-slate-400 hover:text-tron-cyan border border-tron-border'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => {
            const isGenAi = project.title.toLowerCase().includes("genai") || project.title.toLowerCase().includes("rag");

            return (
              <div
                key={project.id}
                onMouseEnter={() => sound.playHover()}
                className="tron-panel p-6 relative flex flex-col justify-between group hover:border-tron-cyan/80 transition-all duration-300"
              >
                <div className="hud-corner hud-corner-tl" />
                <div className="hud-corner hud-corner-tr" />
                <div className="hud-corner hud-corner-bl" />
                <div className="hud-corner hud-corner-br" />

                <div>
                  {/* Top Bar: Category & Status */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-tron-cyan font-semibold tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-tron-cyan" />
                      {project.category}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
                      {project.status || 'Active'}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-display font-bold text-white group-hover:text-tron-cyan transition-colors">
                    {project.title}
                  </h3>
                  {project.subtitle && (
                    <div className="text-xs font-mono text-slate-400 mt-1 line-clamp-1">
                      {project.subtitle}
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-sm text-slate-300 mt-3 line-clamp-3 leading-relaxed font-sans">
                    {project.description}
                  </p>

                  {/* Problem Solved Badge */}
                  {project.problem_solved && (
                    <div className="mt-3 p-2.5 rounded bg-tron-dark/80 border border-tron-border/70 text-xs font-sans text-slate-300">
                      <span className="font-mono text-tron-cyan text-[11px] font-semibold block mb-0.5">
                        PROBLEM SOLVED:
                      </span>
                      <p className="line-clamp-2 text-slate-400">
                        {project.problem_solved}
                      </p>
                    </div>
                  )}

                  {/* If GenAI RAG, render embedded interactive mini-flow */}
                  {isGenAi && <RagVisualizer />}

                  {/* Technologies Pills */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.technologies?.map((tech) => (
                      <span key={tech} className="cyber-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Links */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-tron-border/60">
                  <div className="flex items-center gap-3">
                    {project.repo_url && (
                      <a
                        href={project.repo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => sound.playClick()}
                        className="text-xs font-mono text-slate-400 hover:text-tron-cyan flex items-center gap-1 transition-colors"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>CODE</span>
                      </a>
                    )}
                    {project.demo_url && (
                      <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => sound.playClick()}
                        className="text-xs font-mono text-tron-cyan hover:text-white flex items-center gap-1 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>LIVE DEMO</span>
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => openProjectModal(project)}
                    className="text-xs font-mono text-tron-cyan hover:underline flex items-center gap-1"
                  >
                    <span>DETAILS</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Project Detail Modal */}
        {activeProjectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
            <div className="w-full max-w-2xl bg-tron-panel border border-tron-cyan p-6 rounded clip-chamfer relative shadow-cyan-glow max-h-[90vh] overflow-y-auto">
              <div className="hud-corner hud-corner-tl" />
              <div className="hud-corner hud-corner-tr" />
              <div className="hud-corner hud-corner-bl" />
              <div className="hud-corner hud-corner-br" />

              <div className="flex justify-between items-start border-b border-tron-border pb-3 mb-4">
                <div>
                  <span className="text-xs font-mono text-tron-cyan uppercase tracking-wider">
                    {activeProjectModal.category} // {activeProjectModal.status}
                  </span>
                  <h3 className="text-2xl font-display font-bold text-white mt-1">
                    {activeProjectModal.title}
                  </h3>
                  {activeProjectModal.subtitle && (
                    <div className="text-xs font-mono text-slate-400 mt-0.5">
                      {activeProjectModal.subtitle}
                    </div>
                  )}
                </div>
                <button
                  onClick={closeProjectModal}
                  className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-sm text-slate-300 font-sans">
                <div>
                  <h4 className="text-xs font-mono text-tron-cyan uppercase font-bold mb-1">
                    SYSTEM OVERVIEW
                  </h4>
                  <p className="leading-relaxed">{activeProjectModal.description}</p>
                </div>

                {activeProjectModal.problem_solved && (
                  <div className="p-3 bg-tron-dark border border-tron-border rounded">
                    <h4 className="text-xs font-mono text-tron-cyan uppercase font-bold mb-1">
                      PROBLEM ADDRESSED
                    </h4>
                    <p className="text-slate-300 leading-relaxed">
                      {activeProjectModal.problem_solved}
                    </p>
                  </div>
                )}

                {activeProjectModal.key_contribution && (
                  <div className="p-3 bg-tron-dark border border-tron-border rounded">
                    <h4 className="text-xs font-mono text-tron-green uppercase font-bold mb-1">
                      KEY ARCHITECTURAL CONTRIBUTION
                    </h4>
                    <p className="text-slate-300 leading-relaxed">
                      {activeProjectModal.key_contribution}
                    </p>
                  </div>
                )}

                {/* Visual Architecture Flow */}
                {activeProjectModal.architecture_flow && (
                  <div>
                    <h4 className="text-xs font-mono text-tron-cyan uppercase font-bold mb-1">
                      ARCHITECTURE DATA PIPELINE
                    </h4>
                    <pre className="p-3 rounded bg-black/70 border border-slate-800 font-mono text-xs text-tron-cyanBright overflow-x-auto whitespace-pre-wrap">
                      {activeProjectModal.architecture_flow}
                    </pre>
                  </div>
                )}

                <div>
                  <h4 className="text-xs font-mono text-slate-400 uppercase font-bold mb-2">
                    TECHNOLOGY STACK
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeProjectModal.technologies?.map((tech) => (
                      <span key={tech} className="cyber-tag text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-tron-border">
                  {activeProjectModal.repo_url && (
                    <a
                      href={activeProjectModal.repo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cyber-btn flex items-center gap-2"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>GITHUB REPOSITORY</span>
                    </a>
                  )}
                  {activeProjectModal.demo_url && (
                    <a
                      href={activeProjectModal.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cyber-btn cyber-btn-amber flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>OPEN LIVE DEMO</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
