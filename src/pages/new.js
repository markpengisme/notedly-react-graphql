import React, { useEffect } from 'react'
import { useMutation, gql } from '@apollo/client'

import NoteForm from '../components/NoteForm'
import { GET_MY_NOTES, GET_NOTES } from '../gql/query'
import { NEW_NOTE } from '../gql/mutation'

const NewNote = (props) => {
  useEffect(() => {
    document.title = 'New Note — Notedly'
  })

  const [createNote, { loading, error }] = useMutation(NEW_NOTE, {
    // refetch the GET_NOTES and GET_MY_NOTES queries to update the cache
    refetchQueries: [{ query: GET_NOTES }, { query: GET_MY_NOTES }],
    onCompleted: (data) => {
      // when complete, redirect the user to the note page
      props.history.push(`note/${data.newNote.id}`)
    },
  })

  return (
    <React.Fragment>
      {loading && <p>Loading...</p>}
      {error && <p>Error saving the note</p>}
      <NoteForm action={createNote} />
    </React.Fragment>
  )
}

export default NewNote
