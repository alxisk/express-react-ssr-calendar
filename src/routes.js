import Calendar from './views/Calendar'
import NotesList from './views/NotesList'
import NewNoteForm from './views/NewNote'

const routes = [
  {
    path: '/',
    component: Calendar,
  },
  {
    path: '/new-note',
    component: NewNoteForm,
  },
  {
    path: '/notes/:date',
    component: NotesList,
  },
  {
    path: '/:date',
    component: Calendar,
  },
]

routes.forEach(route => (route.exact = true))

export default routes
