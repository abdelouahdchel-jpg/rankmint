/**
 * Central Site Configuration for RankMint
 * 
 * Edit this file to customize the brand name, canonical domain, contact details,
 * or navigation links without having to search through multiple component files.
 * 
 * PRE-LAUNCH STATUS:
 * - Domain: "https://rankmint.pages.dev" is a temporary staging/preview placeholder.
 *   Do not treat it as a confirmed production domain. Once your custom domain is registered
 *   and verified, update the 'domain' field below.
 */

export interface ToolDefinition {
  id: string;
  name: string;
  path: string;
  shortDescription: string;
  longDescription: string;
  iconName: string;
  category: 'Images' | 'Search' | 'Code' | 'Content';
  executionModel: '100% Client-Side Browser Canvas' | '100% Client-Side Simulation' | '100% Client-Side Generator' | 'Deterministic Rule-Based Engine';
  metaTitle: string;
  metaDescription: string;
}

export interface NavItem {
  label: string;
  path: string;
}

export const siteConfig = {
  // Brand identity
  brandName: 'RankMint',
  tagline: 'Free Client-Side SEO Tools',
  slogan: 'Professional SEO utilities running 100% in your browser. Zero tracking, zero uploads, zero cost.',
  description: 'Fast, secure, browser-based SEO tools. Convert JPG/WebP to PNG, preview Google SERP snippets, build meta tags, generate JSON-LD schema, and craft article outlines entirely on your device.',

  // Domain & Canonical URL base
  // NOTE: "https://rankmint.pages.dev" is a temporary staging/preview placeholder.
  // Replace with your confirmed custom domain before public launch.
  domain: 'https://rankmint.pages.dev',
  isPlaceholderDomain: true,

  // Contact & Publisher metadata
  contactEmail: 'brayachmohamad@gmail.com',
  author: 'RankMint Editorial Team',
  lastUpdatedYear: 2026,

  // Top navigation links (Following the 4-5 link contract)
  navLinks: [
    { label: 'Tools', path: '/#tools' },
    { label: 'Blog', path: '/blog' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ] as NavItem[],

  // Exactly 5 tools specification
  tools: [
    {
      id: 'image-to-png',
      name: 'Image to PNG Converter',
      path: '/tools/image-to-png',
      shortDescription: 'Convert JPG, JPEG, and WebP images to PNG entirely in your browser using HTML5 Canvas.',
      longDescription: 'High-fidelity client-side image conversion. Your images never leave your computer or touch an external server. Includes file size comparison, dimension inspection, and transparency guidance.',
      iconName: 'Image',
      category: 'Images',
      executionModel: '100% Client-Side Browser Canvas',
      metaTitle: 'Free Image to PNG Converter - In-Browser JPG & WebP Conversion',
      metaDescription: 'Convert JPG, JPEG, and WebP files to PNG directly in your browser. Fast, private client-side canvas conversion with zero server uploads and instant download.',
    },
    {
      id: 'serp-preview',
      name: 'SERP Snippet Preview',
      path: '/tools/serp-preview',
      shortDescription: 'Simulate Google search results on desktop and mobile with live pixel width and character count checkers.',
      longDescription: 'Interactive Google search result simulator. Test meta titles and descriptions against Google’s desktop (~600px) and mobile (~960px) cutoffs to prevent truncation before publishing.',
      iconName: 'Search',
      category: 'Search',
      executionModel: '100% Client-Side Simulation',
      metaTitle: 'Google SERP Snippet Preview Tool - Desktop & Mobile Simulator',
      metaDescription: 'Test your Google search title and meta description with desktop and mobile SERP preview. Features live pixel and character meters to optimize click-through rate.',
    },
    {
      id: 'meta-tag-generator',
      name: 'Meta Tag Generator',
      path: '/tools/meta-tag-generator',
      shortDescription: 'Generate clean, copyable HTML meta tags including robots directives, Open Graph, and Twitter Cards.',
      longDescription: 'Build comprehensive, valid HTML head tags with automatic escaping. Configure indexing directives, social preview tags, and canonical links with zero code clutter.',
      iconName: 'Code',
      category: 'Code',
      executionModel: '100% Client-Side Generator',
      metaTitle: 'HTML Meta Tag Generator - SEO, Robots, Open Graph & Twitter Cards',
      metaDescription: 'Generate valid, escaped HTML meta tags for title, description, robots directives, Open Graph, and Twitter Cards. Free, instant client-side code generator.',
    },
    {
      id: 'schema-generator',
      name: 'Schema Markup Generator',
      path: '/tools/schema-generator',
      shortDescription: 'Create validated JSON-LD structured data for Organization, WebSite, Article, and FAQPage schemas.',
      longDescription: 'Generate syntactically valid Schema.org JSON-LD scripts to help search engines understand your entities. Includes real-time syntax checking and copy/download features.',
      iconName: 'FileJson',
      category: 'Code',
      executionModel: '100% Client-Side Generator',
      metaTitle: 'JSON-LD Schema Markup Generator - Organization, Article, FAQ & WebSite',
      metaDescription: 'Generate valid JSON-LD structured data for Organization, Article, WebSite, and FAQPage. Live syntax validator with instant copy and download options.',
    },
    {
      id: 'article-outline-generator',
      name: 'Article Outline Generator',
      path: '/tools/article-outline-generator',
      shortDescription: 'Formulate logical H1, H2, and H3 content structures, intro hooks, and FAQs using deterministic editorial templates.',
      longDescription: 'Plan search-intent aligned content outlines in seconds. Uses transparent local editorial heuristics based on audience, intent, and tone. 100% client-side with zero external API calls.',
      iconName: 'FileText',
      category: 'Content',
      executionModel: 'Deterministic Rule-Based Engine',
      metaTitle: 'Article Outline Generator - Content Structure & Heading Planner',
      metaDescription: 'Generate organized H1, H2, and H3 article outlines, introduction hooks, and FAQs tailored to search intent. 100% local rule-based template engine.',
    },
  ] as ToolDefinition[],
};
