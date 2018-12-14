import React from 'react'
import App from 'containers/app'
import { Provider } from 'react-redux'
// import { push, ConnectedRouter, connectRouter } from 'connected-react-router'
import { push, ConnectedRouter } from 'react-router-redux';

import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { shallow, mount } from 'enzyme';
import { createStore } from 'redux'
// import store from '../../store.js'
// import configureStore from '../../../configureStore';
import createHistory from 'history/createBrowserHistory';
import rootReducer from 'modules'
// import { GET_POSTS } from './index.js';

const initialState = {};
const history = createHistory({ basename: '/' });
const store = createStore(
  rootReducer,
  initialState
)
export const client = new ApolloClient({
  uri: 'https://fakerql.com/graphql',
});
const asyncFlush = () => new Promise(resolve => setTimeout(resolve, 1000));
describe('<Histogram/> in Home Page with real data from server', async () => {
  let screen;
  beforeEach(async () => {
    screen = mount(
      <ApolloProvider client={client}>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <App />
          </ConnectedRouter>
        </Provider>
      </ApolloProvider>
    )
    store.dispatch(push('/'));
    await asyncFlush();
  })
  it('shuld have postsByMonthSorted in component state', () => {
    expect(screen.state().postsByMonthSorted).not.toHaveLength(0);
    expect(screen.state().postsByMonthSorted).toHaveLength(12);
  })
  it('should render svg properly', () => {
    expect(screen.find('svg').to.have.lengthOf(4))
  })
  // it('it should be defined', () => {
  //   expect(Histogram).toBeDefined();
  // });

  // it('it should have the .vx-bar class', () => {
  //   expect(
  //     HistogramWrapper({
  //       className: 'test'
  //     }).prop('className')
  //   ).toBe('vx-bar test');
  // });
})
