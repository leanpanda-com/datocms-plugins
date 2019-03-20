import './style/style.sass';
import './style/button.sass';
import { SiteClient } from 'datocms-client';

function editImages(plugin, button) {
  const dato = new SiteClient(plugin.parameters.global.apiToken);
  const altValue = document.getElementById('alt').value;
  const titleValue = document.getElementById('title').value;

  const imageFieldsIds = Object.values(plugin.fields)
    .filter(f => ['file', 'gallery'].includes(f.attributes.field_type)
      && f.relationships.item_type.data.id === plugin.itemType.id)
    .map(field => field.attributes.api_key);

  dato.item.find(plugin.itemId, { version: 'current' })
    .then((item) => {
      const uploadIds = imageFieldsIds.map((imageFieldValue) => {
        if (typeof item[imageFieldValue] === 'object') {
          return item[imageFieldValue][plugin.locale];
        }

        return item[imageFieldValue];
      }).flat();

      uploadIds.forEach((id) => {
        dato.upload.find(id)
          .then((u) => {
            if (u.isImage) {
              dato.upload.update(id, {
                alt: altValue,
                title: titleValue,
              });
            }
          });
      });
    })
    .then(() => {
      /* eslint-disable */
      button.disabled = false;
      button.classList.remove('loading');
      button.classList.add('done');
      /* eslint-enable */
    })
    .catch((error) => {
      /* eslint-disable */
      button.disabled = false;
      button.classList.remove('loading');
      button.classList.add('error');
      alert(error);
      /* eslint-enable */
    });
}

window.DatoCmsPlugin.init((plugin) => {
  plugin.startAutoResizer();
  const { locale, site } = plugin;

  const container = document.createElement('div');
  container.classList.add('container');

  const hint = document.createElement('p');
  hint.innerHTML = `By clicking on Apply you will edit all alts and titles of images in this record. Refresh to see the updates${site.attributes.locales.length > 1 ? `. This action will only affect only the "${locale}" locale, localize this field to be able to edit also other locales` : '.'}`;
  hint.classList.add('hint');
  container.appendChild(hint);

  const altInput = document.createElement('input');
  altInput.classList.add('alt');
  altInput.id = 'alt';
  const altLabel = document.createElement('label');
  altLabel.htmlFor = 'alt';
  altLabel.innerHTML = 'Alt';
  container.appendChild(altLabel);
  container.appendChild(altInput);

  const titleInput = document.createElement('input');
  titleInput.classList.add('alt');
  titleInput.id = 'title';
  const titleLabel = document.createElement('label');
  titleLabel.htmlFor = 'title';
  titleLabel.innerHTML = 'Title';
  container.appendChild(titleLabel);
  container.appendChild(titleInput);

  const button = document.createElement('button');
  const spinner = document.createElement('span');

  button.id = ('DatoCMS-button--primary');
  button.textContent = `Apply (${site.attributes.locales.length > 1 ? `${locale})` : ''}`;
  button.appendChild(spinner);
  spinner.id = ('spinner');
  container.appendChild(button);

  button.addEventListener('click', (event) => {
    event.preventDefault();

    /* eslint-disable */
    const confirm = window.confirm(`This action will overwrite all titles and alts belonging to images of this record. Are you sure you want to proceed?`);
    /* eslint-enable */
    if (!confirm) {
      return;
    }

    button.disabled = true;
    button.classList.remove('done');
    button.classList.add('loading');
    editImages(plugin, button);
  }, false);

  document.body.appendChild(container);
});
