'use client';

import { motion } from 'motion/react';
import { Flag, MapPin, Quote, Target } from 'lucide-react';
import { VisualFrame } from './frame';

export function AboutHeroVisual() {
  return (
    <VisualFrame glow="purple">
      <div className="relative grid grid-cols-2 gap-3">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="col-span-2 overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]/80 p-5 backdrop-blur-xl"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="grid h-6 w-6 place-items-center rounded-md border border-white/10 bg-white/[0.04]">
                <MapPin className="h-3 w-3 text-white" />
              </span>
              <span className="mono text-[10px] uppercase tracking-wider text-zinc-500">
                Headquarters
              </span>
            </div>
            <span className="mono text-[10px] text-zinc-400">19.43°N, 99.13°W</span>
          </div>
          <p className="mt-3 text-lg font-semibold tracking-tight text-white">
            Mexico City · MX
          </p>
          <p className="text-[11px] text-zinc-400">
            Av. Insurgentes Sur 1234, Del Valle, 03100
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="rounded-xl border border-white/10 bg-[#0a0a0a]/80 p-4 backdrop-blur"
        >
          <span className="grid h-6 w-6 place-items-center rounded-md border border-white/10 bg-white/[0.04]">
            <Target className="h-3 w-3 text-white" />
          </span>
          <p className="mt-3 text-xs font-medium uppercase tracking-wider text-zinc-500 mono">
            Mission
          </p>
          <p className="mt-1 text-[12px] leading-snug text-zinc-200">
            One brain for every brand’s digital presence.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.18 }}
          className="rounded-xl border border-white/10 bg-[#0a0a0a]/80 p-4 backdrop-blur"
        >
          <span className="grid h-6 w-6 place-items-center rounded-md border border-white/10 bg-white/[0.04]">
            <Flag className="h-3 w-3 text-white" />
          </span>
          <p className="mt-3 text-xs font-medium uppercase tracking-wider text-zinc-500 mono">
            Vision · 2030
          </p>
          <p className="mt-1 text-[12px] leading-snug text-zinc-200">
            Running brands as natural as sending email.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.26 }}
          className="col-span-2 rounded-2xl border border-white/15 bg-gradient-to-br from-white/[0.08] to-white/[0.01] p-5 backdrop-blur-xl shadow-[0_0_40px_-12px_rgba(255,255,255,0.25)]"
        >
          <Quote className="h-4 w-4 text-zinc-500" />
          <p className="mt-2 text-[13px] leading-relaxed text-white">
            “We built the tool we wanted for ourselves after watching agency teams lose 30 hours
            a week to copy-paste between five platforms.”
          </p>
          <div className="mt-3 flex items-center gap-2">
            <div
              aria-hidden="true"
              className="h-7 w-7 rounded-full"
              style={{
                background:
                  'radial-gradient(circle at 30% 30%, #ffffff, #52525b 60%, #0a0a0a)',
              }}
            />
            <div>
              <p className="text-[11px] font-medium text-white">Carlos Anaya Ruiz</p>
              <p className="text-[10px] text-zinc-500">Founder & CEO</p>
            </div>
          </div>
        </motion.div>
      </div>
    </VisualFrame>
  );
}
