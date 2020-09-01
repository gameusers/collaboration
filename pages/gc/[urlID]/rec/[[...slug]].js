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
// import { animateScroll as scroll } from 'react-scroll';
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
import { ContainerStateRecruitment } from 'app/@states/recruitment.js';


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
import RecruitmentNavigation from 'app/gc/rec/v2/navigation.js';
import Recruitment from 'app/gc/rec/v2/recruitment.js';
import Breadcrumbs from 'app/common/layout/v2/breadcrumbs.js';






// --------------------------------------------------
//   Function Components
//   URL: http://localhost:8080/gc/***/rec/***
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
  const stateRecruitment = ContainerStateRecruitment.useContainer();
  
  const {
    
    headerObj,
    setHeaderObj,
    handleScrollTo,
    
  } = stateLayout;
  
  const {
    
    setGameCommunityObj,
    
  } = stateCommunity;
  
  const {
    
    setRecruitmentThreadsObj,
    setRecruitmentCommentsObj,
    setRecruitmentRepliesObj,
    
  } = stateRecruitment;
  
  
  
  
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
    //   Router.push でページを移動した際の処理
    //   getServerSideProps でデータを取得してからデータを更新する
    // --------------------------------------------------
    
    setGameCommunityObj(props.gameCommunityObj);
    setRecruitmentThreadsObj(props.recruitmentThreadsObj);
    setRecruitmentCommentsObj(props.recruitmentCommentsObj);
    setRecruitmentRepliesObj(props.recruitmentRepliesObj);
    
    
    // --------------------------------------------------
    //   Snackbar - ログイン回数 + 1
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
    
    
    // ---------------------------------------------
    //   Scroll To
    // ---------------------------------------------
    
    if (props.pageType === 'page') {
      
      handleScrollTo({
        
        to: 'recruitmentThreads',
        duration: 0,
        delay: 0,
        smooth: 'easeInOutQuart',
        offset: -50,
        
      });
      
    }
    
    
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
        individual={props.pageType === 'individual'}
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
    <ContainerStateCommunity.Provider initialState={initialStateObj}>
      
      <ContainerStateRecruitment.Provider initialState={initialStateObj}>
        
        <ContainerLayout {...props} />
        
      </ContainerStateRecruitment.Provider>
      
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
  
  const urlID = lodashGet(query, ['urlID'], '');
  const hardwares = lodashGet(query, ['hardwares'], '');
  const categories = lodashGet(query, ['categories'], '');
  const keyword = lodashGet(query, ['keyword'], '');
  const page = lodashGet(query, ['page'], 1);
  const slugsArr = lodashGet(query, ['slug'], []);
  
  let threadPage = 1;
  let pageType = '';
  let recruitmentID = '';
  
  if (slugsArr.length === 0) {
    
    pageType = 'index';
    
  } else if (Math.sign(slugsArr[0]) === 1) {
    
    pageType = 'page';
    threadPage = slugsArr[0];
    
  } else if (slugsArr[0] !== 'search') {
    
    pageType = 'individual';
    recruitmentID = slugsArr[0];
    
  } else if (slugsArr[0] === 'search') {
    
    pageType = 'search';
    
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
  const experienceObj = lodashGet(dataObj, ['experienceObj'], {});
  
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
      href: `/gc/[urlID]`,
      as: `/gc/${urlID}`,
      active: false,
    },
    
    {
      name: '募集',
      href: `/gc/[urlID]/rec/[[...slug]]`,
      as: `/gc/${urlID}/rec`,
      active: true,
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
      anchorText: '',
      href: `/gc/index`,
      as: `/gc`,
    },
    
    {
      type: 'gc/index',
      anchorText: gameName,
      href: `/gc/[urlID]`,
      as: `/gc/${urlID}`,
    },
    
    {
      type: 'gc/rec',
      anchorText: '',
      href: `/gc/[urlID]/rec/[[...slug]]`,
      as: `/gc/${urlID}/rec`,
    },
    
  ];
  
  
  
  
  // --------------------------------------------------
  //   recentAccessPage
  // --------------------------------------------------
  
  let recentAccessPageHref = `/gc/[urlID]/rec/[[...slug]]`;
  let recentAccessPageAs = `/gc/${urlID}/rec`;
  
  
  // --------------------------------------------------
  //   募集
  // --------------------------------------------------
  
  if (pageType === 'index') {
    
    
    // ---------------------------------------------
    //   - Title
    // ---------------------------------------------
    
    title = `募集 - ${gameName}`;
    
    
  // --------------------------------------------------
  //   募集
  // --------------------------------------------------
  
  } else if (pageType === 'page') {
    
    
    // ---------------------------------------------
    //   - Title
    // ---------------------------------------------
    
    title = `募集: Page ${threadPage} - ${gameName}`;
    
    
    // --------------------------------------------------
    //   - recentAccessPage
    // --------------------------------------------------
    
    recentAccessPageAs = `/gc/${urlID}/rec/${threadPage}`;
    
    
  // --------------------------------------------------
  //   個別の募集
  // --------------------------------------------------
    
  } else if (pageType === 'individual') {
    
    
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
    //   - recentAccessPage
    // --------------------------------------------------
    
    recentAccessPageAs = `/gc/${urlID}/rec/${recruitmentID}`;
    
    
  // --------------------------------------------------
  //   検索
  // --------------------------------------------------
    
  } else if (pageType === 'search') {
    
    
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
    
    
    // --------------------------------------------------
    //   - recentAccessPage
    // --------------------------------------------------
    
    const urlHardwares = hardwares ? `hardwares=${hardwares}&` : '';
    const urlCategories = categories ? `categories=${categories}&` : '';
    const urlKeyword = keyword ? `keyword=${encodeURI(keyword)}&` : '';
    
    recentAccessPageAs = `/gc/${urlID}/rec/search?${urlHardwares}${urlCategories}${urlKeyword}page=${page}`;
    
    if (!urlHardwares && !urlCategories && !urlKeyword) {
      
      if (page === 1) {
        
        recentAccessPageAs = `/gc/${urlID}/rec`;
        
      } else {
        
        recentAccessPageAs = `/gc/${urlID}/rec/${page}`;
        
      }
      
    }
    
    
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
  //   /pages/gc/[urlID]/rec/[[...slug]].js
  // `);
  
  // console.log(`
  //   ----- resultObj -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(resultObj)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  // console.log(`
  //   ----- query -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(query)), { colors: true, depth: null })}\n
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
      experienceObj,
      
      urlID,
      pageType,
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