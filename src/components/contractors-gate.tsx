"use client";

import { useState } from "react";

const CONTRACTOR_PASSWORD = "EpoxyFlooring";
const STORAGE_KEY = "mammoth-contractors-unlocked";

type Phase = "1" | "2";

type MaterialCost = {
  key: string;
  label: string;
  cost: number;
  note: string;
  isBase?: boolean;
};

const matCosts: MaterialCost[] = [
  { key: "base", label: "Epoxy base coat (Rockhard USA 3 gal)", cost: 185, note: "1-2 kits depending on sqft", isBase: true },
  { key: "pigment", label: "Pigment (solid color)", cost: 45, note: "500ml" },
  { key: "flakes", label: "Flake chips (Torginol)", cost: 138, note: "1 box covers ~400sqft" },
  { key: "topcoat", label: "Polyaspartic topcoat (Rockhard Poly 2 gal)", cost: 240, note: "1 kit" },
  { key: "tools", label: "Roller, squeegee, spike shoes", cost: 75, note: "consumables per job" },
  { key: "grinding", label: "Diamond grinding pads (wear)", cost: 50, note: "per job estimate" },
];

function fmt(n: number) {
  return `$${Math.round(n).toLocaleString()}`;
}

export function ContractorsGate() {
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(
    () => typeof window !== "undefined" && window.sessionStorage.getItem(STORAGE_KEY) === "true"
  );
  const [error, setError] = useState("");
  const [price, setPrice] = useState(2500);
  const [depositPct, setDepositPct] = useState(50);
  const [phase, setPhase] = useState<Phase>("1");

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

  const deposit = (price * depositPct) / 100;
  const yourFee = phase === "1" ? 500 : price * 0.2;
  const depToContractor = deposit - yourFee;
  const finalToContractor = price - deposit;
  const contractorTotal = price - yourFee;

  const sqft = Math.round(price / 5.5);
  const kitsNeeded = sqft > 350 ? 2 : 1;
  const totalMat = matCosts.reduce((sum, item) => {
    if (item.isBase) {
      return sum + item.cost * kitsNeeded;
    }
    return sum + item.cost;
  }, 0);

  const contractorProfit = contractorTotal - totalMat;
  const hoursEst = sqft > 350 ? 10 : 7;
  const hourlyRate = Math.round(contractorProfit / hoursEst);
  const depositCoversMaterials = depToContractor >= totalMat;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:px-8">
      <div className="mb-8 rounded-3xl border border-blue-accent/30 bg-blue-accent/10 p-6">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-accent">
          Internal Use
        </p>
        <h1 className="mt-2 font-headline text-5xl text-ivory">MammothCoat Cost Model Calculator</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300">
          Adjust the job price and see how the money splits using your cost model and real XPS material assumptions.
        </p>
      </div>

      <div className="mb-6 grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 md:grid-cols-3">
        <div>
          <label htmlFor="job-price" className="mb-2 block text-sm font-semibold text-slate-300">Job price</label>
          <input
            id="job-price"
            type="range"
            min={1200}
            max={8000}
            step={100}
            value={price}
            onChange={(event) => setPrice(Number(event.target.value))}
            className="w-full"
          />
          <p className="mt-2 text-lg font-semibold text-ivory">{fmt(price)}</p>
        </div>

        <div>
          <label htmlFor="deposit-pct" className="mb-2 block text-sm font-semibold text-slate-300">Deposit %</label>
          <input
            id="deposit-pct"
            type="range"
            min={30}
            max={60}
            step={5}
            value={depositPct}
            onChange={(event) => setDepositPct(Number(event.target.value))}
            className="w-full"
          />
          <p className="mt-2 text-lg font-semibold text-ivory">{depositPct}%</p>
        </div>

        <div>
          <label htmlFor="phase" className="mb-2 block text-sm font-semibold text-slate-300">Phase</label>
          <select
            id="phase"
            value={phase}
            onChange={(event) => setPhase(event.target.value as Phase)}
            className="w-full rounded-xl border border-white/20 bg-black/30 px-3 py-2 text-ivory"
          >
            <option value="1">Jobs 1-5 ($500 flat)</option>
            <option value="2">Jobs 6+ (20%)</option>
          </select>
        </div>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <article className="rounded-2xl border border-white/10 bg-black/25 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">Your Take</p>
          <p className="mt-2 text-3xl font-bold text-ivory">{fmt(yourFee)}</p>
          <p className="mt-1 text-xs text-slate-400">{phase === "1" ? "flat fee" : `${Math.round((yourFee / price) * 100)}% of job`}</p>
        </article>
        <article className="rounded-2xl border border-white/10 bg-black/25 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">Contractor Total</p>
          <p className="mt-2 text-3xl font-bold text-ivory">{fmt(contractorTotal)}</p>
          <p className="mt-1 text-xs text-slate-400">before materials</p>
        </article>
        <article className="rounded-2xl border border-white/10 bg-black/25 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">Est. Material Cost</p>
          <p className="mt-2 text-3xl font-bold text-ivory">{fmt(totalMat)}</p>
          <p className="mt-1 text-xs text-slate-400">~{sqft} sqft estimate</p>
        </article>
        <article className="rounded-2xl border border-white/10 bg-black/25 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">Contractor Profit</p>
          <p className={`mt-2 text-3xl font-bold ${contractorProfit >= 0 ? "text-emerald-300" : "text-red-300"}`}>
            {fmt(contractorProfit)}
          </p>
          <p className="mt-1 text-xs text-slate-400">after materials</p>
        </article>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 lg:col-span-1">
          <h2 className="font-headline text-3xl text-ivory">Payment Flow</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-2">
              <span>Customer deposit ({depositPct}%)</span>
              <span className="font-semibold text-ivory">{fmt(deposit)}</span>
            </div>
            <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-2">
              <span>Your fee deducted</span>
              <span className="font-semibold text-emerald-300">-{fmt(yourFee)}</span>
            </div>
            <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-2">
              <span>Deposit remainder to contractor</span>
              <span className="font-semibold text-ivory">{fmt(depToContractor)}</span>
            </div>
            <div className="flex items-start justify-between gap-3 pb-1">
              <span>Final payment on completion</span>
              <span className="font-semibold text-ivory">{fmt(finalToContractor)}</span>
            </div>
            <p className={`rounded-xl px-3 py-2 text-xs font-semibold ${depositCoversMaterials ? "bg-emerald-950/40 text-emerald-200" : "bg-red-950/40 text-red-200"}`}>
              {depositCoversMaterials ? "Deposit remainder covers estimated materials." : "Deposit remainder is below estimated materials."}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 lg:col-span-1">
          <h2 className="font-headline text-3xl text-ivory">Material Costs</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            {matCosts.map((item) => {
              const cost = item.isBase ? item.cost * kitsNeeded : item.cost;
              return (
                <div key={item.key} className="flex items-start justify-between gap-3 border-b border-white/10 pb-2">
                  <div>
                    <p>{item.label}{item.isBase && kitsNeeded > 1 ? " x2" : ""}</p>
                    <p className="text-xs text-slate-400">{item.note}</p>
                  </div>
                  <span className="font-semibold text-ivory">{fmt(cost)}</span>
                </div>
              );
            })}
            <div className="flex items-start justify-between gap-3 pt-2 text-base font-semibold text-ivory">
              <span>Total estimated materials</span>
              <span>{fmt(totalMat)}</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 lg:col-span-1">
          <h2 className="font-headline text-3xl text-ivory">Contractor Analysis</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-2">
              <span>Contractor gross from job</span>
              <span className="font-semibold text-ivory">{fmt(contractorTotal)}</span>
            </div>
            <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-2">
              <span>Minus materials</span>
              <span className="font-semibold text-red-300">-{fmt(totalMat)}</span>
            </div>
            <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-2">
              <span>Contractor net profit</span>
              <span className={`font-semibold ${contractorProfit >= 0 ? "text-emerald-300" : "text-red-300"}`}>{fmt(contractorProfit)}</span>
            </div>
            <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-2">
              <span>Estimated labor hours</span>
              <span className="font-semibold text-ivory">~{hoursEst} hrs</span>
            </div>
            <div className="flex items-start justify-between gap-3 pt-1">
              <span>Effective hourly rate</span>
              <span className={`font-semibold ${hourlyRate > 50 ? "text-emerald-300" : "text-red-300"}`}>${hourlyRate}/hr</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}