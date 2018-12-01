import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, observer, PropTypes as mobxPropTypes } from 'mobx-react'
import formatDate from 'src/utils/formatDate'
import { Link } from 'react-router-dom'
import Button from 'src/views/common/Button'

@inject('notesStore')
@observer
class Note extends Component {
  componentDidMount() {
    const {
      notesStore: { getSingleNote },
    } = this.props

    getSingleNote(this.noteId)
  }

  get noteId() {
    const {
      match: {
        params: { noteId },
      },
    } = this.props

    return noteId
  }

  get note() {
    const {
      notesStore: { notes },
    } = this.props

    return notes.find(({ id }) => id === this.noteId)
  }

  deleteNote = () => {
    const {
      notesStore: { deleteNote },
      history,
    } = this.props
    const formattedDate = formatDate(this.note.date)

    deleteNote(this.noteId).then(() => history.push(`/notes/${formattedDate}`))
  }

  render() {
    if (!this.note) {
      return null
    }

    const { title, text, date } = this.note
    const formattedDate = formatDate(date)
    const paragraphs = text.split(/\r\n|\n/)

    return (
      <div className="note">
        <h2>{title}</h2>
        <p className="note__date">{formattedDate}</p>
        <div>
          <Link to={`/notes/${formattedDate}`}>
            <Button content="return" />
          </Link>
          <Link to={`${window.location.pathname}/change`}>
            <Button content="change" />
          </Link>
          <Button onClick={this.deleteNote} content="delete" />
        </div>
        <div className="note__text">
          {paragraphs.map((str, idx) => (
            <p key={idx}>{str}</p>
          ))}
        </div>
      </div>
    )
  }
}

Note.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      noteId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

Note.wrappedComponent.propTypes = {
  notesStore: mobxPropTypes.observableObject.isRequired,
}

export default Note
