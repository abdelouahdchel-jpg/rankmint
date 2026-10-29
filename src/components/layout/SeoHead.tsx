import React, { useEffect } from 'react';
import { siteConfig } from '../../config/site';
import { SeoMetadataProps } from '../../types';

export const SeoHead: React.FC<SeoMetadataProps> = ({
  title,
  description = siteConfig.description,
  canonicalPath = '/',
  type = 'website',
}) => {
  const fullTitle = title
    ? `${title} · ${siteConfig.brandName}`
    : `${siteConfig.brandName} · ${siteConfig.tagline}`;

  const canonicalUrl = `${siteConfig.domain}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`;

  useEffect(() => {
    // 1. Update Title
    document.title = fullTitle;

    // Helper function to safely update or append meta tags
    const updateMetaTag = (selector: string, attr: 'name' | 'property', attrValue: string, content: string) => {
      let meta = document.querySelector(selector) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, attrValue);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // 2. Update Standard Description
    updateMetaTag('meta[name="description"]', 'name', 'description', description);

    // 3. Update Open Graph
    updateMetaTag('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    updateMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    updateMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    updateMetaTag('meta[property="og:type"]', 'property', 'og:type', type);
    updateMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', siteConfig.brandName);

    // 4. Update Twitter Card
    updateMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
    updateMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);

    // 5. Update Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonicalUrl;
  }, [fullTitle, description, canonicalUrl, type]);

  return null;
};
