const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const versions = require('./versions.json');

const srcDirectory = path.join(__dirname, 'src');
const scripts = fs.readdirSync(srcDirectory).filter(f => f.endsWith('.js'));
scripts.forEach(f => {
  const version = versions[f];
  if (!version) {
    return;
  }
  [
    path.join(__dirname, 'dist', f),
    path.join(__dirname, 'dist', 'quickbar', f),
  ].forEach(p => {
    const fileContent = fs.readFileSync(p);
    const compile = _.template(fileContent);
    fs.writeFileSync(p, compile({ version }));
  });
});
