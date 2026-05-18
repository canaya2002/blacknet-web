'use client';

import { motion } from 'motion/react';
import { Briefcase, MapPin, Sparkles } from 'lucide-react';
import { VisualFrame } from './frame';

const roles = [
  {
    title: 'Senior Full Stack Engineer',
    location: 'Remote · LATAM',
    badge: 'Engineering',
    accent: 'from-purple-500/20 to-purple-500/0',
  },
  {
    title: 'Product Designer',
    location: 'Remote · LATAM',
    badge: 'Design',
    accent: 'from-pink-500/20 to-pink-500/0',
  },
  {
    title: 'Customer Success Manager',
    location: 'CDMX · Hybrid',
    badge: 'CS',
    accent: 'from-emerald-500/20 to-emerald-500/0',
  },
];

export function CareersHeroVisual() {
  return (
    <VisualFrame glow="purple">
      <div className="relative flex flex-col gap-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="flex items-center justify-between rounded-2xl border border-white/15 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-4 shadow-[0_0_40px_-12px_rgba(168,85,247,0.3)] backdrop-blur-xl"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="h-4 w-4 text-white" />
            <div>
              <p className="text-sm font-semibold text-white">3 open roles</p>
              <p className="mono text-[10px] uppercase tracking-wider text-zinc-400">
                Hiring across LATAM
              </p>
            </div>
          </div>
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 mono text-[9px] uppercase tracking-wider text-emerald-300">
            Active
          </span>
        </motion.div>

        {roles.map((role, i) => (
          <motion.div
            key={role.title}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
            className="group relative overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a]/85 p-4 backdrop-blur-xl"
          >
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br ${role.accent} blur-3xl`}
            />
            <div className="relative flex items-center justify-between">
              <div>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 mono text-[9px] uppercase tracking-wider text-zinc-300">
                  {role.badge}
                </span>
                <p className="mt-2 text-sm font-medium text-white">{role.title}</p>
                <div className="mt-1 flex items-center gap-3 text-[11px] text-zinc-500">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-2.5 w-2.5" />
                    {role.location}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Briefcase className="h-2.5 w-2.5" />
                    Full-time
                  </span>
                </div>
              </div>
              <span className="rounded-md border border-white/15 bg-white/[0.04] px-2.5 py-1 mono text-[10px] text-white">
                Apply →
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </VisualFrame>
  );
}
