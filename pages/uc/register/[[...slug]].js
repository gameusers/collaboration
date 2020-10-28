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
//   Modules
// ---------------------------------------------

import { fetchWrapper } from 'app/@modules/fetch.js';
import { createCsrfToken } from 'app/@modules/csrf.js';
import { getCookie } from 'app/@modules/cookie.js';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Layout from 'app/common/layout/v2/layout.js';
import Breadcrumbs from 'app/common/layout/v2/breadcrumbs.js';

import UcNavigation from 'app/uc/list/v2/navigation.js';
import FormCommunity from 'app/uc/setting/v2/form-community.js';






// --------------------------------------------------
//   Function Components
//   URL: http://localhost:8080/uc/register
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

      <UcNavigation
        page={props.page}
        hardwaresArr={props.hardwaresArr}
        keyword={props.keyword}
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

      <FormCommunity
        defaultExpanded={true}
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

  let page = lodashGet(query, ['page'], 1);
  const keyword = lodashGet(query, ['keyword'], '');
  const slugsArr = lodashGet(query, ['slug'], []);

  let pageType = '';

  if (slugsArr.length === 0) {

    pageType = 'index';

  } else if (Math.sign(slugsArr[0]) === 1) {

    pageType = 'page';
    page = slugsArr[0];

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

  const limit = getCookie({ key: 'communityListLimit', reqHeadersCookie });




  // --------------------------------------------------
  //   Fetch
  // --------------------------------------------------

  const resultObj = await fetchWrapper({

    urlApi: encodeURI(`${process.env.NEXT_PUBLIC_URL_API}/v2/uc/register?page=${page}&limit=${limit}&keyword=${keyword}`),
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
  const experienceObj = lodashGet(dataObj, ['experienceObj'], {});

  const ucListObj = lodashGet(dataObj, ['ucListObj'], {});
  const hardwaresArr = lodashGet(dataObj, ['hardwaresArr'], []);




  // --------------------------------------------------
  //   Title
  // --------------------------------------------------

  let title = `ユーザーコミュニティ - Game Users`;




  // --------------------------------------------------
  //   Header Navigation Link
  // --------------------------------------------------

  const headerNavMainArr = [

    {
      name: 'トップ',
      href: `/`,
      as: `/`,
      active: false,
    },

    {
      name: 'ゲームC',
      href: '/gc/list/[[...slug]]',
      as: '/gc/list',
      active: false,
    },

    {
      name: 'ユーザーC',
      href: '/uc/list/[[...slug]]',
      as: '/uc/list',
      active: true,
    }

  ];


  // --------------------------------------------------
  //   パンくずリスト
  // --------------------------------------------------

  let breadcrumbsArr = [

    {
      type: 'uc/register',
      anchorText: '',
      href: '',
      as: '',
    },

  ];




  // --------------------------------------------------
  //   recentAccessPage
  // --------------------------------------------------

  let recentAccessPageHref = '/uc/register/[[...slug]]';
  let recentAccessPageAs = '/uc/register';




  // --------------------------------------------------
  //   2ページ目以降
  // --------------------------------------------------

  if (pageType === 'page') {


    // ---------------------------------------------
    //   - Title
    // ---------------------------------------------

    title = `ユーザーコミュニティ: Page ${page} - Game Users`;


    // --------------------------------------------------
    //   - recentAccessPage
    // --------------------------------------------------

    recentAccessPageAs = `/uc/register/${page}`;


  // --------------------------------------------------
  //   検索
  // --------------------------------------------------

  } else if (pageType === 'search') {


    // ---------------------------------------------
    //   - Title
    // ---------------------------------------------

    title = `ユーザーコミュニティ検索 - Game Users`;


    // ---------------------------------------------
    //   - パンくずリスト
    // ---------------------------------------------

    breadcrumbsArr.push(

      {
        type: 'uc/register',
        anchorText: '',
        href: '/uc/register/[[...slug]]',
        as: '/uc/register',
      },

      {
        type: 'uc/register/search',
        anchorText: '',
        href: '',
        as: '',
      },

    );


    // --------------------------------------------------
    //   - recentAccessPage
    // --------------------------------------------------

    const urlHardwares = hardwares ? `hardwares=${hardwares}&` : '';
    const urlKeyword = keyword ? `keyword=${encodeURI(keyword)}&` : '';

    recentAccessPageAs = `/uc/register/search?${urlHardwares}${urlKeyword}page=${page}`;


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
  //   pages/gc/list/[[...slug]].js
  // `);

  // console.log(`
  //   ----- resultObj -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(resultObj)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);

  // console.log(chalk`
  //   ISO8601: {green ${ISO8601}}
  //   loginUsersObj.accessDate: {green ${loginUsersObj.accessDate}}
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

      page,
      ucListObj,
      hardwaresArr,
      keyword,

    }

  };


}




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;