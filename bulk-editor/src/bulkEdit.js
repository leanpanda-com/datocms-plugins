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
    throw new Error(
      'Bulk editor plugin: '
        + 'This field has an unique value constraint'
    );
  }

  if (field.attributes.localized && !locale) {
    throw new Error('Bulk editor plugin: Set the locale for localized fields');
  }

  const container = document.createElement('div');
  container.classList.add('container');
  const button = document.createElement('button');
  const spinner = document.createElement('span');

  button.id = ('DatoCMS-button--primary');
  const qualifier = field.attributes.localized ? `(${locale})` : ''
  button.textContent = `Apply to all ${qualifier}`;
  button.appendChild(spinner);
  spinner.id = ('spinner');
  container.appendChild(button);

  const query = {
    'filter[type]': plugin.itemType.id,
    version: 'current',
  };

  button.addEventListener('click', event => {
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
      .then(items => {
        items.forEach(item => {
          let updatedContent = {};

          const key = field.attributes.api_key
          if (field.attributes.localized) {
            updatedContent = {
              [key]: {
                ...item[field.attributes.api_key],
                [locale]: plugin.getFieldValue(fieldPath),
              },
            };
          } else {
            updatedContent = {[key]: plugin.getFieldValue(fieldPath)}
          }
          dato.items.update(item.id, updatedContent);
        });
      })
      .then(() => {
        button.disabled = false;
        button.classList.remove('loading');
        button.classList.add('done');
      })
      .catch(error => {
        button.disabled = false;
        button.classList.remove('loading');
        button.classList.add('error');
        window.alert(error);
      });
  }, false);

  document.body.appendChild(container);
};

export default bulkEdit;
