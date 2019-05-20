import { observable, action, computed, extendObservable } from 'mobx';
import db, { auth } from '../config/firebaseConfig';

class AuthStore {

    /*
    var user = firebase.auth().currentUser;

    if (user) {
        // User is signed in.
    } else {
        // No user is signed in.
    }

    //update

    user.updateProfile({
        displayName: "Jane Q. User",
        photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(function() {
        // Update successful.
    }).catch(function(error) {
        // An error happened.
    });
    */

    @observable user: any = null;

    @action createNewUser(name: string, email: string, password: string) {
        auth.createUserWithEmailAndPassword(email, password)
            .then(function (docUser: any) {
            //add user to db
            
            let u = docUser;

            db.collection("cities").add(u)
                .then(function (docRef) {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                });
            //add user to db
            
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
    }

    @action signIn(email: string, password: string) {
        auth.signInWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
    }

    @action signOut() {
        auth.signOut().then(function () {
            // Sign-out successful.
        }).catch(function (error) {
            // An error happened.
        });
    }

}

const authStore = new AuthStore();

export default authStore;