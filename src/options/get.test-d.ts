import type { Plugin } from 'modern-errors'
import { expectAssignable, expectNotAssignable } from 'tsd'

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
const name = 'test' as const

expectAssignable<Plugin>({
  name,
  getOptions: (input: true, full: boolean) => input,
})
expectAssignable<Plugin>({ name, getOptions: () => true })
expectNotAssignable<Plugin>({ name, getOptions: true })
expectNotAssignable<Plugin>({
  name,
  getOptions: (input: true, full: string) => input,
})

expectAssignable<Plugin>({ name, isOptions: (input: unknown) => true })
expectNotAssignable<Plugin>({ name, isOptions: true })
expectNotAssignable<Plugin>({ name, isOptions: (input: true) => true })
expectNotAssignable<Plugin>({ name, isOptions: (input: unknown) => 0 })
