import dynamic from 'next/dynamic';

const CalculadoraPrestamosClient = dynamic(() => import('@/components/tools/CalculadoraPrestamosClient'));
const CalculadoraIVAClient = dynamic(() => import('@/components/tools/CalculadoraIVAClient'));

export const ToolRegistry: Record<string, React.ComponentType<any>> = {
  'calculadora-prestamos': CalculadoraPrestamosClient,
  'calculadora-iva': CalculadoraIVAClient,
};
