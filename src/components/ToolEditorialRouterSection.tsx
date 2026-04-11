"use client";

import { usePathname } from 'next/navigation';

import ToolEditorialSection from '@/components/ToolEditorialSection';
import { toolEditorialContent } from '@/lib/toolEditorialContent';

export default function ToolEditorialRouterSection() {
  const pathname = usePathname();

  if (!pathname || pathname === '/') {
    return null;
  }

  const slug = pathname.replace(/^\//, '');

  if (slug.includes('/') || !(slug in toolEditorialContent)) {
    return null;
  }

  return <ToolEditorialSection slug={slug} />;
}
