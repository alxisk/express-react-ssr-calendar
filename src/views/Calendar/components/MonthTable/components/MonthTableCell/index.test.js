import { expect } from 'chai'
import { makeSetup } from 'src/utils/testHelpers'
import moment from 'moment'
import MonthTableCell from './index'

const setup = makeSetup(MonthTableCell, {
  date: moment('1999-12-31'),
  day: { num: 7 },
})

describe('MonthTableCell', () => {
  it('should render button by default', () => {
    const { wrapper } = setup()
    expect(wrapper.name()).to.eql('button')
  })

  describe('when day.notes is truthy', () => {
    const { wrapper } = setup({ day: { num: 6, notes: [] } })

    it('should render Link', () => {
      expect(wrapper.name()).to.eql('Link')
    })
  })
})
