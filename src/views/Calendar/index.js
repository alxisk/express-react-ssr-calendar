import React, { Component } from 'react'
import { computed, observable, action, trace } from 'mobx'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import MonthTable from './components/MonthTable'

@inject('notesStore')
@observer
class Calendar extends Component {
  @observable
  monthOffset = 0

  @computed
  get date() {
    if (this.monthOffset < 0) {
      return moment().subtract(this.monthOffset * -1, 'months')
    } else if (this.monthOffset > 0) {
      return moment().add(this.monthOffset, 'month')
    }

    return moment()
  }

  @computed
  get daysInCurrentMonth() {
    return this.date.endOf('month').date()
  }

  @computed
  get days() {
    const { notes } = this.props.notesStore
    const currentMonth = this.date.month()
    const currentYear = this.date.year()

    return Array.from({ length: this.daysInCurrentMonth }, (v, i) => {
      const day = { num: i + 1 }

      const relatedNotes = notes.filter(note => {
        if (!note) {
          return false
        }

        const date = moment(note.date)

        return date.date() === i && date.month() === currentMonth && date.year() === currentYear
      })

      if (relatedNotes.length) {
        day.notes = relatedNotes
      }

      return day
    })
  }

  @action
  decrementOffset = () => {
    this.monthOffset -= 1
  }

  @action
  incrementOffset = () => (this.monthOffset += 1)

  @computed
  get notesLength() {
    return this.props.notesStore.notes.length
  }

  render() {
    return (
      <div>
        Calendar <Link to="/somewhere">link to somewhere</Link>
        <MonthTable days={this.days} date={this.date} />
        <br />
        <button onClick={this.decrementOffset}>previous month</button>
        <button onClick={this.incrementOffset}>next month</button>
        <br />
      </div>
    )
  }
}

export default Calendar
