import React, { useEffect, useRef } from 'react';
import { audioSystem } from '../services/audioService';

/**
 * Minimal TRON Atmospheric Background Canvas
 * Renders an optimized perspective grid and subtle ambient particles.
 * Reacts to audio beats by expanding horizon neon bloom and grid line luminosity.
 * Drops to calm baseline immediately when audio stops.
 */
export default function TronBackground() {
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
    let beatIntensity = 0;
    const unsubscribeAudio = audioSystem.subscribe((state) => {
      beatIntensity = state.beatIntensity || 0;
    });

    // Limited particle count (20 nodes for maximum 60fps performance)
    const particleCount = 20;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 1.5 + 0.8,
        color: '#00f0ff',
        alpha: Math.random() * 0.4 + 0.15,
      });
    }

    let gridOffset = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep Space Void Gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#020408');
      bgGrad.addColorStop(0.5, '#030814');
      bgGrad.addColorStop(1, '#020409');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Ambient radial lighting aura that pulses with audio beat
      if (beatIntensity > 0.05) {
        const auraGrad = ctx.createRadialGradient(
          width / 2, height * 0.7, 10,
          width / 2, height * 0.7, width * 0.7
        );
        auraGrad.addColorStop(0, `rgba(0, 240, 255, ${beatIntensity * 0.12})`);
        auraGrad.addColorStop(0.5, `rgba(0, 102, 204, ${beatIntensity * 0.06})`);
        auraGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = auraGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // Perspective horizon grid
      gridOffset = (gridOffset + 0.25 + beatIntensity * 0.3) % 36;
      const horizonY = height * 0.72;

      // Perspective horizontal lines
      const gridAlpha = 0.06 + beatIntensity * 0.12;
      ctx.strokeStyle = `rgba(0, 240, 255, ${gridAlpha})`;
      ctx.lineWidth = 1;

      for (let y = horizonY; y < height; y += (height - horizonY) / 12) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Vanishing perspective rays
      const vanishX = width / 2;
      const numRays = 14;
      for (let i = -numRays; i <= numRays; i++) {
        const targetX = vanishX + (i * (width / numRays)) * 1.4;
        ctx.beginPath();
        ctx.moveTo(vanishX, horizonY);
        ctx.lineTo(targetX, height);
        ctx.stroke();
      }

      // Horizon neon glow line with dynamic bloom on beat
      const bloom = 12 + beatIntensity * 28;
      ctx.shadowColor = beatIntensity > 0.4 ? '#a5f3fc' : '#00f0ff';
      ctx.shadowBlur = bloom;
      ctx.strokeStyle = `rgba(0, 240, 255, ${0.35 + beatIntensity * 0.5})`;
      ctx.lineWidth = 1.2 + beatIntensity * 1.5;
      ctx.beginPath();
      ctx.moveTo(0, horizonY);
      ctx.lineTo(width, horizonY);
      ctx.stroke();
      ctx.shadowBlur = 0; // Reset shadow

      // Render & update subtle floating particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const pSize = p.size * (1 + beatIntensity * 0.3);
        const pAlpha = Math.min(0.8, p.alpha + beatIntensity * 0.3);

        ctx.fillStyle = p.color;
        ctx.globalAlpha = pAlpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, pSize, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      unsubscribeAudio();
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
