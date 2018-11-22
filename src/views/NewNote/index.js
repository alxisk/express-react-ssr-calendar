import React, { Component, createRef } from 'react'
import { observable, action, toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import truncate from 'lodash/truncate'
import moment from 'moment'
import { Link } from 'react-router-dom'
import TextInput from 'src/views/common/TextInput'
import Button from 'src/views/common/Button'

const DATE_FORMAT = 'YYYY-MM-DD'
const validateDate = date => (moment(date).isValid() ? null : 'invalid date')
const validateText = text => (text.length > 3 ? null : 'text must contain 3 or more characters')

@inject('notesStore')
@observer
class NewNoteForm extends Component {
  @observable
  title = ''

  @observable
  date = this.getInitialDate()

  @observable
  text = ''

  @action
  handleTitleChange = val => (this.title = val)

  @action
  handleDateChange = (val, e) => {
    const date = moment(val)

    if (date.isValid()) {
      e.target.value = date.format(DATE_FORMAT)
    }

    this.setDate(val)
  }

  @action
  handleTextChange = val => (this.text = val)

  handleSubmit = e => {
    e.preventDefault()

    const note = {
      title: this.title || truncate(this.text, { length: 20, separator: ' ' }),
      date: moment(this.date).format(),
      text: this.text,
    }

    this.props.notesStore.addNewNote(note).then(() => this.props.history.push('/'))
  }

  @action
  setDate = (val = null) =>
    (this.date = moment(val)
      .startOf('day')
      .format())

  getInitialDate = () => moment().format(DATE_FORMAT)

  render() {
    return (
      <section className="new-note">
        <h3>New note</h3>
        <form onSubmit={this.handleSubmit}>
          <TextInput label="Title" onBlur={this.handleTitleChange} />
          <TextInput
            label="Date"
            onBlur={this.handleDateChange}
            defaultValue={this.getInitialDate()}
            validate={validateDate}
          />
          <TextInput
            area
            label="Text"
            onBlur={this.handleTextChange}
            placeholder="Type something..."
            validate={validateText}
          />
          <Button color="green" type="submit" content="submit" />
          <Link to="/">
            <Button type="button" content="cancel" />
          </Link>
        </form>
      </section>
    )
  }
}

export default NewNoteForm
