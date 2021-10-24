import { IS_LOGGED_IN } from '../gql/query'

const updateLoginStatus = (client) => {
  client.writeQuery({
    query: IS_LOGGED_IN,
    data: { isLoggedIn: !!localStorage.getItem('token') },
  })
}

export { updateLoginStatus }
