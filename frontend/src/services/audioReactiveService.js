/**
 * Audio Reactive Lighting & Beat Synchronization Engine
 * Synchronizes visual elements, neon canvas shaders, and ambient room lighting
 * to the rhythm of Daft Punk's "End of Line" (115 BPM) and live audio playback.
 * Automatically ceases all pulses/flickers when playback stops or is muted.
 */

class AudioReactiveService {
  constructor() {
    this.audioElement = null;
    this.isPlaying = false;
    this.volume = 0.35;
    this.beatIntensity = 0;
    this.subscribers = new Set();
    this.rafId = null;
    this.bpm = 115; // Official BPM of Daft Punk - End of Line
  }

  setAudioElement(el) {
    this.audioElement = el;
  }

  setPlaying(playing, volume = null) {
    this.isPlaying = playing;
    if (volume !== null) {
      this.volume = Math.max(0, Math.min(1, volume));
    }

    if (!playing || this.volume <= 0) {
      this.beatIntensity = 0;
      this.stopLoop();
      this.resetCssVariables();
      this.notify({ intensity: 0, isPlaying: false, kick: 0, time: 0 });
    } else {
      this.startLoop();
    }
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
    if (this.volume <= 0) {
      this.beatIntensity = 0;
      this.resetCssVariables();
      this.notify({ intensity: 0, isPlaying: this.isPlaying, kick: 0, time: 0 });
    }
  }

  resetCssVariables() {
    if (typeof document !== 'undefined' && document.documentElement) {
      document.documentElement.style.setProperty('--beat-intensity', '0');
      document.documentElement.style.setProperty('--beat-glow-blur', '0px');
    }
  }

  startLoop() {
    if (this.rafId) return;

    const beatInterval = 60 / this.bpm; // ~0.52174 seconds per beat

    const updateFrame = () => {
      if (!this.isPlaying || this.volume <= 0) {
        this.stopLoop();
        this.resetCssVariables();
        this.notify({ intensity: 0, isPlaying: false, kick: 0, time: 0 });
        return;
      }

      const t = this.audioElement?.currentTime ?? (Date.now() / 1000);

      // 1. Kick drum phase (quarter note beat: beats 1, 2, 3, 4)
      const beatPhase = (t % beatInterval) / beatInterval; // 0 to 1
      // Sharp attack followed by steep exponential decay
      const kick = Math.pow(Math.max(0, 1 - beatPhase * 3.4), 2.8);

      // 2. Synth arpeggio eighth-note offbeat syncopation
      const subPhase = (t % (beatInterval / 2)) / (beatInterval / 2);
      const synthPulse = Math.pow(Math.max(0, 1 - subPhase * 4.2), 2) * 0.35;

      // 3. Measure downbeat accent (beat 1 of 4-beat bar)
      const barPhase = (t % (beatInterval * 4)) / (beatInterval * 4);
      const downbeatAccent = barPhase < 0.25 ? kick * 0.3 : 0;

      // 4. High-voltage electronic neon gas micro-flicker on peak beat strikes
      const microFlicker = kick > 0.18 ? (Math.sin(t * 130) * 0.12 + Math.cos(t * 220) * 0.08) * kick : 0;

      // Synthesize final dynamic beat intensity (0.0 to 1.0)
      const rawIntensity = Math.min(1.0, Math.max(0, kick * 0.7 + synthPulse + downbeatAccent + microFlicker));
      const finalIntensity = rawIntensity * this.volume;
      this.beatIntensity = finalIntensity;

      // Update root CSS variables for hardware-accelerated GPU transitions
      if (typeof document !== 'undefined' && document.documentElement) {
        document.documentElement.style.setProperty('--beat-intensity', finalIntensity.toFixed(3));
        document.documentElement.style.setProperty('--beat-glow-blur', `${(finalIntensity * 28).toFixed(1)}px`);
      }

      this.notify({
        intensity: finalIntensity,
        isPlaying: true,
        kick: kick * this.volume,
        time: t,
      });

      this.rafId = requestAnimationFrame(updateFrame);
    };

    this.rafId = requestAnimationFrame(updateFrame);
  }

  stopLoop() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    // Send immediate current state
    callback({
      intensity: this.beatIntensity,
      isPlaying: this.isPlaying && this.volume > 0,
      kick: 0,
      time: 0,
    });

    return () => {
      this.subscribers.delete(callback);
    };
  }

  notify(data) {
    for (const callback of this.subscribers) {
      callback(data);
    }
  }
}

export const audioReactive = new AudioReactiveService();
