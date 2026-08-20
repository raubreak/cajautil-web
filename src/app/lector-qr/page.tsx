"use client";
import { useRef, useState } from "react";
import jsQR from "jsqr";
import Link from "next/link";
import { Check, Copy, ExternalLink, LoaderCircle, ScanSearch, ShieldAlert } from "lucide-react";

import { trackToolEvent } from '@/lib/analytics';

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MAX_SOURCE_PIXELS = 32_000_000;
const MAX_PROCESSING_PIXELS = 4_000_000;
const SUPPORTED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

const getHttpUrl = (value: string) => {
  try {
    const url = new URL(value.trim());
    return url.protocol === "http:" || url.protocol === "https:" ? url : null;
  } catch {
    return null;
  }
};

export default function LectorQR() {
  const [resultado, setResultado] = useState<string | null>(null);
  const [errorDesc, setErrorDesc] = useState<string | null>(null);
  const [nombreArchivo, setNombreArchivo] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scanIdRef = useRef(0);

  const manejarSubida = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const scanId = ++scanIdRef.current;
    setErrorDesc(null);
    setResultado(null);
    setCopyStatus("idle");
    setIsProcessing(false);
    const file = files[0];
    e.currentTarget.value = "";
    trackToolEvent('tool_started', 'lector-qr');

    if (!SUPPORTED_IMAGE_TYPES.has(file.type)) {
      setNombreArchivo("");
      setErrorDesc("Formato no compatible. Usa una imagen JPG, PNG o WebP.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setNombreArchivo("");
      setErrorDesc("La imagen supera el límite de 10 MB. Reduce su tamaño e inténtalo de nuevo.");
      return;
    }

    setNombreArchivo(file.name);
    setIsProcessing(true);

    let imageUrl: string;
    try {
      imageUrl = URL.createObjectURL(file);
    } catch {
      setIsProcessing(false);
      setErrorDesc("No se ha podido preparar la imagen seleccionada.");
      return;
    }

    const img = new Image();
    img.onload = () => {
      try {
        if (scanId !== scanIdRef.current) return;

        const sourcePixels = img.naturalWidth * img.naturalHeight;
        if (sourcePixels === 0 || sourcePixels > MAX_SOURCE_PIXELS) {
          setErrorDesc("La foto supera el límite de 32 megapíxeles. Reduce su resolución e inténtalo de nuevo.");
          return;
        }

        const canvas = canvasRef.current;
        if (!canvas) throw new Error("Canvas unavailable");
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) throw new Error("Canvas context unavailable");

        const scale = Math.min(1, Math.sqrt(MAX_PROCESSING_PIXELS / sourcePixels));
        canvas.width = Math.max(1, Math.round(img.naturalWidth * scale));
        canvas.height = Math.max(1, Math.round(img.naturalHeight * scale));
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        const decodedContent = code?.data;

        if (decodedContent?.trim()) {
          setResultado(decodedContent);
          trackToolEvent('tool_completed', 'lector-qr');
        } else {
          setErrorDesc("No se ha detectado ningún código QR válido. Prueba una foto más nítida o recorta la imagen alrededor del código.");
        }
      } catch {
        if (scanId === scanIdRef.current) {
          setErrorDesc("No se ha podido procesar la imagen. Prueba con otro archivo JPG, PNG o WebP.");
        }
      } finally {
        URL.revokeObjectURL(imageUrl);
        if (scanId === scanIdRef.current) setIsProcessing(false);
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(imageUrl);
      if (scanId !== scanIdRef.current) return;
      setIsProcessing(false);
      setErrorDesc("No se ha podido abrir la imagen. Comprueba que el archivo no esté dañado.");
    };
    img.src = imageUrl;
  };

  const copiarResultado = async () => {
    if (!resultado) return;
    setCopyStatus("idle");

    try {
      await navigator.clipboard.writeText(resultado);
      setCopyStatus("copied");
      trackToolEvent('result_copied', 'lector-qr');
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = resultado;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();

      try {
        const copied = document.execCommand("copy");
        setCopyStatus(copied ? "copied" : "error");
        if (copied) trackToolEvent('result_copied', 'lector-qr');
      } catch {
        setCopyStatus("error");
      } finally {
        textarea.remove();
      }
    }
  };

  const decodedUrl = resultado ? getHttpUrl(resultado) : null;

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center pt-8 pb-16 px-4">
      {/* HEADER SECTION */}
      <div className="w-full max-w-2xl text-center mb-10">
        <div className="inline-flex items-center justify-center p-4 bg-indigo-100/50 rounded-3xl mb-6 border border-indigo-50 shadow-sm">
          <ScanSearch className="w-10 h-10 text-indigo-600" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight mb-4">
          Leer <span className="text-indigo-600">QR desde una imagen</span>
        </h1>
        <p className="text-lg text-slate-500 font-medium max-w-lg mx-auto">
          Sube una foto o captura con un código QR y extrae su contenido directamente en tu navegador.
        </p>
      </div>

      <div className="w-full max-w-3xl bg-white rounded-[40px] shadow-2xl p-8 border border-slate-100 flex flex-col gap-6 mb-12">
        <div className="flex flex-col items-center space-y-6">
          
          <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-slate-300 border-dashed rounded-3xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors focus-within:ring-4 focus-within:ring-indigo-100 focus-within:border-indigo-400">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <ScanSearch className="w-12 h-12 mb-3 text-slate-400" />
              <p className="mb-2 text-slate-700 font-bold text-lg">Haz clic o toca para subir la foto del QR</p>
              <p className="text-sm text-slate-600">JPG, PNG o WebP (máximo 10 MB)</p>
            </div>
            <input type="file" className="hidden" accept="image/jpeg,image/png,image/webp" onChange={manejarSubida} aria-label="Subir imagen con código QR" />
          </label>

          {nombreArchivo && <p className="text-sm font-bold bg-indigo-50 items-center justify-center py-2 px-4 rounded-full text-indigo-600">Archivo seleccionado: {nombreArchivo}</p>}

          <canvas ref={canvasRef} className="hidden"></canvas>

          {isProcessing && (
            <div className="flex items-center gap-2 text-sm font-bold text-indigo-700" role="status">
              <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
              Analizando la imagen en tu navegador...
            </div>
          )}

          {errorDesc && (
            <div className="w-full p-4 bg-red-50 text-red-800 rounded-2xl border border-red-200 text-sm font-semibold text-center" role="alert">
              {errorDesc}
            </div>
          )}

          {resultado && (
            <div className="w-full p-8 bg-indigo-50 border border-indigo-100 rounded-3xl flex flex-col items-center" aria-live="polite">
               <p className="text-sm uppercase font-black tracking-widest text-indigo-700 mb-6">Contenido extraído</p>
               <div className="w-full bg-white p-6 rounded-2xl border border-indigo-100/50 shadow-inner font-mono text-base break-all text-slate-800 text-center mb-8">
                 {resultado}
               </div>

               {decodedUrl && (
                 <div className="mb-4 flex w-full items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
                   <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                   <p>Comprueba el dominio <strong>{decodedUrl.hostname}</strong> antes de abrir el enlace. Un QR puede dirigir a una web engañosa.</p>
                 </div>
               )}

               <div className={`grid w-full gap-3 ${decodedUrl ? "sm:grid-cols-2" : ""}`}>
                 {decodedUrl && (
                  <a
                    href={decodedUrl.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-4 text-center text-base font-black text-white shadow-md transition-colors hover:bg-indigo-700"
                   >
                    <ExternalLink className="h-5 w-5" aria-hidden="true" /> Abrir enlace
                  </a>
                 )}
                  <button
                    type="button"
                    onClick={copiarResultado}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-800 py-4 text-center text-base font-black text-white shadow-md transition-colors hover:bg-slate-900"
                  >
                    {copyStatus === "copied" ? <Check className="h-5 w-5" aria-hidden="true" /> : <Copy className="h-5 w-5" aria-hidden="true" />}
                    {copyStatus === "copied" ? "Contenido copiado" : "Copiar contenido"}
                  </button>
               </div>
               <p className={`mt-3 text-sm font-semibold ${copyStatus === "error" ? "text-red-700" : "text-indigo-700"}`} aria-live="polite">
                 {copyStatus === "error" ? "No se pudo copiar. Selecciona el contenido manualmente." : copyStatus === "copied" ? "Contenido copiado al portapapeles." : ""}
               </p>
            </div>
          )}
        </div>
      </div>

      {/* Contenido SEO */}
      <section className="w-full max-w-3xl prose prose-slate prose-p:leading-relaxed prose-headings:font-black prose-headings:text-slate-800 px-4 text-slate-600 prose-a:text-indigo-600">
        <h2>¿Cómo escanear un QR desde una foto?</h2>
        <p>
          Nuestro <strong>lector de códigos QR online</strong> permite <strong>leer un QR desde una foto, imagen o captura de pantalla</strong>.
          Solo tienes que subir el archivo para extraer el contenido que el código almacena, como una URL o un texto.
        </p>
        <p>
          La imagen se procesa en la propia pagina para leer el codigo QR contenido en la foto.
          Las fotos grandes se reducen antes del analisis para limitar el uso de memoria. Despues puedes copiar cualquier contenido y, si es una URL HTTP o HTTPS, revisar su dominio antes de abrirla.
        </p>

        <h2>Consejos para mejorar el escaneo</h2>
        <ul>
          <li><strong>Usa una imagen nitida</strong> y con el QR centrado.</li>
          <li><strong>Evita reflejos y desenfoque</strong> para mejorar la deteccion.</li>
          <li><strong>Si el QR es muy pequeno</strong>, intenta recortarlo antes de subirlo.</li>
        </ul>

        <h3>Herramientas relacionadas</h3>
        <ul>
          <li><Link href="/generador-qr">Generador de QR Personalizado</Link></li>
          <li><Link href="/generador-enlace-whatsapp">Generador de enlace WhatsApp</Link></li>
          <li><Link href="/contador-de-palabras">Contador de Palabras y Caracteres</Link></li>
        </ul>
      </section>
    </main>
  );
}
