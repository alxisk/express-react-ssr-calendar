import React, { Component } from 'react'
import { computed, observable, action, trace } from 'mobx'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import MonthChanger from './components/MonthChanger'
import MonthTable from './components/MonthTable'
import Button from 'src/views/common/Button'

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

  render() {
    return (
      <div className="calendar">
        <MonthChanger date={this.date} />
        <MonthTable days={this.days} date={this.date} />
        <Link to="/new-note">
          <Button fluid color="green" content="add new note" />
        </Link>
      </div>
    )
  }
}

export default Calendar
