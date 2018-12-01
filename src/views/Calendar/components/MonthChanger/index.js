import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import Button from 'src/views/common/Button'

class MonthChanger extends Component {
  changeMonth = increment => {
    const { history, date } = this.props
    const methodName = increment ? 'add' : 'subtract'

    history.replace(`/${date[methodName](1, 'months').format('YYYY-MM')}`)
  }

  incrementMonth = () => this.changeMonth(true)

  decrementMonth = () => this.changeMonth()

  render() {
    const { date } = this.props

    return (
      <div className="month-changer">
        <Button onClick={this.decrementMonth} content="prev" />
        <h2>{date.format('MMMM YYYY')}</h2>
        <Button onClick={this.incrementMonth} content="next" />
      </div>
    )
  }
}

MonthChanger.propTypes = {
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
  date: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default withRouter(MonthChanger)
