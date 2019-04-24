import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts'

class SimpleLineChart extends Component {
  render() {
    const {data, settings} = this.props

    if (!data) return null

    return (
      <LineChart data={data} {...settings}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        {this.renderItems()}
        <Tooltip />
        <Legend />
      </LineChart>
    )
  }

  renderItems() {
    const {data, palette} = this.props

    const keys = Object.keys(data[0])

    if (!keys) return null

    return keys
      .slice(1)
      .map((k, i) => (
        <Line
          key={k}
          type="monotone"
          dataKey={k}
          stroke={palette[i % palette.length]}
        />
      ))
  }
}

/* eslint-disable react/forbid-prop-types */
SimpleLineChart.propTypes = {
  data: PropTypes.array.isRequired,
  palette: PropTypes.array.isRequired,
  settings: PropTypes.object.isRequired
}
/* eslint-enable react/forbid-prop-types */

export default SimpleLineChart
