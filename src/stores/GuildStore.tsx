import { observable, action } from 'mobx';

export default class GuildStore {

    db: any = null;

    constructor(db: any) {
        this.db = db;
    }

    @observable guilds: any = [];

    @action readGuilds() {
        this.cleanGuilds();

        this.db.collection("guilds")
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

        var unsubscribe = this.db.collection("guilds")
            .onSnapshot( () => {
                this.cleanGuilds(); });
        // ...
        // Stop listening to changes
        unsubscribe();
    }

    @action cleanGuilds() {
        this.guilds = [];
    }

}