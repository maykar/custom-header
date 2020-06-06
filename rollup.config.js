import nodeResolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

const dev = process.env.ROLLUP_WATCH;

const serveopts = {
  contentBase: ['./dist'],
  host: '0.0.0.0',
  port: 5000,
  allowCrossOrigin: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
};

const plugins = [
  nodeResolve({}),
  typescript(),
  json(),
  babel({ runtimeHelpers: true }),
  commonjs(),
  dev && serve(serveopts),
  !dev && terser({ keep_fnames: true }),
];

export default [
  {
    input: 'src/custom-header.ts',
    output: {
      dir: 'dist',
      format: 'es',
    },
    plugins: [...plugins],
  },
];
