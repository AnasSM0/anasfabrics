
import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { categoriesData } from '../src/data/categories';

console.log('Script started');

try {
  const BASE_URL = 'https://anasfabrics.com';
  const OUTPUT_FILE = resolve(process.cwd(), 'public/sitemap.xml');

  const staticRoutes = [
    '/',
    '/about',
    '/gallery',
    '/contact',
  ];

  const generateSitemap = () => {
    console.log('Generating sitemap...');
    const routes = [
      ...staticRoutes,
      ...Object.values(categoriesData).map((category) => `/categories/${category.slug}`),
    ];

    console.log(`Found ${routes.length} routes.`);

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes
    .map((route) => {
      return `
  <url>
    <loc>${BASE_URL}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`;
    })
    .join('')}
</urlset>`;

    writeFileSync(OUTPUT_FILE, sitemap);
    console.log(`Sitemap generated at ${OUTPUT_FILE}`);
  };

  generateSitemap();
} catch (error) {
  console.error('Error generating sitemap:', error);
  process.exit(1);
}
