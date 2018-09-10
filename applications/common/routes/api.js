// --------------------------------------------------
//   Require
// --------------------------------------------------

const express = require('express');
const multer  = require('multer');
const upload = multer({ dest: 'static/' });
const shortid = require('shortid');


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
    
    // console.log(`req.body.loginId = ${req.body.loginId}`);
    // res.json({ 'error': false, 'message': 'Success', 'loginId': req.body.loginId });
    // err = ValidationError: level: Cast to Number failed for value "test" at path "level"
    
    
    // --------------------------------------------------
    //   Data
    // --------------------------------------------------
    
    const playerId = shortid.generate();
    
    const ModelUsersInstance = new ModelUsers({
      loginId: req.body.loginId,
      loginPassword: req.body.loginPassword,
      email: '',
      name: '',
      status: '',
      playerId,
      // level: 'AAA'
    });
    
    
    // --------------------------------------------------
    //   DB Insert
    // --------------------------------------------------
    
    ModelUsersInstance.save((err) => {
      console.log(`err = ${err}`);
      
      
      // ---------------------------------------------
      //   Error
      // ---------------------------------------------
      
      if (err) {
        
        // res.header('Content-Type', 'application/json; charset=utf-8');
        // console.log(`process.env.NODE_ENV = ${process.env.NODE_ENV}`);
        
        let message = err.message;
        
        if (process.env.NODE_ENV === 'production') {
          message = 'Error';
        }
        
        res.status(400).json({
          errorsArr: [
            {
              code: 0,
              message
            },
          ]
        });
        
        return;
        
      }
      
      
      // ---------------------------------------------
      //   Success
      // ---------------------------------------------
      
      res.status(201).json({
        playerId
      });
      
    });
    
  });
  
  
  return router;
  
};


    
    
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



