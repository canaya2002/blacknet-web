'use client';

import { motion } from 'motion/react';
import {
  InstagramLogo,
  WhatsAppLogo,
  LinkedInLogo,
  TikTokLogo,
  XLogo,
  YouTubeLogo,
  GoogleBusinessLogo,
  SlackLogo,
  HubSpotLogo,
  MessengerLogo,
  TrustpilotLogo,
  GoogleAdsLogo,
} from './logos';
import { Logo } from '@/components/layout/logo';

const orbitItems = [
  { Component: InstagramLogo, angle: -90 },
  { Component: WhatsAppLogo, angle: -45 },
  { Component: LinkedInLogo, angle: 0 },
  { Component: TikTokLogo, angle: 45 },
  { Component: XLogo, angle: 90 },
  { Component: YouTubeLogo, angle: 135 },
  { Component: GoogleBusinessLogo, angle: 180 },
  { Component: HubSpotLogo, angle: 225 },
];

const outerOrbit = [
  { Component: SlackLogo, angle: -60 },
  { Component: MessengerLogo, angle: 30 },
  { Component: TrustpilotLogo, angle: 120 },
  { Component: GoogleAdsLogo, angle: 210 },
];

export function NetworkVisual() {
  return (
    <div className="relative mx-auto aspect-square h-[420px] w-[420px] md:h-[540px] md:w-[540px]">
      {/* Concentric rings */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full border border-white/[0.06]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-[12%] rounded-full border border-white/[0.06]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-[28%] rounded-full border border-white/[0.08]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-[40%] rounded-full border border-white/[0.10]"
      />

      {/* Sweep beam */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full opacity-40"
        style={{
          background:
            'conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.18) 30deg, transparent 60deg)',
          animation: 'orbit-sweep 8s linear infinite',
          maskImage:
            'radial-gradient(circle, transparent 30%, black 35%, black 50%, transparent 55%)',
        }}
      />

      <style>{`
        @keyframes orbit-sweep {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Center Blacknel logo */}
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <div
          className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-white/15 bg-[color:var(--color-bg-secondary)] backdrop-blur"
          style={{
            boxShadow:
              '0 0 80px rgba(255,255,255,0.25), 0 0 0 1px rgba(255,255,255,0.08) inset',
          }}
        >
          <div aria-hidden="true" className="absolute inset-2 rounded-xl bg-black/40 backdrop-blur-sm" />
          <Logo className="relative scale-150" />
        </div>
      </div>

      {/* Inner orbit logos */}
      {orbitItems.map((item, i) => {
        const radius = 38;
        const rad = (item.angle * Math.PI) / 180;
        const x = 50 + radius * Math.cos(rad);
        const y = 50 + radius * Math.sin(rad);
        const Comp = item.Component;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
            className="absolute"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 4 + (i % 3),
                repeat: Infinity,
                delay: i * 0.2,
              }}
              className="relative rounded-xl border border-white/10 bg-[#0a0a0a]/90 p-1.5 backdrop-blur-xl"
              style={{
                boxShadow:
                  '0 10px 30px -10px rgba(0,0,0,0.8), 0 0 24px -8px rgba(255,255,255,0.15)',
              }}
            >
              <Comp className="h-10 w-10" />
            </motion.div>
          </motion.div>
        );
      })}

      {/* Outer orbit logos — smaller */}
      {outerOrbit.map((item, i) => {
        const radius = 48;
        const rad = (item.angle * Math.PI) / 180;
        const x = 50 + radius * Math.cos(rad);
        const y = 50 + radius * Math.sin(rad);
        const Comp = item.Component;
        return (
          <motion.div
            key={`outer-${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 0.8, delay: 0.8 + 0.1 * i }}
            className="absolute"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="rounded-lg border border-white/[0.08] bg-[#0a0a0a]/70 p-1 backdrop-blur">
              <Comp className="h-7 w-7 opacity-80" />
            </div>
          </motion.div>
        );
      })}

      {/* Connection lines SVG */}
      <svg
        className="absolute inset-0 h-full w-full -z-0"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="line-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>
        {orbitItems.map((item, i) => {
          const radius = 38;
          const rad = (item.angle * Math.PI) / 180;
          const x = 50 + radius * Math.cos(rad);
          const y = 50 + radius * Math.sin(rad);
          return (
            <motion.line
              key={i}
              x1={50}
              y1={50}
              x2={x}
              y2={y}
              stroke="url(#line-grad)"
              strokeWidth="0.15"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 0.8, delay: 0.1 * i }}
            />
          );
        })}
      </svg>

      {/* Soft glow background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(168,85,247,0.18), rgba(96,165,250,0.12) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
    </div>
  );
}
