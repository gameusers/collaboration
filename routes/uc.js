// --------------------------------------------------
//   Require
// --------------------------------------------------

const express = require('express');


// --------------------------------------------------
//   Router
// --------------------------------------------------

const router = express.Router();

router.get('/uc', (req, res) => {
  res.render('/uc/index', {});
});


router.get('/uc/:param1', (req, res) => {
  
  const { param1 } = req.params;
  
  // if (!param1) {
  //   res.render('/uc/index', req.query);
  // }
  
  const queryObj = {
    param1
  };
  
  res.render('/uc/community', queryObj);
  
});


router.get('/uc/:param1/member', (req, res) => {
  const { param1 } = req.params;
  res.render('/uc/community/member', { param1 });
});


module.exports = router;