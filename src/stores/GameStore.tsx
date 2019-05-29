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

    //read methods

    @action findGame(idGame: string) {

        this.db.collection("games").where("idGame", "==", idGame).get().then((querySnapshot: any) => {
            this.cleanGame();

            querySnapshot.forEach((doc: any) => {

                let g = doc.data();

                console.log(g);

                this.game = g;

                this.findComments(idGame);
                //this.findPlayers(idGame);
            });
        }).catch((error: any) => {
            console.log("Error getting documents: ", error);
        });

    }

    @action findComments(idGame: string) {

        this.db.collection("games").doc(idGame).collection("comments").orderBy("timestamp", "asc").onSnapshot((querySnapshot: any) => {
            this.cleanComments();

            querySnapshot.forEach((doc: any) => {

                let c = {
                    data: doc.data().data,
                    user: doc.data().user,
                    id: doc.id,
                    timestamp: doc.data().timestamp
                }

                this.comments.push(c);
            });
        });
    }

    @action findPlayers(idGame: string) {
        this.db.collection("games").doc(idGame).collection("players").onSnapshot((snapshot: any) => {
            this.cleanPlayerA();
            this.cleanPlayerB();
            snapshot.docChanges().forEach((change: any) => {
                if (change.type === "added") {
                    this.cleanComments();
                    console.log("Players: ", change.doc.data());
                }
                if (change.type === "modified") {
                    this.cleanComments();
                    console.log("Modified Players: ", change.doc.data());
                }
                if (change.type === "removed") {
                    this.cleanComments();
                    console.log("Removed Players: ", change.doc.data());
                }
            });
        });
    }

    //read methods

    //write methods

    @action writeComment(data: string, uid: string){

        let newCom = {
            data,
            uid,
            timestamp: new Date().getTime()
        }

        this.db.collection("games").doc(this.game.idGame).collection("comments").add(newCom)
        .then(function(docRef: any) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error: any) {
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

    @action cleanPlayerA() {
        this.playerA = null;
    }

    @action cleanPlayerB() {
        this.playerB = null;
    }

}