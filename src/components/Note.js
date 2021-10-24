import React from 'react'
import ReactMarkdown from 'react-markdown'
import { useQuery } from '@apollo/client'
import { format, parseISO } from 'date-fns'
import styled from 'styled-components'

import NoteUser from './NoteUser'
import { IS_LOGGED_IN } from '../gql/query'

// Keep notes from extending wider than 800px
const StyledNote = styled.article`
  max-width: 800px;
  margin: 0 auto;
`

// Style the note metadata
const MetaData = styled.div`
  @media (min-width: 500px) {
    display: flex;
    align-items: flex-start;
  }
`

// add some space between the avatar and meta info
const MetaInfo = styled.div`
  padding-right: 1em;
`

// align 'UserActions' to the right on large screens
const UserActions = styled.div`
  margin-left: auto;
`

const Note = ({ note }) => {
  const { loading, error, data } = useQuery(IS_LOGGED_IN)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>

  return (
    <StyledNote key={note.id}>
      <MetaData>
        <MetaInfo>
          <img
            src={note.author.avatar}
            alt={`${note.author.username} avatar`}
            height="50px"
          />
        </MetaInfo>
        <MetaInfo>
          <em>by</em> {note.author.username} <br />
          {format(parseISO(note.createdAt), 'yyyy-MM-d HH:mm:ss')}
        </MetaInfo>
        {data.isLoggedIn ? (
          <UserActions>
            <NoteUser note={note} />
          </UserActions>
        ) : (
          <UserActions>
            <em>Favorites:</em> {note.favoriteCount}
          </UserActions>
        )}
      </MetaData>
      <ReactMarkdown children={note.content} />
    </StyledNote>
  )
}

export default Note
