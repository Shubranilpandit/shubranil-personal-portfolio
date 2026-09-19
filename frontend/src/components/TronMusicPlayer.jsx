import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Disc, AlertTriangle, ChevronDown, ChevronUp, Sparkles, RefreshCw, Volume1 } from 'lucide-react';
import { sound } from '../services/soundService';

export default function TronMusicPlayer({ isAudioEnabled, onEnableAudio }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem('tron_audio_volume');
    const parsed = saved ? parseFloat(saved) : 0.35;
    return isNaN(parsed) || parsed < 0.1 ? 0.35 : parsed;
  });
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioState, setAudioState] = useState('AUDIO READY'); // 'AUDIO OFF', 'AUDIO READY', 'PLAYING', 'PAUSED', 'MUTED', 'LOADING', 'ERROR'
  const [trackMissing, setTrackMissing] = useState(false);
  const [useProceduralSynth, setUseProceduralSynth] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [frequencies, setFrequencies] = useState(new Array(14).fill(15));
  const [audioLoaded, setAudioLoaded] = useState(false);

  const audioRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Format seconds to mm:ss
  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Visualizer loop: pulses synchronously to actual playback time & beat
  const updateVisualizer = useCallback(() => {
    if (!isPlaying) return;

    // Rhythmic visualizer calculation based on playback progress
    const t = audioRef.current?.currentTime || Date.now() / 1000;
    const baseBeat = Math.sin(t * 7.5); // ~115 BPM rhythm
    const midBeat = Math.cos(t * 3.75);

    setFrequencies((prev) =>
      prev.map((_, i) => {
        const factor = Math.sin(t * 5 + i * 0.45);
        const height = Math.floor(40 + baseBeat * 25 + factor * 25 + midBeat * 15);
        return Math.max(12, Math.min(95, height));
      })
    );

    animationFrameRef.current = requestAnimationFrame(updateVisualizer);
  }, [isPlaying]);

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

  // Attempt to load and verify audio on initial mount
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, []);

  // Audio element event handlers
  const handlePlay = async () => {
    sound.playClick();

    if (useProceduralSynth) {
      sound.startTronTheme(isMuted ? 0 : volume);
      setIsPlaying(true);
      setAudioState('PLAYING');
      localStorage.setItem('tron_audio_enabled', 'true');
      if (onEnableAudio) onEnableAudio();
      return;
    }

    if (audioRef.current) {
      try {
        // Ensure volume is set properly
        audioRef.current.volume = isMuted ? 0 : volume;
        audioRef.current.muted = isMuted;

        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          await playPromise;
        }

        setIsPlaying(true);
        setTrackMissing(false);
        setAudioLoaded(true);
        setAudioState('PLAYING');
        localStorage.setItem('tron_audio_enabled', 'true');
        if (onEnableAudio) onEnableAudio();
        return;
      } catch (err) {
        console.warn("Direct MP3 playback attempt:", err);
        // Try reloading the element once (in case file was recently added)
        try {
          audioRef.current.load();
          audioRef.current.volume = isMuted ? 0 : volume;
          await audioRef.current.play();
          setIsPlaying(true);
          setTrackMissing(false);
          setAudioLoaded(true);
          setAudioState('PLAYING');
          localStorage.setItem('tron_audio_enabled', 'true');
          return;
        } catch (retryErr) {
          console.warn("Retry failed:", retryErr);
          setTrackMissing(true);
          setAudioState('ERROR');
        }
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
      if (audioRef.current.duration && !duration) {
        setDuration(audioRef.current.duration);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setAudioLoaded(true);
      setTrackMissing(false);
      setAudioState('AUDIO READY');
    }
  };

  const handleCanPlay = () => {
    setAudioLoaded(true);
    setTrackMissing(false);
  };

  const handleAudioError = (e) => {
    console.warn("Audio element error:", e);
    // Don't permanently lock out if the user has added the file; allow retry
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
      audioRef.current.muted = nextMuted;
      audioRef.current.volume = nextMuted ? 0 : volume;
    }
    setAudioState(nextMuted ? 'MUTED' : isPlaying ? 'PLAYING' : 'PAUSED');
  };

  const reloadAudioFile = () => {
    sound.playClick();
    setUseProceduralSynth(false);
    setTrackMissing(false);
    if (audioRef.current) {
      audioRef.current.load();
      setTimeout(handlePlay, 200);
    }
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
          ● PLAYING
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
      {/* Native HTML5 audio element with multiple source paths for 100% resolution */}
      <audio
        ref={audioRef}
        preload="auto"
        loop
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onCanPlay={handleCanPlay}
        onError={handleAudioError}
        onEnded={() => setIsPlaying(false)}
      >
        <source src="/audio/end-of-line.mp3" type="audio/mpeg" />
        <source src="./audio/end-of-line.mp3" type="audio/mpeg" />
      </audio>

      {/* Futuristic Floating HUD Card */}
      <div className="bg-tron-panel/95 backdrop-blur-xl border border-tron-cyan/60 rounded clip-chamfer shadow-cyan-glow p-4 relative w-[350px] max-w-full">
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
            <div className="flex justify-between items-baseline">
              <div>
                <div className="text-xs font-bold text-white tracking-wide">
                  End of Line
                </div>
                <div className="text-[10px] text-slate-400">
                  TRON: Legacy / Daft Punk
                </div>
              </div>
              <div className="text-right">
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-tron-cyan/10 border border-tron-cyan/30 text-tron-cyan">
                  {useProceduralSynth ? "SYNTH ENGINE" : "MASTER AUDIO"}
                </span>
              </div>
            </div>

            {/* If audio file error / missing */}
            {trackMissing && !useProceduralSynth && (
              <div className="p-2.5 rounded bg-slate-950/85 border border-tron-amber/50 text-[11px] text-slate-300 space-y-2">
                <div className="text-tron-amber font-semibold flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                    FILE NOT LOADED YET
                  </span>
                  <button
                    onClick={reloadAudioFile}
                    className="p-1 text-tron-cyan hover:underline flex items-center gap-1 text-[10px]"
                    title="Reload file"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>RELOAD</span>
                  </button>
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                  Ensure the file exists at:
                  <code className="block mt-1 p-1 bg-black/60 rounded text-tron-cyan font-mono text-[9px] break-all">
                    /public/audio/end-of-line.mp3
                  </code>
                </p>
                <div className="grid grid-cols-2 gap-1.5 pt-1">
                  <button
                    onClick={reloadAudioFile}
                    className="py-1 px-2 rounded bg-tron-cyan/20 border border-tron-cyan text-tron-cyan hover:bg-tron-cyan hover:text-black text-[10px] font-bold"
                  >
                    RE-DETECT FILE
                  </button>
                  <button
                    onClick={switchToSynthFallback}
                    className="py-1 px-2 rounded bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-[10px]"
                  >
                    PLAY SYNTH OST
                  </button>
                </div>
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
                  className="w-full h-1.5 bg-slate-800 rounded appearance-none cursor-pointer accent-tron-cyan"
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
                  className="px-3.5 py-1.5 rounded bg-tron-cyan/20 border border-tron-cyan text-tron-cyan hover:bg-tron-cyan hover:text-black font-bold text-xs flex items-center gap-1.5 transition-all shadow-cyan-glow-sm"
                  aria-label={isPlaying ? "Pause music" : "Play music"}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
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
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>

              {/* Volume Slider */}
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-slate-500">VOL</span>
                <input
                  type="range"
                  min="0"
                  max="1.0"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  aria-label="Adjust volume level"
                  className="w-16 h-1.5 bg-slate-800 rounded appearance-none cursor-pointer accent-tron-cyan"
                  title={`Volume: ${Math.round(volume * 100)}%`}
                />
                <span className="text-[10px] text-tron-cyan min-w-[28px] text-right">
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
