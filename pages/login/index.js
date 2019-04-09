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
import Head from 'next/head';
import Router from 'next/router';
import { observer, Provider } from 'mobx-react';
import styled from 'styled-components';
import { loadReCaptcha, ReCaptcha } from 'react-recaptcha-v3';
import lodashGet from 'lodash/get';


// ---------------------------------------------
//   Locales
// ---------------------------------------------

import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import ja from 'react-intl/locale-data/ja';
addLocaleData([...en, ...ja]);

import { locale } from '../../app/@locales/locale';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { fetchWrapper } from '../../app/@modules/fetch';


// ---------------------------------------------
//   Stores
// ---------------------------------------------

import initStoreIndex from '../../app/@stores/index';
import initStoreLoginIndex from '../../app/login/index/stores/store';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Layout from '../../app/common/layout/components/layout';
import FormLogin from '../../app/login/index/components/form-login';


// ---------------------------------------------
//   Material UI を Next.js で利用するため
// ---------------------------------------------

import withRoot from '../../lib/material-ui/withRoot';




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




// --------------------------------------------------
//   Class
//   URL: http://dev-1.gameusers.org:8080/login
// --------------------------------------------------

@observer
class Component extends React.Component {
  
  
  // --------------------------------------------------
  //   getInitialProps
  // --------------------------------------------------
  
  static async getInitialProps({ pathname, req, res }) {
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const isServer = !!req;
    const reqHeadersCookie = lodashGet(req, ['headers', 'cookie'], '');
    const reqAcceptLanguage = lodashGet(req, ['headers', 'accept-language'], '');
    
    
    // --------------------------------------------------
    //   Fetch
    // --------------------------------------------------
    
    const resultObj = await fetchWrapper({
      urlApi: encodeURI(`${process.env.URL_API}/v1/login/initial-props`),
      methodType: 'GET',
      reqHeadersCookie,
      reqAcceptLanguage,
    });
    
    const statusCode = resultObj.statusCode;
    
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
      
      if (isServer && res) {
        res.writeHead(302, {
          Location: '/logout'
        });
        res.end();
      } else {
        Router.replace('/logout');
      }
      
    }
    
    
    return { isServer, pathname, statusCode, reqAcceptLanguage };
    
  }
  
  
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    
    super(props);
    
    
    // --------------------------------------------------
    //   Property / Error 判定用
    // --------------------------------------------------
    
    this.error = false;
    
    
    // --------------------------------------------------
    //   Store
    // --------------------------------------------------
    
    try {
      
      
      // --------------------------------------------------
      //   Errorの場合
      // --------------------------------------------------
      
      if (
        this.props.statusCode !== 200
      ) {
        throw new Error();
      }
      
      
      // --------------------------------------------------
      //   Store
      // --------------------------------------------------
      
      const argumentsObj = {
        isServer: props.isServer,
        pathname: props.pathname,
      };
      
      this.stores = initStoreIndex(argumentsObj);
      this.stores.pathname = props.pathname;
      this.stores.loginIndex = initStoreLoginIndex(argumentsObj, this.stores);
      
      
      // --------------------------------------------------
      //   Locale
      // --------------------------------------------------
      
      if (Object.keys(this.stores.data.localeObj).length === 0) {
        
        const localeObj = locale({
          acceptLanguage: props.reqAcceptLanguage
        });
        
        this.stores.data.replaceLocaleObj(localeObj);
        
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
    //   Props
    // --------------------------------------------------
    
    const stores = this.stores;
    
    
    // --------------------------------------------------
    //   Header Navigation
    // --------------------------------------------------
    
    const headerNavMainArr = [
      {
        name: 'ログイン',
        pathname: '/login'
      },
      {
        name: 'アカウント作成',
        pathname: '/login/account'
      }
    ];
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Provider stores={this.stores}>
        
        <IntlProvider 
          locale={this.stores.data.localeObj.languageArr[0]}
          messages={this.stores.data.localeObj.dataObj}
        >
          
          <Layout headerNavMainArr={headerNavMainArr}>
            
            
            {/* Head 内部のタグをここで追記する */}
            <Head>
              <title>ログイン - ID & パスワード - Game Users</title>
            </Head>
            
            
            {/* Contents */}
            <Container>
              
              
              {/* reCAPTCHA */}
              <ReCaptcha
                ref={ref => this.recaptcha = ref}
                sitekey={process.env.RECAPTCHA_SITE_KEY}
                action='login'
                verifyCallback={(response) => stores.loginIndex.handleRecaptchaResponse({
                  response,
                  ref: this.recaptcha,
                })}
              />
              
              
              {/* ログイン */}
              <FormLogin />
              
              
            </Container>
            
          </Layout>
          
        </IntlProvider>
        
      </Provider>
    );
  }
}

export default withRoot(Component);