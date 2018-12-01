import React from 'react'
import PropTypes from 'prop-types'
import formatDate from 'src/utils/formatDate'
import { Link } from 'react-router-dom'

const MonthTableCell = ({ date, day }) => {
  if (day.notes) {
    return (
      <Link to={`/notes/${formatDate(date.date(day.num))}`}>
        <button type="button" className="month-table-cell month-table-cell--active">
          {day.num}
        </button>
      </Link>
    )
  }

  return (
    <button type="button" className="month-table-cell">
      {day.num}
    </button>
  )
}

MonthTableCell.propTypes = {
  date: PropTypes.objectOf(PropTypes.any).isRequired,
  day: PropTypes.shape({
    num: PropTypes.number.isRequired,
  }).isRequired,
}

export default MonthTableCell
