import Image from "next/image";
import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { links, locationKeys, locations } from "@/lib/site-data";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pb-6 pt-10 md:pt-14">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(47,143,232,0.18),transparent_45%)]" />
          <div className="relative mx-auto max-w-6xl px-4 text-center md:px-8">
            <div className="mb-1 flex justify-center">
              <Image
                src="/images/Logo/Mammoth_Coatings.png"
                alt="Mammoth Coatings Epoxy Flooring"
                width={520}
                height={520}
                className="h-auto w-full max-w-[280px] md:max-w-[360px]"
                priority
              />
            </div>
            <span className="mb-4 inline-block text-xs font-bold uppercase tracking-[0.22em] text-blue-accent">
              Raleigh · Apex · Durham · More Coming Soon
            </span>
            <h1 className="mx-auto mb-5 max-w-4xl font-headline text-6xl leading-[0.92] text-ivory md:text-8xl">
              Floors You&rsquo;ll Love. Done in One Day.
            </h1>
            <p className="mx-auto mb-8 max-w-xl text-lg leading-relaxed text-slate-300">
              Professional epoxy and polyaspartic floor coatings for garages, patios, and commercial spaces across North Carolina.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a href={links.calendly} className="cta-primary text-base">Get Free Quote</a>
              <a href={links.call} className="cta-secondary text-base">Call (919) 919-2381</a>
            </div>
          </div>
        </section>

        {/* Location picker */}
        <section className="mx-auto w-full max-w-6xl px-4 pb-20 md:px-8">
          <span className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-slate-400">
            Select Your Location
          </span>
          <h2 className="mb-8 font-headline text-4xl text-ivory">Your City, Your Floor</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {locationKeys.map((key) => {
              const loc = locations[key];
              return (
                <Link
                  key={key}
                  href={`/${key}`}
                  className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-blue-accent/50 hover:bg-white/8"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={loc.heroImage}
                      alt={`${loc.city} epoxy flooring`}
                      fill
                      sizes="(max-width:768px) 100vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-blue-accent">
                      North Carolina
                    </span>
                    <h3 className="mt-1 font-headline text-4xl text-ivory">{loc.city}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">{loc.description}</p>
                    <span className="mt-4 inline-block text-sm font-bold uppercase tracking-[0.12em] text-ivory opacity-60 transition group-hover:opacity-100">
                      View {loc.city} Page →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <footer className="border-t border-white/10 bg-black/20">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-8 md:px-8">
            <Image
              src="/images/Logo/Mammoth_Coatings.png"
              alt="Mammoth Coatings"
              width={220}
              height={220}
              className="h-auto w-28 md:w-36"
            />
            <p className="text-right text-xs font-semibold uppercase tracking-[0.14em] text-slate-300">
              Mammoth Coatings · Epoxy Flooring
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
