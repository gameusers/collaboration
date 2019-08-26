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
import { observer, Provider } from 'mobx-react';
import styled from 'styled-components';
import lodashGet from 'lodash/get';


// ---------------------------------------------
//   Locales
// ---------------------------------------------

// import { IntlProvider, addLocaleData } from 'react-intl';
// import en from 'react-intl/locale-data/en';
// import ja from 'react-intl/locale-data/ja';
// addLocaleData([...en, ...ja]);

import { locale } from '../../app/@locales/locale';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { fetchWrapper } from '../../app/@modules/fetch';


// ---------------------------------------------
//   Stores
// ---------------------------------------------

import initStoreRoot from '../../app/@stores/root';
import initStorePlayerSettings from '../../app/ur/settings/stores/store';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Layout from '../../app/common/layout/components/layout';
import FormAccount from '../../app/ur/settings/components/form-account';
import FormEmail from '../../app/ur/settings/components/form-email';
import FormPage from '../../app/ur/settings/components/form-page';


// ---------------------------------------------
//   Material UI を Next.js で利用するため
// ---------------------------------------------

import withRoot from '../../lib/material-ui/withRoot';




// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const Container = styled.div`
  padding: 0 10px 18px 10px;
  
  @media screen and (max-width: 480px) {
    padding: 0 0 18px 0;
  }
`;




// --------------------------------------------------
//   Class
//   URL: http://dev-1.gameusers.org:8080/ur/***/settings
// --------------------------------------------------

@observer
class Component extends React.Component {
  
  
  // --------------------------------------------------
  //   getInitialProps
  // --------------------------------------------------
  
  static async getInitialProps({ req, res, query }) {
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const isServer = !process.browser;
    const reqHeadersCookie = lodashGet(req, ['headers', 'cookie'], '');
    const reqAcceptLanguage = lodashGet(req, ['headers', 'accept-language'], '');
    const userID = query.userID;
    const pathname = `/ur/${userID}/settings`;
    
    
    // --------------------------------------------------
    //   Fetch
    // --------------------------------------------------
    
    const resultObj = await fetchWrapper({
      urlApi: encodeURI(`${process.env.URL_API}/v1/initial-props/ur/settings`),
      methodType: 'GET',
      reqHeadersCookie,
      reqAcceptLanguage,
    });
    
    let statusCode = resultObj.statusCode;
    const initialPropsObj = resultObj.data;
    
    
    // --------------------------------------------------
    //   Check Access Right
    // --------------------------------------------------
    
    const myPlayerID = lodashGet(initialPropsObj, ['loginUsersObj', 'userID'], '');
    
    if (userID !== myPlayerID) {
      statusCode = 403;
    }
    
    // console.log(`
    //   ----- initialPropsObj.usersObj -----\n
    //   ${util.inspect(initialPropsObj.usersObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   userID: {green ${userID}}
    //   myPlayerID: {green ${myPlayerID}}
    // `);
    
    
    return { isServer, pathname, initialPropsObj, statusCode, reqAcceptLanguage, userID };
    
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
      
      const argumentsObj = {
        isServer: props.isServer,
        pathname: props.pathname,
      };
      
      this.stores = initStoreRoot(argumentsObj);
      this.stores.pathname = props.pathname;
      this.stores.playerSettings = initStorePlayerSettings(argumentsObj, this.stores);
      
      
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
      
      
      // --------------------------------------------------
      //   Update
      // --------------------------------------------------
      
      const loginID = lodashGet(props, ['initialPropsObj', 'usersObj', 'loginID'], '');
      const emailSecret = lodashGet(props, ['initialPropsObj', 'usersObj', 'emailObj', 'secret'], '');
      const emailConfirmation = lodashGet(props, ['initialPropsObj', 'usersObj', 'emailObj', 'confirmation'], false);
      const userID = lodashGet(props, ['initialPropsObj', 'usersObj', 'userID'], '');
      const pagesArr = lodashGet(props, ['initialPropsObj', 'usersObj', 'pagesArr'], '');
      
      this.stores.playerSettings.handleEdit({ pathArr: ['loginID'], value: loginID });
      this.stores.playerSettings.handleEdit({ pathArr: ['emailObj', 'confirmation'], value: emailConfirmation });
      this.stores.playerSettings.handleEdit({ pathArr: ['emailObj', 'secret'], value: emailSecret });
      this.stores.playerSettings.handleEdit({ pathArr: ['userID'], value: userID });
      this.stores.playerSettings.handleEdit({ pathArr: ['pagesArr'], value: pagesArr });
      
      
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
    //   Props
    // --------------------------------------------------
    
    // const stores = this.stores;
    
    
    // --------------------------------------------------
    //   Header Navigation
    // --------------------------------------------------
    
    const headerNavMainArr = [
      {
        name: 'プロフィール',
        href: `/ur/user?userID=${this.props.userID}`,
        as: `/ur/${this.props.userID}`,
      },
      {
        name: '設定',
        href: `/ur/settings?userID=${this.props.userID}`,
        as: `/ur/${this.props.userID}/settings`,
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
              <title>設定 - Game Users</title>
            </Head>
            
            
            {/* Contents */}
            <Container>
              
              
              {/* プレイヤーページ設定 */}
              <FormPage />
              
              
              {/* アカウント編集 */}
              <FormAccount />
              
              
              {/* E-Mail */}
              <FormEmail />
              
              
            </Container>
            
          </Layout>
          
        </IntlProvider>
        
      </Provider>
    );
  }
}

export default withRoot(Component);