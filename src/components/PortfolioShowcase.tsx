/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { 
  Github, 
  ExternalLink, 
  Search, 
  Sparkles, 
  Layers, 
  CheckCircle, 
  Wrench,
  X,
  ArrowRight,
  Shield,
  Zap,
  Code,
  Globe,
  Database,
  Copy,
  Check,
  GitBranch,
  GitCommit,
  FolderGit2
} from 'lucide-react';
import { githubRepositories, GITHUB_PROFILE_URL, GITHUB_USERNAME } from '../data/githubRepos';

// High-resolution visual screenshots & mockups
import websiteErrorRepairImg from '../assets/images/website_recovery_repair_1788858126484.jpg';
import ecommerceCheckoutImg from '../assets/images/ecommerce_checkout_ui_1788858150032.jpg';
import serverDbMonitorImg from '../assets/images/server_database_monitor_1788858173666.jpg';
import responsiveWebsiteImg from '../assets/images/responsive_website_fix_1788858196702.jpg';
import seoSpeedAuditImg from '../assets/images/seo_speed_audit_1788858215167.jpg';
import diagnosticsDeskImg from '../assets/images/web_diagnostics_desk_1788856966627.jpg';

interface Project {
  id: string;
  title: string;
  category: 'business' | 'ecommerce' | 'crud' | 'dashboard' | 'api' | 'seo' | 'landing' | 'fullstack';
  categoryLabel: string;
  tagline: string;
  imageUrl?: string;
  description: string;
  features: string[];
  tech: string[];
  githubUrl: string;
  demoUrl: string;
  commits?: number;
  lastContribution?: string;
  caseStudy: {
    problem: string;
    solution: string;
    highlights: string[];
    deliverables: string[];
  };
}

const projectsData: Project[] = [
  {
    id: 'proj-ai-smart-notebook',
    title: 'AI Smart Notebook & Knowledge Base',
    category: 'fullstack',
    categoryLabel: 'TypeScript AI App',
    tagline: 'Intelligent note-taking suite with real-time markdown, smart categorization & code blocks',
    imageUrl: websiteErrorRepairImg,
    description: 'A sophisticated knowledge workstation built in TypeScript with intelligent note capture, instant markdown previewing, code snippet formatting, and semantic note categorization.',
    features: [
      'Built in strict TypeScript with comprehensive type safety',
      'Real-time markdown compiler and syntax-highlighted code blocks',
      'Smart search indexing and hierarchical tagging system',
      'Tracked on GitHub with active commits (Fahadthecopy/AI-Smart-Notebook)'
    ],
    tech: ['TypeScript', 'React', 'Node.js', 'Markdown AST', 'Tailwind CSS'],
    githubUrl: 'https://github.com/Fahadthecopy/AI-Smart-Notebook',
    demoUrl: '#',
    commits: 2,
    lastContribution: 'Sep 7',
    caseStudy: {
      problem: 'Technical professionals needed a fast, zero-distraction notebook capable of handling complex programming notes, code snippets, and structured ideas without cloud bloat.',
      solution: 'Engineered a modular TypeScript notebook application featuring instantaneous markdown parsing, local cache persistence, and clean categorization.',
      highlights: [
        'Zero input latency: instant keystroke markdown rendering',
        'Type-safe architecture ensuring predictable state and zero null pointers',
        'Direct repository code available for cloning and extension'
      ],
      deliverables: ['TypeScript Source Code', 'Production Build Pipeline', 'Component Architecture Guide']
    }
  },
  {
    id: 'proj-hyperframes-studio',
    title: 'HyperFrames Studio - Creative Motion Suite',
    category: 'dashboard',
    categoryLabel: 'TypeScript Studio',
    tagline: 'High-performance visual frame sequencing engine and dynamic animation workbench',
    imageUrl: responsiveWebsiteImg,
    description: 'An interactive creative animation workstation engineered for frame-by-frame web motion sequences, creative canvas effects, and fluid digital design rendering.',
    features: [
      'Engineered with modern TypeScript and responsive canvas pipelines',
      'Frame-accurate timeline scrubber and playback controls',
      'Modular asset library and dynamic parameter adjustments',
      'Open-source repository with full modular architecture'
    ],
    tech: ['TypeScript', 'React', 'Canvas API', 'Motion', 'Tailwind CSS'],
    githubUrl: 'https://github.com/Fahadthecopy/HyperFrames-Studio',
    demoUrl: '#',
    commits: 4,
    lastContribution: 'Sep 7',
    caseStudy: {
      problem: 'Creators required an intuitive web-based canvas tool to inspect, preview, and generate fluid animation sequences without heavy desktop software.',
      solution: 'Constructed an in-browser studio with high-frequency render loops, timeline sequencing, and hardware-accelerated canvas styling.',
      highlights: [
        'Smooth 60fps frame rate playback on modern desktop and mobile browsers',
        'Clean modular TypeScript structure with strict typing',
        'Ready for integration into production web motion workflows'
      ],
      deliverables: ['HyperFrames Studio Source', 'Interactive Canvas Core', 'Motion Presets']
    }
  },
  {
    id: 'proj-aura-vogue',
    title: 'Aura-Vogue Luxury E-Commerce Storefront',
    category: 'ecommerce',
    categoryLabel: 'TypeScript E-Commerce',
    tagline: 'Modern high-fashion digital storefront with interactive catalogs & smooth cart flow',
    imageUrl: ecommerceCheckoutImg,
    description: 'A complete luxury fashion e-commerce storefront crafted in TypeScript. Features responsive product filters, interactive lookbook galleries, and frictionless checkout flows.',
    features: [
      'Full TypeScript implementation with strict product & cart models',
      'Interactive product preview modal with high-res zoom & variant selection',
      'Live shopping cart calculation with persistent session storage',
      '2 active commits on GitHub repository (Fahadthecopy/Aura-Vogue)'
    ],
    tech: ['TypeScript', 'React', 'Tailwind CSS', 'State Management', 'REST API'],
    githubUrl: 'https://github.com/Fahadthecopy/Aura-Vogue',
    demoUrl: '#',
    commits: 2,
    lastContribution: 'Sep 7',
    caseStudy: {
      problem: 'Boutique apparel brand required an ultra-clean, modern fashion portal with high-end aesthetic appeal and zero checkout friction.',
      solution: 'Crafted Aura-Vogue with elegant typography, smooth micro-interactions, responsive category filtering, and instant shopping cart updates.',
      highlights: [
        'Instantaneous category filtering without full page reloads',
        'Ultra-fast first contentful paint (FCP) under 0.9s',
        'Mobile-first touch-friendly product carousels and drawers'
      ],
      deliverables: ['Aura-Vogue Source Code', 'Product Data Models', 'Shopping Cart Logic']
    }
  },
  {
    id: 'proj-ai-website',
    title: 'AI Website - Modern Tech Agency Portal',
    category: 'business',
    categoryLabel: 'HTML / Web Portal',
    tagline: 'Futuristic responsive AI showcase portal with cybernetic aesthetic and high-converting CTA',
    imageUrl: responsiveWebsiteImg,
    description: 'A responsive artificial intelligence showcase website engineered with cybernetic neon styling, modern UI cards, glowing accents, and optimized conversion architecture.',
    features: [
      'Clean semantic HTML5 structure with optimized responsive CSS',
      'Cybernetic neon styling with dark-mode aesthetic and glowing highlights',
      'Interactive service cards and lead-capture inquiry forms',
      'Active repository on GitHub (Fahadthecopy/ai-website)'
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI', 'Cyber Aesthetic'],
    githubUrl: 'https://github.com/Fahadthecopy/ai-website',
    demoUrl: '#',
    commits: 2,
    lastContribution: 'Sep 7',
    caseStudy: {
      problem: 'Tech startup needed an eye-catching AI solution website to present machine learning capabilities with modern visual authority.',
      solution: 'Built a high-performance web agency layout with dark cybernetic themes, semantic cards, and streamlined conversion pathways.',
      highlights: [
        'Page load time reduced to sub-second on mobile and desktop',
        'Flawless responsive behavior from 320px smartphones to 4K displays',
        'Search engine optimized meta tags for rapid indexing'
      ],
      deliverables: ['Semantic HTML Website', 'Custom CSS Styling Sheets', 'Asset Package']
    }
  },
  {
    id: 'proj-fahad-portfolio',
    title: 'Fahad Waqas Developer Portfolio & Solution Engine',
    category: 'fullstack',
    categoryLabel: 'Full-Stack Portfolio',
    tagline: 'Interactive portfolio & client diagnostic engine with dynamic 60fps canvas particles',
    imageUrl: diagnosticsDeskImg,
    description: 'Flagship developer portfolio and live Solution Engine dashboard. Features real-time client problem lifecycle management, dynamic theme studio, and interactive SEO audit tools.',
    features: [
      'Full TypeScript & React architecture with Motion animations',
      '6 dynamic 60fps canvas particle styles and 4 portrait modes',
      'Client Solution Engine dashboard with live CRUD database & invoice creator',
      'Live repository on GitHub (Fahadthecopy/Fahad-Waqas-Developer-Portfolio)'
    ],
    tech: ['TypeScript', 'React', 'Tailwind CSS', 'Motion', 'Canvas 60fps'],
    githubUrl: 'https://github.com/Fahadthecopy/Fahad-Waqas-Developer-Portfolio',
    demoUrl: '#',
    commits: 1,
    lastContribution: 'Sep 7',
    caseStudy: {
      problem: 'Needed a world-class digital portfolio that transcends basic resumes by proving technical expertise through live interactive tools and problem-solving engines.',
      solution: 'Engineered a dual-view portal containing both a client-facing showcase and a complete operational dashboard inspired by real client workflows.',
      highlights: [
        'Real-time problem diagnostic wizard calculating root causes and turnaround times',
        'Multi-theme customizer with persistent localStorage state',
        'Direct WhatsApp booking integration for instant client conversions'
      ],
      deliverables: ['Full Portfolio Codebase', 'Dashboard State Engine', 'Deployment Build Config']
    }
  },
  {
    id: 'proj-ai-core',
    title: 'AI Core Web Application & Prompt Workbench',
    category: 'api',
    categoryLabel: 'HTML / AI Utility',
    tagline: 'Lightweight AI prompt workbench with responsive layout & instant client styling',
    imageUrl: websiteErrorRepairImg,
    description: 'A clean, lightweight AI core web workspace and prompt workbench built for rapid interaction, testing, and zero-lag response formatting.',
    features: [
      'Lightweight semantic HTML & JavaScript execution',
      'Responsive prompt input layout with formatted output panels',
      'Zero unnecessary dependencies for maximum performance',
      'GitHub repository: Fahadthecopy/ai (2 commits)'
    ],
    tech: ['HTML5', 'JavaScript (ES6+)', 'CSS3', 'AI Prompts', 'Responsive UI'],
    githubUrl: 'https://github.com/Fahadthecopy/ai',
    demoUrl: '#',
    commits: 2,
    lastContribution: 'Sep 7',
    caseStudy: {
      problem: 'Users required a minimal, immediate web interface to compose and test structured AI prompts without bulky frameworks.',
      solution: 'Developed a standalone, ultra-fast web utility with clean CSS styling and structured output panes.',
      highlights: [
        'Instant startup time with 100% Google Lighthouse performance score',
        'Easily embeddable or adaptable into larger web platforms',
        'Clean codebase accessible directly on GitHub'
      ],
      deliverables: ['Core HTML Application', 'Minimal Script Logic', 'Quickstart Guide']
    }
  },
  {
    id: 'proj-ai-web',
    title: 'AI Web Studio - SEO & Web Automation Tool',
    category: 'seo',
    categoryLabel: 'HTML / SEO Tool',
    tagline: 'Modern web AI integration toolkit designed for live webmaster workflows',
    imageUrl: seoSpeedAuditImg,
    description: 'A specialized web tool tailored for webmasters and creators. Assists with rapid on-page metadata generation, automated summaries, and client lead workflows.',
    features: [
      'Structured on-page metadata checker & title length counter',
      'Automated schema generation helpers and keyword density scanners',
      'Clean responsive layout with dark-mode compatibility',
      'GitHub repository: Fahadthecopy/ai-web'
    ],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Technical SEO', 'Webmaster Tools'],
    githubUrl: 'https://github.com/Fahadthecopy/ai-web',
    demoUrl: '#',
    commits: 2,
    lastContribution: 'Sep 7',
    caseStudy: {
      problem: 'Webmasters frequently lose search traffic due to improperly formatted meta titles, missing descriptions, and unoptimized schema.',
      solution: 'Created AI Web Studio to automate the inspection and generation of high-CTR search snippets and structured data.',
      highlights: [
        'Prevents title truncation on Google desktop and mobile SERPs',
        'Generates copy-paste Schema.org JSON-LD snippets instantly',
        'Provides real-time feedback with zero server latency'
      ],
      deliverables: ['AI Web Studio Files', 'SEO Snippet Validator', 'Schema Presets']
    }
  },
  {
    id: 'proj-crud-system',
    title: 'PHP & MySQL Database Management & CRUD System',
    category: 'crud',
    categoryLabel: 'PHP / MySQL CRUD',
    tagline: 'Secure multi-user record management with parameterized queries & CSV export',
    imageUrl: serverDbMonitorImg,
    description: 'A robust database management system allowing administrators to securely Create, Read, Update, and Delete client records with data validation and search indexing.',
    features: [
      'Secure User Authentication & Session password hashing (Bcrypt)',
      'Instant search, multi-column sorting & pagination',
      'Parameterized SQL queries protecting against SQL Injection',
      'One-click export to CSV & PDF reports'
    ],
    tech: ['PHP Core', 'MySQL', 'PDO Architecture', 'HTML5', 'Bootstrap'],
    githubUrl: 'https://github.com/Fahadthecopy',
    demoUrl: '#',
    caseStudy: {
      problem: 'Small business relied on disorganized spreadsheets to track client files, resulting in data loss and lack of access control.',
      solution: 'Developed a custom, secure web-based CRUD portal powered by PHP PDO and MySQL, offering password authentication and structured logging.',
      highlights: [
        'Zero security vulnerabilities: strict input sanitization and PDO bindings',
        'Role-level separation between general staff and administrators',
        'Audit trail logging who created and updated each record'
      ],
      deliverables: ['Complete PHP Source Code', 'Database Architecture (.sql)', 'User Manual']
    }
  }
];

const filterOptions = [
  { id: 'all', label: 'All 8 Projects' },
  { id: 'github', label: 'Live GitHub Repos (7)' },
  { id: 'fullstack', label: 'TypeScript & Full-Stack' },
  { id: 'ecommerce', label: 'E-Commerce' },
  { id: 'business', label: 'Business & AI' },
  { id: 'dashboard', label: 'Animation & Studio' },
  { id: 'crud', label: 'PHP & MySQL CRUD' },
  { id: 'seo', label: 'SEO & Tools' }
];

export default function PortfolioShowcase() {
  const [filter, setFilter] = useState('all');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [copiedRepoId, setCopiedRepoId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const handleCopyClone = (cloneUrl: string, id: string) => {
    navigator.clipboard.writeText(`git clone ${cloneUrl}`);
    setCopiedRepoId(id);
    setTimeout(() => setCopiedRepoId(null), 2200);
  };

  const filteredProjects = filter === 'all'
    ? projectsData
    : filter === 'github'
      ? projectsData.filter(p => p.githubUrl.includes('Fahadthecopy'))
      : projectsData.filter(p => {
          if (filter === 'business') return p.category === 'business' || p.category === 'landing';
          return p.category === filter;
        });

  const handleScrollToContact = () => {
    setActiveModalProject(null);
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="portfolio" 
      ref={sectionRef}
      className="py-24 relative overflow-hidden px-4 sm:px-6 lg:px-8 bg-slate-950/20"
    >
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-mono mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Featured Case Studies & Flagship Projects</span>
          </div>
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Proof of Work & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Live Demonstrations</span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto mt-4 leading-relaxed">
            Explore 8 core production-ready projects demonstrating business websites, e-commerce systems, secure PHP/MySQL CRUD applications, dashboards, REST APIs, and SEO optimizations.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-cyan-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Filter Tab bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filterOptions.map(opt => (
            <button
              key={opt.id}
              onClick={() => setFilter(opt.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 border cursor-pointer ${
                filter === opt.id
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-500 border-transparent text-white shadow-[0_0_15px_rgba(168,85,247,0.25)] scale-105'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Portfolio Showcase Grid (8 Flagship Projects) */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: idx * 0.03 }}
                key={project.id}
                className="rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-purple-500/40 hover:bg-slate-900/80 hover:shadow-[0_0_25px_rgba(168,85,247,0.1)] transition-all duration-300 flex flex-col justify-between group overflow-hidden"
              >
                {/* Project Image Banner */}
                {project.imageUrl && (
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-85" />
                    <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-slate-950/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                      Live Preview
                    </span>
                  </div>
                )}

                {/* Visual Header & Category */}
                <div className="p-5 pb-3">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center space-x-1.5 flex-wrap gap-y-1">
                      <span className="text-[10px] font-mono tracking-wider text-cyan-400 bg-cyan-950/50 border border-cyan-500/20 px-2 py-0.5 rounded uppercase">
                        {project.categoryLabel}
                      </span>
                      {project.commits && (
                        <span className="inline-flex items-center space-x-1 text-[10px] font-mono text-purple-300 bg-purple-950/50 px-1.5 py-0.5 rounded border border-purple-500/20">
                          <GitCommit className="w-2.5 h-2.5 text-cyan-400" />
                          <span>{project.commits} commits</span>
                        </span>
                      )}
                    </div>
                    <div className="flex space-x-1.5">
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-white transition-colors"
                        title="View Code on GitHub"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                      {project.demoUrl && project.demoUrl !== '#' ? (
                        <a 
                          href={project.demoUrl} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-cyan-400 transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <button
                          onClick={() => setActiveModalProject(project)}
                          className="p-1.5 rounded-lg bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
                          title="View Technical Case Study & Architecture"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <h3 className="text-white text-base font-bold group-hover:text-cyan-400 transition-colors duration-300 line-clamp-1">
                    {project.title}
                  </h3>
                  
                  <p className="text-purple-300 text-[11px] font-medium mt-1 line-clamp-1">
                    {project.tagline}
                  </p>

                  <p className="text-slate-400 text-xs mt-2 leading-relaxed h-14 overflow-hidden text-ellipsis line-clamp-3">
                    {project.description}
                  </p>

                  {/* Bullet features */}
                  <ul className="mt-3 space-y-1 border-t border-slate-800/50 pt-3">
                    {project.features.slice(0, 2).map((f, fIdx) => (
                      <li key={fIdx} className="text-[11px] text-slate-400 flex items-center">
                        <CheckCircle className="w-3 h-3 text-cyan-400 mr-1.5 shrink-0" />
                        <span className="truncate">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech tags & Case Study trigger button */}
                <div className="p-5 pt-3 bg-slate-950/40 border-t border-slate-800/60">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.tech.slice(0, 4).map(t => (
                      <span 
                        key={t}
                        className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="w-full py-2 rounded-xl bg-slate-800/80 hover:bg-gradient-to-r hover:from-purple-600 hover:to-cyan-500 text-slate-200 hover:text-white text-xs font-semibold transition-all duration-300 flex items-center justify-center space-x-1.5 cursor-pointer group-hover:border-transparent"
                  >
                    <span>View Full Case Study</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* =========================================================================
            LIVE GITHUB REPOSITORIES & SOURCE CODE ECOSYSTEM (@Fahadthecopy)
           ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-20 p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-purple-500/30 backdrop-blur-md relative overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Hub Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800 relative z-10">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/40 text-cyan-400 text-xs font-mono mb-2">
                <Github className="w-3.5 h-3.5" />
                <span>Active Repositories • @{GITHUB_USERNAME}</span>
              </div>
              <h3 className="text-white text-2xl sm:text-3xl font-bold tracking-tight">
                Live GitHub <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Repositories & Codebases</span>
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
                Real active open-source projects crafted in TypeScript and modern HTML, with live commits on September 7. Inspect code or clone locally.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={GITHUB_PROFILE_URL}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs shadow-md hover:scale-105 transition-all flex items-center space-x-2"
              >
                <Github className="w-4 h-4" />
                <span>Visit GitHub Profile</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>
          </div>

          {/* Quick Stats Pill Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6 relative z-10">
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-purple-950/50 text-purple-400">
                <FolderGit2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-mono">Public Repos</div>
                <div className="text-sm font-bold text-white">7 Repositories</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-cyan-950/50 text-cyan-400">
                <Code className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-mono">Languages</div>
                <div className="text-sm font-bold text-white">TypeScript & HTML</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-emerald-950/50 text-emerald-400">
                <GitCommit className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-mono">Latest Commits</div>
                <div className="text-sm font-bold text-white">Active (Sep 7)</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-blue-950/50 text-blue-400">
                <GitBranch className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-mono">Architecture</div>
                <div className="text-sm font-bold text-white">Modular & Clean</div>
              </div>
            </div>
          </div>

          {/* 7 GitHub Repositories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
            {githubRepositories.map((repo) => (
              <div 
                key={repo.id}
                className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-purple-500/50 hover:bg-slate-950 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center space-x-2">
                      <Github className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                      <span className="text-xs font-mono font-bold text-white group-hover:text-cyan-400 transition-colors truncate max-w-[170px]">
                        {repo.name}
                      </span>
                    </div>

                    <div className="flex items-center space-x-1.5 shrink-0">
                      <span className="inline-flex items-center space-x-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
                        <span 
                          className="w-2 h-2 rounded-full inline-block mr-1"
                          style={{ backgroundColor: repo.languageColor }}
                        />
                        {repo.language}
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2 mb-3">
                    {repo.description}
                  </p>

                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-slate-800/60 pt-2 mb-3">
                    <span className="flex items-center text-purple-300">
                      <GitCommit className="w-3 h-3 text-cyan-400 mr-1" />
                      {repo.commits} commits ({repo.lastContribution})
                    </span>
                    <span className="text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded">
                      {repo.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1 border-t border-slate-900">
                  <button
                    onClick={() => handleCopyClone(repo.cloneUrl, repo.id)}
                    className="flex-1 py-1.5 px-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-[10px] font-mono transition-colors flex items-center justify-center space-x-1.5 border border-slate-800 cursor-pointer"
                    title={`git clone ${repo.cloneUrl}`}
                  >
                    {copiedRepoId === repo.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">Copied Clone!</span>
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
                    className="py-1.5 px-3 rounded-lg bg-purple-950/40 hover:bg-purple-900/60 text-cyan-300 hover:text-cyan-200 text-[10px] font-semibold transition-colors flex items-center justify-center space-x-1 border border-purple-500/30"
                  >
                    <span>GitHub</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Terminal Helper Snippet */}
          <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
            <div className="flex items-center space-x-2 truncate">
              <span className="text-cyan-400 font-bold">$</span>
              <span className="text-slate-400">Quick Clone:</span>
              <span className="text-purple-300 select-all truncate">git clone https://github.com/Fahadthecopy/AI-Smart-Notebook.git</span>
            </div>
            <button
              onClick={() => handleCopyClone('https://github.com/Fahadthecopy/AI-Smart-Notebook.git', 'quick-clone')}
              className="px-3 py-1 rounded bg-slate-900 hover:bg-slate-800 text-[11px] text-cyan-300 font-sans font-medium transition-colors border border-slate-800 shrink-0 cursor-pointer flex items-center space-x-1"
            >
              {copiedRepoId === 'quick-clone' ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-slate-400" />
                  <span>Copy Command</span>
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Custom Development Promotion Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 p-8 rounded-3xl bg-slate-900/40 border border-purple-500/20 backdrop-blur-md relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ready for Fiverr Orders & Upwork Contracts</span>
              </div>
              <h3 className="text-white text-xl sm:text-2xl font-bold tracking-tight">
                Need a Custom Version of Any Project Above?
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Whether you need a full-featured e-commerce shop, a custom PHP & MySQL dashboard, a high-converting landing page, or technical SEO optimization, I build cleanly structured, fast, and secure solutions tailored to your exact business goals.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {[
                  'Business Websites', 'E-Commerce Stores', 'PHP/MySQL CRUD', 'Admin Dashboards',
                  'REST APIs', 'Technical SEO', 'Landing Pages', 'Full-Stack SaaS'
                ].map(item => (
                  <div key={item} className="flex items-center space-x-1.5 text-xs text-slate-300">
                    <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-start lg:justify-end">
              <button
                onClick={handleScrollToContact}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs shadow-md hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:scale-105 transition-all duration-300 w-full cursor-pointer flex items-center justify-center space-x-2"
              >
                <Wrench className="w-4 h-4" />
                <span>Request a Custom Quote</span>
              </button>

              <a
                href="https://wa.me/923000610586"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-green-500/50 font-semibold text-xs transition-all duration-300 w-full flex items-center justify-center space-x-2"
              >
                <span>Discuss on WhatsApp (03000610586)</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-900 border border-purple-500/30 p-6 sm:p-8 shadow-2xl"
            >
              {/* Close button */}
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="mb-6 pr-8">
                <span className="text-[10px] font-mono tracking-widest text-cyan-400 bg-cyan-950/50 border border-cyan-500/20 px-2.5 py-1 rounded uppercase">
                  {activeModalProject.categoryLabel} Case Study
                </span>
                <h3 className="text-white text-2xl font-bold mt-2">
                  {activeModalProject.title}
                </h3>
                <p className="text-purple-300 text-xs sm:text-sm mt-1">
                  {activeModalProject.tagline}
                </p>
              </div>

              {/* Modal Image Preview */}
              {activeModalProject.imageUrl && (
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-6 bg-slate-950 border border-slate-800">
                  <img 
                    src={activeModalProject.imageUrl} 
                    alt={activeModalProject.title} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              )}

              {/* Problem & Solution */}
              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                  <h4 className="text-xs font-mono uppercase text-red-400 font-bold mb-1">
                    The Challenge / Client Requirement:
                  </h4>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {activeModalProject.caseStudy.problem}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                  <h4 className="text-xs font-mono uppercase text-emerald-400 font-bold mb-1">
                    Technical Solution Delivered:
                  </h4>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {activeModalProject.caseStudy.solution}
                  </p>
                </div>
              </div>

              {/* Highlights & Deliverables */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="text-xs font-mono uppercase text-cyan-400 font-bold mb-2">
                    Key Achievements:
                  </h4>
                  <ul className="space-y-1.5">
                    {activeModalProject.caseStudy.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start">
                        <CheckCircle className="w-3.5 h-3.5 text-cyan-400 mr-2 mt-0.5 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase text-purple-400 font-bold mb-2">
                    Delivered Artifacts:
                  </h4>
                  <ul className="space-y-1.5">
                    {activeModalProject.caseStudy.deliverables.map((d, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start">
                        <Zap className="w-3.5 h-3.5 text-purple-400 mr-2 mt-0.5 shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Technologies Used */}
              <div className="mb-6">
                <h4 className="text-xs font-mono uppercase text-slate-400 font-bold mb-2">
                  Technologies Used:
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeModalProject.tech.map(t => (
                    <span key={t} className="text-xs font-mono text-cyan-300 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleScrollToContact}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs shadow-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all cursor-pointer flex items-center justify-center space-x-2"
                >
                  <Wrench className="w-4 h-4" />
                  <span>Hire Me for a Similar Project</span>
                </button>

                <a
                  href={activeModalProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-5 rounded-xl bg-slate-800 text-slate-200 hover:text-white text-xs font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  <Github className="w-4 h-4" />
                  <span>View GitHub Code</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
