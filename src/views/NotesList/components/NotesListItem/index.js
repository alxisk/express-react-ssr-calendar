import React from 'react'
import PropTypes from 'prop-types'

const NotesListItem = ({ title, text }) => (
  <section>
    <h4>{title}</h4>
    <p>{text}</p>
  </section>
)

NotesListItem.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default NotesListItem
