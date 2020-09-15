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

import React, { useState, useEffect } from 'react';
import Error from 'next/error';
import moment from 'moment';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';


// ---------------------------------------------
//   States
// ---------------------------------------------

// import { ContainerStateCommunity } from 'app/@states/community.js';
// import { ContainerStateForum } from 'app/@states/forum.js';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { fetchWrapper } from 'app/@modules/fetch.js';
import { createCsrfToken } from 'app/@modules/csrf.js';
import { getCookie } from 'app/@modules/cookie.js';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Layout from 'app/common/layout/v2/layout.js';
import Breadcrumbs from 'app/common/layout/v2/breadcrumbs.js';
import FeedSidebar from 'app/common/feed/v2/sidebar.js';
import FeedHorizontal from 'app/common/feed/v2/horizontal.js';

import CardGC from 'app/common/community-list/v2/card-gc.js';






// --------------------------------------------------
//   Function Components
//   URL: http://localhost:8080/gc/***
// --------------------------------------------------

/**
 * レイアウト
 * @param {Object} props - Props
 */
const ContainerLayout = (props) => {


  // --------------------------------------------------
  //   States
  // --------------------------------------------------

  // const stateCommunity = ContainerStateCommunity.useContainer();
  // const stateForum = ContainerStateForum.useContainer();

  // const { setGameCommunityObj } = stateCommunity;
  // const { setForumThreadsForListObj, setForumThreadsObj, setForumCommentsObj, setForumRepliesObj } = stateForum;


  // // --------------------------------------------------
  // //   Hooks
  // // --------------------------------------------------

  // useEffect(() => {


  //   // --------------------------------------------------
  //   //   Router.push でページを移動した際の処理
  //   //   getServerSideProps でデータを取得してからデータを更新する
  //   // --------------------------------------------------

  //   setGameCommunityObj(props.gameCommunityObj);
  //   setForumThreadsForListObj(props.forumThreadsForListObj);
  //   setForumThreadsObj(props.forumThreadsObj);
  //   setForumCommentsObj(props.forumCommentsObj);
  //   setForumRepliesObj(props.forumRepliesObj);


  // }, [props.ISO8601]);




  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------

  // console.log(`
  //   ----------------------------------------\n
  //   /pages/gc/[urlID]/index.js - ContainerLayout
  // `);

  // console.log(`
  //   ----- props -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(props)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);

  // console.log(chalk`
  //   gameCommunities_id: {green ${gameCommunities_id}}
  // `);




  // --------------------------------------------------
  //   Component - Sidebar
  // --------------------------------------------------

  const componentSidebar =
    <React.Fragment>

      {/* <ForumNavigation
        urlID={props.urlID}
        gameCommunities_id={props.gameCommunities_id}
      /> */}

      <FeedSidebar
        feedObj={props.feedObj}
        top={true}
      />

    </React.Fragment>
  ;


  // --------------------------------------------------
  //   Component - Contents
  // --------------------------------------------------

  const componentContent =
    <React.Fragment>

      <Breadcrumbs
        arr={props.breadcrumbsArr}
      />

      {/* <Forum
        urlID={props.urlID}
        gameCommunities_id={props.gameCommunities_id}
        enableAnonymity={true}
      /> */}

      <CardGC />

      {/* <FeedHorizontal
        feedObj={props.feedObj}
      /> */}

    </React.Fragment>
  ;


  // --------------------------------------------------
  //   Return
  // --------------------------------------------------

  return (
    <Layout
      title={props.title}
      componentSidebar={componentSidebar}
      componentContent={componentContent}

      headerObj={props.headerObj}
      headerNavMainArr={props.headerNavMainArr}
    />
  );


};




/**
 * コンポーネント / このページ独自のステートを設定する
 * @param {Object} props - Props
 */
const Component = (props) => {


  // --------------------------------------------------
  //   Error
  //   参考：https://nextjs.org/docs/advanced-features/custom-error-page#reusing-the-built-in-error-page
  // --------------------------------------------------

  if (props.statusCode !== 200) {
    return <Error statusCode={props.statusCode} />;
  }


  // --------------------------------------------------
  //   unstated-next - Initial State
  // --------------------------------------------------

  // const initialStateObj = {

  //   gameCommunityObj: props.gameCommunityObj,
  //   forumThreadsForListObj: props.forumThreadsForListObj,
  //   forumThreadsObj: props.forumThreadsObj,
  //   forumCommentsObj: props.forumCommentsObj,
  //   forumRepliesObj: props.forumRepliesObj,

  // };


  // --------------------------------------------------
  //   Return
  // --------------------------------------------------

  return <ContainerLayout {...props} />;


};




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


  // --------------------------------------------------
  //   Query
  // --------------------------------------------------

  const page = query.page;


  // --------------------------------------------------
  //   Property
  // --------------------------------------------------

  const ISO8601 = moment().utc().toISOString();


  // --------------------------------------------------
  //   Get Cookie Data
  // --------------------------------------------------

  // const page = 1;
  const limit = getCookie({ key: 'communityLimit', reqHeadersCookie });


  // --------------------------------------------------
  //   Fetch
  // --------------------------------------------------

  const resultObj = await fetchWrapper({

    urlApi: encodeURI(`${process.env.NEXT_PUBLIC_URL_API}/v2/gc/list?page=${page}&limit=${limit}`),
    methodType: 'GET',
    reqHeadersCookie,
    reqAcceptLanguage,

  });

  const statusCode = lodashGet(resultObj, ['statusCode'], 400);
  const dataObj = lodashGet(resultObj, ['data'], {});


  // --------------------------------------------------
  //   dataObj
  // --------------------------------------------------

  const login = lodashGet(dataObj, ['login'], false);
  const loginUsersObj = lodashGet(dataObj, ['loginUsersObj'], {});
  // const accessLevel = lodashGet(dataObj, ['accessLevel'], 1);
  const headerObj = lodashGet(dataObj, ['headerObj'], {});
  const experienceObj = lodashGet(dataObj, ['experienceObj'], {});
  const feedObj = lodashGet(dataObj, ['feedObj'], {});

  // const gameCommunities_id = lodashGet(dataObj, ['gameCommunityObj', '_id'], '');
  // const gameName = lodashGet(dataObj, ['headerObj', 'name'], '');
  // const gameCommunityObj = lodashGet(dataObj, ['gameCommunityObj'], {});
  // const forumThreadsForListObj = lodashGet(dataObj, ['forumThreadsForListObj'], {});
  // const forumThreadsObj = lodashGet(dataObj, ['forumThreadsObj'], {});
  // const forumCommentsObj = lodashGet(dataObj, ['forumCommentsObj'], {});
  // const forumRepliesObj = lodashGet(dataObj, ['forumRepliesObj'], {});


  // --------------------------------------------------
  //   Title
  // --------------------------------------------------

  const title = `ゲームコミュニティ - Game Users`;


  // --------------------------------------------------
  //   Header Navigation Link
  // --------------------------------------------------

  const headerNavMainArr = [

    {
      name: 'トップ',
      href: `/`,
      as: `/`,
      active: false,
    },

    {
      name: 'ゲームC',
      href: `/gc/list/[[...slug]]`,
      as: `/gc/list`,
      active: true,
    },

    {
      name: 'ユーザーC',
      href: `/uc/list/[[...slug]]`,
      as: `/uc/list`,
      active: false,
    }

  ];


  // --------------------------------------------------
  //   パンくずリスト
  // --------------------------------------------------

  const breadcrumbsArr = [

    {
      type: 'gc/list',
      anchorText: '',
      href: '',
      as: '',
    },

    // {
    //   type: 'gc/list',
    //   anchorText: gameName,
    //   href: '',
    //   as: '',
    // },

  ];


  // ---------------------------------------------
  //   Set Cookie - recentAccessPage
  // ---------------------------------------------

  // res.cookie('recentAccessPageHref', '/gc/[urlID]');
  // res.cookie('recentAccessPageAs', `/gc/${urlID}`);




  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------

  // console.log(`
  //   ----------------------------------------\n
  //   /pages/gc/[urlID]/index.js
  // `);

  // console.log(`
  //   ----- resultObj -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(resultObj)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);

  // console.log(chalk`
  //   ISO8601: {green ${ISO8601}}
  //   loginUsersObj.accessDate: {green ${loginUsersObj.accessDate}}
  // `);

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

      reqAcceptLanguage,
      ISO8601,
      statusCode,
      login,
      loginUsersObj,
      title,
      headerObj,
      headerNavMainArr,
      breadcrumbsArr,
      experienceObj,
      feedObj,

      // urlID,
      // gameCommunities_id,
      // gameCommunityObj,
      // forumThreadsForListObj,
      // forumThreadsObj,
      // forumCommentsObj,
      // forumRepliesObj,

    }

  };


}




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;
