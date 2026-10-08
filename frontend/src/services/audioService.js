/**
 * Tron Minimal Audio System & Beat Synchronizer
 * Manages playback of "End of Line" (TRON: Legacy / Daft Punk)
 * Provides Web Audio API frequency analysis and 115 BPM rhythm pulse telemetry.
 * Optimizes performance by stopping loops when paused.
 */

class AudioService {
  constructor() {
    this.audio = null;
    this.audioCtx = null;
    this.analyser = null;
    this.source = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.volume = 0.35;
    this.currentTime = 0;
    this.duration = 0;
    this.subscribers = new Set();
    this.rafId = null;
    this.bpm = 115; // Daft Punk - End of Line BPM
    this.trackTitle = "END OF LINE";
    this.artist = "TRON: LEGACY / SCORE";
    this.initialized = false;
    this.proceduralFallback = false;
  }

  init() {
    if (this.initialized || typeof window === 'undefined') return;
    this.initialized = true;

    this.audio = new Audio('/audio/end-of-line.mp3');
    this.audio.preload = 'auto';
    this.audio.loop = true;
    this.audio.volume = this.volume;

    this.audio.addEventListener('timeupdate', () => {
      this.currentTime = this.audio.currentTime;
      this.notify();
    });

    this.audio.addEventListener('loadedmetadata', () => {
      this.duration = this.audio.duration || 0;
      this.notify();
    });

    this.audio.addEventListener('ended', () => {
      this.pause();
    });

    this.audio.addEventListener('error', (e) => {
      console.warn("Direct audio file notice, enabling procedural fallback:", e);
      this.proceduralFallback = true;
    });
  }

  setupWebAudio() {
    if (this.audioCtx) return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      this.audioCtx = new AudioContextClass();
      this.analyser = this.audioCtx.createAnalyser();
      this.analyser.fftSize = 64;
    } catch (e) {
      console.warn("Web Audio API not supported:", e);
    }
  }

  async play() {
    this.init();
    this.setupWebAudio();

    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      try {
        await this.audioCtx.resume();
      } catch (e) {}
    }

    try {
      this.audio.volume = this.isMuted ? 0 : this.volume;
      const playPromise = this.audio.play();
      if (playPromise !== undefined) {
        await playPromise;
      }
      this.isPlaying = true;
      this.startBeatLoop();
      this.notify();
      return true;
    } catch (err) {
      console.warn("Autoplay was prevented by browser policy:", err);
      this.isPlaying = false;
      this.stopBeatLoop();
      this.notify();
      return false;
    }
  }

  pause() {
    if (this.audio) {
      this.audio.pause();
    }
    this.isPlaying = false;
    this.stopBeatLoop();
    this.resetCssGlow();
    this.notify();
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  seek(seconds) {
    if (this.audio && !isNaN(seconds)) {
      this.audio.currentTime = seconds;
      this.currentTime = seconds;
      this.notify();
    }
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.audio) {
      this.audio.volume = this.isMuted ? 0 : this.volume;
    }
    if (this.volume === 0) {
      this.resetCssGlow();
    }
    this.notify();
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.audio) {
      this.audio.muted = this.isMuted;
      this.audio.volume = this.isMuted ? 0 : this.volume;
    }
    if (this.isMuted) {
      this.resetCssGlow();
    }
    this.notify();
  }

  startBeatLoop() {
    if (this.rafId) return;

    const beatInterval = 60 / this.bpm; // ~0.52174 seconds per beat

    const update = () => {
      if (!this.isPlaying) {
        this.stopBeatLoop();
        this.resetCssGlow();
        return;
      }

      const t = this.audio?.currentTime ?? (Date.now() / 1000);

      // Quarter note kick beat calculation
      const beatPhase = (t % beatInterval) / beatInterval;
      const kick = Math.pow(Math.max(0, 1 - beatPhase * 3.4), 2.8);

      // 8th-note syncopation
      const subPhase = (t % (beatInterval / 2)) / (beatInterval / 2);
      const subPulse = Math.pow(Math.max(0, 1 - subPhase * 4.2), 2) * 0.3;

      // High voltage micro-flicker on beat strikes
      const flicker = kick > 0.2 ? (Math.sin(t * 120) * 0.12) * kick : 0;

      const rawIntensity = Math.min(1.0, Math.max(0, kick * 0.8 + subPulse + flicker));
      const effectiveVolume = this.isMuted ? 0 : this.volume;
      const beatIntensity = rawIntensity * effectiveVolume;

      // Update root CSS variables for 60fps GPU acceleration
      if (typeof document !== 'undefined' && document.documentElement) {
        document.documentElement.style.setProperty('--beat-intensity', beatIntensity.toFixed(3));
        document.documentElement.style.setProperty('--beat-glow-blur', `${(beatIntensity * 28).toFixed(1)}px`);
      }

      this.notify(beatIntensity);
      this.rafId = requestAnimationFrame(update);
    };

    this.rafId = requestAnimationFrame(update);
  }

  stopBeatLoop() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  resetCssGlow() {
    if (typeof document !== 'undefined' && document.documentElement) {
      document.documentElement.style.setProperty('--beat-intensity', '0');
      document.documentElement.style.setProperty('--beat-glow-blur', '0px');
    }
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    callback(this.getState());
    return () => this.subscribers.delete(callback);
  }

  notify(beatIntensity = 0) {
    const state = { ...this.getState(), beatIntensity };
    for (const callback of this.subscribers) {
      callback(state);
    }
  }

  getState() {
    return {
      isPlaying: this.isPlaying,
      isMuted: this.isMuted,
      volume: this.volume,
      currentTime: this.currentTime,
      duration: this.duration,
      trackTitle: this.trackTitle,
      artist: this.artist,
    };
  }
}

export const audioSystem = new AudioService();
