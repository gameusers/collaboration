// --------------------------------------------------
//   Require
// --------------------------------------------------

const express = require('express');
const login = require('./login');
const logout = require('./logout');


// --------------------------------------------------
//   Router
// --------------------------------------------------

const router = express.Router();

router.use('/login', login);
router.use('/logout', logout);

module.exports = router;