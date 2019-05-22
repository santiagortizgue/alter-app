import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';

import Home from '../Home/Home'
import SongView from '../SongView/SongView'
import ErrorPage from '../ErrorPage/ErrorPage'
import Dash from '../Dash/Dash';
import Catalog from '../Catalog/Catalog';
import About from '../About/About';
import Guilds from '../Guilds/Guilds';
import Profile from '../Profile/Profile';
import Auth from '../Auth/Auth';

interface AppProps {
  history?: any
}

interface AppState {

}


class App extends Component<AppProps, AppState> {

  render() {

    return (
      <div className="App">

        <BrowserRouter>

          <Dash />

          <Switch>

            <Route path="/" component={Home} exact />
            <Route path="/auth" component={Auth} exact />
            <Route path="/catalog" component={Catalog} exact />
            <Route path="/about" component={About} exact />
            <Route path="/guilds" component={Guilds} exact />
            <Route path="/song/:id" component={SongView} exact />
            <Route path="/profile" component={Profile} exact />
            <Route component={ErrorPage} />

          </Switch>

        </BrowserRouter>
      </div>
    );
  }
}

export default App;
