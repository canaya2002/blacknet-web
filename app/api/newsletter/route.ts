import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { rateLimit, clientKey } from '@/lib/ratelimit';

export const runtime = 'nodejs';

const NewsletterSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(200),
  hp: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const rl = rateLimit(clientKey(req, 'newsletter'), { limit: 5, windowMs: 60_000 });
  if (!rl.ok) {
    return NextResponse.json(
      { error: 'rate_limited' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil((rl.retryAfterMs ?? 0) / 1000)) } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const parsed = NewsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'validation' }, { status: 400 });
  }

  if (parsed.data.hp && parsed.data.hp.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.NEWSLETTER_AUDIENCE_ID;
  if (apiKey && audienceId) {
    try {
      const { Resend } = await import('resend');
      const resend = new Resend(apiKey);
      await resend.contacts.create({
        email: parsed.data.email,
        unsubscribed: false,
        audienceId,
      });
    } catch (err) {
      console.error('newsletter resend error', err);
      return NextResponse.json({ error: 'subscribe_failed' }, { status: 502 });
    }
  } else {
    console.warn('[newsletter] missing RESEND_API_KEY or NEWSLETTER_AUDIENCE_ID', parsed.data.email);
  }

  return NextResponse.json({ ok: true });
}
