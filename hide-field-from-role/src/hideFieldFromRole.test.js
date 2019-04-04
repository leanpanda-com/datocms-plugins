import {roles} from 'datocms-client'
import hideFieldFromRole from './hideFieldFromRole'
import flushPromises from './test/support/flushPromises'
jest.mock('datocms-client')

const mockPluginFactory = (options = {}) => {
  const defaults = {
    id: '345',
    fieldPath: 'foo',
    localized: false,
    singleton: false,
    unique: false
  }

  const opts = Object.assign(defaults, options)

  return {
    parameters: {
      global: {
        api_key: 'ciao'
      },
      instance: {
        roles: 'editor,translator'
      },
    },
    startAutoResizer: jest.fn(() => null),
    toggleField: jest.fn(() => null),
    getFieldValue: jest.fn(() => 'value'),
    currentUser: {relationships: {role: { data: { id: opts.id}}}},
    field: {
      attributes: {
        label: 'title',
        localized: opts.localized,
      }
    },
    fieldPath: opts.fieldPath,
    locale: opts.locale
  }
}

describe('hideFieldFromRole', () => {
  beforeEach(() => {
    roles.find = jest.fn(() => Promise.resolve({
      id: '12',
      name: 'editor',
    }))
  })

  afterEach(() => {
    document.getElementsByTagName('html')[0].innerHTML = ''
  })

  it('starts the auto resizer', () => {
    const plugin = mockPluginFactory()

    hideFieldFromRole(plugin, document, window)

    expect(plugin.startAutoResizer).toHaveBeenCalledTimes(1)
  })

  it('hides field from editor but shows it to admin', async () => {
    hideFieldFromRole(mockPluginFactory(), document, window)

    await flushPromises()
    expect(roles.find).toHaveBeenCalledTimes(1)
  })
})
