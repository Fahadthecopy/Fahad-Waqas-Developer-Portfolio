/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { Star, MessageSquareQuote, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
}

const testimonialsData: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Sarah Jenkins',
    role: 'Product Director',
    company: 'NextGen Digital',
    text: "Fahad Waqas built a responsive landing page layout for us based on our Figma files. His clean code structure, attention to responsive margins, and extremely quick bug-fixing turnaround were outstanding.",
    rating: 5
  },
  {
    id: 'test-2',
    name: 'Asim Qureshi',
    role: 'Lead Developer',
    company: 'AgriTech Solutions',
    text: "Fahad possesses exceptional Laravel and database styling foundations. He customizable-designed our corporate supply portal layout, delivering fully structured routes and clean Blade templates in record time.",
    rating: 5
  },
  {
    id: 'test-3',
    name: 'Ethan Mitchell',
    role: 'Content Coordinator',
    company: 'Scribe Agency',
    text: "In addition to frontend skills, Fahad provided fantastic SEO keyword research and wrote three SEO-optimized blog publications for us. He is always eager to learn and incredibly diligent in his communication.",
    rating: 5
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  // Auto slide effect
  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % testimonialsData.length);
    }, 5000); // Change review every 5 seconds
    return () => clearInterval(interval);
  }, [isInView]);

  const handlePrev = () => {
    setActiveIndex(prev => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex(prev => (prev + 1) % testimonialsData.length);
  };

  return (
    <section 
      id="testimonials" 
      ref={containerRef}
      className="py-24 relative overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2 drop-shadow-[0_0_10px_rgba(6,182,212,0.3)]">
            07 / Client Endorsements
          </h3>
          <h2 className="text-white text-3xl sm:text-4xl font-bold tracking-tight">
            Client & Practice <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Reviews</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-600 to-cyan-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Testimonials Slider Frame */}
        <div className="relative p-8 sm:p-12 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-md shadow-2xl relative overflow-hidden min-h-[300px] flex flex-col justify-between">
          <MessageSquareQuote className="w-10 h-10 text-purple-500/30 absolute top-6 left-6" />

          {/* Testimonial Content Wrapper */}
          <div className="relative min-h-[140px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="text-center space-y-4"
              >
                {/* Stars */}
                <div className="flex justify-center space-x-1">
                  {[...Array(testimonialsData[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed italic max-w-2xl mx-auto">
                  "{testimonialsData[activeIndex].text}"
                </p>

                {/* Person details */}
                <div className="pt-2">
                  <h4 className="text-white text-sm font-bold tracking-wide">
                    {testimonialsData[activeIndex].name}
                  </h4>
                  <p className="text-cyan-400 text-xs mt-0.5">
                    {testimonialsData[activeIndex].role} &mdash; <span className="text-slate-400">{testimonialsData[activeIndex].company}</span>
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between border-t border-slate-800/60 pt-6 mt-8">
            {/* Index dots */}
            <div className="flex space-x-2">
              {testimonialsData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === idx ? 'bg-cyan-400 w-6 shadow-[0_0_8px_rgba(6,182,212,0.8)]' : 'bg-slate-700 hover:bg-slate-500'
                  }`}
                  title={`Show testimonial ${idx + 1}`}
                />
              ))}
            </div>

            {/* Slider triggers */}
            <div className="flex space-x-2">
              <button
                onClick={handlePrev}
                className="p-2 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-white transition-all duration-200 cursor-pointer hover:border-purple-500/40"
                title="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-400 hover:text-white transition-all duration-200 cursor-pointer hover:border-purple-500/40"
                title="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
