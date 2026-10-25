import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { BUSINESS } from './src/config/business.ts';
import { THEME } from './src/config/theme.ts';
import { getMetadata } from './src/config/metadata.ts';

const escapeHtml = (value: string) =>
  value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'restaurant-metadata',
      transformIndexHtml(html) {
        const { title, description } = getMetadata();
        const content: Record<string, string> = {
          description,
          'og:title': title,
          'og:description': description,
          'theme-color': THEME.primary,
        };
        return html
          .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
          .replace(/<meta\s+(name|property)="([^"]+)"[^>]*>/g, (tag, attribute: string, key: string) =>
            content[key] ? `<meta ${attribute}="${key}" content="${escapeHtml(content[key])}" />` : tag,
          )
          .replace(/<link rel="icon"[^>]*>/, `<link rel="icon" href="${escapeHtml(BUSINESS.favicon)}" />`);
      },
    },
  ],
});
