// --------------------------------------------------
//   Require
// --------------------------------------------------

const express = require('express');


// ---------------------------------------------
//   Require: Model
// ---------------------------------------------

const ModelUsers = require('../schemas/users');


// --------------------------------------------------
//   Router
// --------------------------------------------------

module.exports = db => {
  
  const router = express.Router();


  router.get('/', (req, res) => {
    
    ModelUsers.find({}, (err, obj) => {
      
      // console.log(`obj = ${obj}`);
      // console.log(`err = ${err}`);
      
      // res.type('application/json');
      
      if (err) {
        res.json({ 'error': true, 'message': 'Error executing MySQL query' });
      }
      
      res.json({ 'error': false, 'message': 'Success', 'obj': 'AAA' });
      
    });
    
  });


  return router;
  
};

// const router = express.Router();

// router.get('/api', (req, res, next) => {

//   const db = req.db;

//   ModelUsers.find({}, (err, obj) => {
      
//     // console.log(`obj = ${obj}`);
//     // console.log(`err = ${err}`);
    
//     // res.type('application/json');
    
//     if (err) {
//       res.json({ 'error': true, 'message': 'Error executing MySQL query' });
//     }
    
//     res.json({ 'error': false, 'message': 'Success', 'obj': 'AAA' });
      
//   });
  
// });

// module.exports = router;



