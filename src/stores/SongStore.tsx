import { observable, action } from 'mobx';

export default class SongStore {

    db: any = null;
    storage: any = null;

    constructor(db: any, storage: any){
        this.db = db;
        this.storage = storage;
    }

    @observable songActual: any = null;

    @observable genreActual: string = "";

    @observable genresActual: any = null;

    @observable songFile: any = null;
    @observable imgFile: any = null;

    @observable colorsActual: any = null;

    /* This method read the data from realtime board of firebase, with the method on, read all the objects and update when anyone is edited */

    @action readSong(id: number) {
        this.cleanSong();

        this.db.collection("songs").where('id', '==', id).get().then((querySnapshot: any) => {

            querySnapshot.forEach((doc: any) => {

                this.songActual = {
                    name: doc.data().name,
                    id: doc.data().id,
                    album: doc.data().album,
                    year: doc.data().year,
                    genre: doc.data().genre,
                    colors: doc.data().colors,
                    a_info: doc.data().a_info,
                    autor: doc.data().autor,
                    idImg: doc.data().idImg
                }

                console.log("The Song found is: ", this.songActual.name);

                this.readColors();
                this.readGenreActual();
                this.readSongFile(doc.data().id);
                this.readImgFile(doc.data().idImg);

                return;
            });
        }).catch(function(error: any) {
            console.log("Error getting documents: ", error);
        });

    }

    /* */

    @action readGenreActual() {
        this.cleanGenres();
        this.cleanGenre();

        if (this.songActual && this.songActual.genre !== '') {

            this.songActual.genre.forEach((genreSong: any) => {
                let id = parseInt(genreSong);

                this.db.collection("genres").where('id', '==', id).get().then((querySnapshot: any) => {
                    this.genresActual = [];

                    querySnapshot.forEach((doc: any) => {

                        if (this.genreActual === "") {
                            this.genreActual = doc.data().name;
                        } else {
                            this.genreActual += ", " + doc.data().name;
                        }

                        let genre = {
                            name: doc.data().name,
                            id: doc.data().id
                        }

                        this.genresActual.push(genre);
                    });
                }).catch((error: any) => {
                    console.log("Error getting documents: ", error);
                });
            });
        }
    }

    @action readSongFile(id: number) {
        this.cleanSongFile();

        let ref = this.storage.ref();


        ref.child(`songs/${id}.mp3`).getDownloadURL().then((songUrl: any) => {
            // `url` is the download URL of your archive

            this.songFile = songUrl;

        }).catch(function (error: any) {
            // Handle any errors
        });
    }

    @action readImgFile(id: number) {
        this.cleanImgFile();

        let ref = this.storage.ref();

        ref.child(`img/${id}.jpg`).getDownloadURL().then((imgUrl: any) => {
            // `url` is the download URL of your archive

            this.imgFile = imgUrl;

        }).catch( (error: any) => {
            // Handle any errors
        });
    }

    @action readColors() {
        this.cleanColors();

        if (this.songActual !== null) {

            this.songActual.colors.forEach((colorId: any) => {

                let id = parseInt(colorId);
                this.colorsActual = [];

                this.db.collection("colors").where("id", "==", id).get().then((querySnapshot: any) => {

                    querySnapshot.forEach((colorDB: any) => {

                        let color = {
                            id: colorDB.data().id,
                            color: colorDB.data().color
                        }

                        this.colorsActual.push(color);
                    });
                }).catch(function(error: any) {
                    console.log("Error getting documents: ", error);
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