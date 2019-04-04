import React, { Component } from 'react';
import './SongView.scss';

import visualizer from '../../utils/Sketch/songVisualizer'

import firebaseStore from '../../stores/FBStore';
import { observer } from 'mobx-react';

import P5Wrapper from '../../utils/P5Wrapper/P5Wrapper';

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
  imgUrl?: string | null
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
      imgUrl: null
    }
  }

  getId() {
    return this.props.match.params.id;
  }

  componentDidMount() {
    firebaseStore.readSong(this.getId());
  }

  componentWillUnmount() {
    firebaseStore.cleanGenre();
    firebaseStore.cleanGenres();
    firebaseStore.cleanColors();
    firebaseStore.cleanSongFile();
    firebaseStore.cleanImgFile();
    firebaseStore.cleanSong();
  }

  render() {

    if (this.state.song === null) {
      if (firebaseStore.songActual) {
        this.setState({ song: firebaseStore.songActual });
      }
      return <div className="Loading"><p >Loading Song...</p></div>;
    }

    if (this.state.songUrl === null) {

      if (firebaseStore.songFile) {
        this.setState({ songUrl: firebaseStore.songFile });
      }

      return <div className="Loading"><p >Loading Source...</p></div>;
    }

    if (this.state.imgUrl === null) {

      if (firebaseStore.imgFile) {
        this.setState({ imgUrl: firebaseStore.imgFile });
      }

      return <div className="Loading"><p >Loading Source...</p></div>;
    }

    if (this.state.genres === null) {
      if (firebaseStore.genresActual) {
        this.setState({
          genres: firebaseStore.genresActual,
          genreString: firebaseStore.genreActual
        });
      }
      return <div className="Loading"><p >Loading genres...</p></div>;
    }

    if (this.state.colors === null) {

      if (firebaseStore.colorsActual) {
        this.setState({ colors: firebaseStore.colorsActual });
      }

      return <div className="Loading"><p >Loading colors...</p></div>;
    }

    return (
      <div className="SongView">

        <div className="SongView__Song">
          <div className="SongView__Song-action">

            <div className="SongView__Song-action__view">

              {(this.state.color) ? <P5Wrapper sketch={visualizer} color={this.state.color} link={this.state.songUrl} /> : ""}

              <div className="SongView__Song-action__title">{this.state.song.name}</div>
            </div>

            <div className="SongView__Song-action__buttons">
              <div className="SongView__Song-action__btn" id="play">
                <svg className="playPauseSvg" viewBox="0 0 100 100">
                  <path d="M20.36,19.85v60.3H8V19.85H20.36m8-8H0v76.3H28.36V11.85Z" />
                  <path d="M41.91,25.7,84,50,41.91,74.3V25.7m-8-13.85v76.3L100,50,33.91,11.85Z" />
                </svg>
              </div>
              <div className="SongView__Song-action__btn" id="stop">
                <svg className="stopSvg" viewBox="0 0 100 100">
                  <path d="M79.81,19.85v60.3H20.19V19.85H79.81m8-8H12.19v76.3H87.81V11.85Z" />
                </svg>
              </div>
            </div>

          </div>

          <div className="SongView__Song-data">

            <h3>{this.state.song.autor}</h3>

            <p>{this.state.song.a_info}</p>

            <h4><strong>GENRES: </strong>{this.state.genreString}</h4>
            <h4><strong>YEAR: </strong>{this.state.song.year}</h4>
            <h4><strong>ALBUM: </strong>{this.state.song.album}</h4>

            <div className="SongView__Song-data__bottom">

              <img src={firebaseStore.imgFile} className="SongView__Song-data__img" />

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
                  <svg className="addSvg" viewBox="0 0 100 100">
                    <path d="M62.71,37.29V11.85H37.29V37.29H11.85V62.71H37.29V88.15H62.71V62.71H88.15V37.29ZM80.15,54.71H54.71V80.15H45.29V54.71H19.85V45.29H45.29V19.85h9.42V45.29H80.15Z"/>
                  </svg>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    );
  }
}

export default SongView;
