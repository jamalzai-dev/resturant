import { useEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Header } from '../Header';
import { SiteFooter } from './SiteFooter';
import { OrderDrawer, StickyOrder } from '../OrderDrawer';
import { CATEGORIES, type Category } from '../../data/menu';
import { menuHref } from '../../routing/routes';

export function SiteLayout() {
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();
  const lastPath = useRef(pathname);
  const hasNavigated = useRef(false);
  useEffect(() => {
    if (window.location.hash && !window.location.hash.startsWith('#/')) {
      window.history.replaceState(window.history.state, '', '#' + pathname + search + hash);
    }
    if (lastPath.current !== pathname) hasNavigated.current = true;
    lastPath.current = pathname;
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById(hash.slice(1) || 'main');
      if (hash) target?.scrollIntoView({ behavior: 'instant' });
      else window.scrollTo({ top: 0, behavior: 'instant' });
      // Keep initial keyboard entry at the skip link; announce client route changes.
      if (target && (hasNavigated.current || hash)) {
        target.tabIndex = -1;
        target.focus({ preventScroll: true });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);
  useEffect(() => {
    const handler = (event: Event) => {
      const value = (event as CustomEvent<Category>).detail;
      if (CATEGORIES.includes(value)) navigate(menuHref(value));
    };
    window.addEventListener('restaurant:menu', handler);
    return () => window.removeEventListener('restaurant:menu', handler);
  }, [navigate]);
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <SiteFooter />
      <OrderDrawer />
      <StickyOrder />
    </>
  );
}
