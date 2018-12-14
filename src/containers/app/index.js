import React from 'react'
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import About from '../about'

// <header style={{width: '400px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
//   <Link to="/">Home</Link>
//   <Link to="/about-us">About</Link>
// </header>
class App extends React.Component {
  render() {
    return (
      <div>
        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/about-us" component={About} />
        </main>
      </div>
    )
  }
}

export default App
