// --------------------------------------------------
//   Require
// --------------------------------------------------

// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

const fs = require('fs');






// --------------------------------------------------
//   Function
// --------------------------------------------------

/**
 * service-workerを結合する　自作部分とnext-offlineで生成された部分
 */
const merge = () => {


  // ---------------------------------------------
  //   Read
  // ---------------------------------------------

  const self = fs.readFileSync('app/@modules/service-worker/service-worker.js', 'utf8');
  const workbox = fs.readFileSync('.next/public/service-worker.js', 'utf8');


  // ---------------------------------------------
  //   Merge
  // ---------------------------------------------

  const merged = `${self}\n\n\n\n\n${workbox}`;


  // ---------------------------------------------
  //   Write
  // ---------------------------------------------

  fs.writeFileSync('public/service-worker.js', merged);

  // console.log(merged);


};




// --------------------------------------------------
//   merge
// --------------------------------------------------

merge();