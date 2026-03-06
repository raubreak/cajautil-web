import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CalendarDays, ExternalLink, Tag } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ArticlePage({ params }: { params: { slug: string } | Promise<{slug: string}> }) {
  const resolvedParams = await params;
  let article = null;
  try {
    article = await prisma.article.findUnique({
      where: { slug: resolvedParams.slug },
    });
  } catch (err) {
    console.error('Error fetching article:', err);
  }

  if (!article) notFound();

  const formattedDate = new Intl.DateTimeFormat('es-ES', {
    dateStyle: 'long',
  }).format(new Date(article.publishedAt));

  const tags = article.tags.split(',').map(t => t.trim());

  return (
    <article className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" /> Volver a Herramientas
        </Link>

        <header className="mb-12">
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-500">
            <span className="shrink-0 flex items-center gap-1.5"><CalendarDays className="w-4 h-4" /> {formattedDate}</span>
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <span key={tag} className="inline-flex items-center gap-1.5 bg-slate-200 px-2.5 py-1 rounded-md text-slate-700 whitespace-nowrap">
                  <Tag className="w-3.5 h-3.5 shrink-0" /> {tag.trim()}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* CTA a la herramienta relacionada destacada */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 p-6 rounded-2xl mb-12 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
           <div>
             <h3 className="text-lg font-bold text-slate-800 mb-2">Herramienta Recomendada</h3>
             <p className="text-slate-600 text-sm">Descubre nuestra utilidad gratuita relacionada con este tema.</p>
           </div>
           <Link href={article.targetToolUrl} className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition-transform hover:scale-105 shadow-md shadow-blue-500/20">
             Probar Herramienta <ExternalLink className="w-4 h-4" />
           </Link>
        </div>

        {/* Contenido Markdown */}
        <div className="prose prose-slate prose-lg max-w-none prose-headings:font-black prose-p:mb-6 prose-p:leading-relaxed prose-li:mb-2 prose-a:text-blue-600 prose-img:rounded-2xl">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {article.content}
          </ReactMarkdown>
        </div>

      </div>
    </article>
  );
}
