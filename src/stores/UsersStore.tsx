import { observable, action, computed, extendObservable } from 'mobx';

export default class GameStore {

    db: any = null;

    constructor(db: any) {
        this.db = db;
    }

    @observable users: any = [];

    //read methods

    @action cleanComments() {
        this.users = [];
    }

}