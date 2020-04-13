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
import initStoreGcRecruitment from '../../../app/gc/rec/stores/store';
import initStoreCardPlayer from '../../../app/common/card/player/stores/player';
import initStoreForum from '../../../app/common/forum/stores/store';
import initStoreIDForm from '../../../app/common/id/stores/form';
import initStoreGameForm from '../../../app/common/game/stores/form';
import initStoreImageAndVideo from '../../../app/common/image-and-video/stores/image-and-video';
import initStoreImageAndVideoForm from '../../../app/common/image-and-video/stores/form';
import initStoreFollow from '../../../app/common/follow/stores/store';
import initStoreGood from '../../../app/common/good/stores/store';
import initStoreHardware from '../../../app/common/hardware/stores/store';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Layout from '../../../app/common/layout/components/layout-ver2';
import RecruitmentThread from '../../../app/gc/rec/components/recruitment-thread';




// --------------------------------------------------
//   Class
//   URL: https://dev-1.gameusers.org/gc/***/rec
// --------------------------------------------------

@observer
export default class GcRec extends React.Component {
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    
    // console.log('constructor');
    
    
    // --------------------------------------------------
    //   super
    // --------------------------------------------------
    
    super(props);
    
    
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const urlID = props.urlID;
    const pathname = props.pathname;
    const ISO8601 = props.ISO8601;
    
    let propsObj = props.propsObj;
    
    const gameCommunities_id = lodashGet(propsObj, ['gameCommunityObj', '_id'], '');
    const accessLevel = lodashGet(propsObj, ['accessLevel'], 1);
    
    
    // --------------------------------------------------
    //   Path Array
    // --------------------------------------------------
    
    const pathArr = ['gc', urlID];
    
    
    
    
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
    //   Stores
    // --------------------------------------------------
    
    propsObj = { ...propsObj, ISO8601, pathname, pathArr, headerNavMainArr, gameCommunities_id };
    
    initStoreRoot({ propsObj });
    
    const storeGcRecruitment = initStoreGcRecruitment({ propsObj });
    const storeCardPlayer = initStoreCardPlayer({});
    const storeForum = initStoreForum({ propsObj });
    const storeIDForm = initStoreIDForm({});
    const storeGameForm = initStoreGameForm({});
    const storeImageAndVideo = initStoreImageAndVideo({});
    const storeImageAndVideoForm = initStoreImageAndVideoForm({});
    const storeFollow = initStoreFollow({});
    const storeGood = initStoreGood({});
    const storeHardware = initStoreHardware({});
    
    
    this.storesObj = {
      
      storeGcRecruitment,
      storeCardPlayer,
      storeForum,
      storeIDForm,
      storeGameForm,
      storeImageAndVideo,
      storeImageAndVideoForm,
      storeFollow,
      storeGood,
      storeHardware,
      
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
    
    // console.log(chalk`
    //   this.props.statusCode: {green ${this.props.statusCode}}
    // `);
    
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const gameCommunities_id = lodashGet(this, ['props', 'propsObj', 'gameCommunityObj', '_id'], '');
    const gameName = lodashGet(this, ['props', 'propsObj', 'headerObj', 'name'], '');
    
    
    // --------------------------------------------------
    //   Title
    // --------------------------------------------------
    
    const title = `${gameName}`;
    
    
    
    
    // --------------------------------------------------
    //   Component - Contents
    // --------------------------------------------------
    
    const componentContent = 
      <Element
        name="recruitmentThreads"
      >
        <RecruitmentThread
          temporaryDataID={this.props.temporaryDataID}
          urlID={this.props.urlID}
          gameCommunities_id={gameCommunities_id}
          settingAnonymity={true}
        />
      </Element>
    ;
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Layout
        storesObj={this.storesObj}
        title={title}
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
  const pathname = `/gc/${urlID}/rec`;
  const temporaryDataID = `/gc/${urlID}/rec`;
  const ISO8601 = moment().utc().toISOString();
  
  
  // --------------------------------------------------
  //   Get Cookie Data & Temporary Data for Fetch
  // --------------------------------------------------
  
  const threadPage = stores.data.getTemporaryData({ pathname: temporaryDataID, key: 'recruitmentThreadPage' });
  const threadLimit = stores.data.getCookie({ key: 'recruitmentThreadLimit' });
  const commentLimit = stores.data.getCookie({ key: 'recruitmentCommentLimit' });
  const replyLimit = stores.data.getCookie({ key: 'recruitmentReplyLimit' });
  
  
  // --------------------------------------------------
  //   Fetch
  // --------------------------------------------------
  
  const resultObj = await fetchWrapper({
    
    urlApi: encodeURI(`${process.env.URL_API}/v2/gc/${urlID}/rec?threadPage=${threadPage}&threadLimit=${threadLimit}&commentLimit=${commentLimit}&replyLimit=${replyLimit}`),
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
  //   /pages/gc/[urlID]/index.js
  // `);
  
  // console.log(`
  //   ----- resultObj -----\n
  //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
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
  
  // console.log(chalk`
  //   reqAcceptLanguage: {green ${reqAcceptLanguage}}
  // `);
  
  
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return { 
    
    props: {
      
      urlID,
      pathname,
      temporaryDataID,
      ISO8601,
      statusCode,
      propsObj,
      
    }
    
  };
  
  
}