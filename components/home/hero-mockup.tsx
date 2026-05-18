'use client';

import { motion } from 'motion/react';
import { Calendar, CheckCircle2, MessageSquare, Sparkles, TrendingUp } from 'lucide-react';

const channels = [
  { name: 'Instagram', color: 'from-pink-500 to-purple-500', initial: 'IG' },
  { name: 'WhatsApp', color: 'from-emerald-400 to-emerald-600', initial: 'WA' },
  { name: 'TikTok', color: 'from-zinc-200 to-zinc-400', initial: 'TT' },
  { name: 'LinkedIn', color: 'from-sky-500 to-blue-600', initial: 'in' },
  { name: 'Facebook', color: 'from-blue-500 to-indigo-600', initial: 'f' },
] as const;

const inboxItems = [
  { name: 'María Hernández', channel: 'IG', preview: 'Hola, vi su nuevo producto…', time: '2m', unread: true },
  { name: 'Studio Norte', channel: 'WA', preview: '¿Pueden agendar la sesión para el…', time: '12m', unread: true },
  { name: 'Diego Aranda', channel: 'in', preview: 'Gracias por el follow up del lunes.', time: '1h' },
];

export function HeroMockup() {
  return (
    <div
      className="relative mx-auto w-full max-w-5xl"
      style={{
        perspective: '1800px',
      }}
    >
      <div
        className="relative"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateX(8deg) rotateY(-3deg)',
        }}
      >
        {/* Glow underneath */}
        <div
          aria-hidden="true"
          className="absolute inset-x-10 bottom-[-40px] h-32 rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(ellipse, rgba(168,85,247,0.45), rgba(96,165,250,0.30) 40%, transparent 70%)',
          }}
        />

        {/* Main dashboard card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] shadow-[0_50px_120px_-20px_rgba(0,0,0,0.6),0_0_60px_-20px_rgba(168,85,247,0.25)] backdrop-blur-xl"
        >
          {/* Top bar */}
          <div className="flex items-center gap-2 border-b border-white/[0.06] bg-black/40 px-4 py-3">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
            </div>
            <div className="ml-3 mono text-[10px] text-zinc-500">
              blacknel.com/inbox
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="hidden items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-[10px] text-zinc-400 sm:inline-flex">
                <span className="relative inline-flex h-1.5 w-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                live
              </span>
            </div>
          </div>

          {/* Body — 3 column dashboard */}
          <div className="grid grid-cols-12 gap-px bg-white/[0.04]">
            {/* Sidebar */}
            <div className="col-span-3 hidden flex-col gap-1 bg-[#0a0a0a] p-3 md:flex">
              <p className="px-2 pb-2 mono text-[9px] uppercase tracking-wider text-zinc-600">
                Brands
              </p>
              {['Studio Norte', 'Cafetería Nube', 'Grupo Loma', 'Aurum Capital'].map((b, i) => (
                <div
                  key={b}
                  className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] transition-colors ${
                    i === 0 ? 'bg-white/[0.06] text-white' : 'text-zinc-400'
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      i === 0 ? 'bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]' : 'bg-zinc-700'
                    }`}
                  />
                  {b}
                </div>
              ))}
              <div className="my-2 h-px bg-white/[0.05]" />
              <p className="px-2 pb-2 mono text-[9px] uppercase tracking-wider text-zinc-600">
                Channels
              </p>
              {channels.map((c) => (
                <div key={c.name} className="flex items-center gap-2 rounded-md px-2 py-1 text-[11px] text-zinc-400">
                  <span
                    className={`grid h-4 w-4 place-items-center rounded bg-gradient-to-br ${c.color} mono text-[8px] font-semibold text-black/80`}
                  >
                    {c.initial}
                  </span>
                  {c.name}
                </div>
              ))}
            </div>

            {/* Inbox list */}
            <div className="col-span-12 flex flex-col bg-[#0a0a0a] md:col-span-4">
              <div className="flex items-center justify-between border-b border-white/[0.04] px-4 py-3">
                <p className="text-xs font-medium text-white">Inbox</p>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 mono text-[9px] text-zinc-400">
                  3 new
                </span>
              </div>
              {inboxItems.map((m, i) => (
                <motion.div
                  key={m.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
                  className={`group flex cursor-pointer items-start gap-2.5 border-b border-white/[0.04] px-4 py-3 transition-colors ${
                    i === 0 ? 'bg-white/[0.03]' : 'hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="relative">
                    <div
                      aria-hidden="true"
                      className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 mono text-[10px] font-medium text-zinc-300"
                    >
                      {m.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                    </div>
                    <span
                      className={`absolute -bottom-0.5 -right-0.5 grid h-3.5 w-3.5 place-items-center rounded-full text-[7px] font-bold ${
                        m.channel === 'IG'
                          ? 'bg-gradient-to-br from-pink-500 to-purple-500 text-white'
                          : m.channel === 'WA'
                            ? 'bg-emerald-500 text-white'
                            : 'bg-sky-500 text-white'
                      }`}
                    >
                      {m.channel === 'IG' ? '◆' : m.channel === 'WA' ? '✓' : 'in'}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-[11px] font-medium text-white">{m.name}</p>
                      <span className="mono text-[9px] text-zinc-500">{m.time}</span>
                    </div>
                    <p className="truncate text-[10px] text-zinc-400">{m.preview}</p>
                  </div>
                  {m.unread && (
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.6)]" />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Conversation + AI panel */}
            <div className="col-span-12 flex flex-col bg-[#0a0a0a] md:col-span-5">
              <div className="flex items-center justify-between border-b border-white/[0.04] px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-full bg-gradient-to-br from-pink-500 to-purple-500" />
                  <div>
                    <p className="text-[11px] font-medium text-white">María Hernández</p>
                    <p className="mono text-[9px] text-zinc-500">@maria.hdz · Instagram</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-3 px-4 py-3">
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  className="max-w-[80%] rounded-2xl rounded-tl-sm border border-white/[0.06] bg-white/[0.04] px-3 py-2"
                >
                  <p className="text-[11px] leading-relaxed text-zinc-200">
                    Hola, vi su nuevo producto, ¿está disponible en CDMX?
                  </p>
                </motion.div>

                {/* AI suggestion */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.0, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="ml-auto max-w-[90%] overflow-hidden rounded-2xl rounded-br-sm border border-white/15 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-3 shadow-[0_0_40px_-10px_rgba(255,255,255,0.25)]"
                >
                  <div className="mb-1.5 flex items-center gap-1.5">
                    <Sparkles className="h-2.5 w-2.5 text-white" />
                    <span className="mono text-[9px] uppercase tracking-wider text-zinc-400">
                      AI suggestion · brand voice
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-white">
                    ¡Hola María! Sí, está disponible en nuestra tienda de Polanco y por
                    envío a todo CDMX. ¿Quieres que te comparta la liga directa? ✨
                  </p>
                  <div className="mt-2 flex gap-1.5">
                    <button className="rounded-md border border-white/10 bg-white px-2 py-0.5 mono text-[9px] font-semibold text-black">
                      Send
                    </button>
                    <button className="rounded-md border border-white/10 px-2 py-0.5 mono text-[9px] text-zinc-400">
                      Edit
                    </button>
                    <button className="rounded-md border border-white/10 px-2 py-0.5 mono text-[9px] text-zinc-400">
                      Regenerate
                    </button>
                  </div>
                </motion.div>
              </div>

              <div className="border-t border-white/[0.04] px-4 py-2">
                <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-1.5">
                  <span className="mono text-[10px] text-zinc-600">Type a reply…</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Floating stat card — top right */}
        <motion.div
          initial={{ opacity: 0, y: -12, x: 12 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -right-4 -top-6 hidden rounded-xl border border-white/10 bg-[#0a0a0a]/95 p-3 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8),0_0_30px_-10px_rgba(255,255,255,0.15)] backdrop-blur-xl md:flex md:flex-col md:gap-2"
          style={{ transform: 'translateZ(40px)' }}
        >
          <div className="flex items-center gap-2">
            <TrendingUp className="h-3 w-3 text-emerald-400" />
            <span className="mono text-[9px] uppercase tracking-wider text-zinc-500">
              response time
            </span>
          </div>
          <p className="text-2xl font-semibold tracking-tight text-white">
            -62<span className="text-emerald-400">%</span>
          </p>
          <p className="text-[10px] text-zinc-500">vs. last month</p>
        </motion.div>

        {/* Floating publish card — bottom left */}
        <motion.div
          initial={{ opacity: 0, y: 20, x: -20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -bottom-8 -left-4 hidden md:flex md:max-w-[260px] md:flex-col md:gap-2 rounded-xl border border-white/10 bg-[#0a0a0a]/95 p-3 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8),0_0_30px_-10px_rgba(96,165,250,0.25)] backdrop-blur-xl"
          style={{ transform: 'translateZ(60px)' }}
        >
          <div className="flex items-center gap-2">
            <Calendar className="h-3 w-3 text-sky-400" />
            <span className="mono text-[9px] uppercase tracking-wider text-zinc-500">
              scheduled today
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {channels.slice(0, 4).map((c) => (
              <span
                key={c.name}
                className={`grid h-5 w-5 place-items-center rounded bg-gradient-to-br ${c.color} mono text-[8px] font-semibold text-black/80 ring-1 ring-white/10`}
              >
                {c.initial}
              </span>
            ))}
            <span className="grid h-5 w-5 place-items-center rounded border border-white/10 bg-white/[0.04] mono text-[8px] text-zinc-400">
              +3
            </span>
          </div>
          <div className="flex items-center gap-1.5 rounded-md bg-white/[0.04] px-2 py-1">
            <CheckCircle2 className="h-2.5 w-2.5 text-emerald-400" />
            <span className="text-[10px] text-zinc-300">12 posts · 7 brands</span>
          </div>
        </motion.div>

        {/* Floating AI chip — middle right */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-[-12px] top-1/2 hidden -translate-y-1/2 items-center gap-2 rounded-full border border-white/15 bg-[#0a0a0a]/95 px-3 py-1.5 shadow-[0_0_24px_rgba(168,85,247,0.3)] backdrop-blur-xl md:flex"
          style={{ transform: 'translateY(-50%) translateZ(80px)' }}
        >
          <Sparkles className="h-3 w-3 text-white" />
          <span className="mono text-[10px] text-white">brand voice · 96%</span>
        </motion.div>

        {/* Mention chip — top left */}
        <motion.div
          initial={{ opacity: 0, y: -12, x: -12 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -left-6 top-12 hidden items-center gap-2 rounded-full border border-white/10 bg-[#0a0a0a]/95 px-3 py-1.5 shadow-[0_0_24px_rgba(96,165,250,0.18)] backdrop-blur-xl md:flex"
          style={{ transform: 'translateZ(60px)' }}
        >
          <MessageSquare className="h-3 w-3 text-sky-400" />
          <span className="mono text-[10px] text-zinc-300">+184 mentions / 24h</span>
        </motion.div>
      </div>
    </div>
  );
}
