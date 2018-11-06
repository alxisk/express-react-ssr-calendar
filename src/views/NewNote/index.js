import React, { Component } from 'react'
import { observable, action } from 'mobx'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'

@inject('notesStore')
@observer
class NewNoteForm extends Component {
  @observable
  title = ''

  @observable
  date = ''

  @observable
  text = ''

  @action
  handleTitleChange = e => (this.title = e.target.value)

  @action
  handleDateChange = e => (this.date = new Date(e.target.value).toJSON())

  @action
  handleTextChange = e => (this.text = e.target.value)

  handleSubmit = e => {
    e.preventDefault()

    const note = {
      title: this.title,
      date: this.date,
      text: this.text,
    }

    this.props.notesStore.addNewNote(note).then(() => this.props.history.push('/'))
  }

  render() {
    return (
      <section>
        <h3>New note</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="note-title">Title</label>
          <input type="text" id="note-title" onChange={this.handleTitleChange} />
          <label htmlFor="note-date">Date</label>
          <input type="date" id="note-date" onChange={this.handleDateChange} />
          <label htmlFor="note-text">Text</label>
          <textarea id="note-text" onChange={this.handleTextChange} />
          <button type="submit">submit</button>
          <Link to="/">
            <button type="button">cancel</button>
          </Link>
        </form>
      </section>
    )
  }
}

export default NewNoteForm
