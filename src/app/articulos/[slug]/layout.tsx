import type { Metadata } from 'next';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

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

  return {
    title: `${article.title} - CajaUtil`,
    description: article.content.substring(0, 160).replace(/\#|\*/g, '').trim() + '...',
    keywords: article.tags.split(','),
    alternates: { canonical: `https://cajautil.com/articulos/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.content.substring(0, 160).replace(/\#|\*/g, '').trim() + '...',
      url: `https://cajautil.com/articulos/${article.slug}`,
    }
  };
}

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
