import Image from "next/image";
import Link from "next/link";

import { CalendlyInline } from "@/components/calendly-inline";
import { links, locationKeys, locations, testimonials, type LocationKey } from "@/lib/site-data";

type LocationPageProps = {
  locationKey: LocationKey;
};

const services = [
  "Garage Floor Epoxy Systems",
  "Patio and Porch Coatings",
  "Commercial Concrete Resurfacing",
  "Decorative Flake Finishes",
];

const processSteps = [
  "Free inspection and moisture test",
  "Grinding, crack repair, and prep",
  "Industrial-grade epoxy and topcoat install",
];

export function LocationPage({ locationKey }: LocationPageProps) {
  const location = locations[locationKey];

  return (
    <main className="bg-charcoal text-ivory">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(47,143,232,0.22),transparent_45%),radial-gradient(circle_at_85%_5%,rgba(107,63,29,0.35),transparent_40%)]" />
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 pb-12 pt-6 md:px-8 md:pt-8 lg:grid-cols-2">
          <div className="relative z-10">
            <header className="mb-10 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/20 p-4 backdrop-blur">
              <Link href="/" className="inline-flex items-center gap-3">
                <Image
                  src="/images/Logo/Mammoth_Coatings.png"
                  alt="Mammoth Coatings logo"
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-lg"
                  priority
                />
                <div>
                  <p className="font-headline text-2xl leading-none text-ivory">Mammoth Coatings</p>
                  <p className="text-xs uppercase tracking-[0.25em] text-blue-accent">Epoxy and Concrete Coatings</p>
                </div>
              </Link>
              <nav className="hidden gap-2 md:flex">
                {locationKeys.map((key) => (
                  <Link
                    key={key}
                    href={`/${key}`}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      key === locationKey
                        ? "bg-blue-accent text-black"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {locations[key].city}
                  </Link>
                ))}
              </nav>
            </header>

            <p className="mb-3 text-sm uppercase tracking-[0.22em] text-blue-accent">Serving {location.city} and nearby communities</p>
            <h1 className="mb-5 max-w-xl font-headline text-5xl leading-[0.95] text-ivory md:text-7xl">{location.title}</h1>
            <p className="mb-8 max-w-xl text-lg text-slate-200">Built for heavy use and daily life. We install high-performance coating systems that stay beautiful, clean faster, and hold up for years.</p>

            <div className="mb-8 flex flex-wrap gap-3">
              <a href="#quote" className="cta-primary">Get Free Quote</a>
              <a href={links.call} className="cta-secondary">Call Now</a>
              <a href={links.text} className="cta-secondary">Text Now</a>
            </div>

            <div className="grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="stat-card">
                <p className="stat-value">1 Day</p>
                <p className="stat-label">Most installs complete</p>
              </div>
              <div className="stat-card">
                <p className="stat-value">15+ Years</p>
                <p className="stat-label">Expected coating life</p>
              </div>
              <div className="stat-card">
                <p className="stat-value">100%</p>
                <p className="stat-label">Satisfaction focus</p>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-end">
            <div className="relative w-full overflow-hidden rounded-3xl border border-white/15 shadow-2xl shadow-black/50">
              <Image
                src={location.heroImage}
                alt={`${location.city} epoxy flooring project`}
                width={1200}
                height={900}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-14 md:px-8">
        <div className="grid gap-4 md:grid-cols-4">
          {services.map((service) => (
            <div key={service} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <h2 className="mb-3 font-headline text-2xl text-ivory">{service}</h2>
              <p className="text-sm text-slate-300">Slip-resistant, chemical-resistant, and engineered to look polished from day one.</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-6 md:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="font-headline text-4xl text-ivory">Before and After Results</h2>
          <a href="#quote" className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-accent">Book an Assessment</a>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <article className="overflow-hidden rounded-3xl border border-white/10 bg-black/20">
            <Image
              src={location.beforeImage}
              alt={`${location.city} floor before epoxy`}
              width={1200}
              height={860}
              className="h-72 w-full object-cover"
            />
            <div className="p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Before</p>
              <p className="font-semibold">Surface wear, stains, and aging concrete</p>
            </div>
          </article>
          <article className="overflow-hidden rounded-3xl border border-white/10 bg-black/20">
            <Image
              src={location.afterImage}
              alt={`${location.city} floor after epoxy`}
              width={1200}
              height={860}
              className="h-72 w-full object-cover"
            />
            <div className="p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">After</p>
              <p className="font-semibold">Durable, glossy finish ready for daily use</p>
            </div>
          </article>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-14 md:px-8">
        <div className="grid gap-7 lg:grid-cols-3">
          {processSteps.map((step, index) => (
            <div key={step} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-accent font-black text-black">{index + 1}</p>
              <h2 className="font-headline text-3xl text-ivory">{step}</h2>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8">
        <div className="mb-5 flex items-end justify-between gap-4">
          <h2 className="font-headline text-4xl text-ivory">Trusted by Homeowners and Businesses</h2>
          <span className="text-sm uppercase tracking-[0.2em] text-blue-accent">5.0 Rated Service</span>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((item) => (
            <blockquote key={`${item.name}-${item.city}`} className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <p className="mb-4 text-slate-100">&ldquo;{item.quote}&rdquo;</p>
              <footer className="text-sm text-slate-300">{item.name} • {item.city}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-14 md:px-8" id="quote">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-[#F2E7D5] to-[#C9CDD1] p-5 text-black md:p-8">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-headline text-4xl text-[#2B1A12]">Get Your Free Quote and Surface Assessment</h2>
              <p className="max-w-2xl text-[#2B1A12]/80">Pick a time that works for you. We will review your project, provide expert recommendations, and give transparent pricing.</p>
            </div>
            <div className="flex gap-2">
              <a href={links.call} className="rounded-full bg-[#2B1A12] px-5 py-2 font-semibold text-white">Call Now</a>
              <a href={links.text} className="rounded-full border border-[#2B1A12] px-5 py-2 font-semibold text-[#2B1A12]">Text Now</a>
            </div>
          </div>
          <CalendlyInline url={links.calendly} />
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-24 pt-3 md:px-8">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="mb-2 font-headline text-3xl text-ivory">Areas We Serve Near {location.city}</h2>
          <p className="mb-4 text-sm uppercase tracking-[0.18em] text-slate-400">Local crews • Fast scheduling</p>
          <div className="flex flex-wrap gap-2">
            {location.neighborhoods.map((place) => (
              <span key={place} className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-sm">
                {place}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-white/10 bg-black/85 p-3 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-md gap-2">
          <a href="#quote" className="cta-primary flex-1 text-center">Free Quote</a>
          <a href={links.call} className="cta-secondary flex-1 text-center">Call</a>
          <a href={links.text} className="cta-secondary flex-1 text-center">Text</a>
        </div>
      </div>
    </main>
  );
}
