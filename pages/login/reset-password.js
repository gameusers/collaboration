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

import { fetchWrapper } from '../../app/@modules/fetch';
import { createCsrfToken } from '../../app/@modules/csrf';


// ---------------------------------------------
//   Stores
// ---------------------------------------------

import initStoreRoot from '../../app/@stores/root';
import initStoreLoginResetPassword from '../../app/login/reset-password/stores/store';
import initStoreFollow from '../../app/common/follow/stores/store';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Layout from '../../app/common/layout/components/layout';
import Sidebar from '../../app/common/layout/components/sidebar';
import FormResetPassword from '../../app/login/reset-password/components/form-reset-password';




/**
 * ストアを読み込む、または作成する
 * @param {Object} propsObj - ストアに入れる値
 */
const getOrCreateStore = ({ propsObj }) => {
  
  
  // --------------------------------------------------
  //   Stores
  // --------------------------------------------------
  
  initStoreRoot({ propsObj });
  
  const storeLoginResetPassword = initStoreLoginResetPassword({});
  const storeFollow = initStoreFollow({});
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return {
    
    storeLoginResetPassword,
    storeFollow,
    
  };
  
  
};




// --------------------------------------------------
//   Class
//   URL: http://dev-1.gameusers.org:8080/login/reset-password
// --------------------------------------------------

@observer
export default class extends React.Component {
  
  
  // --------------------------------------------------
  //   getInitialProps
  // --------------------------------------------------
  
  static async getInitialProps({ req, res, datetimeCurrent }) {
    
    
    // --------------------------------------------------
    //   CSRF
    // --------------------------------------------------
    
    createCsrfToken(req, res);
    
    
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const reqHeadersCookie = lodashGet(req, ['headers', 'cookie'], '');
    const reqAcceptLanguage = lodashGet(req, ['headers', 'accept-language'], '');
    const pathname = `/login/reset-password`;
    
    
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
    const login = lodashGet(resultObj, ['data', 'login'], false);
    
    
    
    
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
    //   Stores
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
    
    propsObj = { ...propsObj, datetimeCurrent, pathname, headerNavMainArr };
    
    const storesObj = getOrCreateStore({ propsObj });
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return { 
      
      statusCode,
      reqAcceptLanguage,
      storesObj,
      propsObj,
      
    };
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    
    
    // --------------------------------------------------
    //   super
    // --------------------------------------------------
    
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
      
      if (props.statusCode !== 200) {
        throw new Error();
      }
      
      
      // --------------------------------------------------
      //   Stores
      // --------------------------------------------------
      
      const isServer = !process.browser;
      
      if (isServer) {
        this.storesObj = props.storesObj;
      } else {
        this.storesObj = getOrCreateStore({ propsObj: props.propsObj });
      }
      
      
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
    
    // if (process.env.NEXT_PUBLIC_VERIFY_RECAPTCHA === '1' && process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
    //   loadReCaptcha(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);
    // }
    
    
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
      <Provider { ...this.storesObj }>
        
        <Layout>
          
          
          {/* Head 内部のタグをここで追記する */}
          <Head>
            <title>パスワード再設定 - Game Users</title>
          </Head>
          
          
          
          
          {/* 2 Column */}
          <div
            css={css`
              display: flex;
              flex-flow: row nowrap;
              justify-content: center;
              margin: 0 auto;
              padding: 16px;
              
              @media screen and (max-width: 947px) {
                display: flex;
                flex-flow: column nowrap;
                padding: 10px 0 10px 0;
              }
            `}
          >
            
            
            {/* Sidebar */}
            <div
              css={css`
                width: 300px;
                margin: 0 16px 0 0;
                
                @media screen and (max-width: 947px) {
                  width: auto;
                  margin: 0 0 16px 0;
                }
              `}
            >
              
              
              <Sidebar>
                <img
                  src="/img/common/advertisement/300x250.jpg"
                  width="300"
                  height="250"
                />
              </Sidebar>
              
              
              Sidebar
              
            </div>
            
            
            
            
            {/* Main */}
            <div
              css={css`
                width: 100%;
                max-width: 800px;
                
                @media screen and (max-width: 947px) {
                  max-width: none;
                }
              `}
            >
              
              
              {/* reCAPTCHA */}
              {/*{(process.env.NEXT_PUBLIC_VERIFY_RECAPTCHA === '1' && process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) &&
                <ReCaptcha
                  ref={ref => this.recaptcha = ref}
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                  action='createAccount'
                  verifyCallback={(response) => this.storesObj.storeLoginResetPassword.handleRecaptchaResponse({
                    response,
                    ref: this.recaptcha,
                  })}
                />
              }*/}
              
              
              {/* Create Account */}
              <FormResetPassword />
              
              
            </div>
            
            
          </div>
          
          
        </Layout>
        
      </Provider>
    );
    
  }
  
}