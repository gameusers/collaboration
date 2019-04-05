// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import React from 'react';
import Head from 'next/head';
import { inject, observer } from 'mobx-react';
import { loadReCaptcha } from 'react-recaptcha-v3';
// import ModalVideo from 'react-modal-video';


// ---------------------------------------------
//   Components
// ---------------------------------------------

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
import '../../../../app/@css/style.css';




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores')
@observer
export default class extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  
  componentDidMount() {
    
    
    // --------------------------------------------------
    //   ウィンドウの横幅が大きい場合、ヘッダーの情報を開く
    // --------------------------------------------------
    
    if (window.innerWidth > 480) {
      this.props.stores.layout.handleHeaderDataBoxOpen();
    }
    
    
    // --------------------------------------------------
    //   ローディングを隠す
    // --------------------------------------------------
    
    this.props.stores.layout.handleLoadingHide();
    
    
    // --------------------------------------------------
    //   Initialize the ReCaptcha
    //   https://github.com/codeep/react-recaptcha-v3
    // --------------------------------------------------
    
    loadReCaptcha(process.env.RECAPTCHA_SITE_KEY);
    
    
  }
  

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
          <meta charSet='utf-8' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
          <meta name="robots" content="noindex,nofollow" />
        </Head>
        
        
        {/* ヘッダー */}
        <Header />
        
        
        {/* ヘッダー - メインナビゲーション */}
        <HeaderNavMain
          headerNavMainArr={this.props.headerNavMainArr}
        />
        
        
        {/* コンテンツ */}
        {this.props.children}
        
        
        {/* フッター */}
        <Footer />
        
        
        {/* 動画用のモーダルウィンドウ */}
        {/*<ModalVideo
          channel={stores.layout.modalVideoChannel}
          isOpen={stores.layout.modalVideoOpen}
          videoId={stores.layout.modalVideoId}
          onClose={stores.layout.handleModalVideoClose}
        />*/}
        
        
        {/* Snackbar 通知用 */}
        <Snackbar />
        
        
        {/* Loading */}
        <Loading />
        
        
      </React.Fragment>
    );
    
  }
  
};