import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts'

class SimpleBarChart extends Component {
  /* eslint-disable react/forbid-prop-types */
  static propTypes = {
    data: PropTypes.array.isRequired,
    palette: PropTypes.array.isRequired,
    settings: PropTypes.object.isRequired
  }
  /* eslint-enable react/forbid-prop-types */

  render() {
    const {data, settings} = this.props

    if (!data) return null

    return (
      <BarChart data={data} {...settings}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        {this.renderItems()}
        <Legend />
      </BarChart>
    )
  }

  renderItems() {
    const {data, palette} = this.props

    const keys = Object.keys(data[0])

    if (!keys) return null

    const divs = keys
      .slice(1)
      .map((k, i) => (
        <Bar
          key={k}
          type="monotone"
          dataKey={k}
          fill={palette[i % palette.length]}
        />
      ))
    const tooltip = <Tooltip key="tooltip" />
    return [...divs, tooltip]
  }
}

export default SimpleBarChart
