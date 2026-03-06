'use server';

import { generateProgrammaticArticle } from '@/lib/gemini-seo';

export async function forceGenerateArticle() {
  try {
    const { skipped, article, message } = await generateProgrammaticArticle(true); 
    return { success: !skipped, article, message };
  } catch (error: any) {
    console.error('Error manual action:', error);
    return { success: false, error: error.message || 'Error interno' };
  }
}
