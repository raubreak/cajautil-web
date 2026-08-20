export type ToolEventName = 'tool_started' | 'tool_completed' | 'result_copied';

const CONSENT_KEY = 'cajautil_cookie_consent';

export function trackToolEvent(eventName: ToolEventName, toolSlug: string) {
  if (typeof window === 'undefined') return;
  if (window.localStorage.getItem(CONSENT_KEY) !== 'accepted') return;
  if (typeof window.gtag !== 'function') return;

  window.gtag('event', eventName, { tool_slug: toolSlug });
}
