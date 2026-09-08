/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Github, 
  Linkedin, 
  Facebook, 
  Instagram, 
  MessageSquare, 
  Send, 
  CheckCircle, 
  AlertCircle,
  Clock,
  Map,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Radio
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface FormState {
  name: string;
  email: string;
  phone: string;
  websiteUrl: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
}

const initialForm: FormState = {
  name: '',
  email: '',
  phone: '',
  websiteUrl: '',
  service: 'web_development',
  budget: '50_100',
  timeline: '1_2_weeks',
  message: ''
};

export default function Contact() {
  const { currentPortraitUrl } = useTheme();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.name.trim()) newErrors.name = 'Full Name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Provide a valid email address';
    }
    if (!form.message.trim()) {
      newErrors.message = 'Please explain your project or describe your website problem';
    } else if (form.message.trim().length < 10) {
      newErrors.message = 'Please describe your request in more detail (at least 10 chars)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API submission
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      setForm(initialForm);
    }, 1500);
  };

  return (
    <section 
      id="contact" 
      ref={containerRef}
      className="py-24 relative overflow-hidden px-4 sm:px-6 lg:px-8 bg-slate-950/20"
    >
      {/* Glow highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Zero-Friction Consultation & Project Brief</span>
          </div>
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Have a Project in <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">Mind?</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto mt-3 leading-relaxed">
            Having a problem with your website, SEO, content, keywords, or backlinks? Don't worry. We diagnose the problem first, explain what went wrong, and recommend the exact right solution.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-600 to-cyan-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact info, Reassurance & Map */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div className="flex items-center space-x-3.5 pb-2 border-b border-slate-800/80">
              <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-cyan-400/80 shadow-lg shadow-cyan-500/20 bg-slate-900 shrink-0">
                <img 
                  src={currentPortraitUrl} 
                  alt="Muhammad Fahad Waqas" 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h3 className="text-white text-lg sm:text-xl font-bold tracking-tight">
                  Muhammad Fahad Waqas
                </h3>
                <p className="text-cyan-400 text-xs font-mono font-medium">
                  Direct Response & Website Repair Channels
                </p>
              </div>
            </div>

            {/* Micro details grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Email */}
              <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-purple-500/30 transition-all duration-300">
                <Mail className="w-5 h-5 text-cyan-400 mb-2" />
                <h4 className="text-slate-400 text-[11px] uppercase tracking-wider font-mono">Email Us</h4>
                <a href="mailto:fahad456677gg@gmail.com" className="text-white text-xs sm:text-sm font-semibold mt-0.5 block hover:text-cyan-400 break-all transition-colors">
                  fahad456677gg@gmail.com
                </a>
              </div>

              {/* Phone / WhatsApp */}
              <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-emerald-500/30 transition-all duration-300">
                <Phone className="w-5 h-5 text-emerald-400 mb-2" />
                <h4 className="text-slate-400 text-[11px] uppercase tracking-wider font-mono">Call / WhatsApp</h4>
                <div className="flex flex-col space-y-0.5 mt-0.5">
                  <a href="https://wa.me/923000610586" target="_blank" rel="noopener noreferrer" className="text-white text-xs sm:text-sm font-semibold hover:text-emerald-400 transition-colors">
                    0300 0610586
                  </a>
                  <a href="https://wa.me/92305762253" target="_blank" rel="noopener noreferrer" className="text-slate-300 text-xs font-semibold hover:text-emerald-400 transition-colors">
                    0305 7562253
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-purple-500/30 transition-all duration-300">
                <MapPin className="w-5 h-5 text-cyan-400 mb-2" />
                <h4 className="text-slate-400 text-[11px] uppercase tracking-wider font-mono">Location</h4>
                <span className="text-white text-xs font-semibold mt-0.5 block">
                  Dara Bakha, Bahawalpur, PK
                </span>
              </div>

              {/* Operating Hrs */}
              <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-purple-500/30 transition-all duration-300">
                <Clock className="w-5 h-5 text-cyan-400 mb-2" />
                <h4 className="text-slate-400 text-[11px] uppercase tracking-wider font-mono">Availability</h4>
                <span className="text-white text-xs font-semibold mt-0.5 block">
                  Mon – Sat (Fast Response)
                </span>
              </div>
            </div>

            {/* Our Problem-Solving Promise Box */}
            <div className="p-5 rounded-2xl bg-slate-900/50 border border-cyan-500/30">
              <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Our 5-Step Client Promise</span>
              </div>
              <ul className="space-y-1.5 text-slate-300 text-xs">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2 font-mono">1.</span>
                  <span><strong>Listen & Understand:</strong> We review your exact requirement or bug description.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2 font-mono">2.</span>
                  <span><strong>Diagnose First:</strong> We isolate root causes before proposing any changes.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2 font-mono">3.</span>
                  <span><strong>Transparent Scope:</strong> We recommend only the service you truly need.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2 font-mono">4.</span>
                  <span><strong>Build & Verify:</strong> Rigorous 11-point testing before final delivery.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2 font-mono">5.</span>
                  <span><strong>Ongoing Support:</strong> Complete walkthrough and post-launch backing.</span>
                </li>
              </ul>
            </div>

            {/* Social icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a 
                href="https://github.com/Fahadthecopy" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white transition-colors hover:border-purple-500/40"
                title="GitHub (@Fahadthecopy)"
              >
                <Github className="w-4.5 h-4.5" />
              </a>
              <a 
                href="https://linkedin.com/in/Fahad-Waqas" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-cyan-400 transition-colors hover:border-cyan-500/40"
                title="LinkedIn"
              >
                <Linkedin className="w-4.5 h-4.5" />
              </a>
              <a 
                href="https://facebook.com/Fahad-Waqas" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-blue-500 transition-colors"
                title="Facebook"
              >
                <Facebook className="w-4.5 h-4.5" />
              </a>
              <a 
                href="https://instagram.com/Fahad-Waqas" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-pink-500 transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Custom Interactive Form (Project Brief) */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-purple-500/20 backdrop-blur-md relative"
            >
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-white text-xl font-bold tracking-tight">
                    Project Brief & Requirement Intake
                  </h3>
                  <p className="text-slate-400 text-xs mt-1">
                    Fill out your project details for an immediate, transparent proposal
                  </p>
                </div>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                {/* 1. Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-slate-400">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleInputChange}
                      className={`w-full px-3.5 py-2 rounded-xl bg-slate-950 border text-slate-200 text-xs focus:outline-none transition-all ${
                        errors.name ? 'border-red-500 focus:border-red-500' : 'border-slate-800 focus:border-purple-500'
                      }`}
                      placeholder="e.g. David Miller"
                    />
                    {errors.name && (
                      <span className="text-[10px] text-red-400 flex items-center mt-0.5">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-slate-400">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleInputChange}
                      className={`w-full px-3.5 py-2 rounded-xl bg-slate-950 border text-slate-200 text-xs focus:outline-none transition-all ${
                        errors.email ? 'border-red-500 focus:border-red-500' : 'border-slate-800 focus:border-purple-500'
                      }`}
                      placeholder="e.g. david@company.com"
                    />
                    {errors.email && (
                      <span className="text-[10px] text-red-400 flex items-center mt-0.5">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* 2. Phone & Existing Website URL */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-slate-400">Phone / WhatsApp</label>
                    <input
                      type="text"
                      name="phone"
                      value={form.phone}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="e.g. +1 (555) 123-4567"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-slate-400">Website URL (if existing)</label>
                    <input
                      type="text"
                      name="websiteUrl"
                      value={form.websiteUrl}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="e.g. https://mybrand.com"
                    />
                  </div>
                </div>

                {/* 3. Service Category, Budget, Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-slate-400">Target Service</label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-purple-500 transition-colors"
                    >
                      <option value="web_development">Web Development</option>
                      <option value="bug_fixing">Bug Fixing & Repairs</option>
                      <option value="complete_seo">Complete Technical SEO</option>
                      <option value="seo_blogging">SEO Blogging & Content</option>
                      <option value="keyword_research">Keyword Research</option>
                      <option value="guest_posting">Guest Posting Strategy</option>
                      <option value="complete_growth">Complete Growth Package</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-slate-400">Budget Scope</label>
                    <select
                      name="budget"
                      value={form.budget}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-purple-500 transition-colors"
                    >
                      <option value="10_25">$10 – $25 (Starter / Quick Fix)</option>
                      <option value="50_100">$50 – $100 (Standard Website)</option>
                      <option value="250">$250 (Advanced Full-Stack)</option>
                      <option value="500_plus">$500+ (Business Solution)</option>
                      <option value="1000_plus">$1,000+ (Custom SaaS / Retainer)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono uppercase text-slate-400">Timeline</label>
                    <select
                      name="timeline"
                      value={form.timeline}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-purple-500 transition-colors"
                    >
                      <option value="urgent_24h">Urgent (24-48 Hours)</option>
                      <option value="1_2_weeks">1 – 2 Weeks</option>
                      <option value="flexible">Flexible / Ongoing</option>
                    </select>
                  </div>
                </div>

                {/* 4. Project description / Issue description */}
                <div className="space-y-1">
                  <label className="text-xs font-mono uppercase text-slate-400">Project or Issue Description *</label>
                  <textarea
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleInputChange}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border text-slate-200 text-xs focus:outline-none transition-all ${
                      errors.message ? 'border-red-500 focus:border-red-500' : 'border-slate-800 focus:border-purple-500'
                    }`}
                    placeholder="Tell us what is broken, what you want to build, or your growth goals..."
                  />
                  {errors.message && (
                    <span className="text-[10px] text-red-400 flex items-center mt-0.5">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Submit row & WhatsApp Quick button */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs shadow-md hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="w-4.5 h-4.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Project Brief</span>
                      </>
                    )}
                  </button>

                  <a
                    href="https://wa.me/923000610586?text=Hi%20Fahad,%20I%20want%20to%20join%20your%20WhatsApp%20Channel!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 font-semibold text-xs hover:border-emerald-400 hover:text-white transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg"
                  >
                    <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                    <span>Join WhatsApp Channel</span>
                  </a>

                  <a
                    href="https://wa.me/923000610586"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 font-semibold text-xs hover:border-slate-500 hover:text-white transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>WhatsApp Direct (03000610586)</span>
                  </a>
                </div>
              </form>

              {/* Glowing success modal */}
              <AnimatePresence>
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 bg-slate-950/95 rounded-2xl flex flex-col items-center justify-center p-6 text-center z-10"
                  >
                    <CheckCircle className="w-14 h-14 text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)] mb-3 animate-bounce" />
                    <h4 className="text-white text-lg font-bold">Project Brief Received!</h4>
                    <p className="text-slate-400 text-xs sm:text-sm max-w-sm mt-2 leading-relaxed">
                      Thank you. We will review your requirements, diagnose the core technical scope, and respond with an exact plan within 12 hours.
                    </p>
                    <button
                      onClick={() => setShowSuccess(false)}
                      className="px-5 py-2 mt-5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-purple-500/40 text-xs transition-colors cursor-pointer"
                    >
                      Close Confirmation
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
