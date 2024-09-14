// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// import node from '@astrojs/node';
import cloudflare from "@astrojs/cloudflare";

import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
  site: 'https://astro-http-8oo.pages.dev',
  integrations: [mdx(), sitemap(), db()],
  output: "hybrid",
  adapter: cloudflare()
});