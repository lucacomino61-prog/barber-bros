// @ts-check
import { defineConfig } from 'astro/config';

// Static build. Local only until Luca asks for a deploy.
export default defineConfig({
  site: 'http://localhost:3690',
  trailingSlash: 'always',
  server: { port: 3690, host: '127.0.0.1' },
  devToolbar: { enabled: false },
  build: { inlineStylesheets: 'auto', format: 'directory' },
});