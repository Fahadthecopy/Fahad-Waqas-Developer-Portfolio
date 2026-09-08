/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Facebook, 
  Instagram, 
  Phone, 
  ArrowRight, 
  Download, 
  Briefcase,
  Layers,
  Sparkles,
  Palette
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const typingTexts = [
  'HTML5 & CSS3',
  'JavaScript (ES6+)',
  'Node.js & Express',
  'PHP & Laravel',
  'MySQL Databases',
  'Content Writing',
  'SEO & Guest Posting'
];

export default function Hero() {
  const { currentPortraitUrl, setIsBackgroundModalOpen } = useTheme();
  const [textIndex, setTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullText = typingTexts[textIndex];

    const handleType = () => {
      if (!isDeleting) {
        // Typing characters
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(100);

        if (currentText === fullText) {
          // Pause before deleting
          timer = setTimeout(() => setIsDeleting(true), 1500);
          return;
        }
      } else {
        // Deleting characters
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(50);

        if (currentText === '') {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % typingTexts.length);
          return;
        }
      }

      timer = setTimeout(handleType, typingSpeed);
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, textIndex, typingSpeed]);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      {/* Background radial highlight & particles */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 via-slate-950/40 to-slate-950 pointer-events-none -z-10" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Copy and details */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-950/50 border border-purple-500/30 text-purple-300 text-xs font-mono shadow-[0_0_15px_rgba(168,85,247,0.15)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
            <span>Open for Opportunities & Web Consultations</span>
          </motion.div>

          {/* Title */}
          <div className="space-y-2">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-white text-4xl sm:text-5xl md:text-6xl font-bold font-sans tracking-tight leading-none"
            >
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 drop-shadow-[0_0_20px_rgba(168,85,247,0.3)]">Fahad Waqas</span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-200 text-lg sm:text-xl md:text-2xl font-semibold tracking-wide max-w-2xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400"
            >
              Build. Optimize. Grow.
            </motion.h2>
          </div>

          {/* Typing Text Container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-10 flex items-center text-cyan-400 font-mono text-base sm:text-lg md:text-xl border-b border-cyan-500/30 pb-1"
          >
            <span>Solutions for: </span>
            <span className="ml-2 font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              {currentText}
            </span>
            <span className="ml-0.5 inline-block w-1.5 h-4.5 bg-cyan-400 animate-pulse" />
          </motion.div>

          {/* Intro paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed"
          >
            <strong className="text-white">Web Development, SEO, Content, Keyword Research & Guest Posting Solutions</strong> for businesses that want to grow online with high reliability and genuine results.
          </motion.p>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center lg:justify-start gap-3 w-full max-w-lg"
          >
            <button
              onClick={() => handleScrollTo('contact')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold text-sm shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.8)] transition-all duration-300 flex items-center space-x-2 group cursor-pointer hover:scale-105"
            >
              <Briefcase className="w-4 h-4" />
              <span>Start Your Project</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => handleScrollTo('services')}
              className="px-6 py-3 rounded-xl bg-purple-950/40 border border-purple-500/40 text-purple-300 font-semibold text-sm hover:text-white hover:border-cyan-400 shadow-lg transition-all duration-300 flex items-center space-x-2 group cursor-pointer hover:scale-105"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Explore Services</span>
            </button>

            <button
              onClick={() => handleScrollTo('portfolio')}
              className="px-6 py-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 font-semibold text-sm hover:text-white hover:border-purple-500/50 shadow-lg transition-all duration-300 flex items-center space-x-2 group cursor-pointer hover:scale-105"
            >
              <Layers className="w-4 h-4 text-purple-400" />
              <span>View Live Projects</span>
            </button>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center space-x-4 pt-4"
          >
            <a
              href="https://github.com/Fahadthecopy"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-300"
              title="GitHub Profile (@Fahadthecopy)"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/Fahad-Waqas"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300"
              title="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://facebook.com/Fahad-Waqas"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-blue-500 hover:border-blue-500/50 transition-all duration-300"
              title="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com/Fahad-Waqas"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-pink-500 hover:border-pink-500/50 transition-all duration-300"
              title="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/923000610586"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-green-500 hover:border-green-500/50 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all duration-300"
              title="WhatsApp Chat"
            >
              <Phone className="w-5 h-5" />
            </a>
          </motion.div>
        </div>

        {/* Right Side: Portrait Image with glowing rotating border & floats */}
        <div className="lg:col-span-5 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.3 }}
            className="relative"
          >
            {/* Background glowing decorations */}
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 rounded-full blur-2xl opacity-40 animate-pulse pointer-events-none" />
            
            {/* Rotating gradient outer border */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full p-1.5 bg-gradient-to-tr from-purple-600 via-cyan-400 to-pink-500 shadow-[0_0_50px_rgba(168,85,247,0.3)] hover:shadow-[0_0_60px_rgba(6,182,212,0.6)] hover:scale-105 transition-all duration-500 group overflow-hidden">
              {/* Spinning overlay using simple CSS style */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 opacity-20 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />
              
              {/* The image itself */}
              <div className="w-full h-full rounded-full bg-slate-950 overflow-hidden relative border-4 border-slate-950">
                <img
                  src={currentPortraitUrl}
                  alt="Muhammad Fahad Waqas Portrait"
                  className="w-full h-full object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Instant Background Studio button hovering on portrait */}
              <button
                onClick={() => setIsBackgroundModalOpen(true)}
                title="Change Photo & App Background"
                className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/50 text-cyan-300 text-[11px] font-mono font-semibold flex items-center space-x-1 shadow-lg cursor-pointer opacity-90 hover:opacity-100 hover:scale-105 transition-all"
              >
                <Palette className="w-3 h-3 text-purple-400" />
                <span>Change BG</span>
              </button>
            </div>

            {/* floating badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 px-3.5 py-1.5 rounded-2xl bg-slate-900/90 border border-cyan-500/40 backdrop-blur-md shadow-lg flex items-center space-x-1.5 font-mono text-xs text-cyan-400"
            >
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Full-Stack Engineer</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-4 -left-4 px-3.5 py-1.5 rounded-2xl bg-slate-900/90 border border-purple-500/40 backdrop-blur-md shadow-lg flex items-center space-x-1.5 font-mono text-xs text-purple-400"
            >
              <div className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
              <span>Laravel Expert</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
