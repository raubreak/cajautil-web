import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import prisma from '@/lib/prisma';

export default async function RelatedTools({ 
  baseTool, 
  currentSlug 
}: { 
  baseTool: string, 
  currentSlug: string 
}) {
  // Obtenemos otras variantes de la misma herramienta (Silo Semántico)
  const related = await prisma.toolVariant.findMany({
    where: {
      toolBase: baseTool,
      slug: { not: currentSlug }
    },
    take: 6,
    orderBy: {
      publishedAt: 'desc'
    }
  });

  if (!related || related.length === 0) return null;

  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-16 border-t border-slate-200 mt-12">
      <h2 className="text-2xl font-black text-slate-800 mb-8 text-center sm:text-left">
        Herramientas Relacionadas
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {related.map((item) => (
          <Link 
            key={item.id} 
            href={`/${item.slug}`}
            className="group block p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
          >
            <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
              {item.seoTitle}
            </h3>
            <p className="text-sm text-slate-500 line-clamp-2 mb-4">
              {item.seoDescription}
            </p>
            <div className="flex items-center text-sm font-bold text-blue-600 transition-colors">
              <span>Usar herramienta</span>
              <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
