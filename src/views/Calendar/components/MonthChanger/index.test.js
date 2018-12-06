import { expect } from 'chai'
import { spy } from 'sinon'
import moment from 'moment'
import { makeSetup } from 'src/utils/testHelpers'
import { MonthChangerWithoutRouter as MonthChanger } from './index'

const setup = makeSetup(MonthChanger, () => ({
  history: {
    replace: spy(),
  },
  date: moment('1999-12-31'),
}))

const getButton = (wrapper, content) =>
  wrapper.findWhere(elem => elem.prop('content') === content).first()
const getButtonPrev = wrapper => getButton(wrapper, 'prev')
const getButtonNext = wrapper => getButton(wrapper, 'next')

describe('MonthChanger', () => {
  it('should render container with two buttons', () => {
    const { wrapper } = setup()

    expect(wrapper.prop('className')).to.eql('month-changer')
    expect(wrapper.find('Button')).to.have.lengthOf(2)
  })

  describe('on "previous" button click', () => {
    const {
      wrapper,
      props: { history },
    } = setup()

    getButtonPrev(wrapper).simulate('click')

    it('should call history.replace with specific arguments', () => {
      expect(history.replace.calledWith('/1999-11')).to.be.true
    })
  })

  describe('on "next", button click', () => {
    const {
      wrapper,
      props: { history },
    } = setup()

    getButtonNext(wrapper).simulate('click')

    it('should call history.replace with specific arguments', () => {
      expect(history.replace.calledWith('/2000-01')).to.be.true
    })
  })
})
