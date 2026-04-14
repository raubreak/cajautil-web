import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // ADDED PRISMA

export async function GET(req: NextRequest) {
  try {
    console.log('[CRON LOG - DISABLED]: Generacion automatica de articulos desactivada para AdSense.');
    await prisma.cronLog.create({
      data: {
        status: 'DISABLED',
        message: 'Generacion automatica de articulos desactivada para AdSense',
      }
    });

    return NextResponse.json(
      {
        success: false,
        disabled: true,
        message: 'La generacion automatica de articulos esta desactivada mientras dure la revision de AdSense.',
      },
      { status: 410 },
    );
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
