/*


next export prepares a dir of static content to be uploaded to a CDN. Unfortunately, using getServerSideProps() forces this command to exit. Since we want to produce a CDN-friendly static content directory and have CDN misses rewritten to our Cloud Function, we want to skip GSSP pages and not error on them. To this end, the scripts/export.js script is used to prepare our static content into the out/ directory. This is just a monkey-patch, an official request for next export to ignore GSSP has been made in https://github.com/zeit/next.js/issues/12313
NOTE: this is NOT required to use Next.js on Firebase. You can completely remove the node ./scripts/export.js part of the deploy script and the app will work. It just means the first request for each _next/* resource will come from the Cloud Function and then be cached by the CDN, instead of being cached right away.

 */

var shell = require('shelljs');
var nextjsConfig = require('../next.config');
var BUILD_ID = shell.cat(`${nextjsConfig.distDir}/BUILD_ID`);

function hoistPages(fileExt, outputPath) {
  console.log(
    `${nextjsConfig.distDir}/server/static/${BUILD_ID}/pages/**/*${fileExt} -> ${outputPath}/`
  );
  var match = new RegExp('\\' + `${fileExt}`);
  var filesToHoist = shell
    .find(`${nextjsConfig.distDir}/server/static/${BUILD_ID}/pages/`)
    .filter(function (file) {
      return file.match(match) && file.match(/^((?!\[|\]).)*$/);
    });
  filesToHoist.forEach((filePath) => {
    var outPath = filePath.split('pages/')[1];
    if (outPath.includes('/')) {
      shell.mkdir('-p', `${outputPath}/${outPath.substring(0, outPath.lastIndexOf('/'))}`);
    }
    shell.cp('-f', filePath, `${outputPath}/${outPath}`);
  });
}

console.log(
  "next export doesn't support getServerSideProps() so we perform our own copy of static assets to prepare our Firebase Hosting upload"
);
console.log('Hoist public/, nextjs runtime and optimised chunks, computed html and json data\n');

console.log('public/ -> out/');
shell.mkdir('-p', 'out/');
shell.cp('-Rf', 'public/*', 'out/');

console.log(`${nextjsConfig.distDir}/static/ -> out/_next/static/`);
shell.mkdir('-p', 'out/_next/static/');
shell.cp('-Rf', `${nextjsConfig.distDir}/static/`, 'out/_next/');

hoistPages('.html', 'out');
hoistPages('.json', `out/_next/data/${BUILD_ID}`);
