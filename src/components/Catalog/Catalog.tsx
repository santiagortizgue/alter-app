import React, { Component } from 'react';
import './Catalog.scss';

import { observer } from 'mobx-react';
import dbStore from '../../stores/DBStore';
import Filter from '../Filter/Filter';
import SongCard from '../SongCard/SongCard';

interface CatalogProps {
}

interface CatalogState {
  songs?: any
}

@observer export class Catalog extends Component<CatalogProps, CatalogState> {

  constructor(props: any) {
    super(props);

    this.state = {
      songs: null
    }

  }

  componentDidMount() {
    dbStore.readMusic();
  }

  componentWillUnmount() {
    dbStore.cleanMusicArray();
  }

  render() {

    if (this.state.songs === null) {
      if (dbStore.musicArray) {
        this.setState({
          songs: dbStore.musicArray
        });
      }
      return <div className="Catalog"><div className="Loading"><p>Loading Music...</p></div></div>;
    }
    
    return (
      <div className="Catalog">

        <div className="Catalog__music">
          {dbStore.musicArray.map((song: any) => {
            return (
              <SongCard key={song.id} song={song}/>
            )
          })
          }
        </div>

        <Filter />


      </div>
    );
  }
}

export default Catalog;
