import './style.sass';

window.DatoCmsPlugin.init((plugin) => {
  plugin.startAutoResizer();


  localStorage.setItem('hidden', plugin.parameters.instance.startHidden);

  const container = document.createElement('div');
  container.classList.add('container');

  const button = document.createElement('button');
  button.id = ('DatoCMS-button');

  button.classList.add(`${plugin.parameters.instance.startHidden ? 'hidden' : 'showing'}`);

  button.textContent = 'hide';
  container.appendChild(button);
  document.body.appendChild(container);

  let path;
  if (plugin.field.attributes.localized) {
    path = `${plugin.fieldPath}.${plugin.locale}`;
  } else {
    path = plugin.fieldPath;
  }

  button.addEventListener('click', (event) => {
    if (!event.target.matches('#DatoCMS-button')) return;
    console.log(path, localStorage.getItem('hidden'));
    const status = localStorage.getItem('hidden');
    // plugin.toggleField(path, !status);

    localStorage.setItem('hidden', !status);

  });
});
