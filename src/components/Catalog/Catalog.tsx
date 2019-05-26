import React, { Component } from 'react';
import './Catalog.scss';

import { observer } from 'mobx-react';
import stores from '../../stores/Stores';
import Filter from '../Filter/Filter';
import SongCard from '../SongCard/SongCard';

interface CatalogProps {
}

interface CatalogState {
  songs?: any
}

@observer class Catalog extends Component<CatalogProps, CatalogState> {

  constructor(props: any) {
    super(props);

    this.state = {
      songs: null
    }

  }

  componentDidMount() {
    stores.dbStore.readMusic();
  }

  componentWillUnmount() {
    stores.dbStore.cleanMusicArray();
  }

  render() {

    if (this.state.songs === null) {
      if (stores.dbStore.musicArray) {
        this.setState({
          songs: stores.dbStore.musicArray
        });
      }
      return <div className="Catalog"><div className="Loading"><p>Loading Music...</p></div></div>;
    }
    
    return (
      <section className="Catalog">

        <div className="Catalog__music scroll">
          {stores.dbStore.musicArray.map((song: any) => {
            return (
              <SongCard key={song.id} song={song}/>
            )
          })
          }
        </div>

        <Filter />


      </section>
    );
  }
}

export default Catalog;
