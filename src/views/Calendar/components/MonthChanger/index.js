import React, { Component } from 'react'
import { withRouter } from 'react-router'
import Button from 'src/views/common/Button'

class MonthChanger extends Component {
  changeMonth = increment => {
    const methodName = increment ? 'add' : 'subtract'
    this.props.history.replace(`/${this.props.date[methodName](1, 'months').format('YYYY-MM')}`)
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

export default withRouter(MonthChanger)
