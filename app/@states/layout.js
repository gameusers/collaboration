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

const useLayout = (initialStateObj) => {
  
  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
  
  const [snackbarObj, setSnackbarObj] = useState({});
  const [dialogObj, setDialogOpen] = useState({ open: false });
  
  
  
  
  // --------------------------------------------------
  //   handle
  // --------------------------------------------------
  
  // ---------------------------------------------
  //   - Snackbar
  // ---------------------------------------------
  
  const handleSnackbarOpen = ({
    
    variant,
    messageID,
    vertical,
    horizontal,
    autoHideDuration,
    errorObj,
    
  }) => {
    // console.log('handleSnackbarOpen');
    setSnackbarObj({
      
      open: true,
      variant,
      messageID,
      vertical,
      horizontal,
      autoHideDuration,
      errorObj,
      
    });
    
  };
  
  
  const handleSnackbarClose = (event, reason) => {
    // console.log('handleSnackbarClose');
    if (reason === 'clickaway') {
      return;
    }
    
    setSnackbarObj({
      open: false,
    });
    
  };
  
  
  // ---------------------------------------------
  //   - Dialog
  // ---------------------------------------------
  
  const handleDialogOpen = ({
    
    title,
    description,
    handle,
    argumentsObj,
    
  }) => {
    
    setDialogOpen({
      
      open: true,
      title,
      description,
      handle,
      argumentsObj,
      
    });
    
  };
  
  
  const handleDialogClose = () => {
    
    setDialogOpen({
      
      open: false,
      
    });
    
  };
  
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /app/@states/layout.js
  // `);
  
  // console.log(`
  //   ----- initialStateObj -----\n
  //   ${util.inspect(initialStateObj, { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return {
    
    snackbarObj,
    handleSnackbarOpen,
    handleSnackbarClose,
    
    dialogObj,
    handleDialogOpen,
    handleDialogClose,
    
  };
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export const ContainerStateLayout = createContainer(useLayout);