window.DatoCmsPlugin.init((plugin) => {
  plugin.startAutoResizer();

  let path;

  if (plugin.field.attributes.localized) {
    path = `${plugin.fieldPath}.${plugin.locale}`;
  } else {
    path = plugin.fieldPath;
  }

  if (plugin.currentUser) {
    plugin.toggleField(path, false);
  }
});
