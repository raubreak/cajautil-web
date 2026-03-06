import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import Markdown from 'react-markdown';
import { ToolRegistry } from '@/lib/toolRegistry';
import type { Metadata, ResolvingMetadata } from 'next';

interface PageProps {
  params: { toolSlug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const variant = await prisma.toolVariant.findUnique({
    where: { slug: params.toolSlug }
  });

  if (!variant) return {};

  return {
    title: variant.seoTitle,
    description: variant.seoDescription,
    robots: 'index, follow',
  };
}

export default async function DynamicToolPage({ params }: PageProps) {
  const variant = await prisma.toolVariant.findUnique({
    where: { slug: params.toolSlug }
  });

  if (!variant) {
    notFound();
  }

  const ToolComponent = ToolRegistry[variant.toolBase];

  if (!ToolComponent) {
    notFound(); // No se encontró el componente React base
  }

  // Preparamos los títulos dinámicos parseados si se desea, o simplemente
  // enviamos el h1 text al ToolComponent si lo soporta, o lo renderizamos fuera.
  // Aquí delegamos el h1 al propio componente a través de prop 'title'.
  
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center pt-8 pb-16 px-4">
      {variant.topContent && (
        <section className="w-full max-w-4xl prose prose-slate mb-8 px-2 text-slate-600">
           <Markdown>{variant.topContent}</Markdown>
        </section>
      )}

      {/* RENDERIZAMOS LA HERRAMIENTA ORIGINAL REACT */}
      <ToolComponent 
         title={<span className="text-blue-600">{variant.h1}</span>}
         subtitle={variant.seoDescription}
      />

      {/* RENDERIZAMOS EL CONTENIDO LARGO GENERADO POR GEMINI */}
      {variant.bottomContent && (
        <section className="w-full max-w-4xl prose prose-slate prose-headings:text-slate-800 mb-16 mt-8 px-2 text-slate-600">
           <Markdown>{variant.bottomContent}</Markdown>
        </section>
      )}
    </main>
  );
}
