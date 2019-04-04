import {roles} from 'datocms-client'
import hideFieldFromRole from './hideFieldFromRole'
import flushPromises from './test/support/flushPromises'
jest.mock('datocms-client')

const mockPluginFactory = (options = {}) => {
  return {
    parameters: {
      global: {
        api_key: 'ciao'
      },
      instance: {
        roles: 'editor, translator'
      },
    },
    startAutoResizer: jest.fn(() => null),
    toggleField: jest.fn(() => null),
    getFieldValue: jest.fn(() => 'value'),
    currentUser: {relationships: {role: { data: { id: '345'}}}},
    field: {
      attributes: {
        label: 'title'
      }
    },
    fieldPath: 'title'
  }
}

describe('hideFieldFromRole', () => {
  afterEach(() => {
    document.getElementsByTagName('html')[0].innerHTML = ''
  })

  describe('if currentUser is on the list', () => {
    beforeAll(() => {
      roles.find = jest.fn(() => Promise.resolve({
        name: 'editor',
      }))
    })

    it('hides field', async () => {
      const plugin = mockPluginFactory()
      hideFieldFromRole(plugin, document, window)
      await flushPromises()
      expect(roles.find).toHaveBeenCalledTimes(1)
      expect(plugin.toggleField).toHaveBeenCalledTimes(1)
    })
  })

  describe('if currentUser is not on the list', () => {
    beforeAll(() => {
      roles.find = jest.fn(() => Promise.resolve({
        name: 'admin',
      }))
    })

    it('does not hide field', async () => {
      const plugin = mockPluginFactory()
      hideFieldFromRole(plugin, document, window)
      await flushPromises()
      expect(roles.find).toHaveBeenCalledTimes(1)
      expect(plugin.toggleField).toHaveBeenCalledTimes(0)
    })
  })
})
