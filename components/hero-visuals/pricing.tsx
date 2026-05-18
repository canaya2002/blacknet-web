'use client';

import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { VisualFrame } from './frame';

const tiers = [
  {
    name: 'Standard',
    price: '69',
    features: ['3 brands', '5 accounts', '1 user'],
    highlight: false,
  },
  {
    name: 'Growth',
    price: '299',
    features: ['10 brands', '25 accounts', '5 users', 'AI · unlimited'],
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: '1,099',
    features: ['Unlimited', 'SSO + audit log', 'White label'],
    highlight: false,
  },
];

export function PricingHeroVisual() {
  return (
    <VisualFrame glow="blue">
      <div className="relative flex flex-col gap-3 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-4 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl">
        {tiers.map((tier, i) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: i * 0.1 }}
            className={`relative overflow-hidden rounded-xl border p-4 backdrop-blur ${
              tier.highlight
                ? 'border-white/25 bg-gradient-to-br from-white/[0.10] to-white/[0.02] shadow-[0_0_40px_-12px_rgba(255,255,255,0.3)]'
                : 'border-white/10 bg-[#0a0a0a]/80'
            }`}
          >
            {tier.highlight && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-0 w-24"
                style={{
                  background:
                    'radial-gradient(circle at right, rgba(255,255,255,0.18), transparent 70%)',
                }}
              />
            )}
            <div className="relative flex items-center justify-between gap-3">
              <div>
                <p className="mono text-[10px] uppercase tracking-wider text-zinc-500">
                  {tier.name}
                </p>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-2xl font-semibold tracking-tight text-white">
                    ${tier.price}
                  </span>
                  <span className="mono text-[10px] text-zinc-500">/mo</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                {tier.features.slice(0, 2).map((f) => (
                  <div key={f} className="flex items-center gap-1.5">
                    <Check className="h-3 w-3 text-emerald-400/80" />
                    <span className="text-[11px] text-zinc-300">{f}</span>
                  </div>
                ))}
              </div>
            </div>
            {tier.highlight && (
              <div className="relative mt-3 flex items-center justify-between border-t border-white/[0.06] pt-3">
                <span className="rounded-full border border-white/15 bg-white/10 px-2 py-0.5 mono text-[9px] uppercase tracking-wider text-white">
                  Most popular
                </span>
                <span className="mono text-[10px] text-zinc-400">14-day trial</span>
              </div>
            )}
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-between rounded-xl border border-white/10 bg-[#0a0a0a]/70 px-4 py-3"
        >
          <span className="mono text-[10px] uppercase tracking-wider text-zinc-500">
            no credit card · cancel anytime
          </span>
          <span className="text-[11px] text-emerald-300/90">USD</span>
        </motion.div>
      </div>
    </VisualFrame>
  );
}
