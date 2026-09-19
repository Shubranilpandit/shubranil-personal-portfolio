import React, { useEffect, useRef } from 'react';
import { audioReactive } from '../services/audioReactiveService';

/**
 * TRON Digital Grid & Particle Stream Canvas
 * Renders an animated Tron-inspired perspective grid and floating data particles.
 * Dynamically pulses horizon neon glow and perspective line brightness in sync with audio beats.
 * Immediately rests at nominal baseline when audio stops.
 */
export default function TronCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Audio reactive beat telemetry state (direct reference, zero React re-render overhead)
    let beatTelemetry = { intensity: 0, isPlaying: false, kick: 0 };
    const unsubscribeBeat = audioReactive.subscribe((data) => {
      beatTelemetry = data;
    });

    // Particle nodes
    const particleCount = Math.min(50, Math.floor(width / 30));
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1,
        color: Math.random() > 0.3 ? '#00f0ff' : '#0077ff',
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    let gridOffset = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep space gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#020408');
      bgGrad.addColorStop(0.5, '#040b17');
      bgGrad.addColorStop(1, '#02050c');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Compute active beat intensity (0 when paused/stopped)
      const beatIntensity = beatTelemetry.isPlaying ? beatTelemetry.intensity : 0;

      // Perspective horizon grid with beat-accelerated velocity
      gridOffset = (gridOffset + 0.3 + beatIntensity * 0.35) % 40;
      const horizonY = height * 0.7;

      // Perspective grid lines surge with beat
      const gridAlpha = 0.08 + beatIntensity * 0.16;
      ctx.strokeStyle = `rgba(0, 240, 255, ${gridAlpha})`;
      ctx.lineWidth = 1 + beatIntensity * 0.4;

      // Horizontal lines with perspective spacing
      for (let y = horizonY; y < height; y += (height - horizonY) / 14) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Vanishing perspective rays
      const vanishX = width / 2;
      const numRays = 18;
      for (let i = -numRays; i <= numRays; i++) {
        const targetX = vanishX + (i * (width / numRays)) * 1.5;
        ctx.beginPath();
        ctx.moveTo(vanishX, horizonY);
        ctx.lineTo(targetX, height);
        ctx.stroke();
      }

      // Horizon neon glow line with dynamic bloom on beat
      const shadowBloom = 15 + beatIntensity * 32;
      ctx.shadowColor = beatIntensity > 0.45 ? '#a5f3fc' : '#00f0ff';
      ctx.shadowBlur = shadowBloom;
      ctx.strokeStyle = `rgba(0, 240, 255, ${0.4 + beatIntensity * 0.55})`;
      ctx.lineWidth = 1.5 + beatIntensity * 1.8;
      ctx.beginPath();
      ctx.moveTo(0, horizonY);
      ctx.lineTo(width, horizonY);
      ctx.stroke();
      ctx.shadowBlur = 0; // reset shadow

      // Render & update floating data particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Particle size & alpha pulse on beat
        const pSize = p.size * (1 + beatIntensity * 0.35);
        const pAlpha = Math.min(1.0, p.alpha + beatIntensity * 0.35);

        ctx.fillStyle = p.color;
        ctx.globalAlpha = pAlpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, pSize, 0, Math.PI * 2);
        ctx.fill();

        // Subtle interconnecting data lines between nearby particles
        const connectionThreshold = 90 + beatIntensity * 25;
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < connectionThreshold) {
            ctx.strokeStyle = '#00f0ff';
            ctx.globalAlpha = (1 - dist / connectionThreshold) * (0.15 + beatIntensity * 0.3);
            ctx.lineWidth = 0.5 + beatIntensity * 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1.0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      unsubscribeBeat();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
