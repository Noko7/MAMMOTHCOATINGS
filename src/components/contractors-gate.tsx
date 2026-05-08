"use client";

import { useState } from "react";

const CONTRACTOR_PASSWORD = "EpoxyFlooring";
const STORAGE_KEY = "mammoth-contractors-unlocked";

type Phase = "1" | "2";

function fmt(n: number) {
  return `$${Math.round(n).toLocaleString()}`;
}

export function ContractorsGate() {
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(
    () => typeof window !== "undefined" && window.sessionStorage.getItem(STORAGE_KEY) === "true"
  );
  const [error, setError] = useState("");
  const [price, setPrice] = useState(2800);
  const [markup, setMarkup] = useState(75);
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

  const baseMat = 730;
  const markedUpMat = Math.round(baseMat * (1 + markup / 100));
  const laborInQuote = price - markedUpMat;
  const yourFee = phase === "1" ? 500 : Math.round(price * 0.2);
  const deposit = Math.round(price * 0.5);
  const depAfterFee = deposit - yourFee;
  const finalPay = price - deposit;
  const contractorGross = price - yourFee;
  const contractorNet = contractorGross - baseMat;
  const hours = price > 3500 ? 12 : price > 2500 ? 10 : 7;
  const hourly = Math.round(contractorNet / hours);

  const friendRev = price;
  const friendCut70 = Math.round(friendRev * 0.7);
  const friendCut60 = Math.round(friendRev * 0.6);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:px-8">
      <h2 className="sr-only">Updated MammothCoat cost model with 50-100% material markup built into job pricing</h2>

      <div className="mb-8 rounded-3xl border border-blue-accent/30 bg-blue-accent/10 p-6">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-accent">
          Internal Use
        </p>
        <h1 className="mt-2 font-headline text-5xl text-ivory">Updated Cost Model With Material Markup</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300">
          The customer quote includes materials at 50-100% markup - here is how that changes everything.
        </p>
      </div>

      <div className="mb-6 grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 md:grid-cols-3">
        <div>
          <label htmlFor="job-price" className="mb-2 block text-sm font-semibold text-slate-300">Job price</label>
          <input
            id="job-price"
            type="range"
            min={1500}
            max={8000}
            step={100}
            value={price}
            onChange={(event) => setPrice(Number(event.target.value))}
            className="w-full"
          />
          <p className="mt-2 text-lg font-semibold text-ivory">{fmt(price)}</p>
        </div>

        <div>
          <label htmlFor="material-markup" className="mb-2 block text-sm font-semibold text-slate-300">Material markup</label>
          <input
            id="material-markup"
            type="range"
            min={50}
            max={100}
            step={5}
            value={markup}
            onChange={(event) => setMarkup(Number(event.target.value))}
            className="w-full"
          />
          <p className="mt-2 text-lg font-semibold text-ivory">{markup}%</p>
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
          <p className="mt-1 text-xs text-slate-400">{phase === "1" ? "flat fee" : `20% of ${fmt(price)}`}</p>
        </article>
        <article className="rounded-2xl border border-white/10 bg-black/25 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">Material Markup Profit</p>
          <p className="mt-2 text-3xl font-bold text-ivory">{fmt(markedUpMat - baseMat)}</p>
          <p className="mt-1 text-xs text-slate-400">goes to contractor</p>
        </article>
        <article className="rounded-2xl border border-white/10 bg-black/25 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">Contractor Net</p>
          <p className={`mt-2 text-3xl font-bold ${contractorNet >= 0 ? "text-emerald-300" : "text-red-300"}`}>{fmt(contractorNet)}</p>
          <p className="mt-1 text-xs text-slate-400">~{fmt(hourly)}/hr</p>
        </article>
        <article className="rounded-2xl border border-white/10 bg-black/25 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">Customer Pays</p>
          <p className="mt-2 text-3xl font-bold text-ivory">{fmt(price)}</p>
          <p className="mt-1 text-xs text-slate-400">total quoted price</p>
        </article>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 lg:col-span-1">
          <h2 className="font-headline text-3xl text-ivory">How The Quote Is Built</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-2">
              <span>Raw material cost (your cost from XPS)</span>
              <span className="font-semibold text-ivory">{fmt(baseMat)}</span>
            </div>
            <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-2">
              <span>Materials quoted to customer ({markup}% markup)</span>
              <span className="font-semibold text-ivory">{fmt(markedUpMat)}</span>
            </div>
            <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-2">
              <span>Labor portion of quote</span>
              <span className="font-semibold text-ivory">{fmt(laborInQuote)}</span>
            </div>
            <div className="flex items-start justify-between gap-3 pb-1">
              <span>Total customer quote</span>
              <span className="font-semibold text-ivory">{fmt(price)}</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 lg:col-span-1">
          <h2 className="font-headline text-3xl text-ivory">How The Money Flows</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-2">
              <span>Customer deposit (50%)</span>
              <span className="font-semibold text-ivory">{fmt(deposit)}</span>
            </div>
            <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-2">
              <span>Your referral fee deducted</span>
              <span className="font-semibold text-emerald-300">-{fmt(yourFee)}</span>
            </div>
            <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-2">
              <span>Deposit remainder to contractor</span>
              <span className="font-semibold text-ivory">{fmt(depAfterFee)}</span>
            </div>
            <div className="flex items-start justify-between gap-3 pb-1">
              <span>Final payment at completion</span>
              <span className="font-semibold text-ivory">{fmt(finalPay)}</span>
            </div>
            <p className={`rounded-xl px-3 py-2 text-xs font-semibold ${depAfterFee >= baseMat ? "bg-blue-950/40 text-blue-200" : "bg-red-950/40 text-red-200"}`}>
              {depAfterFee >= baseMat ? "covers materials" : "below mat. cost"}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 lg:col-span-1">
          <h2 className="font-headline text-3xl text-ivory">Contractor Take-Home</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-2">
              <span>Contractor gross (job price minus your fee)</span>
              <span className="font-semibold text-ivory">{fmt(contractorGross)}</span>
            </div>
            <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-2">
              <span>Minus actual material cost</span>
              <span className="font-semibold text-red-300">-{fmt(baseMat)}</span>
            </div>
            <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-2">
              <span>Contractor keeps the markup spread</span>
              <span className="font-semibold text-emerald-300">+{fmt(markedUpMat - baseMat)}</span>
            </div>
            <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-2">
              <span>Contractor net profit</span>
              <span className={`font-semibold ${contractorNet >= 0 ? "text-emerald-300" : "text-red-300"}`}>{fmt(contractorNet)}</span>
            </div>
            <div className="flex items-start justify-between gap-3 pt-1">
              <span>Estimated hours (~{hours} hrs)</span>
              <span className={`font-semibold ${hourly > 50 ? "text-emerald-300" : hourly > 30 ? "text-amber-300" : "text-red-300"}`}>{fmt(hourly)}/hr effective</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
        <h2 className="font-headline text-3xl text-ivory">Side-by-side: your friend&apos;s model vs yours</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-slate-300">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">Pressure Washing Pride</p>
            <div className="space-y-2">
              <div className="flex justify-between gap-3"><span>Jobs 1-5: contractor keeps 60%</span><span className="font-semibold text-ivory">{fmt(friendCut60)}</span></div>
              <div className="flex justify-between gap-3"><span>Jobs 6+: contractor keeps 70%</span><span className="font-semibold text-ivory">{fmt(friendCut70)}</span></div>
              <div className="flex justify-between gap-3"><span>Owner takes (jobs 6+)</span><span className="font-semibold text-ivory">{fmt(friendRev - friendCut70)}</span></div>
              <div className="flex justify-between gap-3 text-slate-400"><span>Insurance required?</span><span>No (encouraged)</span></div>
              <div className="flex justify-between gap-3 text-slate-400"><span>Materials paid by</span><span>Contractor</span></div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-slate-300">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">MammothCoat (yours)</p>
            <div className="space-y-2">
              <div className="flex justify-between gap-3"><span>Jobs 1-5: you get flat</span><span className="font-semibold text-ivory">$500</span></div>
              <div className="flex justify-between gap-3"><span>Jobs 6+: you get 20%</span><span className="font-semibold text-ivory">{fmt(yourFee)}</span></div>
              <div className="flex justify-between gap-3"><span>Contractor net profit</span><span className="font-semibold text-ivory">{fmt(contractorNet)}</span></div>
              <div className="flex justify-between gap-3 text-slate-400"><span>Insurance required?</span><span>No (encouraged)</span></div>
              <div className="flex justify-between gap-3 text-slate-400"><span>Materials paid by</span><span>Contractor (from deposit)</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}