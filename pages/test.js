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
import Error from 'next/error';
import Head from 'next/head';
import Router from 'next/router';
import { observer, Provider } from 'mobx-react';
// import { loadReCaptcha, ReCaptcha } from 'react-recaptcha-v3';
import lodashGet from 'lodash/get';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { fetchWrapper } from '../app/@modules/fetch';
import { createCsrfToken } from '../app/@modules/csrf';


// ---------------------------------------------
//   Stores
// ---------------------------------------------

import initStoreRoot from '../app/@stores/root';
import initStoreLoginIndex from '../app/login/index/stores/store';
import initStoreFollow from '../app/common/follow/stores/store';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Layout from '../app/common/layout/components/layout';
import Sidebar from '../app/common/layout/components/sidebar';




/**
 * ストアを読み込む、または作成する
 * @param {Object} propsObj - ストアに入れる値
 */
const getOrCreateStore = ({ propsObj }) => {
  
  
  // --------------------------------------------------
  //   Stores
  // --------------------------------------------------
  
  initStoreRoot({ propsObj });
  
  // const storeLoginIndex = initStoreLoginIndex({});
  // const storeFollow = initStoreFollow({});
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return {
    
    // storeLoginIndex,
    // storeFollow,
    
  };
  
  
};




// --------------------------------------------------
//   Class
//   URL: http://dev-1.gameusers.org:8080/test
// --------------------------------------------------

class Component extends React.Component {
  
  
  // --------------------------------------------------
  //   getInitialProps
  // --------------------------------------------------
  
  async getServerSideProps({ req, res }) {
    
    
    // --------------------------------------------------
    //   CSRF
    // --------------------------------------------------
    
    createCsrfToken(req, res);
    
    
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const reqHeadersCookie = lodashGet(req, ['headers', 'cookie'], '');
    const reqAcceptLanguage = lodashGet(req, ['headers', 'accept-language'], '');
    const pathname = `/test`;
    
    
    // --------------------------------------------------
    //   Fetch
    // --------------------------------------------------
    
    const resultObj = await fetchWrapper({
      urlApi: encodeURI(`${process.env.NEXT_PUBLIC_URL_API}/v2/common/initial-props`),
      methodType: 'GET',
      reqHeadersCookie,
      reqAcceptLanguage,
    });
    
    const statusCode = lodashGet(resultObj, ['statusCode'], 400);
    let propsObj = lodashGet(resultObj, ['data'], {});
    
    
    
    
    // --------------------------------------------------
    //   Title
    // --------------------------------------------------
    
    const title = `Test - Game Users`;
    
    
    // --------------------------------------------------
    //   Path Array
    // --------------------------------------------------
    
    const pathArr = ['test'];
    
    
    
    
    // --------------------------------------------------
    //   Stores
    // --------------------------------------------------
    
    const headerNavMainArr = [
      {
        name: 'Test',
        href: '/test',
        as: '/test',
      },
    ];
    
    propsObj = { ...propsObj, pathname, headerNavMainArr };
    
    const storesObj = getOrCreateStore({ propsObj });
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    console.log(`
      ----------------------------------------\n
      /pages/test.js
    `);
    
    console.log(chalk`
      process.env.NEXT_PUBLIC_URL_API: {green ${process.env.NEXT_PUBLIC_URL_API}}
    `);
    
    console.log(`
      ----- resultObj -----\n
      ${util.inspect(resultObj, { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return {
      
      statusCode,
      reqAcceptLanguage,
      pathArr,
      title,
      storesObj,
      propsObj,
      
    };
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  // constructor(props) {
    
    
  //   // --------------------------------------------------
  //   //   super
  //   // --------------------------------------------------
    
  //   super(props);
    
    
  //   // --------------------------------------------------
  //   //   Property / Error Flag
  //   // --------------------------------------------------
    
  //   this.error = false;
    
    
  //   // --------------------------------------------------
  //   //   Store
  //   // --------------------------------------------------
    
  //   try {
      
  //     console.log(props);
  //     // --------------------------------------------------
  //     //   Error
  //     // --------------------------------------------------
      
  //     if (props.statusCode !== 200) {
  //       throw new Error();
  //     }
      
      
  //     // // --------------------------------------------------
  //     // //   Stores
  //     // // --------------------------------------------------
      
  //     // const isServer = !process.browser;
      
  //     // if (isServer) {
  //     //   this.storesObj = props.storesObj;
  //     // } else {
  //     //   this.storesObj = getOrCreateStore({ propsObj: props.propsObj });
  //     // }
      
      
  //   } catch (e) {
  //     console.log(e);
  //     this.error = true;
  //   }
    
  // }
  
  
  
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
    //   console.log
    // --------------------------------------------------
    
    console.log(`
      ----------------------------------------\n
      /pages/test.js
    `);
    
    console.log(`
      ----- this.props -----\n
      ${util.inspect(this.props, { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <div>
        
        AAA
        
      </div>
    );
    
  }
  
}

export default Component;