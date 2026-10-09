import React, { useState, useEffect, useRef, useCallback } from 'react';
import { audioSystem } from '../services/audioService';

/**
 * Cinematic TRON Opening Experience (~8-Second Sequence)
 * Inspired by TRON Legacy Intro:
 * 0–2.0s: Deep cinematic darkness, subtle ambient glow, system offline telemetry.
 * 2.0–5.0s: Electric neon tube flickering & voltage instability for 'WELCOME SHUBRANIL'.
 * 5.0–7.6s: Surrounding vector circuits & circular identity disc powering up, subtitle telemetry.
 * 7.6–8.0s: 100% Full illumination flash -> Soundtrack playback initiated in background.
 * ~8.0s: Automatic smooth transition to main portfolio.
 *
 * Resilience features:
 * - Audio playback is strictly NON-BLOCKING (never prevents entrance).
 * - Safety watchdog timer guarantees transition even if rAF is paused or tab is backgrounded.
 * - Empty dependency array on main loop prevents reset/restart loops.
 * - One-click [ SKIP INTRO ] button and keyboard support (Esc/Enter/Space).
 * - Respects prefers-reduced-motion.
 */
export default function CinematicWelcome({ onComplete }) {
  const [animState, setAnimState] = useState({
    phaseTime: 0,
    flickerOpacity: 0,
    glowSize: 0,
    circuitPower: 0,
    statusText: '● SYSTEM OFFLINE // COLD BOOT',
  });
  const [isFadingOut, setIsFadingOut] = useState(false);

  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const hasTransitionedRef = useRef(false);
  const animFrameRef = useRef(null);
  const safetyTimeoutRef = useRef(null);
  const fadeTimeoutRef = useRef(null);

  // Transition to main portfolio
  const triggerTransition = useCallback(() => {
    if (hasTransitionedRef.current) return;
    hasTransitionedRef.current = true;

    // Immediately attempt to play soundtrack upon transition initiation
    audioSystem.play()
      .then((started) => {
        if (started) {
          console.debug('Soundtrack playback active.');
        } else {
          console.debug('Autoplay deferred by browser policy; user interaction listener active.');
        }
      })
      .catch((err) => {
        console.debug('Soundtrack playback deferred:', err);
      });

    setIsFadingOut(true);

    fadeTimeoutRef.current = setTimeout(() => {
      if (onCompleteRef.current) {
        onCompleteRef.current();
      }
    }, 850);
  }, []);

  // Keyboard shortcut listener (Esc / Space / Enter to skip intro)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        triggerTransition();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerTransition]);

  // Reduced motion preference check
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        console.info('Reduced motion preference detected. Transitioning intro immediately.');
        triggerTransition();
      }
    }
  }, [triggerTransition]);

  // Watchdog timer: hard cap at 9.2s ensures transition even if rAF stops
  useEffect(() => {
    safetyTimeoutRef.current = setTimeout(() => {
      if (!hasTransitionedRef.current) {
        console.warn('Welcome screen safety watchdog triggered.');
        triggerTransition();
      }
    }, 9200);

    return () => {
      if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    };
  }, [triggerTransition]);

  // Main 8-second animation loop
  useEffect(() => {
    const startTime = performance.now();

    const updateLoop = (now) => {
      if (hasTransitionedRef.current) return;

      const elapsed = (now - startTime) / 1000;

      // Completion point: transition to portfolio after 8.0s
      if (elapsed >= 8.0) {
        setAnimState({
          phaseTime: 8.0,
          flickerOpacity: 1.0,
          glowSize: 50,
          circuitPower: 1.0,
          statusText: '● GRID POWER: 100%',
        });
        triggerTransition();
        return;
      }

      // Phase 1: 0 - 2.0s (Deep darkness)
      if (elapsed < 2.0) {
        setAnimState({
          phaseTime: elapsed,
          flickerOpacity: 0,
          glowSize: 0,
          circuitPower: 0,
          statusText: '● SYSTEM OFFLINE // COLD BOOT',
        });
      }
      // Phase 2: 2.0 - 5.0s (Electric neon tube flicker & voltage instability)
      else if (elapsed < 5.0) {
        const t = elapsed - 2.0; // 0 to 3.0s
        let opacity = 0;
        let glow = 0;

        if (t < 0.25) {
          opacity = 0;
        } else if (t < 0.35) {
          opacity = 0.45;
          glow = 8;
        } else if (t < 0.5) {
          opacity = 0.05;
          glow = 2;
        } else if (t < 0.65) {
          opacity = 0.6;
          glow = 12;
        } else if (t < 0.8) {
          opacity = 0.2;
          glow = 4;
        } else if (t < 1.1) {
          opacity = 0;
          glow = 0;
        } else if (t < 1.35) {
          opacity = Math.random() > 0.4 ? 0.55 : 0.1;
          glow = 10;
        } else if (t < 1.7) {
          opacity = 0.4 + Math.sin(t * 30) * 0.08;
          glow = 14;
        } else if (t < 1.85) {
          opacity = 0.15;
          glow = 3;
        } else if (t < 2.3) {
          opacity = 0.75 + Math.sin(t * 25) * 0.05;
          glow = 20;
        } else {
          opacity = 0.85;
          glow = 25;
        }

        setAnimState({
          phaseTime: elapsed,
          flickerOpacity: opacity,
          glowSize: glow,
          circuitPower: Math.max(0, (t - 1.5) / 1.5) * 0.4,
          statusText: '● HIGH-VOLTAGE TUBE ARCS FIRING',
        });
      }
      // Phase 3: 5.0 - 7.6s (Powering up circuits & glowing identity disc)
      else if (elapsed < 7.6) {
        const t = elapsed - 5.0; // 0 to 2.6s
        const powerProgress = t / 2.6;
        const hum = Math.sin(elapsed * 20) * 0.03;

        setAnimState({
          phaseTime: elapsed,
          flickerOpacity: Math.min(1.0, 0.85 + powerProgress * 0.15 + hum),
          glowSize: 25 + powerProgress * 20,
          circuitPower: 0.4 + powerProgress * 0.6,
          statusText: '● LIGHT CYCLES SYNCHRONIZING',
        });
      }
      // Phase 4: 7.6 - 8.0s (Full power stabilization)
      else {
        setAnimState({
          phaseTime: elapsed,
          flickerOpacity: 1.0,
          glowSize: 50,
          circuitPower: 1.0,
          statusText: '● GRID POWER: 100%',
        });
      }

      if (!hasTransitionedRef.current) {
        animFrameRef.current = requestAnimationFrame(updateLoop);
      }
    };

    animFrameRef.current = requestAnimationFrame(updateLoop);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [triggerTransition]);

  const { phaseTime, flickerOpacity, glowSize, circuitPower, statusText } = animState;

  return (
    <div
      className={`fixed inset-0 z-70 bg-black flex flex-col items-center justify-center select-none overflow-hidden transition-opacity duration-1000 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      role="dialog"
      aria-label="Welcome Introduction"
    >
      {/* Background Deep Space Radial Fog */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
        style={{
          opacity: circuitPower * 0.35,
          background:
            'radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.15) 0%, rgba(0, 102, 204, 0.05) 45%, transparent 75%)',
        }}
      />

      {/* Skip Button (Top Right) */}
      <button
        onClick={triggerTransition}
        className="absolute top-6 right-6 font-mono text-[11px] tracking-widest text-slate-500 hover:text-tron-cyan px-3 py-1.5 rounded border border-transparent hover:border-tron-cyan/40 transition-colors z-20 cursor-pointer"
        aria-label="Skip Introduction"
      >
        [ SKIP INTRO ]
      </button>

      {/* Central Power Core & Identity Disc Rings */}
      <div className="relative flex items-center justify-center">
        {/* Outer Rotating Tron Circuit Ring */}
        <div
          className="absolute rounded-full border border-dashed border-tron-cyan transition-all duration-700 pointer-events-none"
          style={{
            width: 'clamp(280px, 45vw, 520px)',
            height: 'clamp(280px, 45vw, 520px)',
            opacity: circuitPower * 0.5,
            transform: `rotate(${phaseTime * 25}deg) scale(${0.9 + circuitPower * 0.1})`,
            boxShadow: `0 0 ${glowSize * 0.5}px rgba(0, 240, 255, 0.25)`,
          }}
        />

        {/* Inner Solid Tron Ring */}
        <div
          className="absolute rounded-full border border-tron-cyan/40 transition-all duration-500 pointer-events-none"
          style={{
            width: 'clamp(220px, 35vw, 420px)',
            height: 'clamp(220px, 35vw, 420px)',
            opacity: circuitPower * 0.7,
            boxShadow: `inset 0 0 ${glowSize * 0.4}px rgba(0, 240, 255, 0.2), 0 0 ${glowSize * 0.4}px rgba(0, 240, 255, 0.25)`,
          }}
        />

        {/* Horizontal Laser Line Passing Through Center */}
        <div
          className="absolute left-1/2 -translate-x-1/2 h-[1px] bg-gradient-to-r from-transparent via-tron-cyan to-transparent pointer-events-none transition-all duration-700"
          style={{
            width: `${circuitPower * 100}vw`,
            opacity: circuitPower * 0.65,
            boxShadow: `0 0 ${glowSize * 0.3}px #00f0ff`,
          }}
        />

        {/* Main Neon Typography: WELCOME SHUBRANIL */}
        <div className="relative z-10 text-center px-4">
          <div
            className="font-display font-black tracking-[0.25em] sm:tracking-[0.35em] text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white uppercase transition-all duration-75"
            style={{
              opacity: flickerOpacity,
              textShadow:
                flickerOpacity > 0.1
                  ? `0 0 ${glowSize * 0.3}px #00f0ff, 0 0 ${glowSize * 0.6}px #00f0ff, 0 0 ${glowSize * 1.2}px rgba(0, 240, 255, 0.7)`
                  : 'none',
              filter: flickerOpacity < 0.4 ? 'blur(1px)' : 'none',
            }}
          >
            WELCOME SHUBRANIL
          </div>

          {/* Subtitle Telemetry (Appears during 5-7.6s) */}
          <div
            className="font-mono text-[10px] sm:text-xs md:text-sm tracking-[0.2em] text-tron-cyan/80 mt-4 uppercase transition-opacity duration-700"
            style={{
              opacity: circuitPower > 0.3 ? (circuitPower - 0.3) / 0.7 : 0,
            }}
          >
            // MCA DATA SCIENCE // DIGITAL IDENTITY SYSTEM
          </div>
        </div>
      </div>

      {/* Bottom Status Telemetry */}
      <div className="absolute bottom-12 text-center z-20">
        <div
          className="font-mono text-[10px] sm:text-[11px] tracking-widest text-slate-500 uppercase transition-opacity duration-500"
          style={{ opacity: phaseTime < 1.8 ? 0.35 : circuitPower * 0.8 }}
        >
          {statusText}
        </div>
      </div>
    </div>
  );
}
