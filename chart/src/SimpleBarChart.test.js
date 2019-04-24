import React from 'react'
import renderer from 'react-test-renderer'
import {BarChart} from 'recharts'

import SimpleBarChart from './SimpleBarChart'

jest.mock('recharts')

describe('render', () => {
  it('creates a BarChart', () => {
    const data = [{name: 'foo', value: 1}]
    const settings = {width: 3, height: 3}
    const palette = ['#0088FE']

    const component = renderer.create(
      <SimpleBarChart data={data} palette={palette} settings={settings}/>
    )
    expect(BarChart.mock.calls.length).toBe(1)
  })
})
