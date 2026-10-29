export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  author: string;
  publishedDate: string;
  readingTime: string;
  category: string;
  relatedToolId?: string;
  content: {
    lead: string;
    sections: {
      heading: string;
      level?: 'h2' | 'h3';
      body: string[];
      codeSnippet?: {
        language: string;
        code: string;
        caption?: string;
      };
      callout?: {
        type: 'tip' | 'warning' | 'info';
        title: string;
        text: string;
      };
      bulletPoints?: string[];
    }[];
    keyTakeaways: string[];
  };
}

export interface BreadcrumbItem {
  name: string;
  path?: string;
}

export interface SeoMetadataProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  author?: string;
}
