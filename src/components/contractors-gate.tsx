"use client";

import { useState } from "react";

const CONTRACTOR_PASSWORD = "EpoxyFlooring";
const STORAGE_KEY = "mammoth-contractors-unlocked";

type ContractorPricingRow = {
  service: string;
  pricing: string;
  notes: string;
};

const pricingRows: ContractorPricingRow[] = [
  {
    service: "Residential garage install",
    pricing: "Add your private rate here",
    notes: "Use this line for standard 1-car and 2-car installs.",
  },
  {
    service: "Patio and porch coatings",
    pricing: "Add your private rate here",
    notes: "Set your square-foot or minimum-job pricing.",
  },
  {
    service: "Commercial floor systems",
    pricing: "Add your private rate here",
    notes: "Track negotiated commercial starting pricing.",
  },
  {
    service: "Crack repair and prep adders",
    pricing: "Add your private rate here",
    notes: "List prep surcharges, repairs, and moisture remediation.",
  },
];

export function ContractorsGate() {
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(
    () => typeof window !== "undefined" && window.sessionStorage.getItem(STORAGE_KEY) === "true"
  );
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password === CONTRACTOR_PASSWORD) {
      window.sessionStorage.setItem(STORAGE_KEY, "true");
      setIsUnlocked(true);
      setError("");
      return;
    }

    setError("Incorrect password.");
  };

  if (!isUnlocked) {
    return (
      <section className="mx-auto max-w-xl px-4 py-20 md:px-8">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/40">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-accent">
            Contractors Only
          </p>
          <h1 className="mt-3 font-headline text-5xl text-ivory">Private Pricing Access</h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-300">
            Enter the contractor password to view the internal pricing sheet and install notes.
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <label className="block text-sm font-semibold text-ivory" htmlFor="contractor-password">
              Password
            </label>
            <input
              id="contractor-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-ivory outline-none transition focus:border-blue-accent"
              placeholder="Enter password"
            />
            {error ? <p className="text-sm font-semibold text-red-300">{error}</p> : null}
            <button type="submit" className="cta-primary text-base">
              Unlock Pricing Page
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:px-8">
      <div className="mb-8 rounded-3xl border border-blue-accent/30 bg-blue-accent/8 p-6">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-accent">
          Internal Use
        </p>
        <h1 className="mt-2 font-headline text-5xl text-ivory">Contractor Pricing Sheet</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300">
          This page stays client-side only. Update the pricing lines below directly in the page whenever contractor rates or install notes change.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {pricingRows.map((row) => (
          <article key={row.service} className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-accent">Pricing Line</p>
            <h2 className="mt-2 font-headline text-3xl text-ivory">{row.service}</h2>
            <p className="mt-4 text-lg font-semibold text-[#f4d58d]">{row.pricing}</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">{row.notes}</p>
          </article>
        ))}
      </div>

      <div className="mt-8 rounded-3xl border border-white/10 bg-black/20 p-6">
        <h2 className="font-headline text-3xl text-ivory">Install Notes</h2>
        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-300">
          <li>Confirm color blend, flake system, and scope before install day.</li>
          <li>Verify moisture, crack repair needs, and any substrate prep adders before final confirmation.</li>
          <li>Send finished customers to the thank-you page after scheduling if you want a simple next-step handoff.</li>
        </ul>
      </div>
    </section>
  );
}