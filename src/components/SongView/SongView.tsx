import React, { Component } from 'react';
import './SongView.scss';

import visualizer from '../../utils/Sketch/songVisualizer'

import P5Wrapper from '../../utils/P5Wrapper/P5Wrapper';
import { firebaseStore } from '../../stores/FBStore';
import { observer } from 'mobx-react';

interface SongViewProps{
  match?: any
}

@observer class SongView extends Component<SongViewProps> {
  constructor(props: any){
    super(props);
  }

  getId() {
    return this.props.match.params.id;
  }

  componentWillUnmount(){
    firebaseStore.cleanGenre();
    firebaseStore.cleanColorSong();
    firebaseStore.cleanColors();
    firebaseStore.cleanSong();
    firebaseStore.cleanSongFile();
  }

  render() {

    if(firebaseStore.songActual === null){
      firebaseStore.readSong(this.getId());
      return <div className="Loading"><p >Loading Song...</p></div>;
    }

    if(firebaseStore.genreActual === "" || firebaseStore.colorsActual === null){
      return <div className="Loading"><p >Loading data...</p></div>;
    }

    /*
    if(firebaseStore.genreActual === ""){
      firebaseStore.readGenreActual();
    }

    if(firebaseStore.colorsActual === null){
      firebaseStore.readColors();
    }*/

    return (
      <div className="SongView">

        <div className="SongView__Song">
          <div className="SongView__Song-action">

            <div className="SongView__Song-action__view">

              {(firebaseStore.colorSong)? <P5Wrapper sketch = {visualizer} color = { firebaseStore.colorSong } /> : ""}
              
              <div className="SongView__Song-action__title">{firebaseStore.songActual.name}</div>
            </div>
            
            <div className="SongView__Song-action__buttons">
              <div className="SongView__Song-action__btn" id="play"></div>
              <div className="SongView__Song-action__btn" id="stop"></div>
            </div>

          </div>

          <div className="SongView__Song-data">

          <h3>{firebaseStore.songActual.autor}</h3>

          <p>{firebaseStore.songActual.a_info}</p>

          <h4><strong>GENRE: </strong>{firebaseStore.genreActual}</h4>
          <h4><strong>DATE: </strong>{firebaseStore.songActual.year}</h4>
          <h4><strong>ALBUM: </strong>{firebaseStore.songActual.album}</h4>

          <div className="SongView__Song-data__bottom">

            <div className="SongView__Song-data__img">
            </div>
          
            <div className="SongView__Song-data__buttons">
            
            <div className="SongView__Song-data__colors">
            {firebaseStore.colorsActual.map((color: any) => {
              return <div key={color.id} style={{backgroundColor: `rgb(${color.color})`}}
              className="SongView__Song-data__color"
              onClick = { (e) => {
                e.preventDefault();
                firebaseStore.setColorSong(color.color);
              }} >
              </div>
            })}
            </div>
            <div className="SongView__Song-data__add"></div>
            
            </div>

          </div>
          
          </div>
          
        </div>

      </div>
    );
  }
}

export default SongView;
