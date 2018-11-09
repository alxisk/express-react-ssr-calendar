import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'

@inject('notesStore')
@observer
class Note extends Component {
  componentDidMount() {
    this.props.notesStore.getSingleNote(this.noteId)
  }

  deleteNote = () =>
    this.props.notesStore.deleteNote(this.noteId).then(() => this.props.history.push('/'))

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

    const { title, text } = this.note

    return (
      <div>
        <h2>{title}</h2>
        <div>
          <button onClick={this.deleteNote}>delete</button>
          <button>change</button>
        </div>
        <p>{text}</p>
      </div>
    )
  }
}

export default Note
