import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import './App.css';

import Home from './components/Home';
import ShoppingCart from './components/ShoppingCart';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/cart" component={ ShoppingCart } />
        </Switch>
      </Router>
    );
  }
}

export default App;
