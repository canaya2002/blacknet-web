type Bucket = { count: number; reset: number };
const store = new Map<string, Bucket>();

export function rateLimit(
  key: string,
  { limit = 5, windowMs = 60_000 }: { limit?: number; windowMs?: number } = {},
) {
  const now = Date.now();
  const bucket = store.get(key);
  if (!bucket || bucket.reset < now) {
    store.set(key, { count: 1, reset: now + windowMs });
    return { ok: true, remaining: limit - 1 };
  }
  bucket.count += 1;
  if (bucket.count > limit) {
    return { ok: false, retryAfterMs: bucket.reset - now };
  }
  return { ok: true, remaining: limit - bucket.count };
}

export function clientKey(req: Request, prefix: string) {
  const fwd = req.headers.get('x-forwarded-for') ?? '';
  const ip = fwd.split(',')[0]?.trim() ?? 'unknown';
  return `${prefix}:${ip}`;
}
