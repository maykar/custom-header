import { root, main } from './helpers';
import { header } from './build-header';

const defaultTabIcons = {};
export const customizeTabIcons = tabIconConfig => {
  for (const tab in tabIconConfig) {
    tab.querySelector('ha-icon').icon;
  }
};
