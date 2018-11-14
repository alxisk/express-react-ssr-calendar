import React from 'react'
import classNames from 'classnames'

const GREEN = 'green'

const Button = ({ content, fluid, color, ...props }) => (
  <button
    className={classNames('btn', { 'btn--fluid': fluid, 'btn--green': color === GREEN })}
    {...props}
  >
    {content}
  </button>
)

export default Button
