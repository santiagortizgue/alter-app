import { observable, action, computed, extendObservable } from 'mobx';
import db from '../config/firebaseConfig';

class FBStore {

    @observable musicArray: any = [];

    @observable songActual: any = null;


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

    @action readSong(id: number){
        this.cleanSong();

        let ref = db.ref("songs").orderByChild("id").equalTo(id);

        ref.on('value', (querySnapshot: any) => {

            querySnapshot.forEach((newSong: any) => {
                
                console.log(newSong);

            });
        });


            
        /*
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

        this.songActual = song;

        console.log('The song found FBStore: ', this.songActual);
        */
    }

    /* this method reset the value of the variable */

    @action cleanMusicArray() {
        this.musicArray = [];
    }

    @action cleanSong() {
        this.songActual = null;
    }

}

export const firebaseStore = new FBStore();