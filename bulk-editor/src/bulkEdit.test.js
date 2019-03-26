import bulkEdit from './bulkEdit';
import flushPromises from './test/support/flushPromises'

const mockUpdate = jest.fn(() => null);

const mockPluginFactory = (options = {}) => {
  const opts = Object.assign({singleton: false, unique: false}, options)

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
        validators: {
          unique: opts.unique
        }
      }
    }
  }
}

const mockWindowFactory = (options = {}) => {
  const opts = Object.assign({confirm: true}, options)

  return {
    confirm: () => opts.confirm,
    alert: () => true
  }
}

jest.mock('datocms-client', () => ({
  __esModule: true,
  SiteClient: class SiteClient {
    constructor() {
      this.items = {
        all: jest.fn(() => Promise.resolve([
          {id: "12"}
        ])),
        update: mockUpdate
      };
    }
  }
}))

describe('bulkEdit', () => {
  afterEach(() => {
    document.getElementsByTagName('html')[0].innerHTML = ''
  })

  it('updates fields', async () => {
    mockUpdate.mockReset()

    const plugin = mockPluginFactory()
    plugin.foo = 'updates'

    bulkEdit(plugin, document, mockWindowFactory());
    const button = document.getElementById('DatoCMS-button--primary');
    button.click();

    await flushPromises()
    expect(mockUpdate.mock.calls.length).toBe(1)
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

  it('skips without confirmation', async () => {
    mockUpdate.mockReset()
    const mockWindow = mockWindowFactory({confirm: false})

    bulkEdit(mockPluginFactory(), document, mockWindow)
    const button = document.getElementById('DatoCMS-button--primary')
    button.click()

    await flushPromises()
    expect(mockUpdate.mock.calls.length).toBe(0)
  })
})
