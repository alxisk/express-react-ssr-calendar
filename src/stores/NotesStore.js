import { observable, action } from 'mobx'

class NotesStore {
  @observable
  // tmp
  notes = [
    {
      id: 'abc',
      date: '2018-08-21T17:45:36.468Z',
      title: 'foo',
      description: 'Lorem ipsum dolor.',
    },
    {
      id: 'xyz',
      date: '2018-08-13T17:45:36.468Z',
      title: 'bar',
      description: 'Sit amet, consectetur.',
    },
  ]

  @action
  addNote = note => this.notes.push(note)
}

export default NotesStore
