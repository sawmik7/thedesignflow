/**
 * useScrollDepth — Fires GTM events at 25%, 50%, 75%, 100% scroll depth.
 *
 * Google recommends scroll depth tracking as a core engagement signal.
 * These events power GA4 behavioral audiences and remarketing lists.
 *
 * Usage:
 *   useScrollDepth(); // Call once in a page component
 */

import { useEffect, useRef } from 'react';
import { pushGTMEvent } from './useGTM';

const DEPTH_THRESHOLDS = [25, 50, 75, 100] as const;
type DepthThreshold = typeof DEPTH_THRESHOLDS[number];

export function useScrollDepth(): void {
  const firedRef = useRef<Set<DepthThreshold>>(new Set());

  useEffect(() => {
    const fired = firedRef.current;

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;

      if (docHeight <= 0) return;

      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      for (const threshold of DEPTH_THRESHOLDS) {
        if (scrollPercent >= threshold && !fired.has(threshold)) {
          fired.add(threshold);
          pushGTMEvent(`scroll_depth_${threshold}`, {
            scroll_depth: threshold,
            page_path: window.location.pathname,
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
}
