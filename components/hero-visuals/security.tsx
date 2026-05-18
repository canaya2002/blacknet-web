'use client';

import { motion } from 'motion/react';
import { CheckCircle2, Fingerprint, Lock, ShieldCheck } from 'lucide-react';
import { VisualFrame } from './frame';

const compliance = [
  { label: 'GDPR', region: 'EU' },
  { label: 'LFPDPPP', region: 'MX' },
  { label: 'CCPA', region: 'US-CA' },
  { label: 'SOC 2', region: 'in progress' },
];

export function SecurityHeroVisual() {
  return (
    <VisualFrame glow="emerald">
      <div className="relative flex flex-col gap-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]/85 p-5 backdrop-blur-xl"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full blur-3xl"
            style={{
              background:
                'radial-gradient(circle, rgba(74,222,128,0.30), transparent 70%)',
            }}
          />
          <div className="relative flex items-center gap-3">
            <div className="relative grid h-14 w-14 place-items-center rounded-2xl border border-white/15 bg-gradient-to-br from-white/[0.10] to-white/[0.02]">
              <ShieldCheck className="h-7 w-7 text-emerald-300" />
              <span className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full border border-[#0a0a0a] bg-emerald-500 text-[8px] font-bold text-black">
                ✓
              </span>
            </div>
            <div>
              <p className="text-base font-semibold text-white">All systems secured</p>
              <p className="mono text-[10px] uppercase tracking-wider text-zinc-500">
                AES-256 · TLS 1.3 · RLS
              </p>
            </div>
          </div>

          <div className="relative mt-5 grid grid-cols-2 gap-2">
            <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
              <Lock className="h-3.5 w-3.5 text-zinc-400" />
              <p className="mt-2 text-[11px] font-medium text-white">Encryption at rest</p>
              <p className="mono text-[9px] text-zinc-500">AES-256</p>
            </div>
            <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
              <Fingerprint className="h-3.5 w-3.5 text-zinc-400" />
              <p className="mt-2 text-[11px] font-medium text-white">Multi-tenant RLS</p>
              <p className="mono text-[9px] text-zinc-500">Row-Level Security</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="rounded-2xl border border-white/10 bg-[#0a0a0a]/80 p-4 backdrop-blur"
        >
          <p className="mono text-[10px] uppercase tracking-wider text-zinc-500">
            Compliance
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {compliance.map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.25 + i * 0.06 }}
                className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2"
              >
                <CheckCircle2
                  className={`h-3.5 w-3.5 ${c.region === 'in progress' ? 'text-amber-400' : 'text-emerald-400'}`}
                />
                <div>
                  <p className="text-[11px] font-medium text-white">{c.label}</p>
                  <p className="mono text-[9px] text-zinc-500">{c.region}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </VisualFrame>
  );
}
