import { observable, action, computed, extendObservable } from 'mobx';
import db from '../config/firebaseConfig';

export default class CommentStore {

    db: any = null;

    constructor(db: any){
        this.db = db;
    }
    
    @action findCommentAutor(uid: string, getAutor: (a: any) => void) {

        let autor: any = null;

        this.db.collection("users").doc(uid)
        .onSnapshot((doc: any) => {
            autor = doc.data();
            
            this.db.collection("guilds").doc(autor.guild).get().then((guild: any) => {
                if (guild.exists) {
                    autor.color = guild.data().color;

                    getAutor(autor);

                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such Guild in Comment!");
                }
            }).catch((error: any) => {
                console.log("Error getting Guild in Comment:", error);
            });
            
        });
    }
    
}
