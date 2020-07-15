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
import { animateScroll as scroll } from 'react-scroll';
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
import { getCookie } from 'app/@modules/cookie.js';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Layout from 'app/common/layout/v2/components/layout.js';
import ForumNavigation from 'app/common/forum/v2/components/navigation.js';
import Forum from 'app/common/forum/v2/components/forum.js';
import Breadcrumbs from 'app/common/layout/v2/components/breadcrumbs.js';


// ---------------------------------------------
//   States
// ---------------------------------------------

import { ContainerStateLayout } from 'app/@states/layout.js';
import { ContainerStateCommunity } from 'app/@states/community.js';
import { ContainerStateForum } from 'app/@states/forum.js';






// --------------------------------------------------
//   Function Components
//   URL: https://dev-1.gameusers.org/gc/***/forum/***
// --------------------------------------------------

const ContainerLayout = (props) => {
  
  
  // --------------------------------------------------
  //   States
  // --------------------------------------------------
  
  // const stateLayout = ContainerStateLayout.useContainer();
  // const stateCommunity = ContainerStateCommunity.useContainer();
  // const stateForum = ContainerStateForum.useContainer();
  
  // const {
    
  //   handleScrollTo,
    
  // } = stateLayout;
  
  // const {
    
  //   setUserCommunityObj,
    
  // } = stateCommunity;
  
  // const {
    
  //   setForumThreadsForListObj,
  //   setForumThreadsObj,
  //   setForumCommentsObj,
  //   setForumRepliesObj,
    
  // } = stateForum;
  
  
  
  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
  
  useEffect(() => {
    
    
    // --------------------------------------------------
    //   Router.push でページを移動した際の処理
    //   getServerSideProps でデータを取得してからデータを更新する
    // --------------------------------------------------
    
    // setUserCommunityObj(props.userCommunityObj);
    // setForumThreadsForListObj(props.forumThreadsForListObj);
    // setForumThreadsObj(props.forumThreadsObj);
    // setForumCommentsObj(props.forumCommentsObj);
    // setForumRepliesObj(props.forumRepliesObj);
    
    
    // ---------------------------------------------
    //   Scroll To
    // ---------------------------------------------
    
    scroll.scrollToTop({ duration: 0 });
    
    
  }, [props.ISO8601]);
  
  
  
  
  // --------------------------------------------------
  //   Component - Sidebar
  // --------------------------------------------------
  
  const componentSidebar = '';
  // const componentSidebar =
  //   <ForumNavigation
  //     userCommunityID={props.userCommunityID}
  //     userCommunities_id={props.userCommunities_id}
  //     forumID={props.forumID}
  //   />
  // ;
  
  
  
  
  // --------------------------------------------------
  //   Component - Contents
  // --------------------------------------------------
  
  const componentContent = 
    <React.Fragment>
      
      <Breadcrumbs
        arr={props.breadcrumbsArr}
      />
      
      {/*<Forum
        userCommunityID={props.userCommunityID}
        userCommunities_id={props.userCommunities_id}
        enableAnonymity={props.enableAnonymity}
        individual={props.individual}
      />*/}
      
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




const Component = (props) => {
  
  
  // --------------------------------------------------
  //   unstated-next - Initial State
  // --------------------------------------------------
  
  // const initialStateObj = {
    
  //   userCommunityObj: props.userCommunityObj,
  //   forumThreadsForListObj: props.forumThreadsForListObj,
  //   forumThreadsObj: props.forumThreadsObj,
  //   forumCommentsObj: props.forumCommentsObj,
  //   forumRepliesObj: props.forumRepliesObj,
    
  // };
  
  
  
  
  // --------------------------------------------------
  //   Error
  //   参考：https://nextjs.org/docs/advanced-features/custom-error-page#reusing-the-built-in-error-page
  // --------------------------------------------------
  
  if (props.statusCode !== 200) {
    return <Error statusCode={props.statusCode} />;
  }
  
  
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return (
    <ContainerLayout {...props} />
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
  //   Get Cookie Data & Temporary Data for Fetch
  // --------------------------------------------------
  
  const page = 1;
  const limit = getCookie({ key: 'followLimit', reqHeadersCookie });
  
  
  
  
  // --------------------------------------------------
  //   Fetch
  // --------------------------------------------------
  
  const resultObj = await fetchWrapper({
    
    urlApi: encodeURI(`${process.env.NEXT_PUBLIC_URL_API}/v2/uc/${userCommunityID}/members?page=${page}&limit=${limit}`),
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
  
  const userCommunities_id = lodashGet(dataObj, ['userCommunityObj', '_id'], '');
  const userCommunityName = lodashGet(dataObj, ['userCommunityObj', 'name'], '');
  const accessRightRead = lodashGet(dataObj, ['accessRightRead'], false);
  const communityType = lodashGet(dataObj, ['userCommunityObj', 'communityType'], 'open');
  
  
  
  
  // --------------------------------------------------
  //   Title
  // --------------------------------------------------
  
  const title = `メンバー: ${userCommunityName}`;
  
  
  
  
  // --------------------------------------------------
  //   Header Navigation Link
  // --------------------------------------------------
  
  const headerNavMainArr = [
    
    {
      name: 'トップ',
      href: `/uc/[userCommunityID]/index?userCommunityID=${userCommunityID}`,
      as: `/uc/${userCommunityID}`,
      active: false,
    },
    
  ];
  
  if (communityType === 'open' || (communityType === 'closed' && accessLevel >= 3)) {
    
    headerNavMainArr.push(
      {
        name: 'メンバー',
        href: `/uc/[userCommunityID]/members/index?userCommunityID=${userCommunityID}`,
        as: `/uc/${userCommunityID}/members`,
        active: true,
      }
    );
    
  }
  
  if (accessLevel >= 50) {
    
    headerNavMainArr.push(
      {
        name: '設定',
        href: `/uc/[userCommunityID]/settings?userCommunityID=${userCommunityID}`,
        as: `/uc/${userCommunityID}/settings`,
        active: false,
      }
    );
    
  }
  
  
  
  
  // --------------------------------------------------
  //   パンくずリスト
  // --------------------------------------------------
  
  const breadcrumbsArr = [
    
    {
      type: 'uc',
      anchorText: '',
      href: `/uc/index`,
      as: `/uc`,
    },
    
    {
      type: 'uc/index',
      anchorText: userCommunityName,
      href: `/uc/[userCommunityID]/index?userCommunityID=${userCommunityID}`,
      as: `/uc/${userCommunityID}`,
    },
    
    {
      type: 'uc/members',
      anchorText: '',
      href: '',
      as: '',
    },
    
  ];
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  console.log(`
    ----------------------------------------\n
    /pages/uc/[userCommunityID]/members/index.js
  `);
  
  console.log(`
    ----- resultObj -----\n
    ${util.inspect(JSON.parse(JSON.stringify(resultObj)), { colors: true, depth: null })}\n
    --------------------\n
  `);
  
  console.log(chalk`
    page: {green ${page}}
    limit: {green ${limit}}
  `);
  
  
  
  
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
      
      userCommunityID,
      userCommunities_id,
      
    }
    
  };
  
  
}




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;