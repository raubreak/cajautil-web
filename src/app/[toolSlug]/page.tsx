import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import Markdown from 'react-markdown';
import { ToolRegistry } from '@/lib/toolRegistry';
import RelatedTools from '@/components/tools/RelatedTools';
import AuthorSection from '@/components/AuthorSection';
import { assessToolVariantIndexability, getArticleDescription } from '@/lib/contentSanitizers';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ toolSlug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { toolSlug } = await params;
  const variant = await prisma.toolVariant.findUnique({
    where: { slug: toolSlug }
  });

  if (!variant) return {};

  const url = `https://cajautil.com/${variant.slug}`;
  const title = variant.seoTitle || variant.h1 || `Herramienta online: ${variant.slug}`;
  const { cleanTop, cleanBottom, shouldIndex } = assessToolVariantIndexability(variant.topContent, variant.bottomContent);
  const description = getArticleDescription(
    variant.seoDescription,
    `${cleanTop}\n${cleanBottom}`,
  );

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    // NOTE: All pSEO variants noindexed during AdSense review.
    // Restore shouldIndex logic after approval.
    robots: {
      index: false,
      follow: true,
      nocache: true,
    },
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

  const { cleanTop, cleanBottom } = assessToolVariantIndexability(variant.topContent, variant.bottomContent);

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

  // Extraemos FAQs del contenido generado para Schema.org FAQPage
  const faqs = [];
  if (cleanBottom) {
    // Regex mejorada para detenerse en el siguiente H3, H2 o final de archivo
    const faqMatches = Array.from(cleanBottom.matchAll(/### P:\s*(.*?)\s*\n\s*R:\s*(.*?)(?=\n### P:|\n##|\n#|$)/gs));
    for (const match of faqMatches) {
      faqs.push({
        "@type": "Question",
        name: match[1].trim(),
        acceptedAnswer: {
          "@type": "Answer",
          text: match[2].trim()
        }
      });
    }
  }

  const faqJsonLd = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs
  } : null;

  // Extraemos pasos de "Guía de uso" para HowTo schema
  const steps = [];
  if (cleanBottom) {
    const guideSection = cleanBottom.match(/## Gu[ií]a de uso.*?\n([\s\S]*?)(?=\n##|$)/i);
    if (guideSection) {
       const stepMatches = Array.from(guideSection[1].matchAll(/^\d\.\s*(.*)/gm));
       for (const match of stepMatches) {
         steps.push({
           "@type": "HowToStep",
           "text": match[1].trim()
         });
       }
    }
  }

  const howToJsonLd = steps.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `Cómo usar ${variant.h1}`,
    "step": steps
  } : null;

  // Extraemos configuración funcional si existe
  const config = (
    variant as typeof variant & {
      functionalConfig?: { initialValues?: Record<string, unknown> } | null;
    }
  ).functionalConfig?.initialValues || {};

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      {howToJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
        />
      )}
      <main className="min-h-screen bg-slate-50 flex flex-col items-center pt-8 pb-16 px-4">
        {cleanTop && (
          <section className="w-full max-w-4xl prose prose-slate mb-8 px-2 text-slate-600">
             <Markdown>{cleanTop}</Markdown>
           </section>
         )}

        {/* RENDERIZAMOS LA HERRAMIENTA ORIGINAL REACT */}
        <ToolComponent 
           title={<span className="text-blue-600">{variant.h1}</span>}
           subtitle={variant.seoDescription}
           {...config}
        />

        {/* RENDERIZAMOS EL CONTENIDO LARGO GENERADO POR GEMINI */}
        {cleanBottom && (
          <section className="w-full max-w-4xl prose prose-slate prose-headings:text-slate-800 mb-16 mt-8 px-2 text-slate-600">
             <Markdown>{cleanBottom}</Markdown>
           </section>
         )}

        {/* SECCIÓN DE AUTOR Y E-E-A-T */}
        <AuthorSection />

        {/* ENLAZADO INTERNO E INYECCIÓN DE SILO SEMÁNTICO */}
        <RelatedTools 
          baseTool={variant.toolBase} 
          currentSlug={variant.slug} 
        />
      </main>
    </>
  );
}
