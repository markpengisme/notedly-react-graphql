# Web

## Structure

```tree
src
├── App.js: Configuration
├── auth
│   └── writeCache.js: write apollo client's cache
├── components
│   ├── Button.js: Custom Button
│   ├── ButtonAsLink.js: Custom Link
│   ├── DeleteNote.js: Delete Note Link
│   ├── FavoriteNote.js: Favorite Note Link
│   ├── GlobalStyle.js: GlobalStyle
│   ├── Header.js: Header
│   ├── Layout.js: layout of the app
│   ├── Navigation.js: Navigation
│   ├── Note.js: Single note
│   ├── NoteFeed.js: Multi note
│   ├── NoteForm.js: Form for create or update note
│   ├── NoteUser.js: Note feature for logged-in users
│   └── UserForm.js: Form for user signin or signup
├── gql
│   ├── mutation.js: graphQL mutation
│   └── query.js: graphQL query
├── img
│   ├── favicon.ico
│   └── logo.svg
├── index.html: root div
└── pages
    ├── edit.js: Update note page
    ├── favorites.js: User favorites page
    ├── home.js: Home page
    ├── index.js: Router
    ├── mynotes.js: User note page
    ├── new.js: Create note page
    ├── note.js: Sigle note page
    ├── signin.js: Sigin page
    └── signup.js: Signup page
```

## Solutions to some problems

- [CSS-in-JS](https://mxstbr.blog/2016/11/inline-styles-vs-css-in-js/)
- [local-cache](https://www.apollographql.com/docs/react/caching/cache-interaction/) & [Storing local state in the cache](https://www.apollographql.com/docs/react/local-state/managing-state-with-field-policies/#storing-local-state-in-the-cache)

  ```react
  client.writeQuery({
    query: gql`
      {
        isLoggedIn @client
      }
    `,
    data: { isLoggedIn: localStorage.getItem('token') !== null },
  })
  
  const result = client.readQuery({
    query: gql`
  		{
  			isLoggedIn @client
  		}
  	`,
  })
  console.log(result)
  ```
  
- [useMutation](https://www.apollographql.com/docs/react/data/mutations/)

