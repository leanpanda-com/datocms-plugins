import bulkEdit from './bulkEdit';
import flushPromises from './test/support/flushPromises'
import {SiteClient, mockItemsAll, mockItemsUpdate} from 'datocms-client'
jest.mock('datocms-client')

const mockPluginFactory = (options = {}) => {
  const defaults = {
    fieldPath: 'foo',
    localized: false,
    singleton: false,
    unique: false
  }
  const opts = Object.assign(defaults, options)

  return {
    parameters: {
      global: {
        api_key: "ciao"
      }
    },
    startAutoResizer: jest.fn(() => null),
    getFieldValue: jest.fn(() => 'value'),
    itemType: {
      attributes: {
        singleton: opts.singleton
      }
    },
    field: {
      attributes: {
        api_key: 'title',
        label: 'title',
        localized: opts.localized,
        validators: {
          unique: opts.unique
        }
      }
    },
    fieldPath: opts.fieldPath,
    locale: opts.locale
  }
}

const mockWindowFactory = (options = {}) => {
  const opts = Object.assign({confirm: true}, options)

  return {
    confirm: jest.fn(() => opts.confirm),
    alert: jest.fn(() => true)
  }
}

describe('bulkEdit', () => {
  beforeEach(() => {
    mockItemsAll.mockReset()
    mockItemsAll.mockImplementation(() => Promise.resolve([{id: "12"}]))
    mockItemsUpdate.mockReset()
  })

  afterEach(() => {
    document.getElementsByTagName('html')[0].innerHTML = ''
  })

  it('starts the auto resizer', () => {
    const plugin = mockPluginFactory()

    bulkEdit(plugin, document, mockWindowFactory());

    expect(plugin.startAutoResizer.mock.calls.length).toBe(1)
  })

  it('updates fields', async () => {
    bulkEdit(mockPluginFactory(), document, mockWindowFactory());
    const button = document.getElementById('DatoCMS-button--primary');
    button.click();

    await flushPromises()
    expect(mockItemsUpdate.mock.calls.length).toBe(1)
  });

  it('updates localized fields', async () => {
    const plugin = mockPluginFactory({localized: true, locale: "fr"})

    bulkEdit(plugin, document, mockWindowFactory());
    const button = document.getElementById('DatoCMS-button--primary');
    button.click();

    await flushPromises()
    const call = mockItemsUpdate.mock.calls[0]
    const update = call[1]['title']['fr']
    expect(update).toBe('value')
  });

  it('fails for singletons', () => {
    const plugin = mockPluginFactory({singleton: true})

    expect(() => bulkEdit(plugin, document, mockWindowFactory())).
      toThrow(/model is singleton/)
  })

  it('fails for unique values', () => {
    const plugin = mockPluginFactory({unique: true})

    expect(() => bulkEdit(plugin, document, mockWindowFactory())).
      toThrow(/unique value constraint/)
  })

  it('fails for localized fields without a locale', () => {
    const plugin = mockPluginFactory({localized: true})

    expect(() => bulkEdit(plugin, document, mockWindowFactory())).
      toThrow(/Set the locale/)
  })

  it('skips without confirmation', async () => {
    const mockWindow = mockWindowFactory({confirm: false})

    bulkEdit(mockPluginFactory(), document, mockWindow)
    const button = document.getElementById('DatoCMS-button--primary')
    button.click()

    await flushPromises()
    expect(mockItemsUpdate.mock.calls.length).toBe(0)
  })

  it('when the .all call fails, it shows an alert', async () => {
    const mockWindow = mockWindowFactory()

    mockItemsAll.mockImplementation(() => Promise.reject('FAIL'))

    bulkEdit(mockPluginFactory(), document, mockWindow);
    const button = document.getElementById('DatoCMS-button--primary');
    button.click();

    await flushPromises()
    expect(mockWindow.alert.mock.calls.length).toBe(1)
  })
})
