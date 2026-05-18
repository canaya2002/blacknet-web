'use client';

import { useState, useTransition } from 'react';
import { useTranslations } from 'next-intl';
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

export function ContactForm() {
  const t = useTranslations('contact.form');
  const [hp, setHp] = useState('');
  const [role, setRole] = useState<string>('');
  const [newsletter, setNewsletter] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isPending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (hp) return;
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    payload.newsletter = String(newsletter);
    payload.role = role;

    startTransition(async () => {
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error();
        setStatus('success');
      } catch {
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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">{t('name')}</Label>
          <Input id="name" name="name" required autoComplete="name" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">{t('email')}</Label>
          <Input id="email" name="email" type="email" required autoComplete="email" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="company">{t('company')}</Label>
          <Input id="company" name="company" required autoComplete="organization" />
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
          rows={5}
        />
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="newsletter"
          checked={newsletter}
          onCheckedChange={(c) => setNewsletter(c === true)}
        />
        <Label htmlFor="newsletter" className="text-[color:var(--color-fg-secondary)]">
          {t('newsletter')}
        </Label>
      </div>

      <div className="flex items-center justify-between gap-4">
        <Button type="submit" disabled={isPending} variant="primary" size="lg">
          {isPending ? t('submitting') : t('submit')}
          {!isPending && <Send className="h-4 w-4" />}
        </Button>
        {status === 'error' && (
          <span className="text-sm text-red-300" role="alert">
            {t('error')}
          </span>
        )}
      </div>
    </form>
  );
}
