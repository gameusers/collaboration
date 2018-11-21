// --------------------------------------------------
//   Require
// --------------------------------------------------

const express = require('express');

const test = require('../../test/api/test');
const login = require('../../login/index/api/login');
const logout = require('../../logout/index/api/logout');
const plPlayer = require('../../pl/player/api/player');
const cardPlayers = require('../../@database/card-players/api');


// --------------------------------------------------
//   Router
// --------------------------------------------------

const router = express.Router();

router.use('/test', test);
router.use('/login', login);
router.use('/logout', logout);
router.use('/pl/player', plPlayer);
router.use('/card-players', cardPlayers);

module.exports = router;