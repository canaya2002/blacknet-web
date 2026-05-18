import type { SVGProps } from 'react';

type LogoProps = SVGProps<SVGSVGElement>;

export function MetaLogo(props: LogoProps) {
  return (
    <svg viewBox="0 0 36 36" fill="none" {...props}>
      <defs>
        <linearGradient id="meta-grad" x1="0" y1="0" x2="36" y2="36">
          <stop offset="0" stopColor="#0064E1" />
          <stop offset="0.5" stopColor="#0082FB" />
          <stop offset="1" stopColor="#19AFFF" />
        </linearGradient>
      </defs>
      <path
        d="M18 5c-3.6 0-6.7 2-9.4 6C5.8 15.4 3.5 21 3.5 24.5c0 2.6 1.4 4.5 4 4.5 2.4 0 4.2-1.7 6.6-5.7l1.5-2.6c.4-.6.7-1.2 1-1.7l.7 1.2-1.4-2.4-2 3.3c-1.4 2.4-2.3 3.4-3.4 3.4-.9 0-1.4-.8-1.4-2 0-2 1.7-6.4 3.7-9.4 2-3 3.8-4.5 5.7-4.5 1.9 0 3.5 1.2 5.8 4.8 1.8 2.8 3.4 6.3 3.4 8.7 0 1.5-.5 2.4-1.8 2.4-.8 0-1.8-.5-3-2.2l-2.3-3.3-1.4 2.4 1.8 2.8c1.7 2.6 3.7 4.1 6 4.1 3.1 0 4.7-2.4 4.7-5.7 0-3.3-2.3-9.1-5.4-13.8C24.6 7 21.7 5 18 5z"
        fill="url(#meta-grad)"
      />
    </svg>
  );
}

export function InstagramLogo(props: LogoProps) {
  return (
    <svg viewBox="0 0 36 36" fill="none" {...props}>
      <defs>
        <linearGradient id="ig-grad" x1="0" y1="0" x2="36" y2="36">
          <stop offset="0" stopColor="#FEDA77" />
          <stop offset="0.3" stopColor="#F58529" />
          <stop offset="0.6" stopColor="#DD2A7B" />
          <stop offset="0.9" stopColor="#8134AF" />
          <stop offset="1" stopColor="#515BD4" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="30" height="30" rx="8" fill="url(#ig-grad)" />
      <rect x="9" y="9" width="18" height="18" rx="6" stroke="white" strokeWidth="2" fill="none" />
      <circle cx="18" cy="18" r="4" stroke="white" strokeWidth="2" fill="none" />
      <circle cx="24" cy="12" r="1.2" fill="white" />
    </svg>
  );
}

export function WhatsAppLogo(props: LogoProps) {
  return (
    <svg viewBox="0 0 36 36" fill="none" {...props}>
      <defs>
        <linearGradient id="wa-grad" x1="0" y1="0" x2="36" y2="36">
          <stop offset="0" stopColor="#60D669" />
          <stop offset="1" stopColor="#1FAF38" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="32" height="32" rx="16" fill="url(#wa-grad)" />
      <path
        d="M24.6 20.4c-.4-.2-2.4-1.2-2.8-1.3-.4-.1-.6-.2-.9.2-.3.4-1 1.3-1.2 1.5-.2.2-.4.3-.8.1-.4-.2-1.7-.6-3.2-2-1.2-1-2-2.3-2.2-2.7-.2-.4 0-.6.2-.8l.5-.6c.2-.2.2-.4.4-.6.1-.2.1-.5 0-.7-.1-.2-.9-2.1-1.2-2.9-.3-.7-.6-.6-.9-.6h-.7c-.3 0-.7.1-1.1.5-.4.4-1.5 1.4-1.5 3.5 0 2.1 1.5 4.1 1.7 4.3.2.3 3 4.6 7.3 6.4 1 .5 1.8.7 2.4.9.9.3 1.8.3 2.5.1.7-.1 2.4-1 2.7-1.9.3-1 .3-1.7.2-1.9-.1-.2-.4-.3-.8-.5z"
        fill="white"
      />
    </svg>
  );
}

export function LinkedInLogo(props: LogoProps) {
  return (
    <svg viewBox="0 0 36 36" fill="none" {...props}>
      <rect x="3" y="3" width="30" height="30" rx="5" fill="#0A66C2" />
      <path
        d="M11.5 14.5h3v10h-3v-10zm1.5-4.7c1 0 1.7.8 1.7 1.7 0 1-.7 1.7-1.7 1.7s-1.7-.7-1.7-1.7c0-.9.7-1.7 1.7-1.7zm5 4.7h2.9v1.4h.1c.4-.8 1.4-1.6 2.9-1.6 3.1 0 3.6 2 3.6 4.7v5.5h-3v-4.9c0-1.2 0-2.7-1.6-2.7s-1.9 1.3-1.9 2.6v5h-3v-10z"
        fill="white"
      />
    </svg>
  );
}

export function TikTokLogo(props: LogoProps) {
  return (
    <svg viewBox="0 0 36 36" fill="none" {...props}>
      <rect x="3" y="3" width="30" height="30" rx="6" fill="#010101" />
      <path
        d="M22.4 9h-3.1v12.2c0 1.5-1.2 2.7-2.7 2.7s-2.7-1.2-2.7-2.7 1.2-2.7 2.7-2.7c.3 0 .6.1.9.2v-3.2c-.3-.1-.6-.1-.9-.1-3.2 0-5.9 2.6-5.9 5.9s2.6 5.9 5.9 5.9 5.9-2.6 5.9-5.9V15c1.1.7 2.5 1.1 4 1.1v-3.2c-2.4 0-4.1-1.9-4.1-3.9z"
        fill="#25F4EE"
        opacity="0.85"
        transform="translate(-1 -1)"
      />
      <path
        d="M22.4 9h-3.1v12.2c0 1.5-1.2 2.7-2.7 2.7s-2.7-1.2-2.7-2.7 1.2-2.7 2.7-2.7c.3 0 .6.1.9.2v-3.2c-.3-.1-.6-.1-.9-.1-3.2 0-5.9 2.6-5.9 5.9s2.6 5.9 5.9 5.9 5.9-2.6 5.9-5.9V15c1.1.7 2.5 1.1 4 1.1v-3.2c-2.4 0-4.1-1.9-4.1-3.9z"
        fill="#FE2C55"
        opacity="0.85"
        transform="translate(1 1)"
      />
      <path
        d="M22.4 9h-3.1v12.2c0 1.5-1.2 2.7-2.7 2.7s-2.7-1.2-2.7-2.7 1.2-2.7 2.7-2.7c.3 0 .6.1.9.2v-3.2c-.3-.1-.6-.1-.9-.1-3.2 0-5.9 2.6-5.9 5.9s2.6 5.9 5.9 5.9 5.9-2.6 5.9-5.9V15c1.1.7 2.5 1.1 4 1.1v-3.2c-2.4 0-4.1-1.9-4.1-3.9z"
        fill="white"
      />
    </svg>
  );
}

export function YouTubeLogo(props: LogoProps) {
  return (
    <svg viewBox="0 0 36 36" fill="none" {...props}>
      <rect x="3" y="8" width="30" height="20" rx="4" fill="#FF0000" />
      <path d="M16 14l7 4-7 4v-8z" fill="white" />
    </svg>
  );
}

export function XLogo(props: LogoProps) {
  return (
    <svg viewBox="0 0 36 36" fill="none" {...props}>
      <rect x="3" y="3" width="30" height="30" rx="6" fill="#000" />
      <path
        d="M22.2 9h2.8l-6.1 7 7.2 9.6h-5.6l-4.4-5.8-5 5.8H8.3l6.5-7.5L7.9 9h5.7l4 5.3L22.2 9zm-1 14.9h1.6L13 10.6h-1.7l9.9 13.3z"
        fill="white"
      />
    </svg>
  );
}

export function PinterestLogo(props: LogoProps) {
  return (
    <svg viewBox="0 0 36 36" fill="none" {...props}>
      <circle cx="18" cy="18" r="15" fill="#E60023" />
      <path
        d="M18 7C12.5 7 8 11.4 8 17c0 4.1 2.5 7.7 6.1 9.2-.1-.8-.2-2 0-2.9.2-.8 1.2-4.9 1.2-4.9s-.3-.6-.3-1.5c0-1.4.8-2.5 1.9-2.5.9 0 1.3.7 1.3 1.5 0 .9-.6 2.2-.9 3.5-.2 1 .5 1.9 1.6 1.9 1.9 0 3.3-2 3.3-4.9 0-2.6-1.8-4.3-4.5-4.3-3 0-4.8 2.3-4.8 4.6 0 .9.3 1.9.8 2.4.1.1.1.2.1.3-.1.4-.3 1-.3 1.1 0 .2-.2.2-.4.1-1.4-.7-2.3-2.7-2.3-4.4 0-3.5 2.6-6.8 7.4-6.8 3.9 0 6.9 2.8 6.9 6.5 0 3.9-2.4 7-5.8 7-1.1 0-2.2-.6-2.6-1.3 0 0-.5 2.1-.7 2.6-.3 1-1 2.3-1.5 3.1.7.2 1.4.3 2.2.3C23.6 27 28 22.6 28 17 28 11.4 23.6 7 18 7z"
        fill="white"
      />
    </svg>
  );
}

export function GoogleAdsLogo(props: LogoProps) {
  return (
    <svg viewBox="0 0 36 36" fill="none" {...props}>
      <path d="M14.4 6.5l-7.3 12.7c-1 1.7-.4 4 1.4 5 1.7 1 4 .4 5-1.4l7.3-12.7c1-1.7.4-4-1.4-5-1.7-1-4-.4-5 1.4z" fill="#FBBC04" />
      <path d="M21.5 20.5l-7.3-12.7c-1-1.7-3.2-2.3-5-1.4-1.7 1-2.3 3.2-1.4 5l7.3 12.7c1 1.7 3.2 2.3 5 1.4 1.7-1 2.3-3.2 1.4-5z" fill="#4285F4" />
      <circle cx="10.2" cy="25" r="3.7" fill="#34A853" />
    </svg>
  );
}

export function GoogleBusinessLogo(props: LogoProps) {
  return (
    <svg viewBox="0 0 36 36" fill="none" {...props}>
      <path d="M18 8.5c2.6 0 4.5 1.1 5.6 2l4-3.9C25.2 4.4 22 3 18 3 12.4 3 7.5 6.2 5.2 11l4.6 3.6C10.9 11.2 14.1 8.5 18 8.5z" fill="#EA4335" />
      <path d="M32.5 18.4c0-1.1-.1-2-.3-2.9H18v5.5h8.3c-.4 1.7-1.4 3.3-2.8 4.4l4.5 3.5c2.6-2.4 4.5-6 4.5-10.5z" fill="#4285F4" />
      <path d="M9.7 21.5c-.3-.9-.5-1.9-.5-2.9 0-1 .2-2 .5-2.9L5.2 12C4.1 14 3.5 16.4 3.5 18.6c0 2.2.6 4.5 1.7 6.5l4.5-3.6z" fill="#FBBC04" />
      <path d="M18 33c4 0 7.4-1.3 9.9-3.6l-4.5-3.5c-1.3.9-2.9 1.5-5.4 1.5-4.1 0-7.5-2.7-8.7-6.5l-4.6 3.6C7 29.9 12 33 18 33z" fill="#34A853" />
    </svg>
  );
}

export function HubSpotLogo(props: LogoProps) {
  return (
    <svg viewBox="0 0 36 36" fill="none" {...props}>
      <rect x="3" y="3" width="30" height="30" rx="6" fill="#FF7A59" />
      <path
        d="M24.5 16.5v-2.7c.9-.4 1.5-1.3 1.5-2.3 0-1.4-1.2-2.6-2.6-2.6-1 0-1.9.6-2.3 1.5h-3.7v-3h-2.4v3.1c-3.2.4-5.6 3.1-5.6 6.5 0 3.6 3 6.6 6.6 6.6 1.4 0 2.7-.5 3.8-1.2l1.6 1.6 1.5-1.5-1.6-1.6c.7-1.1 1.2-2.4 1.2-3.8 0-.2 0-.4-.1-.6h2.1zm-8.6 3.5c-1.6 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.4 3-3 3z"
        fill="white"
      />
    </svg>
  );
}

export function SalesforceLogo(props: LogoProps) {
  return (
    <svg viewBox="0 0 36 36" fill="none" {...props}>
      <rect x="3" y="3" width="30" height="30" rx="6" fill="#00A1E0" />
      <path
        d="M17 10c-2 0-3.7 1-4.7 2.6-.5-.2-1.1-.4-1.7-.4-2.4 0-4.3 1.9-4.3 4.3 0 .4 0 .7.1 1.1-1 .6-1.7 1.7-1.7 3 0 1.9 1.5 3.4 3.4 3.4 1.2 0 2.2-.6 2.9-1.4.6.4 1.4.6 2.2.6 1.2 0 2.3-.5 3-1.4.7.9 1.8 1.4 3 1.4 2.4 0 4.3-1.9 4.3-4.3 0-.3 0-.6-.1-.9.4-.3.7-.7.7-1.2 0-.8-.6-1.4-1.4-1.4-.2 0-.4 0-.5.1.1-.4.2-.7.2-1.1 0-2.4-1.9-4.3-4.3-4.3-1 0-2 .4-2.8 1-.7-.7-1.6-1.1-2.6-1.1z"
        fill="white"
      />
    </svg>
  );
}

export function SlackLogo(props: LogoProps) {
  return (
    <svg viewBox="0 0 36 36" fill="none" {...props}>
      <rect x="3" y="3" width="30" height="30" rx="6" fill="#0a0a0a" />
      <path d="M13 19.5a1.5 1.5 0 100 3h1.5v-1.5a1.5 1.5 0 00-1.5-1.5z" fill="#E01E5A" />
      <path d="M14.5 19.5a1.5 1.5 0 113 0v4a1.5 1.5 0 11-3 0v-4z" fill="#E01E5A" />
      <path d="M16 13a1.5 1.5 0 11-3 0v-1.5h1.5A1.5 1.5 0 0116 13z" fill="#36C5F0" />
      <path d="M16 14.5a1.5 1.5 0 110 3h-4a1.5 1.5 0 110-3h4z" fill="#36C5F0" />
      <path d="M23 16a1.5 1.5 0 110 3h-1.5v-1.5A1.5 1.5 0 0123 16z" fill="#2EB67D" />
      <path d="M21.5 16a1.5 1.5 0 11-3 0v-4a1.5 1.5 0 113 0v4z" fill="#2EB67D" />
      <path d="M20 22.5a1.5 1.5 0 113 0V24h-1.5a1.5 1.5 0 01-1.5-1.5z" fill="#ECB22E" />
      <path d="M20 21a1.5 1.5 0 110-3h4a1.5 1.5 0 110 3h-4z" fill="#ECB22E" />
    </svg>
  );
}

export function TeamsLogo(props: LogoProps) {
  return (
    <svg viewBox="0 0 36 36" fill="none" {...props}>
      <rect x="3" y="3" width="30" height="30" rx="6" fill="#4B53BC" />
      <path
        d="M21 14.5h4v6.8c0 2.6-2.1 4.7-4.7 4.7s-4.7-2.1-4.7-4.7c0-.2 0-.4.1-.6h2.6c0 .2-.1.4-.1.6 0 1.2 1 2.1 2.1 2.1s2.1-.9 2.1-2.1v-4.2h-1.4v-2.6zM10 13h9.5v2.4h-3.6v10.6h-2.5V15.4H10V13z"
        fill="white"
      />
      <circle cx="25" cy="13" r="3" fill="white" />
    </svg>
  );
}

export function YelpLogo(props: LogoProps) {
  return (
    <svg viewBox="0 0 36 36" fill="none" {...props}>
      <rect x="3" y="3" width="30" height="30" rx="6" fill="#D32323" />
      <path
        d="M19 8v9c0 .5.4.9.9.9.2 0 .4-.1.5-.2l4.4-3.6c.4-.3.4-.9.1-1.3-2-2.2-3.5-3.8-5-5.1-.3-.3-.9 0-.9.3zM13 14.5l4.5 1.6c.5.2.7.7.5 1.2 0 .1-.1.2-.2.3l-2.6 3c-.3.4-.9.4-1.3.1-1.7-1.6-2.4-3-2.6-4.7-.1-.7.6-1.2 1.7-1.5zm5 6.5l1.7-1c.5-.3 1.1-.1 1.3.4l2 5c.2.4 0 1-.4 1.1-1.2.4-2.2.5-3.5.4-.5-.1-.9-.5-.9-1l-.2-4.9zm-3.5-1l3.4-1c.5-.1 1 .2 1.1.6 0 .2 0 .3-.1.5L17 23c-.3.4-.9.6-1.3.3-1.4-.9-2.3-1.8-2.8-3-.2-.4 0-.9.5-1l1.1-.3zm10 1l1.5 4.5c.2.5-.1 1-.6 1.2-.1 0-.3 0-.4 0-1.5-.1-3-.5-4-1-.4-.3-.5-.8-.3-1.2L21.7 21c.2-.3.5-.5.8-.5 1 0 2 .2 2 .5z"
        fill="white"
      />
    </svg>
  );
}

export function TripAdvisorLogo(props: LogoProps) {
  return (
    <svg viewBox="0 0 36 36" fill="none" {...props}>
      <rect x="3" y="3" width="30" height="30" rx="15" fill="#34E0A1" />
      <circle cx="13" cy="20" r="4" fill="#0a0a0a" />
      <circle cx="13" cy="20" r="1.5" fill="white" />
      <circle cx="23" cy="20" r="4" fill="#0a0a0a" />
      <circle cx="23" cy="20" r="1.5" fill="white" />
      <path d="M18 9l-2 4h4l-2-4z" fill="#0a0a0a" />
    </svg>
  );
}

export function TrustpilotLogo(props: LogoProps) {
  return (
    <svg viewBox="0 0 36 36" fill="none" {...props}>
      <rect x="3" y="3" width="30" height="30" rx="6" fill="#00B67A" />
      <path d="M18 8l2.5 6.7H27l-5.5 4 2.1 6.8L18 21.4 12.4 25.5l2.1-6.8-5.5-4h6.5L18 8z" fill="white" />
    </svg>
  );
}

export function ZapierLogo(props: LogoProps) {
  return (
    <svg viewBox="0 0 36 36" fill="none" {...props}>
      <rect x="3" y="3" width="30" height="30" rx="6" fill="#FF4A00" />
      <path
        d="M22 18l5.5-2.4-.6-1.8-5.7 1.6V9.5h-2v6L13.5 12l-1.3 1.4 3.8 3.6h-6v2h6L12.2 23l1.3 1.4 5.7-5.7v6h2v-6l5.7 5.7 1.3-1.4-3.7-3.5h6v-2h-5.9z"
        fill="white"
      />
    </svg>
  );
}

export function RedditLogo(props: LogoProps) {
  return (
    <svg viewBox="0 0 36 36" fill="none" {...props}>
      <circle cx="18" cy="18" r="15" fill="#FF4500" />
      <circle cx="26" cy="14" r="2.5" fill="white" />
      <ellipse cx="18" cy="20" rx="9" ry="6" fill="white" />
      <circle cx="14" cy="19" r="1.5" fill="#FF4500" />
      <circle cx="22" cy="19" r="1.5" fill="#FF4500" />
      <path d="M14 22.5c1.2 1.1 2.5 1.5 4 1.5s2.8-.4 4-1.5" stroke="#FF4500" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function AppleLogo(props: LogoProps) {
  return (
    <svg viewBox="0 0 36 36" fill="none" {...props}>
      <rect x="3" y="3" width="30" height="30" rx="6" fill="#0a0a0a" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
      <path
        d="M22 18.6c0-3 2.4-4.4 2.5-4.5-1.4-2-3.5-2.3-4.3-2.3-1.8-.2-3.6 1.1-4.5 1.1-1 0-2.4-1-3.9-1-2 0-3.9 1.2-4.9 3-2.1 3.7-.5 9 1.5 11.9 1 1.4 2.2 3 3.7 2.9 1.5-.1 2-1 3.8-1 1.7 0 2.3 1 3.8.9 1.6 0 2.6-1.4 3.6-2.9 1.1-1.6 1.6-3.2 1.6-3.3-.1 0-3-.9-3-3.8zm-3-7.3c.8-1 1.4-2.4 1.2-3.8-1.2.1-2.6.8-3.4 1.8-.7.8-1.4 2.3-1.2 3.7 1.4.1 2.7-.7 3.4-1.7z"
        fill="white"
      />
    </svg>
  );
}

export function GooglePlayLogo(props: LogoProps) {
  return (
    <svg viewBox="0 0 36 36" fill="none" {...props}>
      <rect x="3" y="3" width="30" height="30" rx="6" fill="#0a0a0a" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
      <path d="M9 8.5v19l9-9.5-9-9.5z" fill="#00C2FF" />
      <path d="M18 18l-9 9.5 13.4-7.7L18 18z" fill="#FFE600" />
      <path d="M18 18l4.4-1.8L9 8.5l9 9.5z" fill="#FF4040" />
      <path d="M22.4 16.2L27.5 19l-5.1 2.8L18 18l4.4-1.8z" fill="#00DE80" />
    </svg>
  );
}

export function MessengerLogo(props: LogoProps) {
  return (
    <svg viewBox="0 0 36 36" fill="none" {...props}>
      <defs>
        <linearGradient id="msg-grad" x1="0" y1="0" x2="36" y2="36">
          <stop offset="0" stopColor="#00B2FF" />
          <stop offset="1" stopColor="#006AFF" />
        </linearGradient>
      </defs>
      <circle cx="18" cy="18" r="15" fill="url(#msg-grad)" />
      <path d="M18 8c-5.5 0-10 4.1-10 9.2 0 2.9 1.4 5.4 3.7 7.1V28l3.4-1.9c.9.3 1.9.4 2.9.4 5.5 0 10-4.1 10-9.2S23.5 8 18 8zm1 12.4l-2.5-2.7-4.9 2.7 5.4-5.7 2.6 2.7 4.8-2.7-5.4 5.7z" fill="white" />
    </svg>
  );
}

export function TelegramLogo(props: LogoProps) {
  return (
    <svg viewBox="0 0 36 36" fill="none" {...props}>
      <circle cx="18" cy="18" r="15" fill="#229ED9" />
      <path d="M25.2 11.5L8.9 17.8c-1.1.4-1.1 1.1-.2 1.4l4.1 1.3 1.6 4.8c.2.5.3.7.7.7.3 0 .5-.2.7-.4l2.4-2.3 5 3.7c.9.5 1.6.2 1.8-.8l3.3-15.5c.3-1.3-.5-1.8-1.4-1.5l-.7.3z" fill="white" />
      <path d="M13.4 20.7l9.4-5.9c.4-.3.8.1.5.4l-7.7 7-.3 4.3-1.9-5.8z" fill="#229ED9" opacity="0.5" />
    </svg>
  );
}

export function ThreadsLogo(props: LogoProps) {
  return (
    <svg viewBox="0 0 36 36" fill="none" {...props}>
      <rect x="3" y="3" width="30" height="30" rx="6" fill="#000" />
      <path
        d="M22.7 17.4c-.1-.1-.2-.1-.3-.2 0-2.8-1.7-4.5-4.5-4.5-1.7 0-3 .6-3.8 1.8l1.5 1c.6-.8 1.4-1.2 2.3-1.2 1.4 0 2.5.8 2.6 2.2-.8-.3-1.7-.4-2.7-.4-2.6 0-4.4 1.4-4.4 3.4 0 2 1.7 3.3 3.8 3.3 1.7 0 3-.6 3.8-1.9.2 1 1.4 1.5 2.5 1.5 1.9 0 2.8-1.6 2.9-3.4 0-1-.2-1.7-.7-2.4zm-5.7 4c-.9 0-1.7-.5-1.7-1.3 0-.9 1-1.5 2.3-1.5.7 0 1.4.1 2 .3-.2 1.8-1.2 2.5-2.6 2.5z"
        fill="white"
      />
    </svg>
  );
}

export function BlueskyLogo(props: LogoProps) {
  return (
    <svg viewBox="0 0 36 36" fill="none" {...props}>
      <rect x="3" y="3" width="30" height="30" rx="6" fill="#1185FE" />
      <path
        d="M18 16c-1.6-3-6-8.4-10-10 4 5 4 9 4 11s-1 4-1 4 5-1 7-5c2 4 7 5 7 5s-1-2-1-4 0-6 4-11c-4 1.6-8.4 7-10 10z"
        fill="white"
      />
    </svg>
  );
}

export function PipedriveLogo(props: LogoProps) {
  return (
    <svg viewBox="0 0 36 36" fill="none" {...props}>
      <rect x="3" y="3" width="30" height="30" rx="6" fill="#1A1A1A" />
      <path
        d="M16 10h3.5c4 0 6.5 2.6 6.5 6.5s-2.5 6.7-6.3 6.7c-1.2 0-2.1-.3-2.7-.7v6.5h-3v-19zm3 9.7c.5.4 1.2.7 2.1.7 2.2 0 3.4-1.5 3.4-3.9 0-2.3-1.2-3.8-3.3-3.8H19v7z"
        fill="white"
      />
    </svg>
  );
}

export function MakeLogo(props: LogoProps) {
  return (
    <svg viewBox="0 0 36 36" fill="none" {...props}>
      <rect x="3" y="3" width="30" height="30" rx="6" fill="#6D00CC" />
      <path d="M11 24V12h2v12h-2zm5 0V12h2l3 8 3-8h2v12h-2v-8l-3 8h-1l-3-8v8h-1z" fill="white" />
    </svg>
  );
}

export function N8nLogo(props: LogoProps) {
  return (
    <svg viewBox="0 0 36 36" fill="none" {...props}>
      <rect x="3" y="3" width="30" height="30" rx="6" fill="#EA4B71" />
      <circle cx="11" cy="14" r="2.5" fill="white" />
      <circle cx="11" cy="22" r="2.5" fill="white" />
      <circle cx="18" cy="18" r="3" fill="white" />
      <circle cx="25" cy="14" r="2.5" fill="white" />
      <circle cx="25" cy="22" r="2.5" fill="white" />
      <path d="M13 14h3M13 22h3M21 14h3M21 22h3" stroke="white" strokeWidth="1.5" />
    </svg>
  );
}

export function FacebookAdsLogo(props: LogoProps) {
  return (
    <svg viewBox="0 0 36 36" fill="none" {...props}>
      <rect x="3" y="3" width="30" height="30" rx="6" fill="#1877F2" />
      <path
        d="M22.5 18.5l.6-3.8h-3.6V12c0-1 .5-2 2.1-2h1.7V6.5s-1.5-.3-3-.3c-3.1 0-5.1 1.9-5.1 5.2v3.3h-3.3v3.8h3.3v9.2c.7.1 1.3.1 2 .1s1.4 0 2-.1v-9.2h3.3z"
        fill="white"
      />
    </svg>
  );
}

export const integrationLogoMap: Record<string, React.ComponentType<LogoProps>> = {
  Facebook: MetaLogo,
  'Facebook Messenger': MessengerLogo,
  Instagram: InstagramLogo,
  'Instagram DM': InstagramLogo,
  LinkedIn: LinkedInLogo,
  'Twitter / X': XLogo,
  TikTok: TikTokLogo,
  YouTube: YouTubeLogo,
  Pinterest: PinterestLogo,
  Reddit: RedditLogo,
  Threads: ThreadsLogo,
  Bluesky: BlueskyLogo,
  'WhatsApp Business': WhatsAppLogo,
  Telegram: TelegramLogo,
  'Google Business Profile': GoogleBusinessLogo,
  Yelp: YelpLogo,
  TripAdvisor: TripAdvisorLogo,
  Trustpilot: TrustpilotLogo,
  'Apple App Store': AppleLogo,
  'Google Play': GooglePlayLogo,
  'Google Ads': GoogleAdsLogo,
  'Meta Ads': FacebookAdsLogo,
  'LinkedIn Ads': LinkedInLogo,
  'TikTok Ads': TikTokLogo,
  HubSpot: HubSpotLogo,
  Salesforce: SalesforceLogo,
  Pipedrive: PipedriveLogo,
  Slack: SlackLogo,
  'Microsoft Teams': TeamsLogo,
  Zapier: ZapierLogo,
  Make: MakeLogo,
  n8n: N8nLogo,
};
