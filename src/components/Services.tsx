/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { 
  Globe, 
  UserSquare2, 
  Layout, 
  PenTool, 
  Settings, 
  ShoppingCart, 
  Share2, 
  MonitorSmartphone, 
  Search, 
  ShieldAlert
} from 'lucide-react';

interface Service {
  title: string;
  description: string;
  icon: any;
  features: string[];
}

const servicesData: Service[] = [
  {
    title: 'Business Websites',
    description: 'Custom corporate and business websites designed to represent your brand, establish authority, and convert visitors into active customers.',
    icon: Globe,
    features: ['Modern UI/UX Designs', 'Speed & Performance Optimized', 'SEO-Ready Out-of-the-Box']
  },
  {
    title: 'Developer & Portfolio Websites',
    description: 'Stunning personal and professional portfolio designs that showcase your skills, projects, and bio in a highly interactive environment.',
    icon: UserSquare2,
    features: ['High-Fidelity Animations', 'Glassmorphism Style', 'Downloadable Resume Integrations']
  },
  {
    title: 'Landing Pages',
    description: 'Laser-focused single-page marketing funnels built to capture leads, promote specific products, or drive downloads with high conversions.',
    icon: Layout,
    features: ['A/B Tested CTA Placements', 'Super-fast load speeds', 'Form validations & workflows']
  },
  {
    title: 'Blog Websites & CMS',
    description: 'Clean, structured, and easy-to-manage blogging portals or custom content management systems designed for content writers and brands.',
    icon: PenTool,
    features: ['Category & Tag structures', 'SEO-optimized articles', 'Interactive reading view modes']
  },
  {
    title: 'Admin Dashboards',
    description: 'Powerful control panels and internal data visualizations to manage products, users, statistics, or customer queries with ease.',
    icon: Settings,
    features: ['D3 / Recharts Dashboards', 'Database Integrations (MySQL)', 'Multi-user auth systems']
  },
  {
    title: 'E-Commerce Applications',
    description: 'Fully featured shopping experiences with custom catalogs, shopping carts, checkout configurations, and clean admin controls.',
    icon: ShoppingCart,
    features: ['Custom Checkout Workflows', 'Product Filters & Search', 'Database-driven inventories']
  },
  {
    title: 'API Integrations',
    description: 'Connecting third-party external REST APIs, social networks, maps, or analytical software workflows safely into your web applications.',
    icon: Share2,
    features: ['Robust Error Handling', 'Server-Side proxies', 'Live data syncing and pipelines']
  },
  {
    title: 'Responsive Redesigns',
    description: 'Modernizing outdated templates into mobile-first, high-performance responsive interfaces that adapt perfectly to all desktop, tablet, and mobile screens.',
    icon: MonitorSmartphone,
    features: ['Touch-friendly triggers', 'Fluid viewport scale-down', 'Clean, updated aesthetic']
  },
  {
    title: 'SEO & Content Services',
    description: 'In-depth keyword audits, technical SEO on-page optimizations, metadata enhancements, indexation workflows, and content updates to rank higher on search engines.',
    icon: Search,
    features: ['Keyword Competitor Audits', 'Strict Schema.org tags', 'Sitemap and Robots setups']
  },
  {
    title: 'Maintenance & Troubleshooting',
    description: 'Full layout corrections, bug fixes, dead-link repair, code refactoring, version updates, and active optimization audits for running apps.',
    icon: ShieldAlert,
    features: ['Deep log-level analysis', 'Security vulnerability patches', 'Ongoing reliability support']
  }
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  return (
    <section 
      id="services" 
      ref={containerRef}
      className="py-24 relative overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 bg-slate-950/10 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2 drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]">
            03 / Value Provision
          </h3>
          <h2 className="text-white text-3xl sm:text-4xl font-bold tracking-tight">
            Services & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">What I Can Build</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-600 to-cyan-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Services Bento-like Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-purple-500/30 hover:bg-slate-900/60 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] transition-all duration-300 flex flex-col justify-between group cursor-default"
              >
                <div>
                  {/* Glowing Icon Header */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-950/40 to-cyan-950/40 border border-purple-500/20 flex items-center justify-center mb-6 shadow-md group-hover:border-cyan-400/50 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all duration-300">
                    <Icon className="w-6 h-6 text-purple-400 group-hover:text-cyan-400 transition-colors" />
                  </div>

                  {/* Title */}
                  <h3 className="text-white text-lg font-bold tracking-wide group-hover:text-cyan-400 transition-colors mb-3">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Features list */}
                <ul className="space-y-2 border-t border-slate-800/60 pt-4">
                  {service.features.map(feat => (
                    <li key={feat} className="text-xs text-slate-500 flex items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-2 shrink-0 animate-pulse" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
