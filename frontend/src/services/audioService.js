/**
 * Tron Minimal Audio System & Beat Synchronizer
 * Manages playback of "End of Line" (TRON: Legacy / Daft Punk)
 * Provides Web Audio API frequency analysis and 115 BPM rhythm pulse telemetry.
 * Optimizes performance by stopping loops when paused.
 *
 * Resilient features:
 * - Direct HTML5 Audio element event-driven state synchronization.
 * - Idempotent play() with in-flight promise sharing to prevent duplicate instances or AbortError.
 * - Non-blocking audioContext handling (never stalls playback).
 * - Detailed error handling & diagnostics reporting (MediaError codes, autoplay blocks).
 * - Graceful browser autoplay blocking detection with one-time user-gesture fallback.
 * - Preserves volume and mute settings.
 */

class AudioService {
  constructor() {
    this.audio = null;
    this.audioCtx = null;
    this.analyser = null;
    this.source = null;
    this.isPlaying = false;
    this.isBuffering = false;
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
    this.errorMessage = null;

    // Autoplay & Gesture Fallback State
    this.autoplayBlocked = false;
    this.userExplicitlyPaused = false;
    this.activePlayPromise = null;
    this.interactionCleanup = null;
  }

  init() {
    if (this.initialized || typeof window === 'undefined') return;
    this.initialized = true;

    try {
      this.audio = new Audio('/audio/end-of-line.mp3');
      this.audio.preload = 'auto';
      this.audio.loop = true;
      this.audio.volume = this.volume;

      // Real playback state synchronization with HTMLMediaElement events
      this.audio.addEventListener('playing', () => {
        this.isPlaying = true;
        this.isBuffering = false;
        this.errorMessage = null;
        this.autoplayBlocked = false;
        this.startBeatLoop();
        this.notify();
      });

      this.audio.addEventListener('play', () => {
        this.isBuffering = false;
        this.errorMessage = null;
        this.notify();
      });

      this.audio.addEventListener('pause', () => {
        this.isPlaying = false;
        this.stopBeatLoop();
        this.resetCssGlow();
        this.notify();
      });

      this.audio.addEventListener('waiting', () => {
        this.isBuffering = true;
        this.notify();
      });

      this.audio.addEventListener('canplay', () => {
        this.isBuffering = false;
        this.notify();
      });

      this.audio.addEventListener('timeupdate', () => {
        this.currentTime = this.audio ? this.audio.currentTime : 0;
        this.notify();
      });

      this.audio.addEventListener('loadedmetadata', () => {
        this.duration = this.audio ? (this.audio.duration || 0) : 0;
        this.notify();
      });

      this.audio.addEventListener('ended', () => {
        this.pause();
      });

      this.audio.addEventListener('error', (e) => {
        const err = this.audio ? this.audio.error : null;
        let msg = 'Failed to load audio stream.';
        if (err) {
          switch (err.code) {
            case 1: msg = 'Playback was aborted.'; break;
            case 2: msg = 'Network error downloading audio asset.'; break;
            case 3: msg = 'Audio decoding error occurred.'; break;
            case 4: msg = 'Audio format not supported or file not found (/audio/end-of-line.mp3).'; break;
            default: msg = err.message || 'Unknown media error.';
          }
        }
        console.warn('Audio element error:', msg, err, e);
        this.isPlaying = false;
        this.isBuffering = false;
        this.errorMessage = msg;
        this.stopBeatLoop();
        this.notify();
      });
    } catch (err) {
      console.warn("Audio element initialization warning:", err);
      this.errorMessage = "Failed to initialize HTML5 Audio element.";
      this.notify();
    }
  }

  setupWebAudio() {
    if (this.audioCtx || typeof window === 'undefined') return;
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

    if (!this.audio) {
      this.errorMessage = "Audio system unavailable.";
      this.notify();
      return false;
    }

    // If already actively playing, return immediately
    if (this.isPlaying && !this.audio.paused) {
      return true;
    }

    // If a play request is already in-flight, return the existing promise
    if (this.activePlayPromise) {
      return this.activePlayPromise;
    }

    this.activePlayPromise = (async () => {
      try {
        this.errorMessage = null;
        this.setupWebAudio();

        // Non-blocking resume of Web Audio context if available
        if (this.audioCtx && this.audioCtx.state === 'suspended') {
          this.audioCtx.resume().catch(() => {});
        }

        this.audio.volume = this.isMuted ? 0 : this.volume;
        const playPromise = this.audio.play();
        if (playPromise !== undefined) {
          await playPromise;
        }

        this.isPlaying = true;
        this.isBuffering = false;
        this.autoplayBlocked = false;
        this.userExplicitlyPaused = false;
        this.errorMessage = null;
        this.removeInteractionListener();
        this.startBeatLoop();
        this.notify();
        return true;
      } catch (err) {
        console.warn("Audio playback attempt failed:", err);
        this.isPlaying = false;
        this.stopBeatLoop();

        if (err.name === 'NotAllowedError') {
          if (!this.userExplicitlyPaused) {
            this.autoplayBlocked = true;
            this.enableOnNextInteraction();
          }
          this.errorMessage = "Browser policy blocked autoplay. Click to enable soundtrack.";
        } else if (err.name === 'AbortError') {
          console.debug("Play request was superseded by another operation.");
        } else {
          this.errorMessage = err.message || "Audio playback error occurred.";
        }

        this.notify();
        return false;
      } finally {
        this.activePlayPromise = null;
      }
    })();

    return this.activePlayPromise;
  }

  pause() {
    this.userExplicitlyPaused = true;
    this.autoplayBlocked = false;
    this.removeInteractionListener();

    try {
      if (this.audio && !this.audio.paused) {
        this.audio.pause();
      }
    } catch (e) {
      console.warn("Error pausing audio:", e);
    }

    this.isPlaying = false;
    this.stopBeatLoop();
    this.resetCssGlow();
    this.notify();
  }

  toggle() {
    this.init();
    if (this.isPlaying || (this.audio && !this.audio.paused)) {
      this.pause();
      return Promise.resolve(false);
    } else {
      this.userExplicitlyPaused = false;
      return this.play();
    }
  }

  seek(seconds) {
    if (this.audio && !isNaN(seconds)) {
      try {
        this.audio.currentTime = seconds;
        this.currentTime = seconds;
        this.notify();
      } catch (e) {
        console.warn("Audio seek error:", e);
      }
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

  /**
   * Listen for the next user interaction to trigger audio if autoplay was blocked.
   */
  enableOnNextInteraction() {
    if (typeof window === 'undefined' || this.interactionCleanup) return;

    const onUserGesture = () => {
      this.removeInteractionListener();
      if (!this.isPlaying && !this.userExplicitlyPaused) {
        this.play().catch(() => {});
      }
    };

    const options = { once: true, passive: true, capture: true };
    window.addEventListener('click', onUserGesture, options);
    window.addEventListener('keydown', onUserGesture, options);
    window.addEventListener('pointerdown', onUserGesture, options);
    window.addEventListener('touchstart', onUserGesture, options);

    this.interactionCleanup = () => {
      window.removeEventListener('click', onUserGesture, options);
      window.removeEventListener('keydown', onUserGesture, options);
      window.removeEventListener('pointerdown', onUserGesture, options);
      window.removeEventListener('touchstart', onUserGesture, options);
      this.interactionCleanup = null;
    };
  }

  removeInteractionListener() {
    if (this.interactionCleanup) {
      this.interactionCleanup();
    }
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
      isBuffering: this.isBuffering,
      isMuted: this.isMuted,
      volume: this.volume,
      currentTime: this.currentTime,
      duration: this.duration,
      trackTitle: this.trackTitle,
      artist: this.artist,
      autoplayBlocked: this.autoplayBlocked,
      errorMessage: this.errorMessage,
    };
  }
}

export const audioSystem = new AudioService();
