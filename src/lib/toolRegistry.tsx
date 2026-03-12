import dynamic from 'next/dynamic';

const CalculadoraPrestamosClient = dynamic(() => import('@/components/tools/CalculadoraPrestamosClient'));
const CalculadoraIVAClient = dynamic(() => import('@/components/tools/CalculadoraIVAClient'));
const CalculadoraSueldoNetoClient = dynamic(() => import('@/components/tools/CalculadoraSueldoNetoClient'));

export const ToolRegistry: Record<string, React.ComponentType<any>> = {
  'calculadora-prestamos': CalculadoraPrestamosClient,
  'calculadora-iva': CalculadoraIVAClient,
  'calculadora-sueldo-neto': CalculadoraSueldoNetoClient,
};
