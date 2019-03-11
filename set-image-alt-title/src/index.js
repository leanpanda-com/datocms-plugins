import './style/style.sass';
import './style/button.sass';
import { SiteClient } from 'datocms-client';

function editImages(plugin, button) {
  const dato = new SiteClient(plugin.parameters.global.apiToken);
  const altValue = document.getElementById('alt').value;
  const titleValue = document.getElementById('title').value;
  console.log(altValue, titleValue);

  const imageFields = Object.values(plugin.fields)
    .filter(f => ['file', 'gallery'].includes(f.attributes.field_type)
      && f.relationships.item_type.data.id === plugin.itemType.id)
    .map(field => field.attributes.api_key);

  dato.item.find(plugin.itemId)
    .then((item) => {
      const uploadIds = imageFields.map(imageField => item[imageField]);
      console.log(uploadIds);
      uploadIds.forEach((id) => {
        dato.upload.find(id)
          .then((u) => {
            if (u.isImage) {
              dato.upload.update(id, {
                alt: altValue,
                title: titleValue,
              }).then(res => console.log(res));
            }
          });
      });
    })
    .then(() => {
      button.disabled = false;
      button.classList.remove('loading');
      button.classList.add('done');
    })
    .catch((error) => {
      button.disabled = false;
      button.classList.remove('loading');
      button.classList.add('error');
      /* eslint-disable */
      alert(error);
      /* eslint-enable */
    });
}

window.DatoCmsPlugin.init((plugin) => {
  plugin.startAutoResizer();
  const { field, locale } = plugin;

  const container = document.createElement('div');
  container.classList.add('container');

  const altInput = document.createElement('input');
  altInput.classList.add('alt');
  altInput.id = 'alt';
  const altLabel = document.createElement('Label');
  altLabel.htmlFor = 'alt';
  altLabel.innerHTML = 'Alt';
  container.appendChild(altLabel);
  container.appendChild(altInput);

  const titleInput = document.createElement('input');
  titleInput.classList.add('alt');
  titleInput.id = 'title';
  const titleLabel = document.createElement('Label');
  titleLabel.htmlFor = 'title';
  titleLabel.innerHTML = 'Title';
  container.appendChild(titleLabel);
  container.appendChild(titleInput);

  const button = document.createElement('button');
  const spinner = document.createElement('span');

  button.id = ('DatoCMS-button--primary');
  button.textContent = `Apply to all ${field.attributes.localized ? `(${locale})` : ''}`;
  button.appendChild(spinner);
  spinner.id = ('spinner');
  container.appendChild(button);

  button.addEventListener('click', (event) => {
    if (!event.target.matches('#DatoCMS-button--primary')) return;
    event.preventDefault();

    /* eslint-disable */
    const confirm = window.confirm(`This action will overwrite all previous content for the '${field.attributes.label}' field belonging to all records of the ${plugin.itemType.attributes.name} model. Are you sure you want to proceed?`);
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
