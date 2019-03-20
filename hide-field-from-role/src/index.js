import { SiteClient } from 'datocms-client';

const toggleField = (roleName, plugin) => {
  const roles =  plugin.parameters.instance.roles;
  const hideFromRoles = roles.split(',').map(r => r.toLowerCase());

  if (!hideFromRoles.includes(roleName.toLowerCase())) {
    return;
  }
  let path;

  if (plugin.field.attributes.localized) {
    path = `${plugin.fieldPath}.${plugin.locale}`;
  } else {
    path = plugin.fieldPath;
  }
  plugin.toggleField(path, false);
}

window.DatoCmsPlugin.init((plugin) => {
  const dato = new SiteClient(plugin.parameters.global.apiToken);
  dato.roles.find(plugin.currentUser.relationships.role.data.id)
    .then(role => toggleField(role.name, plugin))
    .catch(e => console.log(e));
});
