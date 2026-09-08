/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Github, Linkedin, Facebook, Instagram, Mail, Phone, MapPin, Radio } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Footer() {
  const { currentPortraitUrl } = useTheme();

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-8 relative overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Glow accent */}
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 border-b border-slate-900 pb-12">
        
        {/* Col 1: Brand & Intro */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-purple-500/50 shadow-md flex items-center justify-center bg-slate-900">
              <img src={currentPortraitUrl} alt="Muhammad Fahad Waqas" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div>
              <span className="text-white font-bold tracking-tight text-base block leading-tight">Fahad Waqas</span>
              <span className="text-[10px] text-cyan-400 font-mono tracking-widest leading-none">DEVELOPER PORTFOLIO</span>
            </div>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
            Muhammad Fahad Waqas – Full Stack Developer & Technical SEO Specialist with 4+ years of hands-on experience in PHP, MySQL, React, and zero-downtime website error resolution.
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <a href="https://github.com/Fahadthecopy" target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors" title="GitHub (@Fahadthecopy)">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com/in/Fahad-Waqas" target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 transition-colors" title="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://facebook.com/Fahad-Waqas" target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-blue-500 transition-colors" title="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://instagram.com/Fahad-Waqas" target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-pink-500 transition-colors" title="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a 
              href="https://wa.me/923000610586?text=Hi%20Fahad,%20I%20want%20to%20join%20your%20WhatsApp%20Channel!" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-2.5 py-1.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-900/60 text-xs font-semibold flex items-center space-x-1.5 transition-colors" 
              title="Join WhatsApp Channel (+92 300 0610586)"
            >
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>WhatsApp Channel</span>
            </a>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className="lg:col-span-2 space-y-3">
          <h4 className="text-white text-xs font-mono uppercase tracking-wider font-semibold">Quick Links</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            {['Home', 'About', 'Skills', 'Services', 'Portfolio', 'Experience', 'Blog', 'Contact'].map(link => (
              <li key={link}>
                <button 
                  onClick={() => handleScrollTo(link.toLowerCase() === 'home' ? 'home' : link.toLowerCase() === 'skills' ? 'skills' : link.toLowerCase() === 'solutions' ? 'client-solutions' : link.toLowerCase() === 'reviews' ? 'testimonials' : link.toLowerCase())}
                  className="hover:text-cyan-400 transition-colors cursor-pointer text-left"
                >
                  {link}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Services */}
        <div className="lg:col-span-3 space-y-3">
          <h4 className="text-white text-xs font-mono uppercase tracking-wider font-semibold">Our Services</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            {[
              'Full Stack Development', 'Frontend Development', 'Backend Development',
              'Laravel Custom Solutions', 'PHP Scripting', 'REST API Architectures',
              'Responsive Web Design', 'SEO & Content Writing'
            ].map(item => (
              <li key={item} className="cursor-default hover:text-purple-400 transition-colors">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Resources & Privacy */}
        <div className="lg:col-span-3 space-y-3">
          <h4 className="text-white text-xs font-mono uppercase tracking-wider font-semibold">Support & Resources</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li><button onClick={() => handleScrollTo('portfolio')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">Practice Projects Portfolio</button></li>
            <li><button onClick={() => handleScrollTo('contact')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">Download Verified CV</button></li>
            <li><button onClick={() => handleScrollTo('faq-section')} className="hover:text-cyan-400 transition-colors text-left cursor-pointer">Frequently Asked Questions</button></li>
            <li className="text-slate-600">Privacy Policy</li>
            <li className="text-slate-600">Terms & Conditions</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom copyright */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] sm:text-xs text-slate-500 font-mono">
        <span>© 2026 Fahad Waqas. All rights reserved.</span>
        <span className="flex items-center space-x-1 mt-2 sm:mt-0">
          <span>Crafted in modern React & Tailwind CSS</span>
        </span>
      </div>
    </footer>
  );
}
