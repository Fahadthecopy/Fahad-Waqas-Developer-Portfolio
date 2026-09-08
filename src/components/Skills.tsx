/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { 
  Code2, 
  Database, 
  Terminal, 
  Wrench, 
  FileText, 
  CheckCircle2, 
  Cpu
} from 'lucide-react';

interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'marketing';
  percentage: number;
}

const skillsData: Skill[] = [
  // Frontend
  { name: 'HTML5', category: 'frontend', percentage: 95 },
  { name: 'CSS3', category: 'frontend', percentage: 92 },
  { name: 'JavaScript (ES6+)', category: 'frontend', percentage: 88 },
  { name: 'Tailwind CSS', category: 'frontend', percentage: 92 },
  { name: 'Bootstrap', category: 'frontend', percentage: 85 },
  { name: 'React.js', category: 'frontend', percentage: 75 },
  { name: 'WordPress', category: 'frontend', percentage: 80 },

  // Backend
  { name: 'PHP', category: 'backend', percentage: 85 },
  { name: 'Laravel', category: 'backend', percentage: 82 },
  { name: 'Node.js', category: 'backend', percentage: 78 },
  { name: 'Express.js', category: 'backend', percentage: 76 },

  // Database
  { name: 'MySQL', category: 'database', percentage: 82 },
  { name: 'Firebase', category: 'database', percentage: 70 },
  { name: 'MongoDB', category: 'database', percentage: 65 },

  // Tools
  { name: 'Git & GitHub', category: 'tools', percentage: 88 },
  { name: 'VS Code', category: 'tools', percentage: 95 },
  { name: 'Postman', category: 'tools', percentage: 80 },
  { name: 'Figma (UI/UX)', category: 'tools', percentage: 75 },

  // Marketing & Content
  { name: 'Content Writing', category: 'marketing', percentage: 90 },
  { name: 'Blog Writing', category: 'marketing', percentage: 88 },
  { name: 'Keyword Research', category: 'marketing', percentage: 85 },
  { name: 'Guest Posting', category: 'marketing', percentage: 80 },
  { name: 'Technical SEO', category: 'marketing', percentage: 85 }
];

const categories = [
  { id: 'all', label: 'All Tech', icon: Cpu },
  { id: 'frontend', label: 'Frontend', icon: Code2 },
  { id: 'backend', label: 'Backend', icon: Terminal },
  { id: 'database', label: 'Database', icon: Database },
  { id: 'tools', label: 'Tools', icon: Wrench },
  { id: 'marketing', label: 'SEO & Content', icon: FileText }
];

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const filteredSkills = selectedCategory === 'all' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === selectedCategory);

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="py-24 relative overflow-hidden px-4 sm:px-6 lg:px-8 bg-slate-950/40"
    >
      {/* Glow highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2 drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]">
            02 / Arsenal & Capabilities
          </h3>
          <h2 className="text-white text-3xl sm:text-4xl font-bold tracking-tight">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Skills</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-600 to-cyan-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Categories Tab Bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(cat => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 border cursor-pointer ${
                  isSelected 
                    ? 'bg-gradient-to-r from-purple-600 to-cyan-500 border-transparent text-white shadow-[0_0_20px_rgba(168,85,247,0.3)] scale-105' 
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:border-purple-500/30'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map(skill => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={skill.name}
                className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-purple-500/30 hover:bg-slate-900/60 transition-all duration-300 group shadow-md"
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span className="text-slate-200 text-sm font-semibold tracking-wide group-hover:text-white transition-colors">
                      {skill.name}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-950/30 px-2 py-0.5 rounded-md border border-cyan-500/10">
                    {skill.percentage}%
                  </span>
                </div>

                {/* Glowing Progress bar */}
                <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden relative border border-slate-800/30">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.percentage}%` } : {}}
                    transition={{ duration: 1, delay: 0.1 }}
                    className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full group-hover:shadow-[0_0_8px_rgba(6,182,212,0.6)]"
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
