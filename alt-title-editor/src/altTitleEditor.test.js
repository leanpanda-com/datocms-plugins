import {items, uploads} from 'datocms-client'

import altTitleEditor from './altTitleEditor'
import flushPromises from './test/support/flushPromises'

jest.mock('datocms-client')

const mockPluginFactory = (options = {}) => {
  const defaults = {
    localized: false,
    locales: ['it'],
    fields: []
  }
  const opts = Object.assign(defaults, options)

  return {
    getFieldValue: jest.fn(() => ({alt: 'New alt', title: 'New title'})),
    parameters: {global: {api_key: 'ciao'}},
    startAutoResizer: jest.fn(() => null),
    itemType: {id: '42'},
    site: {attributes: {locales: opts.locales}},
    itemId: '123',
    fields: opts.fields,
    locale: opts.locale
  }
}

const mockWindowFactory = (options = {}) => {
  const opts = Object.assign({confirm: true}, options)

  return {
    confirm: jest.fn(() => opts.confirm)
  }
}

describe('altTitleEditor', () => {
  afterEach(() => {
    document.getElementsByTagName('html')[0].innerHTML = ''
  })

  it('starts the auto resizer', () => {
    const plugin = mockPluginFactory()

    altTitleEditor(plugin, document, mockWindowFactory())

    expect(plugin.startAutoResizer).toHaveBeenCalledTimes(1)
  })

  describe('when item is not localized and has a cover image and a gallery', () => {
    beforeAll(() => {
      items.find = jest.fn((id) => Promise.resolve({
        id: id,
        cover: '890',
        gallery: ['123', '456']
      }))
      uploads.find = jest.fn((id) => Promise.resolve({
        id: id,
        isImage: true,
      }))
      uploads.update = jest.fn((id, {alt, title}) => Promise.resolve({
        id: id,
        alt,
        title,
      }))
    })

    it('skips without confirmation', async () => {
      const mockWindow = mockWindowFactory({confirm: false})
      await flushPromises()

      altTitleEditor(mockPluginFactory(), document, mockWindow)
      const button = document.getElementById('DatoCMS-button--primary')
      button.click()

      await flushPromises()
      expect(uploads.update).toHaveBeenCalledTimes(0)
    })

    it('updates images', async () => {
      const fields = {
        fields: [
          {
            attributes: {
              field_type: 'file',
              api_key: 'cover',
              label: 'Cover',
              localized: false,
            },
            relationships: {
              item_type: {
                data: {
                  id: '42'
                }
              }
            }
          },
          {
            attributes: {
              field_type: 'gallery',
              api_key: 'gallery',
              label: 'Gallery',
              localized: false,
            },
            relationships: {
              item_type: {
                data: {
                  id: '42'
                }
              }
            }
          }
        ]
      }
      altTitleEditor(mockPluginFactory(fields), document, mockWindowFactory())
      const button = document.getElementById('DatoCMS-button--primary')
      button.click()

      await flushPromises()
      expect(uploads.update).toHaveBeenCalledTimes(3)
    })
  })

  describe('when the image field is localized', () => {
    beforeAll(() => {
      items.find = jest.fn((id) => Promise.resolve({
        id: id,
        cover: {it: '890', en: '450'},
      }))
      uploads.find = jest.fn((id) => Promise.resolve({
        id: id,
        isImage: true,
      }))
      uploads.update = jest.fn((id, {alt, title}) => Promise.resolve({
        id: id,
        alt,
        title,
      }))
    })

    it('updates images', async () => {
      const localizedField = {
        localized: true,
        locale: 'it',
        locales: ['it', 'en'],
        fields: [
          {
            attributes: {
              field_type: 'file',
              api_key: 'cover',
              label: 'Cover',
              localized: true,
            },
            relationships: {
              item_type: {
                data: {
                  id: '42'
                }
              }
            }
          }
        ]
      }
      altTitleEditor(mockPluginFactory(localizedField), document, mockWindowFactory())
      const button = document.getElementById('DatoCMS-button--primary')
      button.click()
      await flushPromises()
      const call = uploads.update.mock.calls[0]
      const update = call[1].alt
      expect(update).toBe('New alt')
      expect(uploads.update).toHaveBeenCalledTimes(1)
    })
  })
})
