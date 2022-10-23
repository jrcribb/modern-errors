import type { ErrorName } from 'error-custom-class'
import type { Plugins } from '../plugins/main.js'
import type { PluginsInstanceMethods } from '../plugins/instance.js'
import type { PluginsProperties } from '../plugins/properties.js'
import type { AggregateErrorsOption, AggregateErrorsProp } from './aggregate.js'
import type { ErrorProps } from '../core_plugins/props.js'
import type { CustomAttributes } from '../subclass/custom.js'
import type { Intersect } from '../utils.js'

type SpecificErrorName<ErrorNameArg extends ErrorName> = { name: ErrorNameArg }

type CoreErrorProps = keyof Error | 'errors'
type ConstErrorProps = Exclude<CoreErrorProps, 'message' | 'stack'>

export type BaseError<
  PluginsArg extends Plugins,
  ErrorPropsArg extends ErrorProps,
  CustomAttributesArg extends CustomAttributes,
  ErrorNameArg extends ErrorName,
  AggregateErrorsArg extends AggregateErrorsOption,
> = Intersect<
  Intersect<
    Intersect<
      Intersect<
        Intersect<
          Error & SpecificErrorName<ErrorNameArg>,
          AggregateErrorsProp<AggregateErrorsArg>,
          never
        >,
        CustomAttributesArg,
        CoreErrorProps
      >,
      PluginsInstanceMethods<PluginsArg> & object,
      CoreErrorProps
    >,
    PluginsProperties<PluginsArg> & object,
    ConstErrorProps | keyof PluginsInstanceMethods<PluginsArg>
  >,
  ErrorPropsArg,
  ConstErrorProps | keyof PluginsInstanceMethods<PluginsArg>
>

/**
 *
 */
export type ErrorInstance<PluginsArg extends Plugins = []> = BaseError<
  PluginsArg,
  ErrorProps,
  CustomAttributes,
  ErrorName,
  AggregateErrorsOption
>