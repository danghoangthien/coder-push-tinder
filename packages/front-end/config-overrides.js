const { override, addLessLoader, useEslintRc, useBabelRc } = require('customize-cra')
const path = require('path')
const findWebpackPlugin = (plugins, pluginName) =>
  plugins.find(plugin => plugin.constructor.name === pluginName)
const overrideProcessEnv = (value, config) => {
  const plugin = findWebpackPlugin(config.plugins, 'DefinePlugin')
  const processEnv = plugin.definitions['process.env'] || {}
  plugin.definitions['process.env'] = {
    ...processEnv,
    ...value
  }
  return config
}

const version = JSON.stringify(require('../../package.json').version)

module.exports = override(
  addLessLoader({
    javascriptEnabled: true
  }),
  (config, env) => {
    config.resolve = {
      alias: {
        '@': path.resolve(__dirname, 'src/')
      }
    }
    return overrideProcessEnv(
      {
        REACT_APP_VERSION: version
      },
      config
    )
  }
)
