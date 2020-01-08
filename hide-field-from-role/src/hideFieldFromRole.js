import {SiteClient} from 'datocms-client'

const toggleField = (role, plugin) => {
  const {roles} = plugin.parameters.instance
  const defaultRoles = plugin.parameters.global.defaultRoles || ''

  const hideFromRoles = roles.split(',').map(r => r.toLowerCase().trim())
    + defaultRoles.split(',').map(r => r.toLowerCase().trim())

  if (
    !hideFromRoles.includes(role.name.toLowerCase())
    && !hideFromRoles.includes(role.id)
  ) {
    return
  }

  let path

  if (plugin.field.attributes.localized) {
    path = `${plugin.fieldPath}.${plugin.locale}`
  } else {
    path = plugin.fieldPath
  }
  plugin.toggleField(path, false)
}

const hideFieldFromRole = async plugin => {
  plugin.startAutoResizer()
  if (
    plugin.currentUser.type === 'account'
    || !plugin.parameters.instance.roles
  ) {
    return
  }

  if (!plugin.parameters.global.apiToken) {
    console.log(
      'Please set a valid read-only API token in the plugins settings'
    )
    return
  }

  const dato = new SiteClient(plugin.parameters.global.apiToken)
  const role = await dato.roles.find(
    plugin.currentUser.relationships.role.data.id
  )

  if (role) {
    toggleField(role, plugin)
  } else {
    console.log('Could not find the role')
  }
}

export default hideFieldFromRole
