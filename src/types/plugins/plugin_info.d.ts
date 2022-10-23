import type { ErrorName } from 'error-custom-class'
import type { AnyErrorClass } from '../any.js'
import type { ErrorClass } from '../class.js'
import type { ErrorInstance } from '../instance.js'
import type { Plugins } from './main.js'

/**
 *
 */
interface CommonInfo {
  /**
   *
   */
  error: ErrorInstance

  /**
   *
   */
  readonly options: never

  /**
   *
   */
  readonly showStack: boolean

  /**
   *
   */
  readonly AnyError: AnyErrorClass<Plugins>

  /**
   *
   */
  readonly ErrorClasses: {
    AnyError: never
    UnknownError: ErrorClass
    [name: ErrorName]: ErrorClass
  }

  /**
   *
   */
  readonly errorInfo: (error: unknown) => Info['errorInfo']
}

/**
 *
 */
export interface Info {
  /**
   *
   */
  readonly properties: CommonInfo

  /**
   *
   */
  readonly instanceMethods: CommonInfo

  /**
   *
   */
  readonly staticMethods: Omit<CommonInfo, 'error' | 'showStack'>

  /**
   *
   */
  readonly errorInfo: Omit<
    CommonInfo,
    'AnyError' | 'ErrorClasses' | 'errorInfo'
  >
}