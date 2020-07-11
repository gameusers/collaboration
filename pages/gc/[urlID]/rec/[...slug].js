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

import { ContainerStateLayout } from 'app/@states/layout.js';
import { ContainerStateGc } from 'app/@states/gc.js';


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
import RecruitmentNavigation from 'app/gc/rec/v2/components/navigation.js';
import Recruitment from 'app/gc/rec/v2/components/recruitment.js';
import Breadcrumbs from 'app/common/layout/v2/components/breadcrumbs.js';






// --------------------------------------------------
//   Function Components
//   URL: https://dev-1.gameusers.org/gc/***/rec/***
// --------------------------------------------------

const ContainerLayout = (props) => {
  
  
  // --------------------------------------------------
  //   States
  // --------------------------------------------------
  
  const stateLayout = ContainerStateLayout.useContainer();
  const stateGc = ContainerStateGc.useContainer();
  
  const {
    
    handleScrollTo,
    
  } = stateLayout;
  
  const {
    
    setGameCommunityObj,
    setRecruitmentThreadsObj,
    setRecruitmentCommentsObj,
    setRecruitmentRepliesObj,
    
  } = stateGc;
  
  
  
  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
  
  useEffect(() => {
    
    
    // --------------------------------------------------
    //   Router.push でページを移動した際の処理
    //   getServerSideProps でデータを取得してからデータを更新する
    // --------------------------------------------------
    
    setGameCommunityObj(props.gameCommunityObj);
    setRecruitmentThreadsObj(props.recruitmentThreadsObj);
    setRecruitmentCommentsObj(props.recruitmentCommentsObj);
    setRecruitmentRepliesObj(props.recruitmentRepliesObj);
    
    
    // ---------------------------------------------
    //   Scroll To
    // ---------------------------------------------
    
    handleScrollTo({
      
      to: 'recruitmentThreads',
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
    <RecruitmentNavigation
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
      
      <Recruitment
        urlID={props.urlID}
        gameCommunities_id={props.gameCommunities_id}
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
    
    gameCommunityObj: props.gameCommunityObj,
    recruitmentThreadsObj: props.recruitmentThreadsObj,
    recruitmentCommentsObj: props.recruitmentCommentsObj,
    recruitmentRepliesObj: props.recruitmentRepliesObj,
    
    hardwaresArr: props.hardwaresArr,
    categories: props.categories,
    keyword: props.keyword,
    
  };
  
  // console.log(chalk`
  //   /pages/gc/[urlID]/rec/[...slug].js - Component
  //   categories: {green ${props.categories}}
  //   keyword: {green ${props.keyword}}
  // `);
  
  
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
    <ContainerStateGc.Provider initialState={initialStateObj}>
      
      <ContainerLayout {...props} />
      
    </ContainerStateGc.Provider>
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
  
  const ISO8601 = moment().utc().toISOString();
  
  
  
  
  // --------------------------------------------------
  //   Get Cookie Data
  // --------------------------------------------------
  
  const threadLimit = getCookie({ key: 'recruitmentThreadLimit', reqHeadersCookie });
  const commentLimit = getCookie({ key: 'recruitmentCommentLimit', reqHeadersCookie });
  const replyLimit = getCookie({ key: 'recruitmentReplyLimit', reqHeadersCookie });
  
  
  
  
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
  
  const login = lodashGet(dataObj, ['login'], false);
  const loginUsersObj = lodashGet(dataObj, ['loginUsersObj'], {});
  const accessLevel = lodashGet(dataObj, ['accessLevel'], 1);
  const headerObj = lodashGet(dataObj, ['headerObj'], {});
  const gameCommunities_id = lodashGet(dataObj, ['gameCommunityObj', '_id'], '');
  const gameName = lodashGet(dataObj, ['headerObj', 'name'], '');
  
  const gameCommunityObj = lodashGet(dataObj, ['gameCommunityObj'], {});
  const recruitmentThreadsObj = lodashGet(dataObj, ['recruitmentThreadsObj'], {});
  const recruitmentCommentsObj = lodashGet(dataObj, ['recruitmentCommentsObj'], {});
  const recruitmentRepliesObj = lodashGet(dataObj, ['recruitmentRepliesObj'], {});
  
  const hardwaresArr = lodashGet(dataObj, ['hardwaresArr'], []);
  
  
  
  
  // --------------------------------------------------
  //   Title
  // --------------------------------------------------
  
  let title = '';
  
  
  
  
  // --------------------------------------------------
  //   Header Navigation Link
  // --------------------------------------------------
  
  const headerNavMainArr = [
    
    {
      name: 'トップ',
      href: `/gc/[urlID]/index?urlID=${urlID}`,
      as: `/gc/${urlID}`,
      active: false,
    },
    {
      name: '募集',
      href: `/gc/[urlID]/rec?urlID=${urlID}`,
      as: `/gc/${urlID}/rec`,
      active: true,
    },
    {
      name: 'フォロワー',
      href: '/',
      as: '/',
      active: false,
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
  //   /pages/gc/[urlID]/rec/[...slug].js
  // `);
  
  // console.log(`
  //   ----- resultObj -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(resultObj)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  // console.log(chalk`
  //   threadPage: {green ${threadPage}}
  //   threadLimit: {green ${threadLimit}}
  //   commentLimit: {green ${commentLimit}}
  //   replyLimit: {green ${replyLimit}}
  // `);
  
  // console.log(chalk`
  //   hardwares: {green ${hardwares}}
  //   categories: {green ${categories}}
  //   keyword: {green ${keyword}}
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
      
      urlID,
      gameCommunities_id,
      gameCommunityObj,
      recruitmentThreadsObj,
      recruitmentCommentsObj,
      recruitmentRepliesObj,
      
      hardwaresArr,
      categories,
      keyword,
      
    }
    
  };
  
  
}




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;