const hideField = plugin => {
  plugin.startAutoResizer()
  plugin.toggleField(plugin.fieldPath, false)
}

export default hideField
