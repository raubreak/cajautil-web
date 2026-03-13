
import React from 'react';
import Image from 'next/image';

const AuthorSection = () => {
  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm mt-12 mb-8 flex flex-col md:flex-row items-center gap-8">
      <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-blue-50/50">
        <div className="w-full h-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-black">
          RB
        </div>
      </div>
      <div className="text-center md:text-left">
        <h3 className="text-xl font-bold text-slate-900 mb-2">Revisado por Raúl B.</h3>
        <p className="text-slate-500 font-medium text-sm mb-4">
          Especialista en Herramientas Digitales y Automatización Web
        </p>
        <p className="text-slate-600 leading-relaxed text-sm">
          Raúl cuenta con más de 10 años de experiencia desarrollando utilidades web que simplifican la vida digital. 
          Cada herramienta y contenido en CajaUtil.com es revisado meticulosamente para asegurar precisión, seguridad y la mejor experiencia de usuario, 
          cumpliendo con altos estándares de transparencia y utilidad.
        </p>
      </div>
    </div>
  );
};

export default AuthorSection;
