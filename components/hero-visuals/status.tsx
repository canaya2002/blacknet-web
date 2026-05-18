'use client';

import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { VisualFrame } from './frame';

const services = ['API', 'Web app', 'Publishing', 'Inbox', 'AI gateway', 'Auth'];

export function StatusHeroVisual() {
  return (
    <VisualFrame glow="emerald">
      <div className="relative rounded-2xl border border-white/10 bg-[#0a0a0a]/85 p-5 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-sm font-medium text-white">All systems operational</span>
          </div>
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 mono text-[10px] uppercase tracking-wider text-emerald-300">
            99.95%
          </span>
        </div>

        <div className="mt-5 flex flex-col gap-3">
          {services.map((s, idx) => (
            <motion.div
              key={s}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                  <span className="text-[11px] text-zinc-200">{s}</span>
                </div>
                <span className="mono text-[9px] text-zinc-500">100%</span>
              </div>
              <div className="flex gap-[2px]">
                {Array.from({ length: 45 }).map((_, i) => {
                  const incident = (idx === 2 && i === 11) || (idx === 4 && i === 30);
                  return (
                    <span
                      key={i}
                      className={`h-3 flex-1 rounded-[1px] ${incident ? 'bg-amber-400/70' : 'bg-emerald-400/70'}`}
                    />
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-3">
          <span className="mono text-[10px] uppercase tracking-wider text-zinc-500">
            last 90 days
          </span>
          <span className="mono text-[10px] text-zinc-400">2 incidents · 0 outages</span>
        </div>
      </div>
    </VisualFrame>
  );
}
