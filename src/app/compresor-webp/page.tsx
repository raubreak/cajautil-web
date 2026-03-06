"use client";

import React, { useState, useRef, ChangeEvent } from 'react';
import { Image as ImageIcon, UploadCloud, Settings, Download, Trash2, ArrowRightCircle, Shield, MoveDown } from 'lucide-react';

export default function CompresorWebP() {
  const [file, setFile] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  
  const [quality, setQuality] = useState<number>(80);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  // Función interna para calcular tamaño humano
  const formatBytes = (bytes: number, decimals = 2) => {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };

  const procesarImagen = (fileOrBlob: File | Blob) => {
    // Si ya existe una anterior limpiamos de memoria para no saturar 
    if (imgUrl) URL.revokeObjectURL(imgUrl);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultBlob(null);
    setResultUrl(null);

    const objectUrl = URL.createObjectURL(fileOrBlob);
    setFile(fileOrBlob as File);
    setImgUrl(objectUrl);
  };

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile && uploadedFile.type.startsWith('image/')) {
        procesarImagen(uploadedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
        procesarImagen(droppedFile);
    }
  };

  const convertToWebP = () => {
    if (!imgRef.current || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Ajustar resolución del canvas igual al de la imagen original pura
    canvas.width = imgRef.current.naturalWidth;
    canvas.height = imgRef.current.naturalHeight;

    // Dibujar la imagen
    ctx.drawImage(imgRef.current, 0, 0);

    // Extraer en formato WEBP con compresion decimal
    canvas.toBlob(
      (blob) => {
        if (blob) {
          setResultBlob(blob);
          const newUrl = URL.createObjectURL(blob);
          setResultUrl(newUrl);
        }
      },
      'image/webp',
      quality / 100 // Pasa de 80 -> 0.8
    );
  };

  const handleRemove = () => {
    setFile(null);
    setImgUrl(null);
    setResultBlob(null);
    setResultUrl(null);
  };

  const calcularReduccion = () => {
    if(!file || !resultBlob) return 0;
    const saved = file.size - resultBlob.size;
    const percent = Math.round((saved / file.size) * 100);
    return percent > 0 ? percent : 0;
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center pt-8 pb-16 px-4 sm:px-6 z-10">
      
      {/* HEADER SECTION */}
      <div className="w-full max-w-2xl text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 sm:p-4 bg-sky-100/50 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 shadow-sm border border-sky-50">
          <ImageIcon className="w-8 h-8 sm:w-10 sm:h-10 text-sky-600 fill-sky-600/20" />
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-800 tracking-tight mb-4 leading-tight">
          Convertir a <span className="text-sky-600">WebP</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-500 font-medium max-w-xl mx-auto leading-relaxed px-2">
          Comprime tus imágenes pesadas en JPG o PNG pasándolas a la nueva generación (WebP). Reduce un 80% su peso en segundos.
        </p>
      </div>

      <div className="w-full max-w-5xl flex flex-col items-center mb-12">
        
        {/* APP CONTROLES CENTRALES */}
        <section className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 p-6 sm:p-8 border border-slate-100 w-full mb-8">
            
            {!imgUrl ? (
                /* ESTADO INICIAL -> SUBIDA */
                <label 
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className="border-2 border-dashed border-sky-200 hover:border-sky-400 bg-sky-50 hover:bg-sky-100/50 transition-colors w-full h-[300px] rounded-2xl flex flex-col items-center justify-center cursor-pointer group"
                >
                    <UploadCloud className="w-16 h-16 text-sky-400 group-hover:text-sky-500 mb-4 transition-transform group-hover:-translate-y-2" />
                    <span className="text-lg font-bold text-slate-700">Haz clic o arrastra tu foto aquí</span>
                    <span className="text-sm font-medium text-slate-400 mt-2">Soporta JPG, PNG o HEIC (Max 50MB)</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
                </label>
            ) : (
                /* ESTADO CON IMAGEN */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* PANEL DE Opciones IZQ */}
                    <div className="space-y-6 flex flex-col justify-center">
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between">
                            <div className="max-w-[70%]">
                                <p className="text-sm font-bold text-slate-800 truncate" title={file?.name}>{file?.name}</p>
                                <p className="text-xs text-slate-500 font-mono mt-1">Peso Original: {file ? formatBytes(file.size) : '0'}</p>
                            </div>
                            <button onClick={handleRemove} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition"><Trash2 className="w-5 h-5"/></button>
                        </div>
                        
                        <div>
                            <label className="text-sm font-bold text-slate-700 mb-4 flex items-center justify-between">
                                <span className="flex items-center gap-2"><Settings className="w-4 h-4 text-sky-500" /> Nivel de Calidad Final</span>
                                <span className="text-sky-700 bg-sky-100 px-3 py-1 rounded-lg tabular-nums font-mono text-sm">{quality}%</span>
                            </label>
                            <input
                                type="range"
                                min="10"
                                max="100"
                                step="5"
                                value={quality}
                                onChange={(e) => setQuality(Number(e.target.value))}
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-500 mt-2"
                            />
                            <p className="text-xs text-slate-400 mt-3">(80% es el punto dulce estándar de Google donde el ojo humano no nota compresión).</p>
                        </div>

                        <button
                            onClick={convertToWebP}
                            className="w-full py-4 mt-4 bg-slate-900 hover:bg-sky-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors text-lg group shadow-md"
                        >
                             Comprimir Píxeles <ArrowRightCircle className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    {/* PREVIEW IMAGE OCULTA CARGADA */}
                    {/* La imagen solo debe aparecer o no estorbar -> la ocultamos y usamos objectUrl para pintar */}
                     <div className="hidden">
                        <img 
                            ref={imgRef} 
                            src={imgUrl} 
                            alt="Original resource"
                            crossOrigin="anonymous" 
                            onLoad={() => {
                                // Idealmente podríamos forzar un render inicial si queremos que salga a la 1ª
                            }}
                        />
                        <canvas ref={canvasRef} />
                    </div>

                    {/* PANEL RESULTADOS DERECHA */}
                    <div className={`p-6 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all ${resultUrl ? 'border-emerald-300 bg-emerald-50/50' : 'border-slate-200 bg-slate-50'}`}>
                        {!resultUrl ? (
                            <div className="text-center opacity-50 flex flex-col items-center">
                                <ImageIcon className="w-12 h-12 text-slate-400 mb-3" />
                                <span className="text-sm font-medium">Ajusta tu calidad y dale a procesar para el resultado.</span>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center w-full text-center">
                                <span className="animate-bounce mb-2"><MoveDown className="w-8 h-8 text-emerald-500" /></span>
                                <p className="text-emerald-700 font-bold mb-1">¡Éxito Salvaje!</p>
                                <p className="text-4xl font-black text-slate-800 tabular-nums break-words font-mono mb-4">
                                     {calcularReduccion()}% Menos
                                </p>
                                <p className="text-sm text-slate-500 mb-6">Tu foto ahora pesa <b className="text-emerald-600 bg-emerald-100 px-2 py-1 rounded inline-block mx-1 leading-none">{resultBlob ? formatBytes(resultBlob.size) : '0'}</b> formato ultra rápido WebP.</p>
                                
                                <a
                                    href={resultUrl}
                                    download={`cajautil_compress_${quality}.webp`}
                                    className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-emerald-500/20 shadow-lg text-lg ring-4 ring-emerald-50"
                                >
                                    <Download className="w-5 h-5" /> Descargar 
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
      </div>

      {/* SEO & CONTENT SECTION */}
      <section className="w-full max-w-4xl prose prose-slate prose-headings:text-slate-800 mb-16 px-2 text-slate-600">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-800">
          <Shield className="w-6 h-6 text-sky-500" />
          Velocidad WebP sin Servidores Externos.
        </h2>
        
        <p>A diferencia de otras gigantescas webs de edición fotográfica, nosotros <strong>no enviamos jamás tu fotografía de la cara, documentos o diseños a ningún servidor oscuro</strong> por internet.</p>

        <p>Todo el algortímo matemático funciona invocando a la API Canvas interna que el Navegador Chrome, Safari o Android ya tiene pre-instalada. El motor gráfico de tu hardware lee los píxeles (RGB), descarta los imperceptibles al ojo en JPG o PNG y re-escribe el encabezado y contenido en el formato binario <code>.WEBP</code> (el estándar libre introducido por Google PageSpeed).</p>

        <h3 className="text-lg font-bold">Por qué deberías subir el 100% como WebP</h3>
        <p>Especialmente para eCommerce como Woocommerce, PrestaShop o tu portfolio de desarrollo, subir una imagen JPEG sacada pura de tu cámara (7 Megabytes) estampará tu velocidad de carga. Sin embargo, aplicando un WebP en calidad media (Q=75) podemos entregar la misma foto que mantendrá idéntico color por apenas <strong>140 Kilobytes.</strong></p>
        
      </section>
      
    </main>
  );
}
