/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Bell, CheckCircle2, X, ArrowRight, Radio, ShieldCheck, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function WhatsAppChannelFloating() {
  const { currentPortraitUrl } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const primaryPhone = '923000610586';
  const secondaryPhone = '92305762253';
  
  // Direct WhatsApp Channel invite link (with fallback to direct verified contact)
  const channelJoinUrl = `https://wa.me/${primaryPhone}?text=Hi%20Fahad,%20I%20want%20to%20join%20your%20official%20WhatsApp%20Channel%20for%20website%20tips,%20SEO%20audits,%20and%20tech%20support!`;

  if (isDismissed) return null;

  return (
    <aside 
      id="whatsapp-channel-widget"
      aria-label="WhatsApp Channel Invitation"
      className="fixed bottom-5 right-5 z-40 flex flex-col items-end"
    >
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-3 w-80 sm:w-88 rounded-2xl bg-slate-950/95 backdrop-blur-xl border border-emerald-500/40 p-5 shadow-2xl shadow-emerald-950/50 text-slate-200 relative overflow-hidden"
          >
            {/* Background ambient gradient */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="relative w-11 h-11 rounded-xl overflow-hidden border-2 border-emerald-400/80 shadow-md shrink-0 bg-slate-900">
                  <img
                    src={currentPortraitUrl}
                    alt="Muhammad Fahad Waqas"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center border border-slate-950">
                    <Radio className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <h4 className="text-sm font-bold text-white leading-none">Fahad's Tech Channel</h4>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/20" />
                  </div>
                  <span className="text-[11px] text-emerald-400 font-medium block mt-1">
                    Official WhatsApp Channel
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsExpanded(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Close WhatsApp card"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content info */}
            <div className="py-3 space-y-2 text-xs text-slate-300">
              <p className="leading-relaxed">
                Join <strong className="text-white">Muhammad Fahad Waqas</strong> on WhatsApp for real-time website error breakdowns, Technical SEO updates, and direct support.
              </p>

              <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px]">
                <div className="flex items-center space-x-1 text-slate-400 bg-slate-900/80 px-2 py-1.5 rounded-lg border border-slate-800">
                  <Sparkles className="w-3 h-3 text-cyan-400 shrink-0" />
                  <span>Free SEO Audits</span>
                </div>
                <div className="flex items-center space-x-1 text-slate-400 bg-slate-900/80 px-2 py-1.5 rounded-lg border border-slate-800">
                  <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>24/7 Bug Hotline</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 pt-1 font-mono">
                Direct: <span className="text-emerald-400 font-semibold">+92 300 0610586</span> / <span className="text-slate-300">+92 305 7562253</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-1">
              <a
                href={channelJoinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-emerald-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-white/20" />
                <span>Join Official WhatsApp Channel</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <span>Free to join • Instant access</span>
                <button
                  onClick={() => setIsDismissed(true)}
                  className="text-slate-500 hover:text-slate-300 underline cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Pill */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        id="whatsapp-floating-pill"
        className="group flex items-center space-x-2.5 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-full bg-slate-950/90 hover:bg-slate-900 border border-emerald-500/50 hover:border-emerald-400 shadow-xl shadow-emerald-950/60 backdrop-blur-md transition-all duration-300 cursor-pointer"
        title="Join Fahad's WhatsApp Channel"
      >
        <div className="relative">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-emerald-400 shadow-md group-hover:scale-110 transition-transform bg-slate-900 shrink-0">
            <img 
              src={currentPortraitUrl} 
              alt="Fahad Waqas" 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-950 animate-ping" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-950" />
        </div>

        <div className="flex flex-col text-left">
          <div className="flex items-center space-x-1">
            <span className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
              WhatsApp Channel
            </span>
            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              JOIN
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-medium">
            +92 300 0610586 • Live Updates
          </span>
        </div>
      </button>
    </aside>
  );
}
