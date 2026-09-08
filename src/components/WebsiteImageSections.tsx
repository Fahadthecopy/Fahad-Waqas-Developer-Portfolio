/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import {
  Image as ImageIcon,
  Maximize2,
  CheckCircle2,
  AlertTriangle,
  Zap,
  ShieldCheck,
  Server,
  Smartphone,
  TrendingUp,
  X,
  ArrowRight,
  ExternalLink,
  Code2,
  Layers,
  Wrench,
  Clock,
  Sparkles,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// Import newly generated high-resolution assets
import websiteErrorRepairImg from '../assets/images/website_recovery_repair_1788858126484.jpg';
import ecommerceCheckoutImg from '../assets/images/ecommerce_checkout_ui_1788858150032.jpg';
import serverDbMonitorImg from '../assets/images/server_database_monitor_1788858173666.jpg';
import responsiveWebsiteImg from '../assets/images/responsive_website_fix_1788858196702.jpg';
import seoSpeedAuditImg from '../assets/images/seo_speed_audit_1788858215167.jpg';
import diagnosticsDeskImg from '../assets/images/web_diagnostics_desk_1788856966627.jpg';
import errorBeaconImg from '../assets/images/system_alert_badge_1788856986853.jpg';

export interface ImageShowcaseItem {
  id: string;
  title: string;
  category: 'error-fix' | 'ecommerce' | 'server' | 'responsive' | 'seo' | 'diagnostics';
  categoryLabel: string;
  tagline: string;
  imageSrc: string;
  aspectRatio: string;
  errorBadge: {
    code: string;
    label: string;
    color: string;
  };
  resolvedBadge: {
    label: string;
    metrics: string;
  };
  beforeProblem: string;
  afterSolution: string;
  technicalDetails: {
    rootCause: string;
    remedyApplied: string;
    toolsUsed: string[];
    turnaroundTime: string;
  };
  codeSnippetFix?: string;
}

const showcaseItems: ImageShowcaseItem[] = [
  {
    id: 'case-500-repair',
    title: '500 Fatal Server Crash & Nginx Gateway Loop',
    category: 'error-fix',
    categoryLabel: 'Critical Server Repair',
    tagline: 'Production crash recovery with live Nginx rewrite & PHP worker optimization',
    imageSrc: websiteErrorRepairImg,
    aspectRatio: '16:9',
    errorBadge: {
      code: 'HTTP 500 / 502',
      label: 'Fatal Gateway Crash',
      color: 'bg-red-500/20 text-red-400 border-red-500/40'
    },
    resolvedBadge: {
      label: '200 OK Restored',
      metrics: '99.99% Uptime • Zero Data Loss'
    },
    beforeProblem: 'White Screen of Death triggered by an unhandled database exception inside legacy PHP PDO routines, exhausting Nginx connection workers and dropping 100% of incoming customer traffic.',
    afterSolution: 'Sanitized database connection retry hooks, configured graceful fallback handlers, tuned Nginx fastcgi buffers, and restored full production availability in under 35 minutes.',
    technicalDetails: {
      rootCause: 'Deadlock on unindexed session table under high concurrency; missing try/catch in API dispatcher.',
      remedyApplied: 'Added transactional rollback, indexed session tokens, reconfigured Nginx keepalive & worker limits.',
      toolsUsed: ['Nginx', 'PHP 8.2', 'MySQL InnoDB', 'Linux systemd', 'APEX Diagnostics'],
      turnaroundTime: '35 Minutes'
    },
    codeSnippetFix: `// FIX: Transaction safety + connection pooling
try {
  $pdo->beginTransaction();
  $stmt = $pdo->prepare("SELECT id FROM users WHERE token = :t FOR UPDATE");
  $stmt->execute([':t' => $sanitizedToken]);
  $pdo->commit();
} catch (PDOException $e) {
  $pdo->rollBack();
  error_log("DB Retry handled: " . $e->getMessage());
  return HttpResponse::serviceUnavailable("Retrying safely...");
}`
  },
  {
    id: 'case-ecommerce-checkout',
    title: 'E-Commerce Checkout & Stripe Webhook Failure',
    category: 'ecommerce',
    categoryLabel: 'Payment Flow Recovery',
    tagline: 'Restoring silent checkout drops, webhook idempotency & SSL security',
    imageSrc: ecommerceCheckoutImg,
    aspectRatio: '16:9',
    errorBadge: {
      code: 'ERR_PAYMENT_FAIL',
      label: 'Stripe Webhook Drop',
      color: 'bg-amber-500/20 text-amber-400 border-amber-500/40'
    },
    resolvedBadge: {
      label: '100% Checkout Conversion',
      metrics: '$0 Dropped Revenue • Verified Badges'
    },
    beforeProblem: 'Online shoppers encountered spinning checkout spinners and abandoned carts. Stripe payment intent webhooks were timing out due to unhandled promise rejections on inventory updates.',
    afterSolution: 'Implemented idempotent webhook handlers, instant client-side optimistic confirmation, robust transaction logs, and verified SSL TLS 1.3 handshake verification.',
    technicalDetails: {
      rootCause: 'Payload signature verification failed due to express body-parser mutating raw webhook buffer.',
      remedyApplied: 'Mounted express.raw() exclusively on /api/stripe/webhook and deployed idempotent order queue.',
      toolsUsed: ['Stripe API', 'Node.js', 'Express', 'Redis Queue', 'PostgreSQL'],
      turnaroundTime: '45 Minutes'
    },
    codeSnippetFix: `// FIX: Preserving raw buffer for Stripe HMAC-SHA256 signature verification
app.post('/api/webhook/stripe', 
  express.raw({ type: 'application/json' }), 
  (req, res) => {
    const sig = req.headers['stripe-signature'];
    const event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    await handleIdempotentOrder(event.data.object);
    res.json({ received: true });
  }
);`
  },
  {
    id: 'case-database-telemetry',
    title: 'Cloud Database Query Latency & Server Bottleneck',
    category: 'server',
    categoryLabel: 'Database & Cloud Fix',
    tagline: '8.4-second query lag compressed down to sub-120ms with composite indexing & Redis cache',
    imageSrc: serverDbMonitorImg,
    aspectRatio: '16:9',
    errorBadge: {
      code: 'SLOW_QUERY_8.4s',
      label: 'CPU & RAM Spike 98%',
      color: 'bg-rose-500/20 text-rose-400 border-rose-500/40'
    },
    resolvedBadge: {
      label: '112ms Response Restored',
      metrics: 'CPU stabilized at 14% • Zero dropped queries'
    },
    beforeProblem: 'Client reported database timeouts during peak traffic. Unindexed multi-table JOIN queries were scanning 450,000 rows per request, saturating VPS memory and triggering 504 Gateway Timeouts.',
    afterSolution: 'Audited slow-query logs with EXPLAIN ANALYZE, synthesized high-performance composite indexes, and placed an intelligent Redis caching layer with automatic TTL invalidation.',
    technicalDetails: {
      rootCause: 'Full table scan on client_transactions table lacking index on (tenant_id, created_at DESC).',
      remedyApplied: 'Created composite B-tree index and memoized query results in Redis with 180-second TTL.',
      toolsUsed: ['MySQL 8.0', 'Redis', 'Linux htop', 'Slow Query Logger', 'Node.js'],
      turnaroundTime: '55 Minutes'
    },
    codeSnippetFix: `// SQL FIX: Composite indexing to eliminate full-table scanning
ALTER TABLE client_transactions 
ADD INDEX idx_tenant_created (tenant_id, created_at DESC);

-- Query execution time reduced from 8,420ms -> 112ms`
  },
  {
    id: 'case-responsive-mobile',
    title: 'Mobile Viewport Breaking & CSS Layout Overflow',
    category: 'responsive',
    categoryLabel: 'Responsive UI Repair',
    tagline: 'Fixing horizontal scroll bugs, clipped modals & broken navigation across all devices',
    imageSrc: responsiveWebsiteImg,
    aspectRatio: '16:9',
    errorBadge: {
      code: 'OVERFLOW_X_BUG',
      label: 'Broken Mobile Layout',
      color: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40'
    },
    resolvedBadge: {
      label: 'Pixel-Perfect All Devices',
      metrics: '320px to 4K Ultrawide Verified'
    },
    beforeProblem: 'Smartphone visitors faced frustrating horizontal page wobble, unclickable hamburger menus, overlapping text cards, and truncated checkout forms on iOS Safari and Android Chrome.',
    afterSolution: 'Refactored CSS grid and flexbox containers, eradicated rogue 100vw widths causing scrollbar shifts, fixed touch target sizes to WCAG AA 48px, and ensured smooth responsive scaling.',
    technicalDetails: {
      rootCause: 'Hardcoded fixed pixel widths (1200px) on nested wrappers and rogue margin-right triggers.',
      remedyApplied: 'Switched to fluid Tailwind clamp() units, max-w-full containment, and touch-optimized navigation.',
      toolsUsed: ['CSS3 Flex/Grid', 'Tailwind CSS', 'Chrome DevTools', 'Safari Web Inspector', 'BrowserStack'],
      turnaroundTime: '30 Minutes'
    },
    codeSnippetFix: `/* CSS FIX: Eradicate horizontal scroll bug */
*, *::before, *::after {
  box-sizing: border-box;
}
html, body {
  max-width: 100%;
  overflow-x: clip; /* Modern clean containment without scrollbar flicker */
}`
  },
  {
    id: 'case-seo-performance',
    title: 'Google Lighthouse 100/100 Core Web Vitals Audit',
    category: 'seo',
    categoryLabel: 'Speed & SEO Optimization',
    tagline: 'LCP cut from 4.8s to 0.7s; CLS eliminated to achieve green Google rankings',
    imageSrc: seoSpeedAuditImg,
    aspectRatio: '16:9',
    errorBadge: {
      code: 'LIGHTHOUSE_34/100',
      label: 'Failing Core Web Vitals',
      color: 'bg-orange-500/20 text-orange-400 border-orange-500/40'
    },
    resolvedBadge: {
      label: '100 / 100 Lighthouse Green',
      metrics: '0.7s LCP • 0.00 CLS • Top 1% SEO Rank'
    },
    beforeProblem: 'Website was penalized in Google search results with an abysmal 34/100 mobile score caused by 5MB unoptimized PNG images, render-blocking scripts, and shifting banner elements (CLS 0.42).',
    afterSolution: 'Converted all media to responsive modern WebP/AVIF formats, inlined critical above-the-fold CSS, deferred non-essential JavaScript, and locked image layout dimensions to score perfect 100s.',
    technicalDetails: {
      rootCause: 'Uncompressed hero assets, render-blocking third-party trackers, missing height/width attributes.',
      remedyApplied: 'Next-gen asset compression, preloaded critical display fonts, defer/async external bundles.',
      toolsUsed: ['Google Lighthouse', 'PageSpeed Insights', 'WebP Optimizer', 'Schema.org JSON-LD'],
      turnaroundTime: '1 Hour'
    },
    codeSnippetFix: `<!-- FIX: Responsive Next-Gen Picture element with locked aspect-ratio -->
<picture>
  <source type="image/avif" srcset="/hero.avif">
  <source type="image/webp" srcset="/hero.webp">
  <img src="/hero.jpg" width="1200" height="675" alt="Clean Hero" 
       loading="eager" fetchpriority="high" class="w-full h-auto" />
</picture>`
  },
  {
    id: 'case-apex-operations',
    title: '24/7 APEX Web Diagnostics & Live Telemetry Center',
    category: 'diagnostics',
    categoryLabel: 'Continuous Observability',
    tagline: 'Real-time telemetry monitor tracking microservice health, memory leaks & API latencies',
    imageSrc: diagnosticsDeskImg,
    aspectRatio: '16:9',
    errorBadge: {
      code: 'UNMONITORED_ENV',
      label: 'Blind Outages & Latency',
      color: 'bg-purple-500/20 text-purple-400 border-purple-500/40'
    },
    resolvedBadge: {
      label: 'Sub-Second Incident Alerting',
      metrics: 'Continuous Health Check • Instant Auto-Remediation'
    },
    beforeProblem: 'Client suffered silent recurring server crashes and SSL expirations without prior warnings, discovering downtime only after receiving complaints from lost customers.',
    afterSolution: 'Deployed the APEX continuous monitoring suite with synthetic ping monitors, automated error log parsing, instant Discord/Telegram alerts, and automated Let\'s Encrypt SSL renewal checks.',
    technicalDetails: {
      rootCause: 'Absence of proactive uptime alerts and unmonitored log rotations filling system disk storage.',
      remedyApplied: 'Integrated APEX real-time health-check daemon with automatic log truncation and webhook alert beacon.',
      toolsUsed: ['APEX Telemetry', 'Docker', 'Prometheus', 'Telegram Webhooks', 'Bash Cron daemons'],
      turnaroundTime: 'Active 24/7'
    },
    codeSnippetFix: `// APEX Health Daemon: Instant ping with latency alerting
async function checkServiceHealth(url) {
  const start = performance.now();
  const res = await fetch(url, { signal: AbortSignal.timeout(3000) });
  const latency = Math.round(performance.now() - start);
  if (!res.ok || latency > 1000) {
    await sendEmergencyAlert({ url, status: res.status, latency });
  }
}`
  }
];

export default function WebsiteImageSections() {
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // State
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeModalItem, setActiveModalItem] = useState<ImageShowcaseItem | null>(null);
  const [activeComparisonMode, setActiveComparisonMode] = useState<{ [key: string]: 'after' | 'before' }>({});

  const filterTabs = [
    { id: 'all', label: 'All Images & Fixes (6)' },
    { id: 'error-fix', label: 'Server 500 & 502' },
    { id: 'ecommerce', label: 'E-Commerce & Stripe' },
    { id: 'server', label: 'Database & Speed' },
    { id: 'responsive', label: 'Responsive Layouts' },
    { id: 'seo', label: 'Core Web Vitals' }
  ];

  const filteredItems = showcaseItems.filter(item => {
    if (selectedFilter === 'all') return true;
    return item.category === selectedFilter;
  });

  const toggleComparison = (id: string) => {
    setActiveComparisonMode(prev => ({
      ...prev,
      [id]: prev[id] === 'before' ? 'after' : 'before'
    }));
  };

  const handleOrderFix = (errorName: string) => {
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="error-fix-images" 
      ref={sectionRef}
      className={`py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors duration-300 ${
        theme === 'light' ? 'bg-slate-100/60' : 'bg-[#060913]'
      }`}
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wide uppercase mb-3 shadow-inner"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Visual Proof & Real Website Case Studies</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
              theme === 'light' ? 'text-slate-900' : 'text-white'
            }`}
          >
            Website Error Fixes & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-400">
              Live Website Image Gallery
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed"
          >
            High-definition visual evidence of broken production websites restored to pristine performance. Compare the critical error states against the repaired, high-converting live platforms.
          </motion.p>

          {/* Category Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-2 mt-8"
          >
            {filterTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  selectedFilter === tab.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25 scale-105'
                    : theme === 'light'
                      ? 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                      : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Featured Split Showcase Card (Website Error Repair Transformation) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className={`mb-14 rounded-3xl border overflow-hidden backdrop-blur-md relative ${
            theme === 'light'
              ? 'bg-white border-slate-200 shadow-xl'
              : 'bg-[#0a0e1c] border-cyan-500/30 shadow-2xl'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left: Big Interactive Image Display */}
            <div className="lg:col-span-7 relative group overflow-hidden bg-slate-950 flex items-center justify-center min-h-[320px] sm:min-h-[420px]">
              <img
                src={websiteErrorRepairImg}
                alt="Website Error Repair & 200 OK Live Transformation"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

              {/* Status Overlay Badges */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-red-950/90 border border-red-500/60 text-red-300 backdrop-blur-md flex items-center space-x-1.5 shadow-lg">
                  <AlertTriangle className="w-3 h-3 text-red-400" />
                  <span>BEFORE: HTTP 500 Crash</span>
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950/90 border border-emerald-500/60 text-emerald-300 backdrop-blur-md flex items-center space-x-1.5 shadow-lg">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>AFTER: 200 OK Restored</span>
                </span>
              </div>

              {/* Expand High-Res Button */}
              <button
                onClick={() => setActiveModalItem(showcaseItems[0])}
                className="absolute bottom-4 right-4 px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white text-xs font-semibold backdrop-blur-md border border-cyan-500/40 shadow-xl transition-all flex items-center space-x-1.5 cursor-pointer z-10"
              >
                <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Inspect Full Screen</span>
              </button>
            </div>

            {/* Right: Technical Diagnostic Breakdown */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 mb-2">
                  <Wrench className="w-4 h-4" />
                  <span>FEATURED CASE STUDY • EMERGENCY REPAIR</span>
                </div>
                <h3 className={`text-xl sm:text-2xl font-bold tracking-tight mb-2 ${
                  theme === 'light' ? 'text-slate-900' : 'text-white'
                }`}>
                  Fatal Server 500 Outage & Nginx Worker Starvation
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                  When mission-critical web applications crash under sudden traffic spikes, every minute of downtime costs customers. Here is how Fahad systematically isolates the failure, repairs the core codebase, and hardens the server architecture.
                </p>

                {/* Before vs After comparison blocks */}
                <div className="space-y-3 mb-6">
                  <div className={`p-3.5 rounded-2xl border ${
                    theme === 'light' ? 'bg-red-50/70 border-red-200' : 'bg-red-950/30 border-red-500/30'
                  }`}>
                    <div className="flex items-center space-x-2 text-xs font-bold text-red-400 mb-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>THE BREAKING ERROR</span>
                    </div>
                    <p className={`text-xs leading-relaxed ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
                      {showcaseItems[0].beforeProblem}
                    </p>
                  </div>

                  <div className={`p-3.5 rounded-2xl border ${
                    theme === 'light' ? 'bg-emerald-50/70 border-emerald-200' : 'bg-emerald-950/30 border-emerald-500/30'
                  }`}>
                    <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>THE APPLIED RESOLUTION</span>
                    </div>
                    <p className={`text-xs leading-relaxed ${theme === 'light' ? 'text-slate-700' : 'text-slate-300'}`}>
                      {showcaseItems[0].afterSolution}
                    </p>
                  </div>
                </div>

                {/* Fast metrics row */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className={`p-3 rounded-xl border text-center ${
                    theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'
                  }`}>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Repair Time</span>
                    <span className="text-sm font-bold text-cyan-400 font-mono">35 Minutes</span>
                  </div>
                  <div className={`p-3 rounded-xl border text-center ${
                    theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/60 border-slate-800'
                  }`}>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Availability</span>
                    <span className="text-sm font-bold text-emerald-400 font-mono">99.99% Restored</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-800/80">
                <button
                  onClick={() => setActiveModalItem(showcaseItems[0])}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>View Technical Code Patch</span>
                </button>
                <button
                  onClick={() => handleOrderFix(showcaseItems[0].title)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-amber-500 hover:from-red-600 hover:to-amber-600 text-white text-xs font-bold shadow-md shadow-red-500/20 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Fix My Website Error Now</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Visual Cards Grid (All 6 High-Res Case Studies) */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {filteredItems.map((item, idx) => {
              const isShowingBefore = activeComparisonMode[item.id] === 'before';
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className={`rounded-3xl border overflow-hidden backdrop-blur-md flex flex-col justify-between group hover:border-cyan-500/50 transition-all duration-300 ${
                    theme === 'light'
                      ? 'bg-white border-slate-200 shadow-lg hover:shadow-2xl'
                      : 'bg-[#0b1020] border-slate-800/90 shadow-xl'
                  }`}
                >
                  {/* Card Image Banner with hover zoom & interactive overlay */}
                  <div className="relative aspect-video overflow-hidden bg-slate-950 cursor-pointer" onClick={() => setActiveModalItem(item)}>
                    <img
                      src={item.imageSrc}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                    {/* Top status tag */}
                    <div className="absolute top-3 left-3 flex items-center space-x-2 z-10">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold border backdrop-blur-md ${item.errorBadge.color}`}>
                        {item.errorBadge.code}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-slate-900/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                        {item.categoryLabel}
                      </span>
                    </div>

                    {/* Expand click hint */}
                    <div className="absolute bottom-3 right-3 p-2 rounded-xl bg-slate-900/80 text-slate-300 hover:text-white border border-slate-700 backdrop-blur-md transition-transform group-hover:scale-110">
                      <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                    </div>

                    {/* Bottom metrics teaser */}
                    <div className="absolute bottom-3 left-3 right-14 truncate">
                      <span className="text-[11px] font-mono text-emerald-400 font-semibold flex items-center space-x-1">
                        <CheckCircle2 className="w-3 h-3 shrink-0" />
                        <span className="truncate">{item.resolvedBadge.metrics}</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className={`text-base font-bold tracking-tight line-clamp-1 group-hover:text-cyan-400 transition-colors ${
                        theme === 'light' ? 'text-slate-900' : 'text-white'
                      }`}>
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-purple-400 font-mono mt-0.5 line-clamp-1">
                        {item.tagline}
                      </p>

                      {/* Interactive Before / After Toggle for this card */}
                      <div className="mt-4 p-3 rounded-2xl bg-slate-950/50 border border-slate-800/80">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                            Status Breakdown:
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleComparison(item.id);
                            }}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 flex items-center space-x-1 cursor-pointer transition-colors"
                          >
                            <SlidersHorizontal className="w-2.5 h-2.5" />
                            <span>Switch to {isShowingBefore ? 'Resolution' : 'Error'}</span>
                          </button>
                        </div>

                        {isShowingBefore ? (
                          <div className="text-xs text-red-300 leading-relaxed font-sans">
                            <span className="font-bold text-red-400 block mb-0.5">Critical Error:</span>
                            {item.beforeProblem}
                          </div>
                        ) : (
                          <div className="text-xs text-emerald-300 leading-relaxed font-sans">
                            <span className="font-bold text-emerald-400 block mb-0.5">Permanent Fix:</span>
                            {item.afterSolution}
                          </div>
                        )}
                      </div>

                      {/* Tools tag badges */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {item.technicalDetails.toolsUsed.slice(0, 3).map(tool => (
                          <span
                            key={tool}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900/60 text-slate-400 border border-slate-800"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card Actions Bottom */}
                    <div className="mt-5 pt-3 border-t border-slate-800/60 flex items-center justify-between gap-2">
                      <button
                        onClick={() => setActiveModalItem(item)}
                        className="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-slate-800 transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                      >
                        <span>Full Case Study</span>
                        <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
                      </button>

                      <button
                        onClick={() => handleOrderFix(item.title)}
                        className="py-2 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                        title="Book Fix for this type of issue"
                      >
                        <Zap className="w-3 h-3 text-amber-300" />
                        <span className="hidden sm:inline">Fix This</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* =========================================================================
          HIGH-RESOLUTION LIGHTBOX & TECHNICAL CASE STUDY MODAL
         ========================================================================= */}
      <AnimatePresence>
        {activeModalItem && (
          <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-4xl bg-[#090d1a] border border-cyan-500/40 rounded-3xl shadow-2xl overflow-hidden relative my-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModalItem(null)}
                className="absolute top-4 right-4 p-2.5 rounded-xl bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700 z-20 cursor-pointer shadow-lg"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Full-Width High-Res Image Header */}
              <div className="relative aspect-video w-full bg-slate-950 overflow-hidden max-h-[380px]">
                <img
                  src={activeModalItem.imageSrc}
                  alt={activeModalItem.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090d1a] via-transparent to-transparent pointer-events-none" />

                {/* Overlaid Badges */}
                <div className="absolute bottom-4 left-6 right-16 flex flex-wrap items-center gap-2">
                  <span className={`px-3 py-1 rounded-xl text-xs font-mono font-bold border backdrop-blur-md ${activeModalItem.errorBadge.color}`}>
                    {activeModalItem.errorBadge.code} • {activeModalItem.errorBadge.label}
                  </span>
                  <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 backdrop-blur-md flex items-center space-x-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{activeModalItem.resolvedBadge.metrics}</span>
                  </span>
                </div>
              </div>

              {/* Modal Content Body */}
              <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {activeModalItem.title}
                  </h3>
                  <p className="text-sm text-cyan-400 font-mono mt-1">
                    {activeModalItem.tagline}
                  </p>
                </div>

                {/* Problem & Solution Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-red-950/25 border border-red-500/30">
                    <div className="flex items-center space-x-2 text-xs font-bold text-red-400 mb-2">
                      <AlertTriangle className="w-4 h-4" />
                      <span>INITIAL ROOT CAUSE & PROBLEM</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {activeModalItem.beforeProblem}
                    </p>
                    <div className="mt-3 pt-2 border-t border-red-500/20 text-[11px] text-slate-400">
                      <strong className="text-red-300">Failure Trigger:</strong> {activeModalItem.technicalDetails.rootCause}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-950/25 border border-emerald-500/30">
                    <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 mb-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>PERMANENT CODE & INFRASTRUCTURE FIX</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {activeModalItem.afterSolution}
                    </p>
                    <div className="mt-3 pt-2 border-t border-emerald-500/20 text-[11px] text-slate-400">
                      <strong className="text-emerald-300">Turnaround Time:</strong> {activeModalItem.technicalDetails.turnaroundTime}
                    </div>
                  </div>
                </div>

                {/* Code Patch Snippet */}
                {activeModalItem.codeSnippetFix && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono text-slate-400 flex items-center space-x-1.5">
                        <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Production Code Patch Applied</span>
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                        VERIFIED IN PRODUCTION
                      </span>
                    </div>
                    <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
                      <code>{activeModalItem.codeSnippetFix}</code>
                    </pre>
                  </div>
                )}

                {/* Tech Stack Chips */}
                <div>
                  <span className="text-xs font-mono text-slate-400 block mb-2">
                    Technologies & Diagnostic Utilities Employed:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeModalItem.technicalDetails.toolsUsed.map(t => (
                      <span key={t} className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 text-xs font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Modal CTA Footer */}
                <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-400">
                    Need emergency troubleshooting for your business or web application?
                  </div>
                  <div className="flex items-center space-x-3 w-full sm:w-auto">
                    <button
                      onClick={() => setActiveModalItem(null)}
                      className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-800 cursor-pointer"
                    >
                      Close Viewer
                    </button>
                    <button
                      onClick={() => {
                        setActiveModalItem(null);
                        handleOrderFix(activeModalItem.title);
                      }}
                      className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-amber-500 hover:from-red-600 hover:to-amber-600 text-white text-xs font-bold shadow-md shadow-red-500/20 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span>Request This Fix</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
