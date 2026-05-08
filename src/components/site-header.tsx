"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { CalendlyModalTrigger } from "@/components/calendly-modal-trigger";
import { links, locationKeys, locations } from "@/lib/site-data";
import type { LocationKey } from "@/lib/site-data";

type SiteHeaderProps = {
  activeLocation?: LocationKey;
};

export function SiteHeader({ activeLocation }: SiteHeaderProps) {
  const quoteHref = activeLocation ? "#quote" : links.calendly;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        {/* ── Logo ── */}
        <Link href="/" className="logo-lockup" onClick={() => setMenuOpen(false)}>
          <Image
            src="/images/Logo/Mammoth_Coatings.png"
            alt="Mammoth Coatings logo"
            width={400}
            height={400}
            className="logo-img"
            priority
          />
        </Link>

        {/* ── Desktop nav ── */}
        <nav className="location-nav" aria-label="Locations">
          {activeLocation ? (
            <Link href="/" className="nav-pill" onClick={() => setMenuOpen(false)}>
              Homepage
            </Link>
          ) : null}
          {locationKeys.map((key) => (
            <Link
              key={key}
              href={`/${key}`}
              className={`nav-pill${activeLocation === key ? " nav-pill--active" : ""}`}
            >
              {locations[key].city}
            </Link>
          ))}
        </nav>

        {/* ── Desktop CTAs ── */}
        <div className="header-ctas">
          {activeLocation ? (
            <CalendlyModalTrigger
              url={links.installationCalendly}
              buttonLabel="Installation Appointment"
              title="Schedule Your Installation Appointment"
              description="Choose your install scheduling slot without leaving the site."
              className="cta-secondary cta-sm"
            />
          ) : null}
          <a href={links.call} className="hdr-call">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
            </svg>
            <span>(919) 919-2381</span>
          </a>
          <a href={quoteHref} className="hdr-quote">
            Get Free Quote
          </a>
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          className="hamburger"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className={`ham-bar${menuOpen ? " ham-bar--open-1" : ""}`} />
          <span className={`ham-bar${menuOpen ? " ham-bar--open-2" : ""}`} />
          <span className={`ham-bar${menuOpen ? " ham-bar--open-3" : ""}`} />
        </button>
      </div>

      {/* ── Mobile drawer ── */}
      {menuOpen && (
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation">
          <nav className="mobile-nav">
            {activeLocation ? (
              <Link href="/" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
                Homepage
              </Link>
            ) : null}
            {locationKeys.map((key) => (
              <Link
                key={key}
                href={`/${key}`}
                className={`mobile-nav-link${activeLocation === key ? " mobile-nav-link--active" : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                {locations[key].city}
              </Link>
            ))}
          </nav>
          <div className="mobile-menu-ctas">
            {activeLocation ? (
              <CalendlyModalTrigger
                url={links.installationCalendly}
                buttonLabel="Installation Appointment"
                title="Schedule Your Installation Appointment"
                description="Choose your install scheduling slot without leaving the site."
                className="cta-secondary"
                onOpen={() => setMenuOpen(false)}
              />
            ) : null}
            <a href={links.call} className="hdr-call" onClick={() => setMenuOpen(false)}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
              </svg>
              Call Now
            </a>
            <a href={links.text} className="cta-secondary" onClick={() => setMenuOpen(false)}>Text Now</a>
            <a href={quoteHref} className="hdr-quote" onClick={() => setMenuOpen(false)}>Get Free Quote</a>
          </div>
        </div>
      )}
    </header>
  );
}
