import React, { Component, Fragment } from 'react'
import uniqueId from 'lodash/uniqueId'
import omit from 'lodash/omit'

class TextInput extends Component {
  handleChange = e => {
    if (this.props.onChange) {
      this.props.onChange(e.target.value, e)
    }
  }

  render() {
    const { label, area } = this.props
    const id = uniqueId('text-input-')
    const className = area ? 'text-input text-input--area' : 'text-input'
    const elementProps = {
      id,
      className,
      onChange: this.handleChange,
      ...omit(this.props, ['onChange', 'label', 'area']),
    }

    return (
      <Fragment>
        {label ? (
          <label htmlFor={id} className="text-input__label">
            {label}
          </label>
        ) : null}
        {area ? <textarea {...elementProps} /> : <input {...elementProps} />}
      </Fragment>
    )
  }
}

export default TextInput
