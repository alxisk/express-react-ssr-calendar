import Calendar from './views/Calendar'
import NotesList from './views/NotesList'
import NewNoteForm from './views/NewNote'
import Note from './views/Note'

const calendarDateRe = `[0-9]{4}-[0-9]{2}`
const dateRe = `[0-9]{4}-[0-9]{2}-[0-9]{2}`
const uuidRe = '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}'

const routes = [
  {
    path: `/:date(${calendarDateRe})?`,
    component: Calendar,
  },
  {
    path: '/new-note',
    component: NewNoteForm,
  },
  {
    path: `/notes/:date(${dateRe})`,
    component: NotesList,
  },
  {
    path: `/notes/:noteId(${uuidRe})`,
    component: Note,
  },
]

routes.forEach(route => (route.exact = true))

export default routes
