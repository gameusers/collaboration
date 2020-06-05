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
import { observer } from 'mobx-react';
import moment from 'moment';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { fetchWrapper } from 'app/@modules/fetch.js';
import { createCsrfToken } from 'app/@modules/csrf.js';


// ---------------------------------------------
//   Stores
// ---------------------------------------------

import initStoreRoot from 'app/@stores/root.js';
import initStoreGcCommunity from 'app/gc/community/stores/store.js';
import initStoreCardPlayer from 'app/common/card/player/stores/player.js';
import initStoreForum from 'app/common/forum/stores/store.js';
import initStoreImageAndVideo from 'app/common/image-and-video/stores/image-and-video.js';
import initStoreImageAndVideoForm from 'app/common/image-and-video/stores/form.js';
import initStoreFollow from 'app/common/follow/stores/store.js';
import initStoreGood from 'app/common/good/stores/store.js';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Layout from 'app/common/layout/v2/components/layout.js';
import ForumNavigation from 'app/common/forum/components/navigation.js';
import ForumThread from 'app/common/forum/components/thread.js';
import Breadcrumbs from 'app/common/layout/components/breadcrumbs.js';






// --------------------------------------------------
//   Store
// --------------------------------------------------

/**
 * ストアを初期化する / 更新する
 * @param {Object} propsObj - ストアに入れる値
 */
const initializeStore = ({ propsObj }) => {
  
  
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
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    
    
    // --------------------------------------------------
    //   super
    // --------------------------------------------------
    
    super(props);
    
    
    // --------------------------------------------------
    //   Initialize Store
    // --------------------------------------------------
    
    this.storesObj = initializeStore({ propsObj: this.props.propsObj });
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   componentDidMount
  // --------------------------------------------------
  
  componentDidMount() {
    
    
    // ---------------------------------------------
    //   Scroll
    // ---------------------------------------------
    
    const stores = initStoreRoot({});
    
    stores.layout.handleScrollTo({
      
      to: 'forumThreads',
      duration: 0,
      delay: 0,
      smooth: 'easeInOutQuart',
      offset: -50,
      
    });
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   componentDidUpdate / Router.push でページを移動したときの処理
  //   まず getServerSideProps でデータを取得し、次に componentDidUpdate でデータを更新する
  // --------------------------------------------------
  
  componentDidUpdate(prevProps) {
    
    
    // --------------------------------------------------
    //   Update Store
    // --------------------------------------------------
    
    if (this.props.ISO8601 !== prevProps.ISO8601) {
      
      initializeStore({ propsObj: this.props.propsObj });
      
      
      // ---------------------------------------------
      //   Scroll
      // ---------------------------------------------
      
      const stores = initStoreRoot({});
      
      stores.layout.handleScrollTo({
        
        to: 'forumThreads',
        duration: 0,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -50,
        
      });
      
      
    }
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  // constructor(props) {
    
    
  //   // --------------------------------------------------
  //   //   super
  //   // --------------------------------------------------
    
  //   super(props);
    
    
    
    
  //   // --------------------------------------------------
  //   //   Props
  //   // --------------------------------------------------
    
  //   const urlID = props.urlID;
  //   const pathname = props.pathname;
  //   const ISO8601 = props.ISO8601;
    
  //   let propsObj = props.propsObj;
    
  //   const gameCommunities_id = lodashGet(propsObj, ['gameCommunityObj', '_id'], '');
  //   const accessLevel = lodashGet(propsObj, ['accessLevel'], 1);
    
    
  //   // --------------------------------------------------
  //   //   Path Array
  //   // --------------------------------------------------
    
  //   const pathArr = ['gc', urlID];
    
    
    
    
    
    
  //   // --------------------------------------------------
  //   //   propsObj
  //   // --------------------------------------------------
    
  //   propsObj = { ...propsObj, ISO8601, pathname, pathArr, headerNavMainArr, gameCommunities_id };
    
    
  
  
  
  
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
    //   Props
    // --------------------------------------------------
    
    const accessLevel = lodashGet(this.props, ['propsObj', 'accessLevel'], 1);
    const loginUsersObj = lodashGet(this.props, ['propsObj', 'loginUsersObj'], {});
  
    const gameCommunities_id = lodashGet(this.props, ['propsObj', 'gameCommunityObj', '_id'], '');
    
    
    // --------------------------------------------------
    //   Context
    // --------------------------------------------------
    
    const contextObj = {
      
      accessLevel,
      loginUsersObj,
      
    };
    
    
    
    
    // --------------------------------------------------
    //   Component - Sidebar
    // --------------------------------------------------
    
    const componentSidebar =
      <ForumNavigation
        temporaryDataID={this.props.temporaryDataID}
        urlID={this.props.urlID}
        gameCommunities_id={gameCommunities_id}
      />
    ;
    
    
    
    
    // --------------------------------------------------
    //   Component - Contents
    // --------------------------------------------------
    
    const componentContent = 
      <React.Fragment>
        
        <Breadcrumbs
          arr={this.props.breadcrumbsArr}
        />
        
        <ForumThread
          temporaryDataID={this.props.temporaryDataID}
          urlID={this.props.urlID}
          gameCommunities_id={gameCommunities_id}
          settingAnonymity={true}
        />
        
      </React.Fragment>
    ;
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Layout
        // storesObj={this.storesObj}
        
        contextObj={contextObj}
        
        // accessLevel={accessLevel}
        // loginUsersObj={loginUsersObj}
        
        title={this.props.title}
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
  
  const urlID = query.urlID;
  const pathname = `/gc/${urlID}`;
  const pathArr = ['gc', urlID];
  const temporaryDataID = `/gc/${urlID}`;
  const ISO8601 = moment().utc().toISOString();
  
  
  // --------------------------------------------------
  //   Get Cookie Data & Temporary Data for Fetch
  // --------------------------------------------------
  
  const threadListPage = stores.data.getTemporaryData({ pathname: temporaryDataID, key: 'threadListPage' });
  const threadListLimit = stores.data.getCookie({ key: 'threadListLimit' });
  
  // const threadPage = stores.data.getTemporaryData({ pathname: temporaryDataID, key: 'threadPage' });
  const threadPage = 1;
  const threadLimit = stores.data.getCookie({ key: 'threadLimit' });
  const commentLimit = stores.data.getCookie({ key: 'commentLimit' });
  const replyLimit = stores.data.getCookie({ key: 'replyLimit' });
  
  
  // --------------------------------------------------
  //   Fetch
  // --------------------------------------------------
  
  const resultObj = await fetchWrapper({
    
    urlApi: encodeURI(`${process.env.NEXT_PUBLIC_URL_API}/v2/gc/${urlID}?threadListPage=${threadListPage}&threadListLimit=${threadListLimit}&threadPage=${threadPage}&threadLimit=${threadLimit}&commentLimit=${commentLimit}&replyLimit=${replyLimit}`),
    methodType: 'GET',
    reqHeadersCookie,
    reqAcceptLanguage,
    
  });
  
  const statusCode = lodashGet(resultObj, ['statusCode'], 400);
  const dataObj = lodashGet(resultObj, ['data'], {});
  
  
  
  
  // --------------------------------------------------
  //   dataObj
  // --------------------------------------------------
  
  const accessLevel = lodashGet(dataObj, ['accessLevel'], 1);
  // const loginUsersObj = lodashGet(dataObj, ['loginUsersObj'], {});
  
  const gameCommunities_id = lodashGet(dataObj, ['gameCommunityObj', '_id'], '');
  const gameName = lodashGet(dataObj, ['headerObj', 'name'], '');
  
  
  
  // --------------------------------------------------
  //   Header Navigation Link
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
  
  if (accessLevel === 100) {
    
    headerNavMainArr.push(
      {
        name: '設定',
        href: `/gc/[urlID]/settings?urlID=${urlID}`,
        as: `/gc/${urlID}/settings`,
      }
    );
    
  }
  
  
  // --------------------------------------------------
  //   propsObj
  // --------------------------------------------------
  
  const propsObj = { ...dataObj, ISO8601, accessLevel, pathname, pathArr, headerNavMainArr, gameCommunities_id };
  
  
  
  
  // --------------------------------------------------
  //   Title
  // --------------------------------------------------
  
  const title = `${gameName} - Game Users`;
  
  
  // --------------------------------------------------
  //   パンくずリスト
  // --------------------------------------------------
  
  const breadcrumbsArr = [
    
    {
      type: 'gc',
      anchorText: gameName,
      href: '',
      as: '',
    },
    
  ];
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  console.log(`
    ----------------------------------------\n
    /pages/gc/[urlID]/index.js
  `);
  
  console.log(`
    ----- resultObj -----\n
    ${util.inspect(JSON.parse(JSON.stringify(resultObj)), { colors: true, depth: null })}\n
    --------------------\n
  `);
  
  // console.log(chalk`
  //   threadListPage: {green ${threadListPage}}
  //   threadPage: {green ${threadPage}}
    
  //   threadListLimit: {green ${threadListLimit}}
  //   threadLimit: {green ${threadLimit}}
  //   commentLimit: {green ${commentLimit}}
  //   replyLimit: {green ${replyLimit}}
  // `);
  
  // console.log(`
  //   ----- reqHeadersCookie -----\n
  //   ${util.inspect(reqHeadersCookie, { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  // console.log(chalk`
  //   reqAcceptLanguage: {green ${reqAcceptLanguage}}
  // `);
  
  
  
  
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return { 
    
    props: {
      
      urlID,
      temporaryDataID,
      ISO8601,
      statusCode,
      propsObj,
      breadcrumbsArr,
      title,
      
    }
    
  };
  
  
}