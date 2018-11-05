import React from 'react'
import PropTypes from 'prop-types'
import chunk from 'lodash/chunk'
import moment from 'moment'
import { Link } from 'react-router-dom'

const MonthTable = ({ days, date }) => {
  const offset = moment(date)
    .startOf('month')
    .isoWeekday()
  const daysWithOffset = Array.from({ length: offset - 1 }).concat(days)

  return (
    <table>
      <tbody>
        {chunk(daysWithOffset, 7).map((week, idx) => (
          <tr key={idx}>
            {week.map((day = {}, idx) => (
              <td key={idx}>
                {day.num ? (
                  <Link to={`/notes/${date.date(day.num).format('YYYY-MM-DD')}`}>
                    <button style={{ color: day.notes ? 'crimson' : 'black' }}>{day.num}</button>
                  </Link>
                ) : null}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
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
