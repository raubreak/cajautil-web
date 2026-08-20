import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, ExternalLink, RefreshCw, Tag } from 'lucide-react';
import AuthorSection from '@/components/AuthorSection';
import { AUTHOR_PROFILE } from '@/lib/authorProfile';
import { editorialArticles, getEditorialArticleBySlug } from '@/lib/editorialArticles';
import type { EditorialArticle } from '@/lib/editorialArticles';
import {
  estimateReadingTimeMinutes,
  getArticleDescription,
  isFinanceTopic,
  sanitizeArticleTags,
  sanitizeMarkdownContent,
  stripMarkdownToText,
} from '@/lib/contentSanitizers';

export const revalidate = 3600;

const markdownComponents: Components = {
  table({ node, ...props }) {
    void node;
    return (
      <div className="my-6 overflow-x-auto">
        <table {...props} />
      </div>
    );
  },
};

export function generateStaticParams() {
  return editorialArticles.map((article) => ({ slug: article.slug }));
}

export default async function ArticlePage({ params }: { params: { slug: string } | Promise<{slug: string}> }) {
  const resolvedParams = await params;
  const editorialArticle = getEditorialArticleBySlug(resolvedParams.slug);

  if (editorialArticle) {
    const formattedDate = new Intl.DateTimeFormat('es-ES', {
      dateStyle: 'long',
    }).format(new Date(editorialArticle.publishedAt));
    const formattedUpdatedDate = new Intl.DateTimeFormat('es-ES', {
      dateStyle: 'long',
    }).format(new Date(editorialArticle.updatedAt));
    const readingTime = estimateReadingTimeMinutes(editorialArticle.content);
    const relatedArticles = editorialArticle.relatedArticleSlugs
      .map(getEditorialArticleBySlug)
      .filter((article): article is EditorialArticle => article !== undefined);
    const isFinanceArticle = isFinanceTopic(
      editorialArticle.title,
      editorialArticle.targetToolUrl,
      ...editorialArticle.tags,
    );
    const articleJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: editorialArticle.title,
      description: editorialArticle.description,
      datePublished: new Date(editorialArticle.publishedAt).toISOString(),
      dateModified: new Date(editorialArticle.updatedAt).toISOString(),
      mainEntityOfPage: `https://cajautil.com/articulos/${editorialArticle.slug}`,
      articleSection: 'Guias y articulos',
      keywords: editorialArticle.tags,
      articleBody: stripMarkdownToText(editorialArticle.content),
      author: {
        '@id': 'https://cajautil.com/#person',
      },
      publisher: {
        '@id': 'https://cajautil.com/#organization',
      },
      image: 'https://cajautil.com/og-image.png',
      isAccessibleForFree: true,
    };
    const breadcrumbJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Inicio',
          item: 'https://cajautil.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Guías y artículos',
          item: 'https://cajautil.com/articulos',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: editorialArticle.title,
          item: `https://cajautil.com/articulos/${editorialArticle.slug}`,
        },
      ],
    };

    return (
      <article className="min-h-screen bg-slate-50 py-12 px-6">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <div className="max-w-4xl mx-auto">
          <Link href="/articulos" className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" /> Volver a guias y articulos
          </Link>

          <header className="mb-12 rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
            <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-wider text-blue-700 mb-4">
              {editorialArticle.tags.map((tag) => (
                <span key={tag} className="rounded-md bg-blue-50 px-2 py-1">{tag}</span>
              ))}
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
              {editorialArticle.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-500">
              <span className="shrink-0 flex items-center gap-1.5"><CalendarDays className="w-4 h-4" /> {formattedDate}</span>
              <span className="shrink-0 flex items-center gap-1.5"><RefreshCw className="w-4 h-4" /> Revisado {formattedUpdatedDate}</span>
              <span className="shrink-0 flex items-center gap-1.5"><Clock3 className="w-4 h-4" /> {readingTime} min de lectura</span>
            </div>
          </header>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 p-6 rounded-2xl mb-12 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-lg font-bold text-slate-800 mb-2">Herramienta recomendada</h2>
              <p className="text-slate-600 text-sm">Pon en práctica esta guía con la herramienta relacionada.</p>
            </div>
            <Link href={editorialArticle.targetToolUrl} className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition-transform hover:scale-105 shadow-md shadow-blue-500/20">
              Probar herramienta <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

          {isFinanceArticle && (
            <section className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-950">
              Este contenido es informativo y orientativo. No sustituye el asesoramiento financiero, fiscal o legal profesional ni la oferta vinculante de una entidad.
              Antes de contratar un producto, revisa siempre la documentación oficial y confirma comisiones, TAE, plazos y condiciones reales.
            </section>
          )}

          <div className="prose prose-slate prose-lg max-w-none rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-sm prose-headings:font-black prose-p:mb-6 prose-p:leading-relaxed prose-li:mb-2 prose-a:text-blue-600 prose-img:rounded-2xl">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {editorialArticle.content}
            </ReactMarkdown>
          </div>

          {relatedArticles.length > 0 && (
            <section className="mt-8" aria-labelledby="related-reading-heading">
              <h2 id="related-reading-heading" className="mb-4 text-xl font-bold text-slate-900">Continúa con estas guías</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {relatedArticles.map((relatedArticle) => (
                  <Link
                    key={relatedArticle.slug}
                    href={`/articulos/${relatedArticle.slug}`}
                    className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-blue-300"
                  >
                    <h3 className="font-bold leading-snug text-slate-900 transition-colors group-hover:text-blue-700">
                      {relatedArticle.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{relatedArticle.description}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-blue-700">
                      Leer guía <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="mt-8 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-3">Metodología editorial</h2>
            <p className="text-sm leading-relaxed text-slate-600">
              Estas guías se redactan para complementar el uso de las herramientas con contexto, ejemplos y límites de interpretación.
              El objetivo es que el contenido siga siendo útil incluso aunque el lector no utilice la calculadora en ese momento.
            </p>
          </section>

          <AuthorSection />
        </div>
      </article>
    );
  }

  let article = null;
  try {
    article = await prisma.article.findUnique({
      where: { slug: resolvedParams.slug },
    });
  } catch (err) {
    console.error('Error fetching article:', err);
    throw err;
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
      name: AUTHOR_PROFILE.fullName,
      image: AUTHOR_PROFILE.avatarUrl,
      sameAs: AUTHOR_PROFILE.githubUrl,
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
            Antes de contratar un producto, revisa siempre la documentación oficial y confirma comisiones, TAE, plazos y condiciones reales.
          </section>
        )}

        {/* Contenido Markdown */}
        <div className="prose prose-slate prose-lg max-w-none rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-sm prose-headings:font-black prose-p:mb-6 prose-p:leading-relaxed prose-li:mb-2 prose-a:text-blue-600 prose-img:rounded-2xl">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {cleanContent}
          </ReactMarkdown>
        </div>

        <section className="mt-8 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-3">Metodología editorial</h2>
          <p className="text-sm leading-relaxed text-slate-600">
            En CajaUtil revisamos este tipo de guías para que la explicación sea clara, coherente con la herramienta enlazada y útil antes de tomar decisiones.
            Cuando una página trata temas de dinero, impuestos o crédito, la información se presenta como apoyo informativo y no como recomendación personalizada.
          </p>
        </section>

        {/* E-E-A-T: Sección de Autor */}
        <AuthorSection />

      </div>
    </article>
  );
}
