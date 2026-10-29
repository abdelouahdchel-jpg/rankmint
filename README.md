# RankMint - Free In-Browser SEO Toolkit

RankMint is a complete, professional, mobile-first suite of five essential SEO and web utilities. It executes 100% client-side in the user's browser with zero server uploads, zero external API costs, and zero required logins or databases.

---

## 🛠️ The 5 In-Browser Tools

1. **Image to PNG Converter (`/tools/image-to-png`)**:
   - Converts JPG, JPEG, and WebP images to PNG entirely in the browser using HTML5 Canvas.
   - Live visual preview, original and converted byte size comparison, dimension inspection, and instant download.
   - File type validation and 25 MB size limits.
   - Educational notice explicitly explaining that converting an image with an opaque background to PNG does *not* create transparency automatically.

2. **SERP Snippet Preview (`/tools/serp-preview`)**:
   - Desktop and Mobile Google search result simulators.
   - Dynamic title (~600px / 60 chars) and description (~960px / 160 chars) pixel width and character count meters with truncation alerts.
   - Real-time search query bolding simulation and date toggle.
   - Realistic Google search card styling and prominent algorithmic rewrite disclaimer.

3. **Meta Tag Generator (`/tools/meta-tag-generator`)**:
   - Generates sanitized, copyable HTML head tags for titles, descriptions, canonical links, robots directives (`noindex`, `nofollow`, `noarchive`, `nosnippet`, `max-image-preview`), Open Graph, and Twitter Cards.
   - Safe HTML attribute escaping (XSS prevention).
   - "Sync from Basic" utility and copy/download actions.
   - Clarifies which tags are essential vs optional.

4. **Schema Markup Generator (`/tools/schema-generator`)**:
   - Generates valid JSON-LD structured data for `Organization`, `WebSite`, `Article`, and `FAQPage`.
   - Real-time JSON syntax validation and error reporting.
   - Embeddable `<script type="application/ld+json">` output with copy and `.jsonld` download.
   - Disclaims any ranking guarantees or automatic rich snippet awards.

5. **Article Outline Generator (`/tools/article-outline-generator`)**:
   - Deterministic, transparent local editorial heuristics based on audience, intent, and format.
   - Generates 4 H1 options, search intent analysis, intro hooks, H2/H3 hierarchy with estimated word counts, and search-intent FAQs.
   - Copy as Markdown, copy as plain text, or download as `.md`.
   - Explicitly does *not* claim AI power or call remote LLMs.

---

## 📚 8 Original Technical Blog Articles

The website includes eight in-depth, original English guides featuring internal links to relevant tools:
1. `how-to-convert-jpg-to-png-for-free`: In-browser canvas conversion vs server uploads, data privacy, and lossless DEFLATE encoding.
2. `jpg-vs-png-whats-the-difference`: Lossy DCT vs lossless DEFLATE, alpha transparency, and format decision matrix.
3. `how-to-preview-your-google-search-snippet`: Pixel vs character boundaries, mobile SERP dynamics, and algorithmic snippet rewrites.
4. `how-to-write-better-meta-titles-and-descriptions`: Value-Keyword-Brand formula, PAS description framework, and CTR optimization.
5. `what-is-schema-markup-beginners-guide`: Semantic Web principles, JSON-LD vs Microdata, and realistic expectations.
6. `how-to-generate-json-ld-for-a-website`: Step-by-step schema coding, `<head>` implementation, and validation tools.
7. `common-meta-tag-mistakes-to-avoid`: Staging noindex leakage, canonical inconsistencies, and obsolete meta tags.
8. `how-to-optimize-images-for-seo`: Display dimensions, aspect ratios, descriptive alt text, and Core Web Vitals (LCP/CLS).

---

## ⚙️ Central Brand & Domain Configuration

All branding, canonical URLs, contact endpoints, and author metadata are defined in one central configuration file:
```typescript
// Located at: src/config/site.ts
export const siteConfig = {
  brandName: 'RankMint',          // Change brand name here
  domain: 'https://rankmint.pages.dev', // Change canonical domain here
  contactEmail: 'contact@example.com',
  // ...
};
```
Modifying this single file propagates across the header, footer, SEO metadata tags, Open Graph cards, sitemaps, and breadcrumbs.

---

## 🚀 Local Development

1. **Clone or navigate to the repository:**
   ```bash
   cd applet
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser to `http://localhost:3000`.

---

## 🏗️ Building for Production

Compile the optimized static build:
```bash
npm run build
```
The output files will be created in the `dist/` directory.

To verify the production build locally:
```bash
npm run preview
```

---

## ☁️ Deploying to Free Cloudflare Pages

RankMint is completely static and free of any backend or database requirements, making it ideal for free hosting on Cloudflare Pages.

### Method 1: Git Integration (Recommended)
1. Push your repository to GitHub or GitLab.
2. Log into the [Cloudflare Dashboard](https://dash.cloudflare.com/) and navigate to **Workers & Pages** > **Create Application** > **Pages** > **Connect to Git**.
3. Select your repository.
4. In the build settings:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Click **Save and Deploy**.

### SPA Direct Route Handling on Cloudflare Pages
RankMint includes a `public/_redirects` file with the following rule:
```
/* /index.html 200
```
This ensures that deep URLs (such as `/tools/image-to-png` or `/blog/how-to-optimize-images-for-seo`) route properly to `index.html` without returning a 404 error when directly visited or refreshed.

---

## 🌐 Custom Domain Configuration

To attach your real domain (e.g. `www.yourbrand.com`):
1. In Cloudflare Pages, go to your project > **Custom domains** > **Set up a custom domain**.
2. Enter your domain name and follow the DNS verification steps.
3. Update `src/config/site.ts` with your new canonical domain:
   ```typescript
   domain: 'https://www.yourbrand.com'
   ```
4. Rebuild and commit (`npm run build`).

---

## ✅ Pre-Launch Verification Checklist

Before publishing your production instance:
- [ ] **Branding:** Confirm your desired brand name in `src/config/site.ts`.
- [ ] **Domain:** Set `siteConfig.domain` in `src/config/site.ts` to match your production URL.
- [ ] **Sitemap & Robots:** Update `public/robots.txt` and `public/sitemap.xml` with your production domain.
- [ ] **Contact Form:** If you want web-based form submissions instead of `mailto:`, hook up a service such as Formspree, Cloudflare Worker, or EmailJS in `src/pages/ContactPage.tsx`.
- [ ] **Build Validation:** Run `npm run lint` and `npm run build` to confirm zero compilation errors.
- [ ] **Mobile Testing:** Verify navigation, image converter dropzone, and SERP preview tools on iOS and Android viewports.

---

## ⚠️ Notes & Current Architecture Limitations

- **Image Transparency:** The Image to PNG Converter uses browser Canvas to convert pixel buffers losslessly to PNG format. It does not automatically remove backgrounds from photos with solid backgrounds.
- **Search Engine Snippet Disclaimers:** As documented throughout the application, Google algorithmically rewrites search snippets for more than 60% of search queries depending on search intent. Previewing a snippet provides a benchmark for title and description cutoffs, but does not guarantee search engine rendering.
