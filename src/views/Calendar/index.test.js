import { expect } from 'chai'
import { spy } from 'sinon'
import { makeSetup } from 'src/utils/testHelpers'
import Calendar from './index'

const setup = makeSetup(Calendar.wrappedComponent, () => ({
  match: {
    params: {
      date: '1999-12',
    },
  },
  location: {
    pathname: '/',
  },
  notesStore: {
    notes: [],
    getNotes: spy(),
  },
}))

describe('Calendar', () => {
  const { wrapper } = setup()

  it('should render MonthChanger', () =>
    expect(wrapper.find('withRouter(MonthChanger)').exists()).to.be.true)

  it('should render MonthTable', () => {
    const MonthTable = wrapper.find('MonthTable')
    const expectedDays = Array.from({ length: 31 }, (_, idx) => ({ num: idx + 1 }))

    expect(MonthTable.exists()).to.be.true
    expect(MonthTable.prop('days')).to.eql(expectedDays)
  })

  it('should render Link to NewNote form', () => {
    expect(
      wrapper.findWhere(elem => elem.name() === 'Link' && elem.prop('to') === '/new-note').exists()
    ).to.be.true
  })

  describe('methods', () => {
    describe('componentDidMount', () => {
      const {
        props: {
          notesStore: { getNotes },
        },
      } = setup()
      const { from, to } = getNotes.lastCall.lastArg

      it('should call notesStore.getNotes with specific arguments', () => {
        expect(from).to.include('1999-12-01')
        expect(to).to.include('1999-12-31')
      })
    })

    describe('componentDidUpdate', () => {
      const { props } = setup()
      const {
        notesStore: { getNotes },
      } = props
      wrapper.setProps(props)

      it('should not call notesStore.getNotes', () => {
        expect(getNotes.calledOnce).to.be.true // in componentDidMount
      })

      describe('when location.pathname has changed', () => {
        const { wrapper, props } = setup()
        const {
          notesStore: { getNotes },
        } = props
        wrapper.setProps({ ...props, location: { pathname: '/test' } })

        it('should call notesStore.getNotes', () => {
          expect(getNotes.calledTwice).to.be.true
        })
      })
    })
  })
})
