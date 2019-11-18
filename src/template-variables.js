export const defaultVariables = () => {
  const d = new Date();
  return {
    time: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    date: d.toLocaleDateString([], {}),
    monthNum: d.getMonth() + 1,
    monthNumLZ: String(d.getMonth() + 1).padStart(2, 0),
    monthNameShort: d.toLocaleDateString([], { month: 'short' }),
    monthNameLong: d.toLocaleDateString([], { month: 'long' }),
    dayNum: d.getDate(),
    dayNumLZ: String(d.getDate()).padStart(2, 0),
    dayNameShort: d.toLocaleDateString([], { weekday: 'short' }),
    dayNameLong: d.toLocaleDateString([], { weekday: 'long' }),
    hours12: d.getHours() > 12 ? d.getHours() - 12 : d.getHours(),
    hours12LZ: String(d.getHours() > 12 ? d.getHours() - 12 : d.getHours()).padStart(2, 0),
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
