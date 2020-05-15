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
// import Router from 'next/router';
import { observer } from 'mobx-react';
import moment from 'moment';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

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
import initStoreGcRecruitment from 'app/gc/rec/stores/store.js';
import initStoreCardPlayer from 'app/common/card/player/stores/player.js';
import initStoreForum from 'app/common/forum/stores/store.js';
import initStoreIDForm from 'app/common/id/stores/form.js';
import initStoreGameForm from 'app/common/game/stores/form.js';
import initStoreImageAndVideo from 'app/common/image-and-video/stores/image-and-video.js';
import initStoreImageAndVideoForm from 'app/common/image-and-video/stores/form.js';
import initStoreGood from 'app/common/good/stores/store.js';
import initStoreHardware from 'app/common/hardware/stores/store.js';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Layout from 'app/common/layout/components/layout-ver2.js';
import RecruitmentNavigation from 'app/gc/rec/components/recruitment-navigation.js';
import RecruitmentThread from 'app/gc/rec/components/recruitment-thread.js';
import Breadcrumbs from 'app/common/layout/components/breadcrumbs.js';






// ---------------------------------------------
//   Scroll
// ---------------------------------------------

// Router.events.on('routeChangeComplete', (url) => {
  
//   console.log('routeChangeComplete');
//   console.log(url);
  
// });






/**
 * ストアを初期化する / 更新する
 * @param {Object} propsObj - ストアに入れる値
 */
const initializeStore = ({ propsObj }) => {
  
  
  // --------------------------------------------------
  //   Stores
  // --------------------------------------------------
  
  initStoreRoot({ propsObj });
  
  const storeGcRecruitment = initStoreGcRecruitment({ propsObj });
  const storeCardPlayer = initStoreCardPlayer({});
  const storeForum = initStoreForum({ propsObj });
  const storeIDForm = initStoreIDForm({});
  const storeGameForm = initStoreGameForm({});
  const storeImageAndVideo = initStoreImageAndVideo({});
  const storeImageAndVideoForm = initStoreImageAndVideoForm({});
  const storeGood = initStoreGood({});
  const storeHardware = initStoreHardware({});
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return {
    
    storeGcRecruitment,
    storeCardPlayer,
    storeForum,
    storeIDForm,
    storeGameForm,
    storeImageAndVideo,
    storeImageAndVideoForm,
    storeGood,
    storeHardware,
    
  };
  
  
};




// --------------------------------------------------
//   Class
//   URL: https://dev-1.gameusers.org/gc/***/rec/***
// --------------------------------------------------

@observer
export default class GcRec extends React.Component {
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    
    
    // --------------------------------------------------
    //   super
    // --------------------------------------------------
    
    super(props);
    
    
    // console.log(`
    //   ----------------------------------------\n
    //   /pages/gc/[urlID]/rec/[...slug].js - constructor
    // `);
    
    // console.log(`
    //   ----- this.props.propsObj -----\n
    //   ${util.inspect(this.props.propsObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // --------------------------------------------------
    //   Initialize Store
    // --------------------------------------------------
    
    this.storesObj = initializeStore({ propsObj: this.props.propsObj });
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   componentDidUpdate / Router.push でページを移動し、そこからブラウザで戻ったときの処理
  //   まず getServerSideProps でデータを取得し、次に componentDidUpdate でデータを更新する
  // --------------------------------------------------
  
  componentDidUpdate(prevProps) {
    
    // console.log('componentDidUpdate');
    
    
    // console.log(`
    //   ----- prevProps -----\n
    //   ${util.inspect(prevProps, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- this.props -----\n
    //   ${util.inspect(this.props, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   this.props.ISO8601: {green ${this.props.ISO8601}}
    //   prevProps.ISO8601: {green ${prevProps.ISO8601}}
    // `);
    
    
    // --------------------------------------------------
    //   Update Store
    // --------------------------------------------------
    
    if (this.props.ISO8601 !== prevProps.ISO8601) {
      
      // console.log('componentDidUpdate / Update Store');
      
      initializeStore({ propsObj: this.props.propsObj });
      
      
      // ---------------------------------------------
      //   Scroll
      // ---------------------------------------------
      
      const stores = initStoreRoot({});
      
      stores.layout.handleScrollTo({
        
        to: 'recruitmentThreads',
        duration: 0,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -50,
        
      });
      
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
    
    if (this.props.statusCode !== 200) {
      return <Error statusCode={this.props.statusCode} />;
    }
    
    
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const gameCommunities_id = lodashGet(this.props, ['propsObj', 'gameCommunityObj', '_id'], '');
    
    
    
    
    // --------------------------------------------------
    //   Component - Sidebar
    // --------------------------------------------------
    
    const componentSidebar =
      <RecruitmentNavigation
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
        
        <RecruitmentThread
          urlID={this.props.urlID}
          gameCommunities_id={gameCommunities_id}
        />
        
      </React.Fragment>
    ;
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Layout
        storesObj={this.storesObj}
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
  //   Query
  // --------------------------------------------------
  
  const hardwares = lodashGet(query, ['hardwares'], '');
  const categories = lodashGet(query, ['categories'], '');
  const keyword = lodashGet(query, ['keyword'], '');
  const urlID = lodashGet(query, ['urlID'], '');
  const slugsArr = lodashGet(query, ['slug'], []);
  
  let threadPage = lodashGet(query, ['page'], 1);
  let recruitmentID = '';
  
  let type = 'recruitment';
  
  if (Math.sign(slugsArr[0]) === 1) {
    
    threadPage = slugsArr[0];
    
  } else if (slugsArr[0] !== 'search') {
    
    recruitmentID = slugsArr[0];
    type = 'individual';
    
  } else if (slugsArr[0] === 'search') {
    
    type = 'search';
    
  }
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const pathname = `/gc/${urlID}/rec`;
  const pathArr = ['gc', urlID, 'rec'];
  const ISO8601 = moment().utc().toISOString();
  
  
  // --------------------------------------------------
  //   Get Cookie Data for Fetch
  // --------------------------------------------------
  
  const threadLimit = stores.data.getCookie({ key: 'recruitmentThreadLimit' });
  const commentLimit = stores.data.getCookie({ key: 'recruitmentCommentLimit' });
  const replyLimit = stores.data.getCookie({ key: 'recruitmentReplyLimit' });
  
  
  
  
  // --------------------------------------------------
  //   Fetch
  // --------------------------------------------------
  
  const resultObj = await fetchWrapper({
    
    urlApi: encodeURI(`${process.env.NEXT_PUBLIC_URL_API}/v2/gc/${urlID}/rec?recruitmentID=${recruitmentID}&threadPage=${threadPage}&threadLimit=${threadLimit}&commentLimit=${commentLimit}&replyLimit=${replyLimit}&hardwares=${hardwares}&categories=${categories}&keyword=${keyword}`),
    methodType: 'GET',
    reqHeadersCookie,
    reqAcceptLanguage,
    
  });
  
  const statusCode = lodashGet(resultObj, ['statusCode'], 400);
  const dataObj = lodashGet(resultObj, ['data'], {});
  
  
  
  
  // --------------------------------------------------
  //   dataObj
  // --------------------------------------------------
  
  const gameCommunities_id = lodashGet(dataObj, ['gameCommunityObj', '_id'], '');
  const gameName = lodashGet(dataObj, ['headerObj', 'name'], '');
  const accessLevel = lodashGet(dataObj, ['accessLevel'], 1);
  
  const recruitmentNavigationObj = {
    
    categories,
    keyword,
    
  };
  
  
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
  
  const propsObj = { ...dataObj, ISO8601, pathname, pathArr, headerNavMainArr, gameCommunities_id, recruitmentNavigationObj };
  
  
  
  
  // --------------------------------------------------
  //   Title
  // --------------------------------------------------
  
  let title = '';
  
  
  // --------------------------------------------------
  //   パンくずリスト
  // --------------------------------------------------
  
  const breadcrumbsArr = [
    
    {
      type: 'gc',
      anchorText: lodashGet(dataObj, ['headerObj', 'name'], ''),
      href: `/gc/[urlID]/index?urlID=${urlID}`,
      as: `/gc/${urlID}`,
    },
    
    {
      type: 'gc/rec',
      anchorText: '',
      href: `/gc/[urlID]/rec/index?urlID=${urlID}`,
      as: `/gc/${urlID}/rec`,
    },
    
  ];
  
  
  // --------------------------------------------------
  //   募集
  // --------------------------------------------------
  
  if (type === 'recruitment') {
    
    
    // ---------------------------------------------
    //   - Title
    // ---------------------------------------------
    
    title = `募集: Page ${threadPage} - ${gameName}`;
    
    
  // --------------------------------------------------
  //   個別の募集
  // --------------------------------------------------
    
  } else if (type === 'individual') {
    
    
    // ---------------------------------------------
    //   - Title
    // ---------------------------------------------
    
    const recruitmentThreadsArr = lodashGet(dataObj, ['recruitmentThreadsObj', 'page1Obj', 'arr'], []);
    const recruitmentTitle = lodashGet(dataObj, ['recruitmentThreadsObj', 'dataObj', recruitmentThreadsArr[0], 'title'], '');
    
    title = `${recruitmentTitle} - ${gameName}`;
    
    
    // ---------------------------------------------
    //   - パンくずリスト
    // ---------------------------------------------
    
    breadcrumbsArr.push(
      
      {
        type: 'gc/rec/individual',
        anchorText: recruitmentTitle,
        href: '',
        as: '',
      }
      
    );
    
    
  // --------------------------------------------------
  //   検索
  // --------------------------------------------------
    
  } else if (type === 'search') {
    
    
    // ---------------------------------------------
    //   - Title
    // ---------------------------------------------
    
    title = `検索 - ${gameName}`;
    
    
    // ---------------------------------------------
    //   - パンくずリスト
    // ---------------------------------------------
    
    breadcrumbsArr.push(
      
      {
        type: 'gc/rec/search',
        anchorText: '',
        href: '',
        as: '',
      },
      
    );
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /pages/gc/[urlID]/rec/[...slug].js - getServerSideProps
  // `);
  
  // console.log(`
  //   ----- slugsArr -----\n
  //   ${util.inspect(slugsArr, { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  // console.log(chalk`
  //   recruitmentID: {green ${recruitmentID}}
  // `);
  
  // console.log(`
  //   ----- resultObj -----\n
  //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  // console.log(chalk`
  //   threadPage: {green ${threadPage}}
  //   threadLimit: {green ${threadLimit}}
  //   commentLimit: {green ${commentLimit}}
  //   replyLimit: {green ${replyLimit}}
  // `);
  
  // console.log(`
  //   ----- query -----\n
  //   ${util.inspect(query, { colors: true, depth: null })}\n
  //   --------------------\n
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
      ISO8601,
      statusCode,
      propsObj,
      breadcrumbsArr,
      title,
      
    }
    
  };
  
  
}