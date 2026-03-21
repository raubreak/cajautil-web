import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CalendarDays, Clock3, ExternalLink, RefreshCw, Tag } from 'lucide-react';
import AuthorSection from '@/components/AuthorSection';
import {
  estimateReadingTimeMinutes,
  getArticleDescription,
  isFinanceTopic,
  sanitizeArticleTags,
  sanitizeMarkdownContent,
  stripMarkdownToText,
} from '@/lib/contentSanitizers';

import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } | Promise<{slug: string}> }): Promise<Metadata> {
  const resolvedParams = await params;
  const article = await prisma.article.findUnique({
    where: { slug: resolvedParams.slug },
  });

  if (!article) return {};

  const cleanContent = sanitizeMarkdownContent(article.content);
  const canonicalUrl = `https://cajautil.com/articulos/${article.slug}`;
  const description = getArticleDescription(article.metaDescription, cleanContent);
  const ogTitle = `${article.title} | CajaUtil.com`;

  return {
    title: article.title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: ogTitle,
      description,
      url: canonicalUrl,
      type: 'article',
      images: article.coverImageUrl 
        ? [{ url: article.coverImageUrl, alt: article.title }]
        : [{ url: 'https://cajautil.com/og-image.png', alt: 'CajaUtil.com' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
    },
  };
}

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
  const formattedUpdatedDate = new Intl.DateTimeFormat('es-ES', {
    dateStyle: 'long',
  }).format(new Date(article.updatedAt));

  const cleanContent = sanitizeMarkdownContent(article.content);
  const tags = sanitizeArticleTags(article.tags);
  const readingTime = estimateReadingTimeMinutes(cleanContent);
  const description = getArticleDescription(article.metaDescription, cleanContent);
  const isFinanceArticle = isFinanceTopic(article.title, article.tags, article.targetToolUrl);
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description,
    datePublished: new Date(article.publishedAt).toISOString(),
    dateModified: new Date(article.updatedAt).toISOString(),
    mainEntityOfPage: `https://cajautil.com/articulos/${article.slug}`,
    articleSection: 'Blog de Utilidades',
    keywords: tags,
    articleBody: stripMarkdownToText(cleanContent),
    author: {
      '@type': 'Person',
      name: 'Raúl B.',
    },
    publisher: {
      '@type': 'Organization',
      name: 'CajaUtil.com',
      url: 'https://cajautil.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cajautil.com/og-image.png',
      },
    },
    image: article.coverImageUrl || 'https://cajautil.com/og-image.png',
    isAccessibleForFree: true,
  };

  return (
    <article className="min-h-screen bg-slate-50 py-12 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" /> Volver a Herramientas
        </Link>

        <header className="mb-12">
          {article.coverImageUrl && (
            <div className="mb-8 w-full aspect-[2/1] relative rounded-3xl overflow-hidden shadow-lg border border-slate-100">
              <Image 
                src={article.coverImageUrl}
                alt={`Imagen de portada de ${article.title}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                priority
              />
            </div>
          )}
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-500">
            <span className="shrink-0 flex items-center gap-1.5"><CalendarDays className="w-4 h-4" /> {formattedDate}</span>
            <span className="shrink-0 flex items-center gap-1.5"><RefreshCw className="w-4 h-4" /> Revisado {formattedUpdatedDate}</span>
            <span className="shrink-0 flex items-center gap-1.5"><Clock3 className="w-4 h-4" /> {readingTime} min de lectura</span>
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

        {isFinanceArticle && (
          <section className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-950">
            Este contenido es informativo y orientativo. No sustituye el asesoramiento financiero, fiscal o legal profesional ni la oferta vinculante de una entidad.
            Antes de contratar un producto, revisa siempre la documentacion oficial y confirma comisiones, TAE, plazos y condiciones reales.
          </section>
        )}

        {/* Contenido Markdown */}
        <div className="prose prose-slate prose-lg max-w-none rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-sm prose-headings:font-black prose-p:mb-6 prose-p:leading-relaxed prose-li:mb-2 prose-a:text-blue-600 prose-img:rounded-2xl">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {cleanContent}
          </ReactMarkdown>
        </div>

        <section className="mt-8 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-3">Metodología editorial</h2>
          <p className="text-sm leading-relaxed text-slate-600">
            En CajaUtil revisamos este tipo de guias para que la explicacion sea clara, coherente con la herramienta enlazada y util antes de tomar decisiones.
            Cuando una pagina trata temas de dinero, impuestos o credito, la informacion se presenta como apoyo informativo y no como recomendacion personalizada.
          </p>
        </section>

        {/* E-E-A-T: Sección de Autor */}
        <AuthorSection />

      </div>
    </article>
  );
}
