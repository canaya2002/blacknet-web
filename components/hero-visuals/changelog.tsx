'use client';

import { motion } from 'motion/react';
import { Sparkles, Tag } from 'lucide-react';
import { VisualFrame } from './frame';

const releases = [
  {
    version: 'v1.0',
    title: 'Open beta launch',
    date: 'Apr 15, 2026',
    accent: 'shadow-[0_0_24px_-8px_rgba(255,255,255,0.5)] border-white/30',
    badge: 'Launch',
  },
  {
    version: 'v0.9',
    title: 'Approval workflows + NPS',
    date: 'Feb 20, 2026',
    accent: 'border-white/10',
    badge: 'Features',
  },
  {
    version: 'v0.5',
    title: 'Early access',
    date: 'Nov 12, 2025',
    accent: 'border-white/10',
    badge: 'Genesis',
  },
];

export function ChangelogHeroVisual() {
  return (
    <VisualFrame glow="purple">
      <div className="relative rounded-2xl border border-white/10 bg-[#0a0a0a]/85 p-6 backdrop-blur-xl">
        <div className="relative flex flex-col gap-5">
          {/* Vertical line */}
          <div
            aria-hidden="true"
            className="absolute left-[7px] top-3 bottom-3 w-px bg-gradient-to-b from-white/40 via-white/15 to-white/0"
          />

          {releases.map((r, i) => (
            <motion.div
              key={r.version}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="relative flex items-start gap-4"
            >
              <span
                className={`relative z-10 grid h-3.5 w-3.5 mt-1 shrink-0 place-items-center rounded-full border bg-[#0a0a0a] ${r.accent}`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="mono text-xs font-medium text-white">{r.version}</span>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 mono text-[9px] uppercase tracking-wider text-zinc-300">
                    {r.badge}
                  </span>
                  {i === 0 && (
                    <Sparkles className="h-3 w-3 text-white" />
                  )}
                </div>
                <p className="mt-1 text-sm font-medium text-white">{r.title}</p>
                <p className="mono text-[10px] text-zinc-500">{r.date}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4"
        >
          <span className="inline-flex items-center gap-1.5 mono text-[10px] uppercase tracking-wider text-zinc-500">
            <Tag className="h-2.5 w-2.5" />
            3 releases · weekly cadence
          </span>
          <span className="rounded-md border border-white/15 bg-white/[0.04] px-2 py-0.5 mono text-[10px] text-white">
            v1.0
          </span>
        </motion.div>
      </div>
    </VisualFrame>
  );
}
