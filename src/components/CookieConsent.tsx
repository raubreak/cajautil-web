"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const CONSENT_KEY = 'cajautil_cookie_consent';

type ConsentStatus = 'accepted' | 'rejected' | null;

function getInitialConsent(): ConsentStatus {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(CONSENT_KEY);
  if (stored === 'accepted' || stored === 'rejected') return stored;
  return null;
}

export default function CookieConsent() {
  const [consent, setConsent] = useState<ConsentStatus>(getInitialConsent);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (consent) return; // User already made a choice
    // Show the banner after a short delay for better UX
    const timer = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(timer);
  }, [consent]);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setConsent('accepted');
    setVisible(false);

    // Enable Google Analytics consent mode
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
      });
    }
  };

  const handleReject = () => {
    localStorage.setItem(CONSENT_KEY, 'rejected');
    setConsent('rejected');
    setVisible(false);

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

  // Don't render if user already made a choice or banner not ready to show
  if (consent || !visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed bottom-0 inset-x-0 z-[9999] p-4 sm:p-6 animate-in slide-in-from-bottom"
    >
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-200 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-grow">
            <h2 className="text-base font-bold text-slate-800 mb-1">Uso de cookies</h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              Utilizamos cookies propias y de terceros (Google Analytics, Google AdSense) para medir el uso del sitio
              y mostrar publicidad relevante. Puedes aceptar o rechazar las cookies no esenciales.{' '}
              <Link href="/politica-de-cookies" className="text-blue-600 hover:underline font-medium">
                Mas informacion
              </Link>
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
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
  );
}
