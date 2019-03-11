import { SiteClient } from 'datocms-client';

function listen(field, container, plugin) {
  let path;

  if (field.localized) {
    path = `${field.apiKey}.${plugin.locale}`;
  } else {
    path = field.apiKey;
  }

  plugin.addFieldChangeListener(path, (newValue) => {
    container.textContent = `An editor is working on the ${field.apiKey}(${plugin.locale}) field: ${newValue}!`;
    console.log(`An editor is working on the ${field.apiKey}(${plugin.locale}) field: ${newValue}!`);
  });
}

window.DatoCmsPlugin.init((plugin) => {
  plugin.startAutoResizer();
  const dato = new SiteClient(plugin.parameters.global.apiToken);
  const container = document.createElement('div');

  dato.fields.all(plugin.itemType.id)
    .then((fields) => {
      fields
        .filter(f => f.apiKey !== plugin.fieldPath)
        .forEach((field) => {
          listen(field, container, plugin);
        });
    })
    .catch((error) => {
      console.log(error);
    });


  container.classList.add('container');

  document.body.appendChild(container);
});
