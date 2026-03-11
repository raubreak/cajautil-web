import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import Markdown from 'react-markdown';
import { ToolRegistry } from '@/lib/toolRegistry';
import RelatedTools from '@/components/tools/RelatedTools';
import type { Metadata, ResolvingMetadata } from 'next';

interface PageProps {
  params: Promise<{ toolSlug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { toolSlug } = await params;
  const variant = await prisma.toolVariant.findUnique({
    where: { slug: toolSlug }
  });

  if (!variant) return {};

  return {
    title: variant.seoTitle,
    description: variant.seoDescription,
    robots: 'index, follow',
  };
}

export default async function DynamicToolPage({ params }: PageProps) {
  const { toolSlug } = await params;
  const variant = await prisma.toolVariant.findUnique({
    where: { slug: toolSlug }
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
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: variant.seoTitle,
    url: `https://cajautil.com/${variant.slug}`,
    description: variant.seoDescription,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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

        {/* ENLAZADO INTERNO E INYECCIÓN DE SILO SEMÁNTICO */}
        <RelatedTools 
          baseTool={variant.toolBase} 
          currentSlug={variant.slug} 
        />
      </main>
    </>
  );
}
