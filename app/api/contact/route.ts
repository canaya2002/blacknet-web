import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { rateLimit, clientKey } from '@/lib/ratelimit';

export const runtime = 'nodejs';

const inquiryValues = [
  'demo',
  'pricing',
  'support',
  'enterprise',
  'press',
  'partnership',
  'other',
] as const;

const optionalShortString = z
  .union([z.string(), z.null(), z.undefined()])
  .transform((v) => (typeof v === 'string' ? v.trim() : ''))
  .pipe(z.string().max(160));

const ContactSchema = z.object({
  name: z.string().trim().min(2, 'name_too_short').max(120, 'name_too_long'),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email('email_invalid')
    .max(200, 'email_too_long'),
  company: z.string().trim().min(1, 'company_required').max(160, 'company_too_long'),
  // `role` and `inquiry` come from custom Select components; if the user didn't
  // pick one they arrive as empty strings. We accept that and just default.
  role: optionalShortString,
  inquiry: z
    .union([z.enum(inquiryValues), z.literal(''), z.null(), z.undefined()])
    .transform((v) => (v && inquiryValues.includes(v as (typeof inquiryValues)[number]) ? v : 'other')),
  useCase: z.string().trim().min(10, 'useCase_too_short').max(4000, 'useCase_too_long'),
  newsletter: z
    .union([z.boolean(), z.literal('true'), z.literal('false'), z.null(), z.undefined()])
    .transform((v) => v === true || v === 'true')
    .optional(),
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
    const firstIssue = parsed.error.issues[0];
    return NextResponse.json(
      {
        error: 'validation',
        field: firstIssue?.path?.[0] ?? null,
        message: firstIssue?.message ?? 'invalid_input',
        issues: parsed.error.issues,
      },
      { status: 400 },
    );
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
        subject: `Contact: ${parsed.data.name} · ${parsed.data.company} · ${parsed.data.inquiry}`,
        text:
          `Inquiry: ${parsed.data.inquiry}\n` +
          `Name: ${parsed.data.name}\n` +
          `Email: ${parsed.data.email}\n` +
          `Company: ${parsed.data.company}\n` +
          `Role: ${parsed.data.role || '(not provided)'}\n` +
          `Newsletter opt-in: ${parsed.data.newsletter ? 'true' : 'false'}\n\n` +
          `Use case:\n${parsed.data.useCase}`,
      });
    } catch (err) {
      console.error('contact resend error', err);
      return NextResponse.json({ error: 'send_failed' }, { status: 502 });
    }
  } else {
    console.warn('[contact] RESEND_API_KEY missing — accepted but not sent', parsed.data.email);
  }

  return NextResponse.json({ ok: true, inquiry: parsed.data.inquiry });
}
