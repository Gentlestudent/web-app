const development = require('./env.dev');
const production = require('./env.production');

const environments = { development, production };

module.exports = (env) => environments[env];
