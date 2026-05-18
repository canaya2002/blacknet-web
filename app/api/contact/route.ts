import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { rateLimit, clientKey } from '@/lib/ratelimit';

export const runtime = 'nodejs';

const ContactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().toLowerCase().email().max(200),
  company: z.string().trim().min(1).max(160),
  role: z.string().trim().min(1).max(80),
  useCase: z.string().trim().min(10).max(4000),
  newsletter: z.union([z.boolean(), z.literal('true'), z.literal('false')]).optional(),
  company_url: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const rl = rateLimit(clientKey(req, 'contact'), { limit: 3, windowMs: 60_000 });
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

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'validation', issues: parsed.error.issues }, { status: 400 });
  }

  if (parsed.data.company_url && parsed.data.company_url.trim().length > 0) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    try {
      const { Resend } = await import('resend');
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: 'Blacknel <noreply@blacknel.com>',
        to: ['sales@blacknel.com'],
        replyTo: parsed.data.email,
        subject: `Contact: ${parsed.data.name} · ${parsed.data.company}`,
        text:
          `Name: ${parsed.data.name}\n` +
          `Email: ${parsed.data.email}\n` +
          `Company: ${parsed.data.company}\n` +
          `Role: ${parsed.data.role}\n` +
          `Newsletter opt-in: ${parsed.data.newsletter ?? 'false'}\n\n` +
          `Use case:\n${parsed.data.useCase}`,
      });
    } catch (err) {
      console.error('contact resend error', err);
      return NextResponse.json({ error: 'send_failed' }, { status: 502 });
    }
  } else {
    console.warn('[contact] RESEND_API_KEY missing — accepted but not sent', parsed.data.email);
  }

  return NextResponse.json({ ok: true });
}
