import React, { Component } from 'react';
import './SongView.scss';

import song from '../../utils/Sketch/song'

import P5Wrapper from '../../utils/P5Wrapper/P5Wrapper';

class SongView extends Component {
  render() {
    return (
      <div className="SongView">

        <div className="SongView__Song">
          <div className="SongView__Song-action">

            <div className="SongView__Song-action__view">
            
              <P5Wrapper sketch = {song} color = { 0 } />

              <div className="SongView__Song-action__title">The Song Name</div>
            </div>
            
            <div className="SongView__Song-action__buttons">
              <div className="SongView__Song-action__btn" id="play"></div>
              <div className="SongView__Song-action__btn" id="stop"></div>
            </div>

          </div>

          <div className="SongView__Song-data">

          <h3>Band Name</h3>

          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam deleniti perspiciatis rerum ipsam nihil ducimus aliquam expedita veniam facilis...</p>

          <h4><strong>GENRE: </strong> GENRE, GENRE, GENRE</h4>
          <h4><strong>DATE: </strong> 2000</h4>
          <h4><strong>DURATION: </strong> 3:00</h4>

          <div className="SongView__Song-data__bottom">

            <div className="SongView__Song-data__img">
            </div>
          
            <div className="SongView__Song-data__buttons">
            
            <div className="SongView__Song-data__colors"></div>
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
