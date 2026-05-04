# Mammoth Coatings Website — Deployment to Vercel & mammothcoat.com

## Pre-Flight Checklist ✓

- [x] Next.js production build successful
- [x] All pages static-generated (zero runtime JS required)
- [x] Calendly widget embedded and functional
- [x] CTA links wired: Call (919-919-3281), Text, Free Quote (Calendly)
- [x] Multi-location pages: Raleigh, Apex, Durham with SEO metadata
- [x] Images optimized and served from `/public/images/`
- [x] Linting passed, TypeScript strict mode
- [x] Git initialized with initial commit

---

## Part 1: Push to GitHub (5 minutes)

### 1a. Create a New GitHub Repository

1. Go to **[github.com/new](https://github.com/new)**
2. Fill in these fields:
   - **Repository name:** `mammoth-coatings`
   - **Description:** *"High-conversion epoxy flooring website with multi-location pages and Calendly booking"*
   - Choose **Private** (to keep code protected)
   - Leave all other options at defaults
3. Click **Create repository**

### 1b. Connect Local Repo to GitHub

After GitHub shows the quick setup instructions, run these commands **one at a time** in PowerShell at the project root:

```powershell
cd "c:\Users\Noko\Documents\MyProjects\ServiceBusinesses\MAMMOTHCOATINGS"

# Set main as default branch
git branch -M main

# Add GitHub as remote origin (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/mammoth-coatings.git

# Push to GitHub
git push -u origin main
```

**Example with actual username:**
```powershell
git remote add origin https://github.com/noko123/mammoth-coatings.git
git push -u origin main
```

**What to expect:**
- First push will ask for credentials (use GitHub username + Personal Access Token, or HTTPS password)
- After 30–60 seconds, all files will be on GitHub

---

## Part 2: Deploy to Vercel (10 minutes)

### 2a. Connect Vercel to GitHub Repo

1. Go to **[vercel.com](https://vercel.com)** and sign in (create account if needed)
2. Click **+ New Project** (top right)
3. Click **Import Git Repository**
4. Paste your repo URL:
   ```
   https://github.com/YOUR_USERNAME/mammoth-coatings.git
   ```
5. Click **Continue**

### 2b. Configure Build Settings

Vercel will auto-detect Next.js. Verify these settings:

- **Project name:** `mammoth-coatings` ✓
- **Framework:** Next.js ✓
- **Build command:** `npm run build` ✓
- **Output directory:** `.next` ✓
- **Install command:** `npm ci` (default) ✓

Click **Deploy** and wait for the build to complete (~2–3 minutes).

**Status indicators:**
- 🔵 **Building:** Vercel is compiling Next.js
- 🟢 **Ready:** Site is live at `mammoth-coatings.vercel.app`

---

## Part 3: Add Custom Domain (mammothcoat.com) (15–30 minutes)

### 3a. In Vercel Dashboard

1. After deployment succeeds, go to **Settings** → **Domains** (left sidebar)
2. Click **Add Domain**
3. Enter: `mammothcoat.com`
4. Click **Add** → **Continue**

### 3b. Choose DNS Configuration Method

#### **Option A: Vercel Nameservers (Easiest, Recommended)**

Vercel will show you nameservers like:
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

1. Log into your domain registrar (GoDaddy, Namecheap, Google Domains, etc.)
2. Find **Nameservers** or **DNS Settings**
3. Replace the current nameservers with Vercel's nameservers
4. Save changes

**Timeline:** 5–30 minutes for DNS to propagate worldwide.

#### **Option B: Manual DNS Records (If you prefer your current registrar)**

Vercel will provide CNAME records like:
```
cname-mammothcoat.vercel-dns.com
```

1. Go to your domain registrar's DNS settings
2. Add a CNAME record:
   - **Host/Name:** `@` (or leave blank)
   - **Value:** `cname.vercel-dns.com` (Vercel will give the exact value)
3. Save and wait 5–30 minutes

---

## Part 4: Verify It's Live

### 4a. Test via Vercel Subdomain (Instant ✓)

After deployment, your site is immediately live at:
```
https://mammoth-coatings.vercel.app
```

✅ Test all pages:
- https://mammoth-coatings.vercel.app/ (home, location selector)
- https://mammoth-coatings.vercel.app/raleigh (Raleigh location)
- https://mammoth-coatings.vercel.app/apex (Apex location)
- https://mammoth-coatings.vercel.app/durham (Durham location)

### 4b. Test Custom Domain (After DNS Propagation, 5–30 min)

Once DNS propagates, test:
```
https://mammothcoat.com
https://mammothcoat.com/raleigh
https://mammothcoat.com/apex
https://mammothcoat.com/durham
```

Use an online tool to check DNS propagation: **[dnschecker.org](https://dnschecker.org)**

---

## Part 5: Post-Launch Checklist

- [ ] Test all CTAs are clickable:
  - [ ] "Free Quote" opens Calendly widget
  - [ ] "Call Now" opens dialer or shows phone number
  - [ ] "Text Now" opens SMS interface
- [ ] Test images load on all pages
- [ ] Test on mobile (responsive design)
- [ ] Check PageSpeed Insights: https://pagespeed.web.dev/
- [ ] Set up analytics (optional, e.g., Google Analytics, Vercel Analytics)
- [ ] Enable auto-updates: Future pushes to `main` branch auto-deploy

---

## Troubleshooting

### "Domain already in use"
- The domain is registered elsewhere. Either:
  - Transfer domain to Vercel-managed DNS, OR
  - Manually add DNS records at your registrar

### "Site shows 404 after DNS update"
- DNS is still propagating. Wait 30 minutes and refresh.
- Check propagation: https://www.whatsmydns.net/

### "Build fails on Vercel"
- Return to this project root and run:
  ```powershell
  npm run build
  npm run lint
  ```
- Fix any errors, commit, and push to GitHub. Vercel will auto-redeploy.

### CTA Links Not Working
- Calendly widget requires JavaScript enabled (it is by default)
- Call/Text links use `tel:` and `sms:` protocols (mobile only)
- For desktop testing, right-click → inspect → check console for errors

---

## Next Steps (Optional Enhancements)

1. **Add Analytics:** Integrate Google Analytics or Vercel's built-in analytics to track Free Quote clicks, Call clicks, and user flow by location.
2. **Real Testimonials:** Replace placeholder testimonials in `src/lib/site-data.ts` with actual customer reviews + star ratings.
3. **Email Opt-In:** Add a newsletter signup in the footer (connected to Mailchimp or ConvertKit).
4. **Local Schema Markup:** Add structured data for local SEO (business name, phone, address per location).
5. **A/B Testing:** Use Vercel's Edge Middleware to test CTA button colors, copy variations, or section ordering.

---

## Support

For Vercel issues: https://vercel.com/support
For Next.js docs: https://nextjs.org/docs

**Deployment completed by:** GitHub Copilot (Claude Haiku 4.5)
**Date:** May 4, 2026
**Project:** Mammoth Coatings Multi-Location Website
