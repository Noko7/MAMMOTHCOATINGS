"use client";

import { useState } from "react";

const CONTRACTOR_PASSWORD = "EpoxyFlooring";
const STORAGE_KEY = "mammoth-contractors-unlocked";

type Phase = "1" | "2";
type CoatType = "flake" | "solid" | "metallic" | "polished";

type MaterialItem = {
  name: string;
  unitCost: number;
  coversSqft: number;
  note: string;
};

type CoatData = {
  items: MaterialItem[];
  laborPerSqft: number;
  pricePerSqft: {
    low: number;
    high: number;
  };
};

const matData: Record<CoatType, CoatData> = {
  flake: {
    items: [
      { name: "Epoxy base coat (Rockhard USA 3 gal kit)", unitCost: 185, coversSqft: 350, note: "~350 sqft/kit" },
      { name: "Pigment (solid color, 500ml)", unitCost: 45, coversSqft: 9999, note: "1 per job" },
      { name: "Flake chips (Torginol collection)", unitCost: 138, coversSqft: 400, note: "~400 sqft/box" },
      { name: "Polyaspartic topcoat (Rockhard Poly 2 gal)", unitCost: 240, coversSqft: 400, note: "~400 sqft/kit" },
      { name: "Diamond grinding pads (wear per job)", unitCost: 50, coversSqft: 9999, note: "per job" },
      { name: "Rollers, squeegee, spike shoes", unitCost: 75, coversSqft: 9999, note: "consumables" },
    ],
    laborPerSqft: 2.0,
    pricePerSqft: { low: 5, high: 8 },
  },
  solid: {
    items: [
      { name: "Epoxy base coat (Rockhard USA 3 gal kit)", unitCost: 185, coversSqft: 350, note: "~350 sqft/kit" },
      { name: "Pigment (solid color, 500ml)", unitCost: 45, coversSqft: 9999, note: "1 per job" },
      { name: "Polyaspartic topcoat (Rockhard Poly 2 gal)", unitCost: 240, coversSqft: 400, note: "~400 sqft/kit" },
      { name: "Diamond grinding pads (wear per job)", unitCost: 50, coversSqft: 9999, note: "per job" },
      { name: "Rollers, squeegee, spike shoes", unitCost: 75, coversSqft: 9999, note: "consumables" },
    ],
    laborPerSqft: 1.75,
    pricePerSqft: { low: 4, high: 7 },
  },
  metallic: {
    items: [
      { name: "Epoxy base coat (Rockhard USA 3 gal kit)", unitCost: 185, coversSqft: 350, note: "~350 sqft/kit" },
      { name: "Metallic pigment (specialty)", unitCost: 90, coversSqft: 350, note: "~350 sqft/unit" },
      { name: "Metallic topcoat (Rockhard T2000 77oz)", unitCost: 109, coversSqft: 200, note: "~200 sqft/unit" },
      { name: "Polyaspartic clear coat (Rockhard Poly 2 gal)", unitCost: 240, coversSqft: 400, note: "~400 sqft/kit" },
      { name: "Diamond grinding pads (wear per job)", unitCost: 50, coversSqft: 9999, note: "per job" },
      { name: "Rollers, squeegee, spike shoes", unitCost: 75, coversSqft: 9999, note: "consumables" },
    ],
    laborPerSqft: 2.5,
    pricePerSqft: { low: 7, high: 12 },
  },
  polished: {
    items: [
      { name: "Concrete densifier/hardener", unitCost: 120, coversSqft: 500, note: "~500 sqft/unit" },
      { name: "Polishing pads (progressive grits)", unitCost: 200, coversSqft: 400, note: "~400 sqft set" },
      { name: "Concrete sealer", unitCost: 85, coversSqft: 500, note: "~500 sqft/unit" },
      { name: "Diamond grinding pads (wear per job)", unitCost: 50, coversSqft: 9999, note: "per job" },
      { name: "Consumables and supplies", unitCost: 60, coversSqft: 9999, note: "per job" },
    ],
    laborPerSqft: 2.25,
    pricePerSqft: { low: 5, high: 9 },
  },
};

const presets = [
  { id: "1-car garage", label: "1-car garage (~250 sqft)", sqft: 250 },
  { id: "2-car garage", label: "2-car garage (~450 sqft)", sqft: 450 },
  { id: "3-car garage", label: "3-car garage (~650 sqft)", sqft: 650 },
  { id: "basement", label: "Basement (~350 sqft)", sqft: 350 },
  { id: "commercial", label: "Commercial (~800 sqft)", sqft: 800 },
] as const;

function calcMatCost(type: CoatType, sqft: number) {
  const d = matData[type];
  const details = d.items.map((item) => {
    const qty = item.coversSqft >= 9999 ? 1 : Math.ceil(sqft / item.coversSqft);
    const cost = item.unitCost * qty;
    return { ...item, qty, cost };
  });

  const total = details.reduce((sum, detail) => sum + detail.cost, 0);

  return { details, total };
}

function fmt(n: number) {
  return `$${Math.round(n).toLocaleString()}`;
}

function fmt2(n: number) {
  return `$${n.toFixed(2)}`;
}

export function ContractorsGate() {
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(
    () => typeof window !== "undefined" && window.sessionStorage.getItem(STORAGE_KEY) === "true"
  );
  const [error, setError] = useState("");
  const [sqft, setSqft] = useState(450);
  const [coat, setCoat] = useState<CoatType>("flake");
  const [markup, setMarkup] = useState(75);
  const [phase, setPhase] = useState<Phase>("1");
  const [activePreset, setActivePreset] = useState<string>("2-car garage");

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

  const d = matData[coat];
  const mat = calcMatCost(coat, sqft);
  const markedUpMat = Math.round(mat.total * (1 + markup / 100));
  const midPrice = Math.round((d.pricePerSqft.low + d.pricePerSqft.high) / 2);
  const customerPrice = midPrice * sqft;
  const yourPct = phase === "1" ? 0.25 : 0.2;
  const yourFee = Math.round(customerPrice * yourPct);
  const deposit = Math.round(customerPrice * 0.5);
  const depAfterFee = deposit - yourFee;
  const finalPay = customerPrice - deposit;
  const contractorGross = customerPrice - yourFee;
  const contractorNet = contractorGross - mat.total;
  const hours = sqft <= 300 ? 6 : sqft <= 500 ? 8 : sqft <= 700 ? 11 : 14;
  const hourly = Math.round(contractorNet / hours);
  const depCovers = depAfterFee >= mat.total;

  const ppsfTypes: Array<{ key: CoatType; label: string }> = [
    { key: "solid", label: "Solid color" },
    { key: "flake", label: "Flake epoxy" },
    { key: "metallic", label: "Metallic epoxy" },
    { key: "polished", label: "Polished concrete" },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:px-8">
      <h2 className="sr-only">MammothCoat epoxy flooring cost calculator based on square footage with real XPS material pricing</h2>

      <div className="mb-8 rounded-3xl border border-blue-accent/30 bg-blue-accent/10 p-6">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-accent">
          Internal Use
        </p>
        <h1 className="mt-2 font-headline text-5xl text-ivory">MammothCoat Job Cost Calculator</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300">
          Start with square footage - everything else calculates from real XPS/Rockhard material costs.
        </p>
      </div>

      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">Quick Presets</p>
      <div className="mb-6 flex flex-wrap gap-2">
        {presets.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => {
              setSqft(preset.sqft);
              setActivePreset(preset.id);
            }}
            className={`rounded-xl border px-4 py-2 text-sm transition ${activePreset === preset.id ? "border-blue-400 bg-blue-950/40 text-blue-100" : "border-white/20 bg-black/20 text-ivory hover:bg-white/5"}`}
          >
            {preset.label}
          </button>
        ))}
      </div>

      <div className="mb-6 grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 md:grid-cols-3">
        <div>
          <label htmlFor="sqft" className="mb-2 block text-sm font-semibold text-slate-300">Square feet</label>
          <input
            id="sqft"
            type="range"
            min={100}
            max={1500}
            step={25}
            value={sqft}
            onChange={(event) => {
              setSqft(Number(event.target.value));
              setActivePreset("");
            }}
            className="w-full"
          />
          <p className="mt-2 text-lg font-semibold text-ivory">{sqft.toLocaleString()}</p>
        </div>

        <div>
          <label htmlFor="coat" className="mb-2 block text-sm font-semibold text-slate-300">Coating type</label>
          <select
            id="coat"
            value={coat}
            onChange={(event) => setCoat(event.target.value as CoatType)}
            className="w-full rounded-xl border border-white/20 bg-black/30 px-3 py-2 text-ivory"
          >
            <option value="flake">Flake epoxy (most common)</option>
            <option value="solid">Solid color epoxy</option>
            <option value="metallic">Metallic epoxy (premium)</option>
            <option value="polished">Polished concrete</option>
          </select>
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
            <option value="1">Jobs 1-5 (25%)</option>
            <option value="2">Jobs 6+ (20%)</option>
          </select>
        </div>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <article className="rounded-2xl border border-white/10 bg-black/25 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">Customer Quote</p>
          <p className="mt-2 text-3xl font-bold text-ivory">{fmt(customerPrice)}</p>
          <p className="mt-1 text-xs text-slate-400">{fmt2(customerPrice / sqft)}/sqft</p>
        </article>
        <article className="rounded-2xl border border-white/10 bg-black/25 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">Mammoth Coat&apos;s Cut</p>
          <p className="mt-2 text-3xl font-bold text-emerald-300">{fmt(yourFee)}</p>
          <p className="mt-1 text-xs text-slate-400">{fmt2(yourFee / sqft)}/sqft</p>
        </article>
        <article className="rounded-2xl border border-white/10 bg-black/25 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">Real Material Cost</p>
          <p className="mt-2 text-3xl font-bold text-ivory">{fmt(mat.total)}</p>
          <p className="mt-1 text-xs text-slate-400">{fmt2(mat.total / sqft)}/sqft</p>
        </article>
        <article className="rounded-2xl border border-white/10 bg-black/25 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">Contractor Net</p>
          <p className={`mt-2 text-3xl font-bold ${contractorNet > 0 ? "text-emerald-300" : "text-red-300"}`}>{fmt(contractorNet)}</p>
          <p className="mt-1 text-xs text-slate-400">~{fmt(hourly)}/hr</p>
        </article>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 lg:col-span-1">
          <h2 className="font-headline text-3xl text-ivory">Material Cost Breakdown</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            {mat.details.map((m) => (
              <div key={`${m.name}-${m.note}`} className="flex items-start justify-between gap-3 border-b border-white/10 pb-2">
                <div>
                  <span>{m.name}{m.qty > 1 ? ` x${m.qty}` : ""}</span>
                  <p className="text-xs text-slate-400">{m.note}</p>
                </div>
                <span className="font-semibold text-ivory">{fmt(m.cost)}</span>
              </div>
            ))}
            <div className="flex items-start justify-between gap-3 border-t border-white/10 pt-2">
              <span className="font-semibold">Total raw materials</span>
              <span className="font-semibold text-ivory">{fmt(mat.total)}</span>
            </div>
            <div className="flex items-start justify-between gap-3 pb-1">
              <span>Marked up to customer ({markup}%)</span>
              <span className="font-semibold text-ivory">{fmt(markedUpMat)}</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 lg:col-span-1">
          <h2 className="font-headline text-3xl text-ivory">Quote Built For Customer</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-2">
              <span>Materials (marked up {markup}%)</span>
              <span className="font-semibold text-ivory">{fmt(markedUpMat)}</span>
            </div>
            <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-2">
              <span>Labor + overhead</span>
              <span className="font-semibold text-ivory">{fmt(customerPrice - markedUpMat)}</span>
            </div>
            <div className="flex items-start justify-between gap-3 border-t border-white/10 pt-2">
              <span className="font-semibold">Total customer quote ({sqft} sqft x {fmt2(customerPrice / sqft)})</span>
              <span className="text-base font-semibold text-ivory">{fmt(customerPrice)}</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 lg:col-span-1">
          <h2 className="font-headline text-3xl text-ivory">Payment Flow (50% Deposit)</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-2">
              <span>Customer deposit (50%)</span>
              <span className="font-semibold text-ivory">{fmt(deposit)}</span>
            </div>
            <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-2">
              <span>Your referral fee ({Math.round(yourPct * 100)}%)</span>
              <span className="font-semibold text-emerald-300">-{fmt(yourFee)}</span>
            </div>
            <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-2">
              <span>Deposit to contractor</span>
              <span className="font-semibold text-ivory">{fmt(depAfterFee)}</span>
            </div>
            <div className="flex items-start justify-between gap-3 pb-1">
              <span>Final payment at completion</span>
              <span className="font-semibold text-ivory">{fmt(finalPay)}</span>
            </div>
            <p className={`rounded-xl px-3 py-2 text-xs font-semibold ${depCovers ? "bg-blue-950/40 text-blue-200" : "bg-amber-950/40 text-amber-200"}`}>
              {depCovers ? "covers materials" : `contractor fronts ~${fmt(mat.total - depAfterFee)}`}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
        <h2 className="font-headline text-3xl text-ivory">Contractor Take-Home</h2>
        <div className="mt-4 space-y-3 text-sm text-slate-300">
          <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-2">
            <span>Contractor gross (quote minus your {Math.round(yourPct * 100)}%)</span>
            <span className="font-semibold text-ivory">{fmt(contractorGross)}</span>
          </div>
          <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-2">
            <span>Minus real materials</span>
            <span className="font-semibold text-red-300">-{fmt(mat.total)}</span>
          </div>
          <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-2">
            <span>Material markup profit they keep</span>
            <span className="font-semibold text-emerald-300">+{fmt(markedUpMat - mat.total)}</span>
          </div>
          <div className="flex items-start justify-between gap-3 border-t border-white/10 pt-2">
            <span className="font-semibold">Contractor net profit</span>
            <span className={`font-semibold ${contractorNet > 0 ? "text-emerald-300" : "text-red-300"}`}>{fmt(contractorNet)}</span>
          </div>
          <div className="flex items-start justify-between gap-3 pt-1">
            <span>Est. labor ({hours} hrs for {sqft} sqft, {sqft <= 500 ? "1-day" : "2-day"} job)</span>
            <span className={`font-semibold ${hourly > 60 ? "text-emerald-300" : hourly > 35 ? "text-amber-300" : "text-red-300"}`}>{fmt(hourly)}/hr effective</span>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
        <h2 className="font-headline text-3xl text-ivory">Per-square-foot Pricing Guide (What To Quote Customers)</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-4">
          {ppsfTypes.map((item) => {
            const dd = matData[item.key];
            const low = dd.pricePerSqft.low * sqft;
            const high = dd.pricePerSqft.high * sqft;
            const isCurrent = item.key === coat;

            return (
              <article key={item.key} className={`rounded-xl bg-black/20 p-4 text-center ${isCurrent ? "border-2 border-blue-400" : "border border-white/10"}`}>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">{item.label}</p>
                <p className="mt-2 text-2xl font-semibold text-ivory">{fmt2(dd.pricePerSqft.low)} - {fmt2(dd.pricePerSqft.high)}</p>
                <p className="text-xs text-slate-400">per sqft</p>
                <p className="mt-2 text-sm font-semibold text-slate-300">{fmt(low)} - {fmt(high)}</p>
                <p className="text-xs text-slate-400">for {sqft} sqft</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
