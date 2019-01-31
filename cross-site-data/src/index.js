import { SiteClient } from 'datocms-client'
import './style.sass'

window.DatoCmsPlugin.init(async plugin => {
  plugin.startAutoResizer()

  const {
    datoCmsApiToken, fieldApiKey, itemTypeApiKey, title
  } = plugin.parameters.instance

  const dato = new SiteClient(datoCmsApiToken)

  const container = document.createElement('div')
  container.classList.add('container')
  document.body.appendChild(container)

  if (title) {
    const header = document.createElement('h4')
    header.classList.add('title')
    header.textContent = title
    container.appendChild(header)
  }

  const itemTypes = await dato.itemTypes.all()

  const itemType = itemTypes.find(it => it.apiKey === itemTypeApiKey)
  if (!itemType) {
    console.error(`local item type ${itemTypeApiKey} not found`)
    return
  }

  const fields = await dato.fields.all(itemType.id)

  const field = fields.find(field => field.apiKey === fieldApiKey)
  if (!field) {
    console.error(`field ${fieldApiKey} not found`)
    return
  }

  const query = {
    'filter[type]': itemType.id,
    version: 'current',
  }

  const items = await dato.items.all(query)

  const handleSelect = event => {
    const select = event.target
    const index = select.selectedIndex
    const option = select.options[index]
    plugin.setFieldValue(plugin.fieldPath, option.text)
  }

  const currentValue = plugin.getFieldValue(plugin.fieldPath)
  const select = document.createElement('select')
  items.forEach(item => {
    const option = document.createElement('option')
    const value = item[field.apiKey]
    if (value === currentValue) {
      option.selected = true
    }
    option.text = value
    option.value = item.id
    select.appendChild(option)
  })
  select.onchange = (event) => { handleSelect(event) }
  container.appendChild(select)
})
