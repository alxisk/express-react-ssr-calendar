import Calendar from './views/Calendar'
import Day from './views/Day'

const routes = [
  {
    path: '/',
    component: Calendar,
  },
  {
    path: '/:date',
    component: Day,
  },
]

routes.forEach(route => (route.exact = true))

export default routes
