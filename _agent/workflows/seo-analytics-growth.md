---
description: Pipeline de Análisis de Tráfico y Crecimiento SEO On-Page (Programmatic SEO)
---

# 🚀 Flujo de Trabajo: Análisis de Tráfico y Crecimiento SEO (Programmatic SEO)

Este documento sirve como base de conocimiento para la IA (Gemini/Antigravity) y el equipo de desarrollo sobre cómo monitorear el tráfico de la web, diagnosticar problemas y accionar estrategias de crecimiento automáticas basadas en SEO Programático.

## 1. 📊 Monitoreo de Tráfico con Google Analytics 4 (GA4)

Si se detecta una caída de tráfico o se quiere revisar el estado actual de las visitas orgánicas a la web, usa el script de auditoría de GA4:

1. **Requisitos:** La API de Google Analytics requiere el archivo `ga4-key.json` en la raíz del proyecto. **Nunca subas este archivo a Git o producción**.
2. **Variables de Entorno:** Asegúrate de que tu `.env.local` tenga la ruta a la credencial y el Property ID correcto:
   ```env
   GOOGLE_APPLICATION_CREDENTIALS="./ga4-key.json"
   GA4_PROPERTY_ID="527355215"
   ```
3. **Ejecución:**
   ```bash
   npx tsx scripts/ga4-audit.ts
   ```
4. **Análisis:** Esto imprimirá una tabla en consola con las visitas de la última semana. Utiliza estos datos para comparar con semanas anteriores o diagnosticar si un problema es real ("Traffic Drop Incident") o solo una falsa alarma.

## 2. ⚙️ Estrategia de Crecimiento: Motores de SEO Programático (pSEO)

Para combatir el estancamiento o mejorar las visitas, CajaUtil utiliza un Pipeline de SEO Programático On-Page que genera landing pages hiperespecíficas usando Inteligencia Artificial.

El proceso se divide en 3 Vías:

### Vía 1: Generación Masiva de Variantes (Long-Tail)
Usaremos IA para crear decenas de variaciones semánticas para una misma herramienta.

1. Añade tu componente base de React al registro en `src/lib/toolRegistry.tsx`.
2. Edita `scripts/massPSEO.ts` y añade un nuevo bloque para la herramienta, junto a un array con `keywords` altamente rentables (por ejemplo: "para coches de segunda mano", "para reformas", "para bodas").
3. Ejecuta el creador masivo usando el motor de base de datos de Prisma y la IA Gemini:
   ```bash
   npx tsx scripts/massPSEO.ts
   ```
   *Nota: Este pipeline inserta automáticamente las páginas listas y SEO optimizadas en la Base de Datos.*

### Vía 2: Silos Semánticos y Arquitectura de Enlazado Interno
Todo el SEO Programático inyecta al final un componente dinámico llamado `RelatedTools.tsx`.
- Este componente auto-enlaza semánticamente unas calculadoras satélite con otras para bajar drásticamente la tasa de rebote.
- Transfiere Autoridad entre páginas del mismo nicho ("Préstamos", "IVA", etc.).

### Vía 3: Datos Estructurados (Schema.org JSON-LD)
Garantizar que todas las páginas nuevas generadas y las estáticas antiguas contengan Datos Estructurados para obtener *Rich Snippets* mejores en resultados de Google. 
- En el caso de herramientas, siempre inyectamos un Type `@WebApplication` o `@SoftwareApplication`.
- Se encuentra auto-integrado dinámicamente en el layout `[toolSlug]/page.tsx`.

## 3. 🚨 Checklist Rápido de Emergencias

- ¿Se rompió el Gemini de Auto-Mantenimiento? -> Chequea la API KEY `GEMINI_API_KEY` en Vercel. Asegúrate de usar siempre el último y mejor modelo de Flash (ej. `gemini-2.5-flash`).
- ¿Las imágenes no cargan? -> Chequea el config de Next.js (`next.config.ts`). Los blobs se guardan en Vercel Blob y deben estar en whitelist para el componente `<Image />`.
- ¿Hay doble H1 en las páginas? -> Gemini suele incluir '# Título', el sistema lo intercepta en `gemini-seo.ts` usando regex defensivos para neutralizarlo.
