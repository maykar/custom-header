import { localize } from './localize/localize';
import { deviceID } from './template-variables';
import { ha_elements } from './ha-elements';
import { CustomHeader } from './build-header';
import { CustomHeaderConfig } from './config';

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
  clearTimeout((window as any).customHeaderTempTimeout);
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
    if ((window as any).customHeaderUnsub && (window as any).customHeaderUnsub.length) {
      for (const prev of (window as any).customHeaderUnsub) prev();
      (window as any).customHeaderUnsub = [];
    }
    const ch = new CustomHeader(haElem);
    CustomHeaderConfig.buildConfig(ch);
    CustomHeaderConfig.buildConfig(ch);
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
