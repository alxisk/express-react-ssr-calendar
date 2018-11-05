import fetch, { Headers } from 'node-fetch'
import qs from 'query-string'

const headers = new Headers({
  'Content-Type': 'application/json',
})

export const createNote = data =>
  fetch('/api/notes', {
    method: 'POST',
    body: JSON.stringify({ data }),
    headers,
  })
    .then(res => res.json())
    .then(json => json.data)

export const fetchNotes = ({ from, to }) => {
  const query = qs.stringify({ from, to })

  return fetch(`/api/notes?${query}`)
    .then(res => res.json())
    .then(json => json.data)
}