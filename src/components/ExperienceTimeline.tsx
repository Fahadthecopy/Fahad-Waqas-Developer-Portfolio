/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { 
  Briefcase, 
  BookOpen, 
  Terminal, 
  Calendar, 
  CheckCircle,
  FileText
} from 'lucide-react';

interface TimelineItem {
  year: string;
  role: string;
  company: string;
  type: 'work' | 'learning';
  description: string;
  bullets: string[];
  tags: string[];
  icon: any;
}

const timelineData: TimelineItem[] = [
  {
    year: '2024 - PRESENT',
    role: 'Freelance Web Developer',
    company: 'Self-Employed (Seeking Opportunities)',
    type: 'work',
    description: 'Developing high-performance responsive web products, styling custom frontends, debugging logical code paths, and customizing CMS templates.',
    bullets: [
      'Built custom responsive templates using HTML5, CSS3, JavaScript, and PHP.',
      'Audited website speeds and implemented bundle minification and image optimization.',
      'Customized and managed functional WordPress portals and responsive page sections.',
      'Identified and fixed design alignment and script handler issues across multiple templates.'
    ],
    tags: ['Tailwind CSS', 'PHP', 'Laravel', 'JavaScript', 'Speed Tuning'],
    icon: Briefcase
  },
  {
    year: '2023 - PRESENT',
    role: 'Content Writer & SEO Assistant',
    company: 'Freelance & Contract Work',
    type: 'work',
    description: 'Conducting in-depth on-page keyword audits, auditing site structures for indexing, and drafting highly readable blog publications.',
    bullets: [
      'Wrote engaging, SEO-optimized blog articles and informative long-form manuals.',
      'Performed detailed keyword audits and competitor search indexes analysis.',
      'Drafted outreach copy and managed guest posting publications on authority niches.',
      'Enriched image tags, metadata descriptors, and header hierarchies to index faster.'
    ],
    tags: ['Blog Writing', 'Keyword Auditing', 'On-Page SEO', 'Outreach', 'Copywriting'],
    icon: FileText
  },
  {
    year: '2023 - PRESENT',
    role: 'Full Stack Learning & Practice Sandbox',
    company: 'Self-Driven Development',
    type: 'learning',
    description: 'Undertook rigorous self-taught training, completing 200+ personal sandbox files, REST APIs, and database migrations to simulate production architectures.',
    bullets: [
      'Engineered 12 main practice applications including E-commerce stores and admin panels.',
      'Studied database management systems (MySQL relational schemas, indexes, and queries).',
      'Configured Express.js / Node.js routers and Laravel Blade MVC controllers.',
      'Familiarized with version-control workflows using Git and GitHub branches.'
    ],
    tags: ['Laravel', 'Node.js', 'MySQL', 'Express', 'Git & GitHub', 'MVC Architecture'],
    icon: Terminal
  }
];

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  return (
    <section 
      id="experience" 
      ref={containerRef}
      className="py-24 relative overflow-hidden px-4 sm:px-6 lg:px-8 bg-slate-950/40"
    >
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2 drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]">
            06 / History & Education
          </h3>
          <h2 className="text-white text-3xl sm:text-4xl font-bold tracking-tight">
            Work & Learning <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Timeline</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-600 to-cyan-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Vertical Timeline Tree */}
        <div className="relative border-l border-slate-800 ml-4 sm:ml-6 space-y-12 pb-4">
          {timelineData.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="relative pl-8 sm:pl-10 group"
              >
                {/* Timeline node circle */}
                <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-300">
                  <Icon className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                </div>

                {/* Timeline Card Content */}
                <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-purple-500/30 hover:bg-slate-900/60 transition-all duration-300 relative shadow-md">
                  {/* Glowing tag for date */}
                  <span className="inline-flex items-center space-x-1.5 text-[10px] font-mono font-bold tracking-wider text-cyan-400 bg-cyan-950/30 border border-cyan-500/20 px-2.5 py-1 rounded-full mb-3 uppercase">
                    <Calendar className="w-3 h-3" />
                    <span>{item.year}</span>
                  </span>

                  <h3 className="text-white text-lg font-bold tracking-wide">
                    {item.role}
                  </h3>
                  <h4 className="text-purple-400 text-xs sm:text-sm font-semibold mt-1">
                    {item.company}
                  </h4>

                  <p className="text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Bullet list */}
                  <ul className="mt-4 space-y-2 border-t border-slate-800/50 pt-4">
                    {item.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="text-xs text-slate-500 flex items-start">
                        <CheckCircle className="w-3.5 h-3.5 text-cyan-400 mt-0.5 mr-2 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech tags list */}
                  <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-slate-800/30">
                    {item.tags.map(t => (
                      <span 
                        key={t}
                        className="text-[9px] font-mono text-slate-400 bg-slate-950/60 px-2 py-0.5 rounded border border-slate-800"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
