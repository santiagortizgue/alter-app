import React, { Component } from 'react';
import './SongView.scss';

import stores from '../../stores/Stores';
import { observer } from 'mobx-react';

import Tooltip from 'react-tooltip-lite';

import P5Visualizer from '../../utils/P5Wrapper/P5Visualizer';
interface SongViewProps {
  match?: any
}

interface SongViewState {
  song?: any,
  colors?: any,
  color?: string | null,
  genres?: any,
  genreString?: string | null,
  songUrl?: string | null,
  imgUrl?: string | null,
  volume?: string
}

@observer class SongView extends Component<SongViewProps, SongViewState> {
  constructor(props: any) {
    super(props);

    this.state = {
      song: null,
      colors: null,
      color: "25,25,25",
      genres: null,
      genreString: "",
      songUrl: null,
      imgUrl: null,
      volume: "50"
    }
  }

  getId() {
    return parseInt(this.props.match.params.id);
  }

  componentDidMount() {
    stores.songStore.readSong(this.getId());
  }

  componentWillUnmount() {
    stores.songStore.cleanGenre();
    stores.songStore.cleanGenres();
    stores.songStore.cleanColors();
    stores.songStore.cleanSongFile();
    stores.songStore.cleanImgFile();
    stores.songStore.cleanSong();
  }

  render() {

    if (this.state.song === null) {
      if (stores.songStore.songActual) {
        this.setState({ song: stores.songStore.songActual });
      }
      return <div className="Loading"><p >Loading Song...</p></div>;
    }

    if (this.state.songUrl === null) {

      if (stores.songStore.songFile) {
        this.setState({ songUrl: stores.songStore.songFile });
      }

      return <div className="Loading"><p >Loading Source...</p></div>;
    }

    if (this.state.imgUrl === null) {

      if (stores.songStore.imgFile) {
        this.setState({ imgUrl: stores.songStore.imgFile });
      }

      return <div className="Loading"><p >Loading Source...</p></div>;
    }

    if (this.state.genres === null) {
      if (stores.songStore.genresActual) {
        this.setState({
          genres: stores.songStore.genresActual,
          genreString: stores.songStore.genreActual
        });
      }
      return <div className="Loading"><p >Loading genres...</p></div>;
    }

    if (this.state.colors === null) {

      if (stores.songStore.colorsActual) {
        this.setState({ colors: stores.songStore.colorsActual });
      }

      return <div className="Loading"><p >Loading colors...</p></div>;
    }

    return (
      <section className="SongView">

        <div className="SongView__Song">
          <div className="SongView__Song-action">

            <div className="SongView__Song-action__view">

              {(this.state.color) ? <P5Visualizer vol={this.state.volume} color={this.state.color} link={this.state.songUrl} /> : ""}

              <div className="SongView__Song-action__title">{this.state.song.name}</div>
            </div>

            <div className="SongView__Song-action__buttons">

              <Tooltip hoverDelay={0} content="Play/Pause">
                <div className="SongView__Song-action__btn" id="play">
                  <svg className="playPauseSvg" viewBox="0 0 50 50">
                    <polygon points="15.89 42.45 46.11 25 15.89 7.55 15.89 42.45" />
                    <rect x="3.89" y="7.22" width="9.78" height="35.56" />
                  </svg>
                </div>
              </Tooltip>
              <Tooltip hoverDelay={0} content="Stop">
                <div className="SongView__Song-action__btn" id="stop">
                  <svg className="stopSvg" viewBox="0 0 50 50">
                    <rect x="5" y="5" width="40" height="40" />
                  </svg>
                </div>
              </Tooltip>
            </div>

            <Tooltip hoverDelay={0} content="Volume">
              <input type="range" defaultValue={this.state.volume} min="0" max="100" className="SongView__Song-action__input" onChange={(e: any) => {
                e.preventDefault();
                this.setState({ volume: e.target.value });
              }} />
            </Tooltip>

          </div>

          <div className="SongView__Song-data">

            <h3>{this.state.song.autor}</h3>

            <p>{this.state.song.a_info}</p>

            <h4><strong>GENRES: </strong>{this.state.genreString}</h4>
            <h4><strong>YEAR: </strong>{this.state.song.year}</h4>
            <h4><strong>ALBUM: </strong>{this.state.song.album}</h4>

            <div className="SongView__Song-data__bottom">

              <img src={stores.songStore.imgFile} className="SongView__Song-data__img" />

              <div className="SongView__Song-data__buttons">

                <div className="SongView__Song-data__colors">
                  {this.state.colors.map((color: any) => {
                    return <div key={color.id} style={{ backgroundColor: `rgb(${color.color})` }}
                      className="SongView__Song-data__color"
                      onClick={(e) => {
                        e.preventDefault();
                        this.setState({ color: color.color });
                      }} >
                    </div>
                  })}
                </div>

                <div className="SongView__Song-data__add">
                  <svg className="addSvg" viewBox="0 0 50 50">
                    <polygon points="32 18 32 5 18 5 18 18 5 18 5 32 18 32 18 45 32 45 32 32 45 32 45 18 32 18" />
                  </svg>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>
    );
  }
}

export default SongView;
