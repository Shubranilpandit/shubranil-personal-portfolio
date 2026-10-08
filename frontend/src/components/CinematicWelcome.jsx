import React, { useState, useEffect, useRef } from 'react';
import { audioSystem } from '../services/audioService';

/**
 * Cinematic TRON Opening Experience (8-Second Sequence)
 * Inspired by TRON Legacy Intro:
 * 0–2s: Deep cinematic darkness
 * 2–5s: Electric gas tube flickering sequence for 'WELCOME SHUBRANIL'
 * 5–7s: Surrounding glowing vector circuits & circular identity disc powering up
 * ~8s: 100% Full illumination flash -> Soundtrack starts -> Smooth transition to main portfolio
 * Fallback: If browser blocks autoplay, presents sleek '[ INITIALIZE SYSTEM ]' button.
 */
export default function CinematicWelcome({ onComplete }) {
  const [phaseTime, setPhaseTime] = useState(0); // 0 to 8.5s
  const [flickerOpacity, setFlickerOpacity] = useState(0);
  const [glowSize, setGlowSize] = useState(0);
  const [circuitPower, setCircuitPower] = useState(0); // 0 to 1
  const [isFullyOn, setIsFullyOn] = useState(false);
  const [requireClickToEnter, setRequireClickToEnter] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const startTimeRef = useRef(null);
  const animFrameRef = useRef(null);

  useEffect(() => {
    startTimeRef.current = performance.now();

    const updateLoop = (now) => {
      const elapsed = (now - startTimeRef.current) / 1000;
      setPhaseTime(elapsed);

      // Phase 1: 0 - 2.0s (Deep darkness)
      if (elapsed < 2.0) {
        setFlickerOpacity(0);
        setGlowSize(0);
        setCircuitPower(0);
      }
      // Phase 2: 2.0 - 5.0s (Electric neon tube flicker & voltage instability)
      else if (elapsed < 5.0) {
        const t = elapsed - 2.0; // 0 to 3s
        let opacity = 0;
        let glow = 0;

        if (t < 0.25) {
          // Dark
          opacity = 0;
        } else if (t < 0.35) {
          // Quick first arc flash
          opacity = 0.45;
          glow = 8;
        } else if (t < 0.5) {
          // Drops out (darkness)
          opacity = 0.05;
          glow = 2;
        } else if (t < 0.65) {
          // Sharp double flicker
          opacity = 0.6;
          glow = 12;
        } else if (t < 0.8) {
          // Drops to 20%
          opacity = 0.2;
          glow = 4;
        } else if (t < 1.1) {
          // Dies out completely for 300ms
          opacity = 0;
          glow = 0;
        } else if (t < 1.35) {
          // Micro sputter jitter
          opacity = Math.random() > 0.4 ? 0.55 : 0.1;
          glow = 10;
        } else if (t < 1.7) {
          // Voltage stabilizing around 40% with micro hum
          opacity = 0.4 + Math.sin(t * 30) * 0.08;
          glow = 14;
        } else if (t < 1.85) {
          // Sudden voltage flicker drop
          opacity = 0.15;
          glow = 3;
        } else if (t < 2.3) {
          // Voltage surge up to 75%
          opacity = 0.75 + Math.sin(t * 25) * 0.05;
          glow = 20;
        } else {
          // Gradually stabilizes toward full power
          opacity = 0.85;
          glow = 25;
        }

        setFlickerOpacity(opacity);
        setGlowSize(glow);
        setCircuitPower(Math.max(0, (t - 1.5) / 1.5) * 0.4);
      }
      // Phase 3: 5.0 - 7.5s (Powering up circuits & glowing identity disc)
      else if (elapsed < 7.6) {
        const t = elapsed - 5.0; // 0 to 2.5s
        const powerProgress = t / 2.5;

        // Subtle electric hum modulation
        const hum = Math.sin(elapsed * 20) * 0.03;
        setFlickerOpacity(0.85 + powerProgress * 0.15 + hum);
        setGlowSize(25 + powerProgress * 20);
        setCircuitPower(0.4 + powerProgress * 0.6);
      }
      // Phase 4: Around 8.0s (100% Max Illumination + Soundtrack Start)
      else if (!isFullyOn) {
        setIsFullyOn(true);
        setFlickerOpacity(1.0);
        setGlowSize(50);
        setCircuitPower(1.0);

        // Attempt automated soundtrack playback at exact moment of full power
        audioSystem.play().then((success) => {
          if (success) {
            // Autoplay succeeded! Transition smoothly to portfolio
            triggerSmoothTransition();
          } else {
            // Browser blocked autoplay: show minimal prompt
            setRequireClickToEnter(true);
          }
        });
      }

      if (elapsed < 8.2 || !isFullyOn) {
        animFrameRef.current = requestAnimationFrame(updateLoop);
      }
    };

    animFrameRef.current = requestAnimationFrame(updateLoop);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isFullyOn]);

  const triggerSmoothTransition = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 900);
  };

  const handleManualEnter = async () => {
    await audioSystem.play();
    triggerSmoothTransition();
  };

  const handleSkip = () => {
    audioSystem.play();
    triggerSmoothTransition();
  };

  return (
    <div
      className={`fixed inset-0 z-70 bg-black flex flex-col items-center justify-center select-none overflow-hidden transition-opacity duration-1000 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
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
        onClick={handleSkip}
        className="absolute top-6 right-6 font-mono text-[11px] tracking-widest text-slate-500 hover:text-tron-cyan px-3 py-1.5 rounded border border-transparent hover:border-tron-cyan/40 transition-colors z-20"
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

          {/* Subtitle Telemetry (Appears during 5-7s) */}
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

      {/* Bottom Status / Cinematic Action Prompt */}
      <div className="absolute bottom-12 text-center z-20">
        {requireClickToEnter ? (
          <div className="animate-fade-in flex flex-col items-center gap-3">
            <button
              onClick={handleManualEnter}
              className="px-6 py-3 rounded bg-tron-cyan/15 border border-tron-cyan text-tron-cyan hover:bg-tron-cyan hover:text-black font-display font-bold text-xs sm:text-sm tracking-[0.25em] uppercase transition-all shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.8)]"
            >
              [ INITIALIZE SYSTEM ]
            </button>
            <span className="font-mono text-[10px] tracking-widest text-slate-500">
              CLICK TO ESTABLISH AUDIO LINK & ENTER
            </span>
          </div>
        ) : (
          <div
            className="font-mono text-[10px] sm:text-[11px] tracking-widest text-slate-500 uppercase transition-opacity duration-500"
            style={{ opacity: phaseTime < 1.8 ? 0.35 : circuitPower * 0.8 }}
          >
            {phaseTime < 2.0 && "● SYSTEM OFFLINE // COLD BOOT"}
            {phaseTime >= 2.0 && phaseTime < 5.0 && "● HIGH-VOLTAGE TUBE ARCS FIRING"}
            {phaseTime >= 5.0 && phaseTime < 7.6 && "● LIGHT CYCLES SYNCHRONIZING"}
            {phaseTime >= 7.6 && "● GRID POWER: 100%"}
          </div>
        )}
      </div>
    </div>
  );
}
