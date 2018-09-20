// --------------------------------------------------
//   Require
// --------------------------------------------------

const express = require('express');
// const recaptcha = require('./recaptcha');
const login = require('./login');


// --------------------------------------------------
//   Router
// --------------------------------------------------

const router = express.Router();

// router.use('/recaptcha', recaptcha);
router.use('/login', login);

module.exports = router;