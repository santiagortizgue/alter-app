import React, { Component } from 'react';
import p5 from 'p5';

export default class P5Wrapper extends Component {

  componentDidMount() {
    this.canvas = new p5(this.props.sketch, this.wrapper);
    if( this.canvas.myCustomRedrawAccordingToNewPropsHandler ) {
      this.canvas.myCustomRedrawAccordingToNewPropsHandler(this.props);
    }
  }

  shouldComponentUpdate(newprops) {
    
    if( this.canvas.myCustomRedrawAccordingToNewPropsHandler ) {
      this.canvas.myCustomRedrawAccordingToNewPropsHandler(newprops);
    }

    return true;
  }

  componentWillUnmount() {
    this.canvas.remove();
  }

  render() {
    return <div id="canvas" ref={wrapper => this.wrapper = wrapper}> <p id="linkSong" style={{display: 'none'}}>{this.props.link}</p></div>;
  }
}