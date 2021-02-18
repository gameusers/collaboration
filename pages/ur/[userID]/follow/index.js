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
//   States
// ---------------------------------------------

import { ContainerStateCommunity } from 'app/@states/community.js';
import { ContainerStateForum } from 'app/@states/forum.js';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { fetchWrapper } from 'app/@modules/fetch.js';
import { createCsrfToken } from 'app/@modules/csrf.js';
import { getCookie, setCookie } from 'app/@modules/cookie.js';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Layout from 'app/common/layout/v2/layout.js';
import Breadcrumbs from 'app/common/layout/v2/breadcrumbs.js';
import FeedSidebar from 'app/common/feed/v2/sidebar.js';

import FollowNavigation from 'app/common/follow/v2/navigation.js';
import FollowContents from 'app/common/follow/v2/contents.js';
// import FollowMembers from 'app/common/follow/v2/members.js';






// --------------------------------------------------
//   Function Components
//   URL: http://localhost:8080/ur/***/follow
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

      <FollowNavigation
        pageType="contents"
        listType={props.listType}
        userID={props.userID}
        followContentsPeriod={props.followContentsPeriod}
      />

      <FeedSidebar
        feedObj={props.feedObj}
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

      <FollowContents
        // urlID={props.urlID}
        // gameCommunities_id={props.gameCommunities_id}
        // urlID={'aaa'}
        // gameCommunities_id={'bbb'}
        gameCommunitiesObj={props.gameCommunitiesObj}
        enableAnonymity={false}
      />

      {/* <FollowMembers
        pageType="ur"
        users_id={props.users_id}
        accessLevel={props.accessLevel}
        cardPlayersObj={props.cardPlayersObj}
        followMembersObj={props.followMembersObj}
      /> */}

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
// const Component = (props) => {


//   // --------------------------------------------------
//   //   Error
//   //   参考：https://nextjs.org/docs/advanced-features/custom-error-page#reusing-the-built-in-error-page
//   // --------------------------------------------------

//   if (props.statusCode !== 200) {
//     return <Error statusCode={props.statusCode} />;
//   }


//   // --------------------------------------------------
//   //   Return
//   // --------------------------------------------------

//   return <ContainerLayout {...props} />;


// };

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
  //   unstated-next - Initial State
  // --------------------------------------------------

  const initialStateObj = {

    // gameCommunityObj: props.gameCommunityObj,
    // forumThreadsForListObj: props.forumThreadsForListObj,
    gameCommunityObj: {},
    // forumThreadsForListObj: {},
    forumThreadsObj: props.forumThreadsGcObj,
    forumCommentsObj: props.forumCommentsGcObj,
    forumRepliesObj: props.forumRepliesGcObj,

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

  const userID = query.userID;
  const slugsArr = lodashGet(query, ['slug'], []);

  let listType = 'all';
  let page = 1;

  if (Math.sign(slugsArr[1]) === 1) {
    page = slugsArr[1];
  }


  // --------------------------------------------------
  //   Property
  // --------------------------------------------------

  const ISO8601 = moment().utc().toISOString();


  // --------------------------------------------------
  //   Get Cookie Data
  // --------------------------------------------------

  const termsOfServiceAgreedVersion = getCookie({ key: 'termsOfServiceAgreedVersion', reqHeadersCookie });
  const followContentsPeriod = getCookie({ key: 'followContentsPeriod', reqHeadersCookie });
  const limit = getCookie({ key: 'followContentsLimit', reqHeadersCookie });
  



  // --------------------------------------------------
  //   Fetch
  // --------------------------------------------------

  const resultObj = await fetchWrapper({

    urlApi: encodeURI(`${process.env.NEXT_PUBLIC_URL_API}/v2/ur/${userID}/follow/contents?period=${followContentsPeriod}&page=${page}&limit=${limit}`),
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
  const feedObj = lodashGet(dataObj, ['feedObj'], {});

  const pagesArr = lodashGet(dataObj, ['pagesObj', 'arr'], []);
  // const users_id = lodashGet(dataObj, ['users_id'], '');
  
  const forumThreadsGcObj = lodashGet(dataObj, ['forumGcObj', 'forumThreadsObj'], {});
  const forumCommentsGcObj = lodashGet(dataObj, ['forumGcObj', 'forumCommentsObj'], {});
  const forumRepliesGcObj = lodashGet(dataObj, ['forumGcObj', 'forumRepliesObj'], {});
  const gameCommunitiesObj = lodashGet(dataObj, ['gameCommunitiesObj'], {});
  



  // --------------------------------------------------
  //   Title
  // --------------------------------------------------

  const pagesObj = pagesArr.find((valueObj) => {
    return valueObj.type === 'follow';
  });

  const pageTitle = lodashGet(pagesObj, ['title'], '');
  const userName = lodashGet(headerObj, ['name'], '');

  const metaObj = {

    title: pageTitle ? pageTitle : `フォロー - ${userName}`,
    description: `${userName}さんのフォローページです。`,
    type: 'article',
    url: `${process.env.NEXT_PUBLIC_URL_BASE}ur/${userID}/follow`,
    image: '',

  }

  // アップロードされた画像がある場合は、OGPの画像に設定する
  const imageSrc = lodashGet(headerObj, ['imagesAndVideosObj', 'arr', 0, 'src'], '');
  
  if (imageSrc.indexOf('/img/ur/') !== -1) {
    metaObj.image = `${process.env.NEXT_PUBLIC_URL_BASE}${imageSrc}`.replace('//img', '/img');
  }




  // --------------------------------------------------
  //   Header Navigation Link
  // --------------------------------------------------

  const headerNavMainArr = [

    {
      name: 'トップ',
      href: `/ur/${userID}`,
      active: false,
    },

    {
      name: 'フォロー',
      href: `/ur/${userID}/follow`,
      active: true,
    },

  ];

  if (accessLevel >= 50) {

    headerNavMainArr.push(
      {
        name: '設定',
        href: `/ur/${userID}/setting`,
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
      href: `/ur/${userID}`,
    },

    {
      type: 'ur/follow',
      anchorText: '',
      href: '',
    },

  ];


  

  // ---------------------------------------------
  //   Set Cookie - recentAccessPage
  // ---------------------------------------------

  setCookie({ key: 'recentAccessPageUrl', value: `/ur/${userID}/follow`, expires: 0, res });




  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------

  // console.log(`
  //   ----------------------------------------\n
  //   /pages/ur/[userID]/follow/index.js
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
      termsOfServiceAgreedVersion,
      statusCode,
      login,
      loginUsersObj,
      metaObj,
      headerObj,
      headerNavMainArr,
      breadcrumbsArr,
      experienceObj,
      feedObj,

      accessLevel,
      userID,
      listType,
      // users_id,
      
      followContentsPeriod,
      forumThreadsGcObj,
      forumCommentsGcObj,
      forumRepliesGcObj,
      gameCommunitiesObj,

    }

  };


}




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;
