const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);

module.exports = (() => {
  const secrets = {};
  const secretsDir = '/run/secrets';

  return async function getEnvironmentVar(name) {
    if (secrets[name]) {
      return secrets[name];
    }

    try {
      secrets[name] = process.env.NODE_ENV === 'development' ? (await import('./env.dev.js')).default[name] : await readFile(path.join(secretsDir, name), 'utf8');
      return getEnvironmentVar(name);
    } catch (error) {
      if (error.code === 'ENOENT') {
        console.warn(`secret "${name}" doesn't exist`)
        return '';
      }
      console.error(error);
    }
  }
})();
