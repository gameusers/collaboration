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
import { css, jsx } from '@emotion/react';


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

import Layout from 'app/common/layout/v2/layout.js';
import Breadcrumbs from 'app/common/layout/v2/breadcrumbs.js';
import FeedSidebar from 'app/common/feed/v2/sidebar.js';

import FormInquiry from 'app/inquiry/form/v2/form-inquiry.js';






// --------------------------------------------------
//   Function Components
//   URL: http://localhost:8080/inquiry/form
// --------------------------------------------------

/**
 * レイアウト
 * @param {Object} props - Props
 */
const ContainerLayout = (props) => {


  // --------------------------------------------------
  //   Component - Sidebar
  // --------------------------------------------------

  const componentSidebar =
    <React.Fragment>

      <Breadcrumbs
        arr={props.breadcrumbsArr}
        sidebar={true}
      />

      <FeedSidebar
        feedObj={props.feedObj}
        top={true}
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

      <FormInquiry />

    </React.Fragment>
  ;


  // --------------------------------------------------
  //   Return
  // --------------------------------------------------

  return (
    <Layout
      metaObj={props.metaObj}
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
  const feedObj = lodashGet(dataObj, ['feedObj'], {});




  // --------------------------------------------------
  //   metaObj
  // --------------------------------------------------

  const metaObj = {

    title: 'お問い合わせフォーム - Game Users',
    description: 'お問い合わせフォーム',
    type: 'article',
    url: `${process.env.NEXT_PUBLIC_URL_BASE}inquiry/form`,
    image: '',

  }




  // --------------------------------------------------
  //   Header Navigation Link
  // --------------------------------------------------

  const headerNavMainArr = [

    {
      name: 'お問い合わせ',
      href: '/inquiry/form',
      active: true,
    },

    {
      name: 'アカウント移行',
      href: '/inquiry/account',
      active: false,
    }

  ];


  // --------------------------------------------------
  //   パンくずリスト
  // --------------------------------------------------

  const breadcrumbsArr = [

    {
      type: 'inquiry/form',
      anchorText: '',
      href: '',
    },

  ];




  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------

  // console.log(`
  //   ----------------------------------------\n
  //   pages/inquiry/form.js
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
      metaObj,
      headerObj,
      headerNavMainArr,
      breadcrumbsArr,
      feedObj,

    }

  };


}




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;
