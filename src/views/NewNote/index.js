import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { inject, PropTypes as mobxPropTypes } from 'mobx-react'
import NoteForm from 'src/views/common/NoteForm'

@inject('notesStore')
class NewNote extends Component {
  handleSubmit = data => {
    const {
      notesStore: { addNewNote },
      history,
    } = this.props

    addNewNote(data).then(() => history.push('/'))
  }

  render() {
    return (
      <section className="new-note">
        <h3>New note</h3>
        <NoteForm onSubmit={this.handleSubmit} />
      </section>
    )
  }
}

NewNote.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

NewNote.wrappedComponent.propTypes = {
  notesStore: mobxPropTypes.observableObject.isRequired,
}

export default NewNote
