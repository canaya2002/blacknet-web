'use client';

import { useLocale } from 'next-intl';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { pickLocale, trackEvent } from '@/lib/analytics';

type Question = { q: string; a: string };

type Props = {
  questions: Question[];
  page: string;
};

export function TrackedFaqAccordion({ questions, page }: Props) {
  const locale = pickLocale(useLocale());
  return (
    <Accordion
      type="single"
      collapsible
      onValueChange={(value) => {
        if (!value) return;
        trackEvent('faq_opened', {
          question_id: value,
          page,
          locale,
        });
      }}
    >
      {questions.map((q, i) => (
        <AccordionItem key={i} value={`q-${i}`}>
          <AccordionTrigger>{q.q}</AccordionTrigger>
          <AccordionContent>{q.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
