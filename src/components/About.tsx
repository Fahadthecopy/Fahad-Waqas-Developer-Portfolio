/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { 
  Trophy, 
  Code, 
  Briefcase, 
  Calendar, 
  Sparkles, 
  ChevronRight, 
  Download, 
  Mail,
  Palette
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const bioSentences = [
  "Hi, I'm Fahad — Full-Stack Developer & SEO Specialist.",
  "I specialize in HTML5, CSS3, Bootstrap, JavaScript, PHP, and MySQL database engineering.",
  "I provide end-to-end Technical SEO, On-Page audits, and search-intent keyword research.",
  "I craft high-converting SEO blog content and ethical guest posting outreach strategies.",
  "I have 3+ years of intensive development experience and built 200+ personal and practice projects.",
  "I focus on clean code architecture, W3C standards, Core Web Vitals, and measurable results.",
  "I am always ready to build, optimize, and scale web solutions for your business."
];

export default function About() {
  const { currentPortraitUrl, setIsBackgroundModalOpen } = useTheme();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  // Typewriter states
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [typedText, setTypedText] = useState<string[]>([]);
  const [currentSentenceText, setCurrentSentenceText] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [typingComplete, setTypingComplete] = useState(false);

  // Stats Counters state (simple anim on scroll)
  const [stats, setStats] = useState({ years: 0, projects: 0, rate: 0 });

  useEffect(() => {
    if (isInView) {
      // Trigger stats counter animation
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        setStats({
          years: Math.min(Math.round((3 / steps) * step), 3),
          projects: Math.min(Math.round((200 / steps) * step), 200),
          rate: Math.min(Math.round((100 / steps) * step), 100)
        });

        if (step >= steps) clearInterval(timer);
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isInView]);

  // Sentence-by-sentence typewriter reveal
  useEffect(() => {
    if (!isInView || typingComplete) return;

    if (currentSentenceIndex < bioSentences.length) {
      const fullSentence = bioSentences[currentSentenceIndex];
      
      if (charIndex < fullSentence.length) {
        const timer = setTimeout(() => {
          setCurrentSentenceText(prev => prev + fullSentence[charIndex]);
          setCharIndex(prev => prev + 1);
        }, 30); // 30ms typing speed
        return () => clearTimeout(timer);
      } else {
        // Sentence finished typing, wait and push to the array of typed sentences
        const pauseTimer = setTimeout(() => {
          setTypedText(prev => [...prev, fullSentence]);
          setCurrentSentenceText('');
          setCharIndex(0);
          setCurrentSentenceIndex(prev => prev + 1);
        }, 1200); // 1.2s delay between sentences
        return () => clearTimeout(pauseTimer);
      }
    } else {
      setTypingComplete(true);
    }
  }, [isInView, charIndex, currentSentenceIndex, typingComplete]);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="py-24 relative overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 bg-slate-950/20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.h3 
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2 drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]"
          >
            01 / Professional Profile
          </motion.h3>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-white text-3xl sm:text-4xl font-bold tracking-tight"
          >
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Me</span>
          </motion.h2>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-600 to-cyan-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Profile Picture with glowing rotate border */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, type: 'spring' }}
              className="relative group"
            >
              {/* Complex neon background glow layers */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-purple-600 to-cyan-400 blur-2xl opacity-20 group-hover:opacity-45 transition-opacity duration-500" />
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-400 opacity-75 group-hover:opacity-100 animate-spin-slow pointer-events-none blur-sm" />

              {/* Glassmorphic border container */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full p-1 bg-slate-900 border border-white/10 overflow-hidden shadow-2xl">
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-950 relative">
                  <img
                    src={currentPortraitUrl}
                    alt="Fahad Waqas profile portrait"
                    className="w-full h-full object-cover object-center scale-105 group-hover:scale-115 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Neon overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 via-transparent to-transparent opacity-60 pointer-events-none" />
                </div>

                {/* Change photo / background button */}
                <button
                  onClick={() => setIsBackgroundModalOpen(true)}
                  title="Change Portrait Background"
                  className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-purple-500/40 text-[10px] font-mono text-purple-300 flex items-center space-x-1 z-10 cursor-pointer shadow-md"
                >
                  <Palette className="w-3 h-3 text-cyan-400" />
                  <span>Switch Style</span>
                </button>
              </div>

              {/* Floating badges */}
              <div className="absolute bottom-4 right-4 bg-slate-900/90 border border-cyan-500/30 px-3 py-1.5 rounded-xl shadow-lg flex items-center space-x-2 backdrop-blur-md">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span className="text-xs text-slate-300 font-mono">3+ Years Learner</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Dynamic bio with Sentence typing reveal & statistics */}
          <div className="lg:col-span-7 flex flex-col space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="relative p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-purple-500/10 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
            >
              {/* Glow accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex items-center space-x-2 mb-4 text-purple-400">
                <Code className="w-4 h-4" />
                <span className="font-mono text-xs tracking-wider">fahad_waqas_bio.sh</span>
              </div>

              {/* Typing Biography Block */}
              <div className="font-sans text-slate-300 space-y-3 min-h-[220px] text-sm sm:text-base leading-relaxed">
                {/* Fully typed sentences */}
                {typedText.map((sentence, idx) => (
                  <p key={idx} className="flex items-start">
                    <ChevronRight className="w-4 h-4 text-cyan-400 mt-1 mr-2 shrink-0" />
                    <span>{sentence}</span>
                  </p>
                ))}

                {/* Sentence currently typing */}
                {currentSentenceText && (
                  <p className="flex items-start text-white font-medium">
                    <ChevronRight className="w-4 h-4 text-cyan-400 mt-1 mr-2 shrink-0 animate-pulse" />
                    <span>{currentSentenceText}</span>
                    <span className="inline-block w-1.5 h-4 ml-0.5 bg-cyan-400 animate-blink" />
                  </p>
                )}

                {/* If typing has completed, show cursor at the end of the entire block */}
                {typingComplete && (
                  <p className="text-xs text-slate-500 font-mono italic pt-2 flex items-center">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400 mr-1.5" />
                    <span>Biographic scan fully loaded. Available for remote contract contracts.</span>
                  </p>
                )}
              </div>

              {/* Action Buttons with magnetic hover feel */}
              <div className="flex flex-wrap gap-4 mt-8">
                <button
                  onClick={() => handleScrollTo('contact')}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold text-xs shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] hover:scale-105 transition-all duration-300 flex items-center space-x-2 cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Get in Touch</span>
                </button>
                <button
                  onClick={() => handleScrollTo('contact')}
                  className="px-6 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-300 font-semibold text-xs hover:border-purple-500/50 hover:text-white hover:scale-105 transition-all duration-300 flex items-center space-x-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-purple-400" />
                  <span>Download Resume</span>
                </button>
              </div>
            </motion.div>

            {/* Micro Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              {/* Stat 1 */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-4 rounded-xl bg-slate-900/30 border border-slate-800/60 text-center hover:border-purple-500/30 hover:bg-slate-900/50 transition-all duration-300"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">
                  {stats.years}+
                </div>
                <div className="text-[10px] sm:text-xs text-slate-400 uppercase font-mono tracking-wider mt-1">
                  Years Learnings
                </div>
              </motion.div>

              {/* Stat 2 */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="p-4 rounded-xl bg-slate-900/30 border border-slate-800/60 text-center hover:border-purple-500/30 hover:bg-slate-900/50 transition-all duration-300"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                  {stats.projects}+
                </div>
                <div className="text-[10px] sm:text-xs text-slate-400 uppercase font-mono tracking-wider mt-1">
                  Practice Projects
                </div>
              </motion.div>

              {/* Stat 3 */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="p-4 rounded-xl bg-slate-900/30 border border-slate-800/60 text-center hover:border-purple-500/30 hover:bg-slate-900/50 transition-all duration-300"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-purple-400 font-mono">
                  {stats.rate}%
                </div>
                <div className="text-[10px] sm:text-xs text-slate-400 uppercase font-mono tracking-wider mt-1">
                  Commitment
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
