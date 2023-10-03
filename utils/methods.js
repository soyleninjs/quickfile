const fs = require('fs-extra');
const path = require('node:path');

const updateWebkpack = (object, property) => {
  let regex;

  if (object === "css") {
    regex = /(const cssEntries = {[^}]+)(?=})/;
  }

  if (object === "js") {
    regex = /(const jsEntries = {[^}]+)(?=})/;
  }

  const webpackConfigFilePath = path.join(__dirname, "..", "webpack.config.js");
  const webpackFile = fs.readFileSync(webpackConfigFilePath, 'utf8');
  const updateFile = webpackFile.replace(
    regex,
    `$1  ${property},\n`,
  );
  fs.writeFileSync(webpackConfigFilePath, updateFile);
};

const generateFile = (path, content) => {
  fs.ensureFile(path).then(() => {fs.writeFileSync(path, content)})
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    generateFile,
    updateWebkpack
  }
}
