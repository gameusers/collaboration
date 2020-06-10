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
  const [heroImageHeight, setHeroImageHeight] = useState(0);
  
  
  
  
  // --------------------------------------------------
  //   handler
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
  
  
  
  const handleSetHeroImageHeight = (contentRect) => {
    // console.log('handleSnackbarOpen');
    
    console.log(`
      ----- contentRect -----\n
      ${util.inspect(JSON.parse(JSON.stringify(contentRect)), { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    const height = lodashGet(contentRect, ['bounds', 'height'], 300);
    
    console.log(chalk`
      contentRect.bounds.height: {green ${contentRect.bounds.height}}
      height: {green ${height}}
    `);
    
    setHeroImageHeight(height);
    
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
    
    heroImageHeight,
    handleSetHeroImageHeight,
    
  };
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export const ContainerStateLayout = createContainer(useLayout);