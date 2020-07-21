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

import Layout from 'app/common/layout/v2/components/layout.js';
import Breadcrumbs from 'app/common/layout/v2/components/breadcrumbs.js';

import FollowMembers from 'app/common/follow/v2/components/members.js';
// import Cards from 'app/ur/v2/components/cards.js';






// --------------------------------------------------
//   Function Components
//   URL: https://dev-1.gameusers.org/gc/***
// --------------------------------------------------

const ContainerLayout = (props) => {
  
  
  // --------------------------------------------------
  //   States
  // --------------------------------------------------
  
  const stateCommunity = ContainerStateCommunity.useContainer();
  const stateForum = ContainerStateForum.useContainer();
  
  const {
    
    setUserCommunityObj,
    
  } = stateCommunity;
  
  const {
    
    setForumThreadsForListObj,
    setForumThreadsObj,
    setForumCommentsObj,
    setForumRepliesObj,
    
  } = stateForum;
  
  
  
  
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
    
    
    // ---------------------------------------------
    //   Scroll To
    // ---------------------------------------------
    
    scroll.scrollToTop({ duration: 0 });
    
    
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
  
  // console.log(chalk`
  //   gameCommunities_id: {green ${gameCommunities_id}}
  // `);
  
  
  
  
  // --------------------------------------------------
  //   Component - Sidebar
  // --------------------------------------------------
  
  const componentSidebar =
    <img
      src="/img/common/advertisement/300x250.jpg"
      width="300"
      height="250"
    />
  ;
  
  
  
  
  // --------------------------------------------------
  //   Component - Contents
  // --------------------------------------------------
  
  const componentContent = 
    <React.Fragment>
      
      <Breadcrumbs
        arr={props.breadcrumbsArr}
      />
      
      <FollowMembers
        pageType="ur"
        users_id={props.users_id}
        accessLevel={props.accessLevel}
        cardPlayersObj={props.cardPlayersObj}
        followMembersObj={props.followMembersObj}
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




const Component = (props) => {
  
  
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
  //   Error
  //   参考：https://nextjs.org/docs/advanced-features/custom-error-page#reusing-the-built-in-error-page
  // --------------------------------------------------
  
  if (props.statusCode !== 200) {
    return <Error statusCode={props.statusCode} />;
  }
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /pages/uc/[userCommunityID]/index.js
  // `);
  
  // console.log(`
  //   ----- headerObj -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(headerObj)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  // console.log(`
  //   ----- headerNavMainArr -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(headerNavMainArr)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  // console.log(chalk`
  //   gameCommunities_id: {green ${gameCommunities_id}}
  // `);
  
  
  
  
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
  
  const userID = query.userID;
  
  
  
  
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
    
    urlApi: encodeURI(`${process.env.NEXT_PUBLIC_URL_API}/v2/ur/${userID}/follow?page=${page}&limit=${limit}`),
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
  
  // const pagesArr = lodashGet(dataObj, ['pagesObj', 'arr'], []);
  const users_id = lodashGet(dataObj, ['users_id'], '');
  const cardPlayersObj = lodashGet(dataObj, ['cardPlayersObj'], {});
  const followMembersObj = lodashGet(dataObj, ['followMembersObj'], {});
  
  
  
  
  // --------------------------------------------------
  //   Title
  // --------------------------------------------------
  
  const userName = lodashGet(headerObj, ['name'], '');
  const title = `フォロー - ${userName}`;
  
  
  
  
  // --------------------------------------------------
  //   Header Navigation Link
  // --------------------------------------------------
  
  const headerNavMainArr = [
    
    {
      name: 'トップ',
      href: `/ur/[userID]/index?userID=${userID}`,
      as: `/ur/${userID}`,
      active: false,
    },
    
    {
      name: 'フォロー',
      href: `/ur/[userID]/follow?userID=${userID}`,
      as: `/ur/${userID}/follow`,
      active: true,
    },
    
  ];
  
  if (accessLevel >= 50) {
    
    headerNavMainArr.push(
      {
        name: '設定',
        href: `/ur/[userID]/settings?userID=${userID}`,
        as: `/ur/${userID}/settings`,
        active: false,
      }
    );
    
  }
  
  
  
  
  // --------------------------------------------------
  //   パンくずリスト
  // --------------------------------------------------
  
  const breadcrumbsArr = [
    
    {
      type: 'ur',
      anchorText: '',
      href: `/ur/[userID]/index?userID=${userID}`,
      as: `/ur/${userID}`,
    },
    
    {
      type: 'ur/follow',
      anchorText: '',
      href: '',
      as: '',
    },
    
  ];
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /pages/ur/[userID]/index.js
  // `);
  
  // console.log(`
  //   ----- resultObj -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(resultObj)), { colors: true, depth: null })}\n
  //   --------------------\n
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
      
      accessLevel,
      userID,
      users_id,
      cardPlayersObj,
      followMembersObj,
      
    }
    
  };
  
  
}




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;