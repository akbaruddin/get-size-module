import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  entry: ['src/index.ts'],
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
  format: ['cjs', 'esm', 'iife'],
  minify: !options.watch,
  outExtension({ format }) {
    return {
      js: `.${format}.js`,
    };
  },
  env: {
    NODE_ENV: !options.watch ? 'development' : 'production',
  },
  metafile: true,
}));
