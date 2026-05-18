'use client';

import { motion } from 'motion/react';
import { FileText, Globe2, ShieldCheck } from 'lucide-react';
import { VisualFrame } from './frame';

const regulations = [
  { label: 'GDPR · EU', icon: Globe2 },
  { label: 'LFPDPPP · MX', icon: Globe2 },
  { label: 'CCPA · US-CA', icon: Globe2 },
];

export function LegalHeroVisual({
  title = 'Privacy Policy',
  meta = 'Effective Jan 1, 2026',
  glow = 'blue' as 'blue' | 'purple',
}: {
  title?: string;
  meta?: string;
  glow?: 'blue' | 'purple';
}) {
  return (
    <VisualFrame glow={glow}>
      <div className="relative flex flex-col gap-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]/85 p-5 backdrop-blur-xl"
        >
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-white/[0.04]">
              <FileText className="h-4 w-4 text-white" />
            </span>
            <div>
              <p className="text-sm font-semibold text-white">{title}</p>
              <p className="mono text-[10px] uppercase tracking-wider text-zinc-500">{meta}</p>
            </div>
          </div>

          <div className="mt-5 space-y-1.5">
            {[
              { w: '78%' },
              { w: '92%' },
              { w: '64%' },
              { w: '88%' },
              { w: '54%' },
              { w: '70%' },
            ].map((line, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="mono text-[9px] text-zinc-600">{String(i + 1).padStart(2, '0')}</span>
                <div className="h-1.5 flex-1 rounded-full bg-white/[0.06]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: line.w }}
                    transition={{ duration: 0.7, delay: 0.2 + i * 0.06 }}
                    className="h-full rounded-full bg-gradient-to-r from-white/40 to-white/10"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18 }}
          className="rounded-2xl border border-white/10 bg-[#0a0a0a]/80 p-4 backdrop-blur"
        >
          <p className="mono text-[10px] uppercase tracking-wider text-zinc-500">
            Compliant with
          </p>
          <div className="mt-3 flex flex-col gap-2">
            {regulations.map((r) => {
              const Icon = r.icon;
              return (
                <div
                  key={r.label}
                  className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2"
                >
                  <Icon className="h-3 w-3 text-zinc-400" />
                  <span className="text-[11px] text-white">{r.label}</span>
                  <ShieldCheck className="ml-auto h-3 w-3 text-emerald-400" />
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </VisualFrame>
  );
}
