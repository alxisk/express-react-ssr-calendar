import { expect } from 'chai'
import moment from 'moment'
import { makeSetup } from 'src/utils/testHelpers'
import MonthTable from './index'

const days = Array.from({ length: 30 }, (_, idx) => ({ num: idx + 1 }))
days[1].notes = [{}, {}]

const setup = makeSetup(MonthTable, {
  days,
  date: moment('1999-12-30'),
})

describe('MonthTable', () => {
  const { wrapper } = setup()

  it('should render month-table', () => {
    expect(wrapper.find('.month-table').exists()).to.be.true
  })

  it('should render 5 rows', () => {
    expect(wrapper.find('.month-table__row')).to.have.lengthOf(5)
  })

  it('should render 30 "days"', () => {
    expect(wrapper.find('MonthTableCell')).to.have.lengthOf(30)
  })
})
