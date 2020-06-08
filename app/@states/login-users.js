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

const useLoginUsers = (initialState) => {
  
  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
  
  const [loginUsersObj, setLoginUsersObj] = useState(initialState);
  
  
  
  
  // --------------------------------------------------
  //   handle
  // --------------------------------------------------
  
  // const handleSnackbarOpen = ({
    
  //   variant,
  //   messageID,
  //   vertical,
  //   horizontal,
  //   autoHideDuration,
  //   errorObj,
    
  // }) => {
    
  //   setSnackbarObj({
      
  //     open: true,
  //     variant,
  //     messageID,
  //     vertical,
  //     horizontal,
  //     autoHideDuration,
  //     errorObj,
      
  //   });
    
  // };
  
  
  // const handleSnackbarClose = (event, reason) => {
    
  //   if (reason === 'clickaway') {
  //     return;
  //   }
    
  //   setSnackbarObj({
  //     open: false,
  //   });
    
  // };
  
  
  
  
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
    
  };
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export const ContainerStateLoginUsers = createContainer(useLoginUsers);