"use client";

import React, { useRef, useState } from 'react';
import { Briefcase, Check, Copy, Globe, Mail, Palette, Phone, Upload, UserCircle } from 'lucide-react';

import { trackToolEvent } from '@/lib/analytics';

const COLORS = [
  { name: 'Azul Pro', hex: '#2563eb' },
  { name: 'Noche', hex: '#1e293b' },
  { name: 'Esmeralda', hex: '#10b981' },
  { name: 'Vino', hex: '#9f1239' },
  { name: 'Oro', hex: '#b45309' },
  { name: 'Púrpura', hex: '#7c3aed' },
];

const normalizeWebsite = (website: string) => {
  const trimmedWebsite = website.trim();
  if (!trimmedWebsite) return '';
  return /^https?:\/\//i.test(trimmedWebsite) ? trimmedWebsite : `https://${trimmedWebsite}`;
};

export default function GeneradorFirmasEmail() {
  const [name, setName] = useState('Juan Pérez');
  const [job, setJob] = useState('Director Creativo');
  const [company, setCompany] = useState('CajaUtil S.L.');
  const [phone, setPhone] = useState('+34 600 000 000');
  const [website, setWebsite] = useState('www.cajautil.com');
  const [email, setEmail] = useState('');
  const [logo, setLogo] = useState<string | null>(null);
  const [themeColor, setThemeColor] = useState('#2563eb');
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setLogo(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const copyWithSelection = () => {
    if (!previewRef.current) return;
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(previewRef.current);
    selection?.removeAllRanges();
    selection?.addRange(range);
    const success = document.execCommand('copy');
    selection?.removeAllRanges();
    return success;
  };

  const copySignatureHTML = async () => {
    if (!previewRef.current) return;
    setCopyError(null);

    let success = false;
    try {
      if (navigator.clipboard?.write && typeof ClipboardItem !== 'undefined') {
        const html = previewRef.current.innerHTML;
        const text = previewRef.current.innerText;
        await navigator.clipboard.write([
          new ClipboardItem({
            'text/html': new Blob([html], { type: 'text/html' }),
            'text/plain': new Blob([text], { type: 'text/plain' }),
          }),
        ]);
        success = true;
      }
    } catch {
      success = false;
    }

    if (!success) {
      try {
        success = copyWithSelection() ?? false;
      } catch {
        success = false;
      }
    }
    if (!success) {
      setCopyError('No se pudo copiar automáticamente. Selecciona la vista previa y cópiala manualmente.');
      return;
    }

    trackToolEvent('result_copied', 'generador-firmas-email');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const websiteHref = normalizeWebsite(website);

  const renderSignaturePreview = () => (
    <div 
        style={{ 
            fontFamily: 'Arial, sans-serif', 
            color: '#334155', 
            maxWidth: '500px', 
            padding: '10px' 
        }}
    >
      <table cellPadding="0" cellSpacing="0" style={{ verticalAlign: 'middle' }}>
        <tbody>
          <tr>
            {logo && (
              <td style={{ paddingRight: '20px', verticalAlign: 'top' }}>
                {/* A raw img preserves the uploaded data URL in copied email HTML. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logo} alt="Logo" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover' }} />
              </td>
            )}
            <td style={{ borderLeft: `3px solid ${themeColor}`, paddingLeft: '20px', verticalAlign: 'middle' }}>
              <p style={{ margin: '0', fontSize: '18px', fontWeight: 'bold', color: '#1e293b' }}>{name || 'Tu Nombre'}</p>
              <p style={{ margin: '0 0 10px 0', fontSize: '14px', color: themeColor, fontWeight: '600' }}>{job || 'Tu Cargo'} — {company || 'Tu Empresa'}</p>

              <table cellPadding="0" cellSpacing="0" style={{ fontSize: '12px', color: '#64748b' }}>
                <tbody>
                  {phone && (
                    <tr>
                      <td style={{ paddingBottom: '4px' }}><strong>T:</strong> {phone}</td>
                    </tr>
                  )}
                  {email && (
                    <tr>
                      <td style={{ paddingBottom: '4px' }}><strong>E:</strong> <a href={`mailto:${email}`} style={{ color: '#64748b', textDecoration: 'none' }}>{email}</a></td>
                    </tr>
                  )}
                  {website && (
                    <tr>
                      <td style={{ paddingBottom: '4px' }}><strong>W:</strong> <a href={websiteHref} target="_blank" rel="noreferrer" style={{ color: '#64748b', textDecoration: 'none' }}>{website}</a></td>
                    </tr>
                  )}
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center pt-8 pb-16 px-4">
      
      <div className="w-full max-w-2xl text-center mb-10">
        <div className="inline-flex items-center justify-center p-4 bg-emerald-100/50 rounded-3xl mb-6 border border-emerald-50">
          <Mail className="w-10 h-10 text-emerald-600" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight mb-4">
          Generador de <span className="text-emerald-600">Firmas Email</span>
        </h1>
        <p className="text-lg text-slate-500 font-medium max-w-lg mx-auto">
          Crea una firma profesional lista para probar en Gmail y Outlook.
        </p>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        
        {/* CONFIG PANEL */}
        <section className="lg:col-span-5 bg-white rounded-[40px] shadow-2xl p-8 border border-slate-100 space-y-5">
          <div className="grid grid-cols-2 gap-4">
              <div>
                 <label htmlFor="signature-name" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Nombre Completo</label>
                 <div className="relative"><UserCircle className="absolute left-3 top-3 w-4 h-4 text-slate-300" />
                 <input id="signature-name" type="text" autoComplete="name" value={name} onChange={e => setName(e.target.value)} className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-400" /></div>
               </div>
               <div>
                 <label htmlFor="signature-job" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Cargo / Puesto</label>
                 <div className="relative"><Briefcase className="absolute left-3 top-3 w-4 h-4 text-slate-300" />
                 <input id="signature-job" type="text" autoComplete="organization-title" value={job} onChange={e => setJob(e.target.value)} className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-400" /></div>
               </div>
          </div>

          <div>
            <label htmlFor="signature-company" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Empresa</label>
            <input id="signature-company" type="text" autoComplete="organization" value={company} onChange={e => setCompany(e.target.value)} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-400" />
          </div>

          <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="signature-phone" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Teléfono</label>
                <div className="relative"><Phone className="absolute left-3 top-3 w-4 h-4 text-slate-300" />
                <input id="signature-phone" type="tel" autoComplete="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-400" /></div>
              </div>
              <div>
                <label htmlFor="signature-website" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Web</label>
                <div className="relative"><Globe className="absolute left-3 top-3 w-4 h-4 text-slate-300" />
                <input id="signature-website" type="text" inputMode="url" autoComplete="url" value={website} onChange={e => setWebsite(e.target.value)} className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-400" /></div>
              </div>
          </div>

          <div>
            <label htmlFor="signature-email" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Correo electrónico</label>
            <div className="relative"><Mail className="absolute left-3 top-3 w-4 h-4 text-slate-300" />
            <input id="signature-email" type="email" inputMode="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="nombre@empresa.com (opcional)" className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-emerald-400" /></div>
          </div>

          <fieldset>
             <legend className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 block">Color Corporativo</legend>
             <div className="flex gap-2">
                {COLORS.map(c => (
                  <button
                    type="button"
                    key={c.hex} 
                    onClick={() => setThemeColor(c.hex)}
                    aria-label={`Usar color ${c.name}`}
                    aria-pressed={themeColor === c.hex}
                    className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${themeColor === c.hex ? 'border-slate-800' : 'border-transparent'}`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
             </div>
          </fieldset>

          <div>
            <label htmlFor="signature-logo" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Foto / Logo</label>
            <label htmlFor="signature-logo" className="flex items-center gap-3 p-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:bg-emerald-50 hover:border-emerald-200 transition group">
                <Upload className="w-5 h-5 text-slate-300 group-hover:text-emerald-500" />
                <span className="text-xs font-bold text-slate-500">Subir imagen...</span>
                <input id="signature-logo" type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
            </label>
          </div>
        </section>

        {/* PREVIEW PANEL */}
        <section className="lg:col-span-7 flex flex-col gap-6">
           <div className="bg-white rounded-[40px] shadow-2xl p-10 border border-slate-100 flex flex-col items-center min-h-[400px]">
              <div className="w-full flex items-center justify-between mb-8">
                 <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest">Vista Previa</h2>
                 <button
                    type="button"
                    onClick={copySignatureHTML}
                    className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${copied ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white hover:bg-emerald-600'}`}
                 >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? '¡Firma Copiada!' : 'Copiar para Email'}
                 </button>
              </div>

              {/* Contenedor central de la firma */}
              <div ref={previewRef} className="p-8 bg-white border border-slate-200 rounded-2xl shadow-sm w-full select-all">
                  {renderSignaturePreview()}
              </div>

              {copyError && <p role="alert" className="mt-4 text-sm font-medium text-rose-600">{copyError}</p>}

              <div className="mt-8 p-6 bg-amber-50 rounded-2xl border border-amber-100 flex gap-4">
                  <Palette className="w-6 h-6 text-amber-500 shrink-0" />
                  <p className="text-[11px] text-amber-700 leading-relaxed">
                     <strong>Instrucciones:</strong> Una vez copiada, ve a la configuración de tu cliente de correo, busca el apartado &quot;Firma&quot; y pega directamente. Envíate un mensaje de prueba: cada cliente puede ajustar estilos o eliminar imágenes incrustadas.
                  </p>
              </div>
           </div>
        </section>

      </div>

      <section className="w-full max-w-4xl prose prose-slate prose-headings:text-slate-800 mb-16 px-2 text-slate-600">
          <h2>Genera tu firma de correo profesional en segundos</h2>
          <p>La <strong>firma de email</strong> es tu tarjeta de presentación digital. Una firma bien diseñada transmite profesionalidad y confianza a tus clientes y proveedores. Con nuestro generador gratuito de CajaUtil, puedes personalizar tu nombre, cargo, empresa y datos de contacto.</p>
          
          <h3>Diseño pensado para clientes habituales</h3>
          <p>La firma utiliza tablas HTML sencillas para conservar mejor su estructura, pero el resultado final depende del cliente de correo. Prueba siempre el envío en los servicios que utilices:</p>
          <ul>
              <li><strong>Gmail:</strong> Simplemente copia y pega en Configuración {`>`} General {`>`} Firma.</li>
              <li><strong>Outlook:</strong> Tanto en la versión web como en la de escritorio (Microsoft 365).</li>
              <li><strong>Apple Mail:</strong> Comprueba el resultado en iPhone y Mac si usas ambos entornos.</li>
              <li><strong>Thunderbird:</strong> Revisa la firma HTML después de pegarla.</li>
          </ul>

          <p><strong>Nota de Privacidad:</strong> Al igual que todas nuestras utilidades, el procesamiento de la imagen y los datos ocurre exclusivamente en tu navegador. Nosotros no guardamos ninguna información personal en nuestros servidores.</p>
      </section>

    </main>
  );
}
