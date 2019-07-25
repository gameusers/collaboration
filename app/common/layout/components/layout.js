// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import React from 'react';
// import styled from 'styled-components';
// import styled from '@emotion/styled';
import Head from 'next/head';
import { inject, observer } from 'mobx-react';
import Router from 'next/router';
import NProgress from 'nprogress';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import HeaderNavTop from './header/nav-top';
import Header from './header/header';
import HeaderNavMain from './header/nav-main';
import Footer from './footer';

import Snackbar from './snackbar';
import Loading from './loading';


// ---------------------------------------------
//   CSS
// ---------------------------------------------

import '../../../../app/@css/reset.css';
import 'react-id-swiper/src/styles/css/swiper.css';
import 'rc-pagination/assets/index.css';
import 'react-modal-video/css/modal-video.min.css';
// import 'react-image-gallery/styles/css/image-gallery.css';
import 'nprogress/nprogress.css';
import '../../../../app/@css/style.css';




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
export default class extends React.Component {
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    super(props);
  }
  
  
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
    
    // const { stores } = this.props;
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        
        
        {/* Head 内部のタグをここで追記する */}
        <Head>
          {/*<meta charSet='utf-8' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />*/}
          <meta name="robots" content="noindex,nofollow" />
        </Head>
        
        
        
        
        {/* Header - Navigation Top */}
        <HeaderNavTop />
        
        
        {/* Header */}
        <Header />
        
        
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
        
        
        
        
        {/* Contents */}
        {this.props.children}
        
        
        
        
        {/* Footer */}
        <Footer />
        
        
        
        
        {/* Snackbar 通知用 */}
        <Snackbar />
        
        
        {/* Loading */}
        <Loading />
        
        
      </React.Fragment>
    );
    
  }
  
};