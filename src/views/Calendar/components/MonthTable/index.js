import React from 'react'
import PropTypes from 'prop-types'
import chunk from 'lodash/chunk'
import moment from 'moment'
import MonthTableCell from './components/MonthTableCell'

const MonthTable = ({ days, date }) => {
  const offset = moment(date)
    .startOf('month')
    .isoWeekday()
  const daysWithOffset = Array.from({ length: offset - 1 }).concat(days)

  return (
    <div className="month-table">
      {chunk(daysWithOffset, 7).map((week, idx) => (
        <div className="month-table__row" key={idx}>
          {week.map(
            (day = {}, idx) => (day.num ? <MonthTableCell key={idx} date={date} day={day} /> : null)
          )}
        </div>
      ))}
    </div>
  )
}

MonthTable.propTypes = {
  days: PropTypes.arrayOf(
    PropTypes.shape({
      num: PropTypes.number,
      notes: PropTypes.arrayOf(PropTypes.any),
    })
  ),
  data: PropTypes.objectOf(PropTypes.any),
}

export default MonthTable
