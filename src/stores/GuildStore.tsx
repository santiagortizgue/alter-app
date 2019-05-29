import { observable, action } from 'mobx';

export default class GuildStore {

    db: any = null;

    constructor(db: any){
        this.db = db;
    }

    @observable guilds:any = [];

    @action readGuilds(){
        this.cleanGuilds();

        this.db.collection("guilds").get().then((querySnapshot: any) => {
            this.guilds = [];

            querySnapshot.forEach((doc: any) => {

                let g = {
                    name: doc.data().name,
                    id: doc.data().id,
                    points: doc.data().points,
                    color:doc.data().color,
                }

                this.guilds.push(g);
            });
        }).catch((error: any) => {
            console.log("Error getting Guilds: ", error);
        });
    }

    @action cleanGuilds(){
        this.guilds = [];
    }

}