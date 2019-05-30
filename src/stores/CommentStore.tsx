import { observable, action, computed, extendObservable } from 'mobx';
import db from '../config/firebaseConfig';

export default class CommentStore {

    number:any = null;

    constructor(number: number){
        this.number = number;
    }
    
    @observable autor: any = null;
    
    @action findCommentAutor(uid: string) {
        db.collection("users").doc(uid)
        .onSnapshot((doc: any) => {
            this.autor = doc.data();
            
            db.collection("guilds").doc(this.autor.guild).get().then((guild: any) => {
                if (guild.exists) {
                    this.autor.color = guild.data().color;
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such Guild in Comment!");
                }
            }).catch((error: any) => {
                console.log("Error getting Guild in Comment:", error);
            });
            
        });
    }
    
    @action cleanAutor() {
        this.autor = null;
    }
    
}