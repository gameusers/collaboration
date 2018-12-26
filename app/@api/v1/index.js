// --------------------------------------------------
//   Require
// --------------------------------------------------

const express = require('express');

const initialize = require('../initialize');
const admin = require('../../admin/index/api/admin');
const login = require('../../login/index/api/login');
const logout = require('../../logout/index/api/logout');
const plPlayer = require('../../pl/player/api/player');

const users = require('../../@database/users/api');
const cardPlayers = require('../../@database/card-players/api');
const cardGames = require('../../@database/card-games/api');


// --------------------------------------------------
//   Router
// --------------------------------------------------

const router = express.Router();

if (process.env.NODE_ENV === 'development') {
  router.use('/initialize', initialize);
}

router.use('/admin', admin);
router.use('/login', login);
router.use('/logout', logout);
router.use('/pl/player', plPlayer);

router.use('/users', users);
router.use('/card-players', cardPlayers);
router.use('/card-games', cardGames);

module.exports = router;