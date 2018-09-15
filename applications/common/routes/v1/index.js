// --------------------------------------------------
//   Require
// --------------------------------------------------

const express = require('express');
const login = require('./login');


// --------------------------------------------------
//   Router
// --------------------------------------------------

const router = express.Router();

router.use('/login', login);

module.exports = router;