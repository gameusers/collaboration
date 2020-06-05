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
import { inject, observer } from 'mobx-react';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import lodashGet from 'lodash/get';


// ---------------------------------------------
//   Components
// ---------------------------------------------

// import DataGc from './data-gc';
// import DataUc from './data-uc';
// import DataUr from './data-ur';






// --------------------------------------------------
//   Function Components
// --------------------------------------------------

/**
 * 
 */
const Component = (props) => {
  
  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
  
  // const contextObj = useContext(ContextLoginUser);
  const [showNavTop, setShowNavTop] = useState(true);
  const [loginMenuOpen, setLoginMenuOpen] = useState(false);
  
  
  
  
  // --------------------------------------------------
  //   props
  // --------------------------------------------------
  
  // const {
    
  //   classes,
    
  // } = props;
  
  
  
  
  // --------------------------------------------------
  //   loginUsersObj
  // --------------------------------------------------
  
  // const userID = lodashGet(contextObj, ['loginUsersObj', 'userID'], '');
  
  // const imagesAndVideosThumbnailArr = lodashGet(contextObj, ['loginUsersObj', 'cardPlayerObj', 'imagesAndVideosThumbnailObj', 'arr'], []);
  
  // let thumbnailSrc = '/img/common/thumbnail/none.svg';
  // let thumbnailSrcSet = '';
  
  // if (imagesAndVideosThumbnailArr.length > 0) {
    
  //   thumbnailSrc = lodashGet(imagesAndVideosThumbnailArr, [0, 'src'], '/img/common/thumbnail/none.svg');
  //   thumbnailSrcSet = lodashGet(imagesAndVideosThumbnailArr, [0, 'srcSet'], '');
    
  // }
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----- contextObj -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(contextObj)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return (
    <div>
      AAA
    </div>
  );
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;