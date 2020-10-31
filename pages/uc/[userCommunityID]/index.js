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

import About from 'app/uc/index/v2/about.js';






// --------------------------------------------------
//   Function Components
//   URL: http://localhost:8080/uc/***
// --------------------------------------------------

/**
 * レイアウト
 * @param {Object} props - Props
 */
const ContainerLayout = (props) => {


  // --------------------------------------------------
  //   States
  // --------------------------------------------------

  const stateCommunity = ContainerStateCommunity.useContainer();
  const stateForum = ContainerStateForum.useContainer();

  const { setUserCommunityObj } = stateCommunity;
  const { setForumThreadsForListObj, setForumThreadsObj, setForumCommentsObj, setForumRepliesObj } = stateForum;




  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------

  useEffect(() => {


    // --------------------------------------------------
    //   Router.push でページを移動した際の処理
    //   getServerSideProps でデータを取得してからデータを更新する
    // --------------------------------------------------

    setUserCommunityObj(props.userCommunityObj);
    setForumThreadsForListObj(props.forumThreadsForListObj);
    setForumThreadsObj(props.forumThreadsObj);
    setForumCommentsObj(props.forumCommentsObj);
    setForumRepliesObj(props.forumRepliesObj);


  }, [props.ISO8601]);




  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------

  // console.log(`
  //   ----------------------------------------\n
  //   /pages/uc/[userCommunityID]/index.js - ContainerLayout
  // `);

  // console.log(`
  //   ----- props -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(props)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);

  // console.log(`
  //   ----- forumThreadsObj -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(forumThreadsObj)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);

  // console.log(chalk`
  //   gameCommunities_id: {green ${gameCommunities_id}}
  // `);




  // --------------------------------------------------
  //   Component - Sidebar
  // --------------------------------------------------

  let componentSidebar =
    <React.Fragment>

      <FeedSidebar
        feedObj={props.feedObj}
        top={true}
      />

    </React.Fragment>
  ;

  if (props.accessRightRead) {

    componentSidebar =
      <React.Fragment>

        <ForumNavigation
          userCommunityID={props.userCommunityID}
          userCommunities_id={props.userCommunities_id}
        />

        <FeedSidebar
          feedObj={props.feedObj}
        />

      </React.Fragment>
    ;

  }


  // --------------------------------------------------
  //   Component - Contents
  // --------------------------------------------------

  const componentContent =
    <React.Fragment>

      <Breadcrumbs
        arr={props.breadcrumbsArr}
      />

      {props.accessRightRead &&
        <Forum
          userCommunityID={props.userCommunityID}
          userCommunities_id={props.userCommunities_id}
          enableAnonymity={props.enableAnonymity}
        />
      }

      <About
        headerObj={props.headerObj}
        userCommunityObj={props.userCommunityObj}
        accessRightRead={props.accessRightRead}
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

    userCommunityObj: props.userCommunityObj,
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

  const userCommunityID = query.userCommunityID;


  // --------------------------------------------------
  //   Property
  // --------------------------------------------------

  const ISO8601 = moment().utc().toISOString();


  // --------------------------------------------------
  //   Get Cookie Data
  // --------------------------------------------------

  const threadListPage = 1;
  const threadListLimit = getCookie({ key: 'forumThreadListLimit', reqHeadersCookie });

  const threadPage = 1;
  const threadLimit = getCookie({ key: 'forumThreadLimit', reqHeadersCookie });
  const commentLimit = getCookie({ key: 'forumCommentLimit', reqHeadersCookie });
  const replyLimit = getCookie({ key: 'forumReplyLimit', reqHeadersCookie });




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

  const userCommunities_id = lodashGet(dataObj, ['userCommunityObj', '_id'], '');
  const userCommunityName = lodashGet(dataObj, ['userCommunityObj', 'name'], '');
  const enableAnonymity = lodashGet(dataObj, ['userCommunityObj', 'anonymity'], false);
  const accessRightRead = lodashGet(dataObj, ['accessRightRead'], false);

  const userCommunityObj = lodashGet(dataObj, ['userCommunityObj'], {});
  const forumThreadsForListObj = lodashGet(dataObj, ['forumThreadsForListObj'], {});
  const forumThreadsObj = lodashGet(dataObj, ['forumThreadsObj'], {});
  const forumCommentsObj = lodashGet(dataObj, ['forumCommentsObj'], {});
  const forumRepliesObj = lodashGet(dataObj, ['forumRepliesObj'], {});




  // --------------------------------------------------
  //   Title
  // --------------------------------------------------

  const title = `${userCommunityName}`;




  // --------------------------------------------------
  //   Header Navigation Link
  // --------------------------------------------------

  const headerNavMainArr = [

    {
      name: 'トップ',
      href: `/uc/[userCommunityID]`,
      as: `/uc/${userCommunityID}`,
      active: true,
    },

  ];

  if (accessRightRead) {

    headerNavMainArr.push(
      {
        name: 'メンバー',
        href: `/uc/[userCommunityID]/member`,
        as: `/uc/${userCommunityID}/member`,
        active: false,
      }
    );

  }

  if (accessLevel >= 50) {

    headerNavMainArr.push(
      {
        name: '設定',
        href: `/uc/[userCommunityID]/setting`,
        as: `/uc/${userCommunityID}/setting`,
        active: false,
      }
    );

  }


  // --------------------------------------------------
  //   パンくずリスト
  // --------------------------------------------------

  const breadcrumbsArr = [

    {
      type: 'uc/list',
      anchorText: '',
      href: '/uc/list/[[...slug]]',
      as: `/uc/list`,
    },

    {
      type: 'uc/index',
      anchorText: userCommunityName,
      href: '',
      as: '',
    },

  ];




  // ---------------------------------------------
  //   Set Cookie - recentAccessPage
  // ---------------------------------------------

  res.cookie('recentAccessPageHref', '/uc/[userCommunityID]');
  res.cookie('recentAccessPageAs', `/uc/${userCommunityID}`);




  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------

  // console.log(`
  //   ----------------------------------------\n
  //   /pages/uc/[userCommunityID]/index.js
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
      accessRightRead,

      userCommunityID,
      userCommunities_id,
      userCommunityObj,
      forumThreadsForListObj,
      forumThreadsObj,
      forumCommentsObj,
      forumRepliesObj,
      enableAnonymity,

    }

  };


}




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;
