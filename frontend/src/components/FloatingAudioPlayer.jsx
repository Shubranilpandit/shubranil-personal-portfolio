import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, X, Disc, Music } from 'lucide-react';
import { audioSystem } from '../services/audioService';

/**
 * Minimal Floating Circular Audio Player & Collapsible Controller
 * Layer 4: z-30 (Strictly BELOW Mobile Menu Overlay z-50).
 * Default state: Tiny circular button with glowing neon disc.
 * Expanded state: Compact HUD card with Play/Pause, timeline seek, volume, and minimal equalizer.
 * Performance: Equalizer sleeps when paused.
 */
export default function FloatingAudioPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [audioState, setAudioState] = useState(audioSystem.getState());
  const [beatIntensity, setBeatIntensity] = useState(0);
  const playerRef = useRef(null);

  useEffect(() => {
    const unsub = audioSystem.subscribe((state) => {
      setAudioState(state);
      setBeatIntensity(state.beatIntensity || 0);
    });
    return () => unsub();
  }, []);

  // Collapse on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && playerRef.current && !playerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSeek = (e) => {
    audioSystem.seek(parseFloat(e.target.value));
  };

  const handleVolume = (e) => {
    audioSystem.setVolume(parseFloat(e.target.value));
  };

  // Generate 8 equalizer bar heights
  const bars = [15, 30, 60, 85, 95, 70, 45, 20];

  return (
    <div
      ref={playerRef}
      className="fixed bottom-6 right-6 z-30 select-none flex flex-col-reverse sm:flex-row items-end sm:items-center gap-2 sm:gap-3"
      role="region"
      aria-label="TRON Audio Player"
    >
      {/* Subtle, non-blocking prompt when browser autoplay was prevented */}
      {audioState.autoplayBlocked && !audioState.isPlaying && !isOpen && (
        <button
          onClick={() => audioSystem.play()}
          className="group animate-fade-in flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-tron-void/90 backdrop-blur-md border border-tron-cyan/70 text-tron-cyan hover:border-tron-cyan hover:bg-tron-cyan/15 hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] cursor-pointer"
          role="status"
          aria-label="Click to enable soundtrack"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-tron-cyan animate-ping shrink-0" />
          <Volume2 className="w-3.5 h-3.5 text-tron-cyan shrink-0" />
          <span className="font-mono text-[11px] tracking-wider uppercase font-semibold text-slate-200 group-hover:text-white transition-colors">
            Click to enable soundtrack
          </span>
        </button>
      )}

      {/* 1. Default State: Small Circular Floating Control (w-12 h-12) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative w-12 h-12 rounded-full bg-tron-void/90 backdrop-blur-md border border-tron-cyan/60 flex items-center justify-center text-tron-cyan transition-all duration-300 hover:border-tron-cyan hover:scale-105"
          style={{
            boxShadow: audioState.isPlaying
              ? `0 0 ${12 + beatIntensity * 20}px rgba(0, 240, 255, ${0.4 + beatIntensity * 0.4})`
              : '0 0 10px rgba(0, 240, 255, 0.25)',
          }}
          aria-label={audioState.isPlaying ? "Expand Audio Player (Music Playing)" : "Expand Audio Player (Music Paused)"}
          title="TRON Soundtrack [Click to Expand]"
        >
          {/* Subtle Outer Neon Pulse Ring */}
          <span
            className={`absolute inset-[-3px] rounded-full border border-dashed border-tron-cyan/40 pointer-events-none transition-opacity ${
              audioState.isPlaying ? 'animate-spin-slow opacity-100' : 'opacity-0'
            }`}
          />

          {audioState.isPlaying ? (
            <Disc className="w-5 h-5 animate-spin-slow text-tron-cyan" />
          ) : (
            <Play className="w-5 h-5 translate-x-0.5 text-tron-cyan/80 group-hover:text-tron-cyan" />
          )}
        </button>
      )}

      {/* 2. Expanded State: Compact Tron HUD Controller (w-72) */}
      {isOpen && (
        <div className="w-72 bg-tron-void/95 backdrop-blur-xl border border-tron-cyan/60 rounded-lg p-4 shadow-[0_0_30px_rgba(0,0,0,0.9),0_0_20px_rgba(0,240,255,0.25)] animate-fade-in relative">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-tron-border pb-2.5 mb-3">
            <div className="flex items-center gap-2 truncate">
              <span className={`w-2 h-2 rounded-full ${audioState.isPlaying ? 'bg-tron-cyan animate-pulse' : 'bg-slate-600'}`} />
              <div className="truncate">
                <div className="font-display font-bold text-xs text-white tracking-wider truncate">
                  {audioState.trackTitle}
                </div>
                <div className="font-mono text-[9px] text-tron-cyan/70 tracking-widest truncate">
                  {audioState.artist}
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded text-slate-400 hover:text-tron-cyan transition-colors"
              aria-label="Collapse Audio Player"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Minimal 8-Bar Wave Visualizer (Stops when paused) */}
          <div className="h-6 flex items-end justify-between gap-1 mb-3 px-1">
            {bars.map((baseH, idx) => {
              const activeH = audioState.isPlaying
                ? Math.min(100, Math.max(15, baseH * (0.6 + beatIntensity * 0.8) + Math.sin(audioState.currentTime * 6 + idx) * 20))
                : 12;
              return (
                <div
                  key={idx}
                  className={`w-full rounded-t transition-all duration-100 ${
                    audioState.isPlaying
                      ? 'bg-gradient-to-t from-tron-blue to-tron-cyan shadow-[0_0_6px_rgba(0,240,255,0.5)]'
                      : 'bg-slate-800'
                  }`}
                  style={{ height: `${activeH}%` }}
                />
              );
            })}
          </div>

          {/* Timeline Seekbar */}
          <div className="space-y-1 mb-3">
            <input
              type="range"
              min="0"
              max={audioState.duration || 100}
              value={audioState.currentTime}
              onChange={handleSeek}
              aria-label="Seek soundtrack position"
              className="w-full h-1 bg-slate-800 rounded appearance-none cursor-pointer accent-tron-cyan"
            />
            <div className="flex justify-between font-mono text-[9px] text-slate-400">
              <span>{formatTime(audioState.currentTime)}</span>
              <span>{formatTime(audioState.duration)}</span>
            </div>
          </div>

          {/* Controls Row */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <button
                onClick={() => audioSystem.toggle()}
                className="px-3 py-1.5 rounded bg-tron-cyan/20 border border-tron-cyan text-tron-cyan hover:bg-tron-cyan hover:text-black font-mono text-xs font-bold flex items-center gap-1.5 transition-all shadow-[0_0_10px_rgba(0,240,255,0.3)]"
                aria-label={audioState.isPlaying ? "Pause soundtrack" : "Play soundtrack"}
              >
                {audioState.isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{audioState.isPlaying ? 'PAUSE' : 'PLAY'}</span>
              </button>

              <button
                onClick={() => audioSystem.toggleMute()}
                className={`p-1.5 rounded border transition-colors ${
                  audioState.isMuted
                    ? 'bg-slate-900 border-slate-700 text-slate-500'
                    : 'bg-tron-dark border-tron-border text-tron-cyan hover:border-tron-cyan'
                }`}
                aria-label={audioState.isMuted ? "Unmute audio" : "Mute audio"}
              >
                {audioState.isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Volume Slider */}
            <div className="flex items-center gap-1.5">
              <input
                type="range"
                min="0"
                max="1.0"
                step="0.05"
                value={audioState.isMuted ? 0 : audioState.volume}
                onChange={handleVolume}
                aria-label="Adjust volume"
                className="w-14 h-1 bg-slate-800 rounded appearance-none cursor-pointer accent-tron-cyan"
              />
              <span className="font-mono text-[9px] text-slate-400 w-6 text-right">
                {Math.round((audioState.isMuted ? 0 : audioState.volume) * 100)}%
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
