import { observable, action, computed, extendObservable } from 'mobx';

export default class AuthStore {

    db: any = null;
    auth: any = null;

    constructor(db: any, auth: any) {
        this.db = db;
        this.auth = auth;

    /*
        var user = firebase.auth().currentUser;

        if (user) {
            // User is signed in.
        } else {
            // No user is signed in.
        }

        }
    */

    }



    @observable user: any = null;

    @action createNewUser(name: string, email: string, password: string) {
        this.auth.createUserWithEmailAndPassword(email, password)
            .then((docUser: any) => {
                //add user to db

                let u = docUser;

                this.db.collection("cities").add(u)
                    .then((docRef: any) => {
                        console.log("Document written with ID: ", docRef.id);
                    })
                    .catch(function (error: any) {
                        console.error("Error adding document: ", error);
                    });
                //add user to db

            }).catch((error: any) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
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
        }).catch(function (error: any) {
            // An error happened.
        });
    }

}