'use client';

import { motion } from 'motion/react';
import { ArrowUpRight, Bookmark, Calendar } from 'lucide-react';
import { VisualFrame } from './frame';

const cards = [
  {
    tag: 'AI',
    title: 'How AI is reshaping social media',
    desc: 'Generative AI moved from gimmick to default. Field report from 40 pilot accounts.',
    date: 'Apr 22 · 8 min',
    accent: 'from-purple-500/20 to-blue-500/0',
  },
  {
    tag: 'Agencies',
    title: '5 mistakes agencies make running brands',
    desc: 'After auditing 40 agencies, the same patterns kill growth past 12 clients.',
    date: 'Mar 14 · 7 min',
    accent: 'from-pink-500/20 to-amber-500/0',
  },
  {
    tag: 'Reputation',
    title: 'The case for unified reputation',
    desc: 'Reviews live on 8 surfaces now. Brands that win run them from one panel.',
    date: 'Feb 08 · 5 min',
    accent: 'from-emerald-500/20 to-sky-500/0',
  },
];

export function BlogHeroVisual() {
  return (
    <VisualFrame glow="pink">
      <div className="relative flex flex-col gap-3">
        {cards.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: i * 0.08 }}
            className="group relative overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a]/85 p-4 backdrop-blur-xl"
            style={{
              transform: i === 0 ? undefined : `translateX(${i * 6}px)`,
            }}
          >
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br ${c.accent} blur-3xl`}
            />
            <div className="relative flex items-start gap-3">
              <div
                aria-hidden="true"
                className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-lg border border-white/10 bg-[#0a0a0a]"
                style={{
                  background: `linear-gradient(135deg, ${c.accent.includes('purple') ? 'rgba(168,85,247,0.35)' : c.accent.includes('pink') ? 'rgba(244,114,182,0.35)' : 'rgba(74,222,128,0.35)'}, rgba(0,0,0,0.6))`,
                }}
              >
                <Bookmark className="h-5 w-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 mono text-[9px] uppercase tracking-wider text-zinc-300">
                    {c.tag}
                  </span>
                  <span className="mono text-[9px] text-zinc-500 inline-flex items-center gap-1">
                    <Calendar className="h-2.5 w-2.5" />
                    {c.date}
                  </span>
                </div>
                <p className="mt-1.5 truncate text-sm font-semibold text-white">{c.title}</p>
                <p className="mt-0.5 text-[11px] text-zinc-400 line-clamp-2">{c.desc}</p>
              </div>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-zinc-500" />
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-between rounded-xl border border-white/10 bg-[#0a0a0a]/70 px-4 py-2.5"
        >
          <span className="mono text-[10px] uppercase tracking-wider text-zinc-500">
            3 posts · weekly cadence
          </span>
          <span className="text-[11px] text-zinc-400">→ Read all</span>
        </motion.div>
      </div>
    </VisualFrame>
  );
}
