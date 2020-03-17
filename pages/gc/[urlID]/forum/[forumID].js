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
import initStoreUcCommunity from '../../../../app/uc/community/stores/store';
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
 * @param {Object} propsObj - ストアに入れる値
 */
const getOrCreateStore = ({ propsObj }) => {
  
  
  // --------------------------------------------------
  //   Stores
  // --------------------------------------------------
  
  initStoreRoot({ propsObj });
  
  const storeUcCommunity = initStoreUcCommunity({});
  const storeCardPlayer = initStoreCardPlayer({});
  const storeForum = initStoreForum({ propsObj });
  const storeImageAndVideo = initStoreImageAndVideo({});
  const storeImageAndVideoForm = initStoreImageAndVideoForm({});
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return {
    
    storeUcCommunity,
    storeCardPlayer,
    storeForum,
    storeImageAndVideo,
    storeImageAndVideoForm,
    
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
  
  static async getInitialProps({ req, res, query, datetimeCurrent }) {
    
    
    // const isServer = !process.browser;
    
    // if (isServer) {
      
    //   console.log('[forumID].js / Server: getInitialProps');
      
    // } else {
      
    //   console.log('[forumID].js / Client: getInitialProps');
      
    // }
    
    
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
    const pathname = `/uc/${userCommunityID}/forum/${forumID}`;
    
    
    // --------------------------------------------------
    //   Fetch
    // --------------------------------------------------
    
    const resultObj = await fetchWrapper({
      urlApi: encodeURI(`${process.env.URL_API}/v2/uc/${userCommunityID}/forum/${forumID}`),
      methodType: 'GET',
      reqHeadersCookie,
      reqAcceptLanguage,
    });
    
    const statusCode = lodashGet(resultObj, ['statusCode'], 400);
    let propsObj = lodashGet(resultObj, ['data'], {});
    // const login = lodashGet(resultObj, ['data', 'login'], false);
    
    const userCommunities_id = lodashGet(resultObj, ['data', 'userCommunityObj', '_id'], '');
    const userCommunityName = lodashGet(resultObj, ['data', 'userCommunityObj', 'name'], '');
    
    const threadDataObj = lodashGet(resultObj, ['data', 'forumThreadsObj', 'dataObj'], {});
    const threadID = Object.keys(threadDataObj)[0];
    const threadName = lodashGet(resultObj, ['data', 'forumThreadsObj', 'dataObj', threadID, 'name'], '');
    
    const title = `${userCommunityName}: ${threadName}`;
    
    
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
    
    propsObj = { ...propsObj, datetimeCurrent, pathname, headerNavMainArr, userCommunities_id };
    
    const storesObj = getOrCreateStore({ propsObj });
    
    
    
    
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
      
      propsObj,
      statusCode,
      reqAcceptLanguage,
      userCommunityID,
      userCommunities_id,
      title,
      storesObj,
      
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
    
    
    // const isServer = !process.browser;
    
    // if (isServer) {
      
    //   console.log('[forumID].js / Server: constructor');
      
    // } else {
      
    //   console.log('[forumID].js / Client: constructor');
      
    // }
    
    
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
    //   Header Title
    // --------------------------------------------------
    
    // const title = this.props.userCommunityName;
    
    
    
    
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