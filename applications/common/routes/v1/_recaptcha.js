// --------------------------------------------------
//   Require
// --------------------------------------------------

// require('dotenv').config();

const express = require('express');
const multer  = require('multer');
const upload = multer({ dest: 'static/' });
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const shortid = require('shortid');
// const Recaptcha = require('express-recaptcha').Recaptcha;
const fetch  = require('isomorphic-unfetch');
const chalk = require('chalk');



// ---------------------------------------------
//   Require: Model
// ---------------------------------------------

// const ModelUsers = require('../../schemas/users');


// --------------------------------------------------
//   Router
// --------------------------------------------------

const router = express.Router();
// const recaptcha = new Recaptcha('6LfH2nAUAAAAANJ0OZstm88GPuTYHKSH5dxYVsud', '6LfH2nAUAAAAACfsSs_s2WvccDhE1gR6qDjhMuha');




// --------------------------------------------------
//   reCAPTCHA
// --------------------------------------------------

router.post('/recaptcha', upload.none(), (req, res) => {
  
  
  // --------------------------------------------------
  //   Data
  // --------------------------------------------------
  
  // g-recaptcha-response is the key that browser will generate upon form submit.
  // if its blank or null means user has not selected the captcha, so return the error.
  if (
    req.body['g-recaptcha-response'] === undefined ||
    req.body['g-recaptcha-response'] === '' ||
    req.body['g-recaptcha-response'] === null
  ) {
    return res.status(400).json({
      errorsArr: [
        {
          code: 0,
          message: 'ロボットのチェックに失敗しました。'
        },
      ]
    });
  }
  
  // Put your secret key here.
  const secretKey = '6LcQBHEUAAAAAKmJ3yzxRrNXumSKoglWlREBKYRG';
  
  // req.connection.remoteAddress will provide IP address of connected user.
  const verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
  
  // Hitting GET request to the URL, Google will respond with success or error scenario.
  
  
  // ---------------------------------------------
  //   Fetch
  // ---------------------------------------------
  
  // const apiUrl = `${storeData.apiUrl}/v1/login`;
  
  fetch(verificationUrl, {
    method: 'POST',
    credentials: 'same-origin',
    mode: 'same-origin',
    headers: {
      'Accept': 'application/json'
    },
    // body: formData
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((jsonObj) => {
      　　throw new Error(jsonObj.errorsArr[0].message);
      　});
      }
      
      return response.json();
    })
    .then((jsonObj) => {
      
      console.log(`then`);
      console.dir(jsonObj);
      
      this.handleFormReset();
      
    })
    .catch((error) => {
      
      console.log(`catch: ${error}`);
      
    });
  
  // request(verificationUrl,function(error,response,body) {
  //   body = JSON.parse(body);
  //   // Success will be true or false depending upon captcha validation.
  //   if(body.success !== undefined && !body.success) {
  //     return res.json({"responseCode" : 1,"responseDesc" : "Failed captcha verification"});
  //   }
  //   res.json({"responseCode" : 0,"responseDesc" : "Sucess"});
  // });
  
  
  // --------------------------------------------------
  //   DB Insert
  // --------------------------------------------------
  
  // ModelUsersInstance.save((err) => {
  //   console.log(`err = ${err}`);
    
    
  //   // ---------------------------------------------
  //   //   Error
  //   // ---------------------------------------------
    
  //   if (err) {
      
  //     // res.header('Content-Type', 'application/json; charset=utf-8');
  //     // console.log(`process.env.NODE_ENV = ${process.env.NODE_ENV}`);
      
  //     let message = err.message;
      
  //     if (process.env.NODE_ENV === 'production') {
  //       message = 'Error';
  //     }
      
  //     res.status(400).json({
  //       errorsArr: [
  //         {
  //           code: 0,
  //           message
  //         },
  //       ]
  //     });
      
  //     return;
      
  //   }
    
    
  //   // ---------------------------------------------
  //   //   Success
  //   // ---------------------------------------------
    
  //   res.status(201).json({
  //     loginId: req.body.loginId,
  //     playerId
  //   });
    
  // });
  
});


    
module.exports = router;