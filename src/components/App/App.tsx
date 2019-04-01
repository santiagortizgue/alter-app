import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';

import Home from '../Home/Home'
import SongView from '../SongView/SongView'
import ErrorPage from '../ErrorPage/ErrorPage'

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>

          <Switch>

            <Route path="/" component={Home} exact />
            <Route path="/song/:id" component={SongView} exact />
            <Route component={ErrorPage} />

          </Switch>

        </BrowserRouter>
      </div>
    );
  }
}

export default App;
