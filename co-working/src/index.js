import { SiteClient } from 'datocms-client';
import './style.sass';

function listen(field, notification, plugin) {
  let path;

  if (field.localized) {
    path = `${field.apiKey}.${plugin.locale}`;
  } else {
    path = field.apiKey;
  }

  plugin.addFieldChangeListener(path, (newValue) => {
    notification.textContent = `Somebody is working on the ${field.apiKey}(${plugin.locale}) field: ${newValue}!`;
    console.log(`Somebody is working on the ${field.apiKey}(${plugin.locale}) field: ${newValue}!`);
    // plugin.setFieldValue(path, 'coap')
  });
}

window.DatoCmsPlugin.init((plugin) => {
  plugin.startAutoResizer();
  console.log('00000000000000000000000000000000');
  const dato = new SiteClient(plugin.parameters.global.apiToken);

  const container = document.createElement('div');
  container.classList.add('container');
  document.body.appendChild(container);

  const title = document.createElement('h4');
  title.classList.add('title');
  title.textContent = 'plugin';
  container.appendChild(title);

  const notification = document.createElement('div');
  notification.classList.add('notification');
  container.appendChild(notification);

  dato.fields.all(plugin.itemType.id)
    .then((fields) => {
      fields
        .filter(f => f.apiKey !== plugin.fieldPath)
        .forEach((field) => {
          listen(field, notification, plugin);
        });
    })
    .catch((error) => {
      console.log(error);
    });


  container.classList.add('container');
  document.body.appendChild(container);
});
