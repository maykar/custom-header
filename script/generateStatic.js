/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs');
const gulp = require('gulp');

const settings = require('../src/docSettings');

const buildDir = path.resolve(__dirname, '../docs');
const docsDir = path.resolve(__dirname, '../src/docs');
const srcDir = path.resolve(__dirname, '../src');

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function docsToJson() {
  const dirs = fs.readdirSync(docsDir);
  const jsonfeed = {};
  dirs.map(dir => {
    files = fs.readdirSync(path.join(docsDir, dir));
    jsonfeed[dir] = [];
    jsonfeed[dir] = files.map(file => {
      const text = fs.readFileSync(path.join(docsDir, dir, file), 'utf-8');
      return {
        title: file.replace('_', ' ').split('.')[0],
        id: file,
        content: text,
      };
    });
  });
  fs.writeFileSync(`${buildDir}/jsonfeed.json`, JSON.stringify(jsonfeed));
}

gulp.task('generate', done => {
  docsToJson();
  const HTML = `
  <!DOCTYPE html>
  <html lang="en">
  <html>
  <head>
    <meta charset="UTF-8">
    <title>${settings.siteName}</title>
    <description>${settings.siteDescription}</description>
    <link rel="shortcut icon" type="image/jpg" href="./img/favicon.ico"/>
    <script type="module" src="./Main.js"></script>
    <link rel="stylesheet" href="./styles.css">
  </head>
  <body>
    <docs-main></docs-main>
  </body>
  </html>
  `;
  const CSS = `
  body {
    --primary-color: ${settings.primaryColor};
  }
  docs-main {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
  }
  `;
  fs.writeFileSync(`${buildDir}/index.html`, HTML);
  fs.writeFileSync(`${buildDir}/styles.css`, CSS);
  done();
});
