<div align="center">

<a href="https://dhruvgupta.co">
<picture>
  <source media="(prefers-color-scheme: light)" srcset="dhruv-portfolio/docs/readme/banner-light.svg">
  <img src="dhruv-portfolio/docs/readme/banner-dark.svg" alt="Dhruv Gupta, Full Stack Developer and AI/ML Engineer. I build scalable web applications and intelligent systems. dhruvgupta.co" width="100%">
</picture>
</a>

<picture>
  <source media="(prefers-color-scheme: light)" srcset="dhruv-portfolio/docs/readme/stack-light.svg">
  <img src="dhruv-portfolio/docs/readme/stack-dark.svg" alt="Next.js 16, React 19, TypeScript, Tailwind CSS 4, hosted on Vercel, domain on Cloudflare" width="100%">
</picture>

</div>

<h3><picture>
  <source media="(prefers-color-scheme: light)" srcset="dhruv-portfolio/docs/readme/h-preview-light.svg">
  <img src="dhruv-portfolio/docs/readme/h-preview-dark.svg" alt="Preview" width="100%">
</picture></h3>

<picture>
  <source media="(prefers-color-scheme: light)" srcset="dhruv-portfolio/docs/screenshots/home-light.jpg">
  <img src="dhruv-portfolio/docs/screenshots/home-dark.jpg" alt="The home page: DHRUV GUPTA in huge condensed capitals beside a pixel-art portrait made of square tiles." width="100%">
</picture>

<table>
  <tr>
    <td width="50%"><img src="dhruv-portfolio/docs/screenshots/projects.jpg" alt="The Projects page: a numbered list of five builds beside a honeycomb illustration."></td>
    <td width="50%"><img src="dhruv-portfolio/docs/screenshots/skills.jpg" alt="The Skills page: a bento of skill groups with small diagrams."></td>
  </tr>
  <tr>
    <td width="50%"><img src="dhruv-portfolio/docs/screenshots/career.jpg" alt="The Career page: study, work, contests, projects and certificates on one shared timeline."></td>
    <td width="50%"><img src="dhruv-portfolio/docs/screenshots/not-found.jpg" alt="The 404 page: the dead address in a bordered cell beside six cells for the real pages."></td>
  </tr>
</table>

<h3><picture>
  <source media="(prefers-color-scheme: light)" srcset="dhruv-portfolio/docs/readme/h-highlights-light.svg">
  <img src="dhruv-portfolio/docs/readme/h-highlights-dark.svg" alt="Highlights" width="100%">
</picture></h3>

<picture>
  <source media="(prefers-color-scheme: light)" srcset="dhruv-portfolio/docs/readme/highlights-light.svg">
  <img src="dhruv-portfolio/docs/readme/highlights-dark.svg" alt="Four highlights. 4,096 tiles: the hero is my avatar, redrawn in raw WebGL2. Live GitHub: private work is a number, never a name. A kind form: errors you can jump to, and bots meet a honeypot. A useful 404: it lights up the closest real page." width="100%">
</picture>

<h3><picture>
  <source media="(prefers-color-scheme: light)" srcset="dhruv-portfolio/docs/readme/h-design-light.svg">
  <img src="dhruv-portfolio/docs/readme/h-design-dark.svg" alt="Design" width="100%">
</picture></h3>

<picture>
  <source media="(prefers-color-scheme: light)" srcset="dhruv-portfolio/docs/readme/themes-light.svg">
  <img src="dhruv-portfolio/docs/readme/themes-dark.svg" alt="Two themes, one accent, nothing decorative. Telemetry (dark): background 0c0a08, text efece7, accent ff582d. Print (light): background f2f0e9, text 0e0c0a, accent d60400." width="100%">
</picture>

<h3><picture>
  <source media="(prefers-color-scheme: light)" srcset="dhruv-portfolio/docs/readme/h-start-light.svg">
  <img src="dhruv-portfolio/docs/readme/h-start-dark.svg" alt="Get started" width="100%">
</picture></h3>

```bash
git clone https://github.com/Dhruv-413/Dhruv.git      # Node.js 20.9 or later
cd Dhruv/dhruv-portfolio
npm install
cp .env.example .env.local                            # then fill it in, below
npm run dev                                           # http://localhost:3000
```

```bash
# .env.local
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=     # required, even to build (placeholders are fine)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=     # required
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=    # required
GITHUB_TOKEN=                       # optional, server-only: powers /github
GITHUB_USERNAME=Dhruv-413           # optional
NEXT_PUBLIC_SITE_URL=               # production address, no trailing slash
```

<h3><picture>
  <source media="(prefers-color-scheme: light)" srcset="dhruv-portfolio/docs/readme/h-more-light.svg">
  <img src="dhruv-portfolio/docs/readme/h-more-dark.svg" alt="More" width="100%">
</picture></h3>

<details>
<summary><b>Contact email (EmailJS)</b></summary>

Paste [`emailjs-contact-template.html`](dhruv-portfolio/docs/emailjs-contact-template.html) into your EmailJS template. Set **Subject** to `Portfolio: {{subject}}`, **From Name** to `{{name}}` and **Reply To** to `{{email}}`. In the dashboard, limit allowed origins and turn on rate limiting.

</details>

<details>
<summary><b>Change the content</b></summary>

- `dhruv-portfolio/src/data/*.json`: projects, skills, timeline, certificates
- `dhruv-portfolio/src/lib/constants.ts`: name, links, email, availability
- `dhruv-portfolio/public/Dhruv_resume.pdf`: résumé

</details>

<details>
<summary><b>Deploy</b></summary>

Vercel, from `main`, with the domain on Cloudflare. For your own copy: set the Root Directory to `dhruv-portfolio`, add the variables above, then add your domain in Vercel and its DNS records in Cloudflare.

</details>

<details>
<summary><b>Where things live</b></summary>

```text
dhruv-portfolio/
├── DESIGN.md              # design contract and decision log
├── docs/                  # EmailJS template, README art
├── public/                # résumé, portrait, manifest, app icons
└── src/
    ├── app/               # routes, metadata, icons, share images
    ├── components/        # features/, shared/, ui/
    ├── data/              # content as JSON
    └── lib/               # github/, schema/, email/, constants.ts
```

</details>

<picture>
  <source media="(prefers-color-scheme: light)" srcset="dhruv-portfolio/docs/readme/footer-light.svg">
  <img src="dhruv-portfolio/docs/readme/footer-dark.svg" alt="End of file. dhruvgupta.co" width="100%">
</picture>
