const { alias, configPaths } = require("react-app-rewire-alias");

module.exports = function override(config) {
  const configRes = alias(configPaths("./tsconfig.path.json"))(config);

  return configRes;
};
