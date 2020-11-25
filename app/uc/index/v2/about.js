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
import Link from 'next/link';
import { useIntl } from 'react-intl';
import moment from 'moment';

/** @jsx jsx */
import { css, jsx } from '@emotion/react';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Avatar from '@material-ui/core/Avatar';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Panel from 'app/common/layout/v2/panel.js';
import Paragraph from 'app/common/layout/v2/paragraph.js';






// --------------------------------------------------
//   Function Components
// --------------------------------------------------

/**
 * Export Component
 */
const Component = (props) => {


  // --------------------------------------------------
  //   props
  // --------------------------------------------------

  const {

    headerObj,
    userCommunityObj,
    accessRightRead,

  } = props;




  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------

  const intl = useIntl();




  // --------------------------------------------------
  //   Property
  // --------------------------------------------------

  const approval = lodashGet(headerObj, ['followsObj', 'approval'], false);
  const followedCount = lodashGet(headerObj, ['followsObj', 'followedCount'], 1);
  const gamesArr = lodashGet(headerObj, ['gamesArr'], []);

  const createdDate = lodashGet(userCommunityObj, ['createdDate'], '');
  const communityType = lodashGet(userCommunityObj, ['communityType'], 'open');
  const anonymity = lodashGet(userCommunityObj, ['anonymity'], false);
  const description = lodashGet(userCommunityObj, ['description'], '');




  // --------------------------------------------------
  //   パネルを初期状態で開くかどうか
  // --------------------------------------------------

  const defaultExpanded = accessRightRead ? false : true;


  // --------------------------------------------------
  //   開設日
  // --------------------------------------------------

  const codeCreatedDate = moment(createdDate).utc().format('YYYY/MM/DD');


  // --------------------------------------------------
  //   公開タイプ
  // --------------------------------------------------

  const codeCommunityType = communityType === 'open' ? intl.formatMessage({ id: 'DXeihaDx8' }) : intl.formatMessage({ id: 'QHz1wbGch' });


  // --------------------------------------------------
  //   参加
  // --------------------------------------------------

  const codeApproval = approval ? intl.formatMessage({ id: 'Da45qlq9l' }) : intl.formatMessage({ id: 'nEtCLmbKz' });


  // --------------------------------------------------
  //   匿名での投稿
  // --------------------------------------------------

  const codeAnonymity = anonymity ? intl.formatMessage({ id: 'I2lSx_RQh' }) : intl.formatMessage({ id: 'btIZLhdBM' });


  // --------------------------------------------------
  //   関連するゲーム
  // --------------------------------------------------

  const codeGames = [];

  for (const [index, valueObj] of gamesArr.entries()) {

    const src = lodashGet(valueObj, ['imagesAndVideosThumbnailObj', 'arr', 0, 'src'], '/img/common/thumbnail/none-game.jpg');
    const srcSet = lodashGet(valueObj, ['imagesAndVideosThumbnailObj', 'arr', 0, 'srcSet'], '');
    const urlID = lodashGet(valueObj, ['urlID'], '');

    const linkHref = '/gc/[urlID]';
    const linkAs = `/gc/${urlID}`;


    codeGames.push(
      <div
        key={index}
        css={css`
          display: flex;
          flex-flow: row wrap;
          align-items: center;
          margin: 8px 0 0 0;
        `}
      >

        <Avatar
          css={css`
            && {
              width: 32px;
              height: 32px;
              margin: 0 8px 0 0;
            }
          `}
          alt={valueObj.name}
          src={src}
          srcSet={srcSet}
        />


        <Link href={linkHref} as={linkAs}>
          <a>{valueObj.name}</a>
        </Link>

      </div>
    );

  }




  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------

  // console.log(`
  //   ----------------------------------------\n
  //   /app/uc/index/v2/about.js
  // `);

  // console.log(chalk`
  //   moment(createdDate).utc().format('YYYY/MM/DD'): {green ${moment(createdDate).utc().format('YYYY/MM/DD')}}
  // `);

  // const ISO8601 = moment().utc().toISOString();

  // console.log(chalk`
  //   createdDate: {green ${createdDate}}
  //   moment(createdDate): {green ${moment(createdDate)}}
  //   moment(createdDate).format('YYYY/MM/DD'): {green ${moment(createdDate).format('YYYY/MM/DD')}}
  //   moment(createdDate).utc().format('YYYY/MM/DD'): {green ${moment(createdDate).utc().format('YYYY/MM/DD')}}
  //   ISO8601: {green ${ISO8601}}
  //   moment(ISO8601): {green ${moment(ISO8601)}}
  //   moment(ISO8601).utc(): {green ${moment(ISO8601).utc()}}
  // `);

  // console.log(chalk`
  //   urlID: {green ${urlID}}
  //   gameCommunities_id: {green ${gameCommunities_id}}
  //   userCommunityID: {green ${userCommunityID}}
  //   userCommunities_id: {green ${userCommunities_id}}

  //   page: {green ${page}}
  //   count: {green ${count}}
  //   limit: {green ${limit}}
  // `);

  // console.log(`
  //   ----- arr -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(arr)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);




  // --------------------------------------------------
  //   Return
  // --------------------------------------------------

  return (
    <div
      css={css`
        ${accessRightRead ? 'margin: 24px 0 0 0' : 'margin: 0'};
      `}
    >


      <Panel
        heading="コミュニティについて"
        defaultExpanded={defaultExpanded}
      >


        {/* Description */}
        <Paragraph text={description} />




        {/* 開設日 */}
        <p
          css={css`
            border-top: 1px dashed #848484;
            margin: 24px 0 0 0;
            padding: 24px 0 0 0;
          `}
        >
          <span
            css={css`
              font-weight: bold;
            `}
          >
            開設日
          </span> | {codeCreatedDate}
        </p>




        {/* メンバー */}
        <p
          css={css`
            margin: 6px 0 0 0;
          `}
        >
          <span
            css={css`
              font-weight: bold;
            `}
          >
            メンバー
          </span> | {followedCount}人
        </p>




        {/* 公開タイプ */}
        <p
          css={css`
            margin: 6px 0 0 0;
          `}
        >
          <span
            css={css`
              font-weight: bold;
            `}
          >
            公開タイプ
          </span> | {codeCommunityType}
        </p>




        {/* 参加 */}
        <p
          css={css`
            margin: 6px 0 0 0;
          `}
        >
          <span
            css={css`
              font-weight: bold;
            `}
          >
            参加
          </span> | {codeApproval}
        </p>




        {/* 匿名での投稿 */}
        <p
          css={css`
            margin: 6px 0 0 0;
          `}
        >
          <span
            css={css`
              font-weight: bold;
            `}
          >
            匿名での投稿
          </span> | {codeAnonymity}
        </p>




        {/* 関連ゲーム */}
        <p
          css={css`
            font-weight: bold;
            border-top: 1px dashed #848484;
            margin: 24px 0 0 0;
            padding: 24px 0 0 0;
          `}
        >
          関連ゲーム
        </p>

        {codeGames}


      </Panel>


    </div>
  );


};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;
