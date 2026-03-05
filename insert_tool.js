const fs = require('fs');
const filePath = 'src/app/page.tsx';

let content = fs.readFileSync(filePath, 'utf8');

const newTool = {
  titulo: 'Calculadora de Días',
  descripcion: 'Calcula la diferencia exacta de días, semanas, meses y años entre dos fechas.',
  ruta: '/calculadora-dias',
  Icono: 'CalendarDays', // Usamos string, luego lo reemplazaremos con el componente importado
  color: 'from-pink-500 to-purple-600',
  shadow: 'shadow-pink-500/20'
};

// Encontrar el inicio y fin del array herramientas
const arrayStart = content.indexOf('const herramientas = [');
const arrayEnd = content.indexOf('];', arrayStart);

if (arrayStart !== -1 && arrayEnd !== -1) {
  let herramientasStr = content.substring(arrayStart + 'const herramientas = ['.length, arrayEnd);
  
  // Convertir a JSON (limpiando primero comentarios y comas finales si las hay)
  herramientasStr = `[${herramientasStr.trim().replace(/,\s*$/, '')}]`;
  let herramientas = JSON.parse(herramientasStr.replace(/Icono: (\w+)/g, '"Icono": "$1"'));

  herramientas.push(newTool);

  // Convertir de nuevo a string y reemplazar los placeholders de Icono
  let newHerramientasStr = JSON.stringify(herramientas, null, 6)
    .replace(/"Icono": "(\w+)"/g, 'Icono: $1');

  // Asegurarse de que el último elemento no tenga coma después 
  newHerramientasStr = newHerramientasStr.replace(/},(\s*\])/g, '}$1');

  content = content.substring(0, arrayStart + 'const herramientas = ['.length) + '
  ' + newHerramientasStr.substring(1, newHerramientasStr.length - 1).trim() + '
  ];' + content.substring(arrayEnd + 1);

  // Añadir la importación de CalendarDays si no existe
  if (!content.includes('CalendarDays } from \''lucide-react\';')) {
    content = content.replace(
      /import { (.*?) } from 'lucide-react';/,
      'import { $1, CalendarDays } from 'lucide-react';'
    );
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Herramienta 'Calculadora de Días' añadida a page.tsx');
} else {
  console.error('No se pudo encontrar el array herramientas en page.tsx');
}
