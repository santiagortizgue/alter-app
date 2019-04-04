import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';

import Home from '../Home/Home'
import SongView from '../SongView/SongView'
import ErrorPage from '../ErrorPage/ErrorPage'
import Dash from '../Dash/Dash';
import Catalog from '../Catalog/Catalog';
import About from '../About/About';
import Bands from '../Bands/Bands';

class App extends Component {
  render() {
    return (
      <div className="App">

      <BrowserRouter>

        <Dash/>

          <Switch>

            <Route path="/" component={Home} exact />
            <Route path="/db" component={Catalog} exact />
            <Route path="/about" component={About} exact />
            <Route path="/bands" component={Bands} exact />
            <Route path="/song/:id" component={SongView} exact />
            <Route component={ErrorPage} />

          </Switch>

        </BrowserRouter>
      </div>
    );
  }
}

export default App;
