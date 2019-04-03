import { observable, action, computed, extendObservable } from 'mobx';
import db from '../config/firebaseConfig';

class FBStore {

    @observable musicArray: any = [];

    @observable songActual: any = null;

    @observable genreActual: string = "";

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

}

export const firebaseStore = new FBStore();