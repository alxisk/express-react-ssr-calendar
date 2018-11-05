import React, { Component } from 'react'
import { computed, observable, action, trace } from 'mobx'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import MonthTable from './components/MonthTable'

@inject('notesStore')
@observer
class Calendar extends Component {
  componentDidMount() {
    this.fetchNotes()
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.fetchNotes()
    }
  }

  fetchNotes = () => {
    const from = this.date.startOf('month').format()
    const to = this.date.endOf('month').format()

    this.props.notesStore.getNotes({ from, to })
  }

  get date() {
    const { date } = this.props.match.params
    return date ? moment(date) : moment()
  }

  get days() {
    const { notes } = this.props.notesStore
    const currentMonth = this.date.month()
    const currentYear = this.date.year()
    const daysInCurrentMonth = this.date.endOf('month').date()

    return Array.from({ length: daysInCurrentMonth }, (v, i) => {
      const day = { num: i + 1 }

      const relatedNotes = notes.filter(note => {
        if (!note) {
          return false
        }

        const date = moment(note.date)

        return date.date() === i + 1 && date.month() === currentMonth && date.year() === currentYear
      })

      if (relatedNotes.length) {
        day.notes = relatedNotes
      }

      return day
    })
  }

  changeMonth = increment => {
    const methodName = increment ? 'add' : 'subtract'
    this.props.history.replace(`/${this.date[methodName](1, 'months').format('YYYY-MM')}`)
  }

  incrementMonth = () => this.changeMonth(true)

  decrementMonth = () => this.changeMonth()

  render() {
    return (
      <div>
        <h2>{this.date.format('YYYY MMMM')}</h2>
        <MonthTable days={this.days} date={this.date} />
        <br />
        <button onClick={this.decrementMonth}>previous month</button>
        <button onClick={this.incrementMonth}>next month</button>
        <br />
        <Link to="/new-note">
          <button type="button">add new note</button>
        </Link>
      </div>
    )
  }
}

export default Calendar
