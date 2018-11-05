import mongoose from 'mongoose'
import uuid from 'uuid/v4'

export const connectDb = () => {
  mongoose.connect(
    'mongodb://localhost/express-calendar',
    {
      keepAlive: true,
      keepAliveInitialDelay: 300000,
    }
  )

  const db = mongoose.connection

  db.on('error', () => console.error('DB ERROR')) // eslint-disable-line no-console

  db.once('open', () => console.log('CONNECTED TO DB')) // eslint-disable-line no-console
}

const noteSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid,
  },
  title: String,
  text: String,
  date: String,
})

noteSchema.set('toObject', {
  transform: (doc, ret) => {
    const newRet = JSON.parse(JSON.stringify(ret))
    newRet.id = ret._id
    delete newRet._id
    delete newRet.__v

    return newRet
  },
})

const Note = mongoose.model('Note', noteSchema)

// example
const defaultNotes = [
  {
    title: 'foo',
    date: '2018-11-14T00:00:00.000Z',
    text: 'Pack my box with five dozen liquor jugs.',
    id: '1654caa0-a78f-478c-a30f-b7fe846a9372',
  },
  {
    title: 'bar',
    date: '2018-11-12T00:00:00.000Z',
    text: 'Jaded zombies acted quaintly but kept driving their oxen forward.',
    id: '87658555-a82f-43d0-81a1-54ded7b42181',
  },
]

Note.find().then(notes => {
  if (!notes.length) {
    Note.create(defaultNotes)
  }
})

export { Note }
