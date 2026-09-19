import React, { useEffect, useRef } from 'react';
import { audioReactive } from '../services/audioReactiveService';

/**
 * Audio-Reactive Ambient Lighting Layer
 * Casts subtle, cinematic neon pulses and edge vignettes synced to the music beats.
 * When audio stops or is paused, all lighting effects immediately shut off (opacity 0).
 */
export default function AudioReactiveLighting() {
  const topGlowRef = useRef(null);
  const bottomGlowRef = useRef(null);
  const borderVignetteRef = useRef(null);
  const coreRef = useRef(null);

  useEffect(() => {
    const unsubscribe = audioReactive.subscribe(({ intensity, isPlaying }) => {
      // Immediate full shutdown when audio is paused or stopped
      if (!isPlaying || intensity <= 0.005) {
        if (topGlowRef.current) {
          topGlowRef.current.style.opacity = '0';
          topGlowRef.current.style.transform = 'scale(1)';
        }
        if (bottomGlowRef.current) {
          bottomGlowRef.current.style.opacity = '0';
        }
        if (borderVignetteRef.current) {
          borderVignetteRef.current.style.opacity = '0';
        }
        if (coreRef.current) {
          coreRef.current.style.opacity = '0';
        }
        return;
      }

      // Audio is actively playing: apply beat lighting & micro-flicker
      const topOpacity = Math.min(0.65, (intensity * 0.75)).toFixed(3);
      const bottomOpacity = Math.min(0.55, (intensity * 0.6)).toFixed(3);
      const vignetteOpacity = Math.min(0.45, (intensity * 0.5)).toFixed(3);
      const coreOpacity = Math.min(0.35, (intensity * 0.4)).toFixed(3);
      const scale = (1 + intensity * 0.06).toFixed(3);

      if (topGlowRef.current) {
        topGlowRef.current.style.opacity = topOpacity;
        topGlowRef.current.style.transform = `scale(${scale})`;
      }
      if (bottomGlowRef.current) {
        bottomGlowRef.current.style.opacity = bottomOpacity;
      }
      if (borderVignetteRef.current) {
        borderVignetteRef.current.style.opacity = vignetteOpacity;
      }
      if (coreRef.current) {
        coreRef.current.style.opacity = coreOpacity;
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* 1. Top Horizon Neon Radial Surge */}
      <div
        ref={topGlowRef}
        className="absolute -top-36 left-1/2 -translate-x-1/2 w-[130vw] h-[450px] rounded-full opacity-0 pointer-events-none transition-all duration-75 ease-out"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(0, 240, 255, 0.4) 0%, rgba(0, 119, 255, 0.18) 40%, transparent 70%)',
          filter: 'blur(35px)',
          mixBlendMode: 'screen',
        }}
      />

      {/* 2. Central Subtle Horizon Ambient Pulse */}
      <div
        ref={coreRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] rounded-full opacity-0 pointer-events-none transition-opacity duration-100"
        style={{
          background:
            'radial-gradient(circle at center, rgba(0, 240, 255, 0.12) 0%, rgba(2, 6, 23, 0) 65%)',
          filter: 'blur(50px)',
          mixBlendMode: 'screen',
        }}
      />

      {/* 3. Bottom Sub-Bass Grid Underglow */}
      <div
        ref={bottomGlowRef}
        className="absolute -bottom-28 left-1/2 -translate-x-1/2 w-[120vw] h-[380px] rounded-full opacity-0 pointer-events-none transition-all duration-75 ease-out"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(0, 119, 255, 0.35) 0%, rgba(0, 240, 255, 0.2) 45%, transparent 70%)',
          filter: 'blur(40px)',
          mixBlendMode: 'screen',
        }}
      />

      {/* 4. Perimeter Electric Cyan Strobe Vignette */}
      <div
        ref={borderVignetteRef}
        className="absolute inset-0 opacity-0 pointer-events-none transition-opacity duration-75"
        style={{
          boxShadow:
            'inset 0 0 60px rgba(0, 240, 255, 0.2), inset 0 0 20px rgba(0, 240, 255, 0.35)',
        }}
      />
    </div>
  );
}
