import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Header from './components/Header';
import Cart from './pages/Cart';
import Details from './pages/Details';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <main className="App">
          <Switch>
            <Route
              exact
              path="/"
              render={ (props) => <Home { ...props } /> }
            />
            <Route
              exact
              path="/cart"
              render={ (props) => <Cart { ...props } /> }
            />
            <Route
              exact
              path="/details/:id/:title"
              render={ (props) => <Details { ...props } /> }
            />
          </Switch>
        </main>
        <footer>
          <p>
            Desenvolvido por: Trybe - Turma 10 - Trybo B - Grupo 11
          </p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
