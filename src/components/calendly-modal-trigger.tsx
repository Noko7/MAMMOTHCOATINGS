"use client";

import { useEffect, useState } from "react";

import { CalendlyInline } from "@/components/calendly-inline";
import { links } from "@/lib/site-data";

type CalendlyModalTriggerProps = {
  url: string;
  buttonLabel: string;
  title: string;
  description: string;
  className?: string;
  onOpen?: () => void;
};

export function CalendlyModalTrigger({
  url,
  buttonLabel,
  title,
  description,
  className,
  onOpen,
}: CalendlyModalTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={() => {
          onOpen?.();
          setIsOpen(true);
        }}
      >
        {buttonLabel}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-3xl border border-white/10 bg-ivory p-6 text-[#2b1a12] shadow-2xl md:p-10"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-[#2b1a12]/15 bg-[#2b1a12]/5 text-xl text-[#2b1a12] transition hover:bg-[#2b1a12]/10"
              aria-label="Close modal"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>

            <div className="mb-5 pr-12 text-left">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-accent">
                Mammoth Coatings
              </p>
              <h2 className="mt-2 font-headline text-4xl text-[#2b1a12] md:text-5xl">{title}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#2b1a12]/80 md:text-base">
                {description}
              </p>
            </div>

            <div className="mb-6 flex flex-wrap gap-2">
              <a href={links.call} className="rounded-full bg-[#2b1a12] px-5 py-2.5 text-sm font-bold text-white">
                Call Now
              </a>
              <a href={links.text} className="rounded-full border-2 border-[#2b1a12] px-5 py-2.5 text-sm font-bold text-[#2b1a12]">
                Text Now
              </a>
            </div>

            <CalendlyInline url={url} />
          </div>
        </div>
      )}
    </>
  );
}