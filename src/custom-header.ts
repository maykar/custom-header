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

CustomHeaderConfig.buildConfig(new CustomHeader(ha_elements()));

if (ha_elements()) {
  const callback = mutations => {
    mutations.forEach(({ addedNodes, target }) => {
      if (addedNodes.length && target.nodeName == 'PARTIAL-PANEL-RESOLVER') {
        if (addedNodes[0].nodeName == 'HA-PANEL-LOVELACE') {
          new MutationObserver(function(mut) {
            for (const m of mut) {
              for (const node of m.addedNodes) {
                if (node.nodeName == 'HUI-ROOT' && ha_elements() && ha_elements().menu) {
                  new MutationObserver(function() {
                    if (!window.location.href.includes('disable_ch')) hideHeader();
                    CustomHeaderConfig.buildConfig(new CustomHeader(ha_elements()));
                  }).observe(ha_elements().menu.shadowRoot, { childList: true });
                }
              }
            }
          }).observe(addedNodes[0].shadowRoot, { childList: true });
        }
      }
    });
  };
  const observer = new MutationObserver(callback);
  observer.observe(ha_elements().partialPanel, { childList: true });
}
