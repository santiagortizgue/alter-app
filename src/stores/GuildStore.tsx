import { observable, action } from 'mobx';

export default class GuildStore {

    db: any = null;

    listenerGuild: any = null;

    constructor(db: any) {
        this.db = db;
    }

    @observable guilds: any[] = [];

    @action readGuilds() {
        this.cleanGuilds();

        this.listenerGuild = this.db.collection("guilds")
            .onSnapshot((querySnapshot: any) => {
                this.guilds = [];

                querySnapshot.forEach((doc: any) => {

                    let g = {
                        name: doc.data().name,
                        id: doc.data().id,
                        points: doc.data().points,
                        color: doc.data().color,
                    }

                    this.guilds.push(g);
                });
            });

    }

    @action stopGuilds() {
        this.cleanGuilds();

        if (this.listenerGuild) {
            this.listenerGuild();
        }
    }

    @action cleanGuilds() {
        this.guilds = [];
    }

    @action addPointToGuild(user: any){
        let id = user.guild;

        let object = this.guilds.find((gu: any) => gu.id == id);
        
        let newPoints = parseInt(object.points + 1);

        this.db.collection("guilds").doc(id+"").update({
            points: newPoints
        }).catch((e: any) => {
            console.error("Error setting guild points: ", e);
        });
    }

}