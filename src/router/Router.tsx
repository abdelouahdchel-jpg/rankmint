import React, { createContext, useContext, useEffect, useState, useTransition } from 'react';

interface RouterContextType {
  pathname: string;
  search: string;
  hash: string;
  navigate: (to: string, options?: { replace?: boolean }) => void;
}

const RouterContext = createContext<RouterContextType>({
  pathname: '/',
  search: '',
  hash: '',
  navigate: () => {},
});

export const useRouter = () => useContext(RouterContext);

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState({
    pathname: window.location.pathname || '/',
    search: window.location.search || '',
    hash: window.location.hash || '',
  });
  const [, startTransition] = useTransition();

  useEffect(() => {
    const handlePopState = () => {
      startTransition(() => {
        setCurrentPath({
          pathname: window.location.pathname || '/',
          search: window.location.search || '',
          hash: window.location.hash || '',
        });
      });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to: string, options?: { replace?: boolean }) => {
    // If it's an external link or mailto/tel, use standard window navigation
    if (to.startsWith('http://') || to.startsWith('https://') || to.startsWith('mailto:') || to.startsWith('tel:')) {
      window.location.href = to;
      return;
    }

    // Handle hash links on the current page
    if (to.startsWith('#')) {
      window.location.hash = to;
      setCurrentPath((prev) => ({ ...prev, hash: to }));
      const targetElement = document.querySelector(to);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    // Extract path, search, and hash
    const url = new URL(to, window.location.origin);
    const newPathname = url.pathname || '/';
    const newSearch = url.search || '';
    const newHash = url.hash || '';

    if (options?.replace) {
      window.history.replaceState({}, '', to);
    } else {
      window.history.pushState({}, '', to);
    }

    startTransition(() => {
      setCurrentPath({
        pathname: newPathname,
        search: newSearch,
        hash: newHash,
      });
    });

    // Scroll handling: if there's a hash, scroll to element; otherwise scroll to top
    if (newHash) {
      setTimeout(() => {
        const el = document.querySelector(newHash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  return (
    <RouterContext.Provider value={{ ...currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  replace?: boolean;
  children: React.ReactNode;
}

export const Link: React.FC<LinkProps> = ({ to, replace, onClick, children, ...props }) => {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);

    // If modifier keys are held or default was prevented, let browser handle (e.g. cmd+click for new tab)
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.altKey ||
      e.shiftKey ||
      props.target === '_blank' ||
      to.startsWith('http://') ||
      to.startsWith('https://') ||
      to.startsWith('mailto:')
    ) {
      return;
    }

    e.preventDefault();
    navigate(to, { replace });
  };

  return (
    <a href={to} onClick={handleClick} {...props}>
      {children}
    </a>
  );
};
