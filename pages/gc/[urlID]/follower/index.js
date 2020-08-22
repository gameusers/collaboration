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
import Breadcrumbs from 'app/common/layout/v2/breadcrumbs.js';

import FollowMembers from 'app/common/follow/v2/members.js';






// --------------------------------------------------
//   Function Components
//   URL: https://dev-1.gameusers.org/gc/***/follow
// --------------------------------------------------

const ContainerLayout = (props) => {
  
  
  // --------------------------------------------------
  //   States
  // --------------------------------------------------
  
  const stateLayout = ContainerStateLayout.useContainer();
  
  const {
    
    headerObj,
    setHeaderObj,
    
  } = stateLayout;
  
  
  
  
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
    
    
    // ---------------------------------------------
    //   Scroll To
    // ---------------------------------------------
    
    // scroll.scrollToTop({ duration: 0 });
    
    
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
      
      <FollowMembers
        pageType="gc"
        gameCommunities_id={props.gameCommunities_id}
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
  
  const urlID = query.urlID;
  
  
  
  
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
    
    urlApi: encodeURI(`${process.env.NEXT_PUBLIC_URL_API}/v2/gc/${urlID}/follower?page=${page}&limit=${limit}`),
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
  const cardPlayersObj = lodashGet(dataObj, ['cardPlayersObj'], {});
  const followMembersObj = lodashGet(dataObj, ['followMembersObj'], {});
  
  
  
  
  // --------------------------------------------------
  //   Title
  // --------------------------------------------------
  
  const title = `フォロワー - ${gameName}`;
  
  
  
  
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
      href: `/gc/[urlID]/rec`,
      as: `/gc/${urlID}/rec`,
      active: false,
    },
    
    {
      name: 'フォロワー',
      href: `/gc/[urlID]/follower`,
      as: `/gc/${urlID}/follower`,
      active: true,
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
      anchorText: lodashGet(dataObj, ['headerObj', 'name'], ''),
      href: `/gc/[urlID]`,
      as: `/gc/${urlID}`,
    },
    
    {
      type: 'gc/follower',
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
  //   /pages/gc/[urlID]/follower/index.js
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
      experienceObj,
      
      urlID,
      gameCommunities_id,
      cardPlayersObj,
      followMembersObj,
      
    }
    
  };
  
  
}




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;