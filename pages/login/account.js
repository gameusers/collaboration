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
import { loadReCaptcha, ReCaptcha } from 'react-recaptcha-v3';
import lodashGet from 'lodash/get';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { fetchWrapper } from '../../app/@modules/fetch';


// ---------------------------------------------
//   Stores
// ---------------------------------------------

import initStoreIndex from '../../app/@stores/index';
import initStoreLoginAccount from '../../app/login/account/stores/store';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Layout from '../../app/common/layout/components/layout';
import FormCreateAccount from '../../app/login/account/components/form-create-account';




// --------------------------------------------------
//   Class
//   URL: http://dev-1.gameusers.org:8080/login/account
// --------------------------------------------------

@observer
export default class extends React.Component {
  
  
  // --------------------------------------------------
  //   getInitialProps
  // --------------------------------------------------
  
  static async getInitialProps({ pathname, req, res }) {
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const reqHeadersCookie = lodashGet(req, ['headers', 'cookie'], '');
    const reqAcceptLanguage = lodashGet(req, ['headers', 'accept-language'], '');
    
    
    // --------------------------------------------------
    //   Fetch
    // --------------------------------------------------
    
    const resultObj = await fetchWrapper({
      urlApi: encodeURI(`${process.env.URL_API}/v1/initial-props/common`),
      methodType: 'GET',
      reqHeadersCookie,
      reqAcceptLanguage,
    });
    
    const statusCode = resultObj.statusCode;
    const initialPropsObj = resultObj.data;
    
    // console.log(`
    //   ----- resultObj -----\n
    //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // --------------------------------------------------
    //   ログインしている場合はログアウトページにリダイレクト
    // --------------------------------------------------
    
    const login = lodashGet(resultObj, ['data', 'login'], false);
    
    if (login) {
      
      const isServer = !process.browser;
      
      if (isServer && res) {
        res.writeHead(302, {
          Location: '/logout'
        });
        res.end();
      } else {
        Router.replace('/logout');
      }
      
    }
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return { pathname, initialPropsObj, statusCode };
    
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
    
    
    try {
      
      
      // --------------------------------------------------
      //   Errorの場合
      // --------------------------------------------------
      
      if (props.statusCode !== 200) {
        throw new Error();
      }
      
      
      // --------------------------------------------------
      //   Store
      // --------------------------------------------------
      
      const stores = initStoreIndex({});
      this.storeLoginAccount = initStoreLoginAccount({});
      
      
      // --------------------------------------------------
      //   Update Data - Pathname
      // --------------------------------------------------
      
      stores.layout.replacePathname(props.pathname);
      
      
      // --------------------------------------------------
      //   Update Data - Header Navigation Main
      // --------------------------------------------------
      
      const headerNavMainArr = [
        {
          name: 'ログイン',
          href: '/login',
          as: '/login',
        },
        {
          name: 'アカウント作成',
          href: '/login/account',
          as: '/login/account',
        }
      ];
      
      stores.layout.replaceHeaderNavMainArr(headerNavMainArr);
      
      
    } catch (e) {
      this.error = true;
    }
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   componentDidMount
  // --------------------------------------------------
  
  componentDidMount() {
    
    
    // --------------------------------------------------
    //   Initialize the ReCaptcha
    //   https://github.com/codeep/react-recaptcha-v3
    // --------------------------------------------------
    
    loadReCaptcha(process.env.RECAPTCHA_SITE_KEY);
    
    
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
      <Provider storeLoginAccount={this.storeLoginAccount}>
        
        <Layout>
          
          
          {/* Head 内部のタグをここで追記する */}
          <Head>
            <title>アカウント作成 - Game Users</title>
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
            
            
            {/* reCAPTCHA */}
            <ReCaptcha
              ref={ref => this.recaptcha = ref}
              sitekey={process.env.RECAPTCHA_SITE_KEY}
              action='createAccount'
              verifyCallback={(response) => this.storeLoginAccount.handleRecaptchaResponse({
                response,
                ref: this.recaptcha,
              })}
            />
            
            
            {/* アカウント作成 */}
            <FormCreateAccount />
            
            
          </div>
          
          
        </Layout>
        
      </Provider>
    );
  }
}