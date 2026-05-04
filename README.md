# 🦣 Mammoth Coatings - High-Conversion Epoxy Flooring Website

A fast, conversion-optimized multi-location website for Mammoth Coatings, built with Next.js and deployed on Vercel.

## Overview

This site showcases epoxy flooring and concrete coating services across three locations: **Raleigh**, **Apex**, and **Durham**, North Carolina. Each location has optimized SEO metadata and is designed for high conversion through:

- Clear CTAs: Free Quote (Calendly), Call Now, Text Now
- Social proof: Before/after galleries, testimonials
- Fast performance: Static generation, optimized images
- Professional branding: Custom color system, responsive design

**Live:** https://mammothcoat.com (staging: https://mammoth-coatings.vercel.app)

---

## Quick Start

### Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

### Build & Test Production

```bash
npm run build
npm start
```

### Code Quality

```bash
npm run lint
```

---

## Deployment

### Fastest Path: Use Deployment Script

**PowerShell:**
```powershell
.\deploy.ps1
```

**Command Prompt:**
```cmd
deploy.bat
```

Or see [DEPLOYMENT.md](DEPLOYMENT.md) for step-by-step manual instructions.

---

## Project Structure

```
src/
├── app/
│   ├── [location]/page.tsx      # Dynamic location pages (Raleigh, Apex, Durham)
│   ├── page.tsx                 # Home & location selector
│   ├── layout.tsx               # Global layout & SEO metadata
│   └── globals.css              # Brand colors & CTA styles
├── components/
│   ├── location-page.tsx        # Reusable location template
│   └── calendly-inline.tsx      # Calendly booking widget loader
└── lib/
    └── site-data.ts             # Location content, links, testimonials
public/images/                   # All project photos & logo
```

---

## Features

✅ **Multi-Location SEO**
- Dedicated pages for Raleigh, Apex, Durham
- Location-specific metadata & Open Graph
- Neighborhood-level targeting

✅ **High-Conversion Design**
- Calendly embedded quote/booking widget
- Call & SMS CTA buttons
- Before/after image galleries
- Customer testimonials
- Service overview & installation process

✅ **Performance**
- Static site generation (zero runtime JS)
- Next.js Image component for optimization
- Tailwind CSS 4 (minimal footprint)
- ~95+ Lighthouse score

✅ **Professional Branding**
- Mammoth Brown (#6B3F1D)
- Epoxy Blue (#2F8FE8) 
- Ivory White (#F2E7D5)
- Bebas Neue + Sora typography

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Build:** Turbopack (fast builds)
- **Styling:** Tailwind CSS 4
- **Fonts:** Google Fonts
- **Booking:** Calendly embed
- **Hosting:** Vercel (auto-deploy on git push)

---

## CTA Configuration

Located in `src/lib/site-data.ts`:

```typescript
export const links = {
  calendly: "https://calendly.com/mammothcoat-info/free-quote-and-surface-assessment",
  call: "tel:+19199193281",
  text: "sms:+19199193281",
};
```

---

## Color System

Edit `src/app/globals.css` to customize:

```css
:root {
  --mammoth-brown: #6b3f1d;      /* Primary brand color */
  --epoxy-blue: #2f8fe8;          /* Accent for CTAs */
  --ivory: #f2e7d5;               /* Text & light accents */
  --charcoal-start: #1c1f24;      /* Background gradient start */
  --charcoal-end: #3a3f46;        /* Background gradient end */
}
```

---

## Documentation

- **[DEPLOYMENT.md](DEPLOYMENT.md)** — Full step-by-step deployment guide
- **[LAUNCH.md](LAUNCH.md)** — Quick launch checklist & reference
- **[AGENTS.md](AGENTS.md)** — AI agent instructions (for development)
- **[CLAUDE.md](CLAUDE.md)** — Claude-specific development notes

---

## Post-Launch Tasks

- [ ] GitHub repo created and code pushed
- [ ] Vercel project deployed
- [ ] Domain (mammothcoat.com) configured
- [ ] DNS propagated (verify: https://dnschecker.org)
- [ ] All CTAs tested on mobile & desktop
- [ ] Images optimized and loading correctly
- [ ] PageSpeed Insights score checked
- [ ] Analytics configured (optional)

---

## Support

- **Vercel Docs:** https://vercel.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Calendly Support:** https://calendly.com/support

---

**Mammoth Coatings Website**  
Built with Next.js | Deployed on Vercel | Designed for conversions
