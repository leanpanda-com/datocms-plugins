import fetch from 'fetch-reject'
import sendRecordId from './sendRecordId'
import flushPromises from './test/support/flushPromises'

jest.mock('fetch-reject')

global.Headers = () => {}

const mockPluginFactory = () => ({
  parameters: {
    instance: {
      url: 'http://test.com',
      label: 'ciao',
      hint: 'click here'
    }
  },
  itemId: '123',
  startAutoResizer: jest.fn(() => null),
  getFieldValue: jest.fn(() => 'value'),
})

describe('sendRecordId', () => {
  afterEach(() => {
    document.getElementsByTagName('html')[0].innerHTML = ''
  })

  it('starts the auto resizer', () => {
    const plugin = mockPluginFactory()
    sendRecordId(plugin, document, window)
    expect(plugin.startAutoResizer).toHaveBeenCalledTimes(1)
  })

  describe('when request succeeds', () => {
    it('calls fetch with itemID when button is clicked', async () => {
      sendRecordId(mockPluginFactory(), document, window)
      const button = document.getElementById('DatoCMS-button--primary')
      const statement = document.getElementById('statement')
      button.click()
      expect(button.classList.contains('loading')).toBe(true)
      await flushPromises()
      const call = fetch.mock.calls[0]
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(call[0]).toBe('http://test.com')
      expect(call[1].body).toBe(JSON.stringify({id: '123'}))
      expect(button.classList.contains('loading')).toBe(false)
      expect(fetch(call[0], call[1].body)).resolves.toEqual({status: 200})
      const msg = 'Request made to http://test.com with body {"id":"123"} - success!'
      expect(statement.textContent).toBe(msg)
    })
  })

  describe('when request fails', () => {
    it('resets button if failed call', async () => {
      sendRecordId(mockPluginFactory(), document, window)
      const button = document.getElementById('DatoCMS-button--primary')
      button.click()
      expect(button.classList.contains('loading')).toBe(true)
      await flushPromises()
      const statement = document.getElementById('statement')
      console.log(statement.textContent)
      expect(fetch('invalid.url')).rejects.toEqual({status: 500})
      // expect(statement.textContent).toBe('500');
      expect(button.classList.contains('loading')).toBe(false)
    })
  })
})
