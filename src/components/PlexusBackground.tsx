/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import { BackgroundStyle, ThemeMode } from '../types';

interface PlexusBackgroundProps {
  theme?: ThemeMode;
  backgroundStyle?: BackgroundStyle;
}

export default function PlexusBackground({ 
  theme = 'dark', 
  backgroundStyle = 'deep_space' 
}: PlexusBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle class
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      baseAlpha: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 2 + 1;
        this.baseAlpha = Math.random() * 0.5 + 0.2;
        
        if (theme === 'light') {
          const lightColors = [
            'rgba(99, 102, 241, 0.4)', // Indigo
            'rgba(14, 165, 233, 0.4)', // Sky
            'rgba(168, 85, 247, 0.35)', // Purple
          ];
          this.color = lightColors[Math.floor(Math.random() * lightColors.length)];
        } else {
          const darkColors = [
            'rgba(168, 85, 247, 0.45)', // Purple
            'rgba(6, 182, 212, 0.45)',  // Cyan
            'rgba(139, 92, 246, 0.35)', // Violet
          ];
          this.color = darkColors[Math.floor(Math.random() * darkColors.length)];
        }
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;
      }

      draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = this.color;
        if (theme === 'dark') {
          context.shadowBlur = 8;
          context.shadowColor = this.color;
        }
        context.fill();
        context.shadowBlur = 0;
      }
    }

    const particleCount = backgroundStyle === 'minimal_grid' ? 30 : Math.min(Math.floor((width * height) / 14000), 100);
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    let time = 0;

    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Render base background style
      if (theme === 'light' || backgroundStyle === 'studio_light') {
        // Crisp light daylight background
        const lightGrad = ctx.createLinearGradient(0, 0, width, height);
        lightGrad.addColorStop(0, '#f8fafc');
        lightGrad.addColorStop(0.5, '#f1f5f9');
        lightGrad.addColorStop(1, '#e2e8f0');
        ctx.fillStyle = lightGrad;
        ctx.fillRect(0, 0, width, height);
      } else if (backgroundStyle === 'cosmic_mesh') {
        // Soft animated gradient orbs
        ctx.fillStyle = '#060710';
        ctx.fillRect(0, 0, width, height);

        const orb1X = width * 0.3 + Math.sin(time) * 100;
        const orb1Y = height * 0.3 + Math.cos(time * 0.8) * 80;
        const g1 = ctx.createRadialGradient(orb1X, orb1Y, 10, orb1X, orb1Y, 450);
        g1.addColorStop(0, 'rgba(126, 34, 206, 0.25)');
        g1.addColorStop(1, 'rgba(126, 34, 206, 0)');
        ctx.fillStyle = g1;
        ctx.fillRect(0, 0, width, height);

        const orb2X = width * 0.7 + Math.cos(time * 0.9) * 120;
        const orb2Y = height * 0.7 + Math.sin(time) * 90;
        const g2 = ctx.createRadialGradient(orb2X, orb2Y, 10, orb2X, orb2Y, 500);
        g2.addColorStop(0, 'rgba(6, 182, 212, 0.22)');
        g2.addColorStop(1, 'rgba(6, 182, 212, 0)');
        ctx.fillStyle = g2;
        ctx.fillRect(0, 0, width, height);
      } else if (backgroundStyle === 'indigo_aurora') {
        const bgGrad = ctx.createLinearGradient(0, 0, width, height);
        bgGrad.addColorStop(0, '#040714');
        bgGrad.addColorStop(0.5, '#0b112c');
        bgGrad.addColorStop(1, '#020308');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);
      } else if (backgroundStyle === 'minimal_grid') {
        ctx.fillStyle = '#070a12';
        ctx.fillRect(0, 0, width, height);

        // Tech grid lines
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.07)';
        const gridSize = 48;
        for (let x = 0; x < width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      } else {
        // Deep Space Obsidian Default
        const gradient = ctx.createRadialGradient(
          width / 2,
          height / 2,
          10,
          width / 2,
          height / 2,
          Math.max(width, height)
        );
        gradient.addColorStop(0, '#0a0d1d');
        gradient.addColorStop(0.6, '#060813');
        gradient.addColorStop(1, '#020307');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      // Update and draw particles (for non-minimal grid or subtle plexus)
      if (backgroundStyle !== 'studio_light' || theme === 'dark') {
        particles.forEach((p) => {
          p.update();
          p.draw(ctx);
        });

        // Draw connecting lines (plexus)
        ctx.lineWidth = 0.6;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 125) {
              const alpha = (1 - dist / 125) * (theme === 'light' ? 0.2 : 0.16);
              ctx.strokeStyle = theme === 'light' 
                ? `rgba(99, 102, 241, ${alpha})`
                : `rgba(139, 92, 246, ${alpha})`;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }

          // Cursor interaction line
          if (mouseX !== -1000) {
            const dx = particles[i].x - mouseX;
            const dy = particles[i].y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 160) {
              const alpha = (1 - dist / 160) * 0.3;
              ctx.strokeStyle = theme === 'light'
                ? `rgba(14, 165, 233, ${alpha})`
                : `rgba(6, 182, 212, ${alpha})`;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(mouseX, mouseY);
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;

      const newCount = backgroundStyle === 'minimal_grid' ? 30 : Math.min(Math.floor((width * height) / 14000), 100);
      particles.length = 0;
      for (let i = 0; i < newCount; i++) {
        particles.push(new Particle());
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme, backgroundStyle]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-20 pointer-events-none transition-opacity duration-700"
      id="ambient-plexus-bg"
    />
  );
}
