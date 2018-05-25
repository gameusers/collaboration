// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import Head from 'next/head';
import { inject, observer } from 'mobx-react';

import Dialog from '@material-ui/core/Dialog';

import Header from './header/header';
import HeaderMenu from './header/menu';
import Footer from './footer';


// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores') @observer
export default class extends React.Component {
  
  constructor(props) {
    super(props);
  }
  

  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores } = this.props;
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <div>
        
        {/* Head 内部のタグをここで追記する */}
        <Head>
          <title>タイトル</title>
          <meta charSet='utf-8' />
          <meta name='viewport' content='initial-scale=1.0, width=device-width' />
          <meta name="robots" content="noindex,nofollow" />
        </Head>
        
        {/* ヘッダー */}
        <Header />
        
        {/* 最下部メニュー */}
        <HeaderMenu />
        
        {/* コンテンツ */}
        {this.props.children}
        
        {/* フッター */}
        <Footer />
        
        {/* 画像・動画のモーダル */}
        <Dialog
          open={stores.common.modalWindowOpen}
          onClose={stores.common.modalWindowCloseFunction}
          maxWidth='md'
        >
          <img src={stores.common.modalWindowSrc} width="100%" />
        </Dialog>
        
      </div>
    );
    
  }
  
};