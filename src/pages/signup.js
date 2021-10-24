import React, { useEffect } from 'react'
import { useMutation, gql, useApolloClient } from '@apollo/client'

import UserForm from '../components/UserForm'
import { updateLoginStatus } from '../auth/writeCache'
import { SIGNUP_USER } from '../gql/mutation'

const SignUp = (props) => {
  useEffect(() => {
    document.title = 'Sign Up - Notedly'
  })

  const client = useApolloClient()
  const [signUp, { data, loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: (data) => {
      // store the token
      localStorage.setItem('token', data.signUp)
      // update the local cache
      updateLoginStatus(client)
      // redirect the user to the homepage
      props.history.push('/')
    },
  })

  return (
    <React.Fragment>
      <UserForm action={signUp} formType="signUp"></UserForm>
      {loading && <p>Loading...</p>}
      {error && <p>Error creating an account!</p>}
    </React.Fragment>
  )
}

export default SignUp
