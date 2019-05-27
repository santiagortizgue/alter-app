import { observable, action, computed, extendObservable } from 'mobx';

export default class AuthStore {

    db: any = null;
    auth: any = null;

    constructor(db: any, auth: any) {
        this.db = db;
        this.auth = auth;

        this.auth.onAuthStateChanged((user: any) => {
            if (user) {

                // search user in db
                this.db.collection("users").doc(user.uid).get().then((doc: any) => {
                    if (doc.exists) {

                        // User is signed in.
                        let u = {
                            displayName: doc.data().displayName,
                            email: user.email,
                            uid: user.uid,
                            guild: doc.data().guild,
                            games: doc.data().games
                        }

                        // ...

                        this.user = u;
                        console.log("User in db: ", this.user);
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such user in db!");
                    }
                }).catch((error: any) => {
                    console.log("Error getting user in db:", error);
                });
                // search user un db

            } else {
                // User is signed out.
                // ...
                this.user = null;
                console.log("Sign-out successful!");
            }
        });

    }

    @observable user: any = null;

    @action createNewUser(displayName: string, email: string, password: string) {
        this.auth.createUserWithEmailAndPassword(email, password)
            .then((data: any) => {
                //add user to db

                let u = {
                    uid: data.user.uid,
                    email: data.user.email,
                    guild: null,
                    games: 0,
                    displayName,
                };

                //adding user info to db
                this.db.collection("users").doc(data.user.uid).set(u)
                    .then(() => {
                        console.log("Document successfully written!");
                    })
                    .catch((error: any) => {
                        console.error("Error writing document: ", error);
                    });
                //add user to db

            }).catch((error: any) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
                console.log(errorMessage);
            });
    }

    @action signIn(email: string, password: string) {
        this.auth.signInWithEmailAndPassword(email, password).catch((error: any) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
    }

    @action signOut() {
        this.auth.signOut().then(() => {
            // Sign-out successful.
            //console.log("Sign-out successful!");
        }).catch((error: any) => {
            // An error happened.
        });
    }

}