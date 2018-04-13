// --------------------------------------------------
//   Require
// --------------------------------------------------

const express = require('express');
const ModelUsers = require('../schemas/users');



// --------------------------------------------------
//   Router
// --------------------------------------------------

const router = express.Router();

router.get('/api', (req, res, next) => {

    // res.render('index', { user: null });
  
  // logger.warn(req.session.user);

  // res.send({"Error" : true, "Message" : "CCC"});

  ModelUsers.find({}, (err, dataArr) => {
    console.log(dataArr);
    console.log(err);
    if (err) {
      res.send({"Error" : true, "Message" : "Error executing MySQL query"});
    } else {
      res.send({"Error" : false, "Message" : "Success", "Users" : 'AAA'});
    }
  });

});

module.exports = router;
