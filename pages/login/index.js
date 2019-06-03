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

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Stores
// ---------------------------------------------

import initStoreRoot from '../../app/@stores/root';
import initStoreLoginIndex from '../../app/login/index/stores/store';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Layout from '../../app/common/layout/components/layout';
import FormLogin from '../../app/login/index/components/form-login';




// --------------------------------------------------
//   Class
//   URL: http://dev-1.gameusers.org:8080/login
// --------------------------------------------------

@observer
export default class extends React.Component {
  
  
  // --------------------------------------------------
  //   getInitialProps
  // --------------------------------------------------
  
  static async getInitialProps({ pathname, req, res, login }) {
    
    
    // --------------------------------------------------
    //   ログインしている場合はログアウトページにリダイレクト
    // --------------------------------------------------
    
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
    
    
    try {
      
      
      // --------------------------------------------------
      //   Error
      // --------------------------------------------------
      
      if (props.statusCode !== 200) {
        throw new Error();
      }
      
      
      // --------------------------------------------------
      //   Store
      // --------------------------------------------------
      
      const stores = initStoreRoot({});
      this.storeLoginIndex = initStoreLoginIndex({});
      
      
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
      <Provider storeLoginIndex={this.storeLoginIndex}>
        
        <Layout>
          
          
          {/* Head 内部のタグをここで追記する */}
          <Head>
            <title>ログイン - Game Users</title>
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
              action='login'
              verifyCallback={(response) => this.storeLoginIndex.handleRecaptchaResponse({
                response,
                ref: this.recaptcha,
              })}
            />
            
            
            {/* Login */}
            <FormLogin />
            
            
          </div>
          
          
        </Layout>
        
      </Provider>
    );
    
  }
  
}