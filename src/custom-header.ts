import { buildConfig } from './config.js';
import { observers } from './observers';

console.info(
  `%c  CUSTOM-HEADER  \n%c  Version 1.1.0  `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
);

buildConfig();
observers();
