import React from 'react'
import PropTypes from 'prop-types'
import chunk from 'lodash/chunk'
import moment from 'moment'

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
              <td key={idx}>{day.num ? <button>{day.num}</button> : null}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

MonthTable.propTypes = {
  days: PropTypes.arrayOf(PropTypes.any),
}

export default MonthTable
