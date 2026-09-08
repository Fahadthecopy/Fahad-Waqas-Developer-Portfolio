/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import DashboardView from './components/DashboardView';
import PlexusBackground from './components/PlexusBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ClientFocusedServices from './components/ClientFocusedServices';
import WebsiteErrorDiagnostics from './components/WebsiteErrorDiagnostics';
import WebsiteImageSections from './components/WebsiteImageSections';
import PortfolioShowcase from './components/PortfolioShowcase';
import PricingPlans from './components/PricingPlans';
import About from './components/About';
import Skills from './components/Skills';
import ExperienceTimeline from './components/ExperienceTimeline';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackgroundCustomizer from './components/BackgroundCustomizer';
import { LayoutDashboard, Globe, Palette, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

function AppContent() {
  // 'dashboard' or 'public'
  const [viewMode, setViewMode] = useState<'dashboard' | 'public'>('dashboard');
  const { 
    theme, 
    setTheme, 
    backgroundStyle, 
    setBackgroundStyle, 
    portraitStyle, 
    setPortraitStyle, 
    isBackgroundModalOpen, 
    setIsBackgroundModalOpen 
  } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'light' ? 'bg-slate-50 text-slate-900' : 'bg-[#070a13] text-white'
    }`}>
      {/* Floating Bottom Quick Bar: View Switcher & Theme/Background Studio */}
      <div className="fixed bottom-5 left-5 z-50 flex items-center bg-slate-900/90 backdrop-blur-md border border-purple-500/30 p-1.5 rounded-2xl shadow-2xl space-x-1.5">
        <button
          onClick={() => setViewMode('dashboard')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            viewMode === 'dashboard'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          <span>Solution Engine</span>
        </button>

        <button
          onClick={() => setViewMode('public')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            viewMode === 'public'
              ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-md shadow-purple-600/30'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Public Website</span>
        </button>

        <div className="h-4 w-px bg-slate-700 mx-0.5" />

        {/* Dedicated Background / Theme Studio Trigger */}
        <button
          onClick={() => setIsBackgroundModalOpen(true)}
          title="Background & Theme Studio"
          className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-purple-950/60 hover:bg-purple-900/80 border border-purple-500/40 text-purple-300 text-xs font-semibold transition-all cursor-pointer"
        >
          <Palette className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">Change BG</span>
        </button>
      </div>

      {viewMode === 'dashboard' ? (
        <DashboardView 
          onSwitchToPublic={() => setViewMode('public')} 
          onNavigateToSection={(id) => {
            setViewMode('public');
            setTimeout(() => {
              const el = document.getElementById(id);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
        />
      ) : (
        <div className={`relative min-h-screen font-sans overflow-x-hidden antialiased ${
          theme === 'light' ? 'text-slate-900 bg-slate-50/50' : 'text-white bg-slate-950'
        }`}>
          {/* Dynamic canvas background honoring chosen theme and background style */}
          <PlexusBackground theme={theme} backgroundStyle={backgroundStyle} />

          {/* Global Navigation */}
          <Navbar onOpenDashboard={() => setViewMode('dashboard')} />

          {/* Hero Intro */}
          <Hero />

          {/* Content layout wrapper */}
          <main className="relative z-10 space-y-4">
            {/* Client-Focused 5-Pillar Services & Diagnostic Hub */}
            <ClientFocusedServices />

            {/* Apex Web Diagnostics & Instant Website Error Fixing Section */}
            <WebsiteErrorDiagnostics />

            {/* Dedicated Website Error Fixes & Live Website Image Gallery */}
            <WebsiteImageSections />

            {/* 8 Flagship Portfolio Projects & Interactive Case Studies */}
            <PortfolioShowcase />

            {/* Pricing Packages & 4 Core Fiverr Gigs */}
            <PricingPlans />

            {/* Biography */}
            <About />

            {/* Skills inventory */}
            <Skills />

            {/* History timeline */}
            <ExperienceTimeline />

            {/* Sliding client reviews */}
            <Testimonials />

            {/* Technical publications blogs */}
            <Blog />

            {/* Call to action & interactive Form */}
            <Contact />
          </main>

          {/* Brand Footer */}
          <Footer />
        </div>
      )}

      {/* Global Background & Theme Customizer Modal */}
      <AnimatePresence>
        {isBackgroundModalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-2xl bg-[#0c101d] border border-cyan-500/40 rounded-3xl shadow-2xl overflow-hidden relative"
            >
              <button
                onClick={() => setIsBackgroundModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 z-10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <BackgroundCustomizer
                theme={theme}
                onThemeChange={setTheme}
                backgroundStyle={backgroundStyle}
                onBackgroundStyleChange={setBackgroundStyle}
                portraitStyle={portraitStyle}
                onPortraitStyleChange={setPortraitStyle}
                onClose={() => setIsBackgroundModalOpen(false)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
