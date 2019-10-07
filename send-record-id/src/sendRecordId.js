import './style/style.sass'
import './style/button.sass'
import fetch from 'fetch-reject'
import base64 from 'base-64'

const callUrl = (url, headers, body) => {
  const button = document.getElementById('DatoCMS-button--primary')
  const statement = document.getElementById('statement')
  statement.classList.remove('error')
  statement.textContent = ''
  button.className += 'loading'
  button.disabled = true
  fetch(
    url, {method: 'POST', headers, body},
  )
    .then(() => {
      button.disabled = false
      button.classList.remove('loading')
      const message = `Request made to ${url} with body ${body} - success!`
      statement.textContent = message
    })
    .catch(e => {
      button.disabled = false
      button.classList.remove('loading')
      statement.className += 'error'
      e.response.json().then(response => {
        statement.textContent = `${e.status} - ${e.response.statusText}`
        statement.textContent += `- ${response.message}`
      })
    })
}

const sendRecordId = (plugin, document) => {
  plugin.startAutoResizer()

  const {url, label, hint, username, password} = plugin.parameters.instance

  const container = document.createElement('div')
  container.id = ('container')
  document.body.appendChild(container)

  const title = document.createElement('h6')
  title.textContent = 'Custom button'
  title.id = ('title')
  container.appendChild(title)

  if (hint) {
    const p = document.createElement('p')
    p.id = ('hint')
    p.textContent = hint
    container.appendChild(p)
  }

  const headers = new Headers()
  const button = document.createElement('button')
  const spinner = document.createElement('span')

  button.id = ('DatoCMS-button--primary')
  button.textContent = label
  button.appendChild(spinner)
  spinner.id = ('spinner')
  container.appendChild(button)

  if (username && password) {
    const encodedString = base64.encode(`${username}:${password}`)
    const value = `Basic ${encodedString}`
    headers.append('Authorization', value)
  }

  button.addEventListener('click', event => {
    if (!event.target.matches('#DatoCMS-button--primary')) return
    event.preventDefault()
    callUrl(
      url, headers, JSON.stringify(
        {id: plugin.itemId},
      ),
    )
  }, false)
  const statement = document.createElement('p')
  statement.id = ('statement')
  container.appendChild(statement)
}

export default sendRecordId
