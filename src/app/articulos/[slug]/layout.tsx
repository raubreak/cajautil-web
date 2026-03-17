import type { Metadata } from 'next';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { slug: string } | Promise<{slug: string}> }): Promise<Metadata> {
  const resolvedParams = await params;
  let article = null;
  try {
    article = await prisma.article.findUnique({
      where: { slug: resolvedParams.slug },
    });
  } catch (err) {
    console.error('Error fetching layout metadata:', err);
  }

  if (!article) return { title: 'No encontrado' };

  const cleanExcerpt = article.content
    .replace(/[#*_`>\-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 160);
  const canonicalUrl = `https://cajautil.com/articulos/${article.slug}`;

  return {
    title: `${article.title} - CajaUtil`,
    description: `${cleanExcerpt}...`,
    keywords: article.tags.split(','),
    alternates: { canonical: canonicalUrl },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: article.title,
      description: `${cleanExcerpt}...`,
      url: canonicalUrl,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: `${cleanExcerpt}...`,
    },
  };
}

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
