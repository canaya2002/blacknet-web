import Script from 'next/script';

export function Plausible() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const src =
    process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT ?? 'https://plausible.io/js/script.js';
  if (!domain) return null;
  return (
    <>
      <Script
        id="plausible-loader"
        async
        data-domain={domain}
        src={src}
        strategy="afterInteractive"
      />
      <Script id="plausible-init" strategy="afterInteractive">
        {`window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)};plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init();`}
      </Script>
    </>
  );
}
