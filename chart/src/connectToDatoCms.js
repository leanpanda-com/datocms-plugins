import React, {Component} from 'react'
import PropTypes from 'prop-types'

const DatoCmsPluginShape = PropTypes.shape({
  addChangeListener: PropTypes.func,
  addFieldChangeListener: PropTypes.func,
  _autoUpdateHeight: PropTypes.func,
  getFieldValue: PropTypes.func,
  _isAutoResizing: PropTypes.bool,
  _listeners: PropTypes.object,
  _mutationObserver: PropTypes.object,
  _oldHeight: PropTypes.number,
  _parent: PropTypes.object,
  setFieldValue: PropTypes.func,
  _settings: PropTypes.object,
  startAutoResizer: PropTypes.func,
  stopAutoResizer: PropTypes.func,
  toggleField: PropTypes.func,
  updateHeight: PropTypes.func
})

const connectToDatoCms = mapPluginToProps => BaseComponent => (
  class ConnectedComponent extends Component {
    static propTypes = {plugin: DatoCmsPluginShape.isRequired}

    constructor(props) {
      super(props)
      this.state = mapPluginToProps(props.plugin)
    }

    componentDidMount() {
      const {plugin} = this.props

      this.unsubscribe = plugin.addFieldChangeListener(plugin.fieldPath, () => {
        this.setState(mapPluginToProps(plugin))
      })
    }

    componentWillUnmount() {
      this.unsubscribe()
    }

    render() {
      return <BaseComponent {...this.props} {...this.state} />
    }
  }
)

export default connectToDatoCms
export {DatoCmsPluginShape}
