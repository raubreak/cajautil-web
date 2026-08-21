import prisma from '@/lib/prisma';
import type { Metadata } from 'next';
import type { Article } from '@prisma/client';
import Link from 'next/link';
import DeleteButton from './DeleteButton';

export const metadata: Metadata = {
  title: 'Panel SEO Programático (Privado)',
  description: 'Panel interno de administración SEO. Acceso restringido.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  }
};

export const dynamic = 'force-dynamic';

export default async function RevisionSeoPage() {
  let articles: Article[] = [];
  try {
    articles = await prisma.article.findMany({
      orderBy: { publishedAt: 'desc' },
    });
  } catch (err) {
    console.error('Error fetching data:', err);
  }

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-800 mb-2">Archivo SEO generado</h1>
            <p className="text-slate-500">Contenido histórico en cuarentena y fuera del índice. La generación automática está desactivada.</p>
          </div>
        </header>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          {articles.length === 0 ? (
            <div className="p-10 text-center text-slate-500 font-medium">No hay contenido histórico en cuarentena.</div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase tracking-wider text-xs font-bold">
                <tr>
                  <th className="px-6 py-4">Título</th>
                  <th className="px-6 py-4">Fecha</th>
                  <th className="px-6 py-4">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {articles.map(article => (
                  <tr key={article.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-800">{article.title}</td>
                    <td className="px-6 py-4 text-slate-500">
                      {new Date(article.publishedAt).toLocaleDateString('es-ES')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Link 
                          href={`/articulos/${article.slug}`} 
                          target="_blank"
                          className="text-blue-600 hover:text-blue-800 font-semibold"
                        >
                          Ver Artículo
                        </Link>
                        <DeleteButton id={article.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}
