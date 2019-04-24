import React from 'react'
import PropTypes from 'prop-types'
import {PieChart, Pie, Legend, Tooltip, Cell} from 'recharts'

const RADIAN = Math.PI / 180

const RenderLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

RenderLabel.propTypes = {
  cx: PropTypes.oneOfType(
    [PropTypes.number, PropTypes.string]
  ).isRequired,
  cy: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  innerRadius: PropTypes.oneOfType(
    [PropTypes.number, PropTypes.string]
  ).isRequired,
  midAngle: PropTypes.number.isRequired,
  outerRadius: PropTypes.oneOfType(
    [PropTypes.number, PropTypes.string]
  ).isRequired,
  percent: PropTypes.number.isRequired
}

const SimplePieChart = props => {
  const {settings, palette, data} = props

  const dataKey = Object.keys(data[0]).find(k => k !== 'name')

  return (
    <PieChart {...settings} margin={{top: 0, bottom: 50}}>
      <Pie
        data={data}
        dataKey={dataKey}
        cx={settings.width / 2}
        cy={120}
        labelLine={false}
        label={RenderLabel}
        outerRadius={100}
        fill="#8884d8"
      >
        {data.map((entry, i) => (
          <Cell key={entry} fill={palette[i % palette.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  )
}

/* eslint-disable react/forbid-prop-types */
SimplePieChart.propTypes = {
  data: PropTypes.array.isRequired,
  palette: PropTypes.array.isRequired,
  settings: PropTypes.object.isRequired
}
/* eslint-enable react/forbid-prop-types */

export default SimplePieChart
