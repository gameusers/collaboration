// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console
// ---------------------------------------------

const chalk = require('chalk');
const util = require('util');


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import React from 'react';
import Error from 'next/error';
import Head from 'next/head';
import Router from 'next/router';
import { observer, Provider } from 'mobx-react';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Stores
// ---------------------------------------------

import initStoreRoot from '../../app/@stores/root';
import initStoreLogoutIndex from '../../app/logout/index/stores/store';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Layout from '../../app/common/layout/components/layout';
import FormLogout from '../../app/logout/index/components/form-logout';




// --------------------------------------------------
//   Class
//   URL: http://dev-1.gameusers.org:8080/logout
// --------------------------------------------------

@observer
export default class extends React.Component {
  
  
  // --------------------------------------------------
  //   getInitialProps
  // --------------------------------------------------
  
  static async getInitialProps({ pathname, req, res, login }) {
    
    
    // --------------------------------------------------
    //   ログインしていない時はログインページにリダイレクト
    // --------------------------------------------------
    
    if (login === false) {
      
      const isServer = !process.browser;
      
      if (isServer && res) {
        res.writeHead(302, {
          Location: '/login'
        });
        res.end();
      } else {
        Router.replace('/login');
      }
      
    }
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return { pathname, statusCode: 200 };
    
  }
  
  
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    
    super(props);
    
    
    // --------------------------------------------------
    //   Property / Error Flag
    // --------------------------------------------------
    
    this.error = false;
    
    
    // --------------------------------------------------
    //   Store
    // --------------------------------------------------
    
    try {
      
      
      // --------------------------------------------------
      //   Error
      // --------------------------------------------------
      
      if (this.props.statusCode !== 200) {
        throw new Error();
      }
      
      
      // --------------------------------------------------
      //   Store
      // --------------------------------------------------
      
      const stores = initStoreRoot({});
      this.storeLogoutIndex = initStoreLogoutIndex({});
      
      
      // --------------------------------------------------
      //   Update Data - Pathname
      // --------------------------------------------------
      
      stores.layout.replacePathname(props.pathname);
      
      
      // --------------------------------------------------
      //   Update Data - Header Navigation Main
      // --------------------------------------------------
      
      const headerNavMainArr = [
        {
          name: 'ログアウト',
          href: '/logout',
          as: '/logout',
        },
      ];
      
      stores.layout.replaceHeaderNavMainArr(headerNavMainArr);
      
      
    } catch (e) {
      this.error = true;
    }
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   render
  // --------------------------------------------------
  
  render() {
    
    
    // --------------------------------------------------
    //   Error
    //   参考：https://github.com/zeit/next.js#custom-error-handling
    // --------------------------------------------------
    
    if (this.error) {
      return <Error statusCode={this.props.statusCode} />;
    }
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Provider storeLogoutIndex={this.storeLogoutIndex}>
        
        <Layout>
          
          
          {/* Head 内部のタグをここで追記する */}
          <Head>
            <title>ログアウト - Game Users</title>
          </Head>
          
          
          {/* Contents */}
          <div
            css={css`
              padding: 12px;
              
              @media screen and (max-width: 480px) {
                padding: 12px 0;
              }
            `}
          >
            
            
            {/* ログアウト */}
            <FormLogout />
            
            
          </div>
          
          
        </Layout>
        
      </Provider>
    );
    
  }
  
}