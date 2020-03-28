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
//   Locales
// ---------------------------------------------

import { locale } from '../../../app/@locales/locale';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { fetchWrapper } from '../../../app/@modules/fetch';
import { createCsrfToken } from '../../../app/@modules/csrf';


// ---------------------------------------------
//   Stores
// ---------------------------------------------

import initStoreRoot from '../../../app/@stores/root';
import initStoreGcCommunity from '../../../app/gc/community/stores/store';
import initStoreCardPlayer from '../../../app/common/card/player/stores/player';
import initStoreForum from '../../../app/common/forum/stores/store';
import initStoreImageAndVideo from '../../../app/common/image-and-video/stores/image-and-video';
import initStoreImageAndVideoForm from '../../../app/common/image-and-video/stores/form';
import initStoreFollow from '../../../app/common/follow/stores/store';
import initStoreGood from '../../../app/common/good/stores/store';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Layout from '../../../app/common/layout/components/layout';
import Sidebar from '../../../app/common/layout/components/sidebar';
import Drawer from '../../../app/common/layout/components/drawer';
import ForumNavigation from '../../../app/common/forum/components/navigation';
import ForumThread from '../../../app/common/forum/components/thread';
import VideoModal from '../../../app/common/image-and-video/components/video-modal';
import CardPlayerDialog from '../../../app/common/card/player/components/dialog';




/**
 * ストアを読み込む、または作成する
 * @param {Object} propsObj - ストアに入れる値
 */
const getOrCreateStore = ({ propsObj }) => {
  
  
  // --------------------------------------------------
  //   Stores
  // --------------------------------------------------
  
  initStoreRoot({ propsObj });
  
  const storeGcCommunity = initStoreGcCommunity({});
  const storeCardPlayer = initStoreCardPlayer({});
  const storeForum = initStoreForum({ propsObj });
  const storeImageAndVideo = initStoreImageAndVideo({});
  const storeImageAndVideoForm = initStoreImageAndVideoForm({});
  const storeFollow = initStoreFollow({});
  const storeGood = initStoreGood({});
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return {
    
    storeGcCommunity,
    storeCardPlayer,
    storeForum,
    storeImageAndVideo,
    storeImageAndVideoForm,
    storeFollow,
    storeGood,
    
  };
  
  
};




// --------------------------------------------------
//   Class
//   URL: https://dev-1.gameusers.org/gc/***
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
    //   Cookie & Accept Language
    // --------------------------------------------------
    
    const reqHeadersCookie = lodashGet(req, ['headers', 'cookie'], '');
    const reqAcceptLanguage = lodashGet(req, ['headers', 'accept-language'], '');
    
    const stores = initStoreRoot({
      
      propsObj: {
        cookie: reqHeadersCookie
      }
      
    });
    
    
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const urlID = query.urlID;
    const pathname = `/gc/${urlID}`;
    const temporaryDataID = `/gc/${urlID}`;
    
    
    // --------------------------------------------------
    //   Get Cookie Data & Temporary Data for Fetch
    // --------------------------------------------------
    
    const threadListPage = stores.data.getTemporaryData({ pathname: temporaryDataID, key: 'threadListPage' });
    const threadListLimit = stores.data.getCookie({ key: 'threadListLimit' });
    
    const threadPage = stores.data.getTemporaryData({ pathname: temporaryDataID, key: 'threadPage' });
    const threadLimit = stores.data.getCookie({ key: 'threadLimit' });
    const commentLimit = stores.data.getCookie({ key: 'commentLimit' });
    const replyLimit = stores.data.getCookie({ key: 'replyLimit' });
    
    
    // --------------------------------------------------
    //   Fetch
    // --------------------------------------------------
    
    const resultObj = await fetchWrapper({
      
      urlApi: encodeURI(`${process.env.URL_API}/v2/gc/${urlID}?threadListPage=${threadListPage}&threadListLimit=${threadListLimit}&threadPage=${threadPage}&threadLimit=${threadLimit}&commentLimit=${commentLimit}&replyLimit=${replyLimit}`),
      methodType: 'GET',
      reqHeadersCookie,
      reqAcceptLanguage,
      
    });
    
    const statusCode = lodashGet(resultObj, ['statusCode'], 400);
    let propsObj = lodashGet(resultObj, ['data'], {});
    
    const gameCommunities_id = lodashGet(resultObj, ['data', 'gameCommunityObj', '_id'], '');
    const gameName = lodashGet(resultObj, ['data', 'headerObj', 'name'], '');
    const accessLevel = lodashGet(resultObj, ['data', 'accessLevel'], 1);
    
    
    
    
    // --------------------------------------------------
    //   Title
    // --------------------------------------------------
    
    const title = `${gameName}`;
    
    
    
    
    // --------------------------------------------------
    //   Stores
    // --------------------------------------------------
    
    const headerNavMainArr = [
      {
        name: 'トップ',
        href: `/gc/[urlID]/index?urlID=${urlID}`,
        as: `/gc/${urlID}`,
      },
      {
        name: '募集',
        href: `/gc/[urlID]/rec?urlID=${urlID}`,
        as: `/gc/${urlID}/rec`,
      },
      {
        name: 'フォロワー',
        href: '/',
        as: '/',
        // href: `/gc/[urlID]/followers?urlID=${urlID}`,
        // as: `/gc/${urlID}/followers`,
      }
    ];
    
    // if (accessLevel === 100) {
    //   headerNavMainArr.push(
    //     {
    //       name: '設定',
    //       href: `/gc/[urlID]/settings?urlID=${urlID}`,
    //       as: `/gc/${urlID}/settings`,
    //     }
    //   );
    // }
    
    propsObj = { ...propsObj, datetimeCurrent, pathname, headerNavMainArr, gameCommunities_id };
    
    const storesObj = getOrCreateStore({ propsObj });
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /pages/gc/[urlID]/index.js
    // `);
    
    // console.log(chalk`
    //   threadListLimit: {green ${threadListLimit}}
    //   threadLimit: {green ${threadLimit}}
    //   commentLimit: {green ${commentLimit}}
    //   replyLimit: {green ${replyLimit}}
      
    //   threadListPage: {green ${threadListPage}}
    //   threadPage: {green ${threadPage}}
    // `);
    
    // console.log(`
    //   ----- reqHeadersCookie -----\n
    //   ${util.inspect(reqHeadersCookie, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   reqAcceptLanguage: {green ${reqAcceptLanguage}}
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
      
      statusCode,
      reqAcceptLanguage,
      temporaryDataID,
      urlID,
      gameCommunities_id,
      title,
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
    
    
    try {
      
      
      // --------------------------------------------------
      //   Error
      // --------------------------------------------------
      
      if (
        this.props.statusCode !== 200
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
    //   Setting
    // --------------------------------------------------
    
    // const settingAnonymity = lodashGet(this.props, ['propsObj', 'userCommunityObj', 'anonymity'], false);
    // const accessRightRead = lodashGet(this.props, ['propsObj', 'accessRightRead'], false);
    
    
    // --------------------------------------------------
    //   About
    // --------------------------------------------------
    
    // const description = lodashGet(this.props, ['propsObj', 'userCommunityObj', 'description'], '');
    // const communityType = lodashGet(this.props, ['propsObj', 'userCommunityObj', 'communityType'], 'open');
    // const anonymity = lodashGet(this.props, ['propsObj', 'userCommunityObj', 'anonymity'], true);
    // const createdDate = lodashGet(this.props, ['propsObj', 'headerObj', 'createdDate'], '');
    // const approval = lodashGet(this.props, ['propsObj', 'headerObj', 'approval'], false);
    // const followedCount = lodashGet(this.props, ['propsObj', 'headerObj', 'followedCount'], 1);
    // const gamesArr = lodashGet(this.props, ['propsObj', 'headerObj', 'gamesArr'], []);
    
    
    
    
    // console.log(`
    //   ----- this.props -----\n
    //   ${util.inspect(this.props, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   createdDate: {green ${createdDate}}
    //   description: {green ${description}}
    //   followedCount: {green ${followedCount}}
    // `);
    
    // console.log(`
    //   ----- gamesArr -----\n
    //   ${util.inspect(gamesArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   this.props.settingAnonymity: {green ${this.props.settingAnonymity}}
    //   this.settingAnonymity: {green ${this.settingAnonymity}}
    //   this.props.userCommunities_id: {green ${this.props.userCommunities_id}}
    // `);
    
    
    
    
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
                  temporaryDataID={this.props.temporaryDataID}
                  urlID={this.props.urlID}
                  gameCommunities_id={this.props.gameCommunities_id}
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
                  temporaryDataID={this.props.temporaryDataID}
                  urlID={this.props.urlID}
                  gameCommunities_id={this.props.gameCommunities_id}
                  settingAnonymity={true}
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