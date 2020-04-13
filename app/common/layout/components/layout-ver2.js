// --------------------------------------------------
//   Import
// --------------------------------------------------

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


// ---------------------------------------------
//   Components
// ---------------------------------------------

import HeaderNavTop from './header/nav-top';
import HeroImage from './header/hero-image';
import HeaderNavMain from './header/nav-main';
import Footer from './footer';
import Sidebar from './sidebar';
import Drawer from './drawer';
import CardPlayerDialog from '../../card/player/components/dialog';
import VideoModal from '../../image-and-video/components/video-modal';
import Snackbar from './snackbar';
import Loading from './loading';




// --------------------------------------------------
//   NProgress / Slim progress bars for Ajax'y applications. Inspired by Google, YouTube, and Medium.
//   https://github.com/rstacruz/nprogress
// --------------------------------------------------

NProgress.configure({ showSpinner: false });

Router.events.on('routeChangeStart', url => {
  // console.log(`Loading: ${url}`);
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
  //   constructor
  // --------------------------------------------------
  
  // constructor(props) {
  //   super(props);
  // }
  
  
  
  
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
      componentContent,
      
    } = this.props;
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Provider { ...storesObj }>
        
        
        {/* Head 内部のタグをここで追記する */}
        <Head>
          <title>{title}</title>
          {/*<meta name='viewport' content='initial-scale=1.0, width=device-width' />*/}
          <meta name="robots" content="noindex,nofollow" />
        </Head>
        
        
        
        
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
            
            
            {/* フォーラムのナビゲーション */}
            <Sidebar>
              {/*<ForumNavigation
                temporaryDataID={this.props.temporaryDataID}
                urlID={this.props.urlID}
                gameCommunities_id={this.props.gameCommunities_id}
              />*/}
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