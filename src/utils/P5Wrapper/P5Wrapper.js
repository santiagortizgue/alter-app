import React, { Component } from 'react';
import p5 from 'p5';
import "p5/lib/addons/p5.sound";

export default class P5Wrapper extends Component {

  componentDidMount() {
    this.canvas = new p5(this.props.sketch, this.wrapper);
    if (this.canvas.myCustomRedrawAccordingToNewPropsHandler) {
      this.canvas.myCustomRedrawAccordingToNewPropsHandler(this.props);
    }
  }

  shouldComponentUpdate(newprops) {

    if (this.canvas.myCustomRedrawAccordingToNewPropsHandler) {
      this.canvas.myCustomRedrawAccordingToNewPropsHandler(newprops);
    }

    return true;
  }

  componentWillUnmount() {
    let canv = document.querySelectorAll('.p5Canvas');
    if (canv) {
      for (let index = 0; index < canv.length; index++) {
        const element = canv[index];
        element.remove();
      }
    }

    this.canvas.remove();
    this.canvas = null;
  }

  render() {
    return <div id="canvas" ref={wrapper => this.wrapper = wrapper}> <p id="linkSong" style={{ display: 'none' }}>{this.props.link}</p></div>;
  }
}