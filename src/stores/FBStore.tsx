import { observable, action, computed, extendObservable } from 'mobx';
import db, { storage } from '../config/firebaseConfig';

class FBStore {

    @observable songActual: any = null;

    @observable genreActual: string = "";

    @observable genresActual: any = null;

    @observable songFile: any = null;
    @observable imgFile: any = null;

    @observable colorsActual: any = null;

    /* This method read the data from realtime board of firebase, with the method on, read all the objects and update when anyone is edited */

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
                        a_info: newSong.val().a_info,
                        autor: newSong.val().autor,
                        idImg: newSong.val().idImg
                    }

                    console.log("The Song found is: ", this.songActual.name);

                    this.readGenreActual();
                    this.readColors();
                    this.readSongFile(id);
                    this.readImgFile(newSong.val().idImg);

                    return;
                }
            });
        });

    }

    /* */

    @action readGenreActual() {
        this.cleanGenres();
        this.cleanGenre();

        if (this.songActual !== null) {

            let ref = db.ref('genres');

            this.songActual.genre.forEach((genreSong: any) => {
                this.genresActual = [];

                ref.on("value", (querySnapshot: any) => {

                    querySnapshot.forEach((genreDB: any) => {
                        if (genreSong === genreDB.val().id) {

                            if(this.genreActual === ""){
                                this.genreActual = genreDB.val().genre;
                            }else{
                                this.genreActual += ", "+genreDB.val().genre;
                            }

                            let genre = {
                                name: genreDB.val().genre,
                                id: genreDB.val().id
                            }

                            this.genresActual.push(genre);
                        }
                    });
                });
            });
        }
    }

    @action readSongFile(id: number) {
        this.cleanSongFile();

        let ref = storage.ref();

 
        ref.child(`songs/${id}.mp3`).getDownloadURL().then( (songUrl: any) => {
            // `url` is the download URL of your archive

            this.songFile = songUrl;

          }).catch(function(error) {
            // Handle any errors
          });
    }

    @action readImgFile(id: number) {
        this.cleanImgFile();

        let ref = storage.ref();

        ref.child(`img/${id}.jpg`).getDownloadURL().then( (imgUrl: any) => {
            // `url` is the download URL of your archive

            this.imgFile = imgUrl;

          }).catch(function(error) {
            // Handle any errors
          });
    }

    @action readColors() {
        this.cleanColors();

        if (this.songActual !== null) {

            let ref = db.ref('colors');

            this.songActual.colors.forEach((colorId: any) => {

                this.colorsActual = [];

                ref.on("value", (querySnapshot: any) => {

                    querySnapshot.forEach((colorDB: any, length: number) => {
                        if (colorId === colorDB.val().id) {

                            let color = {
                                id: colorDB.val().id,
                                color: colorDB.val().color
                            }

                            this.colorsActual.push(color);
                        }
                    });
                });
            });
        }
    }

    /* setter methods */

    /* this method reset the value of the variable */

    @action cleanSong() {
        this.songActual = null;
    }

    @action cleanGenre() {
        this.genreActual = "";
    }

    @action cleanGenres() {
        this.genresActual = null;
    }

    @action cleanSongFile() {
        this.songFile = null;
    }

    @action cleanImgFile() {
        this.imgFile = null;
    }

    @action cleanColors() {
        this.colorsActual = null;
    }

}



export const firebaseStore = new FBStore();