/**
 * Procedural Web Audio Synthesizer & TRON: Legacy Soundtrack Engine
 * Includes authentic Daft Punk-inspired Tron synth arpeggiator & sub-bass drone.
 * Fully procedural, zero audio files required, subtle volume by default.
 */

class SoundService {
  constructor() {
    this.audioCtx = null;
    this.muted = true; // Sound FX muted by default
    this.themePlaying = false;
    this.themeVolume = 0.12; // Very subtle, cinematic background volume
    this.themeTimer = null;
    this.themeGainNode = null;
    this.filterNode = null;
    this.analyser = null;
    this.visualizerCallbacks = new Set();
  }

  init() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
        this.analyser = this.audioCtx.createAnalyser();
        this.analyser.fftSize = 32;
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  // ==========================================
  // Sound FX Utilities
  // ==========================================
  toggleMute() {
    this.muted = !this.muted;
    if (!this.muted) {
      this.init();
      this.playSuccess();
    }
    return this.muted;
  }

  isMuted() {
    return this.muted;
  }

  playClick() {
    if (this.muted) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, this.audioCtx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.05);
    } catch (e) {}
  }

  playHover() {
    if (this.muted) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(550, this.audioCtx.currentTime);
      osc.frequency.setValueAtTime(650, this.audioCtx.currentTime + 0.02);

      gain.gain.setValueAtTime(0.02, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.035);
    } catch (e) {}
  }

  playTransmission() {
    if (this.muted) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.linearRampToValueAtTime(1200, now + 0.35);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.4);
    } catch (e) {}
  }

  playSuccess() {
    if (this.muted) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.04, now + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + (i + 1) * 0.09);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now + i * 0.06);
        osc.stop(now + (i + 1) * 0.1);
      });
    } catch (e) {}
  }

  playBootSequence() {
    if (this.muted) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(80, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.8);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 1.25);
    } catch (e) {}
  }

  // ==========================================
  // TRON: LEGACY MOVIE THEME SYNTHESIZER
  // (Daft Punk Arpeggio & Sub-Bass Drone in D-Minor)
  // ==========================================

  // Frequencies of the iconic TRON Legacy arpeggiation:
  // Chords: Dm -> C -> Bb -> A (or F -> C)
  getTronNotes() {
    // Exact notes: D3, F3, A3, D4, F4, D4, A3, F3 ...
    const D3 = 146.83, F3 = 174.61, A3 = 220.00, D4 = 293.66, F4 = 349.23;
    const C3 = 130.81, E3 = 164.81, G3 = 196.00, C4 = 261.63, E4 = 329.63;
    const Bb2 = 116.54, D3_ = 146.83, F3_ = 174.61, Bb3 = 233.08, D4_ = 293.66;
    const A2 = 110.00, Cs3 = 138.59, E3_ = 164.81, A3_ = 220.00, Cs4 = 277.18;

    return [
      // Bar 1: D minor
      [D3, 73.42], [F3, null], [A3, null], [D4, null], [F4, null], [D4, null], [A3, null], [F3, null],
      [D3, null], [F3, null], [A3, null], [D4, null], [F4, null], [D4, null], [A3, null], [F3, null],

      // Bar 2: C major
      [C3, 65.41], [E3, null], [G3, null], [C4, null], [E4, null], [C4, null], [G3, null], [E3, null],
      [C3, null], [E3, null], [G3, null], [C4, null], [E4, null], [C4, null], [G3, null], [E3, null],

      // Bar 3: Bb major
      [Bb2, 58.27], [D3_, null], [F3_, null], [Bb3, null], [D4_, null], [Bb3, null], [F3_, null], [D3_, null],
      [Bb2, null], [D3_, null], [F3_, null], [Bb3, null], [D4_, null], [Bb3, null], [F3_, null], [D3_, null],

      // Bar 4: A major (leading back to D minor)
      [A2, 55.00], [Cs3, null], [E3_, null], [A3_, null], [Cs4, null], [A3_, null], [E3_, null], [Cs3, null],
      [A2, null], [Cs3, null], [E3_, null], [A3_, null], [Cs4, null], [A3_, null], [E3_, null], [Cs3, null],
    ];
  }

  startTronTheme(customVolume = null) {
    this.init();
    if (!this.audioCtx) return false;

    if (customVolume !== null) {
      this.themeVolume = customVolume;
    }

    if (this.themePlaying) return true;
    this.themePlaying = true;

    // Master Theme Gain Node
    this.themeGainNode = this.audioCtx.createGain();
    this.themeGainNode.gain.setValueAtTime(this.themeVolume, this.audioCtx.currentTime);

    // Resonant Low-Pass Filter with Tron aesthetic sweep
    this.filterNode = this.audioCtx.createBiquadFilter();
    this.filterNode.type = 'lowpass';
    this.filterNode.frequency.setValueAtTime(1200, this.audioCtx.currentTime);
    this.filterNode.Q.setValueAtTime(4.0, this.audioCtx.currentTime);

    this.filterNode.connect(this.themeGainNode);
    if (this.analyser) {
      this.themeGainNode.connect(this.analyser);
      this.analyser.connect(this.audioCtx.destination);
    } else {
      this.themeGainNode.connect(this.audioCtx.destination);
    }

    const notes = this.getTronNotes();
    const noteDuration = 0.13; // ~115 BPM 16th-note feel
    let step = 0;

    const playStep = () => {
      if (!this.themePlaying || !this.audioCtx) return;

      const now = this.audioCtx.currentTime;
      const [leadFreq, bassFreq] = notes[step];

      // 1. Lead Arpeggio Voice (Dual Detuned Sawtooth)
      if (leadFreq) {
        const osc1 = this.audioCtx.createOscillator();
        const osc2 = this.audioCtx.createOscillator();
        const noteGain = this.audioCtx.createGain();

        osc1.type = 'sawtooth';
        osc2.type = 'sawtooth';

        osc1.frequency.setValueAtTime(leadFreq, now);
        osc2.frequency.setValueAtTime(leadFreq * 1.004, now); // subtle detune for analog width

        // Pluck envelope
        noteGain.gain.setValueAtTime(0.35, now);
        noteGain.gain.exponentialRampToValueAtTime(0.02, now + noteDuration * 0.9);

        osc1.connect(noteGain);
        osc2.connect(noteGain);
        noteGain.connect(this.filterNode);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + noteDuration);
        osc2.stop(now + noteDuration);
      }

      // 2. Heavy Cinematic Sub-Bass Drone on downbeats
      if (bassFreq) {
        const bassOsc = this.audioCtx.createOscillator();
        const bassGain = this.audioCtx.createGain();
        bassOsc.type = 'sine';
        bassOsc.frequency.setValueAtTime(bassFreq, now);

        bassGain.gain.setValueAtTime(0.5, now);
        bassGain.gain.exponentialRampToValueAtTime(0.05, now + noteDuration * 15);

        bassOsc.connect(bassGain);
        bassGain.connect(this.themeGainNode);

        bassOsc.start(now);
        bassOsc.stop(now + noteDuration * 16);
      }

      // Filter modulation sweep
      const sweepFreq = 900 + Math.sin(now * 0.4) * 600;
      this.filterNode.frequency.setTargetAtTime(sweepFreq, now, 0.1);

      step = (step + 1) % notes.length;
      this.themeTimer = setTimeout(playStep, noteDuration * 1000);

      // Notify visualizers
      this.notifyVisualizers();
    };

    playStep();
    return true;
  }

  stopTronTheme() {
    this.themePlaying = false;
    if (this.themeTimer) {
      clearTimeout(this.themeTimer);
      this.themeTimer = null;
    }
    if (this.themeGainNode && this.audioCtx) {
      try {
        this.themeGainNode.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.3);
      } catch (e) {}
    }
  }

  toggleTronTheme() {
    if (this.themePlaying) {
      this.stopTronTheme();
      return false;
    } else {
      return this.startTronTheme();
    }
  }

  setThemeVolume(val) {
    this.themeVolume = Math.max(0.01, Math.min(1.0, val));
    if (this.themeGainNode && this.audioCtx) {
      this.themeGainNode.gain.setTargetAtTime(this.themeVolume, this.audioCtx.currentTime, 0.05);
    }
  }

  getThemeVolume() {
    return this.themeVolume;
  }

  isThemePlaying() {
    return this.themePlaying;
  }

  // Subscribe animated visualizer bars to active audio
  registerVisualizer(cb) {
    this.visualizerCallbacks.add(cb);
    return () => this.visualizerCallbacks.delete(cb);
  }

  notifyVisualizers() {
    for (const cb of this.visualizerCallbacks) {
      cb(this.themePlaying);
    }
  }
}

export const sound = new SoundService();
