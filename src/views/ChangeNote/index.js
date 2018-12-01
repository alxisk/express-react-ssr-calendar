import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer, PropTypes as mobxPropTypes } from 'mobx-react'
import formatDate from 'src/utils/formatDate'
import { Link } from 'react-router-dom'
import NoteForm from 'src/views/common/NoteForm'
import Button from 'src/views/common/Button'

@inject('notesStore')
@observer
class ChangeNote extends Component {
  componentDidMount() {
    const {
      match: {
        params: { noteId },
      },
      notesStore: { getSingleNote },
    } = this.props

    getSingleNote(noteId)
  }

  get noteId() {
    const {
      match: {
        params: { noteId },
      },
    } = this.props

    return noteId
  }

  get noteLink() {
    return `/notes/${this.noteId}`
  }

  get note() {
    const {
      notesStore: { notes },
    } = this.props

    return notes.find(({ id }) => id === this.noteId)
  }

  handleSubmit = data => {
    const {
      notesStore: { updateNote },
      history,
    } = this.props

    updateNote(this.noteId, data).then(() => history.push(this.noteLink))
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
              <Button content="cancel" />
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

ChangeNote.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      noteId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

ChangeNote.wrappedComponent.propTypes = {
  notesStore: mobxPropTypes.observableObject.isRequired,
}

export default ChangeNote
