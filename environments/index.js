const environments = { development: 'dev', production: 'production' };

module.exports = (env) => {
  let environment = {};

  try {
    // eslint-disable-next-line
    environment = require(`./env.${environments[env]}`);
  } catch (ex) {
    if (ex instanceof Error && ex.code === 'MODULE_NOT_FOUND') {
      console.log(
        `Couldn't load environment file. Make sure an environment file for "${process.env.NODE_ENV}" exists under /environments`
      );
      process.exit(1);
    } else throw ex;
  }
  return environment;
};
