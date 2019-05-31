import { observable, action, computed, extendObservable } from 'mobx';

export default class GameStore {

    db: any = null;

    constructor(db: any) {
        this.db = db;
    }

    @observable game: any = null;
    @observable comments: any = [];

    @observable playerA: any = null;
    @observable playerB: any = null;

    @observable listenerComments: any = null;

    //read methods

    @action findGame(idGame: string) {

        this.db.collection("games").doc(idGame).get().then((doc: any) => {
            this.cleanGame();

            let g = doc.data();

            this.game = g;

        }).catch((error: any) => {
            console.log("Error getting game: ", error);
        });
    }

    @action findComments(idGame: string) {

        this.listenerComments = this.db.collection("games").doc(idGame).collection("comments").orderBy("timestamp", "desc").onSnapshot((querySnapshot: any) => {
            this.cleanComments();

            querySnapshot.forEach((doc: any) => {

                let c = {
                    data: doc.data().data,
                    uid: doc.data().uid,
                    id: doc.id,
                    timestamp: doc.data().timestamp
                }

                this.comments.push(c);
            });
        });
    }

    @action findGameCard(uid: string, setAutor: (autor: any, listener: any) => void) {

        let listenerAutor = this.db.collection("users").doc(uid).onSnapshot((doc: any) => {

            let autor = {
                displayName: doc.data().displayName
            }

            setAutor(autor, listenerAutor);
        });
    }

    //read methods

    //write methods

    @action writeComment(data: string, uid: string) {

        let newCom = {
            data,
            uid,
            timestamp: new Date().getTime()
        }

        this.db.collection("games").doc(this.game.idGame).collection("comments").add(newCom)
            .then(function (docRef: any) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function (error: any) {
                console.error("Error adding document: ", error);
            });
    }

    //write methods

    @action cleanGame() {
        this.game = null;
    }

    @action cleanComments() {
        this.comments = [];
    }

    @action cleanListenerComments(listenerComments: any) {
        this.comments = [];

        if (this.listenerComments) {
            this.listenerComments();
        }
    }

    @action cleanListenerGameCard(listenerAutor: any) {
        listenerAutor();
    }

    @action cleanPlayerA() {
        this.playerA = null;
    }

    @action cleanPlayerB() {
        this.playerB = null;
    }

}