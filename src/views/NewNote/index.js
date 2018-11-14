import React, { Component } from 'react'
import { observable, action, toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import TextInput from 'src/views/common/TextInput'
import Button from 'src/views/common/Button'

@inject('notesStore')
@observer
class NewNoteForm extends Component {
  @observable
  title = ''

  @observable
  date = new Date().toJSON()

  @observable
  text = ''

  @action
  handleTitleChange = val => (this.title = val)

  @action
  handleDateChange = val => (this.date = new Date(val).toJSON())

  @action
  handleTextChange = val => (this.text = val)

  handleSubmit = e => {
    e.preventDefault()

    const note = {
      title: this.title,
      date: this.date,
      text: this.text,
    }

    this.props.notesStore.addNewNote(note).then(() => this.props.history.push('/'))
  }

  getReadableDate = () => this.date.split('T')[0]

  render() {
    return (
      <section className="new-note">
        <h3>New note</h3>
        <form onSubmit={this.handleSubmit}>
          <TextInput label="Title" onChange={this.handleTitleChange} value={this.title} />
          <TextInput label="Date" onChange={this.handleDateChange} value={this.getReadableDate()} />
          <TextInput
            area
            label="Text"
            onChange={this.handleTextChange}
            value={this.text}
            placeholder="Type something..."
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
