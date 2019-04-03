import { observable, action, computed, extendObservable } from 'mobx';
import db, { storage } from '../config/firebaseConfig';

class FBStore {

    @observable musicArray: any = [];

    @observable songActual: any = null;

    @observable genreActual: string = "";

    @observable songFile: any = null;

    /* This method read the data from realtime board of firebase, with the method on, read all the objects and update when anyone is edited */

    @action readMusic() {
        this.cleanMusicArray();

        let ref = db.ref("songs");//ruta        
        ref.on('value', (querySnapshot: any) => {

            querySnapshot.forEach((newSong: any) => {

                let song = {
                    name: newSong.val().name,
                    id: newSong.val().id,
                    album: newSong.val().album,
                    year: newSong.val().year,
                    genre: newSong.val().genre,
                    colors: newSong.val().colors,
                    a_info: newSong.val().newSong,
                    autor: newSong.val().autor
                }

                this.musicArray.push(song);
            });
            console.log('Next songs have been readed in FBStore: ', this.musicArray);
        });
    }

    @action readSong(id: number) {
        this.cleanSong();

        let ref = db.ref('songs');

        ref.on("value", (querySnapshot: any) => {
            querySnapshot.forEach((newSong: any) => {

                if (newSong.val().id == id) {

                    this.songActual = {
                        name: newSong.val().name,
                        id: newSong.val().id,
                        album: newSong.val().album,
                        year: newSong.val().year,
                        genre: newSong.val().genre,
                        colors: newSong.val().colors,
                        a_info: newSong.val().newSong,
                        autor: newSong.val().autor
                    }

                    console.log("The Song found is: ", this.songActual.name);

                    return;
                }
            });
        });

    }

    /* */

    @action readGenreActual() {
        this.cleanGenre();

        if (this.songActual !== null) {

            let ref = db.ref('genres');


            this.songActual.genre.forEach((genreSong: any) => {

                ref.on("value", (querySnapshot: any) => {

                    querySnapshot.forEach((genreDB: any) => {
                        if (genreSong === genreDB.val().id) {
                            if(this.genreActual === ""){
                                this.genreActual = genreDB.val().genre;
                            }else{
                             this.genreActual += ", "+genreDB.val().genre;
                            }   
                        }
                    });
                });
            });
        }
    }

    @action readSongFile(){
        this.cleanSongFile();

        let ref = storage.ref();

        ref.child('songs/0.mp3').getDownloadURL().then( (song: any) => {
            // `url` is the download URL for 'images/stars.jpg'

            // This can be downloaded directly:
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event: any) => {
              var blob = xhr.response;
            };
            xhr.open('GET', song);
            xhr.send();

            console.log(song);
          

          }).catch(function(error) {
            // Handle any errors
          });
    }

    /* this method reset the value of the variable */

    @action cleanMusicArray() {
        this.musicArray = [];
    }

    @action cleanSong() {
        this.songActual = null;
    }

    @action cleanGenre() {
        this.genreActual = "";
    }

    @action cleanSongFile(){
        this.songFile = null;
    }

}

export const firebaseStore = new FBStore();