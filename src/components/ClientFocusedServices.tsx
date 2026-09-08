/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { 
  Globe, 
  Search, 
  PenTool, 
  KeyRound, 
  Link2, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Check, 
  Smartphone, 
  Gauge, 
  ShieldCheck, 
  Database, 
  Sparkles, 
  HelpCircle, 
  Wrench, 
  Phone,
  Layers,
  Code2,
  FileText,
  TrendingUp,
  Cpu,
  MonitorCheck,
  Server,
  Zap,
  ChevronDown,
  Play,
  Download,
  FileCode,
  FileSpreadsheet,
  BarChart3,
  ExternalLink,
  CreditCard,
  Lock,
  RefreshCw,
  SlidersHorizontal,
  Compass,
  MessageSquare
} from 'lucide-react';

type ServiceId = 'web-dev' | 'seo' | 'blogging' | 'keywords' | 'guest-posting';

interface DiagnosticItem {
  id: string;
  category: 'web' | 'payment' | 'seo' | 'blogging' | 'keywords' | 'guest-posting' | 'bugs' | 'speed' | 'security' | 'api';
  categoryLabel: string;
  question: string;
  rootCause: string;
  whatWeCheck: string[];
  solution: string;
  recommendedService: string;
  startingPrice: string;
}

const diagnosticDatabase: DiagnosticItem[] = [
  {
    id: 'pay-1',
    category: 'payment',
    categoryLabel: 'Payment & Orders',
    question: 'Payment succeeded, but the customer order is not created or saved in the database?',
    rootCause: 'Webhook asynchronous handshake failure, unhandled database transaction rollback, or missing return-URL callback listener in the PHP/Node backend.',
    whatWeCheck: [
      'Stripe/PayPal webhook signature verification & event parsing logs',
      'PHP database INSERT query PDO parameters & exception traps',
      'Database foreign key constraints & duplicate transaction ID checks',
      'User session state persistence after 3rd-party checkout redirection'
    ],
    solution: 'Implement idempotent webhook listener with automated retry queue, transactional database writes, and instant email confirmation trigger.',
    recommendedService: 'PHP + MySQL Payment & Order Debugging',
    startingPrice: 'Starting from $25'
  },
  {
    id: 'pay-2',
    category: 'payment',
    categoryLabel: 'Payment & Orders',
    question: 'Payment status gets stuck on "Pending" or shows "Failed" after successful deduction?',
    rootCause: 'Silent server timeout, race conditions between frontend redirects and backend webhooks, or unhandled payment intent statuses.',
    whatWeCheck: [
      'Payment gateway API webhook payload status codes',
      'Backend cron jobs & pending order reconciler scripts',
      'Browser CORS policies blocking async status confirmation'
    ],
    solution: 'Re-architect backend state machine with real-time polling fallback, instant webhook synchronization, and automated receipt dispatches.',
    recommendedService: 'Payment Gateway Integration Fix',
    startingPrice: 'Starting from $25'
  },
  {
    id: 'web-1',
    category: 'web',
    categoryLabel: 'Web Development',
    question: 'My website layout breaks completely on mobile screens and tablets?',
    rootCause: 'Hardcoded CSS pixel widths, missing viewport meta tags, uncontained flexbox/grid containers, or overlapping media queries.',
    whatWeCheck: [
      'Viewport meta tag configuration `<meta name="viewport"...>`',
      'CSS overflow-x containers causing horizontal scrollbars',
      'Bootstrap/Tailwind responsive breakpoint consistency (sm, md, lg)',
      'Touch target sizes for navigation buttons and interactive menus'
    ],
    solution: 'Re-code CSS using fluid typography (clamp), responsive flex/grid layouts, and test across 10+ standard mobile and tablet resolutions.',
    recommendedService: 'Mobile Responsive Redesign & CSS Fix',
    startingPrice: 'Starting from $10 – $25'
  },
  {
    id: 'web-2',
    category: 'web',
    categoryLabel: 'Web Development',
    question: 'PHP 500 Internal Server Error or white screen of death on web pages?',
    rootCause: 'Fatal syntax errors, unhandled exceptions, database connection timeouts, memory exhaustion, or incompatible PHP version extensions.',
    whatWeCheck: [
      'Server error log analysis (`/var/log/nginx/error.log` / `error_log`)',
      'Database credentials and PDO error mode exception handling',
      'Missing PHP extensions (mbstring, pdo_mysql, curl, gd)',
      'File & directory permissions (`chmod 755/644`)'
    ],
    solution: 'Isolate error in safe sandbox, refactor deprecated PHP calls, add robust try-catch blocks, and restore 100% uptime with clean error logging.',
    recommendedService: 'Emergency PHP Server & Code Fix',
    startingPrice: 'Starting from $10 – $25'
  },
  {
    id: 'seo-1',
    category: 'seo',
    categoryLabel: 'Complete SEO',
    question: 'Why isn\'t my website ranking or appearing on Google search results?',
    rootCause: 'Robots.txt disallowing crawlers, missing XML sitemaps, noindex meta tags, lack of keyword targeting, poor domain architecture, or missing Google Search Console validation.',
    whatWeCheck: [
      'Indexation status in Google Search Console (Coverage & Crawl logs)',
      'Robots.txt & XML sitemap validity & canonical URL tags',
      'Title, H1 hierarchy, and meta description search-intent alignment',
      'Page speed benchmarks, mobile usability & Core Web Vitals'
    ],
    solution: 'Execute complete 30-point Technical & On-Page SEO audit, eliminate index blockers, optimize title/heading structures, and submit clean XML sitemaps.',
    recommendedService: 'Complete Technical & On-Page SEO Audit',
    startingPrice: 'Starting from $50'
  },
  {
    id: 'seo-2',
    category: 'seo',
    categoryLabel: 'Complete SEO',
    question: 'Organic search traffic suddenly dropped over the past 3-6 months?',
    rootCause: 'Search intent misalignment, outdated content, keyword cannibalization across duplicate pages, broken redirects, or algorithmic search updates.',
    whatWeCheck: [
      'Google Search Console click/impression historical trend lines',
      '404 broken URLs and unhandled 301 redirect chains',
      'Topical authority decay compared to active ranking competitors',
      'Mobile rendering and cumulative layout shifts (CLS)'
    ],
    solution: 'Conduct historical keyword gap analysis, consolidate competing pages with 301 redirects, update content depth, and rebuild internal linking silos.',
    recommendedService: 'SEO Recovery & Technical Optimization',
    startingPrice: 'Starting from $50 – $100'
  },
  {
    id: 'blog-1',
    category: 'blogging',
    categoryLabel: 'SEO Blogging',
    question: 'Did unedited AI-generated articles fail to rank or bring qualified readers?',
    rootCause: 'Thin content, repetitive generic phrasing, lack of unique insights/examples, keyword stuffing, and failure to satisfy direct commercial or informational search intent.',
    whatWeCheck: [
      'Search intent classification (Informational vs Commercial vs Transactional)',
      'Heading readability hierarchy (H1 -> H2 -> H3 logical flow)',
      'Actionable data points, real-world examples, and original FAQ schemas',
      'Internal links pointing directly to relevant service conversion pages'
    ],
    solution: 'Implement human-crafted 12-step content pipeline: comprehensive topic research, verified intent targeting, structured outline, original examples, and internal linking.',
    recommendedService: 'Intent-Matched SEO Article Writing',
    startingPrice: 'Starting from $25 / article'
  },
  {
    id: 'key-1',
    category: 'keywords',
    categoryLabel: 'Keyword Research',
    question: 'Targeted high search volume keywords but got zero business conversions or sales?',
    rootCause: 'High-volume head terms are often too generic, high in competition, and dominated by searchers looking for free definitions rather than paying clients.',
    whatWeCheck: [
      'Commercial & transactional search intent of target keywords',
      'Keyword Difficulty (KD) vs. current domain authority capabilities',
      'Long-tail question queries and high-intent buyer modifiers',
      'Competitor ranking gaps in high-converting niche subtopics'
    ],
    solution: 'Construct an Intent-Driven Keyword Matrix prioritizing realistic low-KD, high-commercial value long-tail terms that connect directly to your core services.',
    recommendedService: 'Search-Intent Keyword Strategy Sheet',
    startingPrice: 'Starting from $15 – $35'
  },
  {
    id: 'guest-1',
    category: 'guest-posting',
    categoryLabel: 'Guest Posting & Links',
    question: 'Acquired backlinks in the past but saw zero referral traffic or ranking boost?',
    rootCause: 'Links placed on irrelevant private blog networks (PBNs), de-indexed farm sites, buried in footer widgets, or linking domains have expired/vanished.',
    whatWeCheck: [
      'Live status of existing backlinks and linking domain health',
      'Niche relevance and organic readership of publication websites',
      'Editorial contextual integration within genuinely read articles',
      'Anchor text diversity to prevent over-optimization flags'
    ],
    solution: 'Design an ethical outreach blueprint: target authoritative niche-relevant publications with genuine human readers, editorial value, and contextual relevance.',
    recommendedService: 'Ethical Guest Posting & Outreach Strategy',
    startingPrice: 'Starting from $50'
  },
  {
    id: 'speed-1',
    category: 'speed',
    categoryLabel: 'Speed & Core Vitals',
    question: 'Website takes more than 3-4 seconds to load and fails Google Core Web Vitals?',
    rootCause: 'Uncompressed raw images (5MB+ PNGs), render-blocking JavaScript/CSS files, lack of browser caching, and slow server response time (TTFB).',
    whatWeCheck: [
      'Largest Contentful Paint (LCP), Interaction to Next Paint (INP), CLS',
      'Asset payload sizes and modern format adoption (WebP, AVIF)',
      'JavaScript bundles blocking the main thread during initial parse',
      'Gzip/Brotli compression & HTTP/2 protocol enablement'
    ],
    solution: 'Optimize assets to WebP, defer non-critical scripts, eliminate layout shifts, configure browser cache headers, and achieve Google Lighthouse 90+ score.',
    recommendedService: 'Core Web Vitals & Speed Optimization',
    startingPrice: 'Starting from $25 – $50'
  },
  {
    id: 'sec-1',
    category: 'security',
    categoryLabel: 'Security & Auth',
    question: 'Need secure user registration, password hashing, and admin role permissions?',
    rootCause: 'Storing plaintext passwords, SQL injection vulnerabilities from direct string queries, and lack of session authorization checks on admin routes.',
    whatWeCheck: [
      'Password hashing using PHP `password_hash()` (Bcrypt / Argon2id)',
      'PDO parameterized prepared statements preventing SQL injections',
      'Session security flags (HttpOnly, SameSite, Secure cookies)',
      'CSRF token validation on all POST/PUT form submissions'
    ],
    solution: 'Engineer hardened PHP/MySQL authentication system with secure password hashing, role-based access control (RBAC), and sanitization.',
    recommendedService: 'PHP + MySQL Secure Auth & Admin Panel',
    startingPrice: 'Starting from $50 – $250'
  },
  {
    id: 'api-1',
    category: 'api',
    categoryLabel: 'REST API & Webhooks',
    question: 'Third-party API integration or webhooks failing intermittently?',
    rootCause: 'Unhandled API rate limits, missing authentication bearer headers, unhandled JSON parsing errors, or mismatched payload schemas.',
    whatWeCheck: [
      'HTTP status codes (401 Unauthorized, 429 Too Many Requests, 502 Bad Gateway)',
      'cURL / Axios request headers and timeout configurations',
      'JSON decode error handling (`json_last_error()`)',
      'Webhook payload cryptographic signature verification'
    ],
    solution: 'Build resilient API integration layer with automated retries, rate limit throttling, structured error logging, and verified webhook listeners.',
    recommendedService: 'REST API Integration & Webhook Debugging',
    startingPrice: 'Starting from $25 – $75'
  }
];

export default function ClientFocusedServices() {
  const [activeTab, setActiveTab] = useState<ServiceId>('web-dev');
  const [activeDiagCategory, setActiveDiagCategory] = useState<string>('all');
  const [diagnosticSearch, setDiagnosticSearch] = useState<string>('');
  const [expandedDiag, setExpandedDiag] = useState<string | null>('pay-1');
  const [activeVideoModal, setActiveVideoModal] = useState<{ title: string; type: string; details: string } | null>(null);
  
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.05 });

  const handleScrollToContact = (serviceName?: string) => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Safe file downloader for sample resources
  const handleDownloadResource = (filename: string, content: string, fileType = 'text/plain') => {
    const blob = new Blob([content], { type: fileType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Filter diagnostics
  const filteredDiagnostics = diagnosticDatabase.filter(item => {
    const matchesCategory = activeDiagCategory === 'all' || item.category === activeDiagCategory;
    const matchesSearch = diagnosticSearch === '' || 
      item.question.toLowerCase().includes(diagnosticSearch.toLowerCase()) ||
      item.rootCause.toLowerCase().includes(diagnosticSearch.toLowerCase()) ||
      item.solution.toLowerCase().includes(diagnosticSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section 
      id="services" 
      ref={containerRef}
      className="py-24 relative overflow-hidden px-4 sm:px-6 lg:px-8 bg-slate-950/40"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-purple-600/10 via-cyan-500/10 to-transparent rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* 1. Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Problem-Solver & Growth Engine</span>
          </div>
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            What Do You Need? <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">Diagnosis & Solutions</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-3xl mx-auto mt-4 leading-relaxed">
            Select your exact business requirement below to explore root cause diagnostics, technical solutions, interactive demo walk-throughs, and downloadable sample deliverables.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-cyan-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* 2. 5 Big Interactive Service Cards */}
        <div className="mb-20">
          <div className="text-center mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-300">
              Select Your Requirement Below
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                id: 'web-dev' as ServiceId,
                title: 'Web Development',
                badge: 'Engineering',
                desc: 'Need a website, custom PHP/MySQL web application, redesign, or urgent bug fix?',
                icon: Globe,
                color: 'from-blue-500 to-cyan-400'
              },
              {
                id: 'seo' as ServiceId,
                title: 'Complete SEO',
                badge: 'Visibility',
                desc: 'Need technical SEO, on-page optimization, site hierarchy, and search indexation?',
                icon: Search,
                color: 'from-purple-500 to-pink-500'
              },
              {
                id: 'blogging' as ServiceId,
                title: 'SEO Blogging',
                badge: 'Content',
                desc: 'Need well-researched, search-intent matched, and structured articles that convert?',
                icon: PenTool,
                color: 'from-emerald-400 to-teal-500'
              },
              {
                id: 'keywords' as ServiceId,
                title: 'Keyword Research',
                badge: 'Strategy',
                desc: 'Need high-intent, low-competition keywords aligned with paying business clients?',
                icon: KeyRound,
                color: 'from-amber-400 to-orange-500'
              },
              {
                id: 'guest-posting' as ServiceId,
                title: 'Guest Posting',
                badge: 'Authority',
                desc: 'Need relevant publications, outreach, referral traffic, and ethical link opportunities?',
                icon: Link2,
                color: 'from-pink-500 to-rose-500'
              }
            ].map(srv => {
              const Icon = srv.icon;
              const isActive = activeTab === srv.id;
              return (
                <button
                  key={srv.id}
                  onClick={() => setActiveTab(srv.id)}
                  className={`p-5 rounded-2xl text-left transition-all duration-300 flex flex-col justify-between cursor-pointer border relative overflow-hidden group ${
                    isActive 
                      ? 'bg-slate-900/90 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.25)] scale-105 z-10' 
                      : 'bg-slate-900/40 border-slate-800 hover:border-purple-500/40 hover:bg-slate-900/70'
                  }`}
                >
                  {isActive && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-400" />
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2.5 rounded-xl bg-gradient-to-br ${srv.color} text-white shadow-md group-hover:scale-110 transition-transform`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/20 uppercase">
                        {srv.badge}
                      </span>
                    </div>

                    <h3 className="text-white text-base font-bold group-hover:text-cyan-400 transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                      {srv.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold">
                    <span className={isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-white'}>
                      Explore Service
                    </span>
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'text-cyan-400 translate-x-1' : 'text-slate-500 group-hover:translate-x-1'}`} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Deep Service Pillars */}
        <div className="mb-24">
          <AnimatePresence mode="wait">
            
            {/* PILLAR 1: Web Development */}
            {activeTab === 'web-dev' && (
              <motion.div
                key="web-dev"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-10"
              >
                {/* Banner */}
                <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
                  <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">
                    <div>
                      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-950/40 border border-blue-500/30 text-cyan-400 text-xs font-mono mb-2">
                        <Globe className="w-3.5 h-3.5" />
                        <span>Core Service 01 / Web Development & Bug Fixing</span>
                      </div>
                      <h3 className="text-white text-2xl sm:text-3xl font-bold tracking-tight">
                        Is Your Website Losing Visitors Because of Technical Problems?
                      </h3>
                      <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
                        From critical JavaScript bugs to complete database-backed web portals, I engineer fast, resilient, and responsive web platforms built for business conversion.
                      </p>
                    </div>

                    <button
                      onClick={() => handleScrollToContact('Web Development')}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs shadow-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all cursor-pointer shrink-0 flex items-center justify-center space-x-2"
                    >
                      <Wrench className="w-4 h-4" />
                      <span>Start Your Web Project</span>
                    </button>
                  </div>
                </div>

                {/* Common Technical Problems */}
                <div className="p-8 rounded-3xl bg-slate-900/40 border border-red-500/20">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2.5 rounded-xl bg-red-950/60 border border-red-500/30 text-red-400">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-white text-lg font-bold">Common Website Failures We Diagnose & Resolve</h4>
                      <p className="text-slate-400 text-xs">Technical bottlenecks that cause client abandonment and lost conversions:</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {[
                      'Slow loading times causing high visitor bounce rates',
                      'Broken mobile responsiveness and viewport scaling issues',
                      'CSS layout conflicts and overlapping navigation elements',
                      'JavaScript console errors disabling buttons and modals',
                      'Broken contact forms and failed email delivery scripts',
                      'PHP 500 internal server errors and white screens of death',
                      'Database connection failures and SQL syntax crashes',
                      'User login and password authentication breakdown',
                      'Missing or unsecure admin management panel',
                      'Third-party REST API integration & webhook failures',
                      'Security vulnerabilities (SQL Injection & XSS risks)',
                      'Broken 404 links and unhandled routing endpoints'
                    ].map((prob, pIdx) => (
                      <div key={pIdx} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start space-x-2.5">
                        <span className="text-red-400 font-bold text-xs shrink-0 mt-0.5">✕</span>
                        <span className="text-slate-300 text-xs leading-relaxed">{prob}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* My Process */}
                <div className="p-8 rounded-3xl bg-slate-900/40 border border-cyan-500/20">
                  <div className="text-center mb-8">
                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                      Execution Blueprint
                    </span>
                    <h4 className="text-white text-xl sm:text-2xl font-bold mt-1">
                      Find → Diagnose → Fix → Optimize → Test → Deliver
                    </h4>
                    <p className="text-slate-400 text-xs mt-1">
                      A systematic engineering workflow ensuring zero regressions and high reliability
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {[
                      { step: '01', title: 'Find', desc: 'Identify root error' },
                      { step: '02', title: 'Diagnose', desc: 'Isolate code failure' },
                      { step: '03', title: 'Fix', desc: 'Write clean solution' },
                      { step: '04', title: 'Optimize', desc: 'Boost speed & security' },
                      { step: '05', title: 'Test', desc: 'Cross-device verification' },
                      { step: '06', title: 'Deliver', desc: 'Production deployment' }
                    ].map((st, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-center relative overflow-hidden">
                        <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 font-mono">
                          {st.step}
                        </div>
                        <div className="text-white text-sm font-bold mt-1">{st.title}</div>
                        <div className="text-slate-400 text-[11px] mt-1">{st.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Video Demo & Interactive Previews */}
                <div className="p-8 rounded-3xl bg-slate-900/30 border border-slate-800">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h4 className="text-white text-lg font-bold">Interactive Previews & Visual Demos</h4>
                      <p className="text-slate-400 text-xs">Inspect implementation code walk-throughs and download working snippets</p>
                    </div>
                    <span className="text-xs font-mono text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded border border-cyan-500/20">
                      6 Video Demos Available
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      {
                        title: 'Responsive Website Development',
                        tag: 'HTML5 / CSS3 / JS',
                        desc: 'Cross-device fluid layout scaling from 320px mobile to 4K desktop displays.',
                        demoCode: `<!-- Fluid Responsive Header -->\n<header class="w-full bg-slate-900 border-b border-slate-800">\n  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">\n    <a href="#" class="text-xl font-bold text-white">Brand<span class="text-cyan-400">.</span></a>\n    <nav class="hidden md:flex space-x-6 text-sm font-medium text-slate-300">\n      <a href="#services" class="hover:text-cyan-400">Services</a>\n      <a href="#projects" class="hover:text-cyan-400">Projects</a>\n      <a href="#contact" class="hover:text-cyan-400">Contact</a>\n    </nav>\n  </div>\n</header>`
                      },
                      {
                        title: 'PHP + MySQL CRUD Architecture',
                        tag: 'PHP / PDO / MySQL',
                        desc: 'Secure parameterized database queries with Bcrypt authentication.',
                        demoCode: `<?php\n// Secure PDO Database Connection\n$dsn = "mysql:host=localhost;dbname=portal_db;charset=utf8mb4";\n$options = [\n  PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,\n  PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,\n  PDO::ATTR_EMULATE_PREPARES => false\n];\n$pdo = new PDO($dsn, "db_user", "secure_pass", $options);\n\n// Safe Parameterized Query\n$stmt = $pdo->prepare("SELECT id, name, email FROM users WHERE email = :email");\n$stmt->execute(['email' => $cleanEmail]);\n$user = $stmt->fetch();`
                      },
                      {
                        title: 'Admin Analytics Dashboard',
                        tag: 'React / D3.js / Node',
                        desc: 'Real-time revenue metrics, user logs, and interactive chart panels.',
                        demoCode: `// Real-Time Analytics Fetch Hook\nexport const useDashboardMetrics = () => {\n  const [data, setData] = useState(null);\n  useEffect(() => {\n    fetch('/api/admin/metrics', {\n      headers: { 'Authorization': \`Bearer \${authToken}\` }\n    })\n      .then(res => res.json())\n      .then(json => setData(json));\n  }, []);\n  return data;\n};`
                      },
                      {
                        title: 'JavaScript Bug Fix & Event Loop',
                        tag: 'Vanilla JS / Async',
                        desc: 'Resolving asynchronous race conditions, memory leaks, and DOM bugs.',
                        demoCode: `// Debounced Search Handler to prevent API flood\nfunction debounce(fn, delay = 300) {\n  let timeoutId;\n  return function (...args) {\n    clearTimeout(timeoutId);\n    timeoutId = setTimeout(() => fn.apply(this, args), delay);\n  };\n}`
                      },
                      {
                        title: 'Secure REST API Integration',
                        tag: 'Express / JWT / REST',
                        desc: 'Stateless JWT middleware with token refresh and rate limiting.',
                        demoCode: `// Express JWT Authentication Middleware\nfunction authenticateToken(req, res, next) {\n  const authHeader = req.headers['authorization'];\n  const token = authHeader && authHeader.split(' ')[1];\n  if (!token) return res.status(401).json({ error: 'Access token required' });\n  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {\n    if (err) return res.status(403).json({ error: 'Token invalid or expired' });\n    req.user = user;\n    next();\n  });\n}`
                      },
                      {
                        title: 'Speed & Core Web Vitals Optimization',
                        tag: 'Lighthouse 95+',
                        desc: 'Asset minification, lazy loading, and critical CSS rendering.',
                        demoCode: `<!-- Performance Preload & Font Optimization -->\n<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>\n<link rel="preconnect" href="https://fonts.googleapis.com">\n<img src="hero.webp" width="1200" height="600" fetchpriority="high" alt="Optimized Hero">`
                      }
                    ].map((vid, vIdx) => (
                      <div key={vIdx} className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between group hover:border-cyan-500/40 transition-all">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] font-mono text-purple-400 bg-purple-950/40 px-2 py-0.5 rounded border border-purple-500/20">
                              {vid.tag}
                            </span>
                            <span className="flex items-center text-xs text-cyan-400">
                              <Play className="w-3 h-3 mr-1" /> Preview
                            </span>
                          </div>
                          <h5 className="text-white text-sm font-bold group-hover:text-cyan-400 transition-colors">
                            {vid.title}
                          </h5>
                          <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                            {vid.desc}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                          <button
                            onClick={() => setActiveVideoModal({ title: vid.title, type: vid.tag, details: vid.demoCode })}
                            className="flex-1 py-1.5 rounded-lg bg-slate-900 hover:bg-purple-600 text-slate-200 hover:text-white text-[11px] font-semibold transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                          >
                            <FileCode className="w-3 h-3" />
                            <span>View Code</span>
                          </button>
                          
                          <button
                            onClick={() => handleDownloadResource(`${vid.title.toLowerCase().replace(/\s+/g, '-')}-snippet.js`, vid.demoCode, 'text/javascript')}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-cyan-600 text-slate-400 hover:text-white transition-colors cursor-pointer"
                            title="Download Code Snippet"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h5 className="text-white text-sm font-bold">Core Web Development Technologies</h5>
                    <p className="text-slate-400 text-xs">Modern standards with clean syntax and cross-browser compatibility</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['HTML5', 'CSS3', 'Bootstrap 5', 'Tailwind CSS', 'JavaScript (ES6+)', 'PHP Core/OOP', 'MySQL Database', 'REST APIs'].map(t => (
                      <span key={t} className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-cyan-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* PILLAR 2: Complete SEO */}
            {activeTab === 'seo' && (
              <motion.div
                key="seo"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-10"
              >
                {/* Banner */}
                <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
                  <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">
                    <div>
                      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-mono mb-2">
                        <Search className="w-3.5 h-3.5" />
                        <span>Core Service 02 / Complete Technical & On-Page SEO</span>
                      </div>
                      <h3 className="text-white text-2xl sm:text-3xl font-bold tracking-tight">
                        Why Isn't Your Website Ranking on Search Engines?
                      </h3>
                      <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
                        Search visibility is built on sound technical health, clean site architecture, and intent-matched content—not artificial shortcuts or false guarantees.
                      </p>
                    </div>

                    <button
                      onClick={() => handleScrollToContact('Complete SEO')}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs shadow-lg hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all cursor-pointer shrink-0 flex items-center justify-center space-x-2"
                    >
                      <Search className="w-4 h-4" />
                      <span>Request an SEO Audit</span>
                    </button>
                  </div>
                </div>

                {/* 15 Ranking Blockers */}
                <div className="p-8 rounded-3xl bg-slate-900/40 border border-purple-500/20">
                  <h4 className="text-white text-lg font-bold mb-4 flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                    <span>15 Potential Ranking Obstacles We Audit & Fix</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {[
                      'Wrong keyword targeting ignoring actual search queries',
                      'Missing or generic title tags failing to attract clicks',
                      'Weak meta descriptions exceeding pixel boundaries',
                      'Broken H1 / H2 heading hierarchy confusing crawlers',
                      'Missing image Alt attributes blocking image indexing',
                      'Weak internal linking starving critical priority pages',
                      'Broken 404 links and redirect loops hindering crawls',
                      'Missing XML sitemap or Google Search Console validation',
                      'Misconfigured Robots.txt disallowing indexation',
                      'Slow mobile render failing Google Core Web Vitals',
                      'Mobile viewport and touch usability layout breaks',
                      'Poor content structure failing search intent depth',
                      'Duplicate content and canonical tag misconfigurations',
                      'Weak topical relevance across core cluster silos',
                      'Spammy or irrelevant legacy backlink profile'
                    ].map((reason, rIdx) => (
                      <div key={rIdx} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start space-x-2.5">
                        <span className="text-purple-400 font-bold text-xs shrink-0 mt-0.5">⚠</span>
                        <span className="text-slate-300 text-xs leading-relaxed">{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual SEO Comparison (Before -> Optimization -> After) */}
                <div className="p-8 rounded-3xl bg-slate-900/40 border border-cyan-500/20">
                  <div className="text-center mb-8">
                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                      Visual Audit Comparison
                    </span>
                    <h4 className="text-white text-xl sm:text-2xl font-bold mt-1">
                      Before SEO → Optimization Pipeline → After Optimization
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Before */}
                    <div className="p-5 rounded-2xl bg-red-950/20 border border-red-500/30">
                      <div className="text-red-400 font-bold text-sm mb-3 flex items-center">
                        <span className="w-2 h-2 rounded-full bg-red-400 mr-2" />
                        Before Technical SEO
                      </div>
                      <ul className="space-y-2 text-xs text-slate-300">
                        <li className="flex items-center text-red-300">✕ Missing Title & Meta Tags</li>
                        <li className="flex items-center text-red-300">✕ 4.2s Mobile Load Time (Slow)</li>
                        <li className="flex items-center text-red-300">✕ Broken Internal Links & 404s</li>
                        <li className="flex items-center text-red-300">✕ Poor Unstructured Headings</li>
                        <li className="flex items-center text-red-300">✕ Untargeted Keyword Strategy</li>
                      </ul>
                    </div>

                    {/* Middle: Optimization */}
                    <div className="p-5 rounded-2xl bg-purple-950/30 border border-purple-500/40 text-center flex flex-col justify-center">
                      <div className="text-cyan-400 font-bold text-sm mb-2">
                        Optimization Process
                      </div>
                      <div className="space-y-2 text-xs text-slate-200">
                        <div className="p-1.5 rounded bg-slate-950/80 border border-slate-800">🔍 Technical Audit & Crawl</div>
                        <div className="p-1.5 rounded bg-slate-950/80 border border-slate-800">🛠 Metadata & Schema Fix</div>
                        <div className="p-1.5 rounded bg-slate-950/80 border border-slate-800">📈 Speed & Asset Compression</div>
                        <div className="p-1.5 rounded bg-slate-950/80 border border-slate-800">📊 Search Console Index Sync</div>
                      </div>
                    </div>

                    {/* After */}
                    <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30">
                      <div className="text-emerald-400 font-bold text-sm mb-3 flex items-center">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2" />
                        After Optimization
                      </div>
                      <ul className="space-y-2 text-xs text-slate-300">
                        <li className="flex items-center text-emerald-300">✓ Valid Schema.org & Meta Tags</li>
                        <li className="flex items-center text-emerald-300">✓ Under 1.2s Load Speed (95+)</li>
                        <li className="flex items-center text-emerald-300">✓ Clean Silo Site Architecture</li>
                        <li className="flex items-center text-emerald-300">✓ Structured H1-H6 Hierarchy</li>
                        <li className="flex items-center text-emerald-300">✓ Search-Intent Content Depth</li>
                      </ul>
                    </div>
                  </div>

                  {/* Trust note */}
                  <div className="mt-6 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
                    <p className="text-slate-400 text-xs leading-relaxed">
                      🛡️ <strong className="text-white">Honest Ethical Guarantee:</strong> We focus on verifiable technical benchmarks, Core Web Vitals, and clean indexation. We do not make false guarantees of #1 rankings, but build a rock-solid technical foundation.
                    </p>
                  </div>
                </div>

                {/* Download Sample SEO Audit */}
                <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h5 className="text-white text-sm font-bold">Download Sample Technical SEO Audit Checklist</h5>
                    <p className="text-slate-400 text-xs">Comprehensive 30-point audit template in markdown format</p>
                  </div>

                  <button
                    onClick={() => handleDownloadResource(
                      'technical-seo-audit-checklist.md',
                      `# Technical SEO Audit Checklist\n\n## 1. Crawlability & Indexing\n- [ ] XML Sitemap exists & submitted to GSC\n- [ ] Robots.txt allows essential resources\n- [ ] Canonical tags implemented properly\n- [ ] No 404 broken links or redirect loops\n\n## 2. On-Page SEO\n- [ ] Unique Title Tag (50-60 characters)\n- [ ] Unique Meta Description (150-160 characters)\n- [ ] Single H1 tag per page\n- [ ] Logical H2-H3 heading structure\n- [ ] All images have descriptive Alt tags\n\n## 3. Performance & Core Web Vitals\n- [ ] LCP (Largest Contentful Paint) < 2.5s\n- [ ] INP (Interaction to Next Paint) < 200ms\n- [ ] CLS (Cumulative Layout Shift) < 0.1\n- [ ] Images compressed in WebP/AVIF format\n\n## 4. Structured Data\n- [ ] Schema.org JSON-LD markup validated`
                    )}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-cyan-600 text-white text-xs font-semibold transition-colors flex items-center space-x-2 cursor-pointer shrink-0"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Audit Checklist (.MD)</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* PILLAR 3: SEO Blogging */}
            {activeTab === 'blogging' && (
              <motion.div
                key="blogging"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-10"
              >
                {/* Banner */}
                <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
                  <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">
                    <div>
                      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-2">
                        <PenTool className="w-3.5 h-3.5" />
                        <span>Core Service 03 / High-Converting SEO Blogging</span>
                      </div>
                      <h3 className="text-white text-2xl sm:text-3xl font-bold tracking-tight">
                        A Blog Is More Than Just 1,000 Words
                      </h3>
                      <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
                        Effective SEO blogging satisfies user search intent, provides clear logical structures, and delivers actionable value that turns organic visitors into inquiries.
                      </p>
                    </div>

                    <button
                      onClick={() => handleScrollToContact('SEO Blogging')}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs shadow-lg hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all cursor-pointer shrink-0 flex items-center justify-center space-x-2"
                    >
                      <PenTool className="w-4 h-4" />
                      <span>Order Sample Article</span>
                    </button>
                  </div>
                </div>

                {/* 12-Step Workflow */}
                <div className="p-8 rounded-3xl bg-slate-900/40 border border-emerald-500/20">
                  <h4 className="text-white text-lg font-bold mb-6 flex items-center space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>Complete 12-Step Content Publishing Workflow</span>
                  </h4>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {[
                      '1. Topic Research',
                      '2. Search Intent',
                      '3. Keyword Research',
                      '4. Content Outline',
                      '5. Article Writing',
                      '6. H1–H3 Structure',
                      '7. Internal Links',
                      '8. Images + Alt Text',
                      '9. FAQ Section',
                      '10. SEO Optimization',
                      '11. Proofreading',
                      '12. Final Article'
                    ].map((step, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs font-semibold text-slate-300 text-center flex items-center justify-center">
                        {step}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Common Blogging Mistakes We Eliminate */}
                <div className="p-8 rounded-3xl bg-slate-900/40 border border-red-500/20">
                  <h4 className="text-white text-lg font-bold mb-4 flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    <span>Common Content Failures We Prevent:</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {[
                      'Keyword stuffing creating unnatural robotic reading',
                      'Duplicate or unedited copy-paste AI text',
                      'Weak introduction failing to hook readers in 5 seconds',
                      'Ignoring commercial or informational search intent',
                      'Disorganized heading structure confusing skim readers',
                      'Zero internal links trapping readers on dead-end pages',
                      'Missing call-to-action (CTA) losing potential leads',
                      'Poor mobile readability with giant unbroken text blocks',
                      'Fluff words without actionable examples or data points'
                    ].map((mistake, mIdx) => (
                      <div key={mIdx} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 flex items-start space-x-2">
                        <span className="text-red-400 font-bold shrink-0">✕</span>
                        <span>{mistake}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Article Download & Reading System */}
                <div className="p-8 rounded-3xl bg-slate-900/40 border border-cyan-500/30">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                      <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                        Sample Portfolio Article
                      </span>
                      <h4 className="text-white text-xl font-bold mt-1">
                        "The Complete Guide to Technical Web Performance & Core Web Vitals"
                      </h4>
                      <p className="text-slate-400 text-xs mt-1">
                        1,400 words sample article formatted with H1-H3 headers, FAQ schema, and internal linking.
                      </p>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 mb-6 max-h-48 overflow-y-auto font-mono text-xs text-slate-300 leading-relaxed">
                    <p className="text-cyan-400 font-bold mb-2"># The Complete Guide to Technical Web Performance & Core Web Vitals</p>
                    <p className="mb-3">In today's competitive web ecosystem, a fraction of a second can determine whether a potential client converts or bounces to a competitor...</p>
                    <p className="text-purple-300 font-bold mb-1">## 1. Understanding Largest Contentful Paint (LCP)</p>
                    <p className="mb-3">LCP measures how long it takes for the largest visual element on the screen to become visible to the user...</p>
                    <p className="text-purple-300 font-bold mb-1">## 2. Eliminating Cumulative Layout Shifts (CLS)</p>
                    <p>Always specify explicit width and height dimensions on images and dynamic banner elements...</p>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => handleDownloadResource(
                        'guide-to-web-performance.html',
                        `<!DOCTYPE html><html><head><title>Web Performance Guide</title><style>body{font-family:sans-serif;max-width:800px;margin:40px auto;line-height:1.6;color:#333;}</style></head><body><h1>The Complete Guide to Technical Web Performance & Core Web Vitals</h1><p>Sample SEO article demonstrating semantic hierarchy, schema structure, and reader engagement.</p><h2>1. Key Metrics Explained</h2><p>LCP, INP, and CLS benchmarks for optimal performance.</p></body></html>`,
                        'text/html'
                      )}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-purple-600 text-white text-xs font-semibold transition-colors flex items-center space-x-2 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download HTML Format</span>
                    </button>

                    <button
                      onClick={() => handleDownloadResource(
                        'guide-to-web-performance.md',
                        `# The Complete Guide to Technical Web Performance & Core Web Vitals\n\n## Search Intent & Target Audience\n- **Target Audience:** Small business owners & developers\n- **Primary Keyword:** Technical web performance\n- **Secondary Keywords:** Core web vitals optimization, speed audit\n\n---\n\n## Introduction\nIn today's digital landscape, speed is no longer just a technical metric—it is the direct driver of conversions...`,
                        'text/markdown'
                      )}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-cyan-600 text-white text-xs font-semibold transition-colors flex items-center space-x-2 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Markdown / Doc</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* PILLAR 4: Keyword Research */}
            {activeTab === 'keywords' && (
              <motion.div
                key="keywords"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-10"
              >
                {/* Banner */}
                <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
                  <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">
                    <div>
                      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-950/40 border border-amber-500/30 text-amber-400 text-xs font-mono mb-2">
                        <KeyRound className="w-3.5 h-3.5" />
                        <span>Core Service 04 / Search Intent Keyword Research</span>
                      </div>
                      <h3 className="text-white text-2xl sm:text-3xl font-bold tracking-tight">
                        Stop Choosing Keywords Based Only on Search Volume
                      </h3>
                      <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
                        High volume terms often bring unqualified traffic. We prioritize intent-matched long-tail opportunities that deliver paying clients.
                      </p>
                    </div>

                    <button
                      onClick={() => handleScrollToContact('Keyword Research')}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs shadow-lg hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-all cursor-pointer shrink-0 flex items-center justify-center space-x-2"
                    >
                      <KeyRound className="w-4 h-4" />
                      <span>Order Keyword Sheet</span>
                    </button>
                  </div>
                </div>

                {/* Formula */}
                <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-950/30 via-slate-900/60 to-purple-950/30 border border-amber-500/30">
                  <div className="text-center">
                    <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
                      Scientific Selection Formula
                    </span>
                    <div className="text-white text-base sm:text-xl font-bold mt-1">
                      Business Goal + Search Intent + Relevance + Competition + Opportunity
                    </div>
                  </div>
                </div>

                {/* Interactive Keyword Matrix Table */}
                <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h4 className="text-white text-lg font-bold">Sample Keyword Evaluation Sheet</h4>
                      <p className="text-slate-400 text-xs">Analyzing intent, difficulty, and commercial value</p>
                    </div>
                    <button
                      onClick={() => handleDownloadResource(
                        'sample-keyword-research-matrix.csv',
                        `Keyword,Intent,Search Volume,Keyword Difficulty,Commercial Value,Recommended Action\n"web development services for small business",Commercial,2400,Low (24),Very High,Create Target Landing Page\n"how to fix php 500 error",Informational,5400,Low (18),Medium,Publish Troubleshooting Blog\n"hire full stack php developer",Transactional,1200,Medium (38),Very High,Optimize Service Page & Pricing\n"best responsive website design examples",Commercial,3600,Low (22),High,Publish Visual Portfolio Showcase`,
                        'text/csv'
                      )}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-amber-600 text-white text-xs font-semibold transition-colors flex items-center space-x-1.5 cursor-pointer"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5" />
                      <span>Download CSV Sheet</span>
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[11px] border-b border-slate-800">
                        <tr>
                          <th className="p-3.5">Sample Query</th>
                          <th className="p-3.5">Search Intent</th>
                          <th className="p-3.5">Competition (KD)</th>
                          <th className="p-3.5">Business Value</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        <tr className="hover:bg-slate-900/60">
                          <td className="p-3.5 font-semibold text-white">"web development services for small business"</td>
                          <td className="p-3.5"><span className="px-2 py-0.5 rounded bg-blue-950 text-cyan-400 border border-blue-500/20">Commercial</span></td>
                          <td className="p-3.5 text-emerald-400 font-mono">Low (24)</td>
                          <td className="p-3.5 text-amber-400 font-bold">Very High</td>
                        </tr>
                        <tr className="hover:bg-slate-900/60">
                          <td className="p-3.5 font-semibold text-white">"how to fix php database connection error"</td>
                          <td className="p-3.5"><span className="px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/20">Informational</span></td>
                          <td className="p-3.5 text-emerald-400 font-mono">Low (18)</td>
                          <td className="p-3.5 text-slate-300">Medium</td>
                        </tr>
                        <tr className="hover:bg-slate-900/60">
                          <td className="p-3.5 font-semibold text-white">"hire full stack php mysql developer"</td>
                          <td className="p-3.5"><span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/20">Transactional</span></td>
                          <td className="p-3.5 text-amber-400 font-mono">Medium (38)</td>
                          <td className="p-3.5 text-amber-400 font-bold">Very High</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* PILLAR 5: Guest Posting */}
            {activeTab === 'guest-posting' && (
              <motion.div
                key="guest-posting"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-10"
              >
                {/* Banner */}
                <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
                  <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">
                    <div>
                      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-pink-950/40 border border-pink-500/30 text-pink-400 text-xs font-mono mb-2">
                        <Link2 className="w-3.5 h-3.5" />
                        <span>Core Service 05 / Ethical Guest Posting & Outreach</span>
                      </div>
                      <h3 className="text-white text-2xl sm:text-3xl font-bold tracking-tight">
                        Build Relevant Connections, Not Random Spam Backlinks
                      </h3>
                      <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
                        Sustainable authority comes from contextual publications on niche-relevant websites with real audiences, not private blog networks or link farms.
                      </p>
                    </div>

                    <button
                      onClick={() => handleScrollToContact('Guest Posting')}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs shadow-lg hover:shadow-[0_0_20px_rgba(244,63,94,0.5)] transition-all cursor-pointer shrink-0 flex items-center justify-center space-x-2"
                    >
                      <Link2 className="w-4 h-4" />
                      <span>Explore Outreach Plan</span>
                    </button>
                  </div>
                </div>

                {/* Workflow */}
                <div className="p-8 rounded-3xl bg-slate-900/40 border border-pink-500/20">
                  <div className="text-center mb-8">
                    <span className="text-xs font-mono text-pink-400 uppercase tracking-widest">
                      Quality Outreach Pipeline
                    </span>
                    <h4 className="text-white text-xl sm:text-2xl font-bold mt-1">
                      Find Relevant Websites → Evaluate Quality → Check Audience → Research Topic → Create Valuable Content → Outreach → Publication → Monitor Results
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800">
                      <h5 className="text-emerald-400 font-bold text-sm mb-3">✓ What We Strictly Evaluate</h5>
                      <ul className="space-y-2 text-xs text-slate-300">
                        <li>• Strict niche relevance and active genuine readership</li>
                        <li>• Clean backlink profile with zero toxic link history</li>
                        <li>• Contextual editorial placement inside original content</li>
                        <li>• Accurate link attributes (dofollow, nofollow, sponsored)</li>
                      </ul>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800">
                      <h5 className="text-red-400 font-bold text-sm mb-3">✕ Practices We Strictly Avoid</h5>
                      <ul className="space-y-2 text-xs text-slate-300">
                        <li>• Private Blog Networks (PBNs) and automated link farms</li>
                        <li>• Completely irrelevant generic article directories</li>
                        <li>• Manipulative bulk spam link injection schemes</li>
                        <li>• Thin, spun, or unedited low-quality articles</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* 4. 🔥 Interactive Deep Problem Diagnostic Finder ("What's Wrong With Your Website?") */}
        <div id="diagnostic-engine" className="mb-24 p-8 sm:p-10 rounded-3xl bg-slate-900/70 border border-cyan-500/30 backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            <div className="text-center mb-10">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Interactive Troubleshooting Matrix</span>
              </div>
              <h3 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                What's Wrong With Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">Website or Growth?</span>
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto mt-2 leading-relaxed">
                Click any issue below to inspect the root cause, what we test, and the exact step-by-step resolution.
              </p>
            </div>

            {/* Filter Tabs & Search */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  { id: 'all', label: 'All Issues' },
                  { id: 'payment', label: '💳 Payment & Orders' },
                  { id: 'web', label: '🌐 Web & PHP' },
                  { id: 'seo', label: '📈 SEO & Indexing' },
                  { id: 'blogging', label: '✍️ Content & AI' },
                  { id: 'keywords', label: '🔎 Keywords' },
                  { id: 'speed', label: '⚡ Speed / Vitals' },
                  { id: 'security', label: '🔐 Security' },
                  { id: 'api', label: '🔌 API & Webhooks' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveDiagCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      activeDiagCategory === cat.id
                        ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-md'
                        : 'bg-slate-950/60 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search problem keywords..."
                  value={diagnosticSearch}
                  onChange={(e) => setDiagnosticSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Accordion Questions List */}
            <div className="space-y-3">
              {filteredDiagnostics.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs rounded-2xl bg-slate-950/60 border border-slate-800">
                  No specific issue matches your search. Contact us directly for a custom diagnosis!
                </div>
              ) : (
                filteredDiagnostics.map(item => {
                  const isExpanded = expandedDiag === item.id;
                  return (
                    <div 
                      key={item.id}
                      className={`rounded-2xl border transition-all overflow-hidden ${
                        isExpanded 
                          ? 'bg-slate-950/90 border-cyan-500/50 shadow-lg' 
                          : 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      <button
                        onClick={() => setExpandedDiag(isExpanded ? null : item.id)}
                        className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 cursor-pointer"
                      >
                        <div className="flex items-start space-x-3">
                          <span className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-mono shrink-0 mt-0.5">
                            {item.categoryLabel}
                          </span>
                          <div>
                            <h4 className="text-white text-xs sm:text-sm font-bold leading-snug">
                              {item.question}
                            </h4>
                          </div>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-cyan-400' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="px-5 pb-5 pt-1 border-t border-slate-800/60"
                          >
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-3 text-xs">
                              {/* Root cause */}
                              <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/20">
                                <div className="text-red-400 font-bold mb-1 flex items-center">
                                  <AlertTriangle className="w-3.5 h-3.5 mr-1" />
                                  Why This Problem Happens:
                                </div>
                                <p className="text-slate-300 leading-relaxed text-[11px]">
                                  {item.rootCause}
                                </p>
                              </div>

                              {/* What we inspect */}
                              <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/20">
                                <div className="text-purple-300 font-bold mb-1 flex items-center">
                                  <SlidersHorizontal className="w-3.5 h-3.5 mr-1" />
                                  What We Inspect & Diagnose:
                                </div>
                                <ul className="space-y-1 text-slate-300 text-[11px]">
                                  {item.whatWeCheck.map((chk, i) => (
                                    <li key={i} className="flex items-start">
                                      <span className="text-purple-400 mr-1.5">•</span>
                                      <span>{chk}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Resolution & CTA */}
                              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 flex flex-col justify-between">
                                <div>
                                  <div className="text-emerald-400 font-bold mb-1 flex items-center">
                                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                                    Step-by-Step Resolution:
                                  </div>
                                  <p className="text-slate-300 leading-relaxed text-[11px] mb-3">
                                    {item.solution}
                                  </p>
                                </div>

                                <div className="pt-2 border-t border-emerald-500/20 flex items-center justify-between">
                                  <span className="text-[11px] font-mono text-emerald-300">
                                    {item.startingPrice}
                                  </span>
                                  <button
                                    onClick={() => handleScrollToContact(item.recommendedService)}
                                    className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-[10px] hover:shadow-md transition-all cursor-pointer flex items-center space-x-1"
                                  >
                                    <span>Request Fix</span>
                                    <ArrowRight className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })
              )}
            </div>

            {/* Honest promise badge */}
            <div className="mt-8 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
              <p className="text-slate-300 text-xs">
                🤝 <strong className="text-white">Our Problem-Solving Promise:</strong> We diagnose the issue first, explain what went wrong in plain English, and only recommend the exact service needed. Zero unnecessary upsells.
              </p>
            </div>
          </div>
        </div>

        {/* 5. Pre-Launch Quality & Testing Assurance (11-Point Verification) */}
        <div className="mb-24 p-8 sm:p-10 rounded-3xl bg-slate-900/30 border border-slate-800 backdrop-blur-md">
          <div className="text-center mb-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Pre-Launch Standards</span>
            </div>
            <h3 className="text-white text-2xl sm:text-3xl font-bold tracking-tight">
              11-Point Quality & Testing Assurance
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-2xl mx-auto">
              Every deliverable is verified across rigorous quality benchmarks before production release.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: 'Responsive Testing', desc: 'Mobile (320px+), tablet, laptop & 4K display fluid scaling.' },
              { title: 'Cross-Browser Audit', desc: 'Flawless execution on Chrome, Safari, Firefox & Edge.' },
              { title: 'Form Input Sanitization', desc: 'Client & backend validation with automated email confirmation.' },
              { title: 'Broken Link Crawler', desc: 'Zero 404 broken routes or circular 301 redirect loops.' },
              { title: 'JavaScript Audit', desc: 'Zero unhandled console exceptions and clean memory leaks.' },
              { title: 'Backend Security', desc: 'SQL injection protection with PDO parameterized prepared queries.' },
              { title: 'Database Integrity', desc: 'Clean relational schema migrations and indexing.' },
              { title: 'REST API Endpoints', desc: 'Validated HTTP status codes, rate limits, and JSON schemas.' },
              { title: 'Speed Benchmarks', desc: 'Google Lighthouse Performance 90+ validation score.' },
              { title: 'SEO Technical Checks', desc: 'Valid Schema.org, OpenGraph, XML sitemap & Robots.txt.' },
              { title: 'Code Maintainability', desc: 'Clean, commented, modular, and W3C compliant codebase.' }
            ].map((chk, cIdx) => (
              <div key={cIdx} className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-start space-x-3">
                <div className="p-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-white text-xs font-bold">{chk.title}</div>
                  <div className="text-slate-400 text-[11px] mt-0.5 leading-relaxed">{chk.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Service Comparison Matrix */}
        <div className="mb-24 p-8 rounded-3xl bg-slate-900/40 border border-purple-500/20">
          <div className="text-center mb-8">
            <h3 className="text-white text-2xl font-bold tracking-tight">
              Which Service Do You Need?
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Match your exact problem with our recommended scope
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 font-mono uppercase text-[11px] border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Your Specific Challenge</th>
                  <th className="p-3.5">Recommended Service</th>
                  <th className="p-3.5">Key Deliverable</th>
                  <th className="p-3.5">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr>
                  <td className="p-3.5 font-semibold text-white">Need a brand-new website or custom web app</td>
                  <td className="p-3.5 text-cyan-400 font-semibold">Web Development</td>
                  <td className="p-3.5 text-slate-400">Complete responsive site + database integration</td>
                  <td className="p-3.5">
                    <button onClick={() => handleScrollToContact('Web Development')} className="text-purple-400 hover:text-white font-semibold cursor-pointer">Order Now →</button>
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-white">Website has broken features, bugs, or errors</td>
                  <td className="p-3.5 text-cyan-400 font-semibold">Bug Fixing</td>
                  <td className="p-3.5 text-slate-400">Rapid 24h diagnosis and code fix</td>
                  <td className="p-3.5">
                    <button onClick={() => handleScrollToContact('Bug Fixing')} className="text-purple-400 hover:text-white font-semibold cursor-pointer">Order Now →</button>
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-white">Website is slow or fails Core Web Vitals</td>
                  <td className="p-3.5 text-cyan-400 font-semibold">Speed Optimization</td>
                  <td className="p-3.5 text-slate-400">Lighthouse 90+ speed audit & asset compression</td>
                  <td className="p-3.5">
                    <button onClick={() => handleScrollToContact('Speed Optimization')} className="text-purple-400 hover:text-white font-semibold cursor-pointer">Order Now →</button>
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-white">Website is not indexed or ranking on Google</td>
                  <td className="p-3.5 text-cyan-400 font-semibold">Complete SEO</td>
                  <td className="p-3.5 text-slate-400">Full 30-point technical & on-page audit</td>
                  <td className="p-3.5">
                    <button onClick={() => handleScrollToContact('Complete SEO')} className="text-purple-400 hover:text-white font-semibold cursor-pointer">Order Now →</button>
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-white">Need high-converting search-focused content</td>
                  <td className="p-3.5 text-cyan-400 font-semibold">SEO Blogging</td>
                  <td className="p-3.5 text-slate-400">Intent-matched, structured 1,200+ word articles</td>
                  <td className="p-3.5">
                    <button onClick={() => handleScrollToContact('SEO Blogging')} className="text-purple-400 hover:text-white font-semibold cursor-pointer">Order Now →</button>
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-white">Uncertain which keywords bring paying clients</td>
                  <td className="p-3.5 text-cyan-400 font-semibold">Keyword Research</td>
                  <td className="p-3.5 text-slate-400">Opportunity spreadsheet with search intent & KD</td>
                  <td className="p-3.5">
                    <button onClick={() => handleScrollToContact('Keyword Research')} className="text-purple-400 hover:text-white font-semibold cursor-pointer">Order Now →</button>
                  </td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-white">Need an all-in-one comprehensive growth plan</td>
                  <td className="p-3.5 text-amber-400 font-bold">Complete Growth Package</td>
                  <td className="p-3.5 text-slate-400">Development + SEO + Content + Promotion</td>
                  <td className="p-3.5">
                    <button onClick={() => handleScrollToContact('Complete Growth Package')} className="text-amber-400 hover:text-white font-bold cursor-pointer">Discuss Package →</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 7. Premium Complete Growth Solution Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-purple-950/40 via-slate-900/90 to-cyan-950/40 border-2 border-cyan-400/40 backdrop-blur-md">
          <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-8">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>All-in-One Growth Partnership</span>
              </div>
              <h3 className="text-white text-2xl sm:text-3xl font-bold tracking-tight">
                Complete Website Growth Solution
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
                Web Development + Technical SEO + Keyword Research + SEO Blogging + Authority Strategy. Seamless execution across the full digital lifecycle: <strong>Build → Optimize → Create → Promote → Measure</strong>.
              </p>
            </div>

            <button
              onClick={() => handleScrollToContact('Complete Website Growth Solution')}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-sm shadow-xl hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] hover:scale-105 transition-all cursor-pointer shrink-0"
            >
              Start Complete Growth Project
            </button>
          </div>
        </div>

      </div>

      {/* Code Snippet Modal */}
      <AnimatePresence>
        {activeVideoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl rounded-3xl bg-slate-900 border border-purple-500/30 p-6 sm:p-8 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/20">
                    {activeVideoModal.type}
                  </span>
                  <h4 className="text-white text-lg font-bold mt-1">
                    {activeVideoModal.title}
                  </h4>
                </div>
                <button
                  onClick={() => setActiveVideoModal(null)}
                  className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 overflow-x-auto max-h-80 leading-relaxed">
                <code>{activeVideoModal.details}</code>
              </pre>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => handleDownloadResource(`${activeVideoModal.title.toLowerCase().replace(/\s+/g, '-')}.txt`, activeVideoModal.details)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-purple-600 text-white text-xs font-semibold transition-colors flex items-center space-x-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Snippet</span>
                </button>
                <button
                  onClick={() => setActiveVideoModal(null)}
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
