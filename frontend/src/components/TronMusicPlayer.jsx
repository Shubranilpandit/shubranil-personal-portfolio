import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Disc, AlertTriangle, ChevronDown, ChevronUp, Music, Sparkles } from 'lucide-react';
import { sound } from '../services/soundService';

export default function TronMusicPlayer({ isAudioEnabled, onEnableAudio }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem('tron_audio_volume');
    return saved ? parseFloat(saved) : 0.12; // 12% subtle volume default
  });
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioState, setAudioState] = useState('AUDIO READY'); // 'AUDIO OFF', 'AUDIO READY', 'PLAYING', 'PAUSED', 'MUTED', 'LOADING', 'ERROR'
  const [trackMissing, setTrackMissing] = useState(false);
  const [useProceduralSynth, setUseProceduralSynth] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [frequencies, setFrequencies] = useState(new Array(14).fill(15));

  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceNodeRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Format seconds to mm:ss
  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Initialize Web Audio API Analyser connected to the <audio> element
  const initWebAudio = useCallback(() => {
    if (audioContextRef.current || !audioRef.current) return;
    try {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtxClass) return;

      const ctx = new AudioCtxClass();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;

      const source = ctx.createMediaElementSource(audioRef.current);
      source.connect(analyser);
      analyser.connect(ctx.destination);

      audioContextRef.current = ctx;
      analyserRef.current = analyser;
      sourceNodeRef.current = source;
    } catch (e) {
      // AudioContext already connected or cross-origin restricted
    }
  }, []);

  // Visualizer loop: only runs while playing to maximize performance
  const updateVisualizer = useCallback(() => {
    if (!isPlaying) return;

    if (useProceduralSynth) {
      // Procedural synthetic levels
      setFrequencies((prev) =>
        prev.map(() => Math.floor(Math.random() * 70) + 20)
      );
      animationFrameRef.current = requestAnimationFrame(updateVisualizer);
      return;
    }

    if (analyserRef.current) {
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyserRef.current.getByteFrequencyData(dataArray);

      // Extract 14 frequency samples
      const step = Math.max(1, Math.floor(bufferLength / 14));
      const samples = [];
      for (let i = 0; i < 14; i++) {
        const val = dataArray[i * step] || 0;
        // Map 0-255 to percentage 10%-100%
        samples.push(Math.max(10, Math.round((val / 255) * 100)));
      }
      setFrequencies(samples);
    } else {
      // Gentle rhythmic fallback
      setFrequencies((prev) =>
        prev.map(() => Math.floor(Math.random() * 60) + 25)
      );
    }

    animationFrameRef.current = requestAnimationFrame(updateVisualizer);
  }, [isPlaying, useProceduralSynth]);

  useEffect(() => {
    if (isPlaying) {
      animationFrameRef.current = requestAnimationFrame(updateVisualizer);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      setFrequencies(new Array(14).fill(12));
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, updateVisualizer]);

  // Handle external audio enable (from boot screen or navbar)
  useEffect(() => {
    if (isAudioEnabled && !isPlaying) {
      handlePlay();
    }
  }, [isAudioEnabled]);

  // Audio element event handlers
  const handlePlay = async () => {
    sound.playClick();
    if (trackMissing || useProceduralSynth) {
      // Fallback to built-in procedural Daft Punk synth
      setUseProceduralSynth(true);
      sound.startTronTheme(isMuted ? 0 : volume);
      setIsPlaying(true);
      setAudioState('PLAYING');
      localStorage.setItem('tron_audio_enabled', 'true');
      if (onEnableAudio) onEnableAudio();
      return;
    }

    initWebAudio();
    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }

    if (audioRef.current) {
      try {
        audioRef.current.volume = isMuted ? 0 : volume;
        await audioRef.current.play();
        setIsPlaying(true);
        setAudioState('PLAYING');
        localStorage.setItem('tron_audio_enabled', 'true');
        if (onEnableAudio) onEnableAudio();
      } catch (err) {
        console.warn("Local audio playback notice:", err.message);
        // If file not found, mark track missing
        setTrackMissing(true);
        setAudioState('ERROR');
      }
    }
  };

  const handlePause = () => {
    sound.playClick();
    if (useProceduralSynth) {
      sound.stopTronTheme();
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
    setAudioState('PAUSED');
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setAudioState('AUDIO READY');
    }
  };

  const handleAudioError = () => {
    setTrackMissing(true);
    setAudioState('ERROR');
  };

  const handleSeek = (e) => {
    const seekTo = parseFloat(e.target.value);
    setCurrentTime(seekTo);
    if (audioRef.current && !useProceduralSynth) {
      audioRef.current.currentTime = seekTo;
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    localStorage.setItem('tron_audio_volume', val.toString());
    if (useProceduralSynth) {
      sound.setThemeVolume(isMuted ? 0 : val);
    } else if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : val;
    }
  };

  const toggleMute = () => {
    sound.playClick();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (useProceduralSynth) {
      sound.setThemeVolume(nextMuted ? 0 : volume);
    } else if (audioRef.current) {
      audioRef.current.volume = nextMuted ? 0 : volume;
    }
    setAudioState(nextMuted ? 'MUTED' : isPlaying ? 'PLAYING' : 'PAUSED');
  };

  const switchToSynthFallback = () => {
    sound.playClick();
    setUseProceduralSynth(true);
    setTrackMissing(false);
    handlePlay();
  };

  // State badge styling
  const getStatusBadge = () => {
    if (trackMissing) {
      return (
        <span className="text-tron-amber flex items-center gap-1 font-mono text-[10px]">
          <AlertTriangle className="w-3 h-3" />
          ● AUDIO OFFLINE
        </span>
      );
    }
    if (isPlaying) {
      return (
        <span className="text-tron-cyan flex items-center gap-1 font-mono text-[10px] animate-pulse">
          <span className="w-2 h-2 rounded-full bg-tron-cyan shadow-cyan-glow-sm" />
          ● PLAYING (SUBTLE)
        </span>
      );
    }
    if (isMuted) {
      return <span className="text-slate-400 font-mono text-[10px]">● MUTED</span>;
    }
    return <span className="text-slate-400 font-mono text-[10px]">● {audioState}</span>;
  };

  return (
    <div
      className="fixed bottom-4 right-4 z-40 max-w-[calc(100vw-2rem)] transition-all duration-300 select-none"
      role="region"
      aria-label="TRON Music Player Controller"
    >
      {/* Hidden native HTML5 audio element referencing local file */}
      <audio
        ref={audioRef}
        src="/audio/end-of-line.mp3"
        preload="metadata"
        loop
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onError={handleAudioError}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Futuristic Floating HUD Card */}
      <div className="bg-tron-panel/95 backdrop-blur-xl border border-tron-cyan/60 rounded clip-chamfer shadow-cyan-glow p-4 relative w-[340px] max-w-full">
        <div className="hud-corner hud-corner-tl" />
        <div className="hud-corner hud-corner-tr" />
        <div className="hud-corner hud-corner-bl" />
        <div className="hud-corner hud-corner-br" />

        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-tron-border/80 pb-2 mb-2.5">
          <div className="flex items-center gap-2">
            <Disc className={`w-4 h-4 text-tron-cyan ${isPlaying ? 'animate-spin-slow' : ''}`} />
            <span className="font-mono text-xs font-bold text-white tracking-wider">
              AUDIO MODULE
            </span>
          </div>

          <div className="flex items-center gap-2">
            {getStatusBadge()}
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 rounded text-slate-400 hover:text-tron-cyan transition-colors"
              aria-label={isMinimized ? "Expand Music Player" : "Minimize Music Player"}
            >
              {isMinimized ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Collapsed Mini Summary */}
        {isMinimized ? (
          <div className="flex items-center justify-between gap-3 pt-1">
            <div className="truncate font-mono text-xs">
              <span className="text-tron-cyan font-semibold">End of Line</span>
              <span className="text-slate-500 text-[10px] ml-1.5">// TRON: Legacy</span>
            </div>
            <button
              onClick={togglePlayPause}
              className="p-1.5 rounded bg-tron-cyan/15 border border-tron-cyan/40 text-tron-cyan hover:bg-tron-cyan hover:text-black transition-all"
              aria-label={isPlaying ? "Pause Audio" : "Play Audio"}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
          </div>
        ) : (
          /* Expanded Controls */
          <div className="space-y-3 font-mono">
            {/* Track Info */}
            <div>
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-bold text-white tracking-wide">
                  End of Line
                </span>
                <span className="text-[10px] text-tron-cyan">
                  {useProceduralSynth ? "CYBER SYNTH MODE" : "ORIGINAL SCORE"}
                </span>
              </div>
              <div className="text-[10px] text-slate-400">
                TRON: Legacy / Daft Punk
              </div>
            </div>

            {/* If audio file missing: Helpful Instructions with Fallback CTA */}
            {trackMissing && (
              <div className="p-2.5 rounded bg-slate-950/80 border border-tron-amber/50 text-[11px] text-slate-300 space-y-2">
                <div className="text-tron-amber font-semibold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>LOCAL AUDIO FILE NOT DETECTED</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                  To play the original master score, place your legally obtained track at:
                  <code className="block mt-1 p-1 bg-black/60 rounded text-tron-cyan font-mono text-[9px] break-all">
                    /public/audio/end-of-line.mp3
                  </code>
                </p>
                <button
                  onClick={switchToSynthFallback}
                  className="w-full py-1.5 rounded bg-tron-cyan/15 border border-tron-cyan text-tron-cyan hover:bg-tron-cyan hover:text-black font-mono text-[10px] font-bold flex items-center justify-center gap-1 transition-all"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>USE PROCEDURAL SYNTH ENGINE</span>
                </button>
              </div>
            )}

            {/* Visualizer Equalizer Neon Wavebars */}
            <div className="bg-slate-950/70 border border-tron-border/70 rounded p-2 flex items-end justify-between gap-1 h-10 overflow-hidden">
              {frequencies.map((heightPct, idx) => (
                <div
                  key={idx}
                  className={`w-full rounded-t transition-all duration-100 ${
                    isPlaying
                      ? 'bg-gradient-to-t from-tron-blue to-tron-cyan shadow-cyan-glow-sm'
                      : 'bg-slate-800'
                  }`}
                  style={{ height: `${heightPct}%` }}
                />
              ))}
            </div>

            {/* Timeline Progress Bar & Timestamps */}
            {!useProceduralSynth && (
              <div className="space-y-1">
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  aria-label="Seek track progress"
                  className="w-full h-1 bg-slate-800 rounded appearance-none cursor-pointer accent-tron-cyan"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            )}

            {/* Controls Row: Play/Pause, Volume, Mute */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlayPause}
                  className="px-3 py-1.5 rounded bg-tron-cyan/20 border border-tron-cyan text-tron-cyan hover:bg-tron-cyan hover:text-black font-bold text-xs flex items-center gap-1.5 transition-all shadow-cyan-glow-sm"
                  aria-label={isPlaying ? "Pause music" : "Play music"}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
                </button>

                <button
                  onClick={toggleMute}
                  className={`p-1.5 rounded border transition-colors ${
                    isMuted
                      ? 'bg-slate-900 border-slate-700 text-slate-500'
                      : 'bg-tron-panel border-tron-border text-tron-cyan hover:border-tron-cyan'
                  }`}
                  aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Volume Slider */}
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-slate-500">VOL</span>
                <input
                  type="range"
                  min="0"
                  max="0.35"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  aria-label="Adjust subtle volume level"
                  className="w-16 h-1 bg-slate-800 rounded appearance-none cursor-pointer accent-tron-cyan"
                  title={`Subtle Volume: ${Math.round(volume * 100)}%`}
                />
                <span className="text-[10px] text-tron-cyan min-w-[24px]">
                  {Math.round((isMuted ? 0 : volume) * 100)}%
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
