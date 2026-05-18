'use client';

import { motion } from 'motion/react';
import { Download, FileText } from 'lucide-react';
import { Logo } from '@/components/layout/logo';
import { VisualFrame } from './frame';

export function PressHeroVisual() {
  return (
    <VisualFrame glow="blue">
      <div className="relative flex flex-col gap-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]/85 backdrop-blur-xl"
        >
          <div className="grid grid-cols-2 divide-x divide-white/[0.06]">
            <div className="flex flex-col items-center justify-center gap-2 p-6">
              <Logo variant="mark" size={42} />
              <span className="mono text-[10px] uppercase tracking-wider text-zinc-500">
                Mark · dark
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 bg-white p-6">
              <Logo variant="mark" size={42} className="[&_img]:!filter-none [&_img]:!invert-0 [&_img]:!brightness-100" />
              <span className="mono text-[10px] uppercase tracking-wider text-zinc-500">
                Mark · light
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="rounded-2xl border border-white/10 bg-[#0a0a0a]/80 p-4 backdrop-blur-xl"
        >
          <p className="mono text-[10px] uppercase tracking-wider text-zinc-500">
            Brand palette
          </p>
          <div className="mt-3 grid grid-cols-5 gap-2">
            {['#0a0a0a', '#27272a', '#71717a', '#a1a1aa', '#fafafa'].map((c) => (
              <div key={c} className="flex flex-col items-center gap-1">
                <div
                  className="h-10 w-full rounded-md border border-white/[0.08]"
                  style={{ background: c }}
                />
                <span className="mono text-[9px] text-zinc-500">{c}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.a
          href="#"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="group flex items-center justify-between rounded-2xl border border-white/15 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-4 backdrop-blur-xl shadow-[0_0_40px_-12px_rgba(96,165,250,0.3)]"
        >
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 bg-white/[0.04]">
              <FileText className="h-4 w-4 text-white" />
            </span>
            <div>
              <p className="text-sm font-medium text-white">Press kit · v2</p>
              <p className="mono text-[10px] text-zinc-500">Logos · palette · guidelines</p>
            </div>
          </div>
          <Download className="h-4 w-4 text-white transition-transform group-hover:translate-y-0.5" />
        </motion.a>
      </div>
    </VisualFrame>
  );
}
