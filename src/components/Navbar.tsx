/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  ArrowRight,
  LayoutDashboard
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface NavItem {
  id: string;
  label: string;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'portfolio', label: 'Projects' },
  { id: 'diagnostics', label: 'Diagnostics' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

interface NavbarProps {
  onOpenDashboard?: () => void;
}

export default function Navbar({ onOpenDashboard }: NavbarProps) {
  const [activeSection, setActiveSection] = useState('home');
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currentPortraitUrl } = useTheme();

  // ScrollSpy & Navbar background transition
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navHeight = 72;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: Math.max(0, elementPosition - navHeight),
        behavior: 'smooth'
      });
    }
  };

  return (
    <header 
      id="navbar"
      className={`sticky top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20 py-3' 
          : 'bg-slate-950/40 backdrop-blur-sm border-b border-slate-800/30 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand / Logo */}
          <div 
            onClick={() => scrollToSection('home')}
            id="nav-logo"
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden border border-slate-700/80 group-hover:border-cyan-400/80 shadow-md group-hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-300 bg-slate-900 shrink-0">
              <img 
                src={currentPortraitUrl} 
                alt="Fahad Waqas" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                referrerPolicy="no-referrer" 
              />
            </div>
            
            <div className="flex flex-col">
              <span className="text-white font-semibold tracking-tight text-base sm:text-lg group-hover:text-cyan-300 transition-colors leading-tight">
                Fahad Waqas
              </span>
              <div className="flex items-center space-x-1.5 mt-0.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-medium text-slate-400 tracking-normal">
                  Full-Stack Dev
                </span>
              </div>
            </div>
          </div>

          {/* Center Navigation - Desktop */}
          <nav 
            id="desktop-menu"
            aria-label="Primary Navigation"
            className="hidden md:flex items-center bg-slate-900/60 border border-slate-800/80 rounded-full px-1.5 py-1 backdrop-blur-md shadow-inner"
          >
            {navItems.map(item => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-colors duration-200 cursor-pointer ${
                    isActive 
                      ? 'text-white' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-pill"
                      className="absolute inset-0 bg-slate-800 rounded-full border border-slate-700/60 shadow-sm -z-10"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action / CTA */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {onOpenDashboard && (
              <button
                onClick={onOpenDashboard}
                id="nav-dashboard-btn"
                className="hidden lg:flex items-center space-x-1.5 text-xs font-medium text-slate-300 hover:text-white px-3 py-2 rounded-xl border border-slate-800 hover:border-slate-700 bg-slate-900/60 hover:bg-slate-850 transition-all cursor-pointer"
                title="Open Client Solution Engine"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-cyan-400" />
                <span>Dashboard</span>
              </button>
            )}

            <button
              onClick={() => scrollToSection('contact')}
              id="nav-cta-btn"
              className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 px-4 py-2 rounded-xl shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              id="mobile-menu-btn"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/40 cursor-pointer transition-colors"
            >
              {isOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5 text-slate-300" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu-drawer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="md:hidden absolute top-full left-0 w-full bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/80 px-5 pt-3 pb-6 shadow-2xl space-y-1"
          >
            <div className="space-y-1">
              {navItems.map(item => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-slate-900 text-cyan-400 border border-slate-800 font-semibold'
                        : 'text-slate-300 hover:bg-slate-900/60 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Mobile Action Controls */}
            <div className="pt-3 mt-2 border-t border-slate-800/80 space-y-2">
              {onOpenDashboard && (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenDashboard();
                  }}
                  className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl border border-slate-800 bg-slate-900 text-xs font-medium text-slate-300 hover:text-white cursor-pointer transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4 text-cyan-400" />
                  <span>Open Client Solution Engine</span>
                </button>
              )}

              <button
                onClick={() => scrollToSection('contact')}
                className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold shadow-md shadow-cyan-500/20 cursor-pointer"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
