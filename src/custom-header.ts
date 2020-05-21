import { localize } from './localize/localize';
import { deviceID } from './template-variables';
import { ha_elements } from './ha-elements';
import { CustomHeader } from './build-header';
import { CustomHeaderConfig } from './config';

interface Window {
  last_template_result: any;
}

console.info(
  `%c  CUSTOM-HEADER  \n%c  ${localize('common.version')} master  `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
);

window.setTimeout(() => {
  if (!customElements.get('card-tools')) console.log('Device ID: ', deviceID);
}, 2000);

const hideHeader = () => {
  const haElem = ha_elements();
  if (!haElem) return;
  haElem.appHeader.style.display = 'none';
};

if (!window.location.href.includes('disable_ch')) hideHeader();

export const rebuild = () => {
  if (ha_elements() && ha_elements().root.querySelector('app-toolbar').className == 'edit-mode') return;
  (window as any).last_template_result = [];
  if (!window.location.href.includes('disable_ch')) hideHeader();
  let timeout;
  const haElem = ha_elements();
  const panelLove = document!
    .querySelector('body > home-assistant')!
    .shadowRoot!.querySelector('home-assistant-main')!
    .shadowRoot!.querySelector('app-drawer-layout')!
    .querySelector('partial-panel-resolver')!
    .querySelector('ha-panel-lovelace')!;
  if (!haElem && panelLove) {
    timeout = window.setTimeout(() => {
      rebuild();
    }, 200);
    timeout;
  } else if (haElem && haElem.lovelace && haElem.menu) {
    clearTimeout(timeout);
    CustomHeaderConfig.buildConfig(new CustomHeader(haElem));
    if (!haElem.root.querySelector('ch-header')) {
      haElem.root.querySelector('ch-header').style.visibility = 'hidden';
      haElem.root.querySelector('ch-footer').style.visibility = 'hidden';
    }
  }
};
const rebuildMO = new MutationObserver(rebuild);
rebuildMO.observe(
  document!
    .querySelector('body > home-assistant')!
    .shadowRoot!.querySelector('home-assistant-main')!
    .shadowRoot!.querySelector('app-drawer-layout')!
    .querySelector('partial-panel-resolver')!,
  { childList: true },
);

rebuild();
