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

import { ContainerStateLayout } from 'app/@states/layout.js';
import { ContainerStateCommunity } from 'app/@states/community.js';
import { ContainerStateForum } from 'app/@states/forum.js';


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
import ForumNavigation from 'app/common/forum/v2/navigation.js';
import Forum from 'app/common/forum/v2/forum.js';
import Breadcrumbs from 'app/common/layout/v2/breadcrumbs.js';
import FeedSidebar from 'app/common/feed/v2/sidebar.js';
import FeedHorizontal from 'app/common/feed/v2/horizontal.js';






// --------------------------------------------------
//   Function Components
//   URL: http://localhost:8080/gc/***/forum/***
// --------------------------------------------------

/**
 * レイアウト
 * @param {Object} props - Props
 */
const ContainerLayout = (props) => {


  // --------------------------------------------------
  //   States
  // --------------------------------------------------

  const stateLayout = ContainerStateLayout.useContainer();
  const stateCommunity = ContainerStateCommunity.useContainer();
  const stateForum = ContainerStateForum.useContainer();

  const { handleScrollTo } = stateLayout;
  const { setGameCommunityObj } = stateCommunity;
  const { setForumThreadsForListObj, setForumThreadsObj, setForumCommentsObj, setForumRepliesObj } = stateForum;


  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------

  useEffect(() => {


    // --------------------------------------------------
    //   Router.push でページを移動した際の処理
    //   getServerSideProps でデータを取得してからデータを更新する
    // --------------------------------------------------

    setGameCommunityObj(props.gameCommunityObj);
    setForumThreadsForListObj(props.forumThreadsForListObj);
    setForumThreadsObj(props.forumThreadsObj);
    setForumCommentsObj(props.forumCommentsObj);
    setForumRepliesObj(props.forumRepliesObj);


    // ---------------------------------------------
    //   Scroll To
    // ---------------------------------------------

    handleScrollTo({

      to: 'forumThreads',
      duration: 0,
      delay: 0,
      smooth: 'easeInOutQuart',
      offset: -50,

    });


  }, [props.ISO8601]);




  // --------------------------------------------------
  //   Component - Sidebar
  // --------------------------------------------------

  const componentSidebar =
    <React.Fragment>

      <ForumNavigation
        urlID={props.urlID}
        forumID={props.forumID}
        gameCommunities_id={props.gameCommunities_id}
      />

      <FeedSidebar
        feedObj={props.feedObj}
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

      <Forum
        urlID={props.urlID}
        gameCommunities_id={props.gameCommunities_id}
        enableAnonymity={true}
        individual={props.individual}
      />

      <FeedHorizontal
        feedObj={props.feedObj}
      />

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

  const initialStateObj = {

    gameCommunityObj: props.gameCommunityObj,
    forumThreadsForListObj: props.forumThreadsForListObj,
    forumThreadsObj: props.forumThreadsObj,
    forumCommentsObj: props.forumCommentsObj,
    forumRepliesObj: props.forumRepliesObj,

  };


  // --------------------------------------------------
  //   Return
  // --------------------------------------------------

  return (
    <ContainerStateCommunity.Provider initialState={initialStateObj}>

      <ContainerStateForum.Provider initialState={initialStateObj}>

        <ContainerLayout {...props} />

      </ContainerStateForum.Provider>

    </ContainerStateCommunity.Provider>
  );


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

  const urlID = query.urlID;

  const slugsArr = lodashGet(query, ['slug'], []);

  let threadPage = lodashGet(query, ['page'], 1);
  let forumID = '';
  let pageType = 'forum';

  if (Math.sign(slugsArr[0]) === 1) {

    threadPage = slugsArr[0];

  } else {

    forumID = slugsArr[0];
    pageType = 'individual';

  }

  let individual = false;


  // console.log(`
  //   ----- query -----\n
  //   ${util.inspect(query, { colors: true, depth: null })}\n
  //   --------------------\n
  // `);

  // console.log(`
  //   ----- slugsArr -----\n
  //   ${util.inspect(slugsArr, { colors: true, depth: null })}\n
  //   --------------------\n
  // `);


  // --------------------------------------------------
  //   Property
  // --------------------------------------------------

  const ISO8601 = moment().utc().toISOString();


  // --------------------------------------------------
  //   Get Cookie Data & Temporary Data for Fetch
  // --------------------------------------------------

  const threadListPage = 1;
  const threadListLimit = getCookie({ key: 'forumThreadListLimit', reqHeadersCookie });

  const threadLimit = getCookie({ key: 'forumThreadLimit', reqHeadersCookie });
  const commentLimit = getCookie({ key: 'forumCommentLimit', reqHeadersCookie });
  const replyLimit = getCookie({ key: 'forumReplyLimit', reqHeadersCookie });


  // --------------------------------------------------
  //   Fetch
  // --------------------------------------------------

  const resultObj = await fetchWrapper({

    urlApi: encodeURI(`${process.env.NEXT_PUBLIC_URL_API}/v2/gc/${urlID}?forumID=${forumID}&threadListPage=${threadListPage}&threadListLimit=${threadListLimit}&threadPage=${threadPage}&threadLimit=${threadLimit}&commentLimit=${commentLimit}&replyLimit=${replyLimit}`),
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
  const accessLevel = lodashGet(dataObj, ['accessLevel'], 1);
  const headerObj = lodashGet(dataObj, ['headerObj'], {});
  const experienceObj = lodashGet(dataObj, ['experienceObj'], {});
  const feedObj = lodashGet(dataObj, ['feedObj'], {});

  const gameCommunities_id = lodashGet(dataObj, ['gameCommunityObj', '_id'], '');
  const gameName = lodashGet(dataObj, ['headerObj', 'name'], '');
  const gameCommunityObj = lodashGet(dataObj, ['gameCommunityObj'], {});
  const forumThreadsForListObj = lodashGet(dataObj, ['forumThreadsForListObj'], {});
  const forumThreadsObj = lodashGet(dataObj, ['forumThreadsObj'], {});
  const forumCommentsObj = lodashGet(dataObj, ['forumCommentsObj'], {});
  const forumRepliesObj = lodashGet(dataObj, ['forumRepliesObj'], {});


  // --------------------------------------------------
  //   Title
  // --------------------------------------------------

  let title = `フォーラム: Page ${threadPage} - ${gameName}`;


  // --------------------------------------------------
  //   Header Navigation Link
  // --------------------------------------------------

  const headerNavMainArr = [

    {
      name: 'トップ',
      href: `/gc/[urlID]`,
      as: `/gc/${urlID}`,
      active: true,
    },

    {
      name: '募集',
      href: `/gc/[urlID]/rec/[[...slug]]`,
      as: `/gc/${urlID}/rec`,
      active: false,
    },

    {
      name: 'フォロワー',
      href: `/gc/[urlID]/follower`,
      as: `/gc/${urlID}/follower`,
      active: false,
    }

  ];

  if (accessLevel === 100) {

    headerNavMainArr.push(
      {
        name: '設定',
        href: `/gc/[urlID]/setting`,
        as: `/gc/${urlID}/setting`,
        active: false,
      }
    );

  }


  // --------------------------------------------------
  //   パンくずリスト
  // --------------------------------------------------

  const breadcrumbsArr = [

    {
      type: 'gc/list',
      anchorText: '',
      href: '/gc/list/[[...slug]]',
      as: `/gc/list`,
    },

    {
      type: 'gc/index',
      anchorText: gameName,
      href: `/gc/[urlID]`,
      as: `/gc/${urlID}`,
    },

  ];


  // --------------------------------------------------
  //   recentAccessPage
  // --------------------------------------------------

  let recentAccessPageHref = `/gc/[urlID]/forum/[[...slug]]`;
  let recentAccessPageAs = `/gc/${urlID}`;


  // --------------------------------------------------
  //   通常のフォーラム
  // --------------------------------------------------

  if (pageType === 'forum') {


    // ---------------------------------------------
    //   - パンくずリスト
    // ---------------------------------------------

    breadcrumbsArr.push(

      {
        type: 'gc/forum',
        anchorText: '',
        href: '',
        as: '',
      },

    );


    // --------------------------------------------------
    //   - recentAccessPage
    // --------------------------------------------------

    if (threadPage > 1) {
      recentAccessPageAs = `/gc/${urlID}/forum/${threadPage}`;
    }


  // --------------------------------------------------
  //   個別のフォーラム
  // --------------------------------------------------

  } else if (pageType === 'individual') {


    // ---------------------------------------------
    //   - Title
    // ---------------------------------------------

    const forumThreadsArr = lodashGet(dataObj, ['forumThreadsObj', 'page1Obj', 'arr'], []);
    const forumName = lodashGet(dataObj, ['forumThreadsObj', 'dataObj', forumThreadsArr[0], 'name'], '');

    title = `${forumName} - ${gameName}`;


    // ---------------------------------------------
    //   - パンくずリスト
    // ---------------------------------------------

    breadcrumbsArr.push(

      {
        type: 'gc/forum/individual',
        anchorText: forumName,
        href: '',
        as: '',
      }

    );


    // ---------------------------------------------
    //   - Individual
    // ---------------------------------------------

    individual = true;


    // --------------------------------------------------
    //   - recentAccessPage
    // --------------------------------------------------

    recentAccessPageAs = `/gc/${urlID}/forum/${forumID}`;


  }


  // ---------------------------------------------
  //   Set Cookie - recentAccessPage
  // ---------------------------------------------

  res.cookie('recentAccessPageHref', recentAccessPageHref);
  res.cookie('recentAccessPageAs', recentAccessPageAs);


  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------

  // console.log(`
  //   ----------------------------------------\n
  //   /pages/gc/[urlID]/forum/[...slug].js
  // `);

  // console.log(`
  //   ----- resultObj -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(resultObj)), { colors: true, depth: null })}\n
  //   --------------------\n
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

      urlID,
      gameCommunities_id,
      gameCommunityObj,
      forumID,
      forumThreadsForListObj,
      forumThreadsObj,
      forumCommentsObj,
      forumRepliesObj,
      individual,

    }

  };


}




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;
