import React, { Component } from 'react'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import NotesListItem from './components/NotesListItem'

@inject('notesStore')
@observer
class NotesList extends Component {
  componentDidMount() {
    const date = new Date(this.props.match.params.date).toISOString()
    this.props.notesStore.getNotes({ from: date, to: date })
  }

  render() {
    const { notes } = this.props.notesStore

    return (
      <div>
        <h2>Notes</h2>
        {notes.length ? (
          <ul>
            {notes.map(note => (
              <li key={note.id}>
                <Link to={`/notes/${note.id}`}>
                  <NotesListItem {...toJS(note)} />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>no notes were found.</p>
        )}
        <Link to="/">
          <button type="button">return</button>
        </Link>
      </div>
    )
  }
}

export default NotesList
