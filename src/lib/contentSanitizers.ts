const ARTICLE_FIELD_LEAK_PATTERN = /"\s*,?\s*"(?:title|metaDescription|content|tags|image_prompt)"\s*:[\s\S]*$/i;

function removeJsonFieldLeak(value: string): string {
  return value.replace(ARTICLE_FIELD_LEAK_PATTERN, '').trim();
}

export function sanitizeMarkdownContent(value: string | null | undefined): string {
  if (!value) {
    return '';
  }

  let normalized = value
    .replace(/^```(?:markdown|md|json)?\s*/i, '')
    .replace(/\s*```$/, '')
    .replace(/\r\n/g, '\n')
    .trim();

  normalized = removeJsonFieldLeak(normalized);

  normalized = normalized
    .replace(/^\s*"?(?:title|metaDescription|content|tags|image_prompt)"?\s*:\s*.*$/gim, '')
    .replace(/^#\s+.*$/m, '')
    .trim();

  const firstLineBreak = normalized.indexOf('\n');
  const firstLine = firstLineBreak === -1 ? normalized : normalized.slice(0, firstLineBreak);
  const remaining = firstLineBreak === -1 ? '' : normalized.slice(firstLineBreak + 1);

  if (
    firstLine.includes(',') &&
    !/[.!?]/.test(firstLine) &&
    /(prestamo|finanzas|image_prompt|tags|keywords|credito|hipoteca)/i.test(firstLine)
  ) {
    return remaining.trim();
  }

  return normalized;
}

export function sanitizeArticleTags(value: string | null | undefined): string[] {
  if (!value) {
    return [];
  }

  const cleaned = removeJsonFieldLeak(value)
    .replace(/[\n\r]/g, ',')
    .replace(/[{}\[\]]/g, ' ');

  const seen = new Set<string>();

  return cleaned
    .split(',')
    .map((tag) =>
      tag
        .replace(/^["'\s]+|["'\s]+$/g, '')
        .replace(/\s+/g, ' ')
        .trim(),
    )
    .filter((tag) => tag.length > 1 && tag.length <= 40)
    .filter((tag) => !/^(image_prompt|content|title|tags|metaDescription)$/i.test(tag))
    .filter((tag) => {
      const normalizedTag = tag.toLowerCase();
      if (seen.has(normalizedTag)) {
        return false;
      }
      seen.add(normalizedTag);
      return true;
    })
    .slice(0, 8);
}

export function stripMarkdownToText(value: string | null | undefined): string {
  const sanitized = sanitizeMarkdownContent(value);

  return sanitized
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^\s{0,3}#{1,6}\s+/gm, '')
    .replace(/[*_>~-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function getArticleDescription(metaDescription: string | null | undefined, content: string): string {
  const preferred = metaDescription ? removeJsonFieldLeak(metaDescription).replace(/\s+/g, ' ').trim() : '';

  if (preferred) {
    return preferred.slice(0, 160);
  }

  return stripMarkdownToText(content).slice(0, 160);
}

export function estimateReadingTimeMinutes(value: string | null | undefined): number {
  const words = stripMarkdownToText(value).split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 220));
}

export function isFinanceTopic(...values: Array<string | null | undefined>): boolean {
  return values.some((value) => /(prestamo|hipoteca|credito|finanzas|salario|sueldo|iva|iban|impuesto)/i.test(value ?? ''));
}

export function assessToolVariantIndexability(topContent: string | null | undefined, bottomContent: string | null | undefined) {
  const cleanTop = sanitizeMarkdownContent(topContent);
  const cleanBottom = sanitizeMarkdownContent(bottomContent);
  const totalCharacters = stripMarkdownToText(`${cleanTop}\n${cleanBottom}`).length;
  const hasFaq = /###\s*P:|preguntas frecuentes/i.test(cleanBottom);

  return {
    cleanTop,
    cleanBottom,
    totalCharacters,
    hasFaq,
    shouldIndex: totalCharacters >= 2000 && hasFaq,
  };
}
