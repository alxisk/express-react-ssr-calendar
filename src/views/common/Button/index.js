import React from 'react'
import classNames from 'classnames'

const GREEN = 'green'

const Button = ({ onClick, content, fluid, color }) => (
  <button
    className={classNames('btn', { 'btn--fluid': fluid, 'btn--green': color === GREEN })}
    onClick={onClick}
  >
    {content}
  </button>
)

export default Button
