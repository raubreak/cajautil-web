import type { Metadata } from 'next';

export const LOW_VALUE_TOOL_SLUGS = [
  'texto-invisible',
  'simbolos-copiar',
  'cps-test',
  'generador-lorem-ipsum',
  'generador-nombres',
  'generador-letras-raras',
  'generador-hashtags',
  'ruleta-aleatoria',
  'traductor-binario',
] as const;

const lowValueToolSlugSet = new Set<string>(LOW_VALUE_TOOL_SLUGS);

export const LOW_VALUE_TOOL_ROBOTS: NonNullable<Metadata['robots']> = {
  index: false,
  follow: true,
  googleBot: {
    index: false,
    follow: true,
  },
};

export function isLowValueTool(slug: string): boolean {
  return lowValueToolSlugSet.has(slug);
}
