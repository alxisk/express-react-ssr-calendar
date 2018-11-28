import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'
import formatDate from 'src/utils/formatDate'
import { Link } from 'react-router-dom'
import Button from 'src/views/common/Button'

@inject('notesStore')
@observer
class Note extends Component {
  componentDidMount() {
    this.props.notesStore.getSingleNote(this.noteId)
  }

  deleteNote = () => {
    const formattedDate = formatDate(this.note.date)

    this.props.notesStore
      .deleteNote(this.noteId)
      .then(() => this.props.history.push(`/notes/${formattedDate}`))
  }

  get noteId() {
    return this.props.match.params.noteId
  }

  get note() {
    return this.props.notesStore.notes.find(({ id }) => id === this.noteId)
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

export default Note
