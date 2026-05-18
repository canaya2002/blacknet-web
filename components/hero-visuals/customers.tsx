'use client';

import { motion } from 'motion/react';
import { Quote, TrendingUp } from 'lucide-react';
import { VisualFrame } from './frame';

const metrics = [
  { value: '-62%', label: 'response time' },
  { value: '+94%', label: 'CSAT score' },
  { value: '4.6', label: 'avg rating' },
];

export function CustomersHeroVisual() {
  return (
    <VisualFrame glow="emerald">
      <div className="relative flex flex-col gap-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-5 shadow-[0_0_40px_-12px_rgba(74,222,128,0.25)] backdrop-blur-xl"
        >
          <div className="flex items-center justify-between">
            <Quote className="h-5 w-5 text-zinc-400" />
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 mono text-[9px] uppercase tracking-wider text-emerald-300">
              Studio Norte
            </span>
          </div>
          <p className="mt-3 text-[13px] leading-relaxed text-white">
            “Pasamos de gestionar 12 marcas en 4 herramientas a tener todo en Blacknel. El equipo
            recuperó 15 horas a la semana.”
          </p>
          <div className="mt-4 flex items-center gap-2 border-t border-white/[0.08] pt-3">
            <div
              aria-hidden="true"
              className="h-7 w-7 rounded-full"
              style={{
                background:
                  'radial-gradient(circle at 30% 30%, #f472b6, #831843 70%, #0a0a0a)',
              }}
            />
            <div>
              <p className="text-[11px] font-medium text-white">María Hernández</p>
              <p className="text-[10px] text-zinc-500">Founder, Studio Norte</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="grid grid-cols-3 gap-2"
        >
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
              className="rounded-xl border border-white/10 bg-[#0a0a0a]/80 p-3 backdrop-blur"
            >
              <div className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-emerald-400" />
                <span className="mono text-[9px] uppercase tracking-wider text-zinc-500">
                  {m.label}
                </span>
              </div>
              <p className="mt-1.5 text-2xl font-semibold tracking-tight text-white tabular-nums">
                {m.value}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.28 }}
          className="rounded-xl border border-white/10 bg-[#0a0a0a]/70 p-4 backdrop-blur"
        >
          <div className="flex items-center justify-between">
            <span className="mono text-[10px] uppercase tracking-wider text-zinc-500">
              48 locations · 5 countries
            </span>
            <span className="text-[10px] text-zinc-400">Grupo Loma</span>
          </div>
          <div className="mt-3 flex gap-1 h-4 items-end">
            {[18, 32, 28, 44, 38, 52, 48, 68, 60, 78, 72, 88].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-gradient-to-t from-emerald-500/30 to-emerald-400/80"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </VisualFrame>
  );
}
