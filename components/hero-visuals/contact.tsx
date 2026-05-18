'use client';

import { motion } from 'motion/react';
import { CalendarClock, Mail, MapPin, MessageCircle } from 'lucide-react';
import { VisualFrame } from './frame';

const channels = [
  { Icon: Mail, label: 'Sales', value: 'sales@blacknel.com', accent: 'bg-purple-500/15 text-purple-300' },
  { Icon: MessageCircle, label: 'Support', value: 'support@blacknel.com', accent: 'bg-sky-500/15 text-sky-300' },
  { Icon: MapPin, label: 'HQ', value: 'CDMX, Mexico', accent: 'bg-emerald-500/15 text-emerald-300' },
];

export function ContactHeroVisual() {
  return (
    <VisualFrame glow="blue">
      <div className="relative flex flex-col gap-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]/85 backdrop-blur-xl"
        >
          <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-2.5">
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            <span className="mono text-[10px] uppercase tracking-wider text-zinc-400">
              new message
            </span>
            <span className="ml-auto mono text-[10px] text-zinc-500">2m ago</span>
          </div>
          <div className="px-4 py-3">
            <p className="text-[11px] text-zinc-500">From: maria@studionorte.mx</p>
            <p className="mt-1 text-sm font-medium text-white">
              Demo for 12 brands — Wednesday?
            </p>
            <p className="mt-1 text-[11px] text-zinc-400 line-clamp-2">
              Hi team, we’re evaluating Blacknel for our agency. We run 12 client brands and would
              love to see…
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-[#0a0a0a]/80 p-4 backdrop-blur-xl"
        >
          {channels.map((c, i) => {
            const Icon = c.Icon;
            return (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.16 + i * 0.06 }}
                className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2"
              >
                <span className={`grid h-7 w-7 place-items-center rounded-md ${c.accent}`}>
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <div className="flex-1">
                  <p className="mono text-[9px] uppercase tracking-wider text-zinc-500">
                    {c.label}
                  </p>
                  <p className="text-[12px] text-white">{c.value}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-4 shadow-[0_0_40px_-12px_rgba(96,165,250,0.3)] backdrop-blur-xl"
        >
          <div className="flex items-center gap-2">
            <CalendarClock className="h-3.5 w-3.5 text-sky-300" />
            <span className="mono text-[10px] uppercase tracking-wider text-zinc-400">
              live demo · 30 min
            </span>
          </div>
          <p className="mt-2 text-sm font-medium text-white">Book directly with our team</p>
          <p className="text-[11px] text-zinc-400">No SDR call. Founders run early demos.</p>
        </motion.div>
      </div>
    </VisualFrame>
  );
}
