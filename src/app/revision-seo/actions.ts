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
    const article = await prisma.article.findUnique({ where: { id } });
    if (article) {
      await prisma.article.delete({ where: { id } });
      revalidatePath('/revision-seo');
      revalidatePath('/');
      revalidatePath('/sitemap.xml');
      revalidatePath(`/articulos/${article.slug}`);
    }
    return { success: true };
  } catch (error: any) {
    console.error('Error deleting article:', error);
    return { success: false, error: error.message || 'Error deleting' };
  }
}

export async function setIntervalDaysAction(days: number) {
  try {
    await prisma.setting.upsert({
      where: { key: 'POST_INTERVAL_DAYS' },
      update: { value: days.toString() },
      create: { key: 'POST_INTERVAL_DAYS', value: days.toString() },
    });
    revalidatePath('/revision-seo');
    return { success: true };
  } catch (error: any) {
    console.error('Error setting interval:', error);
    return { success: false, error: error.message };
  }
}

import { generateToolVariantBatch } from '@/lib/gemini-seo';

export async function generateToolVariantsAction(baseTool: string, keywords: string) {
  try {
    const keywordList = keywords.split(',').map(k => k.trim()).filter(Boolean);
    if (keywordList.length === 0) throw new Error('No hay keywords válidas');

    const results = await generateToolVariantBatch(baseTool, keywordList);
    
    revalidatePath('/revision-seo');
    revalidatePath('/sitemap.xml');
    
    return { success: true, count: results.length };
  } catch (error: any) {
    console.error('Error generating variants:', error);
    return { success: false, error: error.message };
  }
}

