import { SiteClient } from 'datocms-client';
import './style/style.sass';
import './style/button.sass';

const bulkEdit = (plugin, document, window) => {
  const dato = new SiteClient(plugin.parameters.global.apikey);
  plugin.startAutoResizer();
  const { field, locale, fieldPath } = plugin;

  if (plugin.itemType.attributes.singleton) {
    throw new Error('Bulk editor plugin: This model is singleton');
  }

  if (field.attributes.validators.unique) {
    throw new Error('Bulk editor plugin: This field has an unique value constraint');
  }

  const container = document.createElement('div');
  container.classList.add('container');
  const button = document.createElement('button');
  const spinner = document.createElement('span');

  button.id = ('DatoCMS-button--primary');
  button.textContent = `Apply to all ${field.attributes.localized ? `(${locale})` : ''}`;
  button.appendChild(spinner);
  spinner.id = ('spinner');
  container.appendChild(button);

  const query = {
    'filter[type]': plugin.itemType.id,
    version: 'current',
  };

  button.addEventListener('click', (event) => {
    event.preventDefault();

    /* eslint-disable */
    const confirm = window.confirm(`This action will overwrite all previous content for the "${field.attributes.label}" field belonging to all records of the ${plugin.itemType.attributes.name} model. Are you sure you want to proceed?`);
    /* eslint-enable */

    if (!confirm) {
      return;
    }
    button.disabled = true;
    button.classList.remove('done');
    button.classList.add('loading');

    dato.items.all(query, { allPages: true })
      .then((items) => {
        items.forEach((item) => {
          let updatedContent = {};

          if (field.attributes.localized) {
            updatedContent = {
              [field.attributes.api_key]: {
                ...item[field.attributes.api_key],
                [locale]: plugin.getFieldValue(fieldPath),
              },
            };
          } else {
            updatedContent = {
              [field.attributes.api_key]: plugin.getFieldValue(fieldPath),
            };
          }
          dato.items.update(item.id, updatedContent);
        });
      })
      .then(() => {
        button.disabled = false;
        button.classList.remove('loading');
        button.classList.add('done');
      })
      .catch((error) => {
        console.log('error', error);
        button.disabled = false;
        button.classList.remove('loading');
        button.classList.add('error');
        /* eslint-disable */
        window.alert(error);
        /* eslint-enable */
      });
  }, false);

  document.body.appendChild(container);
};

export default bulkEdit;
