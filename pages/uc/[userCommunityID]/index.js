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
// import Head from 'next/head';
// import Link from 'next/link';
import { observer } from 'mobx-react';
import { Element } from 'react-scroll';
import moment from 'moment';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import lodashGet from 'lodash/get';
import lodashHas from 'lodash/has';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { fetchWrapper } from '../../../app/@modules/fetch';
import { createCsrfToken } from '../../../app/@modules/csrf';


// ---------------------------------------------
//   Stores
// ---------------------------------------------

import initStoreRoot from '../../../app/@stores/root';
import initStoreUcCommunity from '../../../app/uc/community/stores/store';
import initStoreCardPlayer from '../../../app/common/card/player/stores/player';
import initStoreForum from '../../../app/common/forum/stores/store';
import initStoreImageAndVideo from '../../../app/common/image-and-video/stores/image-and-video';
import initStoreImageAndVideoForm from '../../../app/common/image-and-video/stores/form';
import initStoreFollow from '../../../app/common/follow/stores/store';
import initStoreGood from '../../../app/common/good/stores/store';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Layout from '../../../app/common/layout/components/layout-ver2';
import ForumNavigation from '../../../app/common/forum/components/navigation';
import ForumThread from '../../../app/common/forum/components/thread';
import Abount from '../../../app/uc/community/components/about';




// --------------------------------------------------
//   Class
//   URL: https://dev-1.gameusers.org/uc/***
// --------------------------------------------------

@observer
export default class extends React.Component {
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    
    
    // --------------------------------------------------
    //   super
    // --------------------------------------------------
    
    super(props);
    
    
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const userCommunityID = props.userCommunityID;
    const pathname = props.pathname;
    const ISO8601 = props.ISO8601;
    
    let propsObj = props.propsObj;
    
    const userCommunities_id = lodashGet(propsObj, ['userCommunityObj', '_id'], '');
    const accessLevel = lodashGet(propsObj, ['accessLevel'], 1);
    const accessRightRead = lodashGet(propsObj, ['accessRightRead'], false);
    
    
    // --------------------------------------------------
    //   Path Array
    // --------------------------------------------------
    
    // const pathArr = ['gc', urlID];
    
    
    
    
    // --------------------------------------------------
    //   Header Navigation Link
    // --------------------------------------------------
    
    const headerNavMainArr = [
      {
        name: 'トップ',
        href: `/uc/[userCommunityID]/index?userCommunityID=${userCommunityID}`,
        as: `/uc/${userCommunityID}`,
      }
    ];
    
    if (accessRightRead) {
      headerNavMainArr.push(
        {
          name: 'メンバー',
          href: `/uc/[userCommunityID]/members?userCommunityID=${userCommunityID}`,
          as: `/uc/${userCommunityID}/members`,
        }
      );
    }
    
    if (accessLevel >= 50) {
      headerNavMainArr.push(
        {
          name: '設定',
          href: `/uc/[userCommunityID]/settings?userCommunityID=${userCommunityID}`,
          as: `/uc/${userCommunityID}/settings`,
        }
      );
    }
    
    
    
    
    // --------------------------------------------------
    //   propsObj
    // --------------------------------------------------
    
    propsObj = { ...propsObj, ISO8601, pathname, headerNavMainArr, userCommunities_id };
    
    
    // --------------------------------------------------
    //   Stores
    // --------------------------------------------------
    
    initStoreRoot({ propsObj });
    
    const storeUcCommunity = initStoreUcCommunity({});
    const storeCardPlayer = initStoreCardPlayer({});
    const storeForum = initStoreForum({ propsObj });
    const storeImageAndVideo = initStoreImageAndVideo({});
    const storeImageAndVideoForm = initStoreImageAndVideoForm({});
    const storeFollow = initStoreFollow({});
    const storeGood = initStoreGood({});
    
    
    this.storesObj = {
      
      storeUcCommunity,
      storeCardPlayer,
      storeForum,
      storeImageAndVideo,
      storeImageAndVideoForm,
      storeFollow,
      storeGood,
      
    };
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   render
  // --------------------------------------------------
  
  render() {
    
    
    // --------------------------------------------------
    //   Error
    //   参考：https://github.com/zeit/next.js#custom-error-handling
    // --------------------------------------------------
    
    if (this.props.statusCode !== 200) {
      return <Error statusCode={this.props.statusCode} />;
    }
    
    
    
    
    // --------------------------------------------------
    //   userCommunity
    // --------------------------------------------------
    
    const userCommunities_id = lodashGet(this.props, ['propsObj', 'userCommunityObj', '_id'], '');
    const userCommunityName = lodashGet(this.props, ['propsObj', 'userCommunityObj', 'name'], '');
    
    
    // --------------------------------------------------
    //   Setting
    // --------------------------------------------------
    
    const settingAnonymity = lodashGet(this.props, ['propsObj', 'userCommunityObj', 'anonymity'], false);
    const accessRightRead = lodashGet(this.props, ['propsObj', 'accessRightRead'], false);
    
    
    // --------------------------------------------------
    //   About
    // --------------------------------------------------
    
    const description = lodashGet(this.props, ['propsObj', 'userCommunityObj', 'description'], '');
    const communityType = lodashGet(this.props, ['propsObj', 'userCommunityObj', 'communityType'], 'open');
    const anonymity = lodashGet(this.props, ['propsObj', 'userCommunityObj', 'anonymity'], true);
    const createdDate = lodashGet(this.props, ['propsObj', 'headerObj', 'createdDate'], '');
    const approval = lodashGet(this.props, ['propsObj', 'headerObj', 'approval'], false);
    const followedCount = lodashGet(this.props, ['propsObj', 'headerObj', 'followedCount'], 1);
    const gamesArr = lodashGet(this.props, ['propsObj', 'headerObj', 'gamesArr'], []);
    
    
    // --------------------------------------------------
    //   Title
    // --------------------------------------------------
    
    const title = `${userCommunityName}`;
    
    
    
    
    // --------------------------------------------------
    //   Component - Sidebar
    // --------------------------------------------------
    
    const componentSidebar =
      <React.Fragment>
        
        
        {/* Forum Navigation */}
        {accessRightRead &&
          <ForumNavigation
            temporaryDataID={this.props.temporaryDataID}
            userCommunityID={this.props.userCommunityID}
            userCommunities_id={userCommunities_id}
          />
        }
        
        
      </React.Fragment>
    ;
    
    
    
    
    // --------------------------------------------------
    //   Component - Content
    // --------------------------------------------------
    
    const componentContent =
      <React.Fragment>
        
        
        {/* Forum */}
        {accessRightRead &&
          <Element
            name="forumThreads"
          >
            <ForumThread
              temporaryDataID={this.props.temporaryDataID}
              userCommunityID={this.props.userCommunityID}
              userCommunities_id={userCommunities_id}
              settingAnonymity={settingAnonymity}
            />
          </Element>
        }
        
        
        {/* About Community */}
        <div
          css={css`
            ${accessRightRead ? 'margin: 32px 0 0 0' : 'margin: 0 0 0 0'};
          `}
        >
          <Abount
            pathArr={[this.props.userCommunities_id, 'about']}
            description={description}
            createdDate={createdDate}
            followedCount={followedCount}
            communityType={communityType}
            approval={approval}
            anonymity={anonymity}
            gamesArr={gamesArr}
            accessRightRead={accessRightRead}
          />
        </div>
        
        
      </React.Fragment>
    ;
    
    
    
    
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
      <Layout
        storesObj={this.storesObj}
        title={title}
        componentSidebar={componentSidebar}
        componentContent={componentContent}
      />
    );
    
    
  }
  
  
}




/**
 * getServerSideProps
 * @param {Object} req - リクエスト
 * @param {Object} res - レスポンス
 * @param {Object} query - クエリー
 */
export async function getServerSideProps({ req, res, query }) {
  
  
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
  
  const userCommunityID = query.userCommunityID;
  const pathname = `/uc/${userCommunityID}`;
  const temporaryDataID = `/uc/${userCommunityID}`;
  const ISO8601 = moment().utc().toISOString();
  
  
  // --------------------------------------------------
  //   Get Cookie & Temporary Data for Fetch
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
    urlApi: encodeURI(`${process.env.NEXT_PUBLIC_URL_API}/v2/uc/${userCommunityID}?threadListPage=${threadListPage}&threadListLimit=${threadListLimit}&threadPage=${threadPage}&threadLimit=${threadLimit}&commentLimit=${commentLimit}&replyLimit=${replyLimit}`),
    methodType: 'GET',
    reqHeadersCookie,
    reqAcceptLanguage,
  });
  
  const statusCode = lodashGet(resultObj, ['statusCode'], 400);
  const propsObj = lodashGet(resultObj, ['data'], {});
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /pages/uc/[userCommunityID]/index.js
  // `);
  
  // console.log(chalk`
  //   threadListLimit: {green ${threadListLimit}}
  //   threadLimit: {green ${threadLimit}}
  //   commentLimit: {green ${commentLimit}}
  //   replyLimit: {green ${replyLimit}}
    
  //   threadListPage: {green ${threadListPage}}
  //   forumThreadPage: {green ${forumThreadPage}}
  // `);
  
  // console.log(`
  //   ----- reqHeadersCookie -----\n
  //   ${util.inspect(reqHeadersCookie, { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  // console.log(chalk`
  //   userCommunityID: {green ${userCommunityID}}
  //   userCommunityName: {green ${userCommunityName}}
  //   author: {green ${author}}
  // `);
  
  // console.log(`
  //   ----- resultObj -----\n
  //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  
  
  // statusCode,
  //     reqAcceptLanguage,
  //     temporaryDataID,
  //     userCommunityID,
  //     userCommunities_id,
  //     title,
  //     storesObj,
  //     propsObj,
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return { 
    
    props: {
      
      userCommunityID,
      pathname,
      temporaryDataID,
      ISO8601,
      statusCode,
      propsObj,
      
    }
    
  };
  
  
}