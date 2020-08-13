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

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import Measure from 'react-measure';
import { Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';


// ---------------------------------------------
//   States
// ---------------------------------------------

import { ContainerStateLayout } from 'app/@states/layout.js';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import HeaderNavTop from 'app/common/layout/v2/header/nav-top.js';
import HeroImage from 'app/common/layout/v2/header/hero-image.js';
import HeaderNavMain from 'app/common/layout/v2/header/nav-main.js';
import Sidebar from 'app/common/layout/v2/sidebar.js';
import Footer from 'app/common/layout/v2/footer.js';
import Dialog from 'app/common/layout/v2/dialog.js';
import VideoModal from 'app/common/image-and-video/v2/video-modal.js';
import Snackbar from 'app/common/layout/v2/snackbar.js';
import Loading from 'app/common/layout/v2/loading.js';
import DialogAchievement from 'app/common/layout/v2/dialog-achievement.js';






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
 * Export Component
 */
const Component = (props) => {
  
  
  // --------------------------------------------------
  //   props
  // --------------------------------------------------
  
  const {
    
    title,
    componentSidebar,
    componentContent,
    headerNavMainArr,
    
  } = props;
  
  
  
  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
  
  const [showNavTop, setShowNavTop] = useState(true);
  const [lowerNavMain, setLowerNavMain] = useState(false);
  const [lowerSidebar, setLowerSidebar] = useState(false);
  const [heroImageHeight, setHeroImageHeight] = useState(640);
  const [scrollToEnd, setScrollToEnd] = useState(true);
  
  
  useEffect(() => {
    
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/common/layout/v2/components/layout.js - useEffect
    // `);
    
    
    // ---------------------------------------------
    //   EventListener: react-scroll / header のアニメーションに関係する
    //   参考：https://github.com/fisshy/react-scroll
    // ---------------------------------------------
    
    Events.scrollEvent.register('end', function(to, element) {
      
      
      // console.log('end', arguments);
      
      
      // ---------------------------------------------
      //   高さ
      // ---------------------------------------------
      
      const navTopHeight = 53;
      const navMainHeight = 36;
      const headerHeight = navTopHeight + heroImageHeight + navMainHeight;
      const contentsHeight = window.innerHeight - headerHeight;
      
      
      
      
      // ---------------------------------------------
      //   スクロールがトップの場合
      // ---------------------------------------------
      
      if (window.scrollY === 0) {
        
        // console.log('end / window.scrollY === 0');
        
        setShowNavTop(true);
        setLowerNavMain(false);
        setLowerSidebar(false);
        
        
      // ---------------------------------------------
      //   コンテンツの量が少ない（コンテンツの高さがない）場合
      // ---------------------------------------------
      
      // } else if (headerHeight > contentsHeight && headerHeight > window.scrollY) {
      } else if (headerHeight > contentsHeight) {
        
        // console.log('AAA');
        
        setShowNavTop(false);
        setLowerNavMain(false);
        setLowerSidebar(false);
        
        // setShowNavTop(true);
        // setLowerNavMain(false);
        // setLowerSidebar(false);
        
        
      // ---------------------------------------------
      //   それ以外
      // ---------------------------------------------
        
      } else {
        
        // console.log('end / else');
        
        setShowNavTop(false);
        setLowerNavMain(false);
        setLowerSidebar(true);
        
      }
      
      
      // console.log(chalk`
      //   navTopHeight: {green ${navTopHeight}}
      //   heroImageHeight: {green ${heroImageHeight}}
      //   navMainHeight: {green ${navMainHeight}}
        
      //   window.innerHeight: {green ${window.innerHeight}}
        
      //   headerHeight: {green ${headerHeight}}
      //   contentsHeight: {green ${contentsHeight}}
      //   window.scrollY: {green ${window.scrollY}}
      // `);
      
      
      setTimeout(setScrollToEnd(true), 500);
      
      
    });
    
    
  }, []);
  
  
  
  
  // --------------------------------------------------
  //   States
  // --------------------------------------------------
  
  const stateLayout = ContainerStateLayout.useContainer();
  
  const { navigationForLightbox } = stateLayout;
  
  
  
  
  // --------------------------------------------------
  //   Handler
  // --------------------------------------------------
  
  // ---------------------------------------------
  //   - Header
  // ---------------------------------------------
  
  const handleSetHeroImageHeight = (contentRect) => {
    
    const height = lodashGet(contentRect, ['bounds', 'height'], 300);
    
    // console.log(chalk`
    //   contentRect.bounds.height: {green ${contentRect.bounds.height}}
    //   height: {green ${height}}
    // `);
    
    setHeroImageHeight(height);
    
  };
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /app/common/layout/v2/layout.js
  // `);
  
  // console.log(`
  //   ----- loginUsersObj -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(loginUsersObj)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  
  
  
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
      {navigationForLightbox && 
        <HeaderNavTop
          showNavTop={showNavTop}
          setShowNavTop={setShowNavTop}
          setLowerNavMain={setLowerNavMain}
          setLowerSidebar={setLowerSidebar}
          heroImageHeight={heroImageHeight}
          scrollToEnd={scrollToEnd}
          setScrollToEnd={setScrollToEnd}
        />
      }
      
      
      {/* Header - Hero Image */}
      <Measure
        bounds
        onResize={(contentRect) => handleSetHeroImageHeight(contentRect)}
      >
        {({ measureRef }) => (
          <div ref={measureRef}>
            <HeroImage />
          </div>
        )}
      </Measure>
      
      
      {/* Header - Navigation Main */}
      {navigationForLightbox && 
        <div
          css={css`
            background-color: #151515;
            position: sticky;
            top: 0;
            z-index: 1000;
          `}
        >
          <HeaderNavMain
            lowerNavMain={lowerNavMain}
            headerNavMainArr={headerNavMainArr}
          />
        </div>
      }
      
      
      
      
      {/* Main - 2 Column */}
      <main
        css={css`
          display: flex;
          flex-flow: row nowrap;
          justify-content: center;
          margin: 0 auto;
          padding: 16px;
          
          @media screen and (max-width: 947px) {
            display: flex;
            flex-flow: column nowrap;
            padding: 10px 0 10px 0;
          }
        `}
      >
        
        
        {/* Sidebar */}
        {componentSidebar &&
          <div
            css={css`
              width: 300px;
              margin: 0 16px 0 0;
              
              @media screen and (max-width: 947px) {
                width: auto;
                margin: 0 0 16px 0;
              }
            `}
          >
            
            <Sidebar
              showNavTop={showNavTop}
              lowerSidebar={lowerSidebar}
            >
              {componentSidebar}
            </Sidebar>
            
          </div>
        }
        
        
        
        
        {/* Content */}
        <div
          css={css`
            width: 100%;
            ${componentSidebar && 'max-width: 800px;'}
            
            @media screen and (max-width: 947px) {
              max-width: none;
            }
          `}
        >
          {componentContent}
        </div>
        
        
      </main>
      
      
      
      
      {/* Footer */}
      <Footer />
      
      
      
      
      {/* ダイアログ */}
      <Dialog />
      
      
      {/* ダイアログ - 実績 */}
      <DialogAchievement />
      
      
      {/* 動画表示用モーダル */}
      <VideoModal />
      
      
      {/* Snackbar 通知用 */}
      <Snackbar/>
      
      
      {/* Loading */}
      <Loading />
      
      
    </React.Fragment>
  );
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;