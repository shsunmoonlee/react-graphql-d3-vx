import React from 'react'
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from '../home'
import About from '../about'

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about-us" component={About} />
      </Switch>
    )
  }
}

export default withRouter(connect(null, null)(App))
