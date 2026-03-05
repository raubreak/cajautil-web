"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-slate-900 border-t border-slate-700 text-slate-300 p-4 z-[9999] shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-sm" role="alert" aria-live="polite">
      <div className="max-w-4xl">
        <p>
          Utilizamos cookies propias y de terceros, incluyendo Google AdSense, para personalizar el contenido, mostrar anuncios relevantes y analizar nuestro tráfico. Al hacer clic en "Aceptar", consientes el uso de todas las cookies. Consulta nuestra <Link href="/politica-de-privacidad" className="text-blue-400 hover:underline">Política de Privacidad</Link> y <Link href="/politica-de-cookies" className="text-blue-400 hover:underline">Política de Cookies</Link> para más información.
        </p>
      </div>
      <div className="flex gap-2 flex-shrink-0">
        <button 
          onClick={acceptCookies}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors whitespace-nowrap"
        >
          Aceptar Cookies
        </button>
      </div>
    </div>
  );
}
