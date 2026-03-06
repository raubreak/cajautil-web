"use client";
import { useState, useRef } from "react";
import jsQR from "jsqr";
import Link from "next/link";
import { ScanSearch } from "lucide-react";

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
    <main className="min-h-screen bg-slate-50 flex flex-col items-center pt-8 pb-16 px-4">
      {/* HEADER SECTION */}
      <div className="w-full max-w-2xl text-center mb-10">
        <div className="inline-flex items-center justify-center p-4 bg-indigo-100/50 rounded-3xl mb-6 border border-indigo-50 shadow-sm">
          <ScanSearch className="w-10 h-10 text-indigo-600" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight mb-4">
          Lector de Códigos <span className="text-indigo-600">QR</span> Online
        </h1>
        <p className="text-lg text-slate-500 font-medium max-w-lg mx-auto">
          Sube o toma una foto de un código QR y extraemos su contenido al instante. 100% privado en tu navegador.
        </p>
      </div>

      <div className="w-full max-w-3xl bg-white rounded-[40px] shadow-2xl p-8 border border-slate-100 flex flex-col gap-6 mb-12">
        <div className="flex flex-col items-center space-y-6">
          
          <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-slate-300 border-dashed rounded-3xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors focus-within:ring-4 focus-within:ring-indigo-100 focus-within:border-indigo-400">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <ScanSearch className="w-12 h-12 mb-3 text-slate-400" />
              <p className="mb-2 text-slate-700 font-bold text-lg">Haz clic o toca para subir la foto del QR</p>
              <p className="text-sm text-slate-400">JPG, PNG, WEBP (Max 10MB)</p>
            </div>
            <input type="file" className="hidden" accept="image/*" onChange={manejarSubida} aria-label="Subir imagen con código QR" />
          </label>

          {nombreArchivo && <p className="text-sm font-bold bg-indigo-50 items-center justify-center py-2 px-4 rounded-full text-indigo-600">Archivo analizado: {nombreArchivo}</p>}

          <canvas ref={canvasRef} className="hidden"></canvas>

          {errorDesc && (
            <div className="w-full p-4 bg-red-50 text-red-800 rounded-2xl border border-red-200 text-sm font-semibold text-center" role="alert">
              🚨 {errorDesc}
            </div>
          )}

          {resultado && (
            <div className="w-full p-8 bg-indigo-50 border border-indigo-100 rounded-3xl flex flex-col items-center" role="status">
               <p className="text-sm uppercase font-black tracking-widest text-indigo-400 mb-6 drop-shadow-sm">Contenido Extraído con Éxito</p>
               <div className="w-full bg-white p-6 rounded-2xl border border-indigo-100/50 shadow-inner font-mono text-base break-all text-slate-800 text-center mb-8">
                 {resultado}
               </div>

               {isLink(resultado) ? (
                 <a 
                   href={resultado} 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg rounded-2xl text-center shadow-md transition-colors block"
                  >
                   🌐 Abrir Enlace en nueva pestaña
                 </a>
               ) : (
                 <button 
                   onClick={() => navigator.clipboard.writeText(resultado)}
                   className="w-full py-4 bg-slate-800 hover:bg-slate-900 text-white font-black text-lg rounded-2xl text-center shadow-md transition-colors"
                  >
                   📋 Copiar al Portapapeles
                 </button>
               )}
            </div>
          )}
        </div>
      </div>

      {/* Contenido SEO */}
      <section className="w-full max-w-3xl prose prose-slate prose-p:leading-relaxed prose-headings:font-black prose-headings:text-slate-800 px-4 text-slate-600 prose-a:text-indigo-600">
        <h2>¿Cómo escanear un QR desde una foto?</h2>
        <p>
          Nuestro <strong>lector de códigos QR online</strong> permite <strong>escanear un QR desde cualquier foto o captura de pantalla</strong>. 
          Solo tienes que subir la imagen y extraemos el contenido (URL, texto, datos de contacto) al instante.
        </p>
        <p>
          La imagen se procesa <strong>100% localmente en tu navegador</strong> usando JavaScript y <strong>nunca se envía a ningún servidor</strong>. 
          Tu privacidad e historial de fotos están totalmente garantizados.
        </p>

        <h3>Herramientas relacionadas</h3>
        <ul>
          <li><Link href="/generador-qr">Generador de QR Personalizado</Link></li>
          <li><Link href="/contador-de-palabras">Contador de Palabras y Caracteres</Link></li>
        </ul>
      </section>
    </main>
  );
}
