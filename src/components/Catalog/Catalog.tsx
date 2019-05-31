import React, { Component } from 'react';
import './Catalog.scss';

import { observer } from 'mobx-react';
import stores from '../../stores/Stores';
import Filter from '../Filter/Filter';
import SongCard from '../SongCard/SongCard';

interface CatalogProps {
}

interface CatalogState {
}

@observer class Catalog extends Component<CatalogProps, CatalogState> {

  constructor(props: any) {
    super(props);

  }

  componentDidMount() {
    stores.musicStore.readMusic();
  }

  componentWillUnmount() {
    stores.musicStore.cleanMusicArray();
  }

  render() {

    if (stores.musicStore.musicArray.length == 0) {
      return <div className="Catalog"><div className="Loading"><p>Loading Music...</p></div></div>;
    }

    return (
      <section className="Catalog">

        <div className="Catalog__music scroll">
          {stores.musicStore.musicArray.map((song: any) => {
            return (<SongCard key={song.id} song={song} />)
          })}
        </div>

        <Filter />


      </section>
    );
  }
}

export default Catalog;
