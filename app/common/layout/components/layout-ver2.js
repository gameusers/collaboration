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
import { inject, observer, Provider } from 'mobx-react';
import Router from 'next/router';
import NProgress from 'nprogress';
import Measure from 'react-measure';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import lodashGet from 'lodash/get';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import HeaderNavTop from './header/nav-top.js';
import HeroImage from './header/hero-image.js';
import HeaderNavMain from './header/nav-main.js';
import Footer from './footer.js';
import Sidebar from './sidebar.js';
import Drawer from './drawer.js';
import CardPlayerDialog from '../../card/player/components/dialog.js';
import VideoModal from '../../image-and-video/components/video-modal.js';
import Snackbar from './snackbar.js';
import Loading from './loading.js';




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
//   Class
// --------------------------------------------------

@inject('stores')
@observer
export default class Layout extends React.Component {
  
  
  // --------------------------------------------------
  //   componentDidMount
  // --------------------------------------------------
  
  componentDidMount() {
    
    
    // --------------------------------------------------
    //   ウィンドウの横幅が大きい場合、ヘッダーの情報を開く
    // --------------------------------------------------
    
    if (window.innerWidth <= 480) {
      this.props.stores.layout.handleHeaderDataClose();
    }
    
    
    // --------------------------------------------------
    //   ローディングを隠す
    // --------------------------------------------------
    
    this.props.stores.layout.handleLoadingHide({});
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   render
  // --------------------------------------------------

  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const {
      
      stores,
      storesObj,
      title,
      componentSidebar,
      componentContent,
      
    } = this.props;
    
    
    
    
    // --------------------------------------------------
    //   画像をLightboxで表示する場合にナビゲーションを消す
    //   以下を利用しているときにLightboxの上にナビゲーションが表示されてしまうため
    //   https://github.com/michelecocuccio/simple-react-lightbox
    // --------------------------------------------------
    
    const hideNavForLightbox = lodashGet(stores, ['layout', 'hideNavForLightbox'], false);
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/common/layout/components/layout-ver2.js
    // `);
    
    // console.log(chalk`
    //   hideNavForLightbox: {green ${hideNavForLightbox}}
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Provider { ...storesObj }>
        
        
        {/* Head 内部のタグをここで追記する */}
        <Head>
          <title>{title}</title>
          <meta name="robots" content="noindex,nofollow" />
        </Head>
        
        
        
        
        {!hideNavForLightbox &&
          <React.Fragment>
            
            
            {/* Header - Navigation Top */}
            <HeaderNavTop />
            
            
            {/* Header - Hero Image */}
            <Measure
              bounds
              onResize={(contentRect) => {
                stores.layout.handleHeaderHeroImageSize({ dimensionsObj: contentRect.bounds });
              }}
            >
              {({ measureRef }) => (
                <div ref={measureRef}>
                  <HeroImage />
                </div>
              )}
            </Measure>
            
            
            {/* Header - Navigation Main */}
            <div
              css={css`
                background-color: #151515;
                position: sticky;
                top: 0;
                z-index: 1000;
              `}
            >
              <HeaderNavMain />
            </div>
            
            
          </React.Fragment>
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
            
            <Sidebar>
              {componentSidebar}
            </Sidebar>
            
          </div>
          
          
          
          
          {/* Content */}
          <div
            css={css`
              width: 100%;
              max-width: 800px;
              
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
        
        
        
        
        {/* Drawer */}
        <Drawer>
          Drawer
        </Drawer>
        
        
        {/* プレイヤーカードを表示するダイアログ */}
        <CardPlayerDialog />
        
        
        {/* 動画表示用モーダル */}
        <VideoModal />
        
        
        {/* Snackbar 通知用 */}
        <Snackbar />
        
        
        {/* Loading */}
        <Loading />
        
        
      </Provider>
    );
    
  }
  
};