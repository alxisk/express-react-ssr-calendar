import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import truncate from 'lodash/truncate'
import moment from 'moment'
import formatDate from 'src/utils/formatDate'
import { Link } from 'react-router-dom'
import NoteForm from 'src/views/common/NoteForm'
import Button from 'src/views/common/Button'

@inject('notesStore')
@observer
class ChangeNote extends Component {
  componentDidMount() {
    this.props.notesStore.getSingleNote(this.props.match.params.noteId)
  }

  handleSubmit = data =>
    this.props.notesStore
      .updateNote(this.noteId, data)
      .then(() => this.props.history.push(this.noteLink))

  get noteId() {
    return this.props.match.params.noteId
  }

  get noteLink() {
    return `/notes/${this.noteId}`
  }

  get note() {
    return this.props.notesStore.notes.find(({ id }) => id === this.noteId)
  }

  render() {
    if (!this.note) {
      return null
    }

    const { title, date, text } = this.note

    return (
      <section className="new-note">
        <h3>Change note</h3>
        <NoteForm
          onSubmit={this.handleSubmit}
          submitTrigger={() => <Button color="green" type="submit" content="apply" />}
          cancelTrigger={() => (
            <Link to={this.noteLink}>
              <Button type="button" content="cancel" />
            </Link>
          )}
          initialTitle={title}
          initialDate={formatDate(date)}
          initialText={text}
        />
      </section>
    )
  }
}

export default ChangeNote
