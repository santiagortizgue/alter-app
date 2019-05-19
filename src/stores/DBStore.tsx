import { observable, action, computed, extendObservable } from 'mobx';
import db, { storage } from '../config/firebaseConfig';

class DBStore {
   
    @observable musicArray: any = null;
    @observable musicArrayBackup: any = null;

    @observable filterGenre: any = null;
    @observable filterBand: any = null;
    @observable filterColor: any = null;


    /* This method read the data from realtime board of firebase, with the method on, read all the objects and update when anyone is edited */

    @action readMusic() {
        this.cleanMusicArray();

        db.collection("songs").get().then((querySnapshot) => {
            
            this.musicArray = [];
            this.musicArrayBackup = [];

            querySnapshot.forEach((doc) => {

                let song = {
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

                this.musicArrayBackup.push(song);
                this.musicArray.push(song);
            });
        }).catch(function(error: any) {
            console.log("Error getting documents: ", error);
        });
    }

    @action readFilterGenre() {
        this.cleanFilterGenre();

        db.collection("genres").get().then((querySnapshot) => {
            this.filterGenre = [];
            querySnapshot.forEach((doc) => {

                let genre = {
                    name: doc.data().name,
                    id: doc.data().id
                }

                this.filterGenre.push(genre);
            });
        }).catch(function(error: any) {
            console.log("Error getting documents: ", error);
        });
    }

    @action readFilterBand() {
        this.cleanFilterBand();

        db.collection("bands").get().then((querySnapshot) => {
            this.filterBand = [];
            querySnapshot.forEach((doc) => {
                let band = {
                    name: doc.data().name,
                    id: doc.data().id
                }

                this.filterBand.push(band);
            });
        }).catch(function(error: any) {
            console.log("Error getting documents: ", error);
        });
    }

    @action readFilterColor() {
        this.cleanFilterColor();

        db.collection("colors").get().then((querySnapshot) => {
            this.filterColor = [];
            querySnapshot.forEach((doc) => {
                let color = {
                    name: doc.data().color,
                    id: doc.data().id
                }

                this.filterColor.push(color);
            });
        }).catch(function(error: any) {
            console.log("Error getting documents: ", error);
        });
    }

    /* filter methods */

    @action filterByBand(bandName: string) {
        this.musicArray = this.musicArrayBackup;
        this.musicArray = this.musicArray.filter((song: any) => song.autor === bandName);
    }

    @action filterByGenre(genreId: number) {
        this.musicArray = this.musicArrayBackup;

        this.musicArray = [];

        this.musicArrayBackup.forEach((song: any) => {
            if(song.genre){
                song.genre.forEach((genreIdSong: any) => {
                    if(genreIdSong === genreId){
                        this.musicArray.push(song);
                    }
                });
            }
        });
    }

    @action filterByColor(colorId: number) {
        this.musicArray = this.musicArrayBackup;

        this.musicArray = [];

        this.musicArrayBackup.forEach((song: any) => {
            if(song.colors){
                song.colors.forEach((colorIdSong: any) => {
                    if(colorIdSong === colorId){
                        this.musicArray.push(song);
                    }
                });
            }
        });
    }

    /* this method reset the value of the variable */

    @action cleanMusicArray() {
        this.musicArray = null;
        this.musicArrayBackup = null;
    }

    @action cleanFilterGenre() {
        this.filterGenre = null;
    }

    @action cleanFilterBand() {
        this.filterBand = null;
    }

    @action cleanFilterColor() {
        this.filterColor = null;
    }

}

const dbStore = new DBStore()

export default dbStore;