// --------------------------------------------------
//   Require
// --------------------------------------------------

const express = require('express');

const initialize = require('../initialize');
// const initialProps = require('./initial-props');

// const admin = require('../../admin/index/api/admin');
const users = require('../../@database/users/api');


// --------------------------------------------------
//   Router
// --------------------------------------------------

const router = express.Router();

if (process.env.NODE_ENV === 'development') {
  router.use('/initialize', initialize);
}

// router.use('/initial-props', initialProps);

// router.use('/admin', admin);
router.use('/users', users);

module.exports = router;