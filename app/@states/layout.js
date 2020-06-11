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
import { animateScroll as scroll, scrollSpy, scroller, Events } from 'react-scroll';
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
  const [loadingObj, setLoadingObj] = useState({});
  // const [heroImageHeight, setHeroImageHeight] = useState(0);
  
  
  
  
  // --------------------------------------------------
  //   Handler
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
  
  
  // ---------------------------------------------
  //   - ScrollTo
  // ---------------------------------------------
  
  const handleScrollTo = ({
    
    to,
    duration = 0,
    delay = 0,
    smooth = 'easeInOutQuart',
    offset = -50
    
  }) => {
    
    
    // --------------------------------------------------
    //   to がない場合は処理停止
    // --------------------------------------------------
    
    if (!to) {
      return;
    }
    
    
    // --------------------------------------------------
    //   scrollTo
    // --------------------------------------------------
    
    scroller.scrollTo(to, {
      
      duration,
      delay,
      smooth,
      offset,
      
    });
    
    // Events.scrollEvent.register('end', (to, element) => {
    //   // console.log('Events.scrollEvent.register(end)');
    //   this.scrollToEnd = true;
    // });
    
    
  };
  
  
  // ---------------------------------------------
  //   - Loading
  // ---------------------------------------------
  
  const handleLoadingOpen = ({
    
    position,
    
  }) => {
    
    setLoadingObj({
      
      open: true,
      position,
      
    });
    
  };
  
  
  const handleLoadingClose = () => {
    
    setLoadingObj({
      
      open: false,
      
    });
    
  };
  
  
  
  
  // const handleSetHeroImageHeight = (contentRect) => {
  //   // console.log('handleSnackbarOpen');
    
  //   console.log(`
  //     ----- contentRect -----\n
  //     ${util.inspect(JSON.parse(JSON.stringify(contentRect)), { colors: true, depth: null })}\n
  //     --------------------\n
  //   `);
    
  //   const height = lodashGet(contentRect, ['bounds', 'height'], 300);
    
  //   console.log(chalk`
  //     contentRect.bounds.height: {green ${contentRect.bounds.height}}
  //     height: {green ${height}}
  //   `);
    
  //   setHeroImageHeight(height);
    
  // };
  
  
  
  
  
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
    
    // heroImageHeight,
    // handleSetHeroImageHeight,
    
    handleScrollTo,
    
    loadingObj,
    handleLoadingOpen,
    handleLoadingClose,
    
  };
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export const ContainerStateLayout = createContainer(useLayout);