import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get('title') ?? 'Blacknel').slice(0, 120);
  const subtitle = (searchParams.get('subtitle') ?? 'AI-native digital presence').slice(0, 160);

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background:
            'radial-gradient(at 20% 30%, rgba(168,85,247,0.25) 0px, transparent 50%), radial-gradient(at 80% 70%, rgba(96,165,250,0.20) 0px, transparent 50%), #0a0a0a',
          fontFamily: 'Inter, sans-serif',
          color: '#fafafa',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: 'radial-gradient(circle at 30% 30%, #ffffff 0%, #52525b 55%, #0a0a0a 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 999,
                background: '#fff',
                boxShadow: '0 0 16px rgba(255,255,255,0.9)',
              }}
            />
          </div>
          <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: -0.5 }}>Blacknel</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontSize: 72,
              lineHeight: 1.05,
              letterSpacing: -2,
              fontWeight: 600,
              background: 'linear-gradient(135deg, #ffffff 0%, #a1a1aa 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              maxWidth: 1040,
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 26, color: '#a1a1aa', maxWidth: 980 }}>{subtitle}</div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#71717a',
            fontSize: 18,
            fontFamily: 'monospace',
          }}
        >
          <span>blacknel.com</span>
          <span>AI-native presence</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
