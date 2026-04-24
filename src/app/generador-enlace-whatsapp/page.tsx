"use client";

import React, { useState } from 'react';
import { MessageCircle, Phone, Send, Eye, CheckCircle, Copy, ExternalLink, QrCode, Plus } from 'lucide-react';
import Link from 'next/link';

export default function GeneradorWhatsApp() {
  const [telefono, setTelefono] = useState<string>('');
  const [prefijo, setPrefijo] = useState<string>('+34');
  const [mensaje, setMensaje] = useState<string>('');
  const [copiado, setCopiado] = useState(false);

  // Limpia espacios y guiones
  const formatPhone = telefono.replace(/[^0-9]/g, '');
  const formatPrefix = prefijo.replace(/[^0-9]/g, '');
  
  // URL generada
  const linkGeneral = `https://api.whatsapp.com/send?phone=${formatPrefix}${formatPhone}&text=${encodeURIComponent(mensaje)}`;
  const isValid = formatPhone.length >= 6;

  const handleCopy = () => {
    if (!isValid) return;
    navigator.clipboard.writeText(linkGeneral);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const handleOpenDesktop = () => {
    if (!isValid) return;
    window.open(linkGeneral, '_blank');
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center pt-8 pb-16 px-4 sm:px-6 z-10">
      
      {/* HEADER SECTION */}
      <div className="w-full max-w-2xl text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 sm:p-4 bg-green-100/50 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 shadow-sm border border-green-50">
          <MessageCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-600 fill-green-600/20" />
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-800 tracking-tight mb-4 leading-tight">
          Generador Link <span className="text-green-600">WhatsApp</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-500 font-medium max-w-xl mx-auto leading-relaxed px-2">
          Crea un enlace directo a tu chat con un mensaje predefinido para tus clientes de Instagram y empresas.
        </p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        {/* PANEL IZQUIERDO: FORMULARIO */}
        <section className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 p-6 sm:p-8 border border-slate-100 h-fit">
          <div className="space-y-6">
            
            {/* Teléfono */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4 text-green-500" /> ¿Cuál es tu número de WhatsApp?
              </label>
              <div className="flex gap-2">
                <select 
                  className="w-[110px] sm:w-[130px] px-3 py-3 border border-slate-300 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-500 text-base font-semibold transition-all bg-white"
                  value={prefijo}
                  onChange={(e) => setPrefijo(e.target.value)}
                >
                  <option value="34">🇪🇸 +34</option>
                  <option value="52">🇲🇽 +52</option>
                  <option value="54">🇦🇷 +54</option>
                  <option value="57">🇨🇴 +57</option>
                  <option value="56">🇨🇱 +56</option>
                  <option value="51">🇵🇪 +51</option>
                  <option value="1">🇺🇸 +1</option>
                  <option value="00">Internac...</option>
                </select>
                <input
                  type="tel"
                  placeholder="Ej: 600 123 456"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-500 text-lg font-semibold transition-all"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                />
              </div>
            </div>

            {/* Mensaje Custom */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center justify-between">
                <span className="flex items-center gap-2"><Send className="w-4 h-4 text-green-500" /> ¿Qué mensaje mostrar al abrir el link?</span>
                <span className="text-xs font-normal text-slate-400">Opcional</span>
              </label>
              <textarea
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-500 text-base transition-all h-28 resize-none"
                placeholder={`¡Hola! Vengo desde Instagram y quiero información sobre...`}
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
              />
            </div>
            
          </div>
        </section>

        {/* PANEL DERECHO: PREVIEW Y LINK */}
        <section className={`rounded-3xl shadow-xl p-6 sm:p-8 border flex flex-col items-center justify-center transition-all ${isValid ? 'bg-green-50 shadow-green-900/10 border-green-200' : 'bg-slate-50 border-slate-200 shadow-slate-200/40 opacity-70'}`}>
          
          <div className="w-full max-w-sm mb-6 flex flex-col items-center">
            {/* Visual Chat estético simulando tlf */}
            <div className={`w-full bg-[#E5DDD5] rounded-t-xl rounded-b-md p-4 overflow-hidden shadow-inner ${!isValid ? 'grayscale opacity-50' : ''}`}>
              <div className="bg-white px-3 py-2 rounded-xl rounded-tr-none shadow-sm text-sm text-slate-700 float-right max-w-[85%] break-words mb-2">
                {mensaje || <span className="opacity-50 italic">Aquí aparecerá el texto de tu cliente listo para ser enviado...</span>}
              </div>
              <div className="clear-both"></div>
            </div>
            <div className={`w-full bg-[#128C7E] h-1.5 rounded-b-xl ${!isValid ? 'grayscale opacity-50' : ''}`}></div>
          </div>

          <p className="text-sm font-bold text-slate-500 mb-2 uppercase tracking-wider">Tu link personalizado</p>
          
          <div className="w-full bg-white border border-slate-200 rounded-xl flex items-stretch overflow-hidden mb-6 tooltip-container relative group">
            <div className="flex-1 px-4 py-3 text-sm sm:text-base font-mono truncate text-green-800 select-all">
              {isValid ? linkGeneral : 'https://api.whatsapp.com/send?phone=...'}
            </div>
            <button 
              onClick={handleCopy}
              disabled={!isValid}
              className={`px-4 sm:px-6 font-bold flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 transition-colors border-l border-slate-200 ${copiado ? 'bg-slate-800 text-white' : 'bg-green-600 hover:bg-green-700 text-white disabled:bg-slate-300 disabled:text-slate-500'}`}
            >
              {copiado ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              <span className="hidden sm:inline">{copiado ? 'Copiado' : 'Copiar'}</span>
            </button>
          </div>

          {/* Tools de WhatsApp */}
          <div className="grid grid-cols-2 gap-3 w-full">
            <button onClick={handleOpenDesktop} disabled={!isValid} className="bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white p-3 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-2">
               <ExternalLink className="w-4 h-4" /> Probar link
            </button>
            
            <Link href={isValid ? `/generador-qr?text=${encodeURIComponent(linkGeneral)}` : '#'} className={`bg-white hover:bg-slate-100 border border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 text-slate-700 p-3 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-2 ${!isValid ? 'opacity-50 cursor-not-allowed' : ''}`}>
               <QrCode className="w-4 h-4" /> Sacar QR Code
            </Link>
          </div>
          
        </section>
      </div>

      {/* SEO & CONTENT SECTION */}
      <section className="w-full max-w-4xl prose prose-slate prose-headings:text-slate-800 mb-16 px-2 text-slate-600">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-800">
          <Eye className="w-6 h-6 text-green-500" />
          Descubre el generador de enlaces oficial para negocios
        </h2>
        
        <p>Un enlace directo de WhatsApp reduce pasos y facilita que un visitante pueda escribirte sin guardar el número manualmente. Es útil para perfiles de Instagram, TikTok, fichas de negocio, tarjetas o páginas de contacto.</p>

        <p>Nuestro <strong>generador de enlace de WhatsApp</strong> crea una URL lista para copiar, compartir o convertir en QR. Puedes incluir un mensaje inicial para ahorrar tiempo y guiar mejor la conversacion desde el primer clic.</p>

        <h3 className="text-lg font-bold">Buenas practicas al crear tu enlace</h3>
        <ul>
          <li><strong>Usa un numero correcto:</strong> revisa prefijo internacional y formato sin espacios ni guiones innecesarios.</li>
          <li><strong>Escribe un mensaje claro:</strong> por ejemplo, consulta comercial, soporte o reserva.</li>
          <li><strong>Pruébalo antes de publicarlo:</strong> abre el enlace en móvil y escritorio para comprobar que redirige bien.</li>
        </ul>

        <p>La herramienta genera la URL en la propia página. Para medir resultados o atribución de campañas puedes combinarla después con UTM o con una landing específica.</p>
        
      </section>

      {/* FAQ SECTION */}
      <section className="w-full max-w-4xl px-2 mb-12" aria-label="Preguntas Frecuentes">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b border-slate-200 pb-4">Preguntas Frecuentes FAQ</h2>
        <div className="space-y-4">
          <details className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden group">
            <summary className="flex list-none items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:text-green-600 transition-colors [&::-webkit-details-marker]:hidden">
              <h3 className="text-base font-bold m-0 pr-4">¿Cómo creo mi link de WhatsApp para Instagram?</h3>
              <Plus className="h-5 w-5 text-green-500 transition-transform group-open:rotate-45" aria-hidden="true" />
            </summary>
            <div className="px-5 pb-5 text-slate-600 leading-relaxed">
               <p>Copia el enlace generado y pégalo en el campo de sitio web de tu perfil, en una biografía con link o en una página de contacto. Antes de publicarlo, comprueba que el número y el mensaje de bienvenida son correctos.</p>
            </div>
          </details>

          <details className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden group">
            <summary className="flex list-none items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:text-green-600 transition-colors [&::-webkit-details-marker]:hidden">
              <h3 className="text-base font-bold m-0 pr-4">¿Funciona igual en PC o en MAC?</h3>
              <Plus className="h-5 w-5 text-green-500 transition-transform group-open:rotate-45" aria-hidden="true" />
            </summary>
            <div className="px-5 pb-5 text-slate-600 leading-relaxed">
               <p>Sí. En escritorio suele abrir WhatsApp Web o la app de escritorio y en móvil redirige a la aplicación instalada. El comportamiento final depende del dispositivo y de la configuración del usuario.</p>
             </div>
          </details>
        </div>

        <div className="mt-8 prose prose-slate max-w-none text-slate-600">
          <h3>Herramientas relacionadas</h3>
          <ul>
            <li><Link href="/generador-qr">Generador de codigos QR</Link></li>
            <li><Link href="/lector-qr">Lector de QR</Link></li>
          </ul>
        </div>
      </section>
      
    </main>
  );
}
