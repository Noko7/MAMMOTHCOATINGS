import Image from "next/image";

import { BeforeAfterSlider } from "@/components/before-after-slider";
import { CalendlyInline } from "@/components/calendly-inline";
import { GalleryCarousel } from "@/components/gallery-carousel";
import { SiteHeader } from "@/components/site-header";
import {
  galleryImages,
  links,
  locations,
  polyasparticPoints,
  services,
  testimonials,
  type LocationKey,
} from "@/lib/site-data";

type LocationPageProps = {
  locationKey: LocationKey;
};

const processSteps = [
  {
    label: "Free Assessment",
    body: "We evaluate the surface, moisture, and condition, then give transparent pricing.",
  },
  {
    label: "Prep and Repair",
    body: "We grind, repair, and prep concrete correctly so coatings bond and last.",
  },
  {
    label: "Install and Finish",
    body: "Epoxy or polyaspartic system installed with a clean, durable finish.",
  },
];

function SharedCtaBar() {
  return (
    <div className="flex flex-wrap gap-3">
      <a href="#quote" className="cta-primary text-base">
        Get Free Quote
      </a>
      <a href={links.call} className="cta-secondary text-base">
        Call Now
      </a>
      <a href={links.text} className="cta-secondary text-base">
        Text Now
      </a>
    </div>
  );
}

export function LocationPage({ locationKey }: LocationPageProps) {
  const location = locations[locationKey];
  const primaryServices = services.filter((service) => service.tier === "primary");
  const secondaryServices = services.filter((service) => service.tier !== "primary");

  return (
    <>
      <SiteHeader activeLocation={locationKey} />

      <main className="pb-24 md:pb-0">
        <section className="relative overflow-hidden py-14 md:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_30%,rgba(47,143,232,0.16),transparent_48%)]" />
          <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-4 md:px-8 lg:grid-cols-2 lg:items-center">
            <div className="flex justify-center lg:col-span-2">
              <Image
                src="/images/Logo/Mammoth_Coatings.png"
                alt="Mammoth Coatings Epoxy Flooring"
                width={520}
                height={520}
                className="h-auto w-full max-w-[330px] md:max-w-[420px]"
                priority
              />
            </div>
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-accent">
                Serving {location.city} and surrounding areas
              </p>
              <h1 className="mb-5 font-headline text-5xl leading-[0.95] text-ivory md:text-7xl">
                {location.title}
              </h1>
              <p className="mb-8 max-w-lg text-lg text-slate-300">{location.description}</p>
              <SharedCtaBar />
              <div className="mt-8 grid max-w-sm grid-cols-3 gap-3">
                <div className="stat-card text-center">
                  <p className="stat-value">1 Day</p>
                  <p className="stat-label">Install</p>
                </div>
                <div className="stat-card text-center">
                  <p className="stat-value">15+ yrs</p>
                  <p className="stat-label">Durability</p>
                </div>
                <div className="stat-card text-center">
                  <p className="stat-value">5.0</p>
                  <p className="stat-label">Rated</p>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50">
              <Image
                src={location.heroImage}
                alt={`${location.city} epoxy flooring project`}
                width={1200}
                height={900}
                className="h-full w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-black/20">
          <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-5 md:px-8">
            <p className="font-headline text-2xl text-blue-accent">Why Polyaspartic?</p>
            <div className="flex flex-wrap gap-4">
              {polyasparticPoints.map((point) => (
                <span key={point} className="flex items-center gap-2 text-sm font-semibold text-ivory">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-accent text-[10px] font-black text-black">
                    ✓
                  </span>
                  {point}
                </span>
              ))}
            </div>
            <a href="#quote" className="cta-primary cta-sm">
              Book Now
            </a>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-14 md:px-8">
          <h2 className="mb-8 font-headline text-4xl text-ivory">Before and After Results</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {location.beforeAfterPairs.map((pair) => (
              <div key={pair.label}>
                <BeforeAfterSlider
                  beforeSrc={pair.before}
                  afterSrc={pair.after}
                  beforeAlt={`${location.city} before ${pair.label}`}
                  afterAlt={`${location.city} after ${pair.label}`}
                />
                <p className="mt-2 text-center text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                  {pair.label} · Drag to Compare
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a href="#quote" className="cta-primary">
              Get My Free Quote
            </a>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 pb-14 md:px-8">
          <h2 className="mb-6 font-headline text-4xl text-ivory">Project Gallery</h2>
          <GalleryCarousel images={galleryImages} />
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 pb-14 md:px-8">
          <h2 className="mb-6 font-headline text-4xl text-ivory">Core Services</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {primaryServices.map((service) => (
              <article key={service.name} className="rounded-2xl border border-blue-accent/30 bg-blue-accent/5 p-5">
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.15em] text-blue-accent">Primary</p>
                <h3 className="mb-2 font-headline text-2xl text-ivory">{service.name}</h3>
                <p className="text-sm leading-relaxed text-slate-300">{service.description}</p>
              </article>
            ))}
            {secondaryServices.map((service) => (
              <article key={service.name} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <h3 className="mb-2 font-headline text-2xl text-ivory">{service.name}</h3>
                <p className="text-sm leading-relaxed text-slate-300">{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 pb-14 md:px-8">
          <h2 className="mb-6 font-headline text-4xl text-ivory">How It Works</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {processSteps.map((step, index) => (
              <article key={step.label} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="mb-3 font-headline text-5xl text-blue-accent">{index + 1}</p>
                <h3 className="mb-2 font-headline text-2xl text-ivory">{step.label}</h3>
                <p className="text-sm text-slate-300">{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 pb-14 md:px-8">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 className="font-headline text-4xl text-ivory">What Customers Say</h2>
            <span className="text-sm font-bold text-blue-accent">5.0 Rated</span>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.slice(0, 3).map((item) => (
              <blockquote key={`${item.name}-${item.city}`} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="mb-4 text-slate-100">&ldquo;{item.quote}&rdquo;</p>
                <footer className="text-sm font-semibold text-slate-300">
                  {item.name} · {item.city}
                </footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 pb-14 md:px-8" id="quote">
          <div className="rounded-3xl bg-ivory p-6 text-[#2b1a12] md:p-10">
            <h2 className="mb-2 font-headline text-4xl text-[#2b1a12] md:text-5xl">Get Your Free Quote</h2>
            <p className="mb-6 max-w-2xl text-[#2b1a12]/80">
              Pick a time that works for you. We review your project and give clear pricing with no pressure.
            </p>
            <div className="mb-6 flex flex-wrap gap-2">
              <a href={links.call} className="rounded-full bg-[#2b1a12] px-5 py-2.5 text-sm font-bold text-white">
                Call Now
              </a>
              <a href={links.text} className="rounded-full border-2 border-[#2b1a12] px-5 py-2.5 text-sm font-bold text-[#2b1a12]">
                Text Now
              </a>
            </div>
            <CalendlyInline url={links.calendly} />
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 pb-14 md:px-8">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="mb-2 font-headline text-3xl text-ivory">Areas We Serve Near {location.city}</h2>
            <div className="flex flex-wrap gap-2">
              {location.neighborhoods.map((place) => (
                <span key={place} className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-sm text-slate-200">
                  {place}
                </span>
              ))}
            </div>
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
              Mammoth Coatings · Epoxy Flooring · {location.city}, NC
            </p>
          </div>
        </footer>
      </main>

      <div className="mobile-bar">
        <a href="#quote" className="cta-primary flex-1 justify-center">Free Quote</a>
        <a href={links.call} className="cta-secondary flex-1 justify-center">Call</a>
        <a href={links.text} className="cta-secondary flex-1 justify-center">Text</a>
      </div>
    </>
  );
}
