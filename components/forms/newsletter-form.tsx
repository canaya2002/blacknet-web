'use client';

import { useState, useTransition } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowRight, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function NewsletterForm() {
  const t = useTranslations('common.newsletter');
  const [email, setEmail] = useState('');
  const [hp, setHp] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isPending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || hp) return;
    startTransition(async () => {
      try {
        const res = await fetch('/api/newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, hp }),
        });
        if (!res.ok) throw new Error('failed');
        setStatus('success');
        setEmail('');
      } catch {
        setStatus('error');
      }
    });
  };

  if (status === 'success') {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-2.5 text-sm text-emerald-200">
        <Check className="h-4 w-4" />
        {t('success')}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2 sm:flex-row">
      <input
        type="text"
        name="company"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="sr-only"
      />
      <Input
        type="email"
        required
        placeholder={t('placeholder')}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-label={t('title')}
        className="flex-1"
      />
      <Button type="submit" disabled={isPending} variant="primary" size="md">
        {isPending ? '…' : t('cta')}
        <ArrowRight className="h-4 w-4" />
      </Button>
      {status === 'error' && (
        <span className="text-xs text-red-300" role="alert">
          {t('error')}
        </span>
      )}
    </form>
  );
}
