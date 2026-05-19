'use client';

import { useState, useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Check, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { pickLocale, trackEvent } from '@/lib/analytics';
import type { ContactRole, InquiryType } from '@/types/analytics';

type InquiryKey = InquiryType;
const inquiries: InquiryKey[] = ['demo', 'pricing', 'support', 'enterprise', 'press', 'partnership', 'other'];
const roleValues: readonly ContactRole[] = ['founder', 'marketing', 'ops', 'agency', 'other'];

function normalizeRole(value: string): ContactRole {
  return (roleValues as readonly string[]).includes(value) ? (value as ContactRole) : 'other';
}

export function ContactForm({
  onInquiryChange,
}: {
  onInquiryChange?: (value: InquiryKey | '') => void;
}) {
  const t = useTranslations('contact.form');
  const locale = pickLocale(useLocale());
  const [hp, setHp] = useState('');
  const [inquiry, setInquiry] = useState<InquiryKey | ''>('');
  const [role, setRole] = useState<string>('');
  const [newsletter, setNewsletter] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleInquiryChange = (value: string) => {
    const next = value as InquiryKey;
    setInquiry(next);
    onInquiryChange?.(next);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (hp) return;
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries()) as Record<string, unknown>;
    payload.newsletter = newsletter;
    payload.role = role;
    payload.inquiry = inquiry || 'other';

    startTransition(async () => {
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          setStatus('success');
          setErrorMessage(null);
          trackEvent('contact_form_submitted', {
            inquiry_type: (inquiry || 'other') as InquiryType,
            role: normalizeRole(role),
            locale,
          });
          return;
        }

        let reason: 'validation' | 'server_error' | 'rate_limit' = 'server_error';
        let field = '';
        if (res.status === 429) reason = 'rate_limit';
        else if (res.status === 400) reason = 'validation';

        try {
          const data = (await res.json()) as { field?: string; message?: string };
          if (data?.field) field = String(data.field);
          if (data?.message) setErrorMessage(data.message);
        } catch {
          // ignore JSON parse failure
        }

        trackEvent('contact_form_failed', { reason, field, locale });
        setStatus('error');
      } catch {
        trackEvent('contact_form_failed', { reason: 'network', field: '', locale });
        setStatus('error');
      }
    });
  };

  if (status === 'success') {
    return (
      <div className="flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-5 text-emerald-200">
        <Check className="mt-0.5 h-5 w-5" />
        <div>
          <p className="font-medium">{t('success')}</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
      <input
        type="text"
        name="company_url"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="sr-only"
      />

      <div className="flex flex-col gap-2">
        <Label htmlFor="inquiry">{t('inquiryLabel')}</Label>
        <Select value={inquiry} onValueChange={handleInquiryChange}>
          <SelectTrigger id="inquiry">
            <SelectValue placeholder={t('inquiryPlaceholder')} />
          </SelectTrigger>
          <SelectContent>
            {inquiries.map((key) => (
              <SelectItem key={key} value={key}>
                {t(`inquiries.${key}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">{t('name')}</Label>
          <Input
            id="name"
            name="name"
            required
            minLength={2}
            autoComplete="name"
            placeholder={t('namePlaceholder')}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">{t('email')}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={t('emailPlaceholder')}
          />
          <p className="text-[11px] text-[color:var(--color-fg-tertiary)]">{t('emailHelper')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="company">{t('company')}</Label>
          <Input
            id="company"
            name="company"
            required
            autoComplete="organization"
            placeholder={t('companyPlaceholder')}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="role">{t('role')}</Label>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger id="role">
              <SelectValue placeholder={t('rolePlaceholder')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="founder">{t('roles.founder')}</SelectItem>
              <SelectItem value="marketing">{t('roles.marketing')}</SelectItem>
              <SelectItem value="ops">{t('roles.ops')}</SelectItem>
              <SelectItem value="agency">{t('roles.agency')}</SelectItem>
              <SelectItem value="other">{t('roles.other')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="useCase">{t('useCase')}</Label>
        <Textarea
          id="useCase"
          name="useCase"
          placeholder={t('useCasePlaceholder')}
          required
          minLength={10}
          rows={5}
        />
        <p className="text-[11px] text-[color:var(--color-fg-tertiary)]">{t('useCaseHelper')}</p>
      </div>

      <div className="flex items-start gap-2">
        <Checkbox
          id="newsletter"
          checked={newsletter}
          onCheckedChange={(c) => setNewsletter(c === true)}
        />
        <div>
          <Label htmlFor="newsletter" className="text-[color:var(--color-fg-secondary)]">
            {t('newsletter')}
          </Label>
          <p className="text-[11px] text-[color:var(--color-fg-tertiary)]">{t('newsletterHelper')}</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <Button type="submit" disabled={isPending} variant="primary" size="lg">
          {isPending ? t('submitting') : t('submit')}
          {!isPending && <Send className="h-4 w-4" />}
        </Button>
        {status === 'error' && (
          <span className="text-sm text-red-300" role="alert">
            {errorMessage ? `${t('error')} (${errorMessage})` : t('error')}
          </span>
        )}
      </div>
      <p className="mono text-[10px] uppercase tracking-wider text-[color:var(--color-fg-tertiary)]">
        {t('responseTime')}
      </p>
    </form>
  );
}
