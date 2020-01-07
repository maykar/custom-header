import { buildConfig } from './config.js';
import { localize } from './localize/localize';

console.info(
  `%c  CUSTOM-HEADER  \n%c  ${localize('common.version')} master  `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
);

buildConfig();
