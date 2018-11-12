import React from 'react'
import { Link } from 'react-router-dom'

const MonthTableCell = ({ date, day }) => {
  if (day.notes) {
    return (
      <Link to={`/notes/${date.date(day.num).format('YYYY-MM-DD')}`}>
        <button className="month-table-cell month-table-cell--active">{day.num}</button>
      </Link>
    )
  }

  return <button className="month-table-cell">{day.num}</button>
}

export default MonthTableCell
