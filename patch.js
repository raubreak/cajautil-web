const fs = require('fs');
const filepath = 'src/app/page.tsx';
let content = fs.readFileSync(filepath, 'utf8');

// The array has 6 items ending with Generador Códigos QR. I need to insert the 7th.
const insertPos = content.indexOf("titulo: 'Generador Códigos QR'");
if (insertPos !== -1) {
  const endOfBlock = content.indexOf("}", insertPos);
  const insertStr = `    },
    {
      titulo: 'Lector de Fotos QR',
      descripcion: 'Extrae texto y URLs subiendo una imagen de un código QR. 100% privado.',
      ruta: '/lector-qr',
      Icono: ScanLine,
      color: 'from-violet-400 to-fuchsia-600',
      shadow: 'shadow-violet-500/20'
`;
  
  content = content.slice(0, endOfBlock + 1) + ",\n" + insertStr + content.slice(endOfBlock + 1);
  fs.writeFileSync(filepath, content);
}
