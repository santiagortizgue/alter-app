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

        let ref = db.ref("songs");//ruta        
        ref.on('value', (querySnapshot: any) => {
            
            this.musicArray = [];
            this.musicArrayBackup = [];

            querySnapshot.forEach((newSong: any) => {

                let song = {
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

                this.musicArrayBackup.push(song);
                this.musicArray.push(song);
            });
            //console.log('Next songs have been readed in FBStore: ', this.musicArray);
        });
    }

    @action readFilterGenre() {
        this.cleanFilterGenre();

        let ref = db.ref("genres");//ruta        
        ref.on('value', (querySnapshot: any) => {
            this.filterGenre = [];
            querySnapshot.forEach((newGenre: any) => {

                let genre = {
                    name: newGenre.val().genre,
                    id: newGenre.val().id
                }

                this.filterGenre.push(genre);
            });
        });
    }

    @action readFilterBand() {
        this.cleanFilterBand();

        let ref = db.ref("band");//ruta        
        ref.on('value', (querySnapshot: any) => {
            this.filterBand = [];
            querySnapshot.forEach((newBand: any) => {

                let band = {
                    name: newBand.val().name,
                    id: newBand.val().id
                }

                this.filterBand.push(band);
            });
        });
    }

    @action readFilterColor() {
        this.cleanFilterColor();

        let ref = db.ref("colors");//ruta        
        ref.on('value', (querySnapshot: any) => {
            this.filterColor = [];
            querySnapshot.forEach((newColor: any) => {

                let color = {
                    name: newColor.val().color,
                    id: newColor.val().id
                }

                this.filterColor.push(color);
            });
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