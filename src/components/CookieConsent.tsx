"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { getTrafficMarker, type TrafficMarker } from '@/lib/analytics';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const CONSENT_KEY = 'cajautil_cookie_consent';

type ConsentStatus = 'accepted' | 'rejected' | null;

export default function CookieConsent() {
  const [consent, setConsent] = useState<ConsentStatus>(null);
  const [visible, setVisible] = useState(true);
  const [trafficMarker, setTrafficMarker] = useState<TrafficMarker | null>(null);
  const rejectButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    const savedConsent = stored === 'accepted' || stored === 'rejected' ? stored : null;
    const timer = setTimeout(() => {
      setTrafficMarker(getTrafficMarker());
      setConsent(savedConsent);
      setVisible(!savedConsent);
      document.documentElement.removeAttribute('data-caja-consent');
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setConsent('accepted');
    setVisible(false);

    // Enable analytics only. Advertising storage remains disabled.
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      });
    }
  };

  const handleReject = () => {
    localStorage.setItem(CONSENT_KEY, 'rejected');
    setConsent('rejected');
    setVisible(false);

    if (typeof document !== 'undefined') {
      document.cookie.split(';').forEach((cookie) => {
        const name = cookie.split('=')[0].trim();
        if (!name.startsWith('_ga')) return;
        document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
        document.cookie = `${name}=; Max-Age=0; path=/; domain=.cajautil.com; SameSite=Lax`;
      });
    }

    // Deny Google Analytics consent mode
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      });
    }
  };

  return (
    <>
      {consent === 'accepted' && (
        <>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-3Q52JTD2XN"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                analytics_storage: 'granted',
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied'
              });
              gtag('js', new Date());
              gtag('config', 'G-3Q52JTD2XN', {
                anonymize_ip: true,
                allow_google_signals: false${trafficMarker ? `,
                traffic_type: 'internal',
                caja_traffic_segment: '${trafficMarker}'` : ''}
              });
            `}
          </Script>
        </>
      )}

      {visible && (
        <div
          role="dialog"
          aria-label="Aviso de cookies"
          className="cookie-consent-banner fixed bottom-0 inset-x-0 z-[9999] p-4 sm:p-6"
        >
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-200 p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-grow">
                <h2 className="text-base font-bold text-slate-800 mb-1">Uso de cookies</h2>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Usamos Google Analytics solo si lo aceptas. La publicidad de terceros está desactivada.{' '}
                  <Link href="/politica-de-cookies" className="text-blue-600 hover:underline font-medium">
                    Más información sobre cookies
                  </Link>
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
                <button
                  ref={rejectButtonRef}
                  onClick={handleReject}
                  className="flex-1 sm:flex-initial text-sm font-bold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-5 py-2.5 rounded-xl transition-colors"
                >
                  Rechazar
                </button>
                <button
                  onClick={handleAccept}
                  className="flex-1 sm:flex-initial text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-xl transition-colors shadow-sm"
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {consent && !visible && (
        <button
          type="button"
          onClick={() => {
            setVisible(true);
            requestAnimationFrame(() => rejectButtonRef.current?.focus());
          }}
          className="fixed bottom-3 left-3 z-40 rounded-lg border border-slate-300 bg-white/95 px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm hover:bg-slate-50 hover:text-slate-900"
        >
          Gestionar cookies
        </button>
      )}
    </>
  );
}
