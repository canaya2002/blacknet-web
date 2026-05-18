'use client';

import { motion } from 'motion/react';
import { BookOpen, Terminal } from 'lucide-react';
import { VisualFrame } from './frame';

export function DocsHeroVisual() {
  return (
    <VisualFrame glow="blue">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]/85 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl">
        <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-red-500/70" />
            <span className="h-2 w-2 rounded-full bg-amber-500/70" />
            <span className="h-2 w-2 rounded-full bg-emerald-500/70" />
          </div>
          <Terminal className="ml-2 h-3 w-3 text-zinc-500" />
          <span className="mono text-[10px] text-zinc-500">curl · v1</span>
          <span className="ml-auto rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 mono text-[9px] uppercase tracking-wider text-emerald-300">
            soon
          </span>
        </div>
        <div className="p-5">
          <motion.pre
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mono text-[11px] leading-relaxed text-zinc-300"
          >
            <span className="text-zinc-500"># Send a unified inbox message</span>
            {'\n'}
            <span className="text-pink-300">curl</span>{' '}
            <span className="text-zinc-200">-X POST</span>{' '}
            <span className="text-sky-300">https://api.blacknel.com/v1/inbox/messages</span>
            {'\n  '}
            <span className="text-zinc-200">-H</span>{' '}
            <span className="text-emerald-300">&quot;Authorization: Bearer $BLACKNEL_KEY&quot;</span>
            {'\n  '}
            <span className="text-zinc-200">-H</span>{' '}
            <span className="text-emerald-300">&quot;Content-Type: application/json&quot;</span>
            {'\n  '}
            <span className="text-zinc-200">-d</span>{' '}
            <span className="text-emerald-300">{`'{`}</span>
            {'\n    '}
            <span className="text-purple-300">&quot;brand_id&quot;</span>
            <span className="text-zinc-400">:</span>{' '}
            <span className="text-emerald-300">&quot;br_2x4f...&quot;</span>,
            {'\n    '}
            <span className="text-purple-300">&quot;channel&quot;</span>
            <span className="text-zinc-400">:</span>{' '}
            <span className="text-emerald-300">&quot;whatsapp&quot;</span>,
            {'\n    '}
            <span className="text-purple-300">&quot;to&quot;</span>
            <span className="text-zinc-400">:</span>{' '}
            <span className="text-emerald-300">&quot;+52155...&quot;</span>,
            {'\n    '}
            <span className="text-purple-300">&quot;body&quot;</span>
            <span className="text-zinc-400">:</span>{' '}
            <span className="text-emerald-300">&quot;Hi María, your order is ready 📦&quot;</span>
            {'\n  '}
            <span className="text-emerald-300">{`}'`}</span>
          </motion.pre>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.2 }}
        className="mt-3 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0a0a0a]/70 p-4 backdrop-blur-xl"
      >
        <span className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 bg-white/[0.04]">
          <BookOpen className="h-4 w-4 text-white" />
        </span>
        <div className="flex-1">
          <p className="text-sm font-medium text-white">REST + Webhooks + SDK</p>
          <p className="mono text-[10px] text-zinc-500">
            TypeScript · Python · cURL · Postman
          </p>
        </div>
        <span className="rounded-md border border-white/15 bg-white/[0.04] px-2.5 py-1 mono text-[10px] text-white">
          Q4 2026
        </span>
      </motion.div>
    </VisualFrame>
  );
}
