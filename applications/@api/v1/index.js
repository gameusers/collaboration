// --------------------------------------------------
//   Require
// --------------------------------------------------

const express = require('express');

const login = require('../../login/index/api/login');
const logout = require('../../logout/index/api/logout');
const plPlayer = require('../../pl/player/api/player');


// --------------------------------------------------
//   Router
// --------------------------------------------------

const router = express.Router();

router.use('/login', login);
router.use('/logout', logout);
router.use('/pl/player', plPlayer);

module.exports = router;