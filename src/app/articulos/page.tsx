import prisma from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';
import { CalendarDays, ArrowRight, BookOpen } from 'lucide-react';
import type { Metadata } from 'next';
import { getArticleDescription, sanitizeArticleTags } from '@/lib/contentSanitizers';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Blog de Utilidades y Guías',
  description: 'Aprende a sacar el máximo provecho de nuestras herramientas con guías detalladas, consejos financieros y tutoriales tecnológicos.',
  alternates: {
    canonical: 'https://cajautil.com/articulos',
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Blog de Utilidades y Guías | CajaUtil.com',
    description: 'Aprende a sacar el máximo provecho de nuestras herramientas con guías detalladas, consejos financieros y tutoriales tecnológicos.',
    url: 'https://cajautil.com/articulos',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog de Utilidades y Guías | CajaUtil.com',
    description: 'Aprende a sacar el máximo provecho de nuestras herramientas con guías detalladas, consejos financieros y tutoriales tecnológicos.',
  },
};

export default async function BlogIndex() {
  const articles = await prisma.article.findMany({
    orderBy: { publishedAt: 'desc' },
  });

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-16 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-blue-100 rounded-3xl mb-6 shadow-sm">
            <BookOpen className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight mb-6">
            Blog de <span className="text-blue-600">Utilidades</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-500 font-medium max-w-2xl mx-auto">
            Guías profundas, consejos prácticos y todo lo que necesitas para dominar tus finanzas y tareas digitales.
          </p>
        </header>

        {articles.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
            <p className="text-slate-400 font-medium italic">Próximamente publicaremos nuestro primer artículo de experto.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => {
              const primaryTag = sanitizeArticleTags(article.tags)[0] || 'guia';
              const description = getArticleDescription(article.metaDescription, article.content);

              return (
              <Link 
                key={article.id} 
                href={`/articulos/${article.slug}`}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col"
              >
                {article.coverImageUrl && (
                  <div className="aspect-[16/9] relative overflow-hidden">
                    <Image 
                      src={article.coverImageUrl} 
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md uppercase tracking-wider">
                      {primaryTag}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                      <CalendarDays className="w-3 h-3" /> 
                      {new Date(article.publishedAt).toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                    {description || "Descubre todo sobre este tema en nuestra guia detallada."}
                  </p>
                  <div className="mt-auto pt-4 border-t border-slate-50 flex items-center text-sm font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    Leer artículo completo <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
