'use client';

import { motion } from 'motion/react';
import {
  Bot,
  Calendar,
  Inbox,
  LineChart,
  Megaphone,
  MessageSquareHeart,
  Radar,
  Sparkles,
} from 'lucide-react';
import { VisualFrame } from './frame';

const tiles = [
  { Icon: Inbox, label: 'Inbox', color: 'from-sky-500/30 to-sky-500/0' },
  { Icon: Calendar, label: 'Publishing', color: 'from-purple-500/30 to-purple-500/0' },
  { Icon: MessageSquareHeart, label: 'Reviews', color: 'from-pink-500/30 to-pink-500/0' },
  { Icon: Bot, label: 'AI', color: 'from-emerald-500/30 to-emerald-500/0' },
  { Icon: Megaphone, label: 'Ads', color: 'from-amber-500/30 to-amber-500/0' },
  { Icon: LineChart, label: 'Analytics', color: 'from-indigo-500/30 to-indigo-500/0' },
  { Icon: Radar, label: 'Listening', color: 'from-rose-500/30 to-rose-500/0' },
];

export function FeaturesHeroVisual() {
  return (
    <VisualFrame glow="purple">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl">
        <div className="grid grid-cols-3 gap-3">
          {tiles.map((t, i) => {
            const Icon = t.Icon;
            const wide = i === 0;
            return (
              <motion.div
                key={t.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className={`relative overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a]/80 p-4 backdrop-blur ${wide ? 'col-span-2 row-span-1' : ''}`}
              >
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full bg-gradient-to-br ${t.color} blur-2xl`}
                />
                <Icon className="h-5 w-5 text-white" />
                <p className="mt-3 text-sm font-medium text-white">{t.label}</p>
                <p className="mono text-[10px] uppercase tracking-wider text-zinc-500">
                  Module · live
                </p>
              </motion.div>
            );
          })}

          {/* Final highlight tile */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 7 * 0.07 }}
            className="relative col-span-2 overflow-hidden rounded-xl border border-white/15 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-4 shadow-[0_0_40px_-10px_rgba(255,255,255,0.25)]"
          >
            <Sparkles className="h-5 w-5 text-white" />
            <p className="mt-3 text-sm font-semibold text-white">One control plane</p>
            <p className="text-[11px] text-zinc-300">All modules · all brands · one team</p>
          </motion.div>
        </div>

        {/* Floating active count chip */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pointer-events-none absolute -right-3 top-4 hidden flex-col gap-1 rounded-xl border border-white/10 bg-[#0a0a0a]/95 px-3 py-2 backdrop-blur-xl md:flex"
          style={{ boxShadow: '0 0 30px -10px rgba(168,85,247,0.4)' }}
        >
          <span className="mono text-[9px] uppercase tracking-wider text-zinc-500">
            modules active
          </span>
          <span className="mono text-xl tabular-nums text-white">7 / 7</span>
        </motion.div>
      </div>
    </VisualFrame>
  );
}
