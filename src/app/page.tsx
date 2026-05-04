import Image from "next/image";
import Link from "next/link";

import { links, locationKeys, locations } from "@/lib/site-data";

export default function Home() {
  return (
    <main className="bg-charcoal text-ivory">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(47,143,232,0.25),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(107,63,29,0.35),transparent_35%)]" />
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-10 md:px-8">
          <header className="mb-16 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/20 p-4 backdrop-blur">
            <div className="flex items-center gap-3">
              <Image
                src="/images/Logo/Mammoth_Coatings.png"
                alt="Mammoth Coatings logo"
                width={54}
                height={54}
                className="h-[54px] w-[54px] rounded-lg"
                priority
              />
              <div>
                <p className="font-headline text-3xl leading-none">Mammoth Coatings</p>
                <p className="text-xs uppercase tracking-[0.22em] text-blue-accent">Epoxy Flooring and Concrete Coatings</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <a href={links.call} className="cta-secondary">Call Now</a>
              <a href={links.text} className="cta-secondary">Text Now</a>
              <a href={links.calendly} className="cta-primary">Get Free Quote</a>
            </div>
          </header>

          <div className="max-w-4xl">
            <p className="mb-4 text-sm uppercase tracking-[0.2em] text-blue-accent">Now serving Raleigh and expanding across the Triangle</p>
            <h1 className="mb-5 font-headline text-6xl leading-[0.9] md:text-8xl">Love your floors again with premium epoxy coating systems.</h1>
            <p className="max-w-3xl text-lg text-slate-200 md:text-xl">Fast installs, polished finish, and a high-end look that lasts. Choose your location below to get a city-specific quote and schedule your free surface assessment.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-20 md:px-8">
        <h2 className="mb-7 font-headline text-4xl">Select Your Location</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {locationKeys.map((key) => {
            const location = locations[key];
            return (
              <Link key={key} href={`/${key}`} className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-blue-accent/50">
                <div className="relative h-52 w-full">
                  <Image
                    src={location.heroImage}
                    alt={`${location.city} epoxy flooring`}
                    width={900}
                    height={650}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="mb-1 text-xs uppercase tracking-[0.18em] text-blue-accent">North Carolina</p>
                  <h3 className="font-headline text-4xl">{location.city}</h3>
                  <p className="mt-2 text-sm text-slate-300">{location.description}</p>
                  <span className="mt-4 inline-flex text-sm font-semibold uppercase tracking-[0.12em] text-ivory">View Location Page</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
