export default function song (p) {

    let width = 100;
    let height = 100;
  
    p.setup = function () {
      p.createCanvas(width, height, p.WEBGL);
      p.noStroke();
    };
  
    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
      /*
      if (props.width){
        width = props.width;
      }
      if (props.height){
        height = props.height;
      }
      */
    };
  
    p.draw = function () {
      p.background(100);
    };
  };