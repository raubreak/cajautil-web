import { NextRequest, NextResponse } from 'next/server';
import { generateProgrammaticArticle } from '@/lib/gemini-seo';

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    if (process.env.NODE_ENV === 'production' && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { skipped, article, message } = await generateProgrammaticArticle(false); // false = respeta intervalos

    if (skipped) {
      return NextResponse.json({ success: true, message });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Artículo generado correctamente',
      article: article?.slug 
    });

  } catch (error) {
    console.error('Error generando artículo Cron:', error);
    return NextResponse.json({ error: 'Error interno generando artículo' }, { status: 500 });
  }
}
