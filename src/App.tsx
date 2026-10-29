import React from 'react';
import { RouterProvider, useRouter } from './router/Router';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { ToolDetailPage } from './pages/ToolDetailPage';
import { BlogIndexPage } from './pages/BlogIndexPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';

const AppContent: React.FC = () => {
  const { pathname } = useRouter();

  // Normalize path by stripping trailing slashes (except for root '/')
  const cleanPath = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

  const renderCurrentPage = () => {
    // 1. Core pages
    if (cleanPath === '/') {
      return <HomePage />;
    }
    if (cleanPath === '/about') {
      return <AboutPage />;
    }
    if (cleanPath === '/contact') {
      return <ContactPage />;
    }
    if (cleanPath === '/privacy') {
      return <PrivacyPage />;
    }
    if (cleanPath === '/terms') {
      return <TermsPage />;
    }

    // 2. Blog index & individual article routes
    if (cleanPath === '/blog') {
      return <BlogIndexPage />;
    }
    if (cleanPath.startsWith('/blog/')) {
      const slug = cleanPath.slice('/blog/'.length);
      return <BlogPostPage slug={slug} />;
    }

    // 3. Tool pages
    if (cleanPath.startsWith('/tools/')) {
      const toolId = cleanPath.slice('/tools/'.length);
      return <ToolDetailPage toolId={toolId} />;
    }

    // 4. Fallback 404
    return <NotFoundPage />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900">
      <Header />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {renderCurrentPage()}
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}
