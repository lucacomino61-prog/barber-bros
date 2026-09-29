// @ts-check
import { defineConfig } from 'astro/config';

// Static build. Local only until Luca asks for a deploy. At launch, build with SITE_URL set to the real domain:
// link previews, canonical and hreflang URLs are absolute and come from it.
export default defineConfig({
  site: process.env.SITE_URL || 'http://localhost:3690',
  trailingSlash: 'always',
  server: { port: 3690, host: '127.0.0.1' },
  devToolbar: { enabled: false },
  build: { inlineStylesheets: 'auto', format: 'directory' },
});