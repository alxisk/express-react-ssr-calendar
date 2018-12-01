import React from 'react'
import PropTypes from 'prop-types'
import truncate from 'lodash/truncate'
import { Link } from 'react-router-dom'

const NotesListItem = ({ id, title, text }) => {
  const truncatedText = truncate(text, { length: 50, separator: ' ' })

  return (
    <Link to={`/notes/${id}`} className="notes-list-item">
      <h4 className="notes-list-item__heading">{title}</h4>
      <p className="notes-list-item__text">{truncatedText}</p>
    </Link>
  )
}

NotesListItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default NotesListItem
