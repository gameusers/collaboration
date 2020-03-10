// --------------------------------------------------
//   _app.jsについて：https://github.com/zeit/next.js#custom-app
//   日本語の記事：https://qiita.com/tetsutaroendo/items/c7171286137d963cdecf
//   
//   Next.jsでMaterial UIを利用する場合の_app.js
//   参考：https://github.com/mui-org/material-ui/blob/master/examples/nextjs/pages/_app.js
// --------------------------------------------------

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
import App from 'next/app';
import Head from 'next/head';
import { observer, Provider } from 'mobx-react';
import moment from 'moment';
import lodashGet from 'lodash/get';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import { ThemeProvider } from '@material-ui/styles';
import theme from '../app/@css/material-ui/theme';


// ---------------------------------------------
//   Locales
// ---------------------------------------------

import { IntlProvider } from 'react-intl';
import { locale } from '../app/@locales/locale';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

// import { fetchWrapper } from '../app/@modules/fetch';


// ---------------------------------------------
//   Stores
// ---------------------------------------------

import initStoreRoot from '../app/@stores/root';


// ---------------------------------------------
//   CSS
// ---------------------------------------------

import '../app/@css/reset.css';
import 'react-id-swiper/src/styles/css/swiper.css';
import 'rc-pagination/assets/index.css';
import 'react-modal-video/css/modal-video.min.css';
import 'nprogress/nprogress.css';
import '../app/@css/style.css';




// --------------------------------------------------
//   Class
// --------------------------------------------------

@observer
class MyApp extends App {
  
  static async getInitialProps({ Component, ctx, query }) {
    
    
    // const isServer = !process.browser;
    
    // if (isServer) {
      
    //   console.log('_app.js / Server: getInitialProps');
      
    // } else {
      
    //   console.log('_app.js / Client: getInitialProps');
      
    // }
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const reqHeadersCookie = lodashGet(ctx, ['req', 'headers', 'cookie'], '');
    const reqAcceptLanguage = lodashGet(ctx, ['req', 'headers', 'accept-language'], '');
    
    
    // --------------------------------------------------
    //   Stores
    // --------------------------------------------------
    
    // Set Cookie Data
    const propsObj = {
      cookie: reqHeadersCookie
    };
    
    const stores = initStoreRoot({ propsObj });
    
    
    // --------------------------------------------------
    //   Data - Locale
    // --------------------------------------------------
    
    if (Object.keys(stores.data.localeObj).length === 0) {
      
      const localeObj = locale({
        acceptLanguage: reqAcceptLanguage
      });
      
      stores.data.replaceLocaleObj(localeObj);
      
    }
    
    
    // --------------------------------------------------
    //   Datetime Current
    //   サーバー側とクライアント側の日時の表示に差が生まれてしまう問題を解決するためにctxを利用する
    //   サーバー側でctxの中に入れた値は、クライアント側でも利用できるようになる
    //   これによってアクセス日時（20分前など）の表示に差が生まれないようにする
    // --------------------------------------------------
    
    ctx.datetimeCurrent = moment().toISOString();
    
    
    // --------------------------------------------------
    //   pageProps
    // --------------------------------------------------
    
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return { pageProps, reqAcceptLanguage, stores };
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    
    super(props);
    
    
    // const isServer = !process.browser;
    
    // if (isServer) {
      
    //   console.log('_app.js / Server: constructor');
      
    // } else {
      
    //   console.log('_app.js / Client: constructor');
      
    // }
    
    
    
    // --------------------------------------------------
    //   Property / Error Flag
    // --------------------------------------------------
    
    this.error = false;
    
    
    // --------------------------------------------------
    //   Store
    // --------------------------------------------------
    
    try {
      
      
      // --------------------------------------------------
      //   Store
      // --------------------------------------------------
      
      const isServer = !process.browser;
      
      if (isServer) {
        
        this.stores = props.stores;
        
      } else {
        
        this.stores = initStoreRoot({});
        
        
        // --------------------------------------------------
        //   Data - Locale
        // --------------------------------------------------
        
        if (Object.keys(this.stores.data.localeObj).length === 0) {
          
          const localeObj = locale({
            acceptLanguage: props.reqAcceptLanguage
          });
          
          this.stores.data.replaceLocaleObj(localeObj);
          
        }
        
        
      }
      
      
      // --------------------------------------------------
      //   console.log
      // --------------------------------------------------
      
      // console.log(`
      //   ----- props.stores -----\n
      //   ${util.inspect(props.stores, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- this.stores -----\n
      //   ${util.inspect(this.stores, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(chalk`
      //   _app.js / constructor: {green ${lodashGet(props, ['stores', 'layout', 'handleHeaderHeroImageSize'], '')}}
      // `);
      
      
    } catch (e) {
      this.error = true;
    }
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   componentDidMount
  // --------------------------------------------------
  
  componentDidMount() {
    
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
    
    // console.log('_app.js / componentDidMount');
    window.addEventListener('load', this.stores.data.setIntervalDatetimeCurrent);
    
  }
  
  
  
  
  // --------------------------------------------------
  //   componentWillUnmount
  // --------------------------------------------------
  
  componentWillUnmount() {
    window.removeEventListener('load', this.stores.data.setIntervalDatetimeCurrent);
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
    
    const { Component, pageProps } = this.props;
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        
        <Head>
          <title>Game Users</title>
        </Head>
        
        
        {/* Mobx Provider */}
        <Provider stores={this.stores}>
          
          {/* react-intl(i18n) Provider */}
          <IntlProvider 
            locale={this.stores.data.localeObj.languageArr[0]}
            // locale="en"
            messages={this.stores.data.localeObj.dataObj}
          >
            
            {/* Material UI Theme Provider */}
            <ThemeProvider theme={theme}>
              
              <Component {...pageProps} />
              
            </ThemeProvider>
            
          </IntlProvider>
          
        </Provider>
        
      </React.Fragment>
    );
    
  }
  
}

export default MyApp;