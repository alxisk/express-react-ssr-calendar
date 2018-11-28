import { observable, action } from 'mobx'
import { createNote, fetchNotes, fetchSingleNote, updateNote, deleteNote } from '../api'

class NotesStore {
  @observable
  notes = []

  @action
  setNotes = notes => this.notes.replace(notes)

  @action
  getNotes = options => fetchNotes(options).then(notes => this.setNotes(notes))

  @action
  getSingleNote = id => fetchSingleNote(id).then(note => this.setNotes([note]))

  @action
  addNewNote = note => createNote(note).then(newNote => this.notes.push(newNote))

  @action
  updateNote = (id, data) => updateNote(id, data)

  @action
  deleteNote = id =>
    deleteNote(id).then(() => this.setNotes(this.notes.filter(note => note.id !== id)))
}

export default NotesStore
