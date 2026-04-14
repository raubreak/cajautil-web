import Link from 'next/link';
import { ArrowRight, BookOpen, CalendarDays } from 'lucide-react';
import type { Metadata } from 'next';

import { editorialArticles } from '@/lib/editorialArticles';

export const metadata: Metadata = {
  title: 'Guias y articulos practicos',
  description:
    'Guias editoriales sobre salario, prestamos, IVA, QR, WebP, seguridad y otras utilidades relacionadas con las herramientas de CajaUtil.com.',
  alternates: {
    canonical: 'https://cajautil.com/articulos',
  },
  openGraph: {
    title: 'Guias y articulos practicos | CajaUtil.com',
    description:
      'Guias editoriales sobre salario, prestamos, IVA, QR, WebP, seguridad y otras utilidades relacionadas con las herramientas de CajaUtil.com.',
    url: 'https://cajautil.com/articulos',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guias y articulos practicos | CajaUtil.com',
    description:
      'Guias editoriales sobre salario, prestamos, IVA, QR, WebP, seguridad y otras utilidades relacionadas con las herramientas de CajaUtil.com.',
  },
};

export default function BlogIndex() {
  const articles = [...editorialArticles].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-16 text-center">
          <div className="inline-flex items-center justify-center rounded-3xl bg-blue-100 p-4 shadow-sm mb-6">
            <BookOpen className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight mb-6">
            Guias y <span className="text-blue-600">articulos</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-500 font-medium max-w-3xl mx-auto">
            Contenido editorial util para entender mejor como funcionan nuestras calculadoras,
            simuladores y utilidades: conceptos, errores comunes, ejemplos practicos y decisiones
            que conviene tomar con contexto.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => {
            const publishedAt = new Date(article.publishedAt);
            const updatedAt = new Date(article.updatedAt);
            const hasEditorialReview = updatedAt.getTime() > publishedAt.getTime();
            const dateLabel = hasEditorialReview ? 'Actualizado' : 'Publicado';
            const dateValue = hasEditorialReview ? updatedAt : publishedAt;

            return (
            <Link
              key={article.slug}
              href={`/articulos/${article.slug}`}
              className="group flex flex-col rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="rounded-md bg-blue-50 px-2 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
                  {article.tags[0] ?? 'guia'}
                </span>
                <span className="flex items-center gap-1 text-xs font-medium text-slate-400">
                  <CalendarDays className="w-3 h-3" />
                  {dateLabel}{' '}
                  {dateValue.toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>

              <h2 className="text-xl font-bold text-slate-900 mb-3 transition-colors group-hover:text-blue-700 line-clamp-2">
                {article.title}
              </h2>
              <p className="text-sm leading-relaxed text-slate-500 mb-6 line-clamp-4">
                {article.description}
              </p>

              <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4 text-sm font-bold text-blue-700">
                <span>Leer guia</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
