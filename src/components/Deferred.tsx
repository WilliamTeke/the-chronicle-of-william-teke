import { Suspense, useEffect, useRef, useState, type ReactNode } from 'react';

/** Keep heavy modules off the initial request, loading just before they enter view. */
export default function Deferred({ children, className }: { children: ReactNode; className: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) { setReady(true); return; }
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setReady(true);
        observer.disconnect();
      }
    }, { rootMargin: '150px' });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={className}>
    {ready && <Suspense fallback={null}>{children}</Suspense>}
  </div>;
}
