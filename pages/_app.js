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
import App, { Container } from 'next/app';
import Head from 'next/head';
import { observer, Provider } from 'mobx-react';
import lodashGet from 'lodash/get';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import { ThemeProvider } from '@material-ui/styles';
import theme from '../app/@css/material-ui/theme';


// ---------------------------------------------
//   Locales
// ---------------------------------------------

import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import ja from 'react-intl/locale-data/ja';
addLocaleData([...en, ...ja]);

import { locale } from '../app/@locales/locale';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { fetchWrapper } from '../app/@modules/fetch';


// ---------------------------------------------
//   Stores
// ---------------------------------------------

import initStoreIndex from '../app/@stores/index';




// --------------------------------------------------
//   Class
// --------------------------------------------------

@observer
class MyApp extends App {
  
  
  // --------------------------------------------------
  //   通常のページのgetInitialPropsとは違っています
  //   https://spectrum.chat/next-js/general/getinitialprops-confusion-in-the-docs-about-parameters~07e9ab0e-0fae-43a8-8bc0-350c79e921a3
  // --------------------------------------------------
  
  // static async getInitialProps(appContext) {
    
  //   // console.log('_app.js / getInitialProps');
    
    
  //   // --------------------------------------------------
  //   //   storesをctxの中に入れて、各ページのgetInitialPropsで読み込めるようにする
  //   //   参考：https://github.com/zeit/next.js/blob/canary/examples/with-mobx/pages/_app.js
  //   // --------------------------------------------------
    
  //   const stores = initStoreIndex({});
  //   appContext.ctx.stores = stores;
    
  //   // console.log(`
  //   //   ----- _app.js / stores -----\n
  //   //   ${util.inspect(stores, { colors: true, depth: null })}\n
  //   //   --------------------\n
  //   // `);
    
  //   // --------------------------------------------------
  //   //   pageProps
  //   // --------------------------------------------------
    
  //   let appProps = await App.getInitialProps(appContext);
    
  //   // let pageProps = {};

  //   // if (Component.getInitialProps) {
  //   //   pageProps = await Component.getInitialProps(ctx);
  //   // }
    
  //   const ctx = appProps.ctx;
    
    
  //   // --------------------------------------------------
  //   //   Property
  //   // --------------------------------------------------
    
  //   const pathname = lodashGet(ctx, ['pathname'], '');
  //   const reqHeadersCookie = lodashGet(ctx, ['req', 'headers', 'cookie'], '');
  //   const reqAcceptLanguage = lodashGet(ctx, ['req', 'headers', 'accept-language'], '');
    
    
  //   // --------------------------------------------------
  //   //   Fetch
  //   // --------------------------------------------------
    
  //   const resultObj = await fetchWrapper({
  //     urlApi: encodeURI(`${process.env.URL_API}/v1/initial-props/common`),
  //     methodType: 'GET',
  //     reqHeadersCookie,
  //     reqAcceptLanguage,
  //   });
    
  //   const statusCode = resultObj.statusCode;
  //   const initialPropsObj = resultObj.data;
    
    
  //   // console.log(`
  //   //   ----- resultObj -----\n
  //   //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
  //   //   --------------------\n
  //   // `);
    
  //   // console.log(chalk`
  //   //   pathname: {green ${pathname}}
  //   //   reqHeadersCookie: {green ${reqHeadersCookie}}
  //   //   reqAcceptLanguage: {green ${reqAcceptLanguage}}
  //   // `);
    
    
    
  //   return { ...appProps, pathname, stores, initialPropsObj, statusCode, reqAcceptLanguage };
    
  // }
  
  static async getInitialProps({ Component, ctx }) {
    
    // console.log('_app.js / getInitialProps');
    
    
    // --------------------------------------------------
    //   storesをctxの中に入れて、各ページのgetInitialPropsで読み込めるようにする
    //   参考：https://github.com/zeit/next.js/blob/canary/examples/with-mobx/pages/_app.js
    // --------------------------------------------------
    
    // const stores = initStoreIndex({});
    // ctx.stores = stores;
    // console.log(`
    //   ----- _app.js / stores -----\n
    //   ${util.inspect(stores, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // --------------------------------------------------
    //   pageProps
    // --------------------------------------------------
    
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const pathname = lodashGet(ctx, ['pathname'], '');
    const reqHeadersCookie = lodashGet(ctx, ['req', 'headers', 'cookie'], '');
    const reqAcceptLanguage = lodashGet(ctx, ['req', 'headers', 'accept-language'], '');
    
    
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
    
    // console.log(chalk`
    //   pathname: {green ${pathname}}
    //   reqHeadersCookie: {green ${reqHeadersCookie}}
    //   reqAcceptLanguage: {green ${reqAcceptLanguage}}
    // `);
    
    
    
    return { pageProps, pathname, initialPropsObj, statusCode, reqAcceptLanguage };
    
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
      
      // const isServer = !process.browser;
      
      // this.stores = isServer ? props.stores : initStoreIndex({});
      
      this.stores = initStoreIndex({});
      this.stores.pathname = props.pathname;
      
      // this.stores.layout.increment();
      // this.stores.layout.increment();
      
      
      // --------------------------------------------------
      //   Update Data - Locale
      // --------------------------------------------------
      
      if (Object.keys(this.stores.data.localeObj).length === 0) {
        
        const localeObj = locale({
          acceptLanguage: props.reqAcceptLanguage
        });
        
        this.stores.data.replaceLocaleObj(localeObj);
        
      }
      
      
      // --------------------------------------------------
      //   Update Data - Header
      // --------------------------------------------------
      
      this.stores.data.replaceHeaderObj(lodashGet(props, ['initialPropsObj', 'headerObj'], {}));
      
      
      // --------------------------------------------------
      //   Update Data - Login User
      // --------------------------------------------------
      
      this.stores.data.replaceLoginUsersObj(lodashGet(props, ['initialPropsObj', 'loginUsersObj'], {}));
      
      
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
      <Container>
        
        <Head>
          <title>Game Users</title>
        </Head>
        
        
        <Provider stores={this.stores}>
          
          <IntlProvider 
            locale={this.stores.data.localeObj.languageArr[0]}
            messages={this.stores.data.localeObj.dataObj}
          >
          
            <ThemeProvider theme={theme}>
              <Component {...pageProps} />
            </ThemeProvider>
            
          </IntlProvider>
          
        </Provider>
        
      </Container>
    );
  }
  
  
}

export default MyApp;