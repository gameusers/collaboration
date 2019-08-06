// --------------------------------------------------
//   Require
// --------------------------------------------------

const express = require('express');

const initialize = require('../initialize');
const initialProps = require('./initial-props');

const admin = require('../../admin/index/api/admin');
// const login = require('../../login/index/api/login');
// const logout = require('../../logout/index/api/logout');
// const plPlayer = require('../../pl/player/api/player');

const users = require('../../@database/users/api');
const cardPlayers = require('../../@database/card-players/api');
// const cardGames = require('../../@database/card-games/api');
const games = require('../../@database/games/api');
const hardwares = require('../../@database/hardwares/api');
const ids = require('../../@database/ids/api');
const emailConfirmations = require('../../@database/email-confirmations/api');
const forumThreads = require('../../@database/forum-threads/api');


// --------------------------------------------------
//   Router
// --------------------------------------------------

const router = express.Router();

if (process.env.NODE_ENV === 'development') {
  router.use('/initialize', initialize);
}

router.use('/initial-props', initialProps);

router.use('/admin', admin);
// router.use('/login', login);
// router.use('/logout', logout);
// router.use('/pl/player', plPlayer);

router.use('/users', users);
router.use('/card-players', cardPlayers);
// router.use('/card-games', cardGames);
router.use('/games', games);
router.use('/hardwares', hardwares);
router.use('/ids', ids);
router.use('/email-confirmations', emailConfirmations);
router.use('/forum-threads', forumThreads);

module.exports = router;