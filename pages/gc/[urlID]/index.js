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
import { useIntl } from 'react-intl';
import { useSnackbar } from 'notistack';
import { animateScroll as scroll } from 'react-scroll';
import moment from 'moment';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';
import lodashIsEqual from 'lodash/isEqual';


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
import { showSnackbar } from 'app/@modules/snackbar.js';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Layout from 'app/common/layout/v2/layout.js';
import ForumNavigation from 'app/common/forum/v2/navigation.js';
import Forum from 'app/common/forum/v2/forum.js';
import Breadcrumbs from 'app/common/layout/v2/breadcrumbs.js';






// --------------------------------------------------
//   Function Components
//   URL: https://dev-1.gameusers.org/gc/***
// --------------------------------------------------

const ContainerLayout = (props) => {
  
  
  // --------------------------------------------------
  //   States
  // --------------------------------------------------
  
  const stateLayout = ContainerStateLayout.useContainer();
  const stateCommunity = ContainerStateCommunity.useContainer();
  const stateForum = ContainerStateForum.useContainer();
  
  const {
    
    headerObj,
    setHeaderObj,
    
  } = stateLayout;
  
  const {
    
    setGameCommunityObj,
    
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
  
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();
  
  
  useEffect(() => {
    
    
    // --------------------------------------------------
    //   Header 更新 - データに変更があった場合のみステートを更新
    // --------------------------------------------------
    
    if (lodashIsEqual(headerObj, props.headerObj) === false) {
      setHeaderObj(props.headerObj);
    }
    
    
    // --------------------------------------------------
    //   Snackbar
    // --------------------------------------------------
    
    if (Object.keys(props.experienceObj).length !== 0) {
      
      showSnackbar({
        
        enqueueSnackbar,
        intl,
        experienceObj: props.experienceObj,
        arr: [
          {
            variant: 'success',
            messageID: 'LjWizvlER',
          },
          
        ]
        
      });
      
    }
    
    
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
    
    // scroll.scrollToTop({ duration: 0 });
    
    
  }, [props.ISO8601]);
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /pages/gc/[urlID]/forum/[...slug].js - ContainerLayout
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
  
  const componentSidebar =
    <ForumNavigation
      urlID={props.urlID}
      gameCommunities_id={props.gameCommunities_id}
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
      
      <Forum
        urlID={props.urlID}
        gameCommunities_id={props.gameCommunities_id}
        enableAnonymity={true}
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
  
  // console.log(`
  //   ----- query -----\n
  //   ${util.inspect(query, { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  
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
  
  const login = lodashGet(dataObj, ['login'], false);
  const loginUsersObj = lodashGet(dataObj, ['loginUsersObj'], {});
  const accessLevel = lodashGet(dataObj, ['accessLevel'], 1);
  const headerObj = lodashGet(dataObj, ['headerObj'], {});
  const experienceObj = lodashGet(dataObj, ['experienceObj'], {});
  
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
  
  const title = `${gameName} - Game Users`;
  
  
  
  
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
      href: `/gc/[urlID]/rec`,
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
        href: `/gc/[urlID]/settings`,
        as: `/gc/${urlID}/settings`,
        active: false,
      }
    );
    
  }
  
  
  
  
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
      
      urlID,
      gameCommunities_id,
      gameCommunityObj,
      forumThreadsForListObj,
      forumThreadsObj,
      forumCommentsObj,
      forumRepliesObj,
      
    }
    
  };
  
  
}




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;