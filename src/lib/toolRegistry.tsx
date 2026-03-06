import dynamic from 'next/dynamic';

const CalculadoraPrestamosClient = dynamic(() => import('@/components/tools/CalculadoraPrestamosClient'));
// Próximamente iremos abstrayendo el resto de herramientas aquí.

export const ToolRegistry: Record<string, React.ComponentType<any>> = {
  'calculadora-prestamos': CalculadoraPrestamosClient,
};
