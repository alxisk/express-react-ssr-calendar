import { observable, action } from 'mobx'
import { createNote, fetchNotes } from '../api'

class NotesStore {
  @observable
  notes = []

  @action
  addNote = note => createNote(note).then(newNote => this.notes.push(newNote))

  @action
  setNotes = notes => this.notes.replace(notes)

  @action
  getNotes = options => fetchNotes(options).then(notes => this.setNotes(notes))
}

export default NotesStore
