# DNS Configuration for mammothcoat.com on Vercel
# This file documents the DNS setup for the Mammoth Coatings website

## Primary Domain Setup

**Domain:** mammothcoat.com
**Hosting:** Vercel
**SSL/TLS:** Automatic (Let's Encrypt)

---

## Option 1: Vercel Nameservers (Recommended)

Use these nameservers in your domain registrar:

1. `ns1.vercel-dns.com`
2. `ns2.vercel-dns.com`

**Steps:**
1. Log into your domain registrar (GoDaddy, Namecheap, Google Domains, etc.)
2. Find "Nameservers" or "DNS Settings"
3. Replace existing nameservers with the ones above
4. Save changes
5. Wait 5-30 minutes for DNS propagation

---

## Option 2: Manual DNS Records

If you prefer to keep your current nameservers, add these DNS records:

### A Records (IPv4)
```
Name:  @
Type:  A
Value: 76.76.19.132
TTL:   3600
```

### AAAA Records (IPv6)
```
Name:  @
Type:  AAAA
Value: 2606:4700:4700::1111
TTL:   3600
```

### CNAME Record (for www subdomain)
```
Name:  www
Type:  CNAME
Value: cname.vercel-dns.com
TTL:   3600
```

---

## Email Records (If Needed)

If you want to use email with mammothcoat.com:

```
Name:  @
Type:  MX
Value: 10 mx.zoho.com
TTL:   3600
```

(Adjust based on your email provider)

---

## Verification

After adding DNS records, verify propagation:

**Online Tools:**
- https://dnschecker.org
- https://www.whatsmydns.net/
- https://mxtoolbox.com/

**Command Line:**
```bash
nslookup mammothcoat.com
dig mammothcoat.com
```

Look for Vercel's IP addresses in the results.

---

## SSL/TLS Certificate

Vercel handles SSL/TLS automatically:
- Certificate issuer: Let's Encrypt
- Renewal: Automatic
- HTTPS enforcement: Automatic
- Mixed content: Blocked (secure by default)

No action needed from your end.

---

## Expected Timeline

| Step | Time |
|------|------|
| DNS records added | Immediate |
| DNS propagation begins | 1-2 minutes |
| Global propagation | 5-30 minutes |
| SSL certificate issued | 5-10 minutes (after DNS resolves) |
| Site fully live | ~30 minutes (typical) |

---

## Verification Steps

Once DNS propagates, verify your setup:

1. **HTTPS Working:**
   ```bash
   curl -I https://mammothcoat.com
   ```
   Should return 200 and show Vercel headers.

2. **All Pages Accessible:**
   - https://mammothcoat.com (Home)
   - https://mammothcoat.com/raleigh (Raleigh)
   - https://mammothcoat.com/apex (Apex)
   - https://mammothcoat.com/durham (Durham)

3. **Security Check:**
   - Green lock icon in browser
   - SSL/TLS certificate valid
   - No mixed content warnings

4. **Performance Check:**
   - Visit https://pagespeed.web.dev/
   - Enter: mammothcoat.com
   - Check Lighthouse scores

---

## Troubleshooting

### DNS Not Resolving

**Symptoms:** "Site can't be reached" or "ERR_NAME_NOT_RESOLVED"

**Solutions:**
1. Wait longer (DNS can take up to 48 hours globally)
2. Clear your browser cache or try incognito mode
3. Use different DNS resolver: 8.8.8.8 (Google) or 1.1.1.1 (Cloudflare)
4. Check at https://dnschecker.org for global propagation status

### SSL Certificate Not Issuing

**Symptoms:** "NET::ERR_CERT_AUTHORITY_INVALID"

**Solutions:**
1. Ensure DNS records are correctly pointing to Vercel
2. Wait 10-15 minutes after DNS resolves
3. Check Vercel dashboard for certificate status
4. Contact Vercel support if issue persists

### Site Shows 404

**Symptoms:** Page loads but shows "Not Found"

**Solutions:**
1. Ensure all routes are deployed (Home + 3 locations)
2. Check Vercel deployment logs
3. Try (https://mammoth-coatings.vercel.app) to test without custom domain
4. If vercel subdomain works, DNS is the issue

### Slow Performance

**Symptoms:** Pages load slowly from certain locations

**Solutions:**
1. Vercel CDN will improve performance globally over time
2. Images are already optimized
3. Check browser DevTools Network tab
4. Run PageSpeed Insights to identify bottlenecks

---

## Support

- **Vercel Docs:** https://vercel.com/docs/concepts/projects/domains
- **DNS Propagation Checker:** https://dnschecker.org/
- **SSL Certificate Issues:** https://vercel.com/support

---

## Configuration Checklist

- [ ] Domain registered (mammothcoat.com)
- [ ] Vercel project created and deployed
- [ ] DNS nameservers OR manual records added
- [ ] DNS propagation verified (~5-30 min)
- [ ] HTTPS accessible
- [ ] All pages loading (Home + 3 locations)
- [ ] Images loading correctly
- [ ] Mobile responsive working
- [ ] CTAs functional (Calendly, Call, Text)
- [ ] Performance acceptable (Lighthouse 90+)

---

**Deployed by:** GitHub Copilot  
**Date:** May 4, 2026  
**Status:** ✅ Ready for DNS configuration and deployment
