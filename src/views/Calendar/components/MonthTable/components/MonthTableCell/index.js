import React from 'react'
import formatDate from 'src/utils/formatDate'
import { Link } from 'react-router-dom'

const MonthTableCell = ({ date, day }) => {
  if (day.notes) {
    return (
      <Link to={`/notes/${formatDate(date.date(day.num))}`}>
        <button className="month-table-cell month-table-cell--active">{day.num}</button>
      </Link>
    )
  }

  return <button className="month-table-cell">{day.num}</button>
}

export default MonthTableCell
