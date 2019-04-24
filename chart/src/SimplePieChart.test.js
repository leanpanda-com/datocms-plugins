import React from 'react'
import renderer from 'react-test-renderer'
import {PieChart} from 'recharts'

import SimplePieChart from './SimplePieChart'

jest.mock('recharts')

describe('render', () => {
  it('creates a PieChart', () => {
    const data = [{name: 'foo', value: 1}]
    const settings = {width: 3, height: 3}
    const palette = ['#0088FE']

    const component = renderer.create(
      <SimplePieChart data={data} settings={settings} palette={palette} />
    )
    expect(PieChart.mock.calls.length).toBe(1)
  })
})
