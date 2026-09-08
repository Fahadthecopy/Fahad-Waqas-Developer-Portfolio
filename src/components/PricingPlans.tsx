/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { 
  Check, 
  Sparkles, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Clock, 
  Award, 
  MessageSquare,
  Globe,
  Database,
  Bug,
  Search,
  ExternalLink
} from 'lucide-react';

interface PricingTier {
  id: string;
  name: string;
  badge?: string;
  price: string;
  period?: string;
  targetPrice?: string;
  delivery: string;
  description: string;
  features: string[];
  recommendedFor: string;
  popular?: boolean;
  colorClass: string;
  fiverrGigName: string;
}

const pricingTiers: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter & Quick Fix',
    price: '$10 – $25',
    targetPrice: '$30 – $50',
    delivery: '24 – 48 Hours',
    description: 'Perfect for quick bug fixes, single-page responsive designs, or keyword research sheets to start building trust.',
    features: [
      'HTML / CSS / Bootstrap bug fixing',
      'JavaScript form validation & click errors',
      '1-Page clean responsive landing layout',
      'Keyword Research Excel Sheet (30-50 keywords)',
      'Cross-device mobile testing',
      'Clean, commented source code'
    ],
    recommendedFor: 'Small adjustments, landing pages, quick debugging',
    colorClass: 'from-blue-500 to-cyan-400',
    fiverrGigName: 'Bug Fixing / 1-Page Website'
  },
  {
    id: 'standard',
    name: 'Standard Business',
    badge: 'Most Popular',
    price: '$50 – $100',
    targetPrice: '$150 – $200',
    delivery: '3 – 5 Days',
    description: 'A complete multi-page responsive business or portfolio website with database contact handling and on-page SEO.',
    features: [
      '3 to 5 custom responsive pages',
      'PHP contact form with MySQL database storage',
      'Full On-Page SEO optimization & meta tags',
      'Google Lighthouse Speed Score 90+',
      'Interactive animations & modern aesthetics',
      '2 rounds of detailed revisions included'
    ],
    recommendedFor: 'Small businesses, personal brands, company profiles',
    popular: true,
    colorClass: 'from-purple-500 to-cyan-400',
    fiverrGigName: 'Full Responsive Website'
  },
  {
    id: 'advanced',
    name: 'Advanced Full-Stack',
    price: '$250',
    targetPrice: '$400 – $600',
    delivery: '5 – 7 Days',
    description: 'Custom database-driven web applications with authentication, CRUD administration dashboard, and API integrations.',
    features: [
      'Custom PHP + MySQL web application architecture',
      'Secure User Authentication & Registration (Hashing)',
      'Admin dashboard with CRUD data management',
      'REST API & third-party integrations (Payment, Maps)',
      'SQL injection protection & sanitized queries',
      'Full database schema (.sql) & cPanel deployment support'
    ],
    recommendedFor: 'Portals, directory sites, internal business tools',
    colorClass: 'from-pink-500 to-purple-500',
    fiverrGigName: 'PHP MySQL Custom Web App'
  },
  {
    id: 'business-solution',
    name: 'Business Solution / E-Commerce',
    badge: 'High Value',
    price: '$500+',
    targetPrice: '$800 – $1,200',
    delivery: '10 – 14 Days',
    description: 'Complete e-commerce platform, multi-tier management system, or custom enterprise web app tailored for business scale.',
    features: [
      'Full E-commerce platform / Management CRM system',
      'Multi-role access control (Super Admin, Manager, User)',
      'Product catalog, cart system & payment checkout (Stripe/PayPal)',
      'Interactive D3/Chart analytics reports & PDF invoice export',
      '3 Months SEO launch strategy & indexation setup',
      'Screen-recorded video tutorial for dashboard control'
    ],
    recommendedFor: 'Online stores, corporate SaaS, comprehensive portals',
    colorClass: 'from-emerald-400 to-teal-500',
    fiverrGigName: 'E-Commerce / Custom ERP'
  },
  {
    id: 'retainer',
    name: 'Custom SaaS / Monthly Retainer',
    price: '$1,000+',
    period: '/ month or project',
    delivery: 'Ongoing / Milestone Based',
    description: 'Dedicated full-stack development, ongoing maintenance, bug patches, and continuous SEO growth strategy.',
    features: [
      'Dedicated development hours (15-20 hrs/week)',
      'Priority bug fixing & 24/7 technical monitoring',
      'Monthly technical SEO audits & 8 optimized articles',
      'New feature iterations & continuous database optimization',
      'Direct WhatsApp & Slack priority channel support',
      'Transparent weekly milestone walkthroughs'
    ],
    recommendedFor: 'Established companies, funded startups, long-term partners',
    colorClass: 'from-amber-400 to-orange-500',
    fiverrGigName: 'Enterprise SaaS & Retainer'
  }
];

const fiverrCoreGigs = [
  {
    id: 'gig-1',
    title: 'Full Stack Website Development',
    price: '$25',
    icon: Globe,
    description: 'Responsive, high-converting websites using HTML5, CSS3, JavaScript, PHP & MySQL with dynamic database integration.',
    tags: ['Full Stack', 'PHP', 'MySQL', 'Responsive']
  },
  {
    id: 'gig-2',
    title: 'PHP MySQL Web Application',
    price: '$20',
    icon: Database,
    description: 'Custom CRUD systems, admin dashboards, user authentication, and secure database architecture with clean code.',
    tags: ['PHP App', 'MySQL', 'CRUD', 'Admin Panel']
  },
  {
    id: 'gig-3',
    title: 'Website Bug Fixing & Responsive Fix',
    price: '$10',
    icon: Bug,
    description: 'Fast debugging for layout breaks, JavaScript errors, mobile responsiveness, and form submission faults within hours.',
    tags: ['Bug Fix', 'CSS', 'JavaScript', 'Bootstrap']
  },
  {
    id: 'gig-4',
    title: 'SEO Audit & Keyword Research',
    price: '$15',
    icon: Search,
    description: 'Comprehensive technical SEO audit report, competitor analysis, actionable on-page recommendations & keyword research.',
    tags: ['SEO Audit', 'Keywords', 'On-Page', 'Technical']
  }
];

export default function PricingPlans() {
  const [selectedPlan, setSelectedPlan] = useState<string>('standard');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  const handleScrollToContact = (planName: string) => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="pricing" 
      ref={containerRef}
      className="py-24 relative overflow-hidden px-4 sm:px-6 lg:px-8 bg-slate-950/40"
    >
      {/* Background glow flares */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-br from-purple-600/10 via-cyan-500/10 to-transparent rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transparent Pricing & Value Ladder</span>
          </div>
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Flexible Plans for Every <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">Project Stage</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed">
            From quick $10 bug fixes to complete $1,000+ full-stack business solutions, I provide transparent pricing, rapid turnaround, and 100% satisfaction guarantee on Fiverr & Upwork.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-cyan-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* 4 Core Fiverr Gigs Quick Spotlight */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <h3 className="text-white text-xl font-bold tracking-tight">
              4 Core Fiverr & Upwork Services
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Directly aligned with top-demand categories on Fiverr & Upwork
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {fiverrCoreGigs.map((gig, idx) => {
              const Icon = gig.icon;
              return (
                <motion.div
                  key={gig.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-purple-500/40 hover:bg-slate-900/80 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="p-2.5 rounded-xl bg-purple-950/60 border border-purple-500/20 text-cyan-400 group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                        From {gig.price}
                      </span>
                    </div>

                    <h4 className="text-white text-base font-bold group-hover:text-cyan-400 transition-colors">
                      {gig.title}
                    </h4>
                    <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                      {gig.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/60">
                    <div className="flex flex-wrap gap-1 mb-3">
                      {gig.tags.map(t => (
                        <span key={t} className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                          {t}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => handleScrollToContact(gig.title)}
                      className="w-full py-2 rounded-lg bg-slate-800/80 hover:bg-gradient-to-r hover:from-purple-600 hover:to-cyan-500 text-slate-200 hover:text-white text-xs font-semibold transition-all duration-300 flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <span>Order This Gig</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Complete Pricing Matrix Cards */}
        <div className="text-center mb-10">
          <h3 className="text-white text-2xl font-bold tracking-tight">
            Detailed Project Packages & Deliverables
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Choose the package that fits your current scope or request a tailored estimate
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier, idx) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className={`rounded-3xl p-7 flex flex-col justify-between relative transition-all duration-300 ${
                tier.popular
                  ? 'bg-gradient-to-b from-purple-950/40 via-slate-900/90 to-slate-950 border-2 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.15)] scale-105 z-10'
                  : 'bg-slate-900/40 border border-slate-800 hover:border-purple-500/30 hover:bg-slate-900/60'
              }`}
            >
              {/* Badge */}
              {tier.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-[11px] font-bold tracking-wide uppercase shadow-md flex items-center space-x-1">
                  <Zap className="w-3 h-3" />
                  <span>{tier.badge}</span>
                </div>
              )}

              <div>
                {/* Header info */}
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-white text-xl font-bold tracking-tight">
                    {tier.name}
                  </h4>
                </div>

                <p className="text-slate-400 text-xs leading-relaxed mb-6 min-h-[36px]">
                  {tier.description}
                </p>

                {/* Price block */}
                <div className="mb-6 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                  <div className="flex items-baseline">
                    <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                      {tier.price}
                    </span>
                    {tier.period && (
                      <span className="text-xs text-slate-400 ml-1.5">{tier.period}</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/50 text-[11px]">
                    <span className="text-slate-400 flex items-center">
                      <Clock className="w-3 h-3 text-cyan-400 mr-1" />
                      {tier.delivery}
                    </span>
                    <span className="text-purple-400 font-mono">
                      Target: {tier.targetPrice}
                    </span>
                  </div>
                </div>

                {/* Features checklist */}
                <div className="space-y-3 mb-6">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                    What's Included:
                  </span>
                  <ul className="space-y-2.5">
                    {tier.features.map((feat, fIdx) => (
                      <li key={fIdx} className="text-xs text-slate-300 flex items-start">
                        <Check className="w-3.5 h-3.5 text-cyan-400 mr-2 mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button & Recommended Tag */}
              <div className="pt-4 border-t border-slate-800/60">
                <div className="text-[11px] text-slate-500 italic mb-3 text-center">
                  Best for: {tier.recommendedFor}
                </div>

                <button
                  onClick={() => handleScrollToContact(tier.name)}
                  className={`w-full py-3 rounded-xl font-bold text-xs shadow-md transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer ${
                    tier.popular
                      ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] hover:scale-105'
                      : 'bg-slate-800 hover:bg-purple-600 text-white hover:shadow-lg'
                  }`}
                >
                  <span>Select {tier.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Guarantees & Trust Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-3xl bg-slate-900/30 border border-slate-800 backdrop-blur-md">
          <div className="flex items-center space-x-3.5">
            <div className="p-3 rounded-2xl bg-cyan-950/50 border border-cyan-500/30 text-cyan-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-white text-sm font-bold">100% Quality Guarantee</h5>
              <p className="text-slate-400 text-xs mt-0.5">Free revisions until you are completely satisfied with the delivery.</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="p-3 rounded-2xl bg-purple-950/50 border border-purple-500/30 text-purple-400">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-white text-sm font-bold">On-Time Fast Delivery</h5>
              <p className="text-slate-400 text-xs mt-0.5">Strict adherence to milestones with proactive daily progress updates.</p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="p-3 rounded-2xl bg-emerald-950/50 border border-emerald-500/30 text-emerald-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-white text-sm font-bold">Clean, Maintainable Code</h5>
              <p className="text-slate-400 text-xs mt-0.5">W3C valid standards, secure backend SQL, and responsive mobile architecture.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
