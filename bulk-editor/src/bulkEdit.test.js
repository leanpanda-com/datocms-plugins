import bulkEdit from './bulkEdit';
const mockUpdate = jest.fn(() => null);

jest.mock('datocms-client', () => ({
  __esModule: true,
  SiteClient: class MockFakeDato {
    constructor() {
      this.items = {
        all: jest.fn(res => ({
          then: () => ({
            id: "12",
          }),
        })),
        update: mockUpdate
      };
    }
  },
}));

it('updates fields', () => {
  const plugin = {
    parameters: {
      global: {
        api_key: "ciao"
      }
    },
    startAutoResizer: jest.fn(() => null),
    getFieldValue: jest.fn(() => 'value'),
    itemType: {
      attributes: {
        singleton: false
      }
    },
    field: {
      attributes: {
        api_key: 'title',
        validators: {
          unique: false
        }
      }
    },
  };


  const fakeWindow = {
    confirm: jest.fn(() => true),
    alert: jest.fn(() => true)
  };

  bulkEdit(plugin, document, fakeWindow);
  const button = document.getElementById('DatoCMS-button--primary');
  button.click();

  expect(mockUpdate.mock.calls.length).toBe(1);
});
