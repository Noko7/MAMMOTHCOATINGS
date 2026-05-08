import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { links } from "@/lib/site-data";

export default function ThankYouPage() {
  return (
    <>
      <SiteHeader />
      <main className="pb-24">
        <section className="relative overflow-hidden px-4 py-20 md:px-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(47,143,232,0.18),transparent_42%)]" />
          <div className="relative mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-black/20 p-8 text-center shadow-2xl shadow-black/40 md:p-12">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-accent">Thank You</p>
            <h1 className="mt-4 font-headline text-6xl leading-none text-ivory md:text-8xl">
              You&rsquo;re Booked.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
              Your appointment request is in. We&rsquo;ll review the project details, confirm the scope, and follow up if anything else is needed before your visit.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/" className="cta-primary text-base">
                Back to Homepage
              </Link>
              <a href={links.call} className="cta-secondary text-base">
                Call Now
              </a>
              <a href={links.text} className="cta-secondary text-base">
                Text Us
              </a>
            </div>

            <div className="mt-10 grid gap-4 text-left md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-accent">Next Step</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  We confirm scheduling details and make sure the project scope is clear before the appointment.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-accent">Questions</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Need to change something? Call or text and we&rsquo;ll update the appointment details quickly.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-accent">Prep</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Have photos, dimensions, and any known concrete issues ready so the appointment stays productive.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}