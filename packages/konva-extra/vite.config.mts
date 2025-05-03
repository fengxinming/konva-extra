import { camelize } from 'camel-kit';
import { defineConfig } from 'vite';
import pluginBuildChuck from 'vite-plugin-build-chunk';
import pluginCombine from 'vite-plugin-combine';
import pluginExternal from 'vite-plugin-external';

import { name, peerDependencies } from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    pluginExternal({
      externalizeDeps: Object.keys(peerDependencies)
    }),
    pluginCombine({
      src: 'src/*.ts',
      target: 'src/index.ts',
      exports: 'all',
      dts: true
    }),
    pluginBuildChuck({
      build: {
        chunk: 'index.mjs',
        format: 'umd',
        minify: false,
        name: camelize(name, { pascalCase: true }),
        plugins: [
          pluginExternal({
            externals: {
              konva: 'Konva'
            }
          })
        ]
      }
    })
  ],
  build: {
    lib: {
      entry: [],
      formats: ['es', 'cjs'],
      fileName: '[name]'
    },
    minify: false
  }
});
