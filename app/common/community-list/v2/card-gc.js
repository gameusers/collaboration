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

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';
import lodashHas from 'lodash/has';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconSchedule from '@material-ui/icons/Schedule';
import IconChatBubble from '@material-ui/icons/ChatBubbleOutline';
import IconDescription from '@material-ui/icons/Description';
import IconPermIdentity from '@material-ui/icons/PermIdentity';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import ImageAndVideo from 'app/common/image-and-video/v2/image-and-video.js';






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

    obj = {},

  } = props;


  // --------------------------------------------------
  //   カードデータが存在しない場合、空のコンポーネントを返す
  // --------------------------------------------------

  // if (Object.keys(obj).length === 0) {
  //   return null;
  // }




  // // ---------------------------------------------
  // //   Data
  // // ---------------------------------------------

  // const type = lodashGet(obj, ['type'], '');
  // const _id = lodashGet(obj, ['_id'], '');
  // const title = lodashGet(obj, ['title'], '');
  // const comment = lodashGet(obj, ['comment'], '');
  // const datetimeFrom = lodashGet(obj, ['datetimeFrom'], '');
  // const commentsAndReplies = lodashGet(obj, ['commentsAndReplies'], 0);


  // // --------------------------------------------------
  // //   Game
  // // --------------------------------------------------

  // const gameUrlID = lodashGet(obj, ['gamesObj', 'urlID'], '');
  // const gameName = lodashGet(obj, ['gamesObj', 'name'], '');
  // const gameImagesAndVideosObj = lodashGet(obj, ['gamesObj', 'imagesAndVideosObj'], {});
  // const gameImagesAndVideosThumbnailObj = lodashGet(obj, ['gamesObj', 'imagesAndVideosThumbnailObj'], {});


  // // --------------------------------------------------
  // //   User Community
  // // --------------------------------------------------

  // const userCommunityID = lodashGet(obj, ['userCommunitiesObj', 'userCommunityID'], '');
  // const ucName = lodashGet(obj, ['userCommunitiesObj', 'name'], '');
  // const ucImagesAndVideosObj = lodashGet(obj, ['userCommunitiesObj', 'imagesAndVideosObj'], {});
  // const ucImagesAndVideosThumbnailObj = lodashGet(obj, ['userCommunitiesObj', 'imagesAndVideosThumbnailObj'], {});




  // // --------------------------------------------------
  // //   Images and Videos
  // // --------------------------------------------------

  // // ---------------------------------------------
  // //   - ゲームのサムネイルを表示する
  // // ---------------------------------------------

  // let imagesAndVideosObj = {};
  // let maxHeight = '';
  // let imageOrVideo = 'image';


  // // ---------------------------------------------
  // //   - アップロードした画像または動画がある場合、そちらを表示
  // // ---------------------------------------------

  // if (lodashHas(obj, ['imagesAndVideosObj'])) {

  //   imagesAndVideosObj = lodashGet(obj, ['imagesAndVideosObj'], {});
  //   maxHeight = '';

  //   const imagesAndVideosType = lodashGet(obj, ['imagesAndVideosObj', 'arr', 0, 'type'], '');

  //   if (imagesAndVideosType === 'video') {
  //     imageOrVideo = 'video';
  //   }


  // // ---------------------------------------------
  // //   - ゲームのヒーローイメージ
  // // ---------------------------------------------

  // } else if (Object.keys(gameImagesAndVideosObj).length !== 0) {

  //   imagesAndVideosObj = gameImagesAndVideosObj;
  //   maxHeight = '';


  // // ---------------------------------------------
  // //   - ゲームのサムネイル
  // // ---------------------------------------------

  // } else if (Object.keys(gameImagesAndVideosThumbnailObj).length !== 0) {

  //   imagesAndVideosObj = gameImagesAndVideosThumbnailObj;
  //   maxHeight = '128';


  // // ---------------------------------------------
  // //   - ユーザーコミュニティのヒーローイメージ
  // // ---------------------------------------------

  // } else if (Object.keys(ucImagesAndVideosObj).length !== 0) {

  //   imagesAndVideosObj = ucImagesAndVideosObj;
  //   maxHeight = '';


  // // ---------------------------------------------
  // //   - ユーザーコミュニティのサムネイル
  // // ---------------------------------------------

  // } else if (Object.keys(ucImagesAndVideosThumbnailObj).length !== 0) {

  //   imagesAndVideosObj = ucImagesAndVideosThumbnailObj;
  //   maxHeight = '128';

  // }




  // // ---------------------------------------------
  // //   Link
  // // ---------------------------------------------

  // let linkHref = '';
  // let linkAs = '';
  // let communityName = gameName;
  // let communityLinkHref = `/gc/[urlID]`;
  // let communityLinkAs = `/gc/${gameUrlID}`;

  // if (type === 'forumThreadsGc' || type === 'forumCommentsAndRepliesGc') {

  //   linkHref = `/gc/[urlID]/forum/[[...slug]]`;
  //   linkAs = `/gc/${gameUrlID}/forum/${_id}`;

  // } else if (type === 'recruitmentThreads' || type === 'recruitmentComments' || type === 'recruitmentReplies') {

  //   linkHref = `/gc/[urlID]/rec/[[...slug]]`;
  //   linkAs = `/gc/${gameUrlID}/rec/${_id}`;

  // } else if (type === 'forumThreadsUc' || type === 'forumCommentsAndRepliesUc') {

  //   linkHref = `/uc/[userCommunityID]/forum/[[...slug]]`;
  //   linkAs = `/uc/${userCommunityID}/forum/${_id}`;
  //   communityName = ucName;
  //   communityLinkHref = `/uc/[userCommunityID]`;
  //   communityLinkAs = `/uc/${userCommunityID}`;

  // }




  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------

  // console.log(`
  //   ----------------------------------------\n
  //   app/common/feed/card.js
  // `);

  // console.log(`
  //   ----- obj -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(obj)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);

  // console.log(chalk`
  //   showEditButton: {green ${showEditButton}}
  //   defaultExpanded: {green ${defaultExpanded}}
  // `);




  // --------------------------------------------------
  //   Return
  // --------------------------------------------------

  return (
    <Paper
      css={css`
        && {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          margin: 12px 0 0 0;
          // cursor: pointer;
        }
      `}
      // square
    >


      {/* Left */}
      <div
        css={css`
          // border-radius: 10px;
          // width: 64px;
          // margin: 12px 0 0 0;
        `}
      >
        <img
          css={css`
            border-radius: 4px 0 0 4px;
          `}
          src="http://localhost:8080/img/gc/2G5j7D3AM/rykFm6Vfg/320w.jpg"
          width="48"
        />
      </div>


      {/* Right */}
      <div
        css={css`
          display: flex;
          flex-flow: column nowrap;
          // align-content: space-between;
          // height: 100%;
          // align-items: center;
          line-height: 1;
          width: 100%;
          margin: 4px 0 0 0;
          padding: 4px 8px;
        `}
      >

        <div
          css={css`
            font-weight: bold;
            // background-color: pink;
          `}
        >
          Dead by Daylight - 天空の花嫁たちへ　ビアンカ　フローラ -
        </div>


        <div
          css={css`
            display: flex;
            flex-flow: row wrap;
            align-items: center;

            margin: 4px 0 0 0;
            // background-color: green;
            // font-weight: bold;
          `}
        >

          <div>Behaviour Interactive</div>


          <div
            css={css`
              display: flex;
              flex-flow: row wrap;
              margin: 0 0 0 auto;

              @media screen and (max-width: 480px) {
                display: none;
              }
            `}
          >

            <div
              css={css`
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                margin: 0 0 0 12px;
              `}
            >
              <IconSchedule
                css={css`
                  && {
                    font-size: 16px;
                    margin: 0 0 2px 0;
                  }
                `}
              />
              <div
                css={css`
                  font-size: 12px;
                  margin: 0 0 0 2px;
                `}
              >
                20分前
              </div>
            </div>



            <div
              css={css`
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                margin: 0 0 0 12px;
              `}
            >
              <IconPermIdentity
                css={css`
                  && {
                    font-size: 16px;
                    margin: 0 0 0 0;
                  }
                `}
              />
              <div
                css={css`
                  font-size: 12px;
                  margin: 0 0 0 2px;
                `}
              >
                1000
              </div>
            </div>


            <div
              css={css`
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                margin: 0 0 0 12px;
              `}
            >
              <IconChatBubble
                css={css`
                  && {
                    font-size: 16px;
                    margin: 0 0 0 0;
                  }
                `}
              />
              <div
                css={css`
                  font-size: 12px;
                  margin: 0 0 0 2px;
                `}
              >
                123
              </div>
            </div>


            <div
              css={css`
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                margin: 0 0 0 12px;
              `}
            >
              <IconDescription
                css={css`
                  && {
                    font-size: 16px;
                    margin: 0 0 0 0;
                  }
                `}
              />
              <div
                css={css`
                  font-size: 12px;
                  margin: 0 0 0 2px;
                `}
              >
                30
              </div>
            </div>

          </div>


        </div>

      </div>


    </Paper>
  );


};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;
