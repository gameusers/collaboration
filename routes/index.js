// --------------------------------------------------
//   Require
// --------------------------------------------------

const express = require('express');
const moment = require('moment-timezone');

const ModelUsers = require('../schemas/users');



// --------------------------------------------------
//   Router
// --------------------------------------------------

const router = express.Router();

router.get('/', (req, res, next) => {

    // res.render('index', { user: null });
  
  // logger.warn(req.session.user);

  ModelUsers.find({}, (err, dataArr) => {
    console.log(dataArr);
    if (err) throw err;
    
    return res.render('test', {
      usersArr: dataArr,
      user: req.session && req.session.user ? req.session.user : null,
      moment: moment
    });
    
  });

});

module.exports = router;
