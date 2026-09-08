/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import {
  AlertTriangle,
  Activity,
  ShieldCheck,
  Server,
  Zap,
  CheckCircle2,
  Clock,
  ExternalLink,
  Search,
  Filter,
  Lock,
  ArrowRight,
  Maximize2,
  X,
  Radio,
  FileCode2,
  Globe,
  Bell,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import diagnosticsDeskImg from '../assets/images/web_error_diagnostics_desk_1788856966627.jpg';
import alertBeaconImg from '../assets/images/error_alert_badge_1788856986853.jpg';

interface ErrorLogItem {
  id: string;
  timestamp: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  type: string;
  description: string;
  status: 'Unresolved' | 'Investigating' | 'Open' | 'Pending' | 'Resolved';
  resolutionNote?: string;
}

const initialErrorLogs: ErrorLogItem[] = [
  {
    id: 'err-1',
    timestamp: '2026-09-08 08:32:45',
    severity: 'CRITICAL',
    type: '404',
    description: '/blog/old-post-slug not found (Broken 301 Redirect Loop)',
    status: 'Unresolved',
    resolutionNote: 'Configuring Nginx rewrite rules and updating canonical headers.'
  },
  {
    id: 'err-2',
    timestamp: '2026-09-08 08:31:12',
    severity: 'HIGH',
    type: '502',
    description: 'API Gateway timeout on /checkout/process-order',
    status: 'Investigating',
    resolutionNote: 'PHP-FPM worker pool exhausted; optimizing connection pooling.'
  },
  {
    id: 'err-3',
    timestamp: '2026-09-08 08:29:00',
    severity: 'MEDIUM',
    type: 'SEO',
    description: 'Missing primary H1 tag and canonical link on homepage',
    status: 'Open',
    resolutionNote: 'Restructuring semantic DOM tree and injecting structured JSON-LD.'
  },
  {
    id: 'err-4',
    timestamp: '2026-09-08 08:25:33',
    severity: 'LOW',
    type: 'Performance',
    description: 'Uncompressed hero images causing 1.8s LCP delay',
    status: 'Pending',
    resolutionNote: 'Converting PNGs to modern WebP/AVIF with responsive srcset.'
  },
  {
    id: 'err-5',
    timestamp: '2026-09-08 08:20:18',
    severity: 'CRITICAL',
    type: '500',
    description: 'Fatal Error: Uncaught TypeError in database query handler',
    status: 'Unresolved',
    resolutionNote: 'Sanitizing null database payloads and patching SQL connection retry logic.'
  },
  {
    id: 'err-6',
    timestamp: '2026-09-08 08:14:05',
    severity: 'HIGH',
    type: 'Security',
    description: 'SSL Certificate expiration warning (3 days remaining)',
    status: 'Investigating',
    resolutionNote: 'Triggering automated Let\'s Encrypt Certbot renewal with DNS-01 verification.'
  }
];

export default function WebsiteErrorDiagnostics() {
  const { theme } = useTheme();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // State
  const [activeTab, setActiveTab] = useState<'visual' | 'simulator' | 'checker'>('visual');
  const [logs, setLogs] = useState<ErrorLogItem[]>(initialErrorLogs);
  const [filterSeverity, setFilterSeverity] = useState<string>('ALL');
  const [selectedImageModal, setSelectedImageModal] = useState<string | null>(null);
  const [resolvingId, setResolvingId] = useState<string | null>(null);

  // Instant Diagnostic Tool State
  const [inputUrl, setInputUrl] = useState('');
  const [issueType, setIssueType] = useState('500');
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState<any | null>(null);

  // Filtered error log
  const filteredLogs = logs.filter(item => {
    if (filterSeverity === 'ALL') return true;
    return item.severity === filterSeverity;
  });

  const criticalCount = logs.filter(l => l.severity === 'CRITICAL' && l.status !== 'Resolved').length;
  const highCount = logs.filter(l => l.severity === 'HIGH' && l.status !== 'Resolved').length;
  const resolvedCount = logs.filter(l => l.status === 'Resolved').length;

  const handleResolveError = (id: string) => {
    setResolvingId(id);
    setTimeout(() => {
      setLogs(prev => prev.map(item => item.id === id ? { ...item, status: 'Resolved' } : item));
      setResolvingId(null);
    }, 600);
  };

  const handleResetSimulator = () => {
    setLogs(initialErrorLogs);
  };

  const handleRunAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl) return;
    setIsAuditing(true);
    setAuditResult(null);

    setTimeout(() => {
      setIsAuditing(false);
      setAuditResult({
        url: inputUrl.startsWith('http') ? inputUrl : `https://${inputUrl}`,
        errorType: issueType,
        severity: issueType === '500' || issueType === 'white_screen' ? 'CRITICAL' : 'HIGH',
        diagnosis: issueType === '500' 
          ? 'Internal Server Error (HTTP 500) detected. Likely PHP memory exhaustion, syntax error in theme/plugin, or corrupted .htaccess file.'
          : issueType === '404'
            ? 'Persistent 404 Not Found cascade detected. Broken permalink structure and missing redirect rules leading to SEO crawl budget bleed.'
            : issueType === 'ssl'
              ? 'SSL Handshake Failure & Mixed Content Warnings. Unencrypted HTTP asset calls triggering browser security warnings.'
              : issueType === 'slow'
                ? 'Core Web Vitals failure. Heavy unminified scripts and slow database queries causing 4.2s time-to-first-byte (TTFB).'
                : 'Fatal execution error halting WordPress / Next.js rendering cycle with zero error output to browser.',
        fixPlan: [
          'Immediate error log inspection & root cause isolation (within 15 mins)',
          'Safe staging environment hotfix deployment with zero downtime',
          'Database query optimization & memory limit reconfiguration',
          '301 redirect map creation & Google Search Console validation'
        ],
        estTime: '30 - 90 Minutes Guaranteed Turnaround',
        priceTier: '$45 - $120 Emergency One-Time Fix'
      });
    }, 1200);
  };

  return (
    <section 
      id="diagnostics" 
      ref={sectionRef} 
      className="py-20 relative overflow-hidden transition-colors duration-300"
    >
      {/* Subtle background ambient glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-mono mb-4"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            <span>Emergency Website Diagnostics & Error Resolution Center</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight ${
              theme === 'light' ? 'text-slate-900' : 'text-white'
            }`}
          >
            Apex Web Diagnostics & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-amber-400 to-cyan-400">
              Instant Website Error Fixing
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed"
          >
            From fatal 500 server crashes and 404 redirect loops to high-latency database spikes and security breaches — real-time web audits, continuous error telemetry, and rapid emergency bug repair.
          </motion.p>

          {/* Mode Switcher Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-2 mt-8"
          >
            <button
              onClick={() => setActiveTab('visual')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center space-x-2 cursor-pointer ${
                activeTab === 'visual'
                  ? 'bg-gradient-to-r from-red-500 to-amber-500 text-white shadow-lg shadow-red-500/25'
                  : theme === 'light'
                    ? 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                    : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Visual Diagnostics Workstation</span>
            </button>

            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center space-x-2 cursor-pointer ${
                activeTab === 'simulator'
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg shadow-purple-600/25'
                  : theme === 'light'
                    ? 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                    : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Server className="w-4 h-4" />
              <span>Interactive APEX Dashboard Simulator</span>
              <span className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-red-950 text-red-300 border border-red-500/30">
                {criticalCount} Critical
              </span>
            </button>

            <button
              onClick={() => setActiveTab('checker')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center space-x-2 cursor-pointer ${
                activeTab === 'checker'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                  : theme === 'light'
                    ? 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                    : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>Instant Website Error Checker</span>
            </button>
          </motion.div>
        </div>

        {/* =========================================================================
            TAB 1: VISUAL DIAGNOSTICS WORKSTATION (Featuring generated high-res visual assets)
           ========================================================================= */}
        {activeTab === 'visual' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="space-y-10"
          >
            {/* Split Visual Showcase: Left (Apex Diagnostics Monitor), Right (Neon Alert Beacon + Incident Protocol) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Primary Diagnostic Screen Preview */}
              <div className="lg:col-span-8 flex flex-col">
                <div className={`p-5 sm:p-7 rounded-3xl border relative overflow-hidden backdrop-blur-md flex flex-col justify-between flex-1 ${
                  theme === 'light'
                    ? 'bg-white border-slate-200 shadow-xl'
                    : 'bg-[#0a0f1d] border-red-500/30 shadow-2xl'
                }`}>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-800">
                    <div className="flex items-center space-x-3">
                      <div className="p-2.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-400">
                        <Activity className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className={`text-base sm:text-lg font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                            APEX Web Diagnostics Workstation
                          </h3>
                          <span className="px-2 py-0.5 text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-500/30 rounded-full">
                            LIVE MONITORING
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">
                          High-resolution telemetry console tracking HTTP error codes, CPU/Memory spikes, broken links, and latency bottlenecks.
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedImageModal(diagnosticsDeskImg)}
                      className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors flex items-center space-x-1 text-xs shrink-0 cursor-pointer"
                      title="Inspect Full Resolution"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="hidden sm:inline font-mono">Expand View</span>
                    </button>
                  </div>

                  {/* Image Display with Interactive Hotspot Overlays */}
                  <div className="relative rounded-2xl overflow-hidden border border-slate-800 group aspect-video bg-black flex items-center justify-center">
                    <img 
                      src={diagnosticsDeskImg} 
                      alt="APEX Web Diagnostics High-Res Developer Workstation"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none" />

                    {/* Bottom overlay status */}
                    <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800/90 backdrop-blur-md flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping inline-block" />
                        <span className="text-slate-300">57 Critical HTTP Codes Detected</span>
                      </div>
                      <div className="flex items-center space-x-3 text-[11px]">
                        <span className="text-amber-400">CPU 92%</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-cyan-400">Latency Spike 4.5s</span>
                        <span className="text-slate-600">•</span>
                        <button
                          onClick={() => setActiveTab('simulator')}
                          className="px-2.5 py-1 rounded bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold text-[10px] hover:scale-105 transition-transform cursor-pointer"
                        >
                          Launch Fix Simulator →
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 4 Feature Pillars Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-800/80">
                    <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                      <div className="text-[10px] font-mono text-red-400">HTTP ERRORS</div>
                      <div className="text-sm font-bold text-white mt-0.5">500 / 404 / 502</div>
                      <div className="text-[10px] text-slate-400">Automatic route triage</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                      <div className="text-[10px] font-mono text-amber-400">SERVER HEALTH</div>
                      <div className="text-sm font-bold text-white mt-0.5">92% CPU Load</div>
                      <div className="text-[10px] text-slate-400">Worker pool throttle</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                      <div className="text-[10px] font-mono text-cyan-400">LATENCY SPIKES</div>
                      <div className="text-sm font-bold text-white mt-0.5">2.1s → 0.3s</div>
                      <div className="text-[10px] text-slate-400">Redis / CDN caching</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                      <div className="text-[10px] font-mono text-purple-400">BROKEN LINKS</div>
                      <div className="text-sm font-bold text-white mt-0.5">158 Fixed</div>
                      <div className="text-[10px] text-slate-400">301 SEO redirects</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary Alert Beacon & 24/7 Incident Dispatch */}
              <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
                {/* Neon Error Alert Badge Card */}
                <div className={`p-6 rounded-3xl border relative overflow-hidden backdrop-blur-md ${
                  theme === 'light'
                    ? 'bg-white border-slate-200 shadow-xl'
                    : 'bg-[#0a0f1d] border-cyan-500/30 shadow-2xl'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-[11px] font-mono">
                      <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
                      <span>Instant Alert Beacon</span>
                    </div>

                    <button
                      onClick={() => setSelectedImageModal(alertBeaconImg)}
                      className="text-slate-400 hover:text-white"
                      title="Inspect Beacon Asset"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="relative rounded-2xl overflow-hidden aspect-square bg-slate-950 border border-slate-800 flex items-center justify-center group mb-4">
                    <img 
                      src={alertBeaconImg} 
                      alt="Neon Website Error Alert Beacon Icon"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-cyan-500/10 mix-blend-overlay pointer-events-none" />
                  </div>

                  <h4 className={`text-base font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                    Real-Time Error Alert Dispatch
                  </h4>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    Whenever an HTTP 500 error, database lockup, or traffic spike hits your website, automated webhooks instantly dispatch alerts to Fahad for immediate emergency triage.
                  </p>

                  <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Response SLA:</span>
                    <span className="text-emerald-400 font-bold">&lt; 15 Minutes On-Call</span>
                  </div>
                </div>

                {/* Emergency Triage CTA Banner */}
                <div className="p-6 rounded-3xl bg-gradient-to-br from-red-950/60 via-slate-900 to-amber-950/60 border border-red-500/30 text-white space-y-3">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-mono font-bold tracking-wide text-amber-300 uppercase">Is Your Site Down Right Now?</span>
                  </div>
                  <h4 className="text-lg font-bold text-white leading-snug">
                    Emergency Error Hotfix Service
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Don't lose sales or SEO ranking. Get your website errors diagnosed and patched with zero data loss.
                  </p>
                  <a
                    href="https://wa.me/923284724773?text=Hi%20Fahad,%20my%20website%20has%20an%20urgent%20error/bug.%20Can%20you%20help%20fix%20it%20now?"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-red-500 to-amber-500 text-white text-xs font-bold flex items-center justify-center space-x-2 hover:brightness-110 shadow-lg shadow-red-600/30 transition-all cursor-pointer"
                  >
                    <span>Request Emergency Fix Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* =========================================================================
            TAB 2: INTERACTIVE APEX DASHBOARD SIMULATOR (Directly based on the uploaded photo!)
           ========================================================================= */}
        {activeTab === 'simulator' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-6 sm:p-8 rounded-3xl border backdrop-blur-md space-y-6 ${
              theme === 'light'
                ? 'bg-white border-slate-200 shadow-xl'
                : 'bg-[#080c18] border-purple-500/30 shadow-2xl'
            }`}
          >
            {/* Simulator Control Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-red-600 to-amber-600 text-white shadow-lg">
                  <Server className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className={`text-xl sm:text-2xl font-bold font-mono tracking-tight ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                      APEX WEB DIAGNOSTICS
                    </h3>
                    <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-red-950 text-red-400 border border-red-500/30">
                      LIVE CONSOLE
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Faithfully simulated from Fahad's live monitoring desk. Click "Resolve" on any incident below to simulate real-time remediation.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={handleResetSimulator}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-mono border border-slate-700 transition-colors cursor-pointer"
                >
                  Reset Incidents
                </button>
                <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
                  <span className="text-slate-400">Status:</span>
                  <span className={criticalCount > 0 ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>
                    {criticalCount > 0 ? `${criticalCount} UNRESOLVED` : 'ALL RESOLVED 100%'}
                  </span>
                </div>
              </div>
            </div>

            {/* 4 Quadrants Mirroring the Uploaded Monitor Photo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* QUADRANT 1: HTTP ERROR CODES */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800/90 relative overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
                      HTTP Error Codes
                    </h4>
                    <span className="text-[10px] font-mono text-slate-500">Live Traffic Stream</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                    {/* Donut representation */}
                    <div className="sm:col-span-5 flex flex-col items-center justify-center p-3">
                      <div className="w-24 h-24 rounded-full border-8 border-red-500 border-t-amber-500 border-r-purple-500 border-b-cyan-500 flex items-center justify-center relative shadow-inner">
                        <div className="text-center">
                          <span className="text-xs font-mono text-slate-400">TOTAL</span>
                          <div className="text-lg font-bold text-white">70</div>
                        </div>
                      </div>
                    </div>

                    {/* Breakdown list */}
                    <div className="sm:col-span-7 space-y-1.5 text-xs font-mono">
                      <div className="flex items-center justify-between p-1.5 rounded bg-red-950/40 border border-red-500/20 text-red-300">
                        <span className="flex items-center space-x-1.5">
                          <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
                          <span>404 Not Found (45)</span>
                        </span>
                        <span className="text-[10px] font-bold uppercase">Critical</span>
                      </div>
                      <div className="flex items-center justify-between p-1.5 rounded bg-red-950/30 border border-red-500/20 text-red-400">
                        <span className="flex items-center space-x-1.5">
                          <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
                          <span>500 Internal Server (12)</span>
                        </span>
                        <span className="text-[10px] font-bold uppercase">Critical</span>
                      </div>
                      <div className="flex items-center justify-between p-1.5 rounded bg-amber-950/40 border border-amber-500/20 text-amber-300">
                        <span className="flex items-center space-x-1.5">
                          <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                          <span>502 Bad Gateway (8)</span>
                        </span>
                        <span className="text-[10px] font-bold uppercase">High</span>
                      </div>
                      <div className="flex items-center justify-between p-1.5 rounded bg-purple-950/40 border border-purple-500/20 text-purple-300">
                        <span className="flex items-center space-x-1.5">
                          <span className="w-2 h-2 rounded-full bg-purple-500 inline-block" />
                          <span>403 Forbidden (5)</span>
                        </span>
                        <span className="text-[10px] font-bold uppercase">Medium</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-around mt-4 pt-3 border-t border-slate-900 text-center font-mono">
                  <div>
                    <span className="text-[10px] text-slate-500 block">CRITICAL</span>
                    <span className="text-xl font-bold text-red-400">57</span>
                  </div>
                  <div className="h-6 w-px bg-slate-800" />
                  <div>
                    <span className="text-[10px] text-slate-500 block">HIGH</span>
                    <span className="text-xl font-bold text-amber-400">8</span>
                  </div>
                  <div className="h-6 w-px bg-slate-800" />
                  <div>
                    <span className="text-[10px] text-slate-500 block">STATUS</span>
                    <span className="text-xs font-bold text-cyan-400">Auto-Triage Active</span>
                  </div>
                </div>
              </div>

              {/* QUADRANT 2: SERVER HEALTH & SECURITY */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800/90 relative overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
                      Server Health & Security
                    </h4>
                    <span className="text-[10px] font-mono text-slate-500">Node / Nginx / MySQL</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                    {/* Bar Metrics */}
                    <div className="sm:col-span-6 space-y-2">
                      <div>
                        <div className="flex justify-between text-[11px] font-mono mb-1">
                          <span className="text-slate-400">CPU Usage</span>
                          <span className="text-red-400 font-bold">92% (High)</span>
                        </div>
                        <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                          <div className="h-full bg-red-500 rounded-full w-[92%]" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] font-mono mb-1">
                          <span className="text-slate-400">Memory (RAM)</span>
                          <span className="text-amber-400 font-bold">78% (Medium)</span>
                        </div>
                        <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full w-[78%]" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[11px] font-mono mb-1">
                          <span className="text-slate-400">Storage I/O</span>
                          <span className="text-cyan-400 font-bold">34% (Normal)</span>
                        </div>
                        <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                          <div className="h-full bg-cyan-500 rounded-full w-[34%]" />
                        </div>
                      </div>
                    </div>

                    {/* Glowing Lock Security Badge */}
                    <div className="sm:col-span-6 flex flex-col items-center justify-center p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                      <div className="p-3 rounded-2xl bg-red-950/60 border border-red-500/40 text-red-400 shadow-lg shadow-red-500/20 mb-2 animate-pulse">
                        <Lock className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-mono font-bold text-white">SSL/HTTPS: SECURE</span>
                      <span className="text-[10px] font-mono text-emerald-400">Valid until 2026</span>
                      <span className="text-[10px] font-mono text-red-400 mt-1">3 Critical Vulnerabilities</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Security Firewall:</span>
                  <span className="text-cyan-400">WAF & DDoS Mitigation Armed</span>
                </div>
              </div>

              {/* QUADRANT 3: PERFORMANCE & LATENCY */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800/90 relative overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
                      Performance & Latency
                    </h4>
                    <span className="text-xs font-mono text-amber-400">Avg Response: 2.1s</span>
                  </div>

                  {/* Latency graph curve simulation */}
                  <div className="h-20 w-full bg-slate-900/50 rounded-xl p-2 relative flex items-end justify-between border border-slate-800">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                      <div className="w-full h-px bg-slate-700" />
                    </div>

                    {[35, 42, 38, 95, 40, 48, 92, 45, 39, 41].map((val, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center mx-0.5 group">
                        <div 
                          className={`w-full rounded-t transition-all ${
                            val > 80 ? 'bg-red-500' : val > 50 ? 'bg-amber-400' : 'bg-cyan-500'
                          }`}
                          style={{ height: `${val}%` }}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                    <span>00:00</span>
                    <span className="text-red-400">Spike 4.5s (12:00)</span>
                    <span className="text-red-400">Spike 4.5s (20:00)</span>
                    <span>23:59</span>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-900 space-y-1 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Bottleneck 1:</span>
                    <span className="text-red-400 font-semibold">Database Query (High)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Bottleneck 2:</span>
                    <span className="text-amber-400 font-semibold">Render Blocking Resources (Medium)</span>
                  </div>
                </div>
              </div>

              {/* QUADRANT 4: BROKEN LINKS & SEO ERRORS */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800/90 relative overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
                      Broken Links & SEO Errors
                    </h4>
                    <span className="text-xs font-mono text-red-400">Audit Score: 68/100</span>
                  </div>

                  <div className="space-y-2 text-xs font-mono">
                    <div className="p-2.5 rounded-xl bg-red-950/30 border border-red-500/20 flex items-center justify-between">
                      <span className="text-red-300">Broken Links:</span>
                      <span className="font-bold text-red-400">158 (High)</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-500/20 flex items-center justify-between">
                      <span className="text-amber-300">Missing Alt Tags:</span>
                      <span className="font-bold text-amber-400">234 (Low)</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-purple-950/30 border border-purple-500/20 flex items-center justify-between">
                      <span className="text-purple-300">Duplicate Meta Descriptions:</span>
                      <span className="font-bold text-purple-400">89 (Medium)</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-900 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Remediation:</span>
                  <span className="text-cyan-400">301 Redirect Automation Armed</span>
                </div>
              </div>
            </div>

            {/* QUADRANT 5: DIAGNOSTIC LOG & AUDIT TRAIL (Live Table) */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800/90">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
                <div>
                  <h4 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                    Diagnostic Log & Audit Trail
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Real-time error trace table. Click "Resolve" on any active line to test the hotfix pipeline.
                  </p>
                </div>

                <div className="flex items-center space-x-1.5">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map((sev) => (
                    <button
                      key={sev}
                      onClick={() => setFilterSeverity(sev)}
                      className={`px-2 py-0.5 text-[10px] font-mono rounded transition-colors cursor-pointer ${
                        filterSeverity === sev
                          ? 'bg-purple-600 text-white font-bold'
                          : 'bg-slate-900 text-slate-400 hover:text-white'
                      }`}
                    >
                      {sev}
                    </button>
                  ))}
                </div>
              </div>

              {/* Table wrapper */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="text-slate-500 border-b border-slate-800 text-[10px] uppercase">
                      <th className="py-2 px-3">Timestamp</th>
                      <th className="py-2 px-3">Severity</th>
                      <th className="py-2 px-3">Type</th>
                      <th className="py-2 px-3">Description</th>
                      <th className="py-2 px-3">Status</th>
                      <th className="py-2 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-900/40 transition-colors">
                        <td className="py-2.5 px-3 text-slate-400 whitespace-nowrap text-[11px]">
                          {log.timestamp}
                        </td>
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            log.severity === 'CRITICAL'
                              ? 'bg-red-950 text-red-400 border border-red-500/30'
                              : log.severity === 'HIGH'
                                ? 'bg-amber-950 text-amber-400 border border-amber-500/30'
                                : log.severity === 'MEDIUM'
                                  ? 'bg-purple-950 text-purple-400 border border-purple-500/30'
                                  : 'bg-blue-950 text-blue-400 border border-blue-500/30'
                          }`}>
                            {log.severity}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 font-bold text-cyan-300 whitespace-nowrap">
                          {log.type}
                        </td>
                        <td className="py-2.5 px-3 text-slate-200">
                          <div>{log.description}</div>
                          {log.resolutionNote && (
                            <div className="text-[10px] text-slate-400 mt-0.5 italic">
                              Fix: {log.resolutionNote}
                            </div>
                          )}
                        </td>
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            log.status === 'Resolved'
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                              : log.status === 'Unresolved'
                                ? 'bg-red-950 text-red-300 border border-red-500/20'
                                : 'bg-slate-900 text-amber-300 border border-slate-700'
                          }`}>
                            {log.status}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right whitespace-nowrap">
                          {log.status !== 'Resolved' ? (
                            <button
                              onClick={() => handleResolveError(log.id)}
                              disabled={resolvingId === log.id}
                              className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-red-600 to-amber-600 hover:brightness-110 text-white text-[10px] font-bold transition-all cursor-pointer"
                            >
                              {resolvingId === log.id ? 'Fixing...' : 'Fix Error'}
                            </button>
                          ) : (
                            <span className="inline-flex items-center space-x-1 text-emerald-400 text-[10px]">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Fixed</span>
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* =========================================================================
            TAB 3: INSTANT WEBSITE ERROR CHECKER
           ========================================================================= */}
        {activeTab === 'checker' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className={`p-6 sm:p-8 rounded-3xl border backdrop-blur-md max-w-3xl mx-auto space-y-6 ${
              theme === 'light'
                ? 'bg-white border-slate-200 shadow-xl'
                : 'bg-[#0a0f1e] border-cyan-500/30 shadow-2xl'
            }`}
          >
            <div className="text-center space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono">
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                <span>Instant Diagnostic & Estimate Calculator</span>
              </div>
              <h3 className={`text-2xl font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                Diagnose Your Website Error Right Now
              </h3>
              <p className="text-xs text-slate-400">
                Enter your website URL and select the primary symptom to generate an instant diagnosis and resolution roadmap.
              </p>
            </div>

            <form onSubmit={handleRunAudit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">
                  Website URL (or staging link)
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="https://yourwebsite.com"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-xs sm:text-sm font-mono focus:outline-none focus:border-cyan-500 transition-colors ${
                      theme === 'light'
                        ? 'bg-slate-50 border-slate-300 text-slate-900'
                        : 'bg-slate-950 border-slate-800 text-white'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">
                  Observed Error / Issue Type
                </label>
                <select
                  value={issueType}
                  onChange={(e) => setIssueType(e.target.value)}
                  className={`w-full p-3 rounded-xl border text-xs sm:text-sm font-mono focus:outline-none focus:border-cyan-500 ${
                    theme === 'light'
                      ? 'bg-slate-50 border-slate-300 text-slate-900'
                      : 'bg-slate-950 border-slate-800 text-white'
                  }`}
                >
                  <option value="500">500 Internal Server Error (Server crash / syntax error)</option>
                  <option value="white_screen">White Screen of Death (Blank page loading)</option>
                  <option value="404">404 Not Found cascade (Broken links & redirect loops)</option>
                  <option value="ssl">SSL / HTTPS Security Warning ("Not Secure" alert)</option>
                  <option value="slow">Critical Slow Latency (5+ seconds load time)</option>
                  <option value="checkout">Broken E-Commerce Checkout / Payment Gateway failure</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isAuditing}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-500 via-amber-500 to-cyan-500 text-white font-bold text-sm shadow-lg hover:brightness-110 transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                {isAuditing ? (
                  <>
                    <Activity className="w-4 h-4 animate-spin" />
                    <span>Running Real-Time Diagnostic Scan...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Run Instant Health Audit</span>
                  </>
                )}
              </button>
            </form>

            {/* Audit Results Card */}
            <AnimatePresence>
              {auditResult && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-5 rounded-2xl bg-slate-950 border border-cyan-500/40 space-y-4 text-xs font-mono"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase">Target Domain</span>
                      <div className="text-sm font-bold text-white truncate max-w-xs">{auditResult.url}</div>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-red-950 text-red-400 border border-red-500/30 text-[10px] font-bold">
                      {auditResult.severity} INCIDENT
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 font-bold block mb-1">Root Cause Diagnosis:</span>
                    <p className="text-slate-200 leading-relaxed">{auditResult.diagnosis}</p>
                  </div>

                  <div>
                    <span className="text-slate-400 font-bold block mb-1.5">Remediation Roadmap:</span>
                    <ul className="space-y-1 text-slate-300">
                      {auditResult.fixPlan.map((step: string, idx: number) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Estimated Fix Time</span>
                      <span className="text-xs font-bold text-amber-300">{auditResult.estTime}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Estimated Cost Tier</span>
                      <span className="text-xs font-bold text-emerald-400">{auditResult.priceTier}</span>
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/923284724773?text=Hi%20Fahad,%20I%20ran%20the%20audit%20for%20${encodeURIComponent(auditResult.url)}%20with%20error%20${auditResult.errorType}.%20Can%20we%20fix%20this%20now?`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold text-xs flex items-center justify-center space-x-2 hover:brightness-110 shadow-lg cursor-pointer"
                  >
                    <span>Hire Fahad to Fix This Website Error Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Image Zoom Modal */}
      <AnimatePresence>
        {selectedImageModal && (
          <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-5xl w-full bg-slate-950 border border-purple-500/40 rounded-3xl overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setSelectedImageModal(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-900/80 text-slate-300 hover:text-white border border-slate-700 z-10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-2 bg-black flex items-center justify-center">
                <img 
                  src={selectedImageModal} 
                  alt="Full resolution diagnostics asset"
                  referrerPolicy="no-referrer"
                  className="max-h-[80vh] w-auto object-contain rounded-2xl"
                />
              </div>

              <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-300">
                <span className="text-cyan-400">APEX Web Diagnostics & Error Resolution Asset</span>
                <span>Press ESC or click close to return</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
