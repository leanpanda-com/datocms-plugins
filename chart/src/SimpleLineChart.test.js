import React from 'react'
import renderer from 'react-test-renderer'
import {LineChart} from 'recharts'

import SimpleLineChart from './SimpleLineChart'

jest.mock('recharts')

describe('render', () => {
  it('creates a LineChart', () => {
    const data = [{name: 'foo', value: 1}]
    const settings = {width: 3, height: 3}
    const palette = ['#0088FE']

    const component = renderer.create(
      <SimpleLineChart data={data} palette={palette} settings={settings}/>
    )
    expect(LineChart.mock.calls.length).toBe(1)
  })
})
