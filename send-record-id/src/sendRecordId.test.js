import fetch from 'fetch-reject'
import sendRecordId from './sendRecordId'
import flushPromises from './test/support/flushPromises'

global.fetch = require('jest-fetch-mock')

const mockPluginFactory = (withUsernameAndPassword = false) => ({
  parameters: {
    instance: {
      url: 'http://test.com',
      label: 'ciao',
      hint: 'click here',
      username: withUsernameAndPassword ? 'user' : null,
      password: withUsernameAndPassword ? 'pwd' : null
    }
  },
  itemId: '123',
  startAutoResizer: jest.fn(() => null),
  getFieldValue: jest.fn(() => 'value'),
})

beforeEach(() => {
    fetch.mock.calls = []
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
      console.log('here')
      console.log(call)
      expect(fetch.mock.calls.length).toEqual(1)
      expect(call[0]).toBe('http://test.com')
      expect(call[1].body).toBe(JSON.stringify({id: '123'}))
      expect(call[1].headers.has('Authorization')).toEqual(false)
      expect(button.classList.contains('loading')).toBe(false)
      expect(fetch(call[0], call[1].body)).resolves.toEqual({status: 200})
      /* eslint-disable */
      const msg = 'Request made to http://test.com with body {"id":"123"} - success!'
      /* eslint-enable */
      expect(statement.textContent).toBe(msg)
    })
    it('calls fetch with itemID and basic authentication when button is clicked and username and password provided', async () => {
      sendRecordId(mockPluginFactory(true), document, window)
      const button = document.getElementById('DatoCMS-button--primary')
      const statement = document.getElementById('statement')
      button.click()
      expect(button.classList.contains('loading')).toBe(true)
      await flushPromises()
      const call = fetch.mock.calls[0]
      expect(fetch.mock.calls.length).toEqual(1)
      expect(call[0]).toBe('http://test.com')
      expect(call[1].body).toBe(JSON.stringify({id: '123'}))
      expect(call[1].headers.has('Authorization')).toEqual(true)
      expect(call[1].headers.get('Authorization')).toEqual('Basic dXNlcjpwd2Q=')
      expect(button.classList.contains('loading')).toBe(false)
      expect(fetch(call[0], call[1].body)).resolves.toEqual({status: 200})
      /* eslint-disable */
      const msg = 'Request made to http://test.com with body {"id":"123"} - success!'
      /* eslint-enable */
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
      // const statement = document.getElementById('statement')
      expect(fetch('invalid.url')).rejects.toEqual({status: 500})
      // expect(statement.textContent).toBe('500');
      expect(button.classList.contains('loading')).toBe(false)
    })
  })
})
