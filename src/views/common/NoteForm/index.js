import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observable, action } from 'mobx'
import { inject, observer } from 'mobx-react'
import truncate from 'lodash/truncate'
import moment from 'moment'
import formatDate from 'src/utils/formatDate'
import { Link } from 'react-router-dom'
import TextInput from 'src/views/common/TextInput'
import Button from 'src/views/common/Button'

const validateDate = date => (moment(date).isValid() ? null : 'invalid date')
const validateText = text => (text.length > 3 ? null : 'text must contain 3 or more characters')

@inject('notesStore')
@observer
class NoteForm extends Component {
  @observable
  title = this.props.initialTitle

  @observable
  date = this.props.initialDate

  @observable
  text = this.props.initialText

  @action
  handleTitleChange = val => {
    this.title = val
  }

  @action
  handleDateChange = (val, e) => {
    const date = moment(val)

    if (date.isValid()) {
      e.target.value = formatDate(date)
    }

    this.setDate(val)
  }

  @action
  handleTextChange = val => {
    this.text = val
  }

  handleSubmit = e => {
    e.preventDefault()

    if (validateDate(this.date) || validateText(this.text)) {
      return
    }

    const data = {
      title: this.title || truncate(this.text, { length: 20, separator: ' ' }),
      date: moment(this.date).format(),
      text: this.text,
    }
    const { onSubmit } = this.props

    if (onSubmit) {
      onSubmit(data)
    }
  }

  @action
  setDate = (val = null) => {
    this.date = moment(val)
      .startOf('day')
      .format()
  }

  render() {
    const { submitTrigger, cancelTrigger } = this.props

    return (
      <form onSubmit={this.handleSubmit}>
        <TextInput label="Title" onBlur={this.handleTitleChange} defaultValue={this.title} />
        <TextInput
          label="Date"
          onBlur={this.handleDateChange}
          defaultValue={this.date}
          validate={validateDate}
        />
        <TextInput
          area
          label="Text"
          onBlur={this.handleTextChange}
          placeholder="Type something..."
          defaultValue={this.text}
          validate={validateText}
        />
        {submitTrigger ? submitTrigger() : <Button color="green" type="submit" content="submit" />}
        {cancelTrigger ? (
          cancelTrigger()
        ) : (
          <Link to="/">
            <Button content="cancel" />
          </Link>
        )}
      </form>
    )
  }
}

NoteForm.defaultProps = {
  initialTitle: '',
  initialDate: formatDate(Date.now()),
  initialText: '',
  submitTrigger: null,
  cancelTrigger: null,
}

NoteForm.propTypes = {
  initialTitle: PropTypes.string,
  initialDate: PropTypes.string,
  initialText: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  submitTrigger: PropTypes.func,
  cancelTrigger: PropTypes.func,
}

export default NoteForm
