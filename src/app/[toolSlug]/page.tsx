import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ toolSlug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
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
