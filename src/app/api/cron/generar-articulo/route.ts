import { NextRequest, NextResponse } from 'next/server';
import { generateProgrammaticArticle } from '@/lib/gemini-seo';
import prisma from '@/lib/prisma'; // ADDED PRISMA

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    // Si necesitas Auth local de Vercel (opcional bypass)
    // if (process.env.NODE_ENV === 'production' && authHeader !== `Bearer ${cronSecret}`) { ... }

    const { skipped, article, message } = await generateProgrammaticArticle(false); // false = respeta intervalos

    if (skipped) {
      console.log(`[CRON LOG - SKIP]: ${message || 'Omitido por intervalo'}`);
      await prisma.cronLog.create({
        data: { status: 'SKIPPED', message: message || 'Omitido por intervalo' }
      });
      return NextResponse.json({ success: true, message });
    }

    console.log(`[CRON LOG - SUCCESS]: Artículo creado -> ${article?.title}`);
    await prisma.cronLog.create({
      data: { status: 'SUCCESS', message: `Artículo creado: ${article?.title}` }
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Artículo generado correctamente',
      article: article?.slug 
    });

  } catch (error: any) {
    console.error('[CRON LOG - ERROR]: Falló la generación del artículo.', error);
    try {
      await prisma.cronLog.create({
        data: { status: 'ERROR', message: error.message || 'Error interno' }
      });
    } catch (e) {}
    
    return NextResponse.json({ error: 'Error interno generando artículo' }, { status: 500 });
  }
}

