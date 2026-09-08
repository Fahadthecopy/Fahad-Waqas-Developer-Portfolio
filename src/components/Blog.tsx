/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';

interface BlogPost {
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readTime: string;
}

const blogPosts: BlogPost[] = [
  {
    title: 'Why Laravel Remains the Undisputed MVC Champion in 2026',
    category: 'Backend Development',
    excerpt: 'An in-depth logical analysis exploring Eloquent ORM optimizations, modular routing, Blade rendering speed, and why startup founders choose Laravel for scalable MVPs.',
    date: 'Jun 15, 2026',
    readTime: '5 min read'
  },
  {
    title: 'On-Page SEO Checklist: Technical Audits That Multiply Click-Throughs',
    category: 'SEO & Marketing',
    excerpt: 'Mastering technical SEO indexing. A hands-on guide covering robots.txt setups, semantic heading hierarchies, clean metadata, and boosting site speed scores.',
    date: 'May 28, 2026',
    readTime: '8 min read'
  },
  {
    title: 'Building Fluid React UIs: Balancing Negative Space & Micro-Animations',
    category: 'UI/UX Engineering',
    excerpt: 'How micro-interactions, hardware-accelerated Framer Motion loops, and elegant Slate-900 typography pairings establish immediate luxury branding value.',
    date: 'Apr 10, 2026',
    readTime: '6 min read'
  }
];

export default function Blog() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  return (
    <section 
      id="blog" 
      ref={containerRef}
      className="py-24 relative overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2 drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]">
            08 / SEO & Publications
          </h3>
          <h2 className="text-white text-3xl sm:text-4xl font-bold tracking-tight">
            Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Articles</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-600 to-cyan-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Blog Post Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, idx) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-purple-500/30 hover:bg-slate-900/60 hover:shadow-[0_0_25px_rgba(168,85,247,0.05)] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Visual Header */}
                <div className="flex justify-between items-center mb-4 text-[10px] font-mono tracking-wider">
                  <span className="text-cyan-400 bg-cyan-950/30 border border-cyan-500/10 px-2.5 py-1 rounded-md uppercase">
                    {post.category}
                  </span>
                  <div className="flex items-center space-x-3 text-slate-500">
                    <span className="flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1" />
                      {post.date}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1" />
                      {post.readTime}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-white text-base sm:text-lg font-bold tracking-wide group-hover:text-cyan-400 transition-colors duration-300 leading-snug">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              {/* Action Button */}
              <div className="border-t border-slate-800/60 pt-4 mt-6 flex items-center justify-between text-xs font-mono font-semibold text-slate-400 group-hover:text-white transition-colors">
                <span className="flex items-center space-x-1">
                  <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                  <span>Content Strategy</span>
                </span>
                <span className="flex items-center space-x-1 text-cyan-400 group-hover:translate-x-1 transition-transform">
                  <span>Read Post</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
