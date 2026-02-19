
import { writeFileSync } from 'fs';
import { resolve } from 'path';

console.log('Test script started');
try {
  const file = resolve(process.cwd(), 'public/test-sitemap.txt');
  writeFileSync(file, 'hello world ' + new Date().toISOString());
  console.log('File written to', file);
} catch (e) {
  console.error('Error', e);
}
