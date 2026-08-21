'use server';

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
  } catch (error) {
    console.error('Error deleting article:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error deleting',
    };
  }
}
