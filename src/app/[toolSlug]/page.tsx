import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ toolSlug: string }>;
}

export function generateMetadata(): Metadata {
  return {
    title: 'Página no encontrada',
    description: 'La página solicitada no existe o ha sido movida.',
    alternates: null,
    openGraph: null,
    twitter: null,
    robots: {
      index: false,
      follow: false,
      nocache: true,
    },
  };
}

export default async function DynamicToolPage({ params }: PageProps) {
  await params;
  notFound();
}
