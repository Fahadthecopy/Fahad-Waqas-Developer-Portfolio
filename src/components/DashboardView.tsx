/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  AlertCircle,
  Briefcase,
  Wrench,
  FolderGit2,
  FileSpreadsheet,
  Receipt,
  CreditCard,
  Tags,
  PenTool,
  Search,
  BarChart3,
  MessageSquare,
  Star,
  HelpCircle,
  Download,
  Settings,
  Bell,
  Mail,
  Moon,
  Sun,
  Calendar,
  ChevronDown,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Globe,
  Link2,
  PlusCircle,
  FileText,
  KeyRound,
  CheckCircle2,
  Clock,
  Send,
  Phone,
  ShieldCheck,
  Zap,
  ExternalLink,
  Filter,
  Check,
  X,
  Play,
  Share2,
  Sparkles,
  RefreshCw,
  Eye,
  SlidersHorizontal,
  Code2,
  Trash2,
  Edit3,
  Copy,
  Sliders,
  Palette,
  Laptop,
  Layers,
  Github,
  GitBranch,
  GitCommit,
  Activity,
  Image as ImageIcon
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { ClientProblemRecord, OrderInvoiceRecord, InquiryMessageRecord, ProjectRecord, GitHubRepoRecord } from '../types';
import { githubRepositories, GITHUB_PROFILE_URL, GITHUB_USERNAME } from '../data/githubRepos';

interface DashboardProps {
  onSwitchToPublic: () => void;
  onNavigateToSection?: (sectionId: string) => void;
}

export default function DashboardView({ onSwitchToPublic, onNavigateToSection }: DashboardProps) {
  const { 
    theme, 
    setTheme, 
    backgroundStyle, 
    setBackgroundStyle, 
    portraitStyle, 
    setPortraitStyle, 
    currentPortraitUrl, 
    setIsBackgroundModalOpen 
  } = useTheme();

  // Navigation & Active States
  const [activeNav, setActiveNav] = useState<string>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<string>('May 25, 2025 - Today');
  const [activeNotificationTab, setActiveNotificationTab] = useState<boolean>(false);

  // Interactive Modals
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedProblem, setSelectedProblem] = useState<ClientProblemRecord | null>(null);
  const [showNotificationToast, setShowNotificationToast] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Real Database / State Collections (with localStorage initialization)
  const [clientProblems, setClientProblems] = useState<ClientProblemRecord[]>(() => {
    const saved = localStorage.getItem('app_client_problems');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      {
        id: 'cp-1',
        problem: 'Database connection failed error',
        category: 'Web Dev',
        status: 'Solved',
        date: 'May 20, 2025',
        clientName: 'Ahmed Raza (FinTech Co)',
        websiteUrl: 'https://fintech-demo.com',
        details: 'MySQL connection pooling timeout caused by unclosed PDO statements under high load. Implemented singleton PDO instance with persistent connection pooling and prepared statements.',
        rootCause: 'Unclosed PDO connection handles and missing max_connections tuning in my.cnf.',
        recommendedSolution: 'Singleton PDO wrapper with reconnect handlers and indexed query execution.',
        estimatedCost: '$45 - $80',
        priority: 'High'
      },
      {
        id: 'cp-2',
        problem: 'Website speed below 40 on mobile',
        category: 'SEO',
        status: 'In Progress',
        date: 'May 22, 2025',
        clientName: 'Sarah Jenkins (E-Commerce)',
        websiteUrl: 'https://shop-jenkins.store',
        details: 'Heavy uncompressed hero banners (4.2MB), render-blocking CSS fonts, and unminified JavaScript bundles dragging mobile speed to 34/100.',
        rootCause: 'Render-blocking CSS, uncompressed WebP images, and synchronous third-party scripts.',
        recommendedSolution: 'Next-gen WebP conversion, critical CSS inlining, defer script execution, and Redis caching.',
        estimatedCost: '$65 - $120',
        priority: 'High'
      },
      {
        id: 'cp-3',
        problem: 'Blog posts not getting indexed',
        category: 'Blogging',
        status: 'Pending',
        date: 'May 24, 2025',
        clientName: 'Michael Chang (Tech Blog)',
        websiteUrl: 'https://changtech.io',
        details: 'Canonical tags mistakenly pointing to staging domain, noindex meta header injected by theme update, and malformed XML sitemap schema.',
        rootCause: 'Disallow directive in robots.txt and conflicting self-referencing canonical URLs.',
        recommendedSolution: 'Robots.txt audit, sitemap regeneration, Google Search Console live URL inspect & indexing ping.',
        estimatedCost: '$35 - $60',
        priority: 'Medium'
      },
      {
        id: 'cp-4',
        problem: 'Keyword ranking dropped from #3 to #18',
        category: 'Keywords',
        status: 'Solved',
        date: 'May 25, 2025',
        clientName: 'David Miller (Law Firm)',
        websiteUrl: 'https://millerlaw.com',
        details: 'Competitor content refresh with updated statistics and search intent shift from informational to transactional.',
        rootCause: 'Outdated H2 headers, missing search intent semantic cluster entities, and stale backlink profile.',
        recommendedSolution: 'Intent-focused content expansion, TF-IDF semantic keyword enrichment, and 3 niche guest posts.',
        estimatedCost: '$90 - $180',
        priority: 'High'
      },
      {
        id: 'cp-5',
        problem: 'Guest post outreach getting low reply rate',
        category: 'Guest Posting',
        status: 'In Progress',
        date: 'May 26, 2025',
        clientName: 'Elena Rostova (SaaS Startup)',
        websiteUrl: 'https://rostovatech.app',
        details: 'Generic outreach email templates landing in spam folder with non-customized subject lines.',
        rootCause: 'Cold email deliverability without DKIM/SPF warmup and impersonalized pitches.',
        recommendedSolution: 'Curated 50+ DA50+ verified webmaster list, bespoke topic pitch with draft outline, and SPF/DKIM verification.',
        estimatedCost: '$120 - $250',
        priority: 'Medium'
      }
    ];
  });

  const [invoices, setInvoices] = useState<OrderInvoiceRecord[]>(() => {
    const saved = localStorage.getItem('app_invoices');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      {
        id: 'inv-101',
        invoiceNumber: 'INV-2025-084',
        clientName: 'Acme Digital Media',
        clientEmail: 'billing@acmedigital.com',
        service: 'Full-Stack PHP/MySQL Custom Portal',
        amount: 450,
        paymentMethod: 'Credit/Debit Card',
        status: 'Paid',
        date: 'May 18, 2025',
        dueDate: 'May 25, 2025'
      },
      {
        id: 'inv-102',
        invoiceNumber: 'INV-2025-085',
        clientName: 'BrightHealth Clinic',
        clientEmail: 'dr.fahim@brighthealth.org',
        service: 'Technical SEO Core Web Vitals Fix',
        amount: 180,
        paymentMethod: 'PayPal',
        status: 'Paid',
        date: 'May 21, 2025',
        dueDate: 'May 28, 2025'
      },
      {
        id: 'inv-103',
        invoiceNumber: 'INV-2025-086',
        clientName: 'Apex Real Estate Hub',
        clientEmail: 'info@apexrealty.ae',
        service: 'High DA Guest Posting Campaign (3 Articles)',
        amount: 280,
        paymentMethod: 'Bank Transfer',
        status: 'Pending',
        date: 'May 24, 2025',
        dueDate: 'June 01, 2025'
      }
    ];
  });

  const [inquiryMessages, setInquiryMessages] = useState<InquiryMessageRecord[]>([
    {
      id: 'msg-1',
      senderName: 'Tariq Mehmood',
      senderEmail: 'tariq@gulfproperties.com',
      phone: '+971 50 123 4567',
      service: 'Web Development',
      message: 'Hi Fahad, we need a custom PHP property listing engine with WhatsApp API integration. When can we start?',
      date: '10 mins ago',
      status: 'Unread',
      isStarred: true
    },
    {
      id: 'msg-2',
      senderName: 'Jessica Taylor',
      senderEmail: 'jess@taylorlaw.co.uk',
      phone: '+44 7700 900123',
      service: 'Complete SEO',
      message: 'Our organic traffic dropped after WordPress 6.5 update. Can you run your 30-point technical audit?',
      date: '2 hours ago',
      status: 'Unread',
      isStarred: false
    },
    {
      id: 'msg-3',
      senderName: 'Carlos Gomez',
      senderEmail: 'carlos@madridtech.es',
      service: 'Guest Posting',
      message: 'Looking for 5 tech guest posts on DA50+ English tech publications. Please share pricing.',
      date: 'Yesterday',
      status: 'Replied',
      isStarred: false
    }
  ]);

  // Form Inputs for New Problem
  const [newProblemTitle, setNewProblemTitle] = useState('');
  const [newProblemCategory, setNewProblemCategory] = useState<'Web Dev' | 'SEO' | 'Blogging' | 'Keywords' | 'Guest Posting' | 'Other'>('Web Dev');
  const [newProblemClient, setNewProblemClient] = useState('');
  const [newProblemDetails, setNewProblemDetails] = useState('');
  const [newProblemPriority, setNewProblemPriority] = useState<'High' | 'Medium' | 'Low'>('High');

  // Form Inputs for New Invoice
  const [invClientName, setInvClientName] = useState('');
  const [invService, setInvService] = useState('Custom Web Development & API Integration');
  const [invAmount, setInvAmount] = useState('250');
  const [invMethod, setInvMethod] = useState<'Credit/Debit Card' | 'PayPal' | 'Bank Transfer' | 'Stripe'>('Credit/Debit Card');

  // SEO Tool states
  const [seoKeywordInput, setSeoKeywordInput] = useState('laravel developer pakistan');
  const [seoMetaTitle, setSeoMetaTitle] = useState('Full Stack Web Developer & SEO Specialist | Fahad Waqas');
  const [seoMetaDesc, setSeoMetaDesc] = useState('Hire Fahad Waqas for custom PHP, MySQL, JavaScript web development, Technical SEO audits, and guest posting strategies. 3+ years experience.');

  // Filters & Sorting for Client Problems Table
  const [problemCategoryFilter, setProblemCategoryFilter] = useState<string>('All');
  const [problemStatusFilter, setProblemStatusFilter] = useState<string>('All');
  const [problemSearchTerm, setProblemSearchTerm] = useState<string>('');

  // Diagnostic wizard state
  const [diagnosticStep, setDiagnosticStep] = useState<number>(1);
  const [diagIssueType, setDiagIssueType] = useState<string>('500 Internal Server Error');
  const [diagPlatform, setDiagPlatform] = useState<string>('PHP / MySQL / Apache');
  const [diagResult, setDiagResult] = useState<any | null>(null);

  // GitHub Repositories & Portfolio Management state
  const [repoSearchTerm, setRepoSearchTerm] = useState<string>('');
  const [repoCategoryFilter, setRepoCategoryFilter] = useState<string>('All');
  const [copiedCloneId, setCopiedCloneId] = useState<string | null>(null);
  const [selectedCliRepo, setSelectedCliRepo] = useState<GitHubRepoRecord>(githubRepositories[0]);
  const [selectedRepoModal, setSelectedRepoModal] = useState<GitHubRepoRecord | null>(null);

  const handleCopyClone = (cloneUrl: string, id: string) => {
    navigator.clipboard.writeText(`git clone ${cloneUrl}`);
    setCopiedCloneId(id);
    triggerToast(`Copied "git clone ${cloneUrl}" to clipboard!`);
    setTimeout(() => setCopiedCloneId(null), 2500);
  };

  // Save to LocalStorage whenever collections change
  useEffect(() => {
    localStorage.setItem('app_client_problems', JSON.stringify(clientProblems));
  }, [clientProblems]);

  useEffect(() => {
    localStorage.setItem('app_invoices', JSON.stringify(invoices));
  }, [invoices]);

  // Global Keyboard shortcut Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setActiveModal(null);
        setSelectedProblem(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const triggerToast = (msg: string) => {
    setShowNotificationToast(msg);
    setTimeout(() => setShowNotificationToast(null), 3500);
  };

  // Add Problem Handler
  const handleAddProblem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProblemTitle.trim()) return;

    const newRecord: ClientProblemRecord = {
      id: `cp-${Date.now()}`,
      problem: newProblemTitle,
      category: newProblemCategory,
      status: 'In Progress',
      date: 'Today',
      clientName: newProblemClient || 'Direct Client Intake',
      details: newProblemDetails || 'Issue registered into the Solution Engine. Running automated diagnostic checklist.',
      rootCause: 'Diagnostic investigation queued.',
      recommendedSolution: 'Run live code review and log trace analysis.',
      estimatedCost: '$50 - $100',
      priority: newProblemPriority
    };

    setClientProblems([newRecord, ...clientProblems]);
    setNewProblemTitle('');
    setNewProblemClient('');
    setNewProblemDetails('');
    setActiveModal(null);
    triggerToast('New client problem registered successfully!');
  };

  // Add Invoice Handler
  const handleAddInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!invClientName.trim() || !invAmount) return;

    const newInv: OrderInvoiceRecord = {
      id: `inv-${Date.now()}`,
      invoiceNumber: `INV-2025-${Math.floor(100 + Math.random() * 900)}`,
      clientName: invClientName,
      clientEmail: `${invClientName.toLowerCase().replace(/\s+/g, '')}@client.com`,
      service: invService,
      amount: parseFloat(invAmount) || 0,
      paymentMethod: invMethod,
      status: 'Pending',
      date: 'Today',
      dueDate: '7 Days Net'
    };

    setInvoices([newInv, ...invoices]);
    setInvClientName('');
    setActiveModal(null);
    triggerToast(`Invoice ${newInv.invoiceNumber} created for $${newInv.amount}`);
  };

  // Delete Problem Handler
  const handleDeleteProblem = (id: string) => {
    setClientProblems(clientProblems.filter(p => p.id !== id));
    setConfirmDeleteId(null);
    setSelectedProblem(null);
    triggerToast('Problem record deleted successfully.');
  };

  // Filtered problems
  const filteredProblems = clientProblems.filter(p => {
    const matchesCategory = problemCategoryFilter === 'All' || p.category === problemCategoryFilter;
    const matchesStatus = problemStatusFilter === 'All' || p.status === problemStatusFilter;
    const matchesSearch = problemSearchTerm === '' || 
      p.problem.toLowerCase().includes(problemSearchTerm.toLowerCase()) ||
      (p.clientName && p.clientName.toLowerCase().includes(problemSearchTerm.toLowerCase()));
    return matchesCategory && matchesStatus && matchesSearch;
  });

  // Calculate totals
  const totalPaidRevenue = invoices.filter(i => i.status === 'Paid').reduce((acc, i) => acc + i.amount, 0);
  const totalPendingInvoices = invoices.filter(i => i.status === 'Pending').length;

  // Sidebar navigation items
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'client-problems', label: 'Client Problems', icon: AlertCircle, badge: String(clientProblems.length), badgeColor: 'bg-rose-500 text-white' },
    { id: 'services', label: 'Services', icon: Briefcase, badge: null },
    { id: 'problem-diagnostic', label: 'Problem Diagnostic', icon: Wrench, badge: 'New', badgeColor: 'bg-emerald-500 text-slate-950 font-bold' },
    { id: 'projects', label: 'Projects / Portfolio', icon: FolderGit2, badge: null },
    { id: 'case-studies', label: 'Case Studies', icon: FileSpreadsheet, badge: null },
    { id: 'orders', label: 'Orders / Invoices', icon: Receipt, badge: String(invoices.length) },
    { id: 'payments', label: 'Payments / Transactions', icon: CreditCard, badge: null },
    { id: 'pricing', label: 'Pricing Packages', icon: Tags, badge: null },
    { id: 'blog', label: 'Blog Management', icon: PenTool, badge: null },
    { id: 'seo-tools', label: 'SEO Tools Hub', icon: Search, badge: null },
    { id: 'analytics', label: 'Reports & Analytics', icon: BarChart3, badge: null },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: String(inquiryMessages.filter(m => m.status === 'Unread').length), badgeColor: 'bg-blue-500 text-white' },
    { id: 'reviews', label: 'Reviews / Testimonials', icon: Star, badge: null },
    { id: 'faq', label: 'FAQ (All Questions)', icon: HelpCircle, badge: null },
    { id: 'downloads', label: 'Downloads / Resources', icon: Download, badge: null },
    { id: 'settings', label: 'Settings & Studio', icon: Settings, badge: null },
  ];

  // 10-Step process
  const workingProcessSteps = [
    { num: 1, title: 'You Tell The Problem', color: 'from-purple-600 to-indigo-600' },
    { num: 2, title: 'We Understand Requirement', color: 'from-blue-600 to-cyan-600' },
    { num: 3, title: 'We Check & Diagnose', color: 'from-cyan-500 to-teal-600' },
    { num: 4, title: 'We Find Root Cause', color: 'from-emerald-500 to-teal-500' },
    { num: 5, title: 'We Explain Clearly', color: 'from-teal-500 to-emerald-600' },
    { num: 6, title: 'We Recommend Solution', color: 'from-yellow-500 to-amber-500' },
    { num: 7, title: 'We Fix & Optimize', color: 'from-orange-500 to-rose-500' },
    { num: 8, title: 'We Test The Result', color: 'from-pink-500 to-purple-600' },
    { num: 9, title: 'We Deliver The Work', color: 'from-purple-600 to-indigo-600' },
    { num: 10, title: 'We Provide Support', color: 'from-cyan-500 to-blue-600' }
  ];

  return (
    <div className={`flex min-h-screen font-sans antialiased selection:bg-purple-500 selection:text-white ${
      theme === 'light' ? 'bg-slate-100 text-slate-900' : 'bg-[#070a13] text-slate-100'
    }`}>
      
      {/* =========================================================================
          LEFT SIDEBAR
         ========================================================================= */}
      <aside className={`w-64 border-r flex flex-col justify-between shrink-0 hidden lg:flex select-none z-30 transition-colors ${
        theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#090d1a] border-slate-800/80'
      }`}>
        <div className="flex flex-col h-full overflow-y-auto custom-scrollbar p-4 space-y-5">
          
          {/* Brand Logo */}
          <div className="flex items-center space-x-3 px-2 py-1">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-400 p-0.5 shadow-lg shadow-purple-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Code2 className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <h1 className={`text-sm font-bold tracking-tight flex items-center gap-1.5 ${
                theme === 'light' ? 'text-slate-900' : 'text-white'
              }`}>
                Fahad Portfolio
              </h1>
              <p className="text-[10px] font-mono text-cyan-500 uppercase tracking-wider font-semibold">
                Client Solution Engine
              </p>
            </div>
          </div>

          {/* Profile Card using real photo */}
          <div className={`p-3 rounded-2xl border flex items-center space-x-3 transition-all ${
            theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-[#0e1424] border-slate-800/80'
          }`}>
            <div className="relative">
              <img 
                src={currentPortraitUrl} 
                alt="Fahad Waqas" 
                className="w-10 h-10 rounded-full object-cover border-2 border-purple-500/50 shadow-md"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-900" />
            </div>
            <div className="overflow-hidden flex-1 min-w-0">
              <div className={`text-xs font-bold truncate flex items-center justify-between ${
                theme === 'light' ? 'text-slate-900' : 'text-white'
              }`}>
                <span>Fahad Waqas</span>
              </div>
              <div className="text-[10px] text-slate-400 truncate font-medium">
                Full-Stack & SEO Expert
              </div>
              <div className="flex items-center space-x-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[9px] font-mono text-emerald-500 font-semibold">Online & Available</span>
              </div>
            </div>
          </div>

          {/* Main Navigation Links */}
          <div className="space-y-1">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-3 mb-2 font-semibold">
              Main Navigation
            </div>

            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-900/60 to-cyan-900/60 text-cyan-400 border border-cyan-500/30 font-semibold shadow-sm'
                      : theme === 'light'
                        ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        : 'text-slate-300 hover:bg-slate-900/70 hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 truncate">
                    <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 shrink-0 ${
                      isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-purple-400'
                    }`} />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${item.badgeColor || 'bg-slate-800 text-slate-300'}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Emergency & Direct Contact */}
          <div className={`p-3.5 rounded-2xl border space-y-2.5 ${
            theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-[#0d1222] border-slate-800/80'
          }`}>
            <div className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span className={theme === 'light' ? 'text-slate-900' : 'text-white'}>Direct Contact</span>
            </div>

            <a
              href="https://wa.me/923000610586"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all flex items-center justify-center space-x-1.5 shadow-md cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat on WhatsApp</span>
            </a>

            <a
              href="tel:03000610586"
              className={`w-full py-1.5 px-3 rounded-xl border text-xs font-mono transition-colors flex items-center justify-center space-x-1.5 ${
                theme === 'light' ? 'bg-white border-slate-200 text-slate-700' : 'bg-slate-900 border-slate-800 text-slate-300'
              }`}
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>03000610586</span>
            </a>

            <div className="text-[10px] text-slate-400 text-center font-mono">
              Mon - Sat (10AM - 10PM)
            </div>
          </div>
        </div>
      </aside>

      {/* =========================================================================
          MAIN CONTENT AREA
         ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* TOP HEADER */}
        <header className={`h-16 border-b px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md transition-colors ${
          theme === 'light' ? 'bg-white/90 border-slate-200' : 'bg-[#090d1a]/85 border-slate-800/80'
        }`}>
          
          {/* Mobile Menu Hamburger + Search Bar */}
          <div className="flex items-center space-x-3 w-full max-w-md">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300"
            >
              <Sliders className="w-4 h-4 text-purple-400" />
            </button>

            <div 
              onClick={() => setIsSearchOpen(true)}
              className={`w-full flex items-center justify-between px-3.5 py-1.5 rounded-xl border text-xs text-slate-400 hover:border-purple-500/40 transition-colors cursor-pointer ${
                theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-[#0e1424] border-slate-800'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Search className="w-4 h-4 text-slate-400" />
                <span>Search problems, invoices, tools...</span>
              </div>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-[10px] font-mono text-slate-400">
                Ctrl + K
              </kbd>
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* View Switcher Button (To Public Website) */}
            <button
              onClick={onSwitchToPublic}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-purple-950/60 border border-purple-500/40 text-purple-300 hover:text-white hover:bg-purple-900/60 text-xs font-semibold transition-all cursor-pointer shadow-sm"
              title="Switch to public client-facing website"
            >
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              <span>Public Website</span>
            </button>

            {/* Background & Theme Studio Button */}
            <button
              onClick={() => setIsBackgroundModalOpen(true)}
              title="Theme & Background Changer"
              className="p-2 rounded-xl bg-slate-900/80 border border-purple-500/30 text-purple-300 hover:text-cyan-400 hover:border-cyan-400 transition-all cursor-pointer shadow-sm"
            >
              <Palette className="w-4 h-4 text-purple-400" />
            </button>

            {/* Dark / Light Toggle */}
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              {theme === 'dark' ? <Moon className="w-4 h-4 text-cyan-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
            </button>

            {/* Notifications */}
            <button 
              onClick={() => triggerToast(`Active Alerts: ${clientProblems.filter(p => p.status === 'Pending').length} pending client issues, ${inquiryMessages.filter(m => m.status === 'Unread').length} unread inquiries.`)}
              className="relative p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                {inquiryMessages.filter(m => m.status === 'Unread').length + clientProblems.filter(p => p.status === 'Pending').length}
              </span>
            </button>

            {/* Profile avatar */}
            <div className="flex items-center space-x-2 pl-2 border-l border-slate-800">
              <img 
                src={currentPortraitUrl} 
                alt="Fahad" 
                className="w-7 h-7 rounded-full object-cover border border-cyan-500/40"
                referrerPolicy="no-referrer"
              />
              <div className="hidden md:block text-left">
                <div className={`text-xs font-bold leading-none ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                  Fahad
                </div>
                <div className="text-[9px] text-emerald-500 font-mono mt-0.5 flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Online
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Sidebar Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`lg:hidden border-b p-4 space-y-1 shadow-2xl z-30 ${
                theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#090d1a] border-slate-800'
              }`}
            >
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = activeNav === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveNav(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs ${
                      isActive ? 'bg-purple-900/40 text-cyan-400 font-bold' : 'text-slate-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className="w-4 h-4 text-slate-400" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800">{item.badge}</span>}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* MAIN BODY CONTENT */}
        <main className="p-4 sm:p-6 lg:p-8 space-y-6">
          
          {/* =========================================================================
              VIEW 1: MAIN DASHBOARD
             ========================================================================= */}
          {activeNav === 'dashboard' && (
            <div className="space-y-6">
              
              {/* Top KPI Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
                {[
                  { label: 'Total Clients', value: '1,248', trend: '+12.5%', isPos: true, icon: Briefcase, color: 'text-blue-400' },
                  { label: 'Projects Completed', value: '326', trend: '+18.7%', isPos: true, icon: FolderGit2, color: 'text-emerald-400' },
                  { label: 'Problems Solved', value: String(842 + clientProblems.filter(p => p.status === 'Solved').length), trend: '+14.5%', isPos: true, icon: CheckCircle2, color: 'text-cyan-400' },
                  { label: 'Total Earnings', value: `$${(24850 + totalPaidRevenue).toLocaleString()}`, trend: '+21.3%', isPos: true, icon: CreditCard, color: 'text-purple-400' },
                  { label: 'Pending Inquiries', value: String(inquiryMessages.filter(m => m.status === 'Unread').length), trend: '-5.2%', isPos: false, icon: Clock, color: 'text-amber-400' },
                ].map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div 
                      key={idx}
                      className={`p-4 rounded-2xl border transition-all hover:scale-[1.02] ${
                        theme === 'light' ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0d1222] border-slate-800/80'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-medium text-slate-400">{stat.label}</span>
                        <Icon className={`w-4 h-4 ${stat.color}`} />
                      </div>
                      <div className={`text-xl font-bold font-mono ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                        {stat.value}
                      </div>
                      <div className="flex items-center space-x-1 mt-1 text-[10px] font-mono">
                        <span className={stat.isPos ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                          {stat.trend}
                        </span>
                        <span className="text-slate-400">vs last month</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Core Services Cards */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className={`text-sm font-bold tracking-tight ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                    My Core Services & Solutions
                  </h3>
                  <button 
                    onClick={() => setActiveNav('services')}
                    className="text-xs font-mono text-cyan-500 hover:underline cursor-pointer"
                  >
                    Explore All
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {[
                    { title: 'Web Development', count: '150+ Solved', desc: 'PHP, MySQL, APIs, HTML/JS', color: 'from-blue-600 to-indigo-600' },
                    { title: 'Complete SEO', count: '320+ Audits', desc: 'On-page, Technical, Speed', color: 'from-emerald-600 to-teal-600' },
                    { title: 'Blogging & Content', count: '280+ Posts', desc: 'Intent-driven SEO articles', color: 'from-purple-600 to-pink-600' },
                    { title: 'Keyword Research', count: '200+ Packs', desc: 'Low KD, high intent search', color: 'from-amber-500 to-orange-600' },
                    { title: 'Guest Posting', count: '180+ Placements', desc: 'DA50+ ethical outreach', color: 'from-cyan-600 to-blue-600' },
                  ].map((srv, idx) => (
                    <div
                      key={idx}
                      onClick={() => setActiveNav('services')}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer group hover:border-purple-500/50 ${
                        theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#0d1222] border-slate-800/80'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${srv.color} p-0.5 text-white flex items-center justify-center mb-2 shadow-md`}>
                        <Zap className="w-4 h-4" />
                      </div>
                      <div className={`text-xs font-bold truncate group-hover:text-cyan-400 transition-colors ${
                        theme === 'light' ? 'text-slate-900' : 'text-white'
                      }`}>
                        {srv.title}
                      </div>
                      <div className="text-[10px] text-cyan-500 font-mono font-semibold mt-0.5">{srv.count}</div>
                      <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">{srv.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Orders & Payments + Quick Action Buttons */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left: Orders & Revenue Overview (8 cols) */}
                <div className={`lg:col-span-8 p-5 rounded-2xl border ${
                  theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#0d1222] border-slate-800/80'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className={`text-sm font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                        Orders & Payments Overview
                      </h3>
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                        Total {invoices.length} orders tracked • {invoices.filter(i => i.status === 'Paid').length} paid • {totalPendingInvoices} pending
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveModal('invoice')}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-md cursor-pointer"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>New Invoice</span>
                    </button>
                  </div>

                  {/* Revenue Sparkline Visual */}
                  <div className="h-40 w-full relative mt-4">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 400 120">
                      <defs>
                        <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path 
                        d="M 10 90 Q 70 30, 130 50 T 250 20 T 320 40 T 390 10 L 390 115 L 10 115 Z" 
                        fill="url(#revGrad)" 
                      />
                      <path 
                        d="M 10 90 Q 70 30, 130 50 T 250 20 T 320 40 T 390 10" 
                        fill="none" 
                        stroke="#8b5cf6" 
                        strokeWidth="2.5" 
                      />
                      <circle cx="10" cy="90" r="3.5" fill="#a78bfa" />
                      <circle cx="70" cy="45" r="3.5" fill="#a78bfa" />
                      <circle cx="130" cy="50" r="3.5" fill="#a78bfa" />
                      <circle cx="250" cy="20" r="3.5" fill="#a78bfa" />
                      <circle cx="320" cy="40" r="3.5" fill="#a78bfa" />
                      <circle cx="390" cy="10" r="4.5" fill="#06b6d4" stroke="#ffffff" strokeWidth="1.5" />
                    </svg>
                    <div className="flex justify-between text-[10px] font-mono text-slate-400 px-2 mt-2">
                      <span>Jan ($2.4k)</span>
                      <span>Feb ($3.8k)</span>
                      <span>Mar ($4.2k)</span>
                      <span>Apr ($5.6k)</span>
                      <span>May ($8.8k)</span>
                    </div>
                  </div>
                </div>

                {/* Right: Quick Action Modals (4 cols) */}
                <div className={`lg:col-span-4 p-5 rounded-2xl border flex flex-col justify-between ${
                  theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#0d1222] border-slate-800/80'
                }`}>
                  <div>
                    <h3 className={`text-sm font-bold mb-1 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                      Quick Action Hub
                    </h3>
                    <p className="text-[11px] text-slate-400 mb-3">Execute instant client operations</p>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => setActiveModal('problem')}
                      className="w-full py-2.5 px-3 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-300 font-semibold text-xs flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-purple-400" />
                        <span>Register Client Problem</span>
                      </span>
                      <PlusCircle className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setActiveNav('problem-diagnostic')}
                      className="w-full py-2.5 px-3 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/40 text-cyan-300 font-semibold text-xs flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <Wrench className="w-4 h-4 text-cyan-400" />
                        <span>Run Issue Diagnostic</span>
                      </span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setIsBackgroundModalOpen(true)}
                      className="w-full py-2.5 px-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-semibold text-xs flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <Palette className="w-4 h-4 text-emerald-400" />
                        <span>Change Background & Theme</span>
                      </span>
                      <Sliders className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setActiveModal('invoice')}
                      className="w-full py-2.5 px-3 rounded-xl bg-amber-600/20 hover:bg-amber-600/30 border border-amber-500/40 text-amber-300 font-semibold text-xs flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <Receipt className="w-4 h-4 text-amber-400" />
                        <span>Create Client Invoice</span>
                      </span>
                      <PlusCircle className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Recent Client Problems Table */}
              <div className={`p-5 rounded-2xl border ${
                theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#0d1222] border-slate-800/80'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <h3 className={`text-sm font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                      Recent Client Problems & Solutions
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Click any problem to view root-cause diagnostics, fix protocols, and estimates.
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setActiveModal('problem')}
                      className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center space-x-1.5 cursor-pointer shadow-sm"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>Add Problem</span>
                    </button>
                    <button
                      onClick={() => setActiveNav('client-problems')}
                      className="text-xs font-mono text-cyan-500 hover:underline cursor-pointer"
                    >
                      View Table ({clientProblems.length})
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className={`border-b font-mono text-[10px] uppercase ${
                        theme === 'light' ? 'border-slate-200 text-slate-500' : 'border-slate-800 text-slate-400'
                      }`}>
                        <th className="pb-2.5 font-medium">Problem Summary</th>
                        <th className="pb-2.5 font-medium">Client / Project</th>
                        <th className="pb-2.5 font-medium">Category</th>
                        <th className="pb-2.5 font-medium">Status</th>
                        <th className="pb-2.5 font-medium text-right">Date</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${theme === 'light' ? 'divide-slate-200' : 'divide-slate-800/60'}`}>
                      {clientProblems.slice(0, 5).map(p => (
                        <tr 
                          key={p.id}
                          onClick={() => setSelectedProblem(p)}
                          className={`transition-colors cursor-pointer group ${
                            theme === 'light' ? 'hover:bg-slate-50' : 'hover:bg-slate-900/60'
                          }`}
                        >
                          <td className={`py-3 font-medium group-hover:text-cyan-500 transition-colors ${
                            theme === 'light' ? 'text-slate-800' : 'text-slate-200'
                          }`}>
                            <div className="flex items-center space-x-2">
                              <AlertCircle className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                              <span className="truncate max-w-[220px]">{p.problem}</span>
                            </div>
                          </td>
                          <td className="py-3 text-slate-400 text-[11px] truncate max-w-[140px]">
                            {p.clientName || 'General Client'}
                          </td>
                          <td className="py-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-950/60 border border-purple-500/30 text-purple-300">
                              {p.category}
                            </span>
                          </td>
                          <td className="py-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                              p.status === 'Solved' ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30' :
                              p.status === 'In Progress' ? 'bg-cyan-950/60 text-cyan-400 border border-cyan-500/30' :
                              'bg-amber-950/60 text-amber-400 border border-amber-500/30'
                            }`}>
                              {p.status}
                            </span>
                          </td>
                          <td className="py-3 text-right text-slate-400 font-mono text-[10px]">
                            {p.date}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 10-Step Working Process */}
              <div className={`p-6 rounded-2xl border ${
                theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#0d1222] border-slate-800/80'
              }`}>
                <div className="text-center mb-6">
                  <h3 className={`text-sm sm:text-base font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                    Our Working Process – Problem Solving Approach
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    A transparent 10-step client lifecycle ensuring zero wasted time and guaranteed results
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2.5">
                  {workingProcessSteps.map((st, sIdx) => (
                    <div 
                      key={sIdx}
                      className={`p-3 rounded-xl border flex flex-col items-center text-center justify-between relative group hover:border-cyan-500/40 transition-all ${
                        theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-[#11172b] border-slate-800/80'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-full bg-gradient-to-tr ${st.color} text-white font-mono font-extrabold text-xs flex items-center justify-center shadow-md mb-2`}>
                        {st.num}
                      </div>
                      <div className={`text-[10px] font-semibold leading-tight ${theme === 'light' ? 'text-slate-800' : 'text-slate-200'}`}>
                        {st.title}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* =========================================================================
              VIEW 2: CLIENT PROBLEMS (FULL CRUD TABLE)
             ========================================================================= */}
          {activeNav === 'client-problems' && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className={`text-lg font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                    Client Problems Database ({filteredProblems.length})
                  </h2>
                  <p className="text-xs text-slate-400">
                    Manage, search, filter, and track technical diagnoses and solutions.
                  </p>
                </div>

                <button
                  onClick={() => setActiveModal('problem')}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs flex items-center space-x-2 shadow-lg shadow-purple-500/20 hover:scale-105 transition-all cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Register New Problem</span>
                </button>
              </div>

              {/* Filters & Search Toolbar */}
              <div className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-3 ${
                theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#0d1222] border-slate-800'
              }`}>
                <div className="flex items-center space-x-2 w-full sm:w-auto">
                  <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl border text-xs w-full sm:w-64 ${
                    theme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
                  }`}>
                    <Search className="w-4 h-4 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Search problems or clients..."
                      value={problemSearchTerm}
                      onChange={(e) => setProblemSearchTerm(e.target.value)}
                      className="bg-transparent text-xs text-white focus:outline-none w-full placeholder:text-slate-500"
                    />
                    {problemSearchTerm && (
                      <button onClick={() => setProblemSearchTerm('')} className="text-slate-400 hover:text-white">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Category Filter */}
                  <select 
                    value={problemCategoryFilter}
                    onChange={(e) => setProblemCategoryFilter(e.target.value)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-mono focus:outline-none cursor-pointer ${
                      theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-slate-950 border-slate-800 text-slate-200'
                    }`}
                  >
                    <option value="All">All Categories</option>
                    <option value="Web Dev">Web Dev</option>
                    <option value="SEO">SEO</option>
                    <option value="Blogging">Blogging</option>
                    <option value="Keywords">Keywords</option>
                    <option value="Guest Posting">Guest Posting</option>
                    <option value="Other">Other</option>
                  </select>

                  {/* Status Filter */}
                  <select 
                    value={problemStatusFilter}
                    onChange={(e) => setProblemStatusFilter(e.target.value)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-mono focus:outline-none cursor-pointer ${
                      theme === 'light' ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-slate-950 border-slate-800 text-slate-200'
                    }`}
                  >
                    <option value="All">All Statuses</option>
                    <option value="Solved">Solved</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>

              {/* Problems Full Table */}
              <div className={`p-4 rounded-2xl border overflow-hidden ${
                theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#0d1222] border-slate-800'
              }`}>
                {filteredProblems.length === 0 ? (
                  <div className="p-12 text-center text-slate-400">
                    <AlertCircle className="w-8 h-8 text-slate-500 mx-auto mb-2 opacity-50" />
                    <p className="text-sm font-semibold">No problems match your current filter</p>
                    <button 
                      onClick={() => { setProblemCategoryFilter('All'); setProblemStatusFilter('All'); setProblemSearchTerm(''); }}
                      className="mt-3 px-3 py-1 rounded-xl bg-purple-600/20 text-purple-300 text-xs border border-purple-500/30"
                    >
                      Clear All Filters
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400 font-mono text-[10px] uppercase">
                          <th className="pb-3">Problem Title</th>
                          <th className="pb-3">Client</th>
                          <th className="pb-3">Category</th>
                          <th className="pb-3">Priority</th>
                          <th className="pb-3">Status</th>
                          <th className="pb-3">Est. Cost</th>
                          <th className="pb-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {filteredProblems.map(p => (
                          <tr key={p.id} className="hover:bg-slate-900/60 transition-colors">
                            <td className="py-3 font-semibold text-slate-200 max-w-[220px]">
                              <button 
                                onClick={() => setSelectedProblem(p)}
                                className="hover:text-cyan-400 text-left truncate w-full cursor-pointer flex items-center gap-1.5"
                              >
                                <Wrench className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                                <span className="truncate">{p.problem}</span>
                              </button>
                            </td>
                            <td className="py-3 text-slate-400 text-[11px]">{p.clientName || 'Direct'}</td>
                            <td className="py-3">
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-950/60 border border-purple-500/30 text-purple-300">
                                {p.category}
                              </span>
                            </td>
                            <td className="py-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                                p.priority === 'High' ? 'bg-rose-950 text-rose-400 border border-rose-500/30' :
                                p.priority === 'Medium' ? 'bg-amber-950 text-amber-400 border border-amber-500/30' :
                                'bg-slate-800 text-slate-300'
                              }`}>
                                {p.priority}
                              </span>
                            </td>
                            <td className="py-3">
                              <select
                                value={p.status}
                                onChange={(e) => {
                                  const updated = clientProblems.map(item => item.id === p.id ? { ...item, status: e.target.value as any } : item);
                                  setClientProblems(updated);
                                  triggerToast(`Status changed to ${e.target.value}`);
                                }}
                                className={`px-2 py-0.5 rounded text-[10px] font-mono border bg-slate-950 cursor-pointer ${
                                  p.status === 'Solved' ? 'text-emerald-400 border-emerald-500/40' :
                                  p.status === 'In Progress' ? 'text-cyan-400 border-cyan-500/40' :
                                  'text-amber-400 border-amber-500/40'
                                }`}
                              >
                                <option value="Solved">Solved</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Pending">Pending</option>
                              </select>
                            </td>
                            <td className="py-3 font-mono text-cyan-400 text-[11px]">{p.estimatedCost}</td>
                            <td className="py-3 text-right">
                              <div className="flex items-center justify-end space-x-1.5">
                                <button
                                  onClick={() => setSelectedProblem(p)}
                                  title="View Diagnostic Details"
                                  className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-cyan-400 hover:bg-slate-700 transition-colors"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => setConfirmDeleteId(p.id)}
                                  title="Delete Record"
                                  className="p-1.5 rounded-lg bg-rose-950/60 text-rose-400 hover:bg-rose-900 border border-rose-500/30 transition-colors"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 3: PROBLEM DIAGNOSTIC ENGINE (NEW)
             ========================================================================= */}
          {activeNav === 'problem-diagnostic' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className={`text-lg font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                    Interactive Technical Diagnostic Engine
                  </h2>
                  <p className="text-xs text-slate-400">
                    Select your system symptoms to generate an instant root-cause analysis and fixed-price resolution plan.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 shrink-0">
                  <button
                    onClick={() => onNavigateToSection ? onNavigateToSection('error-fix-images') : onSwitchToPublic()}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md hover:scale-105 transition-transform cursor-pointer"
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span>Error Fix Images & Proof</span>
                  </button>

                  <button
                    onClick={() => onNavigateToSection ? onNavigateToSection('diagnostics') : onSwitchToPublic()}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md hover:scale-105 transition-transform cursor-pointer"
                  >
                    <Activity className="w-4 h-4" />
                    <span>Apex Diagnostics Desk</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Diagnostic Question Wizard (7 cols) */}
                <div className={`lg:col-span-7 p-6 rounded-2xl border space-y-5 ${
                  theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#0d1222] border-slate-800'
                }`}>
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2 block">
                      1. Select Your Primary Technical Issue
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        '500 Internal Server Error (PHP/Apache)',
                        'Slow Mobile Page Speed (<40 Score)',
                        'Database Connection Pooling Timeout',
                        'Google Indexation & Crawl Errors',
                        'Broken Stripe/PayPal Payment Webhook',
                        'SEO Keyword Ranking Sudden Drop'
                      ].map((issue, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setDiagIssueType(issue);
                            setDiagResult({
                              issue,
                              rootCause: issue.includes('500') ? 'Uncaught PHP fatal exception or memory limit exhaustion in php.ini.' :
                                         issue.includes('Speed') ? 'Unoptimized 4MB+ images, render-blocking CSS fonts, and synchronous scripts.' :
                                         issue.includes('Database') ? 'PDO pool exhausted; queries missing composite indexes causing full-table scans.' :
                                         issue.includes('Indexation') ? 'Noindex meta tags in header, or canonical URL pointing to staging domain.' :
                                         issue.includes('Payment') ? 'SSL handshake timeout and missing webhook secret signature validation.' :
                                         'Competitor content expansion and loss of high-authority contextual backlinks.',
                              time: '2 - 4 Hours',
                              price: '$35 - $75',
                              deliverable: '100% fixed, W3C compliant code with zero regressions.'
                            });
                          }}
                          className={`p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                            diagIssueType === issue 
                              ? 'bg-cyan-950/60 border-cyan-400 text-cyan-300 font-bold ring-1 ring-cyan-400/30'
                              : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          {issue}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2 block">
                      2. Select Your Tech Stack
                    </label>
                    <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                      {['PHP / MySQL', 'Laravel / Blade', 'React / Node.js', 'WordPress / WooCommerce', 'Static HTML/CSS', 'Custom API'].map(tech => (
                        <button
                          key={tech}
                          onClick={() => setDiagPlatform(tech)}
                          className={`p-2.5 rounded-xl border text-center transition-all ${
                            diagPlatform === tech
                              ? 'bg-purple-950/60 border-purple-400 text-purple-300 font-bold'
                              : 'bg-slate-950 border-slate-800 text-slate-400'
                          }`}
                        >
                          {tech}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Instant Diagnostic Output (5 cols) */}
                <div className={`lg:col-span-5 p-6 rounded-2xl border flex flex-col justify-between ${
                  theme === 'light' ? 'bg-white border-slate-200' : 'bg-gradient-to-br from-[#12192e] to-[#0a0f1d] border-cyan-500/40'
                }`}>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono font-bold">
                      <Sparkles className="w-4 h-4" />
                      <span>Instant Diagnostic Report</span>
                    </div>

                    <h3 className={`text-base font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                      {diagIssueType}
                    </h3>

                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                      <div>
                        <span className="text-purple-400 font-mono font-bold block text-[10px] uppercase">Identified Root Cause:</span>
                        <p className="text-slate-300 mt-0.5 leading-relaxed">
                          {diagResult ? diagResult.rootCause : 'Select any symptom on the left to trigger the technical engine.'}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-800 flex justify-between font-mono text-[11px]">
                        <span className="text-slate-400">Est. Repair Time:</span>
                        <span className="text-emerald-400 font-bold">{diagResult ? diagResult.time : '1 - 3 Hours'}</span>
                      </div>
                      <div className="flex justify-between font-mono text-[11px]">
                        <span className="text-slate-400">Guaranteed Price:</span>
                        <span className="text-cyan-400 font-bold">{diagResult ? diagResult.price : '$25 - $50'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 space-y-2">
                    <a
                      href={`https://wa.me/923000610586?text=Hi%20Fahad,%20I%20need%20help%20fixing:%20${encodeURIComponent(diagIssueType)}%20on%20${encodeURIComponent(diagPlatform)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Instant Fix on WhatsApp (03000610586)</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 4: ORDERS & INVOICES
             ========================================================================= */}
          {activeNav === 'orders' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className={`text-lg font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                    Orders & Invoices Manager ({invoices.length})
                  </h2>
                  <p className="text-xs text-slate-400">
                    Track client billing, generate invoices, and record payment confirmations.
                  </p>
                </div>

                <button
                  onClick={() => setActiveModal('invoice')}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center space-x-2 shadow-lg cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Create Invoice</span>
                </button>
              </div>

              {/* Invoice List */}
              <div className={`p-4 rounded-2xl border ${
                theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#0d1222] border-slate-800'
              }`}>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-mono text-[10px] uppercase">
                        <th className="pb-3">Invoice #</th>
                        <th className="pb-3">Client</th>
                        <th className="pb-3">Service</th>
                        <th className="pb-3">Amount</th>
                        <th className="pb-3">Method</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {invoices.map(inv => (
                        <tr key={inv.id} className="hover:bg-slate-900/60 transition-colors">
                          <td className="py-3 font-mono text-cyan-400 font-bold">{inv.invoiceNumber}</td>
                          <td className="py-3 text-slate-200 font-medium">{inv.clientName}</td>
                          <td className="py-3 text-slate-400">{inv.service}</td>
                          <td className="py-3 font-mono text-emerald-400 font-bold">${inv.amount.toFixed(2)}</td>
                          <td className="py-3 text-slate-400 text-[11px] font-mono">{inv.paymentMethod}</td>
                          <td className="py-3">
                            <select
                              value={inv.status}
                              onChange={(e) => {
                                const updated = invoices.map(i => i.id === inv.id ? { ...i, status: e.target.value as any } : i);
                                setInvoices(updated);
                                triggerToast(`Invoice marked as ${e.target.value}`);
                              }}
                              className={`px-2 py-0.5 rounded text-[10px] font-mono border bg-slate-950 ${
                                inv.status === 'Paid' ? 'text-emerald-400 border-emerald-500/40' : 'text-amber-400 border-amber-500/40'
                              }`}
                            >
                              <option value="Paid">Paid</option>
                              <option value="Pending">Pending</option>
                              <option value="Overdue">Overdue</option>
                            </select>
                          </td>
                          <td className="py-3 text-right">
                            <button
                              onClick={() => triggerToast(`Receipt for ${inv.invoiceNumber} copied to clipboard.`)}
                              className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 hover:text-white text-[11px] font-mono"
                            >
                              Receipt
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 5: SEO TOOLS HUB
             ========================================================================= */}
          {activeNav === 'seo-tools' && (
            <div className="space-y-6">
              <div>
                <h2 className={`text-lg font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                  Live SEO Tools Hub & Audit Suite
                </h2>
                <p className="text-xs text-slate-400">
                  Analyze keyword difficulty, verify search-engine meta tags length, and simulate Core Web Vitals.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* 1. Meta Tag Length Analyzer */}
                <div className={`p-5 rounded-2xl border space-y-4 ${
                  theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#0d1222] border-slate-800'
                }`}>
                  <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono font-bold">
                    <Search className="w-4 h-4" />
                    <span>Google SERP Meta Title & Description Previewer</span>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-slate-400 block mb-1">
                      Meta Title ({seoMetaTitle.length}/60 chars)
                    </label>
                    <input
                      type="text"
                      value={seoMetaTitle}
                      onChange={(e) => setSeoMetaTitle(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-400 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-slate-400 block mb-1">
                      Meta Description ({seoMetaDesc.length}/160 chars)
                    </label>
                    <textarea
                      rows={3}
                      value={seoMetaDesc}
                      onChange={(e) => setSeoMetaDesc(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-cyan-400 font-mono"
                    />
                  </div>

                  {/* Google Preview Card */}
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="text-[10px] text-slate-500 font-mono">https://fahadwaqas.dev</div>
                    <div className="text-sm font-semibold text-blue-400 hover:underline cursor-pointer">
                      {seoMetaTitle || 'Page Title'}
                    </div>
                    <div className="text-xs text-slate-300 leading-relaxed">
                      {seoMetaDesc || 'Page description...'}
                    </div>
                  </div>
                </div>

                {/* 2. Keyword Intent & Difficulty Calculator */}
                <div className={`p-5 rounded-2xl border space-y-4 ${
                  theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#0d1222] border-slate-800'
                }`}>
                  <div className="flex items-center space-x-2 text-purple-400 text-xs font-mono font-bold">
                    <KeyRound className="w-4 h-4" />
                    <span>Keyword Search-Intent Analyzer</span>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-slate-400 block mb-1">Target Keyword</label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={seoKeywordInput}
                        onChange={(e) => setSeoKeywordInput(e.target.value)}
                        className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none font-mono"
                      />
                      <button 
                        onClick={() => triggerToast(`Analyzed keyword: "${seoKeywordInput}" - KD: 24 (Low), Intent: Commercial/Transactional`)}
                        className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold shrink-0"
                      >
                        Analyze
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5 pt-2 font-mono">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                      <span className="text-[10px] text-slate-400 block">Keyword Difficulty</span>
                      <span className="text-base font-bold text-emerald-400">24 / 100 (Easy)</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                      <span className="text-[10px] text-slate-400 block">Search Intent</span>
                      <span className="text-base font-bold text-cyan-400">Transactional</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                      <span className="text-[10px] text-slate-400 block">Monthly Vol</span>
                      <span className="text-base font-bold text-purple-400">1,400/mo</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 6: SETTINGS & BACKGROUND STUDIO
             ========================================================================= */}
          {activeNav === 'settings' && (
            <div className="space-y-6">
              <div>
                <h2 className={`text-lg font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                  Application Settings & Theme Studio
                </h2>
                <p className="text-xs text-slate-400">
                  Configure visual styles, theme modes, portrait photo backgrounds, and direct communication settings.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* 1. Theme & Canvas Background Switcher */}
                <div className={`p-6 rounded-2xl border space-y-4 ${
                  theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#0d1222] border-slate-800'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono font-bold">
                      <Palette className="w-4 h-4" />
                      <span>Theme & Background Studio</span>
                    </div>
                    <button
                      onClick={() => setIsBackgroundModalOpen(true)}
                      className="text-xs font-mono text-cyan-400 hover:underline cursor-pointer"
                    >
                      Open Full Studio
                    </button>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono text-slate-400">Active Theme Mode</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'dark', label: 'Dark Mode', icon: Moon },
                        { id: 'light', label: 'Light Mode', icon: Sun },
                        { id: 'system', label: 'System', icon: Laptop }
                      ].map(t => (
                        <button
                          key={t.id}
                          onClick={() => setTheme(t.id as any)}
                          className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center space-x-2 cursor-pointer transition-all ${
                            theme === t.id
                              ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          <t.icon className="w-4 h-4" />
                          <span>{t.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 space-y-2">
                    <label className="text-xs font-mono text-slate-400">Canvas Particle Background Style</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'deep_space', label: 'Deep Space Studio' },
                        { id: 'plexus_matrix', label: 'Dynamic 60fps Plexus' },
                        { id: 'cosmic_mesh', label: 'Cosmic Mesh Gradient' },
                        { id: 'indigo_aurora', label: 'Indigo Cyber Aurora' },
                        { id: 'minimal_grid', label: 'Tech Blueprint Grid' },
                        { id: 'studio_light', label: 'Studio Clean Minimal' }
                      ].map(bg => (
                        <button
                          key={bg.id}
                          onClick={() => {
                            setBackgroundStyle(bg.id as any);
                            triggerToast(`Background changed to ${bg.label}`);
                          }}
                          className={`p-2.5 rounded-xl border text-left text-xs font-semibold cursor-pointer transition-all ${
                            backgroundStyle === bg.id
                              ? 'bg-purple-950/60 border-purple-400 text-purple-300 ring-1 ring-purple-400/40'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          {bg.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 2. Portrait Photo Background Changer */}
                <div className={`p-6 rounded-2xl border space-y-4 ${
                  theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#0d1222] border-slate-800'
                }`}>
                  <div className="flex items-center space-x-2 text-purple-400 text-xs font-mono font-bold">
                    <Sparkles className="w-4 h-4" />
                    <span>Fahad Portrait Photo Style</span>
                  </div>

                  <div className="flex items-center space-x-4 p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <img 
                      src={currentPortraitUrl} 
                      alt="Fahad" 
                      className="w-16 h-16 rounded-full object-cover border-2 border-cyan-400 shadow-md"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="text-xs font-bold text-white">Active Avatar</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">Style: {portraitStyle}</div>
                      <button
                        onClick={() => setIsBackgroundModalOpen(true)}
                        className="mt-1 text-xs text-cyan-400 font-mono hover:underline cursor-pointer"
                      >
                        Change Portrait Style
                      </button>
                    </div>
                  </div>

                  <div className="pt-2 space-y-2">
                    <label className="text-xs font-mono text-slate-400">Direct Contact Details</label>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-1 text-slate-300">
                      <div>WhatsApp / Phone: <span className="text-emerald-400">03000610586 (+923000610586)</span></div>
                      <div>Email: <span className="text-cyan-400">fahad456677gg@gmail.com</span></div>
                      <div>Location: <span className="text-purple-400">Pakistan (Remote Global)</span></div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* =========================================================================
              VIEW 4: PROJECTS & GITHUB REPOSITORIES DESK (activeNav === 'projects')
             ========================================================================= */}
          {activeNav === 'projects' && (
            <div className="space-y-6">
              {/* Header Banner */}
              <div className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden backdrop-blur-md ${
                theme === 'light' 
                  ? 'bg-gradient-to-r from-purple-50 via-white to-cyan-50 border-purple-200 shadow-sm' 
                  : 'bg-gradient-to-r from-purple-950/40 via-slate-900/60 to-cyan-950/40 border-purple-500/30 shadow-xl'
              }`}>
                <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/40 text-cyan-400 text-xs font-mono mb-3">
                      <Github className="w-3.5 h-3.5" />
                      <span>Live GitHub Repositories • @{GITHUB_USERNAME}</span>
                    </div>
                    <h2 className={`text-2xl sm:text-3xl font-bold tracking-tight ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                      Projects & GitHub <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Repositories Desk</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
                      Active source-code repositories for Fahad Waqas (@{GITHUB_USERNAME}). Features 7 codebases in TypeScript and HTML with verified commits on September 7. Inspect code, clone repositories, or launch client projects.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 shrink-0">
                    <a
                      href={GITHUB_PROFILE_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs font-semibold border border-slate-700 hover:border-cyan-500/50 transition-all flex items-center space-x-2"
                    >
                      <Github className="w-4 h-4 text-cyan-400" />
                      <span>github.com/{GITHUB_USERNAME}</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>

                    <button
                      onClick={onSwitchToPublic}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs shadow-md hover:scale-105 transition-all flex items-center space-x-2 cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Public Portfolio View</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Metrics Ribbon */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className={`p-4 rounded-2xl border ${
                  theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#0e1424] border-slate-800'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">Public Repos</span>
                    <FolderGit2 className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className={`text-2xl font-bold mt-1 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                    {githubRepositories.length}
                  </div>
                  <div className="text-[11px] text-emerald-400 font-mono mt-0.5">100% Active & Hosted</div>
                </div>

                <div className={`p-4 rounded-2xl border ${
                  theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#0e1424] border-slate-800'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">Core Languages</span>
                    <Code2 className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className={`text-2xl font-bold mt-1 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                    2 Stacks
                  </div>
                  <div className="text-[11px] text-purple-400 font-mono mt-0.5">TypeScript & HTML</div>
                </div>

                <div className={`p-4 rounded-2xl border ${
                  theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#0e1424] border-slate-800'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">Recent Commits</span>
                    <GitCommit className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className={`text-2xl font-bold mt-1 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                    15+
                  </div>
                  <div className="text-[11px] text-cyan-400 font-mono mt-0.5">Logged on Sep 7</div>
                </div>

                <div className={`p-4 rounded-2xl border ${
                  theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#0e1424] border-slate-800'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">Git Architecture</span>
                    <GitBranch className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className={`text-2xl font-bold mt-1 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                    Modular
                  </div>
                  <div className="text-[11px] text-blue-400 font-mono mt-0.5">Clean Repositories</div>
                </div>
              </div>

              {/* Interactive Git CLI Quickstart Sandbox */}
              <div className={`p-6 rounded-2xl border ${
                theme === 'light' ? 'bg-slate-900 text-white border-slate-800' : 'bg-[#090d16] border-purple-500/30'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-xl bg-purple-950/60 border border-purple-500/30 text-cyan-400">
                      <Laptop className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Git CLI Quickstart & Clone Generator</h4>
                      <p className="text-[11px] text-slate-400">Select any repository to generate and copy instant terminal clone commands.</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <label className="text-[11px] font-mono text-slate-400">Select Repo:</label>
                    <select
                      value={selectedCliRepo.id}
                      onChange={(e) => {
                        const target = githubRepositories.find(r => r.id === e.target.value);
                        if (target) setSelectedCliRepo(target);
                      }}
                      className="p-2 rounded-xl bg-slate-950 border border-slate-700 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-400"
                    >
                      {githubRepositories.map(r => (
                        <option key={r.id} value={r.id}>{r.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-xs text-slate-300 relative group">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-2 text-slate-500 text-[10px]">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                      <span className="ml-2">bash terminal</span>
                    </div>

                    <button
                      onClick={() => handleCopyClone(selectedCliRepo.cloneUrl, 'cli-banner')}
                      className="px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-cyan-300 font-sans font-medium transition-colors border border-slate-700 flex items-center space-x-1 cursor-pointer"
                    >
                      {copiedCloneId === 'cli-banner' ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-slate-400" />
                          <span>Copy Command</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="space-y-1 text-slate-300">
                    <p className="text-slate-500"># 1. Clone repository from GitHub</p>
                    <p><span className="text-cyan-400 font-bold">$ </span>git clone {selectedCliRepo.cloneUrl}</p>
                    <p className="text-slate-500 pt-1"># 2. Navigate and install dependencies</p>
                    <p><span className="text-cyan-400 font-bold">$ </span>cd {selectedCliRepo.name.replace(`${GITHUB_USERNAME}/`, '')}</p>
                    {selectedCliRepo.language === 'TypeScript' ? (
                      <p><span className="text-cyan-400 font-bold">$ </span>npm install && npm run dev</p>
                    ) : (
                      <p><span className="text-cyan-400 font-bold">$ </span>open index.html</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Filter and Search Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search by repo name, tech stack, or purpose..."
                    value={repoSearchTerm}
                    onChange={(e) => setRepoSearchTerm(e.target.value)}
                    className={`w-full pl-9 pr-4 py-2.5 rounded-xl border text-xs focus:outline-none transition-colors ${
                      theme === 'light'
                        ? 'bg-white border-slate-300 text-slate-900 focus:border-purple-500'
                        : 'bg-slate-950/80 border-slate-800 text-white focus:border-purple-500'
                    }`}
                  />
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  {['All', 'TypeScript', 'HTML', 'AI Tools', 'E-Commerce'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setRepoCategoryFilter(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                        repoCategoryFilter === cat
                          ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold shadow'
                          : theme === 'light'
                            ? 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900'
                            : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* 7 GitHub Repositories Desk Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {githubRepositories
                  .filter(repo => {
                    const matchesSearch = repoSearchTerm === '' || 
                      repo.name.toLowerCase().includes(repoSearchTerm.toLowerCase()) ||
                      repo.description.toLowerCase().includes(repoSearchTerm.toLowerCase()) ||
                      repo.language.toLowerCase().includes(repoSearchTerm.toLowerCase());
                    
                    if (!matchesSearch) return false;
                    if (repoCategoryFilter === 'All') return true;
                    if (repoCategoryFilter === 'TypeScript') return repo.language === 'TypeScript';
                    if (repoCategoryFilter === 'HTML') return repo.language === 'HTML';
                    if (repoCategoryFilter === 'AI Tools') return repo.name.toLowerCase().includes('ai') || repo.category.toLowerCase().includes('ai');
                    if (repoCategoryFilter === 'E-Commerce') return repo.category.toLowerCase().includes('commerce') || repo.name.toLowerCase().includes('aura');
                    return true;
                  })
                  .map((repo) => (
                    <div
                      key={repo.id}
                      className={`p-5 rounded-2xl border flex flex-col justify-between transition-all group hover:border-purple-500/50 hover:shadow-lg ${
                        theme === 'light'
                          ? 'bg-white border-slate-200 shadow-sm'
                          : 'bg-[#0e1424] border-slate-800'
                      }`}
                    >
                      <div>
                        {/* Card Header */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <div className="flex items-center space-x-2 truncate">
                            <Github className="w-4 h-4 text-cyan-400 shrink-0" />
                            <span className={`text-xs font-mono font-bold truncate ${
                              theme === 'light' ? 'text-slate-900' : 'text-white'
                            }`}>
                              {repo.name}
                            </span>
                          </div>

                          <span className="inline-flex items-center space-x-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-950 border border-slate-800 text-slate-300 shrink-0">
                            <span 
                              className="w-2 h-2 rounded-full inline-block mr-1"
                              style={{ backgroundColor: repo.languageColor }}
                            />
                            {repo.language}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-3">
                          {repo.description}
                        </p>

                        {/* Metadata Pills */}
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-slate-800/60 pt-2.5 mb-4">
                          <span className="flex items-center text-purple-400 font-semibold">
                            <GitCommit className="w-3 h-3 text-cyan-400 mr-1" />
                            {repo.commits} commits ({repo.lastContribution})
                          </span>
                          <span className="bg-slate-950 border border-slate-800 px-2 py-0.5 rounded text-slate-300">
                            {repo.category}
                          </span>
                        </div>
                      </div>

                      {/* Card Action Buttons */}
                      <div className="space-y-2 pt-2 border-t border-slate-800/60">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleCopyClone(repo.cloneUrl, repo.id)}
                            className="flex-1 py-2 px-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-slate-300 hover:text-white text-[11px] font-mono transition-colors flex items-center justify-center space-x-1.5 border border-slate-800 cursor-pointer"
                            title={`git clone ${repo.cloneUrl}`}
                          >
                            {copiedCloneId === repo.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400 font-semibold">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3 text-slate-400" />
                                <span>Copy Clone</span>
                              </>
                            )}
                          </button>

                          <a
                            href={repo.url}
                            target="_blank"
                            rel="noreferrer"
                            className="py-2 px-3 rounded-xl bg-purple-950/50 hover:bg-purple-900/60 text-cyan-300 text-[11px] font-semibold transition-colors flex items-center space-x-1 border border-purple-500/40"
                          >
                            <span>Repo</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>

                        <button
                          onClick={() => setSelectedRepoModal(repo)}
                          className="w-full py-1.5 rounded-lg bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-white text-[10px] font-mono transition-colors flex items-center justify-center space-x-1"
                        >
                          <Eye className="w-3 h-3 text-cyan-400" />
                          <span>Inspect Codebase Metadata</span>
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* =========================================================================
              FALLBACK / OTHER NAV VIEWS (Services, Case Studies, etc.)
             ========================================================================= */}
          {['services', 'case-studies', 'payments', 'pricing', 'blog', 'analytics', 'messages', 'reviews', 'faq', 'downloads'].includes(activeNav) && (
            <div className={`p-8 rounded-3xl border text-center space-y-4 ${
              theme === 'light' ? 'bg-white border-slate-200' : 'bg-[#0d1222] border-slate-800'
            }`}>
              <div className="w-12 h-12 rounded-2xl bg-purple-950/60 border border-purple-500/40 text-cyan-400 flex items-center justify-center mx-auto shadow-lg">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <h2 className={`text-xl font-bold ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                {navItems.find(n => n.id === activeNav)?.label}
              </h2>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                Explore this section in both the interactive Solution Engine dashboard and the live client-facing public view.
              </p>
              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={() => setActiveNav('dashboard')}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700 cursor-pointer"
                >
                  Return to Dashboard
                </button>
                <button
                  onClick={onSwitchToPublic}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-xs font-bold shadow-md hover:scale-105 transition-all cursor-pointer"
                >
                  View on Public Site
                </button>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* =========================================================================
          INTERACTIVE MODALS
         ========================================================================= */}

      {/* 1. Global Search Modal (Ctrl + K) */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl bg-[#0e1424] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-4 border-b border-slate-800 flex items-center space-x-3">
                <Search className="w-5 h-5 text-cyan-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search problems, invoices, services, tools..."
                  className="w-full bg-transparent text-white text-sm focus:outline-none placeholder:text-slate-500"
                  autoFocus
                />
                <button onClick={() => setIsSearchOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 max-h-80 overflow-y-auto space-y-2 text-xs">
                {/* Repositories match */}
                {githubRepositories
                  .filter(r => searchQuery !== '' && (
                    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    r.language.toLowerCase().includes(searchQuery.toLowerCase())
                  ))
                  .map((r) => (
                    <div
                      key={r.id}
                      onClick={() => {
                        setActiveNav('projects');
                        setSelectedRepoModal(r);
                        setIsSearchOpen(false);
                      }}
                      className="p-2.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/30 flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <div className="flex items-center space-x-2 truncate">
                        <Github className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="text-white font-mono font-bold truncate">{r.name}</span>
                      </div>
                      <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/20 shrink-0">{r.language}</span>
                    </div>
                  ))}

                {/* Problems match */}
                {clientProblems
                  .filter(p => searchQuery === '' || p.problem.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((p, idx) => (
                    <div 
                      key={idx}
                      onClick={() => {
                        setSelectedProblem(p);
                        setIsSearchOpen(false);
                      }}
                      className="p-2.5 rounded-xl bg-slate-900/60 hover:bg-purple-900/30 border border-slate-800 flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <span className="text-slate-200">{p.problem}</span>
                      <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/20">{p.category}</span>
                    </div>
                  ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Add New Problem Modal */}
      <AnimatePresence>
        {activeModal === 'problem' && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-[#0e1424] border border-purple-500/30 rounded-2xl shadow-2xl p-6 relative"
            >
              <button 
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-purple-400" />
                <span>Register New Client Problem</span>
              </h3>

              <form onSubmit={handleAddProblem} className="space-y-3.5 text-xs">
                <div>
                  <label className="text-slate-400 font-mono block mb-1">Problem Title / Error Symptom</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. PHP 500 fatal error in payment gateway"
                    value={newProblemTitle}
                    onChange={(e) => setNewProblemTitle(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 font-mono block mb-1">Category</label>
                    <select
                      value={newProblemCategory}
                      onChange={(e) => setNewProblemCategory(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none font-mono"
                    >
                      <option value="Web Dev">Web Dev</option>
                      <option value="SEO">SEO</option>
                      <option value="Blogging">Blogging</option>
                      <option value="Keywords">Keywords</option>
                      <option value="Guest Posting">Guest Posting</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-400 font-mono block mb-1">Priority</label>
                    <select
                      value={newProblemPriority}
                      onChange={(e) => setNewProblemPriority(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none font-mono"
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 font-mono block mb-1">Client Name (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Acme Corp"
                    value={newProblemClient}
                    onChange={(e) => setNewProblemClient(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-400 font-mono block mb-1">Detailed Technical Log / Description</label>
                  <textarea
                    rows={3}
                    placeholder="Paste stack traces, error messages, or issue details..."
                    value={newProblemDetails}
                    onChange={(e) => setNewProblemDetails(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none"
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold shadow-md cursor-pointer"
                  >
                    Save & Queue
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. Create Invoice Modal */}
      <AnimatePresence>
        {activeModal === 'invoice' && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-[#0e1424] border border-emerald-500/30 rounded-2xl shadow-2xl p-6 relative"
            >
              <button 
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <Receipt className="w-5 h-5 text-emerald-400" />
                <span>Create Client Invoice</span>
              </h3>

              <form onSubmit={handleAddInvoice} className="space-y-3 text-xs">
                <div>
                  <label className="text-slate-400 font-mono block mb-1">Client Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Digital Ltd"
                    value={invClientName}
                    onChange={(e) => setInvClientName(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-slate-400 font-mono block mb-1">Service Rendered</label>
                  <input
                    type="text"
                    required
                    value={invService}
                    onChange={(e) => setInvService(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-400 font-mono block mb-1">Amount ($ USD)</label>
                    <input
                      type="number"
                      required
                      value={invAmount}
                      onChange={(e) => setInvAmount(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 font-mono block mb-1">Payment Method</label>
                    <select
                      value={invMethod}
                      onChange={(e) => setInvMethod(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none font-mono text-[11px]"
                    >
                      <option value="Credit/Debit Card">Credit/Debit Card</option>
                      <option value="PayPal">PayPal</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Stripe">Stripe</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-md cursor-pointer"
                  >
                    Generate Invoice
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. Single Problem Diagnostic Details Viewer Modal */}
      <AnimatePresence>
        {selectedProblem && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-[#0e1424] border border-cyan-500/40 rounded-2xl shadow-2xl p-6 relative"
            >
              <button 
                onClick={() => setSelectedProblem(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-2 mb-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-950 border border-purple-500/30 text-purple-300">
                  {selectedProblem.category}
                </span>
                <span className="text-[11px] font-mono text-slate-400">{selectedProblem.date}</span>
              </div>
              
              <h3 className="text-lg font-bold text-white mt-2">
                {selectedProblem.problem}
              </h3>
              <p className="text-xs text-slate-400 mt-1">Client: {selectedProblem.clientName || 'General Client'}</p>
              
              <div className="mt-4 space-y-2.5 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1 font-mono uppercase text-[10px]">1. Problem Diagnosis:</span>
                  <p className="text-slate-300 leading-relaxed">{selectedProblem.details}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-purple-400 font-bold block mb-1 font-mono uppercase text-[10px]">2. Identified Root Cause:</span>
                  <p className="text-slate-300 leading-relaxed">{selectedProblem.rootCause}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1 font-mono uppercase text-[10px]">3. Recommended Solution:</span>
                  <p className="text-slate-300 leading-relaxed">{selectedProblem.recommendedSolution}</p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400 font-bold">
                  Est. Cost: {selectedProblem.estimatedCost}
                </span>
                <a
                  href={`https://wa.me/923000610586?text=Hi%20Fahad,%20let's%20fix%20this:%20${encodeURIComponent(selectedProblem.problem)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center space-x-1.5 cursor-pointer shadow-md"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Fix on WhatsApp</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. Delete Confirmation Dialog */}
      <AnimatePresence>
        {confirmDeleteId && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm bg-[#0e1424] border border-rose-500/40 rounded-2xl shadow-2xl p-6 text-center space-y-4"
            >
              <div className="w-12 h-12 rounded-full bg-rose-950/60 border border-rose-500/40 text-rose-400 flex items-center justify-center mx-auto">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Delete Problem Record?</h3>
              <p className="text-xs text-slate-400">
                Are you sure you want to delete this client problem? This action cannot be undone.
              </p>
              <div className="flex justify-center space-x-2 pt-2">
                <button
                  onClick={() => setConfirmDeleteId(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteProblem(confirmDeleteId)}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md cursor-pointer"
                >
                  Confirm Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. Repository Details Modal */}
      <AnimatePresence>
        {selectedRepoModal && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-[#0e1424] border border-purple-500/40 rounded-2xl shadow-2xl p-6 relative space-y-4"
            >
              <button 
                onClick={() => setSelectedRepoModal(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-purple-950/60 border border-purple-500/30 text-cyan-400">
                  <Github className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-mono">{selectedRepoModal.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="inline-flex items-center space-x-1 text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                      <span 
                        className="w-2 h-2 rounded-full inline-block mr-1"
                        style={{ backgroundColor: selectedRepoModal.languageColor }}
                      />
                      {selectedRepoModal.language}
                    </span>
                    <span className="text-[10px] font-mono text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/20">
                      {selectedRepoModal.commits} commits ({selectedRepoModal.lastContribution})
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
                {selectedRepoModal.description}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-400">Git Clone Command</label>
                <div className="flex items-center space-x-2">
                  <input
                    readOnly
                    value={`git clone ${selectedRepoModal.cloneUrl}`}
                    className="flex-1 p-2 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 font-mono text-xs focus:outline-none"
                  />
                  <button
                    onClick={() => handleCopyClone(selectedRepoModal.cloneUrl, 'modal-clone')}
                    className="p-2 rounded-xl bg-purple-950/50 hover:bg-purple-900/60 text-cyan-300 border border-purple-500/30 text-xs font-semibold shrink-0 cursor-pointer"
                  >
                    {copiedCloneId === 'modal-clone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-800">
                <button
                  onClick={() => setSelectedRepoModal(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs cursor-pointer"
                >
                  Close
                </button>
                <a
                  href={selectedRepoModal.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md"
                >
                  <Github className="w-4 h-4" />
                  <span>Open on GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 7. Notification Toast */}
      <AnimatePresence>
        {showNotificationToast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-slate-900 border border-cyan-500/40 text-cyan-300 text-xs font-semibold shadow-2xl flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>{showNotificationToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
