/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Github, Linkedin, Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import profileImg from '../assets/images/fahad_portrait_1782637500099.jpg';

export default function Footer() {
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
              <img src={profileImg} alt="FW" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div>
              <span className="text-white font-bold tracking-tight text-base block leading-tight">Fahad Waqas</span>
              <span className="text-[10px] text-cyan-400 font-mono tracking-widest leading-none">DEVELOPER PORTFOLIO</span>
            </div>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
            I am a dedicated Full Stack Developer & Content Strategist with 3+ years of intense learning and 200+ personal projects. I engineer fast, reliable, and beautifully stylized digital solutions.
          </p>
          <div className="flex space-x-3 pt-2">
            <a href="https://github.com/Fahadthecopy" target="_blank" rel="noreferrer" className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors" title="GitHub (@Fahadthecopy)">
              <Github className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com/in/Fahad-Waqas" target="_blank" rel="noreferrer" className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://facebook.com/Fahad-Waqas" target="_blank" rel="noreferrer" className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-blue-500 transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://instagram.com/Fahad-Waqas" target="_blank" rel="noreferrer" className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-pink-500 transition-colors">
              <Instagram className="w-4 h-4" />
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
