import Link from 'next/link';
import { Plus } from 'lucide-react';

import { AUTHOR_PROFILE } from '@/lib/authorProfile';
import { isLowValueTool } from '@/lib/adsenseReadiness';
import { toolEditorialContent } from '@/lib/toolEditorialContent';

interface ToolEditorialSectionProps {
  slug: string;
}

export default function ToolEditorialSection({ slug }: ToolEditorialSectionProps) {
  const entry = toolEditorialContent[slug];

  if (!entry) {
    return null;
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entry.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
  const relatedTools = entry.relatedTools.filter((link) => !isLowValueTool(link.href.replace(/^\//, '')));

  return (
    <section className="mx-auto w-full max-w-4xl px-4 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
        <div className="prose prose-slate max-w-none text-slate-600 prose-headings:text-slate-900 prose-headings:font-black prose-p:leading-relaxed prose-li:leading-relaxed">
          <h2>Guía práctica y contexto</h2>
          {entry.summary.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          {entry.sections.map((section) => (
            <div key={section.title}>
              <h3>{section.title}</h3>
              {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets ? (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}

          {entry.disclaimer ? (
            <div className="not-prose mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">
              {entry.disclaimer}
            </div>
          ) : null}
        </div>

        <div className="mt-8 border-t border-slate-100 pt-8">
          <h3 className="mb-4 text-lg font-black text-slate-900">Preguntas frecuentes</h3>
          <div className="space-y-4">
            {entry.faqs.map((faq) => (
              <details key={faq.question} className="group rounded-2xl border border-slate-200 p-4 transition-colors open:bg-slate-50">
                <summary className="flex list-none items-center justify-between cursor-pointer font-bold text-slate-800 [&::-webkit-details-marker]:hidden">
                  <span>{faq.question}</span>
                  <Plus className="h-5 w-5 shrink-0 text-blue-500 transition-transform group-open:rotate-45" aria-hidden="true" />
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-6 border-t border-slate-100 pt-8 md:grid-cols-2">
          {relatedTools.length ? (
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">Herramientas relacionadas</h3>
            <div className="flex flex-wrap gap-2">
              {relatedTools.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-700"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          ) : null}

          {entry.relatedArticles?.length ? (
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">Guías relacionadas</h3>
              <div className="flex flex-wrap gap-2">
                {entry.relatedArticles.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
          <p className="font-bold text-slate-900">Revisado editorialmente por {AUTHOR_PROFILE.fullName}</p>
          <p className="mt-2 leading-relaxed">
            {AUTHOR_PROFILE.role}. Este contenido se mantiene como guia practica de apoyo a la herramienta, con enfoque en claridad,
            contexto de uso y enlaces a referencias oficiales cuando aplica.
          </p>
          <div className="mt-3 flex flex-wrap gap-3 text-sm font-medium">
            <Link href="/sobre-nosotros" className="text-blue-700 hover:underline">
              Metodologia editorial
            </Link>
            <Link href="/contacto" className="text-blue-700 hover:underline">
              Contactar con el equipo
            </Link>
            <a href={AUTHOR_PROFILE.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">
              Perfil profesional
            </a>
          </div>
        </div>

        {entry.references?.length ? (
          <div className="mt-8 border-t border-slate-100 pt-8">
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">Referencias</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              {entry.references.map((reference) => (
                <li key={reference.href}>
                  <a href={reference.href} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-700 hover:underline">
                    {reference.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
