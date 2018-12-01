import React, { Component } from 'react'
import { toJS } from 'mobx'
import { inject, observer } from 'mobx-react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import Button from 'src/views/common/Button'
import NotesListItem from './components/NotesListItem'

@inject('notesStore')
@observer
class NotesList extends Component {
  componentDidMount() {
    const {
      match: {
        params: { date: rawDate },
      },
    } = this.props
    const date = moment(rawDate)
    const {
      notesStore: { getNotes },
    } = this.props
    const from = date.format()
    const to = date.endOf('day').format()

    getNotes({ from, to })
  }

  render() {
    const {
      notesStore: { notes },
    } = this.props

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
          <Button content="return" />
        </Link>
      </div>
    )
  }
}

export default NotesList
