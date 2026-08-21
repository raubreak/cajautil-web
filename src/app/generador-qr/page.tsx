"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

const DEFAULT_QR_CONTENT = "https://cajautil.com";
const MAX_QR_BYTES = 1200;
const MIN_PIXELS_PER_MODULE = 4;

function getSafeExportSize(svg: SVGSVGElement, requestedSize: number) {
  const moduleCount = Math.round(svg.viewBox.baseVal.width);
  if (!Number.isFinite(moduleCount) || moduleCount <= 0) return null;

  const pixelsPerModule = Math.max(MIN_PIXELS_PER_MODULE, Math.ceil(requestedSize / moduleCount));
  return { moduleCount, pixelsPerModule, exportSize: moduleCount * pixelsPerModule };
}

export default function GeneradorQR() {
  const [texto, setTexto] = useState(DEFAULT_QR_CONTENT);
  const [size, setSize] = useState(200);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [fgColor, setFgColor] = useState("#000000");
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [moduleCount, setModuleCount] = useState<number | null>(null);

  useEffect(() => {
    const sharedContent = new URLSearchParams(window.location.search).get("text");
    if (!sharedContent) return;

    const timeoutId = window.setTimeout(() => setTexto(sharedContent), 0);
    return () => window.clearTimeout(timeoutId);
  }, []);

  const contentBytes = new TextEncoder().encode(texto).length;
  const qrError = !texto.trim()
    ? "Introduce una URL o un texto para generar el código."
    : contentBytes > MAX_QR_BYTES
      ? `El contenido ocupa ${contentBytes.toLocaleString("es-ES")} bytes. Reduce el texto a ${MAX_QR_BYTES.toLocaleString("es-ES")} bytes o menos.`
      : null;

  useEffect(() => {
    const animationFrame = window.requestAnimationFrame(() => {
      if (qrError) {
        setModuleCount(null);
        return;
      }

      const svg = document.getElementById("qr-code-svg");
      if (!(svg instanceof SVGSVGElement)) return;

      const nextModuleCount = Math.round(svg.viewBox.baseVal.width);
      setModuleCount(Number.isFinite(nextModuleCount) && nextModuleCount > 0 ? nextModuleCount : null);
    });

    return () => window.cancelAnimationFrame(animationFrame);
  }, [qrError, texto]);

  const pixelsPerModule = moduleCount
    ? Math.max(MIN_PIXELS_PER_MODULE, Math.ceil(size / moduleCount))
    : null;
  const exportSize = moduleCount && pixelsPerModule ? moduleCount * pixelsPerModule : size;

  const downloadQR = () => {
    setDownloadError(null);
    if (qrError) return;

    const svg = document.getElementById("qr-code-svg");
    if (!(svg instanceof SVGSVGElement)) {
      setDownloadError("No se pudo preparar el código QR para descargar.");
      return;
    }
    const safeExport = getSafeExportSize(svg, size);
    if (!safeExport) {
      setDownloadError("No se pudo calcular un tamaño de descarga seguro.");
      return;
    }
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    if (!ctx) {
      setDownloadError("El navegador no permite crear la imagen PNG.");
      return;
    }

    img.onload = () => {
      canvas.width = safeExport.exportSize;
      canvas.height = safeExport.exportSize;
      ctx.imageSmoothingEnabled = false;
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, safeExport.exportSize, safeExport.exportSize);
      ctx.drawImage(img, 0, 0, safeExport.exportSize, safeExport.exportSize);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "mi_codigo_qr.png";
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    img.onerror = () => setDownloadError("No se pudo convertir el código QR en una imagen PNG.");
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <main className="min-h-[100dvh] bg-slate-50 flex flex-col items-center py-6 px-4">
      <div className="w-full max-w-4xl bg-white p-5 sm:p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-8">
        
        {/* Controles */}
        <div className="flex-1 space-y-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            Generador de <span className="text-cyan-500">Códigos QR</span>
          </h1>
          <p className="text-slate-500 text-sm">Convierte enlaces o textos en códigos QR listos para imprimir o compartir.</p>
          
          <div>
            <label htmlFor="qr-contenido" className="block text-sm font-bold text-slate-700 mb-2">Contenido del QR</label>
            <textarea 
              id="qr-contenido"
              value={texto}
              onChange={(event) => {
                setTexto(event.target.value);
                setDownloadError(null);
              }}
              aria-describedby="qr-content-help"
              aria-invalid={Boolean(qrError)}
              className="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-cyan-500 outline-none text-slate-700"
              rows={3}
              placeholder="Introduce la URL o el texto..."
            ></textarea>
            <p id="qr-content-help" role={qrError ? "alert" : undefined} className={`mt-2 text-xs font-medium ${qrError ? "text-rose-600" : "text-slate-500"}`}>
              {qrError ?? `${contentBytes.toLocaleString("es-ES")} de ${MAX_QR_BYTES.toLocaleString("es-ES")} bytes utilizados.`}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="color-frontal" className="block text-sm font-bold text-slate-700 mb-2">Color Frontal</label>
              <div className="flex items-center space-x-2">
                <input id="color-frontal" type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer border-0 p-0" />
                <span className="text-xs text-slate-500 uppercase">{fgColor}</span>
              </div>
            </div>
            <div>
              <label htmlFor="color-fondo" className="block text-sm font-bold text-slate-700 mb-2">Fondo</label>
              <div className="flex items-center space-x-2">
                <input id="color-fondo" type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer border-0 p-0" />
                <span className="text-xs text-slate-500 uppercase">{bgColor}</span>
              </div>
            </div>
          </div>
          
          <div>
              <label htmlFor="qr-size" className="block text-sm font-bold text-slate-700 mb-2">Tamaño mínimo de descarga: {size}px</label>
              <input id="qr-size" type="range" min="100" max="600" step="50" value={size} onChange={(e) => setSize(Number(e.target.value))} aria-describedby="qr-export-help" className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
              <p id="qr-export-help" className="mt-2 text-xs font-medium text-slate-500">
                PNG final: {exportSize} x {exportSize}px{pixelsPerModule ? `, ${pixelsPerModule} píxeles por módulo.` : "."}
              </p>
          </div>
        </div>

        {/* Vista previa */}
        <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 rounded-xl border border-slate-200 p-8">
          <div className="bg-white p-4 shadow-sm rounded-lg mb-6 border border-slate-100 min-h-[232px] min-w-[232px] flex items-center justify-center">
            {qrError ? (
              <p className="max-w-[190px] text-center text-sm font-semibold text-slate-500">Corrige el contenido para mostrar la vista previa.</p>
            ) : (
              <QRCodeSVG
                  id="qr-code-svg"
                  value={texto}
                  size={Math.min(size, 200)}
                  bgColor={bgColor}
                  fgColor={fgColor}
                  level="H"
                  marginSize={4}
                  title="Código QR generado"
              />
            )}
          </div>
          <button 
             onClick={downloadQR}
             disabled={Boolean(qrError)}
             className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-300 text-white font-bold rounded-xl shadow-sm transition-all active:scale-95 w-full max-w-[200px]"
             aria-label="Descargar código QR como imagen PNG"
             aria-describedby={downloadError ? "qr-export-help qr-download-error" : "qr-export-help"}
          >
             Descargar PNG
          </button>
          {downloadError && <p id="qr-download-error" role="alert" className="mt-3 text-center text-sm font-semibold text-rose-600">{downloadError}</p>}
        </div>

      </div>

      {/* Contenido SEO */}
      <article className="w-full max-w-4xl mt-6 bg-white p-5 sm:p-8 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 mb-4">¿Cómo crear un código QR gratis?</h2>
        <div className="text-slate-600 text-sm leading-relaxed space-y-3">
          <p>
            Con nuestro <strong>generador de códigos QR online</strong>, puedes convertir una <strong>URL, texto o enlace compatible</strong> en
            un código QR personalizable en segundos. Elige los <strong>colores</strong>, indica el <strong>tamaño mínimo</strong> y
            descarga tu QR en <strong>PNG de alta resolución</strong>.
          </p>
          <p>
            Los códigos QR son perfectos para <strong>tarjetas de visita</strong>, <strong>menús de restaurante</strong>, 
            <strong>carteles publicitarios</strong>, <strong>packaging</strong> o compartir enlaces de forma rápida.
          </p>
          <p>
            Antes de imprimir o publicar un QR, conviene probarlo en varios moviles y mantener suficiente contraste entre fondo y primer plano.
            Los codigos demasiado pequenos o con colores poco legibles pueden dificultar el escaneo.
          </p>
        </div>

        <div className="mt-6 text-slate-600 text-sm leading-relaxed space-y-3">
          <h3 className="text-base font-bold text-slate-800">Buenas practicas al crear un QR</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Usa una URL final correcta y revisa que no tenga errores.</li>
            <li>Evita fondos oscuros con modulos poco contrastados.</li>
            <li>Reduce el contenido si supera el limite indicado; una URL corta suele producir un patron mas simple.</li>
            <li>Descarga un tamano suficiente si lo vas a imprimir o compartir en gran formato.</li>
          </ul>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Herramientas relacionadas</h3>
          <div className="flex flex-wrap gap-2">
            <Link href="/lector-qr" className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium">
              Lector de QR
            </Link>
            <Link href="/generador-enlace-whatsapp" className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium">
              Generador de enlace WhatsApp
            </Link>
            <Link href="/generador-contrasenas" className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium">
              Generador de Contraseñas
            </Link>
          </div>
        </div>
      </article>

    </main>
  );
}
