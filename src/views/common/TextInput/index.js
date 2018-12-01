import React, { Component, Fragment } from 'react'
import { observer } from 'mobx-react'
import { observable, action } from 'mobx'
import uniqueId from 'lodash/uniqueId'
import omit from 'lodash/omit'
import ErrorMessage from '../ErrorMessage'

const HANDLER_NAMES = ['onChange', 'onBlur']

const convertName = name => `handle${name.slice(2)}`

@observer
class TextInput extends Component {
  @observable
  error = null

  constructor(props) {
    super(props)

    /* eslint-disable react/destructuring-assignment */
    HANDLER_NAMES.forEach(name => {
      this[convertName(name)] = e => {
        if (this.props[name]) {
          if (this.props.validate) {
            const error = this.props.validate(e.target.value)
            this.setError(error)
          }

          this.props[name](e.target.value, e)
        }
      }
    })
    /* eslint-enable react/destructuring-assignment */
  }

  @action
  setError = err => {
    this.error = err
  }

  render() {
    const { label, area } = this.props
    const id = uniqueId('text-input-')
    const className = area ? 'text-input text-input--area' : 'text-input'
    const elementProps = {
      id,
      className,
      ...omit(this.props, ['label', 'area', 'validate', ...HANDLER_NAMES]),
    }

    HANDLER_NAMES.forEach(name => {
      elementProps[name] = this[convertName(name)]
    })

    return (
      <Fragment>
        {label ? (
          <label htmlFor={id} className="text-input__label">
            {label}
          </label>
        ) : null}
        {area ? <textarea {...elementProps} /> : <input {...elementProps} />}
        {this.error ? <ErrorMessage message={this.error} /> : null}
      </Fragment>
    )
  }
}

export default TextInput
