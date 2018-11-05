import { Note } from './model'

const handleError = err => {
  console.log(`\nDB error:\n\n${err}`) // eslint-disable-line no-console
}

const addNote = (req, res) => {
  const note = new Note(req.body.data)

  note
    .save()
    .then(() => {
      res.status(200).json({ data: note.toObject() })
    })
    .catch(handleError)
}

const getNotes = (req, res) => {
  const from = new Date(req.query.from)
  const to = new Date(req.query.to)

  Note.find()
    .then(notes =>
      res.status(200).json({
        data: notes
          .filter(({ date }) => {
            const noteDate = new Date(date)
            return noteDate >= from && noteDate <= to
          })
          .map(note => note.toObject()),
      })
    )
    .catch(handleError)
}

const updateNote = (req, res) => {
  const { noteId } = req.params

  Note.findByIdAndUpdate(noteId, req.body.data, { new: true })
    .then(note => res.status(200).json({ data: note.toObject() }))
    .catch(handleError)
}

const deleteNote = (req, res) => {
  const { noteId } = req.params

  Note.findByIdAndRemove(noteId, req.body.data)
    .then(() => res.sendStatus(204))
    .catch(handleError)
}

const noteRoutes = app => {
  app.post('/api/notes', addNote)
  app.get('/api/notes', getNotes)
  app.patch('/api/notes/:noteId', updateNote)
  app.delete('/api/notes/:noteId', deleteNote)
}

export default noteRoutes
