// The repository has no ESLint dependency or global lint task. Use its installed
// Babel/Vue parsers for focused syntax/template validation without a new framework.
const fs = require('node:fs');
const path = require('node:path');
const parser = require('@babel/parser');
const { parse, compileScript, compileTemplate } = require('@vue/compiler-sfc');
const root = path.resolve(__dirname, '..');
const files = [
  'src/utils/revestidosLaf.js', 'src/utils/revestidosLafConfiguracion.js',
  'src/services/revestidosLaf.js', 'src/services/revestidosLaf.contract.js', 'src/services/revestidosLafConfiguracion.js',
  'src/composables/useRevestidosLaf.js', 'src/composables/useRevestidosLafConfiguracion.js',
  'src/views/RevestidosLaf.vue', 'src/views/RevestidosLafConfiguracion.vue',
  ...fs.readdirSync(path.join(root, 'src/components/revestidos-laf')).filter(f => f.endsWith('.vue')).map(f => `src/components/revestidos-laf/${f}`),
  'src/router/index.js', 'src/components/GestionCompras.vue',
];
for (const file of files) {
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  if (file.endsWith('.js')) parser.parse(source, { sourceType: 'module' });
  else {
    const { descriptor, errors } = parse(source, { filename: file });
    if (errors.length) throw new Error(`${file}: ${errors.join(', ')}`);
    if (descriptor.scriptSetup) compileScript(descriptor, { id: file });
    else if (descriptor.script) parser.parse(descriptor.script.content, { sourceType: 'module' });
    const compiled = compileTemplate({ source: descriptor.template.content, filename: file, id: file });
    if (compiled.errors.length) throw new Error(`${file}: ${compiled.errors.join(', ')}`);
  }
}
console.log(`Sintaxis y templates correctos: ${files.length} archivos.`);
