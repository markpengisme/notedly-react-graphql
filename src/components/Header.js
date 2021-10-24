import React from 'react'
import styled from 'styled-components'
import { useQuery, gql } from '@apollo/client'
import { Link, withRouter } from 'react-router-dom'

import ButtonAsLink from './ButtonAsLink'
import { updateLoginStatus } from '../auth/writeCache'
import { IS_LOGGED_IN } from '../gql/query'
import logo from '../img/logo.svg'

const HeaderBar = styled.header`
  width: 100%;
  padding: 0.5em 1em;
  display: flex;
  height: 64px;
  position: fixed;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
  z-index: 1;
`

const LogoText = styled.h1`
  margin: 0;
  padding: 0;
  display: inline;
`

const UserState = styled.div`
  margin-left: auto;
`

const Header = (props) => {
  const { data, client } = useQuery(IS_LOGGED_IN)
  const logoutHandler = () => {
    // remove the token
    localStorage.removeItem('token')
    // clear the application's cache
    client.resetStore()
    // update local state
    updateLoginStatus(client)
    // redirect the user to the homepage
    props.history.push('/')
  }

  return (
    <HeaderBar>
      <img src={logo} alt="Notedly Logo" height="40" />
      <LogoText>Notedly</LogoText>
      {/* If logged in display a log out link,
          else display sign in options */}
      <UserState>
        {data.isLoggedIn ? (
          <ButtonAsLink onClick={logoutHandler}>Logout</ButtonAsLink>
        ) : (
          <p>
            <Link to={'/signin'}>Sign In</Link> or{' '}
            <Link to={'/signup'}>Sign Up</Link>
          </p>
        )}
      </UserState>
    </HeaderBar>
  )
}

export default withRouter(Header)
