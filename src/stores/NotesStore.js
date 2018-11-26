import { observable, action } from 'mobx'
import { createNote, fetchNotes, fetchSingleNote, deleteNote } from '../api'

class NotesStore {
  @observable
  notes = []

  @action
  setNotes = notes => this.notes.replace(notes)

  @action
  addNote = newNote => {
    if (!this.notes.find(note => note.id === newNote.id)) {
      this.notes.push(newNote)
    }
  }

  @action
  getNotes = options => fetchNotes(options).then(notes => this.setNotes(notes))

  @action
  getSingleNote = id => fetchSingleNote(id).then(note => this.addNote(note))

  @action
  addNewNote = note => createNote(note).then(newNote => this.notes.push(newNote))

  @action
  deleteNote = id =>
    deleteNote(id).then(() => this.setNotes(this.notes.filter(note => note.id !== id)))
}

export default NotesStore
