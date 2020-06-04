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

const hideHeader = haElem => {
  if (!haElem || !haElem.appHeader) return;
  haElem.appHeader.style.display = 'none';
};

if (!window.location.href.includes('disable_ch')) hideHeader(ha_elements());

export const rebuild = () => {
  const haElem = ha_elements();
  if (
    document
      .querySelector('home-assistant')!
      .shadowRoot!.querySelector('home-assistant-main')!
      .shadowRoot!.querySelector('ha-panel-lovelace')!
  ) {
    if (
      document
        .querySelector('home-assistant')!
        .shadowRoot!.querySelector('home-assistant-main')!
        .shadowRoot!.querySelector('ha-panel-lovelace')!
        .shadowRoot!.querySelector('hui-editor')!
    ) {
      // If returning to a dashboard with raw config editor active - wait to rebuild.
      // eslint-disable-next-line prefer-const
      let rawModeMO;
      const editModeCallback = mutations => {
        for (const mutation of mutations) {
          for (const removed of mutation.removedNodes) {
            if (removed.nodeName == 'HUI-EDITOR') {
              // Wait for app-toolbar to exist.
              const raw_timeout = () => {
                const ch_raw_timeout = window.setTimeout(() => {
                  if (ha_elements().root.querySelector('app-toolbar')) {
                    clearTimeout(ch_raw_timeout);
                  } else {
                    ch_raw_timeout;
                  }
                }, 100);
              };
              raw_timeout();
              rebuild();
              rawModeMO.disconnect();
              return;
            }
          }
        }
      };
      rawModeMO = new MutationObserver(editModeCallback);
      rawModeMO.observe(
        document
          .querySelector('home-assistant')!
          .shadowRoot!.querySelector('home-assistant-main')!
          .shadowRoot!.querySelector('ha-panel-lovelace')!.shadowRoot!,
        {
          childList: true,
          subtree: true,
        },
      );
      return;
    }

    // If returning to a dashboard with edit-mode active or just exited raw config - wait to rebuild.
    if (
      haElem &&
      haElem.root.querySelector('app-toolbar') &&
      haElem.root.querySelector('app-toolbar').className == 'edit-mode'
    ) {
      // eslint-disable-next-line prefer-const
      let editModeMO;
      const editModeCallback = mutations => {
        for (const mutation of mutations) {
          for (const removed of mutation.removedNodes) {
            if (removed.classList && removed.classList.contains('edit-mode')) {
              rebuild();
              editModeMO.disconnect();
              return;
            }
          }
        }
      };
      editModeMO = new MutationObserver(editModeCallback);
      editModeMO.observe(haElem.appLayout, {
        childList: true,
        subtree: true,
      });
      return;
    }
  } else {
    return;
  }

  window['last_template_result'] = [];
  clearTimeout(window['customHeaderTempTimeout']);
  if (!window.location.href.includes('disable_ch')) hideHeader(haElem);

  // Wait for elements before building.
  let timeout;
  if (!haElem) {
    timeout = window.setTimeout(() => {
      rebuild();
      return;
    }, 100);
    timeout;
  } else if (haElem && haElem.lovelace && haElem.menu) {
    // Clear timeout and old subscriptions.
    clearTimeout(timeout);
    if (window['customHeaderUnsub'] && window['customHeaderUnsub'].length) {
      for (const prev of window['customHeaderUnsub']) prev();
      window['customHeaderUnsub'] = [];
    }

    // Build header and config.
    const ch = new CustomHeader(haElem);
    CustomHeaderConfig.buildConfig(ch);
    // Once more for good luck.
    CustomHeaderConfig.buildConfig(ch);
    // Templates not rendering if config isn't built twice. Looking into it...

    rawConfigObserver();
  }
};

const rawConfigObserver = () => {
  const haElem = ha_elements();
  if (window['customHeaderRebuildMO']) window['customHeaderRebuildMO'].disconnect();
  if (window['customHeaderRawConfigExit']) window['customHeaderRawConfigExit'].disconnect();
  if (!haElem || !haElem.partialPanel) {
    window.setTimeout(() => {
      rawConfigObserver();
      return;
    }, 100);
  }
  window['customHeaderRebuildMO'] = new MutationObserver(rebuild);
  window['customHeaderRebuildMO'].observe(
    document
      .querySelector('home-assistant')!
      .shadowRoot!.querySelector('home-assistant-main')!
      .shadowRoot!.querySelector('partial-panel-resolver')!,
    { childList: true },
  );

  // Watch for raw config editor and trigger "rebuild" on exit.
  const rawExit = mutations => {
    for (const mutation of mutations) {
      for (const node of mutation.removedNodes) {
        if (node.nodeName == 'HUI-EDITOR') {
          // Wait for app-toolbar to exist.
          const raw_timeout = () => {
            const ch_raw_timeout = window.setTimeout(() => {
              if (
                document
                  .querySelector('home-assistant')!
                  .shadowRoot!.querySelector('home-assistant-main')!
                  .shadowRoot!.querySelector('ha-panel-lovelace')!
                  .shadowRoot!.querySelector('hui-root')!
                  .shadowRoot!.querySelector('app-toolbar')!
              ) {
                rebuild();
                clearTimeout(ch_raw_timeout);
                return;
              } else {
                ch_raw_timeout;
              }
            }, 100);
          };
          raw_timeout();
        }
      }
    }
  };
  window['customHeaderRawConfigExit'] = new MutationObserver(rawExit);
  window['customHeaderRawConfigExit'].observe(
    document
      .querySelector('home-assistant')!
      .shadowRoot!.querySelector('home-assistant-main')!
      .shadowRoot!.querySelector('ha-panel-lovelace')!.shadowRoot!,
    { childList: true },
  );
};

// First build, probably should have just called it build, huh?
rebuild();
