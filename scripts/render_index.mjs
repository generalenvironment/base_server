// Регенерирует index.html из вывода воркера (должен совпадать байт-в-байт).
// Запуск: node scripts/render_index.mjs
import { writeFile } from 'node:fs/promises';

const worker = await import(new URL('../worker.js', import.meta.url).href);
const res = await worker.default.fetch(new Request('https://worldwidemultivision.com/'));
const html = await res.text();
await writeFile(new URL('../index.html', import.meta.url), html);
console.log(`index.html: ${html.length} bytes`);