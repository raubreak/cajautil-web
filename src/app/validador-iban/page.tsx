"use client";

import React, { useState } from 'react';
import { CreditCard, CheckCircle, AlertTriangle, ShieldCheck, Search, Link as LinkIcon, Plus } from 'lucide-react';
import Link from 'next/link';

interface ValidationResult {
  status: 'idle' | 'valid' | 'invalid' | 'unsupported';
  banksCode?: string;
  message?: string;
}

export default function ValidadorIBAN() {
  const [ibanInput, setIbanInput] = useState('');
  const [result, setResult] = useState<ValidationResult>({ status: 'idle' });

  const validateIBAN = (value: string) => {
    const iban = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (!iban) {
      setResult({ status: 'idle', message: 'Introduce un IBAN para validar' });
      return;
    }

    if (iban.length < 15 || iban.length > 34 || !/^[A-Z]{2}[0-9]{2}[A-Z0-9]+$/.test(iban)) {
      setResult({ status: 'invalid', message: 'Formato incorrecto. Revisa las letras o la longitud.' });
      return;
    }

    const countryCode = iban.slice(0, 2);
    if (countryCode !== 'ES') {
      setResult({
        status: 'unsupported',
        message: `El prefijo introducido es ${countryCode}. Esta herramienta comprueba únicamente la estructura de IBAN españoles.`,
      });
      return;
    }

    if (!/^ES[0-9]{22}$/.test(iban)) {
      setResult({
        status: 'invalid',
        message: 'Un IBAN español debe contener ES, 2 dígitos de control y los 20 números del CCC.',
      });
      return;
    }

    // Algoritmo mod-97
    const rearranged = iban.substring(4) + iban.substring(0, 4);
    const numeric = rearranged.split('').map(c => {
      const code = c.charCodeAt(0);
      return code >= 65 && code <= 90 ? (code - 55).toString() : c;
    }).join('');

    let remainder = numeric;
    let block;
    while (remainder.length > 2) {
      block = remainder.slice(0, 9);
      remainder = (parseInt(block, 10) % 97).toString() + remainder.slice(block.length);
    }
    const isValid = parseInt(remainder, 10) % 97 === 1;

    setResult({
      status: isValid ? 'valid' : 'invalid',
      banksCode: iban.substring(4, 8),
      message: isValid
        ? 'La estructura española y los dígitos de control MOD-97 son coherentes.'
        : 'El IBAN no pasa la comprobación de los dígitos de control.'
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setIbanInput(val);
    if (val.trim() === '') {
      setResult({ status: 'idle' });
    } else {
      validateIBAN(val);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center pt-8 pb-16 px-4 sm:px-6 z-10">
      
      {/* HEADER SECTION */}
      <div className="w-full max-w-2xl text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 sm:p-4 bg-indigo-100/50 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 shadow-sm border border-indigo-50">
          <CreditCard className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-600" />
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-800 tracking-tight mb-4 leading-tight">
          Validador de <span className="text-indigo-600">IBAN español</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-500 font-medium max-w-xl mx-auto leading-relaxed px-2">
          Comprueba la estructura española y los dígitos de control MOD-97 de forma local en tu navegador.
        </p>
      </div>

      {/* CALCULATOR TOOL SECTION */}
      <section className="w-full max-w-2xl bg-white rounded-3xl shadow-xl shadow-slate-200/40 p-6 sm:p-10 border border-slate-100 mb-12">
        <label htmlFor="iban-input" className="block text-sm font-bold text-slate-700 mb-2">
          Introduce el código IBAN de la cuenta
        </label>
        <div className="relative mb-6">
          <input
            id="iban-input"
            type="text"
            className="w-full px-5 py-4 sm:py-5 border border-slate-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all font-mono text-lg sm:text-xl uppercase tracking-wider"
            placeholder="ESXX XXXX XXXX ..."
            value={ibanInput}
            onChange={handleInputChange}
            autoComplete="off"
            spellCheck="false"
          />
        </div>

        {/* RESULTS BOX */}
        {ibanInput && (
          <div className="mt-6">
            {result.status === 'valid' ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 flex flex-col sm:flex-row items-center gap-4 text-emerald-800 shadow-sm transition-all duration-300">
                <CheckCircle className="w-10 h-10 text-emerald-500 flex-shrink-0" />
                <div className="text-center sm:text-left">
                  <p className="font-bold text-lg mb-1">La comprobación matemática es correcta</p>
                  <p className="text-emerald-700 font-medium text-sm sm:text-base">
                    {result.message} El código de entidad declarado es {result.banksCode}.
                  </p>
                  <p className="mt-2 text-xs font-medium text-emerald-800">
                    Este resultado no confirma que la cuenta exista, esté activa o pertenezca al destinatario esperado.
                  </p>
                </div>
              </div>
            ) : result.status === 'invalid' ? (
              <div className="bg-red-50 border border-red-200 rounded-xl p-5 flex flex-col sm:flex-row items-center gap-4 text-red-800 shadow-sm transition-all duration-300">
                <AlertTriangle className="w-10 h-10 text-red-500 flex-shrink-0" />
                <div className="text-center sm:text-left">
                  <p className="font-bold text-lg mb-1">El IBAN no pasa la comprobación</p>
                  <p className="text-red-700 font-medium text-sm sm:text-base">{result.message}</p>
                </div>
              </div>
            ) : result.status === 'unsupported' ? (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex flex-col sm:flex-row items-center gap-4 text-amber-900 shadow-sm transition-all duration-300">
                <AlertTriangle className="w-10 h-10 text-amber-500 flex-shrink-0" />
                <div className="text-center sm:text-left">
                  <p className="font-bold text-lg mb-1">País no compatible</p>
                  <p className="text-amber-800 font-medium text-sm sm:text-base">{result.message}</p>
                </div>
              </div>
            ) : null}
          </div>
        )}

        <div className="mt-8 flex items-center justify-center gap-2 text-slate-400 bg-slate-50 border border-slate-100 rounded-lg py-3 px-4 shadow-sm">
          <ShieldCheck className="w-5 h-5 text-indigo-400" />
          <span className="text-xs sm:text-sm font-medium">Comprobación local: el IBAN introducido no se envía a CajaUtil.</span>
        </div>
      </section>

      {/* SEO & CONTENT SECTION */}
      <section className="w-full max-w-3xl prose prose-slate prose-headings:text-slate-800 mb-16">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-800">
          <Search className="w-6 h-6 text-indigo-500" />
          ¿Qué es el código IBAN y por qué validarlo?
        </h2>
        
        <p>El <strong>IBAN (International Bank Account Number)</strong> es el estándar internacional para identificar cuentas bancarias y reducir errores de transcripción en transferencias. Un checksum correcto no garantiza por sí solo que el destinatario o la cuenta sean los esperados.</p>

        <p>Nuestro <strong>validador de IBAN español</strong> comprueba sus 24 caracteres, la estructura numérica del CCC y el cálculo estandarizado <strong>MOD-97-10</strong>. El resultado detecta muchos errores de formato o transcripción, pero no consulta registros bancarios ni comprueba titularidad, estado de la cuenta o identidad del receptor.</p>

        <article className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mt-8 mb-8">
          <h3 className="text-xl font-bold mt-0 flex items-center gap-2 text-indigo-600">
            <ShieldCheck className="w-5 h-5" /> Privacidad de la comprobación
          </h3>
          <p className="mb-0 text-slate-600">La comprobación se ejecuta en tu navegador. CajaUtil no recibe ni almacena el IBAN que introduces en esta herramienta. Antes de transferir dinero, confirma el destinatario por un canal fiable y revisa los datos en tu entidad bancaria.</p>
        </article>

        <h3 className="text-xl font-bold">Herramientas relacionadas de CajaUtil</h3>
        <ul className="list-none pl-0 space-y-3">
          <li>
            <Link href="/calculadora-sueldo-neto" className="group flex items-center gap-3 p-3 rounded-xl hover:bg-white border border-transparent hover:border-slate-200 transition-all font-semibold text-slate-700 hover:text-indigo-600 no-underline">
              <span className="bg-slate-100 p-2 rounded-lg group-hover:bg-indigo-50 transition-colors">
                <LinkIcon className="w-4 h-4" />
              </span>
              Calculadora Sueldo Neto (España)
            </Link>
          </li>
          <li>
            <Link href="/calculadora-porcentajes" className="group flex items-center gap-3 p-3 rounded-xl hover:bg-white border border-transparent hover:border-slate-200 transition-all font-semibold text-slate-700 hover:text-indigo-600 no-underline">
              <span className="bg-slate-100 p-2 rounded-lg group-hover:bg-indigo-50 transition-colors">
                <LinkIcon className="w-4 h-4" />
              </span>
              Calculadora de Porcentajes Financiera
            </Link>
          </li>
        </ul>
      </section>

      {/* FAQ SECTION (With rich snippets details) */}
      <section className="w-full max-w-4xl" aria-label="Preguntas Frecuentes">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b border-slate-200 pb-4">Preguntas Frecuentes sobre IBAN</h2>
        <div className="space-y-4">
          <details className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden group">
            <summary className="flex list-none items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:text-indigo-600 transition-colors [&::-webkit-details-marker]:hidden">
              <h3 className="text-base font-bold m-0 pr-4">¿Cuántos caracteres tiene el número IBAN español?</h3>
              <Plus className="h-5 w-5 text-indigo-500 transition-transform group-open:rotate-45" aria-hidden="true" />
            </summary>
            <div className="px-5 pb-5 text-slate-600 leading-relaxed">
              <p>El formato IBAN en España tiene siempre <strong>24 caracteres</strong>. Comienza con las letras &quot;ES&quot;, seguidas de 2 dígitos de control, y a continuación los 20 números tradicionales del CCC (Código Cuenta Cliente: 4 números de la entidad, 4 de la oficina, 2 dígitos de control y 10 números de cuenta bancaria).</p>
            </div>
          </details>

          <details className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden group">
            <summary className="flex list-none items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:text-indigo-600 transition-colors [&::-webkit-details-marker]:hidden">
              <h3 className="text-base font-bold m-0 pr-4">¿Significa que existe la cuenta si da un resultado válido?</h3>
              <Plus className="h-5 w-5 text-indigo-500 transition-transform group-open:rotate-45" aria-hidden="true" />
            </summary>
            <div className="px-5 pb-5 text-slate-600 leading-relaxed">
              <p>No. La herramienta comprueba la estructura española y los dígitos de control, pero esos controles no detectan todos los errores posibles ni confirman que la cuenta exista, esté activa o pertenezca al destinatario esperado. Verifica siempre los datos con tu entidad bancaria antes de transferir dinero.</p>
            </div>
          </details>
        </div>
      </section>
    </main>
  );
}
