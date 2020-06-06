import { ha_elements } from './ha-elements';
import { getLovelace } from 'custom-card-helpers';

// deviceID taken directly from https://github.com/thomasloven/lovelace-card-tools
const _deviceID = () => {
  const ID_STORAGE_KEY = 'lovelace-player-device-id';
  if (window['fully'] && typeof fully.getDeviceId === 'function') return fully.getDeviceId();
  if (!localStorage[ID_STORAGE_KEY]) {
    const s4 = () => {
      return Math.floor((1 + Math.random()) * 100000)
        .toString(16)
        .substring(1);
    };
    localStorage[ID_STORAGE_KEY] = `${s4()}${s4()}-${s4()}${s4()}`;
  }
  return localStorage[ID_STORAGE_KEY];
};
export let deviceID = _deviceID();

export const defaultVariables = locale => {
  const d = new Date();
  let vars = {
    deviceID: deviceID,
    userAgent: navigator.userAgent,
    url: window.location.href,
    time: d.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' }),
    date: d.toLocaleDateString(locale, {}),
    monthNum: d.getMonth() + 1,
    monthNumLZ: String(d.getMonth() + 1).padStart(2, 0),
    monthNameShort: d.toLocaleDateString(locale, { month: 'short' }),
    monthNameLong: d.toLocaleDateString(locale, { month: 'long' }),
    dayNum: d.getDate(),
    dayNumLZ: String(d.getDate()).padStart(2, 0),
    dayNameShort: d.toLocaleDateString(locale, { weekday: 'short' }),
    dayNameLong: d.toLocaleDateString(locale, { weekday: 'long' }),
    hours12: String((d.getHours() + 24) % 12 || 12),
    hours12LZ: String((d.getHours() + 24) % 12 || 12).padStart(2, 0),
    hours24: d.getHours(),
    hours24LZ: String(d.getHours()).padStart(2, 0),
    minutes: d.getMinutes(),
    minutesLZ: String(d.getMinutes()).padStart(2, 0),
    year2d: String(d.getFullYear()).substr(-2),
    year4d: d.getFullYear(),
    AMPM: d.getHours() >= 12 ? 'PM' : 'AM',
    ampm: d.getHours() >= 12 ? 'pm' : 'am',
  };

  const hass = ha_elements().hass;
  vars.hassVersion = hass ? hass.config.version : '';
  vars.isAdmin = hass ? hass.user.is_admin : '';
  vars.isOwner = hass ? hass.user.is_owner : '';
  vars.user = hass ? hass.user.name : '';
  vars.userID = hass ? hass.user.id : '';

  const lovelace = getLovelace();
  const current_view = lovelace && lovelace.config.views[lovelace.current_view] != undefined;
  vars.viewIndex = lovelace ? lovelace.current_view : '';
  vars.viewTitle = current_view ? lovelace.config.views[lovelace.current_view].title || '' : '';
  vars.viewPath = current_view ? lovelace.config.views[lovelace.current_view].path || '' : '';

  return vars;
};
