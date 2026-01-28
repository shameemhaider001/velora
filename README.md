Velora — Static Website

This folder contains a small static site for the Velora clothing brand.

Quick local preview

Windows / macOS / Linux (uses Node's `serve` or Python):

```bash
# Option A: with Node (recommended)
# install once: npm install -g serve
serve -s . -l 8000

# Option B: with Python 3 (no install)
python -m http.server 8000
```

Open http://localhost:8000

Deployment options

1) GitHub Pages (custom domain)
- Create a GitHub repo and push this folder.
- Add a `CNAME` file (already included) containing `velora.com`.
- In the repo Settings > Pages, choose the branch/`/ (root)` as the publishing source.
- Wait a few minutes for the site to be published. Configure DNS A records for `velora.com` (see registrar) to GitHub Pages IP addresses.

2) Netlify
- Drag & drop this folder on https://app.netlify.com/drop or connect your Git repo.
- Set `Publish directory` to `/` (root). No build command needed for this static site.
- Add the custom domain `velora.com` in Site settings -> Domain management and follow Netlify's DNS instructions.
- A `netlify.toml` is included to help Netlify detect the site.

3) Vercel
- Import the repository into Vercel (https://vercel.com/import) and deploy.
- No build command is required for a plain static site. Use `./` as the output.
- Add `velora.com` as a custom domain in Vercel settings and follow DNS steps.

Files added for deployment convenience

- `CNAME` — contains `velora.com` for GitHub Pages
- `netlify.toml` — Netlify config (publish directory)
- `vercel.json` — Vercel static configuration
- `package.json` — small helper with `start` script using `serve`

Notes about DNS & custom domain

- After adding `velora.com` to your host (Netlify/Vercel/GitHub Pages), update your domain registrar's DNS records.
- For GitHub Pages: configure A records to GitHub's IPs; add the `www` CNAME to `username.github.io` if needed.
- For Netlify/Vercel: follow their DNS instructions (often easiest — they can manage DNS for you).

Need me to:
- Create a Git repo in this folder and push it to GitHub (I can do this if you provide credentials/approve creating a remote repo), or
- Configure a GitHub Actions workflow to auto-deploy to GitHub Pages.

Which deployment target would you like me to set up next? (GitHub Pages, Netlify, or Vercel)