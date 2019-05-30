import { observable, action, computed, extendObservable } from 'mobx';

export default class AuthStore {

    db: any = null;
    auth: any = null;

    constructor(db: any, auth: any) {
        this.db = db;
        this.auth = auth;
    }

    @observable user: any = null;

    @action createNewUser(displayName: string, email: string, password: string) {
        this.auth.createUserWithEmailAndPassword(email, password)
            .then((data: any) => {
                //add user to db

                let u = {
                    uid: data.user.uid,
                    email: data.user.email,
                    guild: getRandomInt(0, 3),
                    games: 0,
                    displayName,
                    victories: 0
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

    @action updateTeam(id: number) {

        this.user.guild = id;

        // search user in db
        this.db.collection("users").doc(this.user.uid).set(this.user).then((doc: any) => {
            console.log("User's Guild updated to: " + this.user.guild);
        }).catch((error: any) => {
            console.log("Error getting user in db:", error);
        });
        // search user un db
    }

    @action signOut() {
        this.auth.signOut().then(() => {
            // Sign-out successful.
            //console.log("Sign-out successful!");
        }).catch((error: any) => {
            // An error happened.
        });
    }

    @action userStateListener(setUserOutListener: (state: boolean) => void){
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
                            games: doc.data().games,
                            victories: doc.data().victories,
                        }

                        // ...

                        this.user = u;
                        console.log("User conected, in db: ", this.user);
                        setUserOutListener(true);
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
                console.log("User is signed out!");

                setUserOutListener(false);
            }
        });
    }

}


function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  }