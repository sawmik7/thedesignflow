/**
 * useGTM — Centralized, type-safe Google Tag Manager dataLayer hook
 *
 * Usage:
 *   const { pushEvent } = useGTM();
 *   pushEvent('lead_form_submit', { budget: '$5k+', services: 'Brand Identity' });
 */

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export type GTMEventName =
  | 'page_view'
  | 'lead_form_submit'
  | 'cta_click'
  | 'pricing_section_view'
  | 'portfolio_view'
  | 'article_read'
  | 'scroll_depth_25'
  | 'scroll_depth_50'
  | 'scroll_depth_75'
  | 'scroll_depth_100'
  | 'fiverr_cta_click'
  | 'contact_page_view'
  | string;

export interface GTMEventData {
  event: GTMEventName;
  [key: string]: unknown;
}

/**
 * Push a typed event to the GTM dataLayer.
 * Safe to call server-side (no-ops if window is undefined).
 */
export function pushGTMEvent(event: GTMEventName, data?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...data });
}

/**
 * React hook wrapper around pushGTMEvent for use in components.
 */
export function useGTM() {
  const pushEvent = (event: GTMEventName, data?: Record<string, unknown>) => {
    pushGTMEvent(event, data);
  };

  return { pushEvent };
}
