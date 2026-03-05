"use client";

import React, { useState } from 'react';
import { UserPlus, Settings2, Copy, RefreshCw, CheckCircle, Search, Link as LinkIcon, BookOpen } from 'lucide-react';
import Link from 'next/link';

// Diccionario de nombres en Español
const NOMBRES_MASCULINOS = [
  "Hugo", "Martín", "Lucas", "Mateo", "Leo", "Daniel", "Alejandro", "Pablo", "Manuel", 
  "Álvaro", "Adrián", "David", "Mario", "Enzo", "Diego", "Marcos", "Izan", "Javier", 
  "Marco", "Álex", "Bruno", "Oliver", "Miguel", "Thiago", "Antonio", "Marc", "Carlos", 
  "Ángel", "Juan", "Gonzalo", "Gael", "Sergio", "Nicolás", "Dylan", "Gabriel", "Jorge", 
  "José", "Adam", "Liam", "Eric", "Samuel", "Darío", "Héctor", "Luca", "Iker", "Amir"
];

const NOMBRES_FEMENINOS = [
  "Lucía", "Sofía", "Martina", "María", "Julia", "Paula", "Valeria", "Emma", "Daniela", 
  "Carla", "Alba", "Noa", "Carmen", "Claudia", "Valentina", "Alma", "Ana", "Chloe", 
  "Elena", "Mia", "Vega", "Lara", "Sara", "Triana", "Alejandra", "Candela", "Vera", 
  "Olivia", "Laia", "Lola", "Jimena", "Blanca", "Mireia", "Irene", "Ariadna", "Ainhoa", 
  "Marina", "Luna", "Nora", "Celia", "Inés", "Carlota", "Lina", "Aitana", "Isabel"
];

const APELLIDOS = [
  "García", "Rodríguez", "González", "Fernández", "López", "Martínez", "Sánchez", 
  "Pérez", "Gómez", "Martín", "Jiménez", "Ruiz", "Hernández", "Díaz", "Moreno", 
  "Muñoz", "Álvarez", "Romero", "Alonso", "Gutiérrez", "Navarro", "Torres", "Domínguez", 
  "Vázquez", "Ramos", "Gil", "Ramírez", "Serrano", "Blanco", "Molina", "Morales", 
  "Suárez", "Ortega", "Delgado", "Castro", "Ortiz", "Rubio", "Marín", "Iglesias"
];

const GeneradorNombres = () => {
  const [cantidad, setCantidad] = useState<number>(3);
  const [genero, setGenero] = useState<"aleatorio" | "masculino" | "femenino">("aleatorio");
  const [numApellidos, setNumApellidos] = useState<number>(2);
  const [resultados, setResultados] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generarNombres = () => {
    let nuevosNombres: string[] = [];
    for (let i = 0; i < cantidad; i++) {
      let nombreBase = "";
      
      // Decidir género para este nombre en concreto
      let genActual = genero;
      if (genActual === "aleatorio") {
        genActual = Math.random() > 0.5 ? "masculino" : "femenino";
      }

      // Obtener el nombre
      if (genActual === "masculino") {
        nombreBase = NOMBRES_MASCULINOS[Math.floor(Math.random() * NOMBRES_MASCULINOS.length)];
      } else {
        nombreBase = NOMBRES_FEMENINOS[Math.floor(Math.random() * NOMBRES_FEMENINOS.length)];
      }

      // Obtener apellidos
      let listaApellidos = [];
      for(let j = 0; j < numApellidos; j++) {
        listaApellidos.push(APELLIDOS[Math.floor(Math.random() * APELLIDOS.length)]);
      }

      const fullname = `${nombreBase} ${listaApellidos.join(" ")}`.trim();
      nuevosNombres.push(fullname);
    }
    setResultados(nuevosNombres);
    setCopiedIndex(null);
  };

  const copiarAlPortapapeles = (texto: string, idx: number) => {
    navigator.clipboard.writeText(texto);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center pt-8 pb-16 px-4 sm:px-6 z-10">
      
      {/* HEADER SECTION */}
      <div className="w-full max-w-2xl text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 sm:p-4 bg-teal-100/50 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 shadow-sm border border-teal-50">
          <UserPlus className="w-8 h-8 sm:w-10 sm:h-10 text-teal-600" />
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-800 tracking-tight mb-4 leading-tight">
          Generador de <span className="text-teal-600">Nombres</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-500 font-medium max-w-xl mx-auto leading-relaxed px-2">
          Crea identidades realistas, listas de nombres al azar y apellidos para bebés, libros, y videojuegos.
        </p>
      </div>

      {/* GENERATOR PLATFORM */}
      <section className="w-full max-w-2xl bg-white rounded-3xl shadow-xl shadow-slate-200/40 p-6 sm:p-10 border border-slate-100 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Opciones Panel */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Cantidad: {cantidad}</label>
              <input
                type="range"
                min="1"
                max="20"
                value={cantidad}
                onChange={(e) => setCantidad(parseInt(e.target.value))}
                className="w-full accent-teal-600"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Género</label>
              <select
                value={genero}
                onChange={(e) => setGenero(e.target.value as "aleatorio" | "masculino" | "femenino")}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-100 focus:border-teal-500 bg-white"
              >
                <option value="aleatorio">Aleatorio Cualquiera</option>
                <option value="masculino">Chico / Hombre</option>
                <option value="femenino">Chica / Mujer</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Apellidos por nombre</label>
              <select
                value={numApellidos}
                onChange={(e) => setNumApellidos(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-100 focus:border-teal-500 bg-white"
              >
                <option value={0}>Ninguno (Solo Nombre)</option>
                <option value={1}>1 Apellido</option>
                <option value={2}>2 Apellidos</option>
              </select>
            </div>
            
            <button
              onClick={generarNombres}
              className="w-full mt-4 bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Generar Nombres
            </button>
          </div>

          {/* Resultados Lado Derecho */}
          <div className="md:col-span-2 bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-6 min-h-[300px]">
             {resultados.length === 0 ? (
               <div className="h-full flex flex-col items-center justify-center text-slate-400">
                  <BookOpen className="w-12 h-12 mb-3 opacity-30" />
                  <p className="text-sm font-medium">Configura y haz clic en Generar</p>
               </div>
             ) : (
               <ul className="space-y-3">
                 {resultados.map((res, index) => (
                   <li key={index} className="flex items-center justify-between bg-white border border-slate-200 p-3 rounded-xl shadow-sm hover:border-teal-300 transition-colors">
                      <span className="font-semibold text-slate-700 capitalize text-lg tracking-tight">{res}</span>
                      <button
                        onClick={() => copiarAlPortapapeles(res, index)}
                        className={`p-2 rounded-md transition-colors ${copiedIndex === index ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700'}`}
                        title="Copiar al portapapeles"
                      >
                        {copiedIndex === index ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                      </button>
                   </li>
                 ))}
               </ul>
             )}
          </div>
        </div>
      </section>

      {/* SEO & CONTENT SECTION */}
      <section className="w-full max-w-3xl prose prose-slate prose-headings:text-slate-800 mb-16 px-2">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-800">
          <BookOpen className="w-6 h-6 text-teal-500" />
          ¿Para qué sirve crear nombres aleatorios?
        </h2>
        
        <p>Un generador de identidades ficticias y <strong>nombres reales y españoles</strong> es increíblemente útil por muchas razones creativas y de trabajo:</p>
        
        <ul>
          <li><strong>Papilas Literarias:</strong> Escritores que buscan ideas verosímiles de cómo llamar a los personajes de su próximo libro o guión.</li>
          <li><strong>Juegos de Rol y Videogames:</strong> Buscar un apodo "RP" o de Real-Play sin ser repetitivo usando opciones masculinas o femeninas.</li>
          <li><strong>Padres indecisos:</strong> Las mezclas azarosas en nuestra base de datos te pueden inspirar para elegir un nombre de bebé precioso por el que antes nunca te habrías decantado.</li>
          <li><strong>Tests de Programación:</strong> Desarrolladores que necesitan nombres ficticios pero que suenen realistas para poblar tablas de bases de datos `mock`.</li>
        </ul>

      </section>

      {/* FAQ SECTION */}
      <section className="w-full max-w-3xl px-2" aria-label="Preguntas Frecuentes">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b border-slate-200 pb-4">Preguntas Frecuentes</h2>
        <div className="space-y-4">
          <details className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden group">
            <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:text-teal-600 transition-colors">
              <h3 className="text-base font-bold m-0 pr-4">¿Esta web elige el nombre más bonito de Europa o América?</h3>
              <span className="text-teal-500 text-xl group-open:rotate-45 transition-transform">+</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 leading-relaxed">
              <p>Nuestra base de datos matemática inyecta nombres 100% de la fonética hispano-latina (ej.: García, España, México). Su funcionamiento garantiza que sea pura suerte el resultado.</p>
            </div>
          </details>

          <details className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden group">
            <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:text-teal-600 transition-colors">
              <h3 className="text-base font-bold m-0 pr-4">¿Puedo copiar masivamente todos los datos?</h3>
              <span className="text-teal-500 text-xl group-open:rotate-45 transition-transform">+</span>
            </summary>
            <div className="px-5 pb-5 text-slate-600 leading-relaxed">
               <p>Sí, puedes usar el icono lateral encima de cada resultado, aunque por ahora se debe clicar de forma unitaria en cada uno de ellos a tu lista.</p>
            </div>
          </details>
        </div>
      </section>
    </main>
  );
};

export default GeneradorNombres;
