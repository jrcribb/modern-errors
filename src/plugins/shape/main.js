import isPlainObj from 'is-plain-obj'

import { normalizeGetOptions } from '../../options/get.js'
import { normalizeIsOptions } from '../../options/method.js'

import { validateDuplicatePlugins } from './duplicate.js'
import { normalizeMethods } from './methods.js'
import { validatePluginName } from './name.js'

// Validate and normalize plugins.
// Also merge plugins of parent and child classes.
export const normalizePlugins = function (parentPlugins, plugins, ParentError) {
  const pluginsA = normalizePluginsOpt(plugins)
  const pluginsB = pluginsA.map(normalizePlugin)
  const pluginsC = [...parentPlugins, ...pluginsB]
  validateDuplicatePlugins(pluginsC, ParentError)
  return pluginsC
}

const normalizePluginsOpt = function (pluginsOpt = []) {
  if (!Array.isArray(pluginsOpt)) {
    throw new TypeError(`The "plugins" option must be an array: ${pluginsOpt}`)
  }

  return pluginsOpt
}

const normalizePlugin = function (plugin) {
  if (!isPlainObj(plugin)) {
    throw new TypeError(
      `The "plugins" option must be an array of plugin objects: ${plugin}`,
    )
  }

  const pluginA = validatePluginName(plugin)
  validateOptionalFuncs(pluginA)
  const pluginB = normalizeMethods({
    plugin: pluginA,
    propName: 'instanceMethods',
    coreObject: Error.prototype,
    coreObjectName: 'error',
    forbiddenNames: new Set([]),
  })
  const pluginC = normalizeMethods({
    plugin: pluginB,
    propName: 'staticMethods',
    coreObject: Error,
    coreObjectName: 'Error',
    forbiddenNames: new Set(['normalize', 'subclass']),
  })
  const pluginD = normalizeIsOptions({ plugin: pluginC })
  const pluginE = normalizeGetOptions({ plugin: pluginD })
  return pluginE
}

const validateOptionalFuncs = function (plugin) {
  OPTIONAL_FUNCS.forEach((funcName) => {
    validateOptionalMethod(plugin, funcName)
  })
}

const OPTIONAL_FUNCS = ['isOptions', 'getOptions', 'properties']

const validateOptionalMethod = function (plugin, funcName) {
  const funcValue = plugin[funcName]

  if (funcValue !== undefined && typeof funcValue !== 'function') {
    throw new TypeError(
      `The plugin "${plugin.fullName}"'s "${funcName}()" property must be either undefined or a function, not: ${funcValue}`,
    )
  }
}
