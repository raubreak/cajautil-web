import { BetaAnalyticsDataClient } from '@google-analytics/data';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// Obtener datos de GA4 de los últimos 7 días
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
          endDate: 'today',
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
      orderBys: [
        {
          dimension: {
            dimensionName: 'date',
          },
          desc: false,
        },
      ],
    });

    console.log('--- Tráfico de los últimos 7 días ---');
    if (response.rows && response.rows.length > 0) {
      response.rows.forEach(row => {
        console.log(
          `Fecha: ${row.dimensionValues?.[0].value} | Sesiones: ${row.metricValues?.[0].value} | Vistas: ${row.metricValues?.[1].value}`
        );
      });
    } else {
      console.log('No data found');
    }
  } catch(e) {
    console.error("Error consultando Analytics API:", e);
  }
}

getTrafficDropData();
