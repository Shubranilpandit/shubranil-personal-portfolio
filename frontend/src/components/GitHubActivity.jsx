import React from 'react';
import { Star, GitFork, ExternalLink, Code } from 'lucide-react';
import { GithubIcon } from './CyberIcons';
import { sound } from '../services/soundService';

export default function GitHubActivity({ githubData }) {
  const repos = githubData?.repositories || [];
  const username = githubData?.username || "shubranil-pandit";

  return (
    <section id="github" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-tron-cyan/10 border border-tron-cyan/30 text-tron-cyan text-xs font-mono mb-2">
            <span>// REPOSITORY TELEMETRY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white uppercase tracking-wider">
            GITHUB <span className="text-glow-cyan text-tron-cyan">RADAR</span>
          </h2>
          <p className="font-mono text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mt-2">
            Public repositories and open-source contributions synchronized via backend proxy
          </p>
        </div>

        {/* Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {repos.map((repo) => (
            <div
              key={repo.id || repo.name}
              onMouseEnter={() => sound.playHover()}
              className="tron-panel p-5 relative group hover:border-tron-cyan/70 transition-all flex flex-col justify-between"
            >
              <div className="hud-corner hud-corner-tl" />
              <div className="hud-corner hud-corner-tr" />
              <div className="hud-corner hud-corner-bl" />
              <div className="hud-corner hud-corner-br" />

              <div>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <GithubIcon className="w-4 h-4 text-tron-cyan" />
                    <span className="font-mono text-xs text-slate-400">repo</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-400">
                    {repo.language || 'Python'}
                  </span>
                </div>

                <h3 className="font-mono text-sm sm:text-base font-bold text-white group-hover:text-tron-cyan transition-colors truncate">
                  {repo.name}
                </h3>
                <p className="text-xs text-slate-300 font-sans mt-2 line-clamp-2 leading-relaxed">
                  {repo.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-tron-border/60 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-3 text-slate-400">
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-tron-amber" />
                    {repo.stargazers_count || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-3.5 h-3.5 text-tron-blue" />
                    {repo.forks_count || 0}
                  </span>
                </div>

                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="text-tron-cyan hover:underline flex items-center gap-1"
                >
                  <span>EXPLORE</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View Profile on GitHub CTA */}
        <div className="mt-10 text-center">
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="cyber-btn inline-flex items-center gap-2"
          >
            <GithubIcon className="w-4 h-4" />
            <span>ACCESS COMPLETE GITHUB PROFILE</span>
          </a>
        </div>

      </div>
    </section>
  );
}
