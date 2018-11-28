import React, { Component } from 'react'
import { inject } from 'mobx-react'
import truncate from 'lodash/truncate'
import moment from 'moment'
import NoteForm from 'src/views/common/NoteForm'
import Button from 'src/views/common/Button'

@inject('notesStore')
class NewNote extends Component {
  handleSubmit = data =>
    this.props.notesStore.addNewNote(data).then(() => this.props.history.push('/'))

  render() {
    return (
      <section className="new-note">
        <h3>New note</h3>
        <NoteForm onSubmit={this.handleSubmit} />
      </section>
    )
  }
}

export default NewNote
