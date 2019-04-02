import React, { Component } from 'react';
import './Home.scss';
import Header from '../Header/Header';

import { Link } from 'react-router-dom';

import { observer } from 'mobx-react';
import { firebaseStore } from '../../stores/FBStore';

interface HomeState{
  songs?:any;
}

@observer export class Home extends React.Component<HomeState> {

  constructor(props: any) {
    super(props);

    this.state = {
      songs: []
    }

    //
    firebaseStore.readMusic();

    /*
    this.setState({
      songs: firebaseStore.musicArray
    });
    */
  }

  render() {
    return (
      <div className="Home">
        {firebaseStore.musicArray.map((song: any) => {
            return (
              <Link key={song.id} to={`/song/${song.id}`}>
              <p key={song.id}>{song.name}</p>
              </Link>
            );
          })
        }
      </div>
    );
  }
}

export default Home;
