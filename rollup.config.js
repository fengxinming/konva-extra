import buble from '@rollup/plugin-buble';
import match from 'rollup-plugin-match';
import empty from 'rollup-plugin-empty';
import combine from 'rollup-plugin-combine';
import copy from 'rollup-plugin-copy';
import replaceImports from 'rollup-plugin-replace-imports';

export default [
  {
    input: 'src/*.js',
    external: ['konva'],
    plugins: [
      empty({
        silent: false,
        dir: 'dist',
      }),
      copy({
        targets: [
          { src: 'package.json', dest: 'dist' },
          { src: 'TNPM_README.md', dest: 'dist', rename: 'README.md' },
        ],
      }),
      match(),
      combine({
        outputDir: true,
        camelCase: { pascalCase: true },
      }),
      buble(),
    ],
    output: [
      {
        dir: 'dist',
        format: 'cjs',
        exports: 'auto',
        plugins: [
          replaceImports(n => n.replace('/es/', '/')),
        ],
      },
      {
        dir: 'dist/es',
        format: 'es',
      },
    ],
  },
];
