import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import { getArticleDescription, sanitizeArticleTags, sanitizeMarkdownContent } from '@/lib/contentSanitizers';
import { getEditorialArticleBySlug } from '@/lib/editorialArticles';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } | Promise<{slug: string}> }): Promise<Metadata> {
  const resolvedParams = await params;
  const editorialArticle = getEditorialArticleBySlug(resolvedParams.slug);

  if (editorialArticle) {
    const canonicalUrl = `https://cajautil.com/articulos/${editorialArticle.slug}`;
    return {
      title: editorialArticle.title,
      description: editorialArticle.description,
      keywords: editorialArticle.tags,
      alternates: { canonical: canonicalUrl },
      robots: {
        index: true,
        follow: true,
      },
      openGraph: {
        title: editorialArticle.title,
        description: editorialArticle.description,
        url: canonicalUrl,
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: editorialArticle.title,
        description: editorialArticle.description,
      },
    };
  }

  let article = null;
  try {
    article = await prisma.article.findUnique({
      where: { slug: resolvedParams.slug },
    });
  } catch (err) {
    console.error('Error fetching layout metadata:', err);
  }

  if (!article) return { title: 'No encontrado' };

  const cleanContent = sanitizeMarkdownContent(article.content);
  const cleanExcerpt = getArticleDescription(article.metaDescription, cleanContent);
  const canonicalUrl = `https://cajautil.com/articulos/${article.slug}`;
  const keywords = sanitizeArticleTags(article.tags);

  return {
    title: `${article.title} - CajaUtil`,
    description: cleanExcerpt,
    keywords,
    alternates: { canonical: canonicalUrl },
    robots: {
      index: false,
      follow: true,
    },
    openGraph: {
      title: article.title,
      description: cleanExcerpt,
      url: canonicalUrl,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: cleanExcerpt,
    },
  };
}

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
