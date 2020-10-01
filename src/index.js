const fs = require('fs');
const util = require('util');

/**
 * Overrides an ENV var with a value if it exists
 * @param {*} key the key to overwrite if found
 * @param {*} siteName the value to check
 */
function setEnvWithValue(key, siteName) {
  const envVar = `${siteName}_${key}`;

  if (!process.env[envVar]) {
    return;
  }

  console.log(`Exporting ${key}=${process.env[envVar]}.`);
  process.env[key] = process.env[envVar];

  return `${key}=${process.env[envVar]}\n`;
}

module.exports = {
  onPreBuild: async () => {
    const siteName = `${process.env.SITE_NAME}`.toUpperCase().replace(/-/g, '_');

    const envOverrides = Object.keys(process.env).map((key) => [
      setEnvWithValue(key, siteName),
    ]);

    const replaced = [].concat(...envOverrides).filter(Boolean);

    if (replaced.length) {
      console.log(`Replaced ${replaced.length} ENVs`);
    } else {
      console.log(`Nothing found... keeping default ENVs`);
    }
  },
};
