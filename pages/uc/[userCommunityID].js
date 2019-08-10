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
//   Modules
// ---------------------------------------------

import { fetchWrapper } from '../../app/@modules/fetch';
import { createCsrfToken } from '../../app/@modules/csrf';


// ---------------------------------------------
//   Stores
// ---------------------------------------------

import initStoreRoot from '../../app/@stores/root';
import initStoreUserCommunity from '../../app/uc/community/stores/store';
import initStoreForum from '../../app/common/forum/stores/store';
import initStoreImageAndVideo from '../../app/common/image-and-video/stores/image-and-video';
import initStoreImageAndVideoForm from '../../app/common/image-and-video/stores/form';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Layout from '../../app/common/layout/components/layout';
import Drawer from '../../app/common/layout/components/drawer';
import ForumNavigation from '../../app/common/forum/components/navigation';
import ForumThread from '../../app/common/forum/components/thread';
import VideoModal from '../../app/common/image-and-video/components/video-modal';
// import CardPlayerDialog from '../../app/common/card/player/components/dialog';




// --------------------------------------------------
//   Class
//   URL: http://dev-1.gameusers.org:8080/uc/***
// --------------------------------------------------

@observer
export default class extends React.Component {
  
  
  // --------------------------------------------------
  //   getInitialProps
  // --------------------------------------------------
  
  static async getInitialProps({ req, res, query, login }) {
    
    
    // console.log('[userCommunityID].js / getInitialProps');
    // const isServer = !!req;
    
    // console.log(chalk`
    //   login: {green ${login}}
    //   isServer: {green ${isServer}}
    // `);
    
    
    
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
    
    // console.log(chalk`
    //   getInitialProps
    //   userCommunityID: {green ${userCommunityID}}
    // `);
    
    // --------------------------------------------------
    //   Fetch
    // --------------------------------------------------
    
    const resultObj = await fetchWrapper({
      // urlApi: encodeURI(`${process.env.URL_API}/v2/uc/community?userCommunityID=${userCommunityID}`),
      urlApi: encodeURI(`${process.env.URL_API}/v1/initial-props/uc/community/?userCommunityID=${userCommunityID}`),
      methodType: 'GET',
      reqHeadersCookie,
      reqAcceptLanguage,
    });
    
    const statusCode = resultObj.statusCode;
    const initialPropsObj = resultObj.data;
    
    console.log(`
      ----- resultObj -----\n
      ${util.inspect(resultObj, { colors: true, depth: null })}\n
      --------------------\n
    `);
    
    // console.log(`
    //   ----- initialPropsObj.userCommunityObj.updatedDateObj -----\n
    //   ${util.inspect(initialPropsObj.userCommunityObj.updatedDateObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return { pathname, initialPropsObj, statusCode, reqAcceptLanguage, userCommunityID, userCommunities_id: 'cxO8tEGty' };
    
    
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
    
    
    try {
      
      
      // --------------------------------------------------
      //   Error
      // --------------------------------------------------
      
      // if (
      //   this.props.statusCode !== 200 ||
      //   'cardPlayersObj' in props.initialPropsObj === false ||
      //   'cardsArr' in props.initialPropsObj === false
      // ) {
      //   throw new Error();
      // }
      
      
      // --------------------------------------------------
      //   Store
      // --------------------------------------------------
      
      const stores = initStoreRoot({});
      
      this.storeUserCommunity = initStoreUserCommunity({});
      this.storeForum = initStoreForum({});
      this.storeImageAndVideo = initStoreImageAndVideo({});
      this.storeImageAndVideoForm = initStoreImageAndVideoForm({});
      
      
      // --------------------------------------------------
      //   Update Data - Pathname
      // --------------------------------------------------
      
      stores.layout.replacePathname(props.pathname);
      
      
      // --------------------------------------------------
      //   Update Data - Header Navigation Main
      // --------------------------------------------------
      
      const headerNavMainArr = [
        {
          name: 'トップ',
          href: `/uc/community?userCommunityID=${props.userCommunityID}`,
          as: `/uc/${props.userCommunityID}`,
        },
        {
          name: '設定',
          href: `/uc/settings?userCommunityID=${props.userCommunityID}`,
          as: `/uc/${props.userCommunityID}/settings`,
        }
      ];
      
      stores.layout.replaceHeaderNavMainArr(headerNavMainArr);
      
      
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
      
      this.storeForum.handleEdit({
        pathArr: [props.userCommunities_id, 'forumThreadsForListObj'],
        value: props.initialPropsObj.forumThreadsForListObj,
      });
      
      
      // --------------------------------------------------
      //   Update Data - forumThreadsObj
      // --------------------------------------------------
      
      this.storeForum.handleEdit({
        pathArr: [props.userCommunities_id, 'forumThreadsObj'],
        value: props.initialPropsObj.forumThreadsObj,
      });
      
      
      // --------------------------------------------------
      //   Update Data - forumCommentsAndRepliesObj
      // --------------------------------------------------
      
      this.storeForum.handleEdit({
        pathArr: [props.userCommunities_id, 'forumCommentsAndRepliesObj'],
        value: props.initialPropsObj.forumCommentsAndRepliesObj,
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
    
    const stores = this.stores;
    
    // const drawerOpen = lodashGet(stores, ['layout', 'drawerOpen'], false);
    // const handleDrawerClose = lodashGet(stores, ['layout', 'handleDrawerClose'], () => {});
    
    
    // --------------------------------------------------
    //   Player Card
    // --------------------------------------------------
    
    let userName = '';
    
    const componentCardsArr = [];
    
    // for (const [index, valueObj] of this.props.initialPropsObj.cardsArr.entries()) {
      
    //   if ('cardPlayers_id' in valueObj) {
        
    //     const cardPlayers_id = lodashGet(valueObj, ['cardPlayers_id'], '');
    //     userName = lodashGet(stores, ['data', 'cardPlayersObj', cardPlayers_id, 'nameObj', 'value'], '');
        
    //     componentCardsArr.push(
    //       <CardPlayer
    //         _id={valueObj.cardPlayers_id}
    //         showFollow={true}
    //         key={index}
    //       />
    //     );
        
    //   }
      
    // }
    
    
    // --------------------------------------------------
    //   Header Title
    // --------------------------------------------------
    
    // const topPagesObj = this.storePlPlayer.pagesArr.find((valueObj) => {
    //   return valueObj.type === 'top';
    // });
    
    // const topPageName = lodashGet(topPagesObj, ['name'], '');
    // const title = topPageName ? topPageName : `${userName} - Game Users`;
    
    const title = 'ユーザーコミュニティ';
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Provider
        storeUserCommunity={this.storeUserCommunity}
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
              // width: 100%;
              margin: 0 auto;
              padding: 16px;
              
              @media screen and (max-width: 947px) {//989px　947px
                padding: 10px 0 10px 0;
              }
            `}
          >
            
            
            {/* Sidebar */}
            <div
              css={css`
                width: 300px;
                margin: 0 16px 0 0;
                padding: 0;
                
                @media screen and (max-width: 947px) {
                  display: none;
                }
              `}
            >
              <img
                src="/static/img/common/advertisement/300x250.jpg"
                width="300"
                height="250"
              />
              
              
              {/*<div style={{ marginTop: '14px' }}></div>
              
              
              <ForumNavigation
                userCommunities_id={this.props.userCommunities_id}
                sidebar={true}
              />*/}
              
            </div>
            
            
            
            
            {/* Main */}
            <div
              css={css`
                width: 100%;
              `}
            >
              
              
              <ForumNavigation userCommunities_id={this.props.userCommunities_id} />
              
              
              <div
                css={css`
                  margin 12px 0 0 0;
                `}
              >
                
                <ForumThread userCommunities_id={this.props.userCommunities_id} />
                
              </div>
              
              
              {/* プレイヤーカード */}
              {componentCardsArr}
              
              
            </div>
            
            
          </div>
          
          
          
          
          {/* プレイヤーカードを表示するダイアログ */}
          {/*<CardPlayerDialog />*/}
          
          
          
          
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