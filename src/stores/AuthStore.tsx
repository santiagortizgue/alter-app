import { observable, action, computed, extendObservable } from 'mobx';

export default class AuthStore {

    db: any = null;
    auth: any = null;

    constructor(db: any, auth: any) {
        this.db = db;
        this.auth = auth;

        this.auth.onAuthStateChanged( (user: any) => {
            if (user) {
                // User is signed in.
                var displayName = user.displayName;
                var email = user.email;
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var isAnonymous = user.isAnonymous;
                var uid = user.uid;
                var providerData = user.providerData;
                // ...
                this.user = user;
            } else {
                // User is signed out.
                // ...
                this.user = null;
            }
        });

    }

    @observable user: any = null;

    @action createNewUser(name: string, email: string, password: string) {
        this.auth.createUserWithEmailAndPassword(email, password)
            .then((data: any) => {
                //add user to db

                let u = {
                    uid: data.user.uid,
                    email: data.user.email,
                    name
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
        }).catch(function (error: any) {
            // An error happened.
        });
    }

}