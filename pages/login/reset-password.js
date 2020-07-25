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
import Router from 'next/router';
import Error from 'next/error';
import moment from 'moment';
import { animateScroll as scroll } from 'react-scroll';

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


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Layout from 'app/common/layout/v2/components/layout.js';
import Breadcrumbs from 'app/common/layout/v2/components/breadcrumbs.js';

import FormResetPassword from 'app/login/reset-password/v2/form-reset-password.js';






// --------------------------------------------------
//   Function Components
//   URL: https://dev-1.gameusers.org:8080/login/reset-password
// --------------------------------------------------

const Component = (props) => {
  
  
  // --------------------------------------------------
  //   Error
  //   参考：https://nextjs.org/docs/advanced-features/custom-error-page#reusing-the-built-in-error-page
  // --------------------------------------------------
  
  if (props.statusCode !== 200) {
    return <Error statusCode={props.statusCode} />;
  }
  
  
  
  
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
      
      <FormResetPassword />
      
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
  
  const ISO8601 = moment().utc().toISOString();
  
  
  
  
  // --------------------------------------------------
  //   Fetch
  // --------------------------------------------------
  
  const resultObj = await fetchWrapper({
    
    urlApi: encodeURI(`${process.env.NEXT_PUBLIC_URL_API}/v2/common/initial-props`),
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
  const headerObj = lodashGet(dataObj, ['headerObj'], {});
  
  
  
  
  // --------------------------------------------------
  //   Title
  // --------------------------------------------------
  
  const title = `パスワード再設定 - Game Users`;
  
  
  
  
  // --------------------------------------------------
  //   Header Navigation Link
  // --------------------------------------------------
  
  const headerNavMainArr = [
    
    {
      name: 'ログイン',
      href: '/login',
      as: '/login',
      active: true,
    },
    
    {
      name: 'アカウント作成',
      href: '/login/account',
      as: '/login/account',
      active: false,
    }
    
  ];
  
  
  
  
  // --------------------------------------------------
  //   パンくずリスト
  // --------------------------------------------------
  
  const breadcrumbsArr = [
    
    {
      type: 'login',
      anchorText: '',
      href: '/login',
      as: '/login',
    },
    
    {
      type: 'login/reset-password',
      anchorText: '',
      href: '',
      as: '',
    },
    
  ];
  
  
  
  
  // --------------------------------------------------
  //   ログインしている場合はログアウトページにリダイレクト
  // --------------------------------------------------
  
  if (login) {
    
    const isServer = !process.browser;
    
    if (isServer && res) {
      
      res.writeHead(302, {
        Location: '/logout'
      });
      
      res.end();
      
    } else {
      
      Router.replace('/logout');
      
    }
    
  }
    
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /pages/login/index.js
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
      
    }
    
  };
  
  
}




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;