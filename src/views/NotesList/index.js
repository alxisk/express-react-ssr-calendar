import React, { Component } from 'react'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import NotesListItem from './components/NotesListItem'
import Button from 'src/views/common/Button'

@inject('notesStore')
@observer
class NotesList extends Component {
  componentDidMount() {
    const date = moment(this.props.match.params.date)
    const from = date.format()
    const to = date.endOf('day').format()

    this.props.notesStore.getNotes({ from, to })
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
                <NotesListItem {...toJS(note)} />
              </li>
            ))}
          </ul>
        ) : (
          <p>no notes were found.</p>
        )}
        <Link to="/">
          <Button type="button" content="return" />
        </Link>
      </div>
    )
  }
}

export default NotesList
