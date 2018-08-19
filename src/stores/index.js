import { configure } from 'mobx'
import NotesStore from './NotesStore'

configure({
  enforceActions: true,
})
/* eslint-disable import/prefer-default-export */
export const notesStore = new NotesStore()
