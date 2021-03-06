import React, { useState } from 'react'
import styled from 'styled-components'

import Button from './Button'

const Wrapper = styled.div`
  border: 1px solid #f5f4f0;
  max-width: 500px;
  padding: 1em;
  margin: 0 auto;
`

const Form = styled.form`
  label,
  input {
    display: block;
    line-height: 2em;
  }

  input {
    width: 100%;
    margin-bottom: 1em;
  }
`

const UserForm = (props) => {
  // set the default state of the form
  const [values, setValues] = useState()

  // update the state when a user types in the form
  const onChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    })
  }

  return (
    <Wrapper>
      {/* Display the appropriate form header */}
      {props.formType === 'signUp' ? <h2>Sign Up</h2> : <h2>Sign In</h2>}
      {/* perform the mutation when a user submits the form */}
      <Form
        onSubmit={(event) => {
          event.preventDefault()
          props.action({
            variables: {
              ...values,
            },
          })
        }}
      >
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="username"
          onChange={onChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          onChange={onChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          onChange={onChange}
        />
        <Button type="submit">Submit</Button>
      </Form>
    </Wrapper>
  )
}

export default UserForm
