import test from 'ava'
import { each } from 'test-each'

import {
  getPropertiesInfo,
  getInstanceInfo,
  getMixInfo,
  getStaticInfo,
} from '../../../helpers/info.test.js'
import { ErrorSubclasses } from '../../../helpers/plugin.test.js'
import { getUnknownErrors } from '../../../helpers/unknown.test.js'

each(
  ErrorSubclasses,
  [getPropertiesInfo, getInstanceInfo, getMixInfo, getStaticInfo],
  getUnknownErrors(),
  // eslint-disable-next-line max-params
  ({ title }, ErrorClass, getInfo, getUnknownError) => {
    test(`errorInfo normalizes unknown errors | ${title}`, (t) => {
      const { errorInfo } = getInfo(ErrorClass)
      const info = errorInfo(getUnknownError())
      t.is(info.error.constructor, ErrorClass)
      t.is(info.ErrorClass, ErrorClass)
    })
  },
)

each(
  ErrorSubclasses,
  [(error) => error.properties, (error) => error.getInstance()],
  ({ title }, ErrorClass, getSpecifics) => {
    test(`errorInfo can be applied on error itself | ${title}`, (t) => {
      const error = new ErrorClass('test')
      const { errorInfo } = getSpecifics(error)
      t.is(errorInfo(error).error, error)
    })
  },
)

each(
  ErrorSubclasses,
  [getPropertiesInfo, getInstanceInfo, getMixInfo, getStaticInfo],
  ({ title }, ErrorClass, getInfo) => {
    test(`errorInfo returns error | ${title}`, (t) => {
      const { errorInfo } = getInfo(ErrorClass)
      const error = new ErrorClass('test')
      t.is(errorInfo(error).error, error)
    })

    test(`errorInfo returns ErrorClass | ${title}`, (t) => {
      const { errorInfo } = getInfo(ErrorClass)
      t.is(errorInfo(new ErrorClass('test')).ErrorClass, ErrorClass)
    })

    test(`errorInfo returns ErrorClass of subclass | ${title}`, (t) => {
      const TestError = ErrorClass.subclass('TestError')
      const { errorInfo } = getInfo(ErrorClass)
      t.is(errorInfo(new TestError('test')).ErrorClass, TestError)
    })
  },
)