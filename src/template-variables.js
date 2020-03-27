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
  const hass = ha_elements().hass;
  const lovelace = getLovelace();
  const d = new Date();
  if (!lovelace || lovelace.config.views[lovelace.current_view] == undefined) return;
  return {
    deviceID: deviceID,
    isAdmin: hass.user.is_admin,
    isOwner: hass.user.is_owner,
    user: hass.user.name,
    userID: hass.user.id,
    userAgent: navigator.userAgent,
    viewTitle: lovelace.config.views[lovelace.current_view].title,
    viewPath: lovelace.config.views[lovelace.current_view].path,
    viewIndex: lovelace.current_view,
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
};
