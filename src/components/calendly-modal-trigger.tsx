"use client";

import { useEffect, useState } from "react";

import { CalendlyInline } from "@/components/calendly-inline";

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
            className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl border border-white/10 bg-[#14161b] p-4 shadow-2xl md:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xl text-ivory transition hover:bg-white/10"
              aria-label="Close modal"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>

            <div className="mb-5 pr-12 text-left">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-accent">
                Mammoth Coatings
              </p>
              <h2 className="mt-2 font-headline text-4xl text-ivory md:text-5xl">{title}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
                {description}
              </p>
            </div>

            <CalendlyInline url={url} />
          </div>
        </div>
      )}
    </>
  );
}