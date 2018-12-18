// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

const chalk = require('chalk');
const util = require('util');


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import React from 'react';
import Head from 'next/head';
// import Link from 'next/link';
import getConfig from 'next/config';
import { observer, Provider } from 'mobx-react';
import styled from 'styled-components';
import fetch from 'isomorphic-unfetch';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------




// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------




// ---------------------------------------------
//   Stores
// ---------------------------------------------

import initStoreIndex from '../app/common/stores/index';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Layout from '../app/common/layout/components/layout';


// ---------------------------------------------
//   Material UI を Next.js で利用するため
// ---------------------------------------------

import withRoot from '../lib/material-ui/withRoot';





// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const Container = styled.div`
  padding: 10px 10px 18px 10px;
  
  @media screen and (max-width: 480px) {
    padding: 10px 0 18px 0;
  }
`;


// ---------------------------------------------
//   フォーム
// ---------------------------------------------

const Description = styled.div`
  // width: 100%;
  margin: 0 0 16px 0;
  // padding: 0 30px 0 0;
  // background-color: pink;
`;





// --------------------------------------------------
//   Class
//   URL: http://35.203.143.160:8080/pl/***
// --------------------------------------------------

@observer
class Component extends React.Component {
  
  
  // --------------------------------------------------
  //   getInitialProps
  // --------------------------------------------------
  
  static async getInitialProps({ pathname, req, res }) {
    
    const isServer = !!req;
    
    
    // --------------------------------------------------
    //   publicRuntimeConfig
    // --------------------------------------------------
    
    const { publicRuntimeConfig } = getConfig();
    
    
    
    // --------------------------------------------------
    //   Fetch
    // --------------------------------------------------
    
    let initialPropsObj = {};
    
    
    // ---------------------------------------------
    //   API URL
    // ---------------------------------------------
    
    const urlApi = `${publicRuntimeConfig.urlApi}/v1/test/initial-props`;
    
    
    // ---------------------------------------------
    //   Headers
    // ---------------------------------------------
    
    const headersObj = {
      'Accept': 'application/json'
    };
    
    if (isServer) {
      headersObj['Cookie'] = req.headers.cookie;
    }
    
    
    await fetch(urlApi, {
      method: 'GET',
      credentials: 'same-origin',
      mode: 'same-origin',
      headers: headersObj
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((jsonObj) => {
        　　throw new Error(jsonObj.errorsArr[0].message);
        　});
        }
        
        return response.json();
      })
      .then((jsonObj) => {
        
        
        // --------------------------------------------------
        //   Console 出力
        // --------------------------------------------------
        
        console.log(`
          jsonObj: \n${util.inspect(jsonObj, { colors: true, depth: null })}
        `);
        
        initialPropsObj = jsonObj;
        
        
      })
      .catch((error) => {
        
        console.log(`getInitialProps / Fetch / ${error}`);
        
      });
    
    
    return { isServer, pathname, initialPropsObj };
    
  }
  
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    
    super(props);
    
    
    // --------------------------------------------------
    //   publicRuntimeConfig
    // --------------------------------------------------
    
    const { publicRuntimeConfig } = getConfig();
    this.recaptchaSiteKey = publicRuntimeConfig.recaptchaSiteKey;
    
    
    
    // --------------------------------------------------
    //   Store
    // --------------------------------------------------
    
    const argumentsObj = {
      isServer: props.isServer,
      pathname: props.pathname,
      environment: publicRuntimeConfig.environment,
      urlApi: publicRuntimeConfig.urlApi
    };
    
    this.stores = initStoreIndex(argumentsObj);
    
    
    
    // --------------------------------------------------
    //   Store / Update Data
    // --------------------------------------------------
    
    
    
  }
  
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const stores = this.stores;
    
    
    
    // --------------------------------------------------
    //   Header Navigation
    // --------------------------------------------------
    
    const headerNavMainArr = [
      {
        name: 'テスト',
        pathname: '/test'
      }
    ];
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Provider stores={this.stores}>
      
        <Layout headerNavMainArr={headerNavMainArr}>
          
          {/* Head 内部のタグをここで追記する */}
          <Head>
            <title>Test - Game Users</title>
          </Head>
          
          
          <Container>
            
            AAA
            
          </Container>
          
        </Layout>
      </Provider>
    );
  }
}

export default withRoot(Component);