// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import mermaid from 'astro-mermaid';

import icon from "astro-icon";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    mermaid(),
    icon()],

  site: 'https://heidisu.github.io',
  base: 'slekt',
});