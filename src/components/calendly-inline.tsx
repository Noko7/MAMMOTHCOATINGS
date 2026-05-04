"use client";

import Script from "next/script";

type CalendlyInlineProps = {
  url: string;
};

export function CalendlyInline({ url }: CalendlyInlineProps) {
  return (
    <>
      <div
        className="calendly-inline-widget rounded-2xl border border-white/20 bg-white/80"
        data-url={url}
        style={{ minWidth: "320px", height: "700px" }}
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </>
  );
}
