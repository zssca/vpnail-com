# Playbook · Deploy the Site

Pick the hosting target below. All commands assume the project is already built and tested locally.

## Pre-Deploy Checklist

- [ ] `npm run lint && npm run type-check`
- [ ] `npm run build` succeeds
- [ ] `npm run start` works locally (serve the static export)
- [ ] `.env.production` or platform secrets are configured

## Vercel

```bash
npm install -g vercel
vercel login
vercel --prod
```

- Confirm the project is set to **Static** (Next.js `output: 'export'`).
- After deploy, run “View Functions” to ensure no unexpected serverless functions were generated.

## Netlify

```bash
npm install -g netlify-cli
netlify login
netlify init   # once per repo
netlify deploy --build --prod
```

- Build command: `npm run build`
- Publish directory: `out`

## Generic Static Host (S3, Cloudflare Pages, GitHub Pages)

```bash
npm run build
# Upload the ./out directory to your host of choice
```

- Ensure the host serves `out/` as root.
- Configure caching headers per host recommendations.

## Post-Deploy QA

- [ ] Hit each marketing route (/, /contact, /services, etc.) on the deployed URL.
- [ ] Submit the contact form (use a test email) and confirm delivery.
- [ ] Verify metadata and social cards via `curl -I` or the relevant share debugger.
- [ ] Run Lighthouse or Pagespeed against the production URL.
- [ ] Update release notes or ticket with the deployment URL + timestamp.
