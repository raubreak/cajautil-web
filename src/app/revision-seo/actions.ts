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

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deleteArticleAction(id: string) {
  try {
    await prisma.article.delete({ where: { id } });
    revalidatePath('/revision-seo');
    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting article:', error);
    return { success: false, error: error.message || 'Error deleting' };
  }
}
