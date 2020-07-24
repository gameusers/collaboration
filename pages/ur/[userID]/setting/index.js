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
import Breadcrumbs from 'app/common/layout/v2/components/breadcrumbs.js';

import FormPage from 'app/ur/v2/setting/form-page.js';
// import FormAccount from '../../../app/ur/settings/components/form-account';
// import FormEmail from '../../../app/ur/settings/components/form-email';
// import FormWebPush from '../../../app/ur/settings/components/form-web-push';






// --------------------------------------------------
//   Function Components
//   URL: https://dev-1.gameusers.org/ur/***/setting
// --------------------------------------------------

const ContainerLayout = (props) => {
  
  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
  
  useEffect(() => {
    
    
    // ---------------------------------------------
    //   Scroll To
    // ---------------------------------------------
    
    scroll.scrollToTop({ duration: 0 });
    
    
  }, [props.ISO8601]);
  
  
  
  
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
      
      <FormPage
        userID={props.userID}
        pagesObj={props.pagesObj}
        approval={props.approval}
        // loginID={props.loginID}
        // email={props.email}
        // emailConfirmation={props.emailConfirmation}
        // webPushPermission={props.webPushPermission}
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
  
  const userID = query.userID;
  
  
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const ISO8601 = moment().utc().toISOString();
  
  
  
  
  // ---------------------------------------------
  //   FormData
  // ---------------------------------------------
  
  const formDataObj = {
    
    userID,
    
  };
  
  
  
  
  // --------------------------------------------------
  //   Fetch
  // --------------------------------------------------
  
  const resultObj = await fetchWrapper({
    
    urlApi: encodeURI(`${process.env.NEXT_PUBLIC_URL_API}/v2/ur/${userID}/setting`),
    methodType: 'POST',
    reqHeadersCookie,
    reqAcceptLanguage,
    formData: JSON.stringify(formDataObj),
    
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
  
  const pagesObj = lodashGet(dataObj, ['pagesObj'], {});
  const approval = lodashGet(dataObj, ['approval'], false);
  const loginID = lodashGet(dataObj, ['loginID'], '');
  const email = lodashGet(dataObj, ['email'], '');
  const emailConfirmation = lodashGet(dataObj, ['emailConfirmation'], false);
  const webPushPermission = lodashGet(dataObj, ['webPushPermission'], false);
  
  
  
  
  // --------------------------------------------------
  //   Title
  // --------------------------------------------------
  
  const userName = lodashGet(headerObj, ['name'], '');
  const title = `ユーザー設定 - ${userName}`;
  
  
  
  
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
      active: false,
    },
    
  ];
  
  if (accessLevel >= 50) {
    
    headerNavMainArr.push(
      {
        name: '設定',
        href: `/ur/[userID]/setting?userID=${userID}`,
        as: `/ur/${userID}/setting`,
        active: true,
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
      type: 'ur/setting',
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
  //   /pages/ur/[userID]/setting/index.js
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
      pagesObj,
      approval,
      loginID,
      email,
      emailConfirmation,
      webPushPermission,
      
    }
    
  };
  
  
}




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;