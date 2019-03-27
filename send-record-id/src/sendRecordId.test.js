import sendRecordId from './sendRecordId';
import flushPromises from './test/support/flushPromises';
import fetch from 'fetch-reject';

global.Headers = () => {};

const mockPluginFactory = (options = {}) => {
  const defaults = {
    fieldPath: 'foo',
    localized: false,
    singleton: false,
    unique: false
  };


  return {
    parameters: {
      instance: {
        url: "http://test.com",
        label: "ciao",
        hint: "click here"
      }
    },
    startAutoResizer: jest.fn(() => null),
    getFieldValue: jest.fn(() => 'value'),
  };
};

describe('sendRecordId', () => {
  afterEach(() => {
    document.getElementsByTagName('html')[0].innerHTML = ''
  });

  it('starts the auto resizer', () => {
    const plugin = mockPluginFactory();

    sendRecordId(plugin, document, window);

    expect(plugin.startAutoResizer).toHaveBeenCalledTimes(1);
  })

  it('calls fetch when button is clicked', async () => {
    sendRecordId(mockPluginFactory(), document, window);
    const button = document.getElementById('DatoCMS-button--primary');
    button.click();
    await flushPromises();
    expect(fetch).toHaveBeenCalledTimes(1);
  })
})
