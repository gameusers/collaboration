// --------------------------------------------------
//   Require
// --------------------------------------------------

const express = require('express');
const multer  = require('multer');
const upload = multer({ dest: 'static/' });


// ---------------------------------------------
//   Require: Model
// ---------------------------------------------

const ModelUsers = require('../schemas/users');


// --------------------------------------------------
//   Router
// --------------------------------------------------

module.exports = db => {
  
  const router = express.Router();
  
  
  router.post('/', upload.none(), (req, res) => {
    
    console.log(`req.body.loginId = ${req.body.loginId}`);
    res.json({ 'error': false, 'message': 'Success', 'loginId': req.body.loginId });
    
    // ModelUsers.find({}, (err, obj) => {
      
    //   // console.log(`obj = ${obj}`);
    //   // console.log(`err = ${err}`);
      
    //   // console.log(`req = ${req}`);
      
    //   // res.type('application/json');
    //   // console.log(`AAA`);
      
    //   // if (typeof window !== 'undefined') {
    //   //   console.log(`api / width = ${window.innerWidth}`);
    //   // }
      
    //   // req.body.loginId
      
      
    //   if (err) {
    //     res.json({ 'error': true, 'message': 'Error executing MySQL query' });
    //   }
      
    //   res.json({ 'error': false, 'message': 'Success', 'loginId': req.body.loginId });
      
    //   // res.json({ 'error': false, 'message': 'Success', 'obj': 'AAA', req: req });
      
    // });
    
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
    
//     console.log(`req.body.loginId = ${req.body.loginId}`);
//     res.json({ 'error': false, 'message': 'Success', 'loginId': req.body.loginId });
    
//     // res.json({ 'error': false, 'message': 'Success', 'obj': 'AAA' });
      
//   });
  
// });

// module.exports = router;



