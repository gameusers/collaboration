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
import lodashGet from 'lodash/get';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Locales
// ---------------------------------------------

// import { locale } from '../../app/@locales/locale';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { fetchWrapper } from '../../../app/@modules/fetch';
import { createCsrfToken } from '../../../app/@modules/csrf';


// ---------------------------------------------
//   Stores
// ---------------------------------------------

import initStoreRoot from '../../../app/@stores/root';
import initStoreUrSettings from '../../../app/ur/settings/stores/store';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Layout from '../../../app/common/layout/components/layout';
import Sidebar from '../../../app/common/layout/components/sidebar';
import Drawer from '../../../app/common/layout/components/drawer';
import FormPage from '../../../app/ur/settings/components/form-page';
import FormAccount from '../../../app/ur/settings/components/form-account';
import FormEmail from '../../../app/ur/settings/components/form-email';




/**
 * ストアを読み込む、または作成する
 * @param {Object} propsObj - ストアに入れる値
 */
const getOrCreateStore = ({ propsObj }) => {
  
  
  // --------------------------------------------------
  //   Stores
  // --------------------------------------------------
  
  initStoreRoot({ propsObj });
  
  const storeUrSettings = initStoreUrSettings({ propsObj });
  
  // console.log(`
  //     ----- storeUrSettings -----\n
  //     ${util.inspect(storeUrSettings, { colors: true, depth: null })}\n
  //     --------------------\n
  //   `);
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return {
    
    storeUrSettings,
    
  };
  
  
};




// --------------------------------------------------
//   Class
//   URL: http://dev-1.gameusers.org:8080/ur/***/settings
// --------------------------------------------------

@observer
export default class extends React.Component {
  
  
  // --------------------------------------------------
  //   getInitialProps
  // --------------------------------------------------
  
  static async getInitialProps({ req, res, query, datetimeCurrent }) {
    
    
    // --------------------------------------------------
    //   CSRF
    // --------------------------------------------------
    
    createCsrfToken(req, res);
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const reqHeadersCookie = lodashGet(req, ['headers', 'cookie'], '');
    const reqAcceptLanguage = lodashGet(req, ['headers', 'accept-language'], '');
    const userID = query.userID;
    const pathname = `/ur/${userID}/settings`;
    
    
    // ---------------------------------------------
    //   FormData
    // ---------------------------------------------
    
    const formDataObj = {
      
      userID,
      
    };
    
    
    // --------------------------------------------------
    //   Fetch
    // --------------------------------------------------
    
    const resultObj = await fetchWrapper({
      urlApi: encodeURI(`${process.env.URL_API}/v2/ur/${userID}/settings`),
      methodType: 'POST',
      reqHeadersCookie,
      reqAcceptLanguage,
      formData: JSON.stringify(formDataObj),
    });
    
    const statusCode = lodashGet(resultObj, ['statusCode'], 400);
    let propsObj = lodashGet(resultObj, ['data'], {});
    // const login = lodashGet(resultObj, ['data', 'login'], false);
    
    // const cardPlayersObj = lodashGet(resultObj, ['data', 'cardPlayersObj'], {});
    const pagesArr = lodashGet(resultObj, ['data', 'pagesArr'], []);
    
    const title = `ユーザー設定`;
    
    
    // --------------------------------------------------
    //   Stores
    // --------------------------------------------------
    
    const headerNavMainArr = [
      {
        name: 'プロフィール',
        href: `/ur/user?userID=${userID}`,
        as: `/ur/${userID}`,
      },
      {
        name: '設定',
        href: `/ur/settings?userID=${userID}`,
        as: `/ur/${userID}/settings`,
      }
    ];
    
    propsObj = { ...propsObj, datetimeCurrent, pathname, headerNavMainArr, pagesArr };
    
    const storesObj = getOrCreateStore({ propsObj });
    
    
    // --------------------------------------------------
    //   Fetch
    // --------------------------------------------------
    
    // const resultObj = await fetchWrapper({
    //   urlApi: encodeURI(`${process.env.URL_API}/v1/initial-props/ur/settings`),
    //   methodType: 'GET',
    //   reqHeadersCookie,
    //   reqAcceptLanguage,
    // });
    
    // let statusCode = resultObj.statusCode;
    // const initialPropsObj = resultObj.data;
    
    
    // // --------------------------------------------------
    // //   Check Access Right
    // // --------------------------------------------------
    
    // const myPlayerID = lodashGet(initialPropsObj, ['loginUsersObj', 'userID'], '');
    
    // if (userID !== myPlayerID) {
    //   statusCode = 403;
    // }
    
    // console.log(`
    //   ----- initialPropsObj.usersObj -----\n
    //   ${util.inspect(initialPropsObj.usersObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   userID: {green ${userID}}
    //   myPlayerID: {green ${myPlayerID}}
    // `);
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   userID: {green ${userID}}
    //   pathname: {green ${pathname}}
    // `);
    
    console.log(`
      ----- resultObj -----\n
      ${util.inspect(resultObj, { colors: true, depth: null })}\n
      --------------------\n
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
      title,
      storesObj,
      propsObj,
      
    };
    
    
    // return { isServer, pathname, initialPropsObj, statusCode, reqAcceptLanguage, userID };
    
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
      
      if (this.props.statusCode !== 200) {
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
      
      
      
      
      // // --------------------------------------------------
      // //   Update
      // // --------------------------------------------------
      
      // const loginID = lodashGet(props, ['initialPropsObj', 'usersObj', 'loginID'], '');
      // const emailSecret = lodashGet(props, ['initialPropsObj', 'usersObj', 'emailObj', 'secret'], '');
      // const emailConfirmation = lodashGet(props, ['initialPropsObj', 'usersObj', 'emailObj', 'confirmation'], false);
      // const userID = lodashGet(props, ['initialPropsObj', 'usersObj', 'userID'], '');
      // const pagesArr = lodashGet(props, ['initialPropsObj', 'usersObj', 'pagesArr'], '');
      
      // this.stores.playerSettings.handleEdit({ pathArr: ['loginID'], value: loginID });
      // this.stores.playerSettings.handleEdit({ pathArr: ['emailObj', 'confirmation'], value: emailConfirmation });
      // this.stores.playerSettings.handleEdit({ pathArr: ['emailObj', 'secret'], value: emailSecret });
      // this.stores.playerSettings.handleEdit({ pathArr: ['userID'], value: userID });
      // this.stores.playerSettings.handleEdit({ pathArr: ['pagesArr'], value: pagesArr });
      
      
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
      <Provider { ...this.storesObj }>
        
        <Layout>
          
          
          {/* Head 内部のタグをここで追記する */}
          <Head>
            <title>{this.props.title}</title>
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
                  src="/static/img/common/advertisement/300x250.jpg"
                  width="300"
                  height="250"
                />
              </Sidebar>
              
              
              Sidebar
              
            </div>
            
            
            
            
            {/* Main */}
            <div
              css={css`
                max-width: 800px;
                
                @media screen and (max-width: 947px) {
                  max-width: none;
                }
              `}
            >
              
              
              {/* プレイヤーページ設定 */}
              <FormPage />
              
              
              {/* アカウント編集 */}
              {/*<FormAccount />*/}
              
              
              {/* E-Mail */}
              {/*<FormEmail />*/}
              
              
            </div>
            
            
          </div>
          
          
          
          
          {/* Drawer */}
          <Drawer>
            Drawer
          </Drawer>
          
          
          
          
        </Layout>
        
      </Provider>
    );
    
  }
  
}