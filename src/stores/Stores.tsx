import db, { auth, storage } from '../config/firebaseConfig';

import AuthStore from './AuthStore';
import SongStore from './SongStore';
import MusicStore from './MusicStore';
import GameStore from './GameStore';
import GuildStore from './GuildStore';
import CommentStore from './CommentStore';
import GamesStore from './GamesStore';

const authStore = new AuthStore(db, auth);
const songStore = new SongStore(db, storage);
const musicStore = new MusicStore(db);
const gameStore = new GameStore(db);
const gamesStore = new GamesStore(db);
const guildStore = new GuildStore(db);
const commentStore = new CommentStore(db);

export default {
    authStore,
    songStore,
    musicStore,
    gameStore,
    gamesStore,
    guildStore,
    commentStore
};