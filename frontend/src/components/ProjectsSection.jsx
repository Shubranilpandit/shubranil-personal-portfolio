import React, { useState } from 'react';
import { Eye, ExternalLink, ArrowRight, GitBranch } from 'lucide-react';
import ProjectModal from './ProjectModal';

/**
 * Minimal TRON Projects Showcase
 * Strictly TWO authentic projects from resume: V-Mirror & FAERS.
 * Section #projects
 */
export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 'v-mirror',
      title: 'V-MIRROR — VIRTUAL TRY-ON WEB APPLICATION',
      period: '15 Jan 2026 – 18 Apr 2026',
      teamSize: 2,
      summary:
        'Interactive virtual try-on application enabling users to upload photos and preview accessories such as sunglasses and hats with real-time MediaPipe facial landmark positioning.',
      fullDescription:
        'V-Mirror is a full-stack computer vision application designed to revolutionize online accessory shopping. Users upload portrait photos, which are processed using Google MediaPipe to extract high-dimensional facial landmark coordinates. The frontend dynamically positions, scales, and renders accessories (sunglasses, hats) with perspective accuracy. The backend is powered by Python and Flask, managing file validation, image processing pipelines, and REST APIs.',
      contributions: [
        'Engineered facial landmark detection pipeline utilizing MediaPipe for precise accessory alignment.',
        'Developed dynamic geometry transformation algorithms to map sunglasses and hats seamlessly onto user faces.',
        'Created modular Python Flask REST endpoints for photo uploads, processing, and session management.',
        'Integrated responsive client interface built with clean HTML5, CSS3, and JavaScript.',
      ],
      technologies: ['Python', 'Flask', 'MediaPipe', 'Computer Vision', 'OpenCV', 'JavaScript', 'HTML5', 'CSS3', 'Git'],
      github: 'https://github.com/Shubranilpandit/V-Mirror_Draft_v1',
    },
    {
      id: 'faers',
      title: 'STABILITY-AWARE MINING OF POLYPHARMACY-ASSOCIATED SERIOUS ADRS',
      period: '20 Jan 2026 – 24 Jul 2026',
      teamSize: 3,
      summary:
        'Large-scale FDA FAERS adverse drug reaction dataset integration, preprocessing, standardization, and statistical disproportionality signal mining for multi-drug combinations.',
      fullDescription:
        'A comprehensive biomedical data engineering and signal detection platform analyzing the FDA Adverse Event Reporting System (FAERS). The pipeline cleans, normalizes, and harmonizes millions of safety reports across multiple calendar quarters. Implemented stability-aware statistical signal detection metrics (Proportional Reporting Ratio - PRR, Reporting Odds Ratio - ROR) to identify true adverse reactions resulting from polypharmacy interactions while eliminating reporting bias.',
      contributions: [
        'Ingested and preprocessed millions of multi-quarter FAERS raw records, resolving demographic discrepancies.',
        'Implemented drug name standardization and MedDRA Preferred Term (PT) adverse event mapping dictionaries.',
        'Constructed PostgreSQL schemas and optimized SQL analytical queries for high-throughput disproportionality scoring.',
        'Executed exploratory data analysis (EDA) and stability-aware threshold filtering using Python and Pandas.',
      ],
      technologies: ['Python', 'Pandas', 'PostgreSQL', 'SQL', 'Data Cleaning', 'EDA', 'FAERS Data Analysis', 'Signal Mining'],
      github: 'https://github.com/Shubranilpandit/FAERS_Project',
    },
  ];

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative select-none">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="font-mono text-xs text-tron-cyan tracking-[0.25em] mb-2">
            // 03. SELECTED OPERATIONS
          </div>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-[0.18em] uppercase">
            PROJECT PORTFOLIO
          </h2>
          <div className="w-16 h-[2px] bg-tron-cyan mt-3 shadow-[0_0_10px_#00f0ff]" />
        </div>

        {/* 2 Focused Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((proj, idx) => (
            <div
              key={proj.id}
              className="p-7 rounded-lg bg-tron-void/85 border border-tron-border hover:border-tron-cyan/70 transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,240,255,0.18)] flex flex-col justify-between group relative"
            >
              {/* Corner Accents */}
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-tron-cyan/50 group-hover:border-tron-cyan transition-colors" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-tron-cyan/50 group-hover:border-tron-cyan transition-colors" />

              <div>
                {/* Meta Badge */}
                <div className="flex items-center justify-between font-mono text-[11px] text-slate-400 mb-4 pb-3 border-b border-tron-border/60">
                  <span className="text-tron-cyan font-bold">PROJECT 0{idx + 1}</span>
                  <span>{proj.period}</span>
                </div>

                {/* Title */}
                <h3 className="font-display font-black text-lg sm:text-xl text-white group-hover:text-tron-cyan transition-colors mb-3 leading-snug uppercase">
                  {proj.title}
                </h3>

                {/* Summary */}
                <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                  {proj.summary}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {proj.technologies.slice(0, 5).map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="font-mono text-[10px] px-2 py-0.5 rounded bg-tron-dark border border-tron-border text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {proj.technologies.length > 5 && (
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-tron-dark border border-tron-border text-slate-500">
                      +{proj.technologies.length - 5}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-tron-border/60 flex items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedProject(proj)}
                  className="font-mono text-xs font-bold text-tron-cyan hover:text-white flex items-center gap-1.5 transition-colors group/btn"
                >
                  <span>[ VIEW INTEL & CONTRIBUTIONS ]</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>

                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded border border-tron-border text-slate-400 hover:text-tron-cyan hover:border-tron-cyan transition-colors"
                  aria-label={`View ${proj.title} on GitHub`}
                  title="GitHub Repository"
                >
                  <GitBranch className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
