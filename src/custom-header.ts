import { buildConfig } from './config.js';
import { localize } from './localize/localize';
import { deviceID } from 'card-tools/src/deviceId';
import '@babel/polyfill';

console.info(
  `%c  CUSTOM-HEADER  \n%c  ${localize('common.version')} master  `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
);

buildConfig();

window.setTimeout(() => {
  if (!customElements.get('card-tools')) console.log('Device ID: ', deviceID);
}, 2000);
