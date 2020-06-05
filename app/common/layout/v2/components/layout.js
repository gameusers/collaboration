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

import React from 'react';
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
// import Snackbar from 'app/common/layout/components/snackbar.js';
// import Loading from 'app/common/layout/components/loading.js';


// ---------------------------------------------
//   Contexts
// ---------------------------------------------

import { ContextLoginUser } from 'app/common/context/user.js';






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
  
  // const [count, setCount] = useState(0);
  
  const {
    
    // stores,
    contextObj,
    title,
    componentSidebar,
    componentContent,
    
  } = props;
  
  
  
  
  
  return (
    <React.Fragment>
      
      <ContextLoginUser.Provider value={contextObj}>
        
        
        {/* Head 内部のタグをここで追記する */}
        <Head>
          <title>{title}</title>
          <meta name="robots" content="noindex,nofollow" />
        </Head>
        
        
        
        
        {/* Header - Navigation Top */}
        <HeaderNavTop />
        
        
        <HeroImage />
        
        
        
        
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
        
        
      </ContextLoginUser.Provider>
      
    </React.Fragment>
  );
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;