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

        this.db.collection("games").doc(idGame).get().then((doc: any) => {
            this.cleanGame();

            let g = doc.data();

            this.game = g;

            this.findComments(idGame);
            //this.findPlayers(idGame);

        }).catch((error: any) => {
            console.log("Error getting game: ", error);
        });
    }

    @action findComments(idGame: string) {

        this.db.collection("games").doc(idGame).collection("comments").orderBy("timestamp", "desc").onSnapshot((querySnapshot: any) => {
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

    @action findAllGame(autor: string, setGames: (ourGames: any[], otherGames: any[]) => void) {

        let oGames: any[] = [];
        let otGames: any[] = [];

        this.db.collection("games").onSnapshot((querySnapshot: any) => {

            querySnapshot.forEach((doc: any) => {
            
            let g = doc.data();

            if(g.autor === autor){
                oGames.push(g);
            }else{
                otGames.push(g);
            }

            });
            setGames(oGames, otGames);
        });
    }

    @action findGameCard(uid: string, setAutor: (autor: any) => void) {

        this.db.collection("users").doc(uid).onSnapshot((doc: any) => {

            let autor = {
                displayName: doc.data().displayName
            }
            
            setAutor(autor);
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

    @action cleanListenerComments(idGame: string) {
        this.comments = [];

        let unsubscribe = this.db.collection("games").doc(idGame).collection("comments").orderBy("timestamp", "desc").onSnapshot(function (){});

        unsubscribe();
    }

    @action cleanListenerGames(){

        let unsubscribe = this.db.collection("games").onSnapshot(function () {});

        unsubscribe();
    }

    @action cleanListenerGameCard(uid: string){
        let unsubscribe = this.db.collection("users").doc(uid).onSnapshot(function () {});

        unsubscribe();
    }

    @action cleanPlayerA() {
        this.playerA = null;
    }

    @action cleanPlayerB() {
        this.playerB = null;
    }

}