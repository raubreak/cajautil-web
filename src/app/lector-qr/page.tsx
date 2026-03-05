"use client";
import { useState, useRef } from "react";
import jsQR from "jsqr";
import Link from "next/link";

export default function LectorQR() {
  const [resultado, setResultado] = useState<string | null>(null);
  const [errorDesc, setErrorDesc] = useState<string | null>(null);
  const [nombreArchivo, setNombreArchivo] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const manejarSubida = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setErrorDesc(null);
    setResultado(null);
    const file = files[0];
    setNombreArchivo(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          setResultado(code.data);
        } else {
          setErrorDesc("No se ha detectado ningún código QR válido en la imagen. Intenta con otra de mayor calidad o mejor enfocada.");
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const isLink = (str: string) => {
    return /^https?:\/\//i.test(str);
  };

  return (
    <main className="min-h-[100dvh] bg-slate-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-2xl bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-slate-100 mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-2 text-center tracking-tight">
          Lector de Códigos <span className="text-indigo-500">QR</span> Online
        </h1>
        <p className="text-center text-slate-500 text-sm mb-8">Sube o toma una foto de un código QR y extraemos su contenido al instante. 100% privado.</p>

        <div className="flex flex-col items-center space-y-6">
          
          <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-slate-300 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-10 h-10 mb-3 text-slate-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
              </svg>
              <p className="mb-2 text-sm text-slate-500 font-bold">Haz clic o toca para subir la foto del QR</p>
              <p className="text-xs text-slate-400">Archivos soportados: JPG, PNG, WEBP (Max 10MB)</p>
            </div>
            <input type="file" className="hidden" accept="image/*" onChange={manejarSubida} aria-label="Subir imagen con código QR" />
          </label>

          {nombreArchivo && <p className="text-sm font-medium text-indigo-600">Archivo analizado: {nombreArchivo}</p>}

          <canvas ref={canvasRef} className="hidden"></canvas>

          {errorDesc && (
            <div className="w-full p-4 bg-red-50 text-red-800 rounded-xl border border-red-200 text-sm font-medium text-center" role="alert">
              🚨 {errorDesc}
            </div>
          )}

          {resultado && (
            <div className="w-full p-6 bg-indigo-50 border border-indigo-200 rounded-xl flex flex-col items-center" role="status">
               <p className="text-xs uppercase font-bold tracking-wider text-indigo-400 mb-4">Contenido Extraído con Éxito</p>
               <div className="w-full bg-white p-4 rounded-lg border border-indigo-100 font-mono text-sm break-all text-slate-800 text-center mb-6">
                 {resultado}
               </div>

               {isLink(resultado) ? (
                 <a 
                   href={resultado} 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-xl text-center shadow-md transition-colors block"
                  >
                   🌐 Abrir Enlace en nueva pestaña
                 </a>
               ) : (
                 <button 
                   onClick={() => navigator.clipboard.writeText(resultado)}
                   className="w-full py-3 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl text-center shadow-md transition-colors"
                  >
                   📋 Copiar al Portapapeles
                 </button>
               )}
            </div>
          )}

        </div>
      </div>

       {/* Banner AdSense */}
       <div className="w-full max-w-2xl bg-white border border-slate-200 flex flex-col items-center justify-center text-slate-400 text-sm font-medium rounded-xl h-[120px] shadow-sm mb-8">
        Publicidad Google AdSense
      </div>

      {/* Contenido SEO */}
      <article className="w-full max-w-2xl bg-white p-5 sm:p-8 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 mb-4">¿Cómo escanear un QR desde una foto?</h2>
        <div className="text-slate-600 text-sm leading-relaxed space-y-3">
          <p>
            Nuestro <strong>lector de códigos QR online</strong> permite <strong>escanear un QR desde cualquier foto o captura de pantalla</strong>. 
            Solo tienes que subir la imagen y extraemos el contenido (URL, texto, datos de contacto) al instante.
          </p>
          <p>
            La imagen se procesa <strong>100% en tu navegador</strong> y <strong>nunca se envía a ningún servidor</strong>. 
            Tu privacidad está garantizada.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Herramientas relacionadas</h3>
          <div className="flex flex-wrap gap-2">
            <Link href="/generador-qr" className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium">
              Generador de QR
            </Link>
            <Link href="/contador-de-palabras" className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium">
              Contador de Palabras
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
