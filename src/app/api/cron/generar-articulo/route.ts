import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // ADDED PRISMA

export async function GET() {
  try {
    console.log('[CRON LOG - DISABLED]: Generacion automatica de articulos desactivada por control editorial.');
    await prisma.cronLog.create({
      data: {
        status: 'DISABLED',
        message: 'Generacion automatica de articulos desactivada por control editorial',
      }
    });

    return NextResponse.json(
      {
        success: false,
        disabled: true,
        message: 'La generacion automatica de articulos esta desactivada para mantener la calidad editorial.',
      },
      { status: 410 },
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Error interno';
    console.error('[CRON LOG - ERROR]: Falló la generación del artículo.', error);
    try {
      await prisma.cronLog.create({
        data: { status: 'ERROR', message }
      });
    } catch (logError) {
      console.error('[CRON LOG - ERROR]: No se pudo guardar el error.', logError);
    }
    
    return NextResponse.json({ error: 'Error interno generando artículo' }, { status: 500 });
  }
}
