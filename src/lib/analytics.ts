export type ToolEventName = 'tool_started' | 'tool_completed' | 'result_copied';
export type TrafficMarker = 'automation' | 'internal';

const CONSENT_KEY = 'cajautil_cookie_consent';
const TRAFFIC_MARKER_KEY = 'cajautil_traffic_marker';

export function getTrafficMarker(): TrafficMarker | null {
  if (typeof window === 'undefined') return null;

  const marker = new URLSearchParams(window.location.search).get('caja_traffic');
  if (marker === 'automation' || marker === 'internal') {
    window.sessionStorage.setItem(TRAFFIC_MARKER_KEY, marker);
    return marker;
  }

  const stored = window.sessionStorage.getItem(TRAFFIC_MARKER_KEY);
  return stored === 'automation' || stored === 'internal' ? stored : null;
}

export function trackToolEvent(eventName: ToolEventName, toolSlug: string) {
  if (typeof window === 'undefined') return;
  if (window.localStorage.getItem(CONSENT_KEY) !== 'accepted') return;
  if (getTrafficMarker()) return;
  if (typeof window.gtag !== 'function') return;

  window.gtag('event', eventName, { tool_slug: toolSlug });
}
