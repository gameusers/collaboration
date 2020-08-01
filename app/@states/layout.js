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
import { Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
import { createContainer } from 'unstated-next';
import moment from 'moment';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';
import lodashCloneDeep from 'lodash/cloneDeep';






// --------------------------------------------------
//   State
// --------------------------------------------------

const useLayout = (initialStateObj) => {
  
  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
 
  const [ISO8601, setISO8601] = useState(lodashGet(initialStateObj, ['ISO8601'], moment().utc().toISOString()));
  const [snackbarObj, setSnackbarObj] = useState({});
  const [dialogObj, setDialogOpen] = useState({ open: false });
  const [loadingObj, setLoadingObj] = useState({});
  const [videoObj, setVideoObj] = useState({});
  const [navigationForLightbox, setNavigationForLightbox] = useState(true);
  const [cardPlayersObj, setCardPlayersObj] = useState({});
  const [dialogAchievementOpen, setDialogAchievementOpen] = useState(false);
  const [dialogAchievementObj, setDialogAchievementObj] = useState({});
  
  
  
  
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
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/@states/layout.js - handleSnackbarOpen
    // `);
    
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
    
    const clonedObj = lodashCloneDeep(snackbarObj);
    clonedObj.open = false;
    
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/@states/layout.js - handleSnackbarClose
    // `);
    
    // console.log(`
    //   ----- snackbarObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(snackbarObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- clonedObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(clonedObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    setSnackbarObj(clonedObj);
    
    // setSnackbarObj({
    //   open: false,
    // });
    
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
  
  
  
  
  // ---------------------------------------------
  //   - Video
  // ---------------------------------------------
  
  const handleVideoOpen = ({
    
    videoChannel,
    videoID,
    
  }) => {
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/@states/layout.js - handleVideoOpen
    // `);
    
    // console.log(chalk`
    //   videoChannel: {green ${videoChannel}}
    //   videoID: {green ${videoID}}
    // `);
    
    setVideoObj({
      
      open: true,
      videoChannel,
      videoID,
      
    });
    
  };
  
  
  const handleVideoClose = () => {
    
    setVideoObj({
      
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
  //   - Show or Hide Navigation for Lightbox
  // ---------------------------------------------
  
  const handleNavigationForLightboxShow = () => {
    
    setNavigationForLightbox(true);
    
  };
  
  
  const handleNavigationForLightboxHide = () => {
    
    setNavigationForLightbox(false);
    
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
    
    ISO8601,
    setISO8601,
    
    snackbarObj,
    handleSnackbarOpen,
    handleSnackbarClose,
    
    dialogObj,
    handleDialogOpen,
    handleDialogClose,
    
    loadingObj,
    handleLoadingOpen,
    handleLoadingClose,
    
    videoObj,
    handleVideoOpen,
    handleVideoClose,
    
    handleScrollTo,
    
    navigationForLightbox,
    handleNavigationForLightboxShow,
    handleNavigationForLightboxHide,
    
    cardPlayersObj,
    setCardPlayersObj,
    
    dialogAchievementOpen,
    setDialogAchievementOpen,
    dialogAchievementObj,
    setDialogAchievementObj,
    
  };
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export const ContainerStateLayout = createContainer(useLayout);