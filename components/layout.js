// --------------------------------------------------
//   Import
// --------------------------------------------------

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Head from 'next/head';
import { inject, observer } from 'mobx-react';

import Button from 'material-ui/Button';

import withRoot from '../lib/material-ui/withRoot';

import Header from './header';







// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores') @observer
class Component extends React.Component {
  
  constructor(props) {
    super(props);
    // console.log(`props.stores.header.test = ${props.stores.header.test}`);
    // console.log(`layout / props.stores.pathname = ${props.stores.pathname}`);
    // console.log(`layout / props.stores.header.loginMenuOpenFunction = ${props.stores.header.loginMenuOpenFunction}`);
  }

  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores } = this.props;
    
    
    /**
     * ヘッダー最下部の紺色メニュー
     */
    function Menu() {
      
      const Container = styled.nav`
        display: flex !important;
        flex-direction: row !important;
        justify-content: center !important;
        height: 46px !important;
        background-color: #25283D !important;
        position: -webkit-sticky !important;
        position: sticky !important;
        top: 0 !important;
        z-index: 1200 !important;
      `;
      
      const ButtonMenuActive = styled(Button)`
        color: white !important;
        border-top: solid 2px #25283D !important;
        border-bottom: solid 2px #B40431 !important;
      `;
      
      const ButtonMenu = styled(Button)`
        color: #BDBDBD !important;
        border-top: solid 2px #25283D !important;
        border-bottom: solid 2px #25283D !important;
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
      
      // console.log(JSON.stringify(stores.header.menuObj));
      
      
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
          {codeArr}
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
        <Menu />
        
        
        {/* コンテンツ */}
        {this.props.children}
        
        
        {/* フッター */}
        {/*<footer>
          {'Footer'}
        </footer>*/}
        
      </div>
    );
  }
  
};

export default withRoot(Component);