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

import React, { useState, useEffect, useContext } from 'react';
import Error from 'next/error';
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
import ForumNavigation from 'app/common/forum/components/navigation.js';
import ForumThread from 'app/common/forum/components/thread.js';
import Breadcrumbs from 'app/common/layout/components/breadcrumbs.js';


// ---------------------------------------------
//   States
// ---------------------------------------------

// import { ContainerStateLoginUsers } from 'app/@states/login-users.js';






// --------------------------------------------------
//   Function Components
//   URL: https://dev-1.gameusers.org/gc/***
// --------------------------------------------------

const Component = (props) => {
  
  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
  
  // const [loginUsersObj, setLoginUsersObj] = useState(props.loginUsersObj);
  
  
  
  
  // --------------------------------------------------
  //   Error
  //   参考：https://github.com/zeit/next.js#custom-error-handling
  // --------------------------------------------------
  
  if (props.statusCode !== 200) {
    return <Error statusCode={props.statusCode} />;
  }
  
  
  
  
  // --------------------------------------------------
  //   Props
  // --------------------------------------------------
  
  // const accessLevel = lodashGet(props, ['propsObj', 'accessLevel'], 1);
  // const loginUsersObj = lodashGet(props, ['propsObj', 'loginUsersObj'], {});
  
  const headerObj = lodashGet(props, ['propsObj', 'headerObj'], {});
  const gameCommunities_id = lodashGet(props, ['propsObj', 'gameCommunityObj', '_id'], '');
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /pages/gc/[urlID]/index.js
  // `);
  
  // console.log(chalk`
  //   login: {green ${login}}
  // `);
  
  // console.log(`
  //   ----- linkArr -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(linkArr)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  
  
  
  // --------------------------------------------------
  //   Component - Sidebar
  // --------------------------------------------------
  
  const componentSidebar = '';
  // const componentSidebar =
  //   <ForumNavigation
  //     temporaryDataID={this.props.temporaryDataID}
  //     urlID={this.props.urlID}
  //     gameCommunities_id={gameCommunities_id}
  //   />
  // ;
  
  
  
  
  // --------------------------------------------------
  //   Component - Contents
  // --------------------------------------------------
  
  const componentContent = '';
  // const componentContent = 
  //   <React.Fragment>
      
  //     <Breadcrumbs
  //       arr={this.props.breadcrumbsArr}
  //     />
      
  //     <ForumThread
  //       temporaryDataID={this.props.temporaryDataID}
  //       urlID={this.props.urlID}
  //       gameCommunities_id={gameCommunities_id}
  //       settingAnonymity={true}
  //     />
      
  //   </React.Fragment>
  // ;
  
  
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return (
    <Layout
      title={props.title}
      componentSidebar={componentSidebar}
      componentContent={componentContent}
      
      headerObj={headerObj}
    />
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
  //   Property
  // --------------------------------------------------
  
  const urlID = query.urlID;
  const pathname = `/gc/${urlID}`;
  const pathArr = ['gc', urlID];
  const temporaryDataID = `/gc/${urlID}`;
  const ISO8601 = moment().utc().toISOString();
  
  
  // --------------------------------------------------
  //   Get Cookie Data & Temporary Data for Fetch
  // --------------------------------------------------
  
  // const threadListPage = stores.data.getTemporaryData({ pathname: temporaryDataID, key: 'threadListPage' });
  const threadListPage = 1;
  const threadListLimit = getCookie({ key: 'threadListLimit', reqHeadersCookie });
  
  // const threadPage = stores.data.getTemporaryData({ pathname: temporaryDataID, key: 'threadPage' });
  const threadPage = 1;
  const threadLimit = getCookie({ key: 'threadLimit', reqHeadersCookie });
  const commentLimit = getCookie({ key: 'commentLimit', reqHeadersCookie });
  const replyLimit = getCookie({ key: 'replyLimit', reqHeadersCookie });
  
  
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
  
  const accessLevel = lodashGet(dataObj, ['accessLevel'], 1);
  const loginUsersObj = lodashGet(dataObj, ['loginUsersObj'], {});
  
  const gameCommunities_id = lodashGet(dataObj, ['gameCommunityObj', '_id'], '');
  const gameName = lodashGet(dataObj, ['headerObj', 'name'], '');
  
  
  
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
  
  const propsObj = { ...dataObj, ISO8601, accessLevel, pathname, pathArr, headerNavMainArr, gameCommunities_id };
  
  
  
  
  // --------------------------------------------------
  //   Title
  // --------------------------------------------------
  
  const title = `${gameName} - Game Users`;
  
  
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
      
      urlID,
      temporaryDataID,
      ISO8601,
      statusCode,
      propsObj,
      breadcrumbsArr,
      title,
      loginUsersObj,
      
    }
    
  };
  
  
}




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;