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

import { fetchWrapper } from '../../../app/@modules/fetch';
import { createCsrfToken } from '../../../app/@modules/csrf';


// ---------------------------------------------
//   Stores
// ---------------------------------------------

import initStoreRoot from '../../../app/@stores/root';
import initStoreUserCommunity from '../../../app/uc/community/stores/store';
import initStoreCardPlayer from '../../../app/common/card/player/stores/player';
import initStoreForum from '../../../app/common/forum/stores/store';
import initStoreImageAndVideo from '../../../app/common/image-and-video/stores/image-and-video';
import initStoreImageAndVideoForm from '../../../app/common/image-and-video/stores/form';
import initStoreFollow from '../../../app/common/follow/stores/store';


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
import Abount from '../../../app/uc/community/components/about';




/**
 * ストアを読み込む、または作成する
 * @param {Object} propsObj - ストアに入れる値
 */
const getOrCreateStore = ({ propsObj }) => {
  
  
  // --------------------------------------------------
  //   Stores
  // --------------------------------------------------
  
  initStoreRoot({ propsObj });
  
  const storeUserCommunity = initStoreUserCommunity({});
  const storeCardPlayer = initStoreCardPlayer({});
  const storeForum = initStoreForum({ propsObj });
  const storeImageAndVideo = initStoreImageAndVideo({});
  const storeImageAndVideoForm = initStoreImageAndVideoForm({});
  const storeFollow = initStoreFollow({});
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return {
    
    storeUserCommunity,
    storeCardPlayer,
    storeForum,
    storeImageAndVideo,
    storeImageAndVideoForm,
    storeFollow,
    
  };
  
  
};




// --------------------------------------------------
//   Class
//   URL: http://dev-1.gameusers.org:8080/uc/***
// --------------------------------------------------

@observer
export default class extends React.Component {
  
  
  // --------------------------------------------------
  //   getInitialProps
  // --------------------------------------------------
  
  static async getInitialProps({ req, res, query, datetimeCurrent }) {
    
    // const isServer = !process.browser;
    
    // if (isServer) {
      
    //   console.log('Server: getInitialProps');
      
    // } else {
      
    //   console.log('Client: getInitialProps');
      
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
    const pathname = `/uc/${userCommunityID}`;
    const temporaryDataID = `/uc/${userCommunityID}`;
    
    
    // --------------------------------------------------
    //   Get Cookie & Temporary Data for Fetch
    // --------------------------------------------------
    
    const stores = initStoreRoot({});
    
    const forumThreadListPage = stores.data.getTemporaryDataForumThreadListPage({ temporaryDataID });
    const forumThreadListLimit = stores.data.getCookie({ key: 'forumThreadListLimit' });
    
    const forumThreadPage = stores.data.getTemporaryDataForumThreadPage({ temporaryDataID });
    const forumThreadLimit = stores.data.getCookie({ key: 'forumThreadLimit' });
    const forumCommentLimit = stores.data.getCookie({ key: 'forumCommentLimit' });
    const forumReplyLimit = stores.data.getCookie({ key: 'forumReplyLimit' });
    
    
    // console.log(chalk`
    //   forumThreadListLimit: {green ${forumThreadListLimit}}
    //   forumThreadLimit: {green ${forumThreadLimit}}
    //   forumCommentLimit: {green ${forumCommentLimit}}
    //   forumReplyLimit: {green ${forumReplyLimit}}
      
    //   forumThreadListPage: {green ${forumThreadListPage}}
    //   forumThreadPage: {green ${forumThreadPage}}
    // `);
    
    // console.log(`
    //   ----- reqHeadersCookie -----\n
    //   ${util.inspect(reqHeadersCookie, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // --------------------------------------------------
    //   Fetch
    // --------------------------------------------------
    
    const resultObj = await fetchWrapper({
      urlApi: encodeURI(`${process.env.URL_API}/v2/uc/${userCommunityID}?forumThreadListPage=${forumThreadListPage}&forumThreadListLimit=${forumThreadListLimit}&forumThreadPage=${forumThreadPage}&forumThreadLimit=${forumThreadLimit}&forumCommentLimit=${forumCommentLimit}&forumReplyLimit=${forumReplyLimit}`),
      methodType: 'GET',
      reqHeadersCookie,
      reqAcceptLanguage,
    });
    
    const statusCode = lodashGet(resultObj, ['statusCode'], 400);
    let propsObj = lodashGet(resultObj, ['data'], {});
    
    const userCommunities_id = lodashGet(resultObj, ['data', 'userCommunityObj', '_id'], '');
    const userCommunityName = lodashGet(resultObj, ['data', 'userCommunityObj', 'name'], '');
    // const userCommunityDescription = lodashGet(resultObj, ['data', 'userCommunityObj', 'description'], '');
    // const settingAnonymity = lodashGet(resultObj, ['data', 'userCommunityObj', 'anonymity'], false);
    // const showContents = lodashGet(resultObj, ['data', 'userCommunityObj', 'showContents'], false);
    
    
    // --------------------------------------------------
    //   Title
    // --------------------------------------------------
    
    const title = `${userCommunityName}`;
    
    
    // --------------------------------------------------
    //   Stores
    // --------------------------------------------------
    
    const headerNavMainArr = [
      {
        name: 'トップ',
        href: `/uc/[userCommunityID]?userCommunityID=${userCommunityID}`,
        as: `/uc/${userCommunityID}`,
      },
      {
        name: '設定',
        href: `/uc/[userCommunityID]/settings?userCommunityID=${userCommunityID}`,
        as: `/uc/${userCommunityID}/settings`,
      }
    ];
    
    propsObj = { ...propsObj, datetimeCurrent, pathname, headerNavMainArr, userCommunities_id };
    
    const storesObj = getOrCreateStore({ propsObj });
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   userCommunityID: {green ${userCommunityID}}
    //   userCommunityName: {green ${userCommunityName}}
    //   settingAnonymity: {green ${settingAnonymity}}
    //   showContents: {green ${showContents}}
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
      userCommunityID,
      userCommunities_id,
      // userCommunityDescription,
      // settingAnonymity,
      // showContents,
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
    
    
    // const isServer = !process.browser;
    
    // if (isServer) {
      
    //   console.log('Server: constructor');
      
    // } else {
      
    //   console.log('Client: constructor');
      
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
    //   Setting
    // --------------------------------------------------
    
    const settingAnonymity = lodashGet(this.props, ['propsObj', 'userCommunityObj', 'anonymity'], false);
    const showContents = lodashGet(this.props, ['propsObj', 'userCommunityObj', 'showContents'], false);
    
    
    // --------------------------------------------------
    //   About
    // --------------------------------------------------
    
    const description = lodashGet(this.props, ['propsObj', 'userCommunityObj', 'description'], '');
    const createdDate = lodashGet(this.props, ['propsObj', 'headerObj', 'createdDate'], '');
    const membersCount = lodashGet(this.props, ['propsObj', 'headerObj', 'membersCount'], 1);
    const gamesArr = lodashGet(this.props, ['propsObj', 'headerObj', 'gamesArr'], []);
    
    
    console.log(`
      ----- this.props -----\n
      ${util.inspect(this.props, { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    console.log(chalk`
      createdDate: {green ${createdDate}}
      description: {green ${description}}
      membersCount: {green ${membersCount}}
    `);
    
    console.log(`
      ----- gamesArr -----\n
      ${util.inspect(gamesArr, { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    
    
    
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
                {showContents &&
                  <ForumNavigation
                    temporaryDataID={this.props.temporaryDataID}
                    userCommunityID={this.props.userCommunityID}
                    userCommunities_id={this.props.userCommunities_id}
                  />
                }
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
              {showContents &&
                <Element
                  name="forumThreads"
                >
                  <ForumThread
                    temporaryDataID={this.props.temporaryDataID}
                    userCommunityID={this.props.userCommunityID}
                    userCommunities_id={this.props.userCommunities_id}
                    settingAnonymity={settingAnonymity}
                  />
                </Element>
              }
              
              
              {/* Description */}
              {!showContents &&
                <Abount
                  pathArr={[this.props.userCommunities_id, 'about']}
                  description={description}
                  createdDate={createdDate}
                  membersCount={membersCount}
                  gamesArr={gamesArr}
                />
              }
              
              
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