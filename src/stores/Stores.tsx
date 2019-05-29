import db, { auth, storage } from '../config/firebaseConfig';

import AuthStore from './AuthStore';
import SongStore from './SongStore';
import DBStore from './DBStore';
import GameStore from './GameStore';
import GuildStore from './GuildStore';

const authStore = new AuthStore(db, auth);
const songStore = new SongStore(db, storage);
const dbStore = new DBStore(db);
const gameStore = new GameStore(db);
const guildStore = new GuildStore(db);

export default {
    authStore,
    songStore,
    dbStore,
    gameStore,
    guildStore
};