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
import CreateGame from '../CreateGame/CreateGame';
import Game from '../Game/Game';

import stores from '../../stores/Stores';

interface AppProps {
  history?: any
}

interface AppState {
  userState?: boolean
}


class App extends Component<AppProps, AppState> {
  constructor(props: any){
    super(props);

    this.state = {
      userState: false,
    }

    this.setUserState = this.setUserState.bind(this);

    //console.log();
  }

  componentDidMount(){
    stores.authStore.userStateListener(this.setUserState);
  }

  componentWillUnmount(){

  }

  setUserState(state: boolean): void{
    this.setState({userState: state});
  }

  render() {

    return (
      <div className="App">

        <BrowserRouter basename="/alter-app-build">

          <Dash />

          { this.state.userState ? 

          <Switch>

            <Route path="/" component={Home} exact />
            <Route path="/auth" component={Auth} exact />
            <Route path="/guilds" component={Guilds} exact />
            <Route path="/newmatch" component={CreateGame} exact />
            <Route path="/catalog" component={Catalog} exact />
            <Route path="/song/:id" component={SongView} exact />
            <Route path="/game/:id" component={Game} exact />
            <Route path="/profile" component={Profile} exact />
            <Route path="/about" component={About} exact />
            <Route component={ErrorPage} />

          </Switch>

          : <Auth /> }

        </BrowserRouter>
      </div>
    );
  }
}

export default App;
