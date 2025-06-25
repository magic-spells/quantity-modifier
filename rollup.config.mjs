import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import serve from 'rollup-plugin-serve';
import copy from 'rollup-plugin-copy';

const dev = process.env.ROLLUP_WATCH;
const name = 'quantity-modifier';

export default [
  // ESM build
  {
    input: 'src/quantity-modifier.js',
    output: {
      file: `dist/${name}.esm.js`,
      format: 'es',
      sourcemap: true,
    },
    plugins: [
      resolve()
    ],
  },
  // CommonJS build
  {
    input: 'src/quantity-modifier.js',
    output: {
      file: `dist/${name}.cjs.js`,
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
    plugins: [resolve()],
  },
  // UMD build
  {
    input: 'src/quantity-modifier.js',
    output: {
      file: `dist/${name}.js`,
      format: 'umd',
      name: 'QuantityModifier',
      sourcemap: true,
    },
    plugins: [resolve()],
  },
  // Minified UMD for browsers
  {
    input: 'src/quantity-modifier.js',
    output: {
      file: `dist/${name}.min.js`,
      format: 'umd',
      name: 'QuantityModifier',
      sourcemap: false,
    },
    plugins: [
      resolve(),
      terser({
        keep_classnames: true,
        format: {
          comments: false,
        },
      }),
    ],
  },
  // Development build
  ...(dev
    ? [
        {
          input: 'src/quantity-modifier.js',
          output: {
            file: `dist/${name}.esm.js`,
            format: 'es',
            sourcemap: true,
          },
          plugins: [
            resolve(),
            serve({
              contentBase: ['dist', 'demo'],
              open: true,
              port: 3000,
            }),
            copy({
              targets: [
                {
                  src: `dist/${name}.esm.js`,
                  dest: 'demo',
                },
                {
                  src: `dist/${name}.esm.js.map`,
                  dest: 'demo',
                },
              ],
              hook: 'writeBundle',
            }),
          ],
        },
      ]
    : []),
];