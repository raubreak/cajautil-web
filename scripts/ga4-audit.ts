import { BetaAnalyticsDataClient } from '@google-analytics/data';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

type TrafficTotals = {
  sessions: number;
  views: number;
};

function parseMetricValue(value: string | null | undefined): number {
  const parsed = Number.parseInt(value ?? '0', 10);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function formatChange(current: number, previous: number): string {
  if (previous === 0) return current === 0 ? '0.00%' : 'N/A (base 0)';
  const change = ((current - previous) / previous) * 100;
  const sign = change > 0 ? '+' : '';
  return `${sign}${change.toFixed(2)}%`;
}

async function getTrafficTotals(
  analyticsDataClient: BetaAnalyticsDataClient,
  propertyId: string,
  startDate: string,
  endDate: string,
): Promise<TrafficTotals> {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: 'date' }],
    metrics: [{ name: 'sessions' }, { name: 'screenPageViews' }],
    dimensionFilter: {
      filter: {
        fieldName: 'sessionDefaultChannelGroup',
        stringFilter: {
          matchType: 'EXACT',
          value: 'Organic Search',
        },
      },
    },
  });

  const totals = (response.rows ?? []).reduce(
    (acc, row) => {
      acc.sessions += parseMetricValue(row.metricValues?.[0]?.value);
      acc.views += parseMetricValue(row.metricValues?.[1]?.value);
      return acc;
    },
    { sessions: 0, views: 0 },
  );

  return {
    sessions: totals.sessions,
    views: totals.views,
  };
}

// Obtener datos orgánicos de GA4 de los últimos 7 días completos
async function getTrafficDropData() {
  if (!process.env.GA4_PROPERTY_ID) {
    console.error("Falta GA4_PROPERTY_ID en .env.local");
    return;
  }
  
  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    console.warn("Se requiere la ruta al archivo JSON de credenciales en GOOGLE_APPLICATION_CREDENTIALS");
    return;
  }

  const propertyId = process.env.GA4_PROPERTY_ID;
  const analyticsDataClient = new BetaAnalyticsDataClient();

  try {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: '7daysAgo',
          endDate: '1daysAgo',
        },
      ],
      dimensions: [
        {
          name: 'date',
        },
      ],
      metrics: [
        {
          name: 'sessions', // Visitas
        },
        {
           name: 'screenPageViews' // Páginas vistas
        }
      ],
      dimensionFilter: {
        filter: {
          fieldName: 'sessionDefaultChannelGroup',
          stringFilter: {
            matchType: 'EXACT',
            value: 'Organic Search',
          },
        },
      },
      orderBys: [
        {
          dimension: {
            dimensionName: 'date',
          },
          desc: false,
        },
      ],
    });

    const currentWeekTotals = await getTrafficTotals(
      analyticsDataClient,
      propertyId,
      '7daysAgo',
      '1daysAgo',
    );

    const previousWeekTotals = await getTrafficTotals(
      analyticsDataClient,
      propertyId,
      '14daysAgo',
      '8daysAgo',
    );

    console.log('--- Tráfico orgánico de los últimos 7 días completos ---');
    if (response.rows && response.rows.length > 0) {
      response.rows.forEach(row => {
        console.log(
          `Fecha: ${row.dimensionValues?.[0].value} | Sesiones: ${row.metricValues?.[0].value} | Vistas: ${row.metricValues?.[1].value}`
        );
      });
    } else {
      console.log('No data found');
    }

    const sessionsChange = formatChange(currentWeekTotals.sessions, previousWeekTotals.sessions);
    const viewsChange = formatChange(currentWeekTotals.views, previousWeekTotals.views);

    console.log('\n--- Comparativa Semana vs Semana (Orgánico) ---');
    console.log(`Sesiones semana actual: ${currentWeekTotals.sessions}`);
    console.log(`Sesiones semana anterior: ${previousWeekTotals.sessions}`);
    console.log(`Variación de sesiones: ${sessionsChange}`);
    console.log(`Vistas semana actual: ${currentWeekTotals.views}`);
    console.log(`Vistas semana anterior: ${previousWeekTotals.views}`);
    console.log(`Variación de vistas: ${viewsChange}`);
  } catch(e) {
    console.error("Error consultando Analytics API:", e);
  }
}

getTrafficDropData();
