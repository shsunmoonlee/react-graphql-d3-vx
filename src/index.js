import React from 'react'
import ReactDOM, { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { ApolloProvider } from 'react-apollo';
// import { ApolloClient } from 'apollo-client';
// import { HttpLink } from 'apollo-link-http';
// import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-boost';

import store, { history } from './store'
import App from './containers/app'

import 'sanitize.css/sanitize.css'
import './index.css'

export const client = new ApolloClient({
  uri: 'https://fakerql.com/graphql',
});
// const gql_URL = 'http://localhost:4000';
//
// const httpLink = new HttpLink({
//   uri: gql_URL,
// });
// const cache = new InMemoryCache();
// const client = new ApolloClient({
//   link: httpLink,
//   cache,
// });

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
)
