/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BackgroundStyle, PortraitStyle, ThemeMode } from '../types';
import { 
  Sparkles, 
  Palette, 
  Sun, 
  Moon, 
  Laptop, 
  Layers, 
  Check, 
  Image as ImageIcon, 
  Sliders, 
  Eye, 
  RefreshCw,
  Zap
} from 'lucide-react';
import portraitStudio from '../assets/images/fahad_studio_portrait_1787382529769.jpg';
import portraitOffice from '../assets/images/fahad_portrait_office_1787382552263.jpg';
import portraitOriginal from '../assets/images/fahad_portrait_1782637500099.jpg';

interface BackgroundCustomizerProps {
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  backgroundStyle: BackgroundStyle;
  onBackgroundStyleChange: (style: BackgroundStyle) => void;
  portraitStyle: PortraitStyle;
  onPortraitStyleChange: (portrait: PortraitStyle) => void;
  onClose?: () => void;
}

export default function BackgroundCustomizer({
  theme,
  onThemeChange,
  backgroundStyle,
  onBackgroundStyleChange,
  portraitStyle,
  onPortraitStyleChange,
  onClose
}: BackgroundCustomizerProps) {

  const backgroundOptions: { id: BackgroundStyle; name: string; desc: string; preview: string }[] = [
    {
      id: 'deep_space',
      name: 'Deep Space Studio',
      desc: 'Obsidian dark canvas with ambient purple & cyan radial glows',
      preview: 'from-slate-950 via-[#070a13] to-purple-950/40'
    },
    {
      id: 'plexus_matrix',
      name: 'Dynamic Plexus Matrix',
      desc: 'Interactive 60fps connected particle graph responding to cursor',
      preview: 'from-slate-950 via-cyan-950/40 to-slate-900'
    },
    {
      id: 'cosmic_mesh',
      name: 'Cosmic Mesh Gradient',
      desc: 'Fluid, soft-blurred multi-color gradient lighting orbs',
      preview: 'from-purple-900/40 via-slate-950 to-pink-900/30'
    },
    {
      id: 'indigo_aurora',
      name: 'Indigo Cyber Aurora',
      desc: 'Deep midnight blue with futuristic subtle neon aurora glows',
      preview: 'from-indigo-950 via-slate-950 to-blue-950'
    },
    {
      id: 'minimal_grid',
      name: 'Minimal Tech Grid',
      desc: 'Sleek architectural developer blueprint grid pattern',
      preview: 'from-slate-900 via-slate-950 to-slate-900 border border-slate-700/50'
    },
    {
      id: 'studio_light',
      name: 'Studio Clean Minimalist',
      desc: 'Crisp, ultra-clean neutral slate aesthetic with soft shadows',
      preview: 'from-slate-100 via-white to-slate-200 text-slate-800'
    }
  ];

  const portraitOptions: { id: PortraitStyle; name: string; desc: string; img: string }[] = [
    {
      id: 'original_photo',
      name: 'Original Photo (Default)',
      desc: 'Authentic camera portrait applied across all pages & sections',
      img: portraitOriginal
    },
    {
      id: 'studio_tech',
      name: 'Studio Tech Dark Bokeh',
      desc: 'Professional studio lighting with soft purple/cyan tech bokeh',
      img: portraitStudio
    },
    {
      id: 'office_bokeh',
      name: 'Modern Office Glass Studio',
      desc: 'Minimalist high-tech development studio with natural depth',
      img: portraitOffice
    }
  ];

  return (
    <div className="p-6 space-y-6 max-h-[85vh] overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <Palette className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold text-white tracking-tight">
              Theme & Background Studio
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Customize application theme, particle visual effects, and portrait backgrounds in real-time.
          </p>
        </div>

        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-[11px] font-mono">
          <Zap className="w-3 h-3 animate-pulse" />
          <span>Real-Time Sync</span>
        </div>
      </div>

      {/* 1. Theme Selector (Light, Dark, System) */}
      <div>
        <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-3 block">
          1. Color Theme Mode
        </label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'dark', label: 'Dark Mode', icon: Moon, desc: 'Optimized high contrast dark' },
            { id: 'light', label: 'Light Mode', icon: Sun, desc: 'Clean crisp daylight theme' },
            { id: 'system', label: 'System Auto', icon: Laptop, desc: 'Matches device preference' }
          ].map(t => {
            const Icon = t.icon;
            const isSelected = theme === t.id;
            return (
              <button
                key={t.id}
                onClick={() => onThemeChange(t.id as ThemeMode)}
                className={`p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg shadow-blue-500/10 ring-1 ring-blue-500/40'
                    : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-5 h-5 ${isSelected ? 'text-blue-400' : 'text-slate-400'}`} />
                  {isSelected && <Check className="w-4 h-4 text-blue-400" />}
                </div>
                <div className="text-xs font-bold text-white">{t.label}</div>
                <div className="text-[10px] text-slate-400 mt-0.5 leading-tight">{t.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Application Canvas Background */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
            2. Application Canvas & Particle Background
          </label>
          <span className="text-[11px] font-mono text-cyan-400">{backgroundOptions.length} Styles Available</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {backgroundOptions.map(bg => {
            const isSelected = backgroundStyle === bg.id;
            return (
              <button
                key={bg.id}
                onClick={() => onBackgroundStyleChange(bg.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all duration-200 relative overflow-hidden group cursor-pointer ${
                  isSelected
                    ? 'border-purple-500 bg-slate-900/90 ring-1 ring-purple-500/40 shadow-lg shadow-purple-500/10'
                    : 'border-slate-800/80 bg-slate-900/40 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  {/* Visual Preview Box */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${bg.preview} border border-slate-700 shrink-0 flex items-center justify-center shadow-inner`}>
                    <Sparkles className="w-4 h-4 text-cyan-300 opacity-80" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white truncate">{bg.name}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-purple-400 shrink-0 ml-1" />}
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-2 leading-relaxed">
                      {bg.desc}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Portrait Photo Background Switcher */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
            3. Fahad Portrait Photo Background Changer
          </label>
          <span className="text-[10px] text-purple-400 font-mono">Instant Studio Switch</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {portraitOptions.map(p => {
            const isSelected = portraitStyle === p.id;
            return (
              <button
                key={p.id}
                onClick={() => onPortraitStyleChange(p.id)}
                className={`p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-950/20 ring-1 ring-cyan-400/40 shadow-lg shadow-cyan-500/10'
                    : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
                }`}
              >
                <div className="relative mb-2.5 rounded-xl overflow-hidden aspect-[4/3] bg-slate-950">
                  <img 
                    src={p.img} 
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center shadow-md">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>

                <div className="text-xs font-bold text-white truncate">{p.name}</div>
                <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{p.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer controls */}
      <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
        <button
          onClick={() => {
            onThemeChange('dark');
            onBackgroundStyleChange('deep_space');
            onPortraitStyleChange('original_photo');
          }}
          className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs flex items-center space-x-1.5 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset to Default</span>
        </button>

        {onClose && (
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs shadow-md hover:scale-105 transition-all cursor-pointer"
          >
            Apply & Save
          </button>
        )}
      </div>
    </div>
  );
}
