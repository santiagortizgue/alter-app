import db, { auth, storage } from '../config/firebaseConfig';

import AuthStore from './AuthStore';
import SongStore from './SongStore';
import DBStore from './DBStore';
import GameStore from './GameStore';

const authStore = new AuthStore(db, auth);
const songStore = new SongStore(db, storage);
const dbStore = new DBStore(db);
const gameStore = new GameStore(db);

export default {
    authStore,
    songStore,
    dbStore,
    gameStore
};