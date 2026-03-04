"use client";
import { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";

export default function GeneradorQR() {
  const [texto, setTexto] = useState("https://utilidades-web.vercel.app");
  const [size, setSize] = useState(200);
  const [bgColor, setBgColor] = useState("#ffffff");
  const [fgColor, setFgColor] = useState("#000000");

  const downloadQR = () => {
    const svg = document.getElementById("qr-code-svg");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    img.onload = () => {
      canvas.width = size;
      canvas.height = size;
      ctx!.fillStyle = bgColor;
      ctx!.fillRect(0, 0, size, size);
      ctx!.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "mi_codigo_qr.png";
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <main className="min-h-[100dvh] bg-slate-50 flex flex-col items-center py-6 px-4">
      <div className="w-full max-w-4xl bg-white p-5 sm:p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-8">
        
        {/* Controles */}
        <div className="flex-1 space-y-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            Generador de <span className="text-cyan-500">QR</span>
          </h1>
          <p className="text-slate-500 text-sm">Convierte enlaces o textos en códigos listos para imprimir.</p>
          
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Contenido del QR</label>
            <textarea 
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              className="w-full border border-slate-300 rounded-xl p-3 focus:ring-2 focus:ring-cyan-500 outline-none text-slate-700"
              rows={3}
              placeholder="Introduce la URL o el texto..."
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Color Frontal</label>
              <div className="flex items-center space-x-2">
                <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer border-0 p-0" />
                <span className="text-xs text-slate-500 uppercase">{fgColor}</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Fondo</label>
              <div className="flex items-center space-x-2">
                <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer border-0 p-0" />
                <span className="text-xs text-slate-500 uppercase">{bgColor}</span>
              </div>
            </div>
          </div>
          
          <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Tamaño de descarga: {size}px</label>
              <input type="range" min="100" max="600" step="50" value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
          </div>
        </div>

        {/* Vista previa */}
        <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 rounded-xl border border-slate-200 p-8">
          <div className="bg-white p-4 shadow-sm rounded-lg mb-6 border border-slate-100">
             <QRCodeSVG 
                id="qr-code-svg"
                value={texto || " "} 
                size={Math.min(size, 200)} // Preview size max 200 for responsive layout
                bgColor={bgColor}
                fgColor={fgColor}
                level="H"
                includeMargin={false}
             />
          </div>
          <button 
             onClick={downloadQR}
             disabled={!texto}
             className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-300 text-white font-bold rounded-xl shadow-sm transition-all active:scale-95 w-full max-w-[200px]"
          >
             Descargar PNG
          </button>
        </div>

      </div>

      {/* AdSense Bottom */}
      <div className="w-full max-w-4xl mt-6 bg-slate-200 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-sm font-medium rounded-xl h-[120px]">
        Espacio Publicitario
      </div>

    </main>
  );
}
