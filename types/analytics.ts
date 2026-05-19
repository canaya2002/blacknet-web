/**
 * Type-safe Vercel Analytics custom events for the marketing site.
 *
 * Use the discriminated union `AnalyticsEvent` together with `trackEvent`
 * from `@/lib/analytics` to fire events anywhere in the codebase.
 */

export type Locale = 'es' | 'en';
export type Device = 'desktop' | 'tablet' | 'mobile';
export type PricingTier = 'standard' | 'growth' | 'enterprise';
export type PricingAction = 'start_trial' | 'talk_to_sales';
export type BillingPeriod = 'monthly' | 'annual';
export type FeatureKey =
  | 'inbox'
  | 'publishing'
  | 'ai'
  | 'reviews'
  | 'ads'
  | 'analytics'
  | 'listening';
export type IntegrationCategory =
  | 'social'
  | 'messaging'
  | 'reviews'
  | 'ads'
  | 'crm'
  | 'communication';
export type CtaSourceLocation =
  | 'nav'
  | 'hero'
  | 'pricing'
  | 'pricing_page'
  | 'cta_section'
  | 'footer'
  | 'mobile_menu'
  | 'home_inline'
  | 'blog'
  | 'page'
  | 'unknown';
export type InquiryType =
  | 'demo'
  | 'pricing'
  | 'support'
  | 'enterprise'
  | 'press'
  | 'partnership'
  | 'other';
export type ContactRole = 'founder' | 'marketing' | 'ops' | 'agency' | 'other';
export type AppDestination = 'login' | 'signup';
export type ContactFailReason = 'validation' | 'server_error' | 'rate_limit' | 'network';
export type ExternalDestination =
  | 'github'
  | 'twitter'
  | 'linkedin'
  | 'docs'
  | 'status'
  | 'calendly';

export type AnalyticsEvent =
  | {
      name: 'hero_cta_clicked';
      properties: {
        cta_type: 'primary' | 'secondary';
        locale: Locale;
        device: Device;
      };
    }
  | {
      name: 'pricing_tier_clicked';
      properties: {
        tier: PricingTier;
        action: PricingAction;
        billing: BillingPeriod;
        locale: Locale;
        source_location: CtaSourceLocation;
      };
    }
  | {
      name: 'signup_clicked';
      properties: {
        source_page: string;
        source_location: CtaSourceLocation;
        locale: Locale;
      };
    }
  | {
      name: 'contact_form_submitted';
      properties: {
        inquiry_type: InquiryType;
        role: ContactRole;
        locale: Locale;
      };
    }
  | {
      name: 'contact_form_failed';
      properties: {
        reason: ContactFailReason;
        field: string;
        locale: Locale;
      };
    }
  | {
      name: 'newsletter_subscribed';
      properties: {
        source_page: string;
        source_location: CtaSourceLocation;
        locale: Locale;
      };
    }
  | {
      name: 'app_redirect_clicked';
      properties: {
        destination: AppDestination;
        source_page: string;
        source_location: CtaSourceLocation;
        locale: Locale;
      };
    }
  | {
      name: 'calendly_booking_started';
      properties: {
        source_page: string;
        locale: Locale;
      };
    }
  | {
      name: 'language_switched';
      properties: {
        from: Locale;
        to: Locale;
        page: string;
      };
    }
  | {
      name: 'blog_post_read';
      properties: {
        slug: string;
        scroll_depth: 25 | 50 | 75 | 100;
        locale: Locale;
      };
    }
  | {
      name: 'feature_expanded';
      properties: {
        feature: FeatureKey;
        locale: Locale;
      };
    }
  | {
      name: 'faq_opened';
      properties: {
        question_id: string;
        page: string;
        locale: Locale;
      };
    }
  | {
      name: 'integration_clicked';
      properties: {
        integration: string;
        category: IntegrationCategory;
        locale: Locale;
      };
    }
  | {
      name: 'external_link_clicked';
      properties: {
        destination: ExternalDestination;
        source_page: string;
      };
    }
  | {
      name: 'page_not_found';
      properties: {
        attempted_path: string;
        referrer: string;
      };
    }
  | {
      name: 'form_validation_error';
      properties: {
        form_name: 'contact' | 'newsletter';
        field: string;
        error_type: 'required' | 'format' | 'length';
      };
    };

export type AnalyticsEventName = AnalyticsEvent['name'];

export type AnalyticsPropertiesFor<TName extends AnalyticsEventName> = Extract<
  AnalyticsEvent,
  { name: TName }
>['properties'];
