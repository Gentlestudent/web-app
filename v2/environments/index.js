const development = require('./development');
const production = require('./production');

const environments = { development, production };

module.exports = (env) => environments[env];
