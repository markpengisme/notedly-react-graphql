import React, { useEffect } from 'react'
import { useMutation, gql, useApolloClient } from '@apollo/client'

import UserForm from '../components/UserForm'
import { updateLoginStatus } from '../auth/writeCache'
import { SIGNIN_USER } from '../gql/mutation'

const SignIn = (props) => {
  useEffect(() => {
    document.title = 'Sign In - Notedly'
  })

  const client = useApolloClient()
  const [signIn, { data, loading, error }] = useMutation(SIGNIN_USER, {
    onCompleted: (data) => {
      // store the token
      localStorage.setItem('token', data.signIn)
      // update the local cache
      updateLoginStatus(client)
      // redirect the user to the homepage
      props.history.push('/')
    },
  })

  return (
    <React.Fragment>
      <UserForm action={signIn} formType="signIn"></UserForm>
      {loading && <p>Loading...</p>}
      {error && <p>Error Signing in!</p>}
    </React.Fragment>
  )
}

export default SignIn
