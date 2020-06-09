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
import Head from 'next/head';
// import { inject, observer, Provider } from 'mobx-react';
import Router from 'next/router';
import NProgress from 'nprogress';
import Measure from 'react-measure';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import HeaderNavTop from 'app/common/layout/v2/components/header/nav-top.js';
import HeroImage from 'app/common/layout/v2/components/header/hero-image.js';
// import HeaderNavMain from 'app/common/layout/components/header/nav-main.js';
// import Footer from 'app/common/layout/components/footer.js';
// import Sidebar from 'app/common/layout/components/sidebar.js';
// import Drawer from 'app/common/layout/components/drawer.js';
// import CardPlayerDialog from 'app/common/card/player/components/dialog.js';
// import VideoModal from 'app/common/image-and-video/components/video-modal.js';
import Snackbar from 'app/common/layout/v2/components/snackbar.js';
// import Loading from 'app/common/layout/components/loading.js';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Dialog from 'app/common/layout/v2/components/dialog.js';






// --------------------------------------------------
//   NProgress / Slim progress bars for Ajax'y applications. Inspired by Google, YouTube, and Medium.
//   https://github.com/rstacruz/nprogress
// --------------------------------------------------

NProgress.configure({ showSpinner: false });

Router.events.on('routeChangeStart', url => {
  NProgress.start();
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());






// --------------------------------------------------
//   Components
// --------------------------------------------------

/**
 * 
 */
const Component = (props) => {
  
  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
  
  // const [count, setCount] = useState(0);
  // const [snackbarObj, setSnackbarObj] = useState({});
  
  
  
  
  // --------------------------------------------------
  //   props
  // --------------------------------------------------
  
  const {
    
    title,
    componentSidebar,
    componentContent,
    headerObj,
    
  } = props;
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /app/common/layout/v2/components/layout.js
  // `);
  
  // console.log(`
  //   ----- loginUsersObj -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(loginUsersObj)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  // const test = (eventObj) => {
    
  //   eventObj.preventDefault();
    
  //   // console.log(`
  //   //   ----- eventObj -----\n
  //   //   ${util.inspect(eventObj, { colors: true, depth: null })}\n
  //   //   --------------------\n
  //   // `);
    
  // };
  
  
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return (
    <React.Fragment>
      
      
      {/* Head 内部のタグをここで追記する */}
      <Head>
        <title>{title}</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      
      
      
      
      {/* Header - Navigation Top */}
      <HeaderNavTop />
      
      
      <HeroImage
        headerObj={headerObj}
      />
      
      
      
      {/*<form
        name="test"
        onSubmit={(eventObj) => test(eventObj)}
      >
        
        <FormName />
        <input type='submit' value="送信" />
        
      </form>*/}
      
      
      
      
      {/* Main - 2 Column */}
      <main
        css={css`
          display: flex;
          flex-flow: row nowrap;
          justify-content: center;
          margin: 0 auto;
          padding: 16px;
          height: 1200px;
          background-color: pink;
          
          @media screen and (max-width: 947px) {
            display: flex;
            flex-flow: column nowrap;
            padding: 10px 0 10px 0;
          }
        `}
      >
        
        
        
        
        
      </main>
      
      
      
      
      {/* Snackbar 通知用 */}
      <Snackbar/>
      
      
      {/* ダイアログ */}
      <Dialog />
      
      
    </React.Fragment>
  );
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;