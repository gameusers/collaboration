// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console
// ---------------------------------------------

import chalk from 'chalk';
import util from 'util';


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import React, { useState, useEffect, useContext } from 'react';
import { createContainer } from 'unstated-next';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';






// --------------------------------------------------
//   State
// --------------------------------------------------

const useUser = (initialStateObj) => {
  
  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
  
  const [loginUsersObj, setLoginUsersObj] = useState(lodashGet(initialStateObj, ['loginUsersObj'], {}));
  const [localeObj, setLocaleObj] = useState(lodashGet(initialStateObj, ['localeObj'], {}));
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /app/@states/layout.js
  // `);
  
  // console.log(`
  //   ----- loginUsersObj -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(loginUsersObj)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return {
    
    loginUsersObj,
    setLoginUsersObj,
    localeObj,
    setLocaleObj,
    
  };
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export const ContainerStateUser = createContainer(useUser);