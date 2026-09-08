/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { 
  Gauge, 
  Smartphone, 
  Sparkles, 
  AlertCircle, 
  Rocket, 
  UserCircle, 
  PlusCircle, 
  Bug, 
  TrendingUp, 
  HelpCircle,
  Plus,
  Minus,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';

interface ProblemCard {
  id: string;
  problem: string;
  solution: string;
  icon: any;
  colorClass: string;
}

const problemsData: ProblemCard[] = [
  {
    id: 'prob-1',
    problem: 'My website is slow and sluggish.',
    solution: "I'll run comprehensive profiling audits, minify code bundles, compress assets & images, and optimize queries to deliver lightning-fast load times under 2 seconds.",
    icon: Gauge,
    colorClass: 'from-amber-500 to-red-500'
  },
  {
    id: 'prob-2',
    problem: "My website doesn't look good on mobile.",
    solution: "I will rebuild or adapt your layout with a fluid, mobile-first responsive architecture that adjusts beautifully across desktops, iPads, iPhones, and Androids.",
    icon: Smartphone,
    colorClass: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'prob-3',
    problem: 'My website design looks outdated.',
    solution: "I'll execute a complete modern visual makeover with a high-end dark luxury or clean minimalist aesthetic, custom glassmorphism, and intuitive layout structures.",
    icon: Sparkles,
    colorClass: 'from-purple-500 to-pink-500'
  },
  {
    id: 'prob-4',
    problem: 'Buttons, forms, or links are broken.',
    solution: "I'll identify root javascript or styling faults, repair non-working submission handlers, and wire correct form hooks to secure seamless data capturing.",
    icon: AlertCircle,
    colorClass: 'from-rose-500 to-orange-500'
  },
  {
    id: 'prob-5',
    problem: 'I need a brand-new business website.',
    solution: "I will build a high-performance, responsive corporate or landing site from absolute scratch, optimized perfectly for your industry, values, and conversions.",
    icon: Rocket,
    colorClass: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'prob-6',
    problem: 'I need a stunning personal portfolio.',
    solution: "I'll design a customized, highly impressive portfolio showcase with smooth scrolling, project filter galleries, and elegant typing bio animations to win clients.",
    icon: UserCircle,
    colorClass: 'from-pink-500 to-indigo-500'
  },
  {
    id: 'prob-7',
    problem: 'I want to add new custom features.',
    solution: "I'll integrate tailored functional additions (CMS, dynamic filters, custom blogs, newsletter signups) without compromising your site's speed or codebase.",
    icon: PlusCircle,
    colorClass: 'from-violet-500 to-fuchsia-500'
  },
  {
    id: 'prob-8',
    problem: 'My website has PHP or Laravel bugs.',
    solution: "I'll delve into the backend server logic, correct faulty routes, troubleshoot MySQL exceptions, clean up validation logic, and ensure stable operations.",
    icon: Bug,
    colorClass: 'from-red-600 to-rose-700'
  },
  {
    id: 'prob-9',
    problem: 'I want better speed and search rankings.',
    solution: "I will implement technical SEO best practices (semantic HTML tags, metadata audits, Sitemap.xml generation, indexation tests) combined with code optimizations.",
    icon: TrendingUp,
    colorClass: 'from-cyan-500 to-emerald-500'
  },
  {
    id: 'prob-10',
    problem: "I'm not sure what my website needs.",
    solution: "No problem! We'll hop on a call or chat. Share your business goals and I will review your current asset, map out a plan, and recommend practical solutions.",
    icon: HelpCircle,
    colorClass: 'from-slate-500 to-slate-700'
  }
];

const faqsData = [
  {
    q: 'What services do you provide?',
    a: 'I specialize in full stack development including highly responsive frontend websites (HTML5, CSS3, JS, React, Tailwind, Bootstrap), backend systems (PHP, Node.js, Express, Laravel), database configuration (MySQL, MongoDB, Firebase), technical SEO keyword research, and professional content/blog writing.'
  },
  {
    q: 'Can you redesign my existing website?',
    a: 'Absolutely. I can analyze your current website layout, identify speed or responsive faults, and do a complete luxury aesthetic makeover to make it faster, more interactive, and highly conversion-focused.'
  },
  {
    q: 'Can you fix bugs or technical issues?',
    a: 'Yes, I excel at debugging. Whether it is broken forms, navigation errors, PHP/Laravel runtime errors, server exceptions, database mismatch issues, or CSS alignment bugs, I can isolate and stabilize the code.'
  },
  {
    q: 'Will my website work on mobile devices?',
    a: 'Yes, every layout is built using a mobile-first responsive approach, ensuring fluid adaptation on ultra-wides, laptops, standard tablets, iPads, and modern smartphone viewports.'
  },
  {
    q: 'Can you improve my website speed?',
    a: 'Definitely. I optimize image assets, leverage caching, audit script bundles, reduce unused styling elements, structure lightweight requests, and clean server code to hit excellent Google Lighthouse speed metrics.'
  },
  {
    q: 'Do you build both frontend and backend?',
    a: 'Yes, I am a trained Full Stack Developer with 3+ years of intensive learning. I synthesize modern React or HTML/JS/Tailwind frontends with robust Laravel or Node.js server architectures and MySQL schemas.'
  },
  {
    q: 'How do we start working together?',
    a: 'Simply drop your details in the contact form, shoot an email to fahad456677gg@gmail.com, or tap the WhatsApp button. We will set up a quick message chat or video consult to review your business goals!'
  },
  {
    q: 'Can you customize one of your portfolio projects for my business?',
    a: 'Yes! All 150+ practice and personal projects are fully designed by me from scratch. I can take any structural pattern or design you like, customize its branding, and build a production-grade version tailored to your specific requirements.'
  },
  {
    q: 'Will you keep me updated during the project?',
    a: 'Yes. Clear, transparent, and direct communication is my primary standard. I believe in sending weekly loom walk-throughs, preview links, or structured updates so you are always aware of development progress.'
  },
  {
    q: 'How can I contact you?',
    a: 'You can complete the contact form below, email me at fahad456677gg@gmail.com, call/message on WhatsApp at +92305762253, or follow my active profiles on GitHub and LinkedIn.'
  }
];

export default function ClientSolutions() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="client-solutions" 
      ref={containerRef}
      className="py-24 relative overflow-hidden px-4 sm:px-6 lg:px-8 bg-slate-950/20"
    >
      {/* Background neon glows */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2 drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]">
            04 / Problem Solver & FAQ
          </h3>
          <h2 className="text-white text-3xl sm:text-4xl font-bold tracking-tight">
            What Challenge Are You <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Facing?</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto mt-4 leading-relaxed">
            Every business has different goals and website challenges. Tell me what is stopping your website from performing at its best, and together we will find the right solution.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-600 to-cyan-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Introduction Note Block */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto p-6 rounded-2xl bg-slate-900/30 border border-slate-800/80 backdrop-blur-md mb-16 text-center text-slate-300 text-sm sm:text-base leading-relaxed"
        >
          💡 <span className="text-white font-semibold">Don't worry if you are unsure where to start.</span> Whether you need a brand-new website, improvements to an existing one, bug fixes, or search optimization, I'm here to understand your requirements and recommend the best technical approach. I believe every successful project begins with listening carefully.
        </motion.div>

        {/* Problems & Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
          {problemsData.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-cyan-500/30 hover:bg-slate-900/60 hover:shadow-[0_0_20px_rgba(6,182,212,0.05)] transition-all duration-300 flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-5"
              >
                {/* Glowing Side Icon */}
                <div className={`p-3.5 rounded-xl bg-gradient-to-br ${item.colorClass} text-white shadow-lg shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>

                <div className="space-y-2">
                  <h4 className="text-white text-sm font-bold tracking-wide">
                    {item.problem}
                  </h4>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    <span className="text-cyan-400 font-medium font-mono mr-1.5 text-xs">Solution:</span>
                    {item.solution}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Sleek Call To Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-purple-950/40 to-slate-900/80 border border-purple-500/20 backdrop-blur-md relative overflow-hidden text-center mb-24"
        >
          {/* Subtle flare */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <h3 className="text-white text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">
            Let's Solve Your Website Problems Together
          </h3>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8">
            Every great website starts with a simple conversation. Tell me about your project, your business, or the challenges you are facing. I will review your requirements and help you choose the best solution. Your success is my absolute priority.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => handleScrollTo('contact')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold text-xs shadow-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all duration-300 cursor-pointer"
            >
              Get Free Consultation
            </button>
            <button
              onClick={() => handleScrollTo('contact')}
              className="px-6 py-3 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-300 font-semibold text-xs hover:border-purple-500/50 hover:text-white transition-all duration-300 cursor-pointer"
            >
              Tell Me About Your Project
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mt-8 pt-6 border-t border-slate-800/60 max-w-lg mx-auto">
            <span className="text-[10px] sm:text-xs text-slate-500 flex items-center">
              <Check className="w-3.5 h-3.5 text-cyan-400 mr-1.5" />
              Responsive Design
            </span>
            <span className="text-[10px] sm:text-xs text-slate-500 flex items-center">
              <Check className="w-3.5 h-3.5 text-cyan-400 mr-1.5" />
              Clean Code Architecture
            </span>
            <span className="text-[10px] sm:text-xs text-slate-500 flex items-center">
              <Check className="w-3.5 h-3.5 text-cyan-400 mr-1.5" />
              Technical SEO Ready
            </span>
          </div>
        </motion.div>

        {/* FAQ Segment */}
        <div className="max-w-4xl mx-auto" id="faq-section">
          {/* Section Heading */}
          <div className="text-center mb-12">
            <h3 className="text-white text-xl sm:text-2xl font-bold tracking-tight">
              Frequently Asked Questions
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-2">
              Get answers to the most common queries about working with me
            </p>
          </div>

          {/* FAQ Accordion list */}
          <div className="space-y-4">
            {faqsData.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-xl border border-slate-800 bg-slate-900/20 overflow-hidden hover:border-purple-500/20 transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex justify-between items-center p-5 text-left text-white text-sm sm:text-base font-semibold tracking-wide cursor-pointer select-none"
                  >
                    <span>{faq.q}</span>
                    <div className="p-1 rounded-lg bg-slate-800/60 border border-slate-700/50 text-slate-400">
                      {isOpen ? <Minus className="w-4 h-4 text-cyan-400" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="border-t border-slate-800/40"
                      >
                        <div className="p-5 text-slate-400 text-xs sm:text-sm leading-relaxed bg-slate-950/30">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
