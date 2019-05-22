import db, { auth, storage } from '../config/firebaseConfig';

import AuthStore from './AuthStore';
import SongStore from './SongStore';
import DBStore from './DBStore';

const authStore = new AuthStore(db, auth);
const songStore = new SongStore(db, storage);
const dbStore = new DBStore(db);

export default {
    authStore,
    songStore,
    dbStore
};