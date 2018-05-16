// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Head from 'next/head';
import { inject, observer } from 'mobx-react';

import Scrollbar from 'react-smooth-scrollbar';
// import SmoothScrollbar from 'smooth-scrollbar';
// import OverscrollPlugin from 'smooth-scrollbar/plugins/overscroll';
// import Swiper from 'react-id-swiper';

import Button from 'material-ui/Button';

import withRoot from '../lib/material-ui/withRoot';
import Header from './header';
import Footer from './footer';



// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores') @observer
class Component extends React.Component {
  
  constructor(props) {
    super(props);
  }
  

  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores } = this.props;
    
    
    /**
     * ヘッダー最下部の紺色メニュー
     */
    function HeaderMenu() {
      
      const Container = styled.nav`
        margin: 0 0 8px 0;
        // padding: 0 0 8px 0;
        
        width: 100%;
        // height: 46px;
        height: 36px;
        text-align: center;
        background-color: #25283D;
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        z-index: 1200;
      `;
      
      const ButtonMenuActive = styled(Button)`
        color: white !important;
        padding: 2px 0 0 !important;
        border-bottom: solid 2px #B40431 !important;
      `;
      
      const ButtonMenu = styled(Button)`
        color: #BDBDBD !important;
        padding: 2px 0 0 !important;
        border-bottom: solid 2px #25283D !important;
      `;
      
      
      const ScrollbarContainer = styled(Scrollbar)`
        padding: 0 0 8px 0;
        overflow-x: hidden;
        overflow-y: hidden;
        white-space: nowrap;
      `;
      
      
      const codeArr = [];
      let active = false;
      let menuArr = [];
      
      if (stores.pathname === '/') {
        menuArr = stores.header.menuObj.index;
      } else if (stores.pathname === '/gc') {
        menuArr = stores.header.menuObj.gc;
      } else if (stores.pathname === '/uc') {
        menuArr = stores.header.menuObj.uc;
      }
      
      const reverseMenuArr = JSON.parse(JSON.stringify(menuArr)).reverse();
      
      
      reverseMenuArr.forEach((value, index) => {
        
        if (value.pathname === stores.pathname || (!active && index + 1 === reverseMenuArr.length)) {
          
          codeArr.unshift(
            <ButtonMenuActive key={index}>
              {value.name}
            </ButtonMenuActive>
          );
          
          active = true;
          
        } else {
          
          codeArr.unshift(
            <Link prefetch href={value.pathname} key={index}>
              <ButtonMenu>
                {value.name}
              </ButtonMenu>
            </Link>
          );
          
        }
        
      });

      
      return (
        <Container>
          <ScrollbarContainer
            // ref={c => this.$container = c}
            alwaysShowTracks
            // continuousScrolling={false}
            // wheelEventTarget={document.querySelector('#header-nav')}
            // scrollIntoView={{
            //   offsetLeft: 50
            // }}
          >
            {codeArr}
          </ScrollbarContainer>
        </Container>
      );
      
    }
    
    
    
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
        
      </div>
    );
  }
  
};

export default withRoot(Component);