import React from 'react'
import { useMutation, useQuery } from '@apollo/client'

import NoteForm from '../components/NoteForm'
import { GET_NOTE, GET_ME } from '../gql/query'
import { EDIT_NOTE } from '../gql/mutation'

const EditNote = (props) => {
  // store the id found in the url as a variable
  const id = props.match.params.id

  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } })
  const {
    loading: userloading,
    error: usererror,
    data: userdata,
  } = useQuery(GET_ME)
  const [editNote] = useMutation(EDIT_NOTE, {
    variables: {
      id,
    },
    onCompleted: () => {
      props.history.push(`/note/${id}`)
    },
  })

  if (loading || userloading) return 'Loading...'
  if (error || usererror) return <p>Error! Note not found</p>
  // if the current user and the author of the note do not match
  if (userdata.me.id !== data.note.author.id) {
    return <p>You do not have access to edit this note</p>
  }
  // pass the content and mutation to the form component
  return <NoteForm content={data.note.content} action={editNote} />
}

export default EditNote
