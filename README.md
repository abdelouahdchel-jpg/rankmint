# RankMint - Free In-Browser SEO Toolkit

RankMint is a complete, professional, mobile-first suite of five essential SEO and web utilities. It executes 100% client-side in the user's browser with zero server uploads, zero external API costs, and zero required logins or databases.

> **Pre-Launch Staging Notice:**
> The domain `https://rankmint.pages.dev` referenced throughout this codebase is a temporary staging/preview placeholder. A custom production domain has not yet been registered or attached. Before launching to production, configure your confirmed custom domain as detailed in the checklist below.

---

## 🛠️ The 5 In-Browser Tools

1. **Image to PNG Converter (`/tools/image-to-png`)**:
   - Converts JPG, JPEG, and WebP images to PNG entirely in the browser using HTML5 Canvas.
   - Live visual preview, original and converted byte size comparison, dimension inspection, and instant download.
   - File type validation (rejects invalid formats) and 25 MB safety limit to protect browser memory.
   - Educational notice explicitly explaining that converting an image with an opaque background to PNG does *not* create transparency automatically.

2. **SERP Snippet Preview (`/tools/serp-preview`)**:
   - Desktop and Mobile Google search result simulators.
   - Proportional pixel width calculations (~600px desktop title, ~960px description) and character count meters with real-time truncation alerts.
   - Real-time search query bolding simulation and date toggle.
   - Realistic Google search card styling and prominent algorithmic rewrite disclaimer explaining that search engines frequently rewrite snippets.

3. **Meta Tag Generator (`/tools/meta-tag-generator`)**:
   - Generates sanitized, copyable HTML head tags for titles, descriptions, canonical links, robots directives (`index`/`noindex`, `follow`/`nofollow`, `noarchive`, `nosnippet`, `max-image-preview`), Open Graph, and Twitter Cards.
   - Safe HTML attribute escaping (XSS prevention).
   - "Sync from Basic" utility and copy/download actions.
   - Explains which tags are essential vs optional.

4. **Schema Markup Generator (`/tools/schema-generator`)**:
   - Generates valid JSON-LD structured data for `Organization`, `WebSite`, `Article`, and `FAQPage`.
   - Real-time JSON syntax validation and error reporting.
   - Embeddable `<script type="application/ld+json">` output with copy and `.jsonld` download.
   - Disclaims any ranking guarantees or automatic rich snippet awards, warning against misleading structured data.

5. **Article Outline Generator (`/tools/article-outline-generator`)**:
   - Deterministic, transparent local editorial heuristics based on target keyword, audience, and format.
   - Generates 4 H1 options, search intent analysis, intro hooks, H2/H3 hierarchy with estimated word counts, and search-intent FAQs.
   - Copy as Markdown, copy as plain text, or download as `.md`.
   - **Note:** This tool uses 100% deterministic local rule-based templates. It is strictly not AI-powered and makes zero external API calls.

---

## 📚 8 Original Technical Blog Articles

RankMint includes eight original, substantive technical guides with natural internal links to the corresponding tools:

1. **How to Convert JPG to PNG for Free (`/blog/how-to-convert-jpg-to-png-for-free`)**: In-browser canvas conversion vs server uploads, data privacy benefits, and why lossless DEFLATE encoding affects file size. Links to Image to PNG Converter.
2. **JPG vs PNG: What's the Difference? (`/blog/jpg-vs-png-whats-the-difference`)**: Technical comparison between lossy DCT and lossless DEFLATE compression, 24-bit RGB vs 32-bit RGBA with alpha channels, and format selection criteria. Links to Image to PNG Converter.
3. **How to Preview Your Google Search Snippet (`/blog/how-to-preview-your-google-search-snippet`)**: Pixel boundaries vs character limits, mobile SERP dynamics, and why search engines dynamically rewrite over 60% of snippets. Links to SERP Snippet Preview.
4. **How to Write Better Meta Titles and Descriptions (`/blog/how-to-write-better-meta-titles-and-descriptions`)**: Actionable copywriting frameworks (Value + Keyword + Brand, PAS framework), avoiding keyword stuffing, and search intent alignment. Links to SERP Preview & Meta Tag Generator.
5. **What Is Schema Markup? A Beginner's Guide (`/blog/what-is-schema-markup-beginners-guide`)**: Semantic Web principles, JSON-LD vs Microdata, Knowledge Graph connections, and realistic expectations regarding rich results. Links to Schema Generator.
6. **How to Generate JSON-LD for a Website (`/blog/how-to-generate-json-ld-for-a-website`)**: Step-by-step schema implementation for Organization, WebSite, Article, and FAQPage, `<head>` injection, and validation with Google's Rich Results Test. Links to Schema Generator.
7. **Common Meta Tag Mistakes to Avoid (`/blog/common-meta-tag-mistakes-to-avoid`)**: Unintended staging noindex leakage, missing or conflicting canonical tags, obsolete meta tags, and Open Graph oversights. Links to Meta Tag Generator.
8. **How to Optimize Images for SEO (`/blog/how-to-optimize-images-for-seo`)**: Display dimensions, aspect ratios, descriptive alt text, modern formats, and Core Web Vitals (LCP/CLS) impact. Links to Image to PNG Converter.

---

## 💻 Technology Stack

Confirmed project dependencies:
- **Framework:** React 19 (functional components, hooks)
- **Language:** TypeScript
- **Build Tool:** Vite 8
- **Styling:** Tailwind CSS v4 (via `@tailwindcss/vite` and `@import "tailwindcss";`)
- **Icons:** Lucide React (`lucide-react`)
- **Architecture:** 100% Client-Side Single Page Application (SPA) with zero external databases or mandatory runtime servers.

---

## ⚙️ Central Configuration (`src/config/site.ts`)

All branding, canonical URLs, contact endpoints, and author metadata are controlled from a single configuration file:

```typescript
// Located at: src/config/site.ts
export const siteConfig = {
  brandName: 'RankMint',
  tagline: 'Free Client-Side SEO Tools',
  // Staging placeholder domain:
  domain: 'https://rankmint.pages.dev',
  isPlaceholderDomain: true,
  contactEmail: 'brayachmohamad@gmail.com',
  author: 'RankMint Editorial Team',
  lastUpdatedYear: 2026,
  // ...
};
```

Updating this configuration cascades throughout the application header, footer, page meta titles, canonical links, Open Graph tags, and breadcrumbs.

---

## 🚀 Local Installation & Development

1. **Navigate to the app directory:**
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

## 🏗️ Production Build

To run the TypeScript type check and compile an optimized static bundle:

```bash
# 1. Validate TypeScript without emitting
npm run lint

# 2. Build production assets into dist/
npm run build
```

To preview the production bundle locally before deployment:
```bash
npm run preview
```

---

## ☁️ Free Cloudflare Pages Deployment Instructions

Because RankMint requires zero server compute or database resources, it can be deployed for free on Cloudflare Pages.

### Step 1: Connect Git Repository
1. Push your repository to GitHub or GitLab.
2. Sign in to the [Cloudflare Dashboard](https://dash.cloudflare.com/) and go to **Compute (Workers) & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select your repository.

### Step 2: Configure Build Settings
- **Project name:** `rankmint` (or your preferred name)
- **Framework preset:** `Vite`
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- Click **Save and Deploy**.

### Step 3: SPA Routing Support
The repository includes a `public/_redirects` file containing:
```
/* /index.html 200
```
This ensures Cloudflare Pages serves `index.html` for all deep paths (such as `/tools/serp-preview` or `/blog/how-to-optimize-images-for-seo`), allowing client-side routing to function seamlessly on direct visits or refreshes.

---

## 🌐 Custom Domain Setup (Required Before Production Launch)

Before public launch, replace the temporary placeholder domain with your confirmed domain:

1. **Add Custom Domain in Cloudflare Pages:**
   - In your Cloudflare Pages dashboard, go to **Custom domains** > **Set up a custom domain**.
   - Enter your domain (e.g., `www.example.com` or `example.com`) and complete the automatic DNS verification.

2. **Update Codebase Configuration:**
   - In `src/config/site.ts`: Update `domain: 'https://www.yourdomain.com'` and set `isPlaceholderDomain: false`.
   - In `public/robots.txt`: Update `Sitemap: https://www.yourdomain.com/sitemap.xml`.
   - In `public/sitemap.xml`: Replace `https://rankmint.pages.dev` with `https://www.yourdomain.com`.
   - In `index.html`: Update the `og:url` meta tag with your confirmed domain.

3. **Rebuild and push:**
   ```bash
   npm run build
   git commit -am "Configure production custom domain"
   git push
   ```

---

## ✅ Pre-Launch Verification Checklist

Complete this checklist prior to public announcement or search engine submission:

- [ ] **Brand Name:** Verify `brandName` in `src/config/site.ts`.
- [ ] **Custom Domain:** Replace `https://rankmint.pages.dev` with your confirmed domain in `src/config/site.ts`, `public/robots.txt`, and `public/sitemap.xml`.
- [ ] **Contact Email:** Confirm `contactEmail` is set to `brayachmohamad@gmail.com` in `src/config/site.ts`.
- [ ] **Form Handling:** If web form submissions to an inbox are preferred over the client-side `mailto:` generator, connect a free service like Formspree or a Cloudflare Worker as documented on `/contact`.
- [ ] **Build Check:** Confirm `npm run lint` and `npm run build` pass with zero errors.
- [ ] **Mobile Testing:** Verify all 5 tools (Canvas image conversion, SERP preview, Meta generator, Schema builder, and Outline planner) across mobile and desktop viewports.
- [ ] **Search Engine Disclaimers:** Ensure disclaimers remain visible: tools do not guarantee rankings, and image conversion preserves source background pixels.
