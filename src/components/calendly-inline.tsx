"use client";

import { useState } from "react";

type CalendlyInlineProps = {
  url: string;
};

function withTheme(url: string) {
  const u = new URL(url);
  u.searchParams.set("background_color", "1c1f24");
  u.searchParams.set("text_color", "f2e7d5");
  u.searchParams.set("primary_color", "2f8fe8");
  u.searchParams.set("hide_gdpr_banner", "1");
  return u.toString();
}

// Using a plain iframe with eager loading and skeleton. Calendly loads earlier
// so scrolling fast or clicking CTAs that anchor to this section doesn't cause delay.
export function CalendlyInline({ url }: CalendlyInlineProps) {
  const themedUrl = withTheme(url);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative" style={isLoaded ? {} : { minHeight: "700px" }}>
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse rounded-2xl border border-white/10 bg-white/5" />
      )}
      <iframe
        src={themedUrl}
        width="100%"
        height="700"
        frameBorder="0"
        title="Schedule your free quote"
        className="rounded-2xl border border-white/10"
        style={{ minWidth: "320px", colorScheme: "normal" }}
        loading="eager"
        allow="payment"
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}
