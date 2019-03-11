import { SiteClient } from 'datocms-client';

function toggleField(roleName, plugin) {
  const hideFromRoles = plugin.parameters.instance.roles.split(',')
    .map(r => r.toLowerCase());

  if (hideFromRoles.includes(roleName.toLowerCase())) {
    let path;

    if (plugin.field.attributes.localized) {
      path = `${plugin.fieldPath}.${plugin.locale}`;
    } else {
      path = plugin.fieldPath;
    }
    plugin.toggleField(path, false);
  }
}

window.DatoCmsPlugin.init((plugin) => {
  const dato = new SiteClient(plugin.parameters.global.apiToken);
  dato.roles.find(plugin.currentUser.relationships.role.data.id)
    .then(role => toggleField(role.name, plugin))
    .catch(e => console.log(e));
});
