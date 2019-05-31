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

        this.cleanGames();

        this.listenerGames = this.db.collection("games").orderBy("timestamp", "desc").onSnapshot((querySnapshot: any) => {

            this.cleanGames();
            
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

    @action deleteGame(id: string) {
        this.db.collection("games").doc(id).delete().then(() => {
            console.log("Game successfully deleted!");
        }).catch((error: any) => {
            console.error("Error removing game: ", error);
        });
    }

    /* write methods */

    @action createGame(uid: string, name: string, redirectGame: (id: string) => void) {
        // Add a new document with a generated id.
        this.db.collection("games").add({
            name,
            autor: uid,
            state: "new",
            timestamp: new Date().getTime(),
        })
            .then((docRef: any) => {
                this.db.collection("games").doc(docRef.id).update({
                    idGame: docRef.id
                }).catch((e: any) => {
                    console.error("Error setting game id: ", e);
                });
                console.log("Game written with ID: ", docRef.id);
                redirectGame(docRef.id);
            })
            .catch((error: any) => {
                console.error("Error adding game: ", error);
            });
    }

    /* filter methods */

    @action cleanListenerGames() {

        if (this.listenerGames) {
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

function sortByTimestamp(a: any, b: any) {
    return a.timestamp - b.timestamp;
}
