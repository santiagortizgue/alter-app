import p5 from 'p5';
import "p5/lib/addons/p5.sound";

export default function visualizer(p) {

    let width = document.querySelector('#canvas').clientWidth;
    let height = document.querySelector('#canvas').clientHeight;

    let color = 0;

    let id = 0;

    let audioSpect = [];

    let spectrum;

    let fft;

    let s;

    p.preload = function () {
        p.soundFormats('mp3', 'ogg');
        s = p.loadSound('/songs/'+0+'.mp3');
        fft = new p5.FFT();
    }

    p.setup = function () {
        p.createCanvas(width, height, p.WEBGL);
        p.noStroke();

        spectrum = fft.waveform();

        audioSpect = new Array(8);
        for (var i = 0; i < audioSpect.length; i++) {
            audioSpect[i] = new Array(10);
        }

        for (let a = 0; a < audioSpect.length; a++) {
            for (let b = 0; b < audioSpect[a].length; b++) {
                audioSpect[a][b] = false;
            }
        }

        //s.loop();

        p.frameRate(60);
    };

    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
        if (props.color) {
            color = props.color;
        }
    };

    p.draw = function () {

        let marX = width / 42.3333;
        let marY = height / 45.3333;

        let tamX = width / 9.6269;
        let tamY = height / 12.5;

        p.background(250);

        /*
        p.fill(250, 0, 0);
        p.ellipse(0, 0, 10, 10);
        p.noFill();*/

        p.rectMode(p.CORNER);

        p.push();
        p.translate(-width / 2, -height / 2);

        for (let x = 0; x < audioSpect.length; x++) {
            let i = 0;
            for (let y = 0; y < audioSpect[0].length; y++) {
                if (audioSpect[x][y]) {
                    let op = 100 - (i * 5);
                    switch (color) {
                        default:
                            //
                            break;
                        case 0:
                            p.fill(250, 87, 75, op);
                            break;
                        case 1:
                            p.fill(134, 92, 229, op);
                            break;
                        case 2:
                            p.fill(69, 94, 229, op);
                            break;
                        case 3:
                            p.fill(25, 25, 25, op);
                            break;
                        case 4:
                            p.fill(242, 61, 91, op);
                            break;
                    }
                    p.rect(((x * (tamX + marX))), (height - (tamY)) - (y * (tamY + marY)), tamX,
                        tamY);
                    p.noFill();
                    p.fill(255);
                    p.noFill();
                    i++;

                    audioSpect[x][y] = false;
                }
            }
        }

        p.rectMode(p.CENTER);
        p.pop();
        p.calculate();
    };

    p.calculate = function () {
        spectrum = fft.analyze();
        let num = 50;

        //
        let mov = 25;

        for (let i = mov; i < 1000; i += num) {
            let val = 0;

            for (let j = 0; j < num; j++) {
                let valor = Math.abs(spectrum[i + j]);
                val += (valor * 1);
            }

            let prom = val / num;

            let index = (i - mov) / num;

            if (index < audioSpect.length) {
                let n = parseInt(prom / 10) - 8;

                if (n < 0) {
                    n = 0;
                }

                if (n > audioSpect[0].length) {
                    n = 10;
                }

                for (let j = 0; j < n; j++) {
                    audioSpect[index][j] = true;
                }
            } else {
                break;
            }
        }
    };

    p.changePlay = function () {
        if (s != null) {
            if (!s.isPlaying()) {
                s.loop();
            } else {
                s.loop();
            }
        }
    };

    p.stop = function () {
        if (s != null) {
            s.stop();
        }
    };

    p.windowResized = function () {
        width = document.querySelector('#canvas').clientWidth;
        height = document.querySelector('#canvas').clientHeight;
        p.resizeCanvas(width, height);
    };

};