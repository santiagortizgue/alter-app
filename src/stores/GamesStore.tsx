import { observable, action, computed, extendObservable } from 'mobx';

export default class GamesStore {

    db: any = null;

    listenerGames: any = null;

    constructor(db: any) {
        this.db = db;
    }

    @observable ourGames: any[] = [];
    @observable ourGamesBackup: any[] = [];

    @observable otherGames: any[] = [];
    @observable otherGamesBackup: any[] = [];

    /* This method read the data from realtime board of firebase, with the method on, read all the objects and update when anyone is edited */

    @action setListenerGames(autor: string) {

       this.listenerGames = this.db.collection("games").onSnapshot((querySnapshot: any) => {

            querySnapshot.forEach((doc: any) => {

                let g = doc.data();

                if (g.autor === autor) {
                    this.ourGames.push(g);
                    this.ourGamesBackup.push(g);
                } else {
                    this.otherGames.push(g);
                    this.otherGamesBackup.push(g);
                }
            });
        });
    }

    /* write methods */

    

    /* filter methods */

    @action cleanListenerGames() {

        if(this.listenerGames){
            this.listenerGames();
        }
    }

    @action cleanGames() {
        this.ourGames = [];
        this.ourGamesBackup = [];
        this.otherGames = [];
        this.otherGamesBackup = [];
    }

}