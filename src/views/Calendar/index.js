import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer, PropTypes as mobxPropTypes } from 'mobx-react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Button from 'src/views/common/Button'
import MonthChanger from './components/MonthChanger'
import MonthTable from './components/MonthTable'

@inject('notesStore')
@observer
class Calendar extends Component {
  componentDidMount() {
    this.fetchNotes()
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props

    if (location.pathname !== prevProps.location.pathname) {
      this.fetchNotes()
    }
  }

  get date() {
    const {
      match: {
        params: { date },
      },
    } = this.props

    return date ? moment(date) : moment()
  }

  get days() {
    const {
      notesStore: { notes },
    } = this.props
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

  fetchNotes = () => {
    const {
      notesStore: { getNotes },
    } = this.props
    const from = this.date.startOf('month').format()
    const to = this.date.endOf('month').format()

    getNotes({ from, to })
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

Calendar.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      date: PropTypes.string,
    }).isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
}

Calendar.wrappedComponent.propTypes = {
  notesStore: mobxPropTypes.observableObject.isRequired,
}

export default Calendar
