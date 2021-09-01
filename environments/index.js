const fs = require('fs');
const path = require('path');


module.exports = (() => {
  const secrets = {};

  return async function getEnvironmentVar(name) {
    if (secrets[name]) {
      return secrets[name];
    }

    try {
      secrets[name] = process.env.NODE_ENV === 'development' ? (await import('./env.dev.js')).default[name] : process.env[name];
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
