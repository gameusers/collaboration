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
import Link from 'next/link';
import { observer, Provider } from 'mobx-react';
import { Element } from 'react-scroll';
import lodashGet from 'lodash/get';
import lodashHas from 'lodash/has';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { fetchWrapper } from '../../../../app/@modules/fetch';
import { createCsrfToken } from '../../../../app/@modules/csrf';


// ---------------------------------------------
//   Locales
// ---------------------------------------------

const { locale } = require('../../../../app/@locales/locale');


// ---------------------------------------------
//   Stores
// ---------------------------------------------

import initStoreRoot from '../../../../app/@stores/root';
import initStoreUserCommunity from '../../../../app/uc/community/stores/store';
import initStoreCardPlayer from '../../../../app/common/card/player/stores/player';
import initStoreForum from '../../../../app/common/forum/stores/store';
import initStoreImageAndVideo from '../../../../app/common/image-and-video/stores/image-and-video';
import initStoreImageAndVideoForm from '../../../../app/common/image-and-video/stores/form';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Layout from '../../../../app/common/layout/components/layout';
import Sidebar from '../../../../app/common/layout/components/sidebar';
import Drawer from '../../../../app/common/layout/components/drawer';
import ForumNavigation from '../../../../app/common/forum/components/navigation';
import ForumThread from '../../../../app/common/forum/components/thread';
import VideoModal from '../../../../app/common/image-and-video/components/video-modal';
import CardPlayerDialog from '../../../../app/common/card/player/components/dialog';




/**
 * ストアを読み込む、または作成する
 * @param {Object} req - リクエスト
 * @param {Object} res - レスポンス
 */
const getOrCreateStore = ({ initialPropsObj, datetimeCurrent, userCommunityID, pathname }) => {
  
  
  // --------------------------------------------------
  //   Stores
  // --------------------------------------------------
  
  // ---------------------------------------------
  //   layout - Header Navigation Main
  // ---------------------------------------------
  
  const headerNavMainArr = [
    {
      name: 'トップ',
      href: `/uc/community?userCommunityID=${userCommunityID}`,
      as: `/uc/${userCommunityID}`,
    },
    {
      name: '設定',
      href: `/uc/settings?userCommunityID=${userCommunityID}`,
      as: `/uc/${userCommunityID}/settings`,
    }
  ];
  
  const obj = { ...initialPropsObj, datetimeCurrent, pathname, headerNavMainArr };
  
  const stores = initStoreRoot({ initialPropsObj: obj });
  const storeUserCommunity = initStoreUserCommunity({});
  const storeCardPlayer = initStoreCardPlayer({});
  
  
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return {
    
    storeUserCommunity,
    storeCardPlayer,
    
  };
  
  
};




// --------------------------------------------------
//   Class
//   URL: http://dev-1.gameusers.org:8080/uc/***/forum/***
// --------------------------------------------------

@observer
export default class extends React.Component {
  
  
  // --------------------------------------------------
  //   getInitialProps
  // --------------------------------------------------
  
  static async getInitialProps({ req, res, query, login, datetimeCurrent }) {
    
    
    const isServer = !process.browser;
    
    if (isServer) {
      
      console.log('[forumID].js / Server: getInitialProps');
      
    } else {
      
      console.log('[forumID].js / Client: getInitialProps');
      
    }
    
    
    
    
    // --------------------------------------------------
    //   CSRF
    // --------------------------------------------------
    
    createCsrfToken(req, res);
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const reqHeadersCookie = lodashGet(req, ['headers', 'cookie'], '');
    const reqAcceptLanguage = lodashGet(req, ['headers', 'accept-language'], '');
    const userCommunityID = query.userCommunityID;
    const forumID = query.forumID;
    const pathname = `/uc/${userCommunityID}`;
    
    
    // --------------------------------------------------
    //   Fetch
    // --------------------------------------------------
    
    const resultObj = await fetchWrapper({
      urlApi: encodeURI(`${process.env.URL_API}/v2/uc/${userCommunityID}/forum/${forumID}`),
      methodType: 'GET',
      reqHeadersCookie,
      reqAcceptLanguage,
    });
    
    const statusCode = resultObj.statusCode;
    let initialPropsObj = resultObj.data;
    
    const userCommunities_id = lodashGet(resultObj, ['data', 'userCommunityObj', '_id'], '');
    const userCommunityName = lodashGet(resultObj, ['data', 'userCommunityObj', 'name'], '');
    
    
    // --------------------------------------------------
    //   Stores
    // --------------------------------------------------
    
    const headerNavMainArr = [
      {
        name: 'トップ',
        href: `/uc/community?userCommunityID=${userCommunityID}`,
        as: `/uc/${userCommunityID}`,
      },
      {
        name: '設定',
        href: `/uc/settings?userCommunityID=${userCommunityID}`,
        as: `/uc/${userCommunityID}/settings`,
      }
    ];
    
    initialPropsObj = { ...initialPropsObj, datetimeCurrent, pathname, headerNavMainArr };
    
    const storesObj = getOrCreateStore({ initialPropsObj });
    
    
    // --------------------------------------------------
    //   Stores
    // --------------------------------------------------
    
    // const stores = initStoreRoot();
    // const storeUserCommunity = initStoreUserCommunity({});
    // const storeCardPlayer = initStoreCardPlayer({});
    
    
    // --------------------------------------------------
    //   data - Locale
    // --------------------------------------------------
    
    // const localeObj = locale({
    //   acceptLanguage: reqAcceptLanguage
    // });
    
    // stores.data.replaceLocaleObj(localeObj);
    
    
    // --------------------------------------------------
    //   data - Header
    // --------------------------------------------------
    
    // stores.data.replaceHeaderObj(lodashGet(initialPropsObj, ['headerObj'], {}));
    
    
    // // --------------------------------------------------
    // //   data - Login User
    // // --------------------------------------------------
    
    // stores.data.replaceLoginUsersObj(lodashGet(initialPropsObj, ['loginUsersObj'], {}));
    
    
    
    
    // // --------------------------------------------------
    // //   data - Datetime Current
    // // --------------------------------------------------
    
    // stores.data.setDatetimeCurrent(datetimeCurrent);
    
    
    // // --------------------------------------------------
    // //   layout - Pathname
    // // --------------------------------------------------
    
    // stores.layout.replacePathname(pathname);
    
    
    // --------------------------------------------------
    //   Update Data - Header Navigation Main
    // --------------------------------------------------
    
    // const headerNavMainArr = [
    //   {
    //     name: 'トップ2',
    //     href: `/uc/community?userCommunityID=${userCommunityID}`,
    //     as: `/uc/${userCommunityID}`,
    //   },
    //   {
    //     name: '設定2',
    //     href: `/uc/settings?userCommunityID=${userCommunityID}`,
    //     as: `/uc/${userCommunityID}/settings`,
    //   }
    // ];
    
    // stores.layout.replaceHeaderNavMainArr(headerNavMainArr);
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   login: {green ${login}}
    //   datetimeCurrent: {green ${datetimeCurrent}}
    //   userCommunityID: {green ${userCommunityID}}
    //   forumID: {green ${forumID}}
    //   userCommunityName: {green ${userCommunityName}}
    // `);
    
    // console.log(`
    //   ----- resultObj -----\n
    //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return { 
      
      // pathname,
      initialPropsObj,
      statusCode,
      reqAcceptLanguage,
      // userCommunityID,
      userCommunities_id,
      userCommunityName,
      // datetimeCurrent,
      // storeUserCommunity,
      storesObj,
      
    };
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    
    super(props);
    
    
    const isServer = !process.browser;
    
    if (isServer) {
      
      console.log('[forumID].js / Server: constructor');
      
    } else {
      
      console.log('[forumID].js / Client: constructor');
      
    }
    
    
    // --------------------------------------------------
    //   Property / Error Flag
    // --------------------------------------------------
    
    this.error = false;
    
    
    try {
      
      
      // --------------------------------------------------
      //   Error
      // --------------------------------------------------
      
      if (
        this.props.statusCode !== 200 ||
        this.props.userCommunities_id === ''
      ) {
        
        throw new Error();
      }
      
      
      
      
      // --------------------------------------------------
      //   Store
      // --------------------------------------------------
      
      const isServer = !process.browser;
      
      // const stores = initStoreRoot({});
      
      if (isServer) {
        
        this.storesObj = props.storesObj;
        
      } else {
        
        this.storesObj = getOrCreateStore({ initialPropsObj: props.initialPropsObj });
        
        // this.storesObj = getOrCreateStore({ 
          
        //   datetimeCurrent: props.datetimeCurrent, 
        //   userCommunityID: props.userCommunityID,
        //   pathname: props.pathname,
        //   initialPropsObj: props.initialPropsObj,
          
        // });
        
      }
      
      
      // console.log(`
      //   ----- this.storesObj -----\n
      //   ${util.inspect(this.storesObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // this.storesObj = props.storesObj;
      
      // this.storeUserCommunity = props.storeUserCommunity;
      // this.storeCardPlayer = props.storeCardPlayer;
      // this.storeCardPlayer = this.storesObj.storeCardPlayer;
      
      // this.storeUserCommunity = initStoreUserCommunity({});
      // this.storeCardPlayer = initStoreCardPlayer({});
      this.storeForum = initStoreForum({});
      this.storeImageAndVideo = initStoreImageAndVideo({});
      this.storeImageAndVideoForm = initStoreImageAndVideoForm({});
      
      
      
      
      // --------------------------------------------------
      //   Update Data - Datetime Current
      // --------------------------------------------------
      
      // stores.data.setDatetimeCurrent(props.datetimeCurrent);
      
      
      // --------------------------------------------------
      //   Update Data - Pathname
      // --------------------------------------------------
      
      // stores.layout.replacePathname(props.pathname);
      
      
      // --------------------------------------------------
      //   Update Data - Header Navigation Main
      // --------------------------------------------------
      
      // const headerNavMainArr = [
      //   {
      //     name: 'トップ',
      //     href: `/uc/community?userCommunityID=${props.userCommunityID}`,
      //     as: `/uc/${props.userCommunityID}`,
      //   },
      //   {
      //     name: '設定',
      //     href: `/uc/settings?userCommunityID=${props.userCommunityID}`,
      //     as: `/uc/${props.userCommunityID}/settings`,
      //   }
      // ];
      
      // stores.layout.replaceHeaderNavMainArr(headerNavMainArr);
      
      
      
      
      // --------------------------------------------------
      //   Update Data - UpdatedDateObj
      // --------------------------------------------------
      
      this.storeForum.handleEdit({
        pathArr: [props.userCommunities_id, 'updatedDateObj'],
        value: props.initialPropsObj.userCommunityObj.updatedDateObj,
      });
      
      
      // --------------------------------------------------
      //   Update Data - forumThreadsForListObj
      // --------------------------------------------------
      
      if (lodashHas(this.storeForum, ['dataObj', props.userCommunities_id, 'forumThreadsForListObj']) === false) {
        
        this.storeForum.handleEdit({
          pathArr: [props.userCommunities_id, 'forumThreadsForListObj'],
          value: props.initialPropsObj.forumThreadsForListObj,
        });
        
      }
      
      
      // --------------------------------------------------
      //   Update Data - forumObj
      // --------------------------------------------------
      
      this.storeForum.handleEdit({
        pathArr: [props.userCommunities_id, 'forumObj'],
        value: props.initialPropsObj.forumObj,
      });
      
      
      // --------------------------------------------------
      //   Update Data - forumThreadsObj
      // --------------------------------------------------
      
      this.storeForum.handleEdit({
        pathArr: [props.userCommunities_id, 'forumThreadsObj'],
        value: props.initialPropsObj.forumThreadsObj,
      });
      
      
      // --------------------------------------------------
      //   Update Data - forumCommentsObj
      // --------------------------------------------------
      
      this.storeForum.handleEdit({
        pathArr: [props.userCommunities_id, 'forumCommentsObj'],
        value: props.initialPropsObj.forumCommentsObj,
      });
      
      
      // --------------------------------------------------
      //   Update Data - forumRepliesObj
      // --------------------------------------------------
      
      this.storeForum.handleEdit({
        pathArr: [props.userCommunities_id, 'forumRepliesObj'],
        value: props.initialPropsObj.forumRepliesObj,
      });
      
      
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
    
    // const drawerOpen = lodashGet(stores, ['layout', 'drawerOpen'], false);
    // const handleDrawerClose = lodashGet(stores, ['layout', 'handleDrawerClose'], () => {});
    
    
    // --------------------------------------------------
    //   Header Title
    // --------------------------------------------------
    
    const title = this.props.userCommunityName;
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Provider
        { ...this.storesObj }
        // storeUserCommunity={this.storesObj.storeUserCommunity}
        // storeCardPlayer={this.storesObj.storeCardPlayer}
        // storeUserCommunity={this.storeUserCommunity}
        // storeCardPlayer={this.storeCardPlayer}
        storeForum={this.storeForum}
        storeImageAndVideo={this.storeImageAndVideo}
        storeImageAndVideoForm={this.storeImageAndVideoForm}
      >
        
        <Layout>
          
          
          {/* Head 内部のタグをここで追記する */}
          <Head>
            <title>{title}</title>
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
              
              
              {/* フォーラムのナビゲーション */}
              <Sidebar>
                <ForumNavigation
                  userCommunityID={this.props.userCommunityID}
                  userCommunities_id={this.props.userCommunities_id}
                />
              </Sidebar>
              
              
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
              
              
              {/* フォーラム */}
              <Element
                name="forumThreads"
              >
                <ForumThread
                  userCommunityID={this.props.userCommunityID}
                  userCommunities_id={this.props.userCommunities_id}
                  individual={true}
                />
              </Element>
              
            </div>
            
            
          </div>
          
          
          
          
          {/* プレイヤーカードを表示するダイアログ */}
          <CardPlayerDialog />
          
          
          
          
          {/* Drawer */}
          <Drawer>
            Drawer
          </Drawer>
          
          
          
          
          <VideoModal />
          
          
          
        </Layout>
        
      </Provider>
    );
    
  }
  
}