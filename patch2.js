const fs = require('fs');
const filepath = 'src/app/page.tsx';
let content = fs.readFileSync(filepath, 'utf8');

// Replace the duplicated braces
content = content.replace("    },\n    },\n    {", "    },\n    {");
fs.writeFileSync(filepath, content);
