/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs');
const gulp = require('gulp');

const ICON_PACKAGE_PATH = path.resolve(__dirname, '../node_modules/@mdi/svg/');
const META_PATH = path.resolve(ICON_PACKAGE_PATH, 'meta.json');
const PACK_PATH = path.resolve(ICON_PACKAGE_PATH, 'package.json');
const ICON_PATH = path.resolve(ICON_PACKAGE_PATH, 'svg');
const OUTPUT_DIR = path.resolve(__dirname, '../src/docSource');
const MDI_OUTPUT_PATH = path.resolve(OUTPUT_DIR, 'mdi.js');

const mdi = JSON.parse(fs.readFileSync(path.resolve(ICON_PACKAGE_PATH, PACK_PATH), 'UTF-8'));
const mdiInstalled = fs
  .readFileSync(path.resolve(MDI_OUTPUT_PATH), 'UTF-8')
  .split('\n')[0]
  .replace('//', '');

function loadIcon(name) {
  const iconPath = path.resolve(ICON_PATH, `${name}.svg`);
  try {
    return fs.readFileSync(iconPath, 'utf-8');
  } catch (err) {
    return null;
  }
}

function transformXMLtoPolymer(name, xml) {
  const start = xml.indexOf('><path') + 1;
  const end = xml.length - start - 6;
  const pth = xml.substr(start, end);
  return `<g id="${name}">${pth}</g>`;
}

function generateIconset(iconsetName, iconNames) {
  const iconDefs = Array.from(iconNames)
    .map(name => {
      const iconDef = loadIcon(name);
      if (!iconDef) {
        throw new Error(`Unknown icon referenced: ${name}`);
      }
      return transformXMLtoPolymer(name, iconDef);
    })
    .join('');
  return `<iron-iconset-svg name="${iconsetName}" size="24"><svg><defs>${iconDefs}</defs></svg></iron-iconset-svg>`;
}

gulp.task('gen-icons-mdi', done => {
  if (mdi.version === mdiInstalled) done();
  const meta = JSON.parse(fs.readFileSync(path.resolve(ICON_PACKAGE_PATH, META_PATH), 'UTF-8'));
  const iconNames = meta.map(iconInfo => iconInfo.name);
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }
  fs.writeFileSync(
    MDI_OUTPUT_PATH,
    `//${mdi.version}\n/* eslint-disable */\nexport const mdiIconSet = '${generateIconset('mdi', iconNames)}';`,
  );
  done();
});
