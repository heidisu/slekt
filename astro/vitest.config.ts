import { getViteConfig } from 'astro/config';
import { defineConfig, mergeConfig } from 'vitest/config';

export default defineConfig(async (env) =>
  mergeConfig(await getViteConfig({})(env), {
    test: {},
  })
);