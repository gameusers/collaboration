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

// import Card from '@material-ui/core/Card';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

// import IconSchedule from '@material-ui/icons/Schedule';
// import IconChatBubble from '@material-ui/icons/ChatBubbleOutline';
// import IconDescription from '@material-ui/icons/Description';
// import IconPermIdentity from '@material-ui/icons/PermIdentity';
// import IconEdit from '@material-ui/icons/Edit';


// ---------------------------------------------
//   States
// ---------------------------------------------

// import { ContainerStateGcRegister } from 'app/@states/gc-register.js';


// ---------------------------------------------
//   Components
// ---------------------------------------------

// import ImageAndVideo from 'app/common/image-and-video/v2/image-and-video.js';






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
    handleGetEditData,

  } = props;




  // --------------------------------------------------
  //   States
  // --------------------------------------------------

  // const stateGcRegister = ContainerStateGcRegister.useContainer();

  // const {

  //   setLanguage,
  //   setCountry,
  //   setName,
  //   setSubtitle,
  //   setSortKeyword,
  //   setURLID,
  //   setTwitterHashtagsArr,
  //   setSearchKeywordsArr,
  //   setGenre1,
  //   setGenre2,
  //   setGenre3,

  //   setHardwares1Arr,
  //   setReleaseDate1,
  //   setPlayersMin1,
  //   setPlayersMax1,
  //   setPublisherIDs1Arr,
  //   setDeveloperIDs1Arr,

  //   setHardwares2Arr,
  //   setReleaseDate2,
  //   setPlayersMin2,
  //   setPlayersMax2,
  //   setPublisherIDs2Arr,
  //   setDeveloperIDs2Arr,

  //   setHardwares3Arr,
  //   setReleaseDate3,
  //   setPlayersMin3,
  //   setPlayersMax3,
  //   setPublisherIDs3Arr,
  //   setDeveloperIDs3Arr,

  //   setHardwares4Arr,
  //   setReleaseDate4,
  //   setPlayersMin4,
  //   setPlayersMax4,
  //   setPublisherIDs4Arr,
  //   setDeveloperIDs4Arr,

  //   setHardwares5Arr,
  //   setReleaseDate5,
  //   setPlayersMin5,
  //   setPlayersMax5,
  //   setPublisherIDs5Arr,
  //   setDeveloperIDs5Arr,

  //   setHardwares6Arr,
  //   setReleaseDate6,
  //   setPlayersMin6,
  //   setPlayersMax6,
  //   setPublisherIDs6Arr,
  //   setDeveloperIDs6Arr,

  //   setHardwares7Arr,
  //   setReleaseDate7,
  //   setPlayersMin7,
  //   setPlayersMax7,
  //   setPublisherIDs7Arr,
  //   setDeveloperIDs7Arr,

  //   setHardwares8Arr,
  //   setReleaseDate8,
  //   setPlayersMin8,
  //   setPlayersMax8,
  //   setPublisherIDs8Arr,
  //   setDeveloperIDs8Arr,

  //   setHardwares9Arr,
  //   setReleaseDate9,
  //   setPlayersMin9,
  //   setPlayersMax9,
  //   setPublisherIDs9Arr,
  //   setDeveloperIDs9Arr,

  //   setHardwares10Arr,
  //   setReleaseDate10,
  //   setPlayersMin10,
  //   setPlayersMax10,
  //   setPublisherIDs10Arr,
  //   setDeveloperIDs10Arr,

  //   setLinkArr,

  //   setImagesAndVideosObj,
  //   setImagesAndVideosThumbnailObj,

  // } = stateGcRegister;




  // --------------------------------------------------
  //   データが存在しない場合、空のコンポーネントを返す
  // --------------------------------------------------

  if (Object.keys(obj).length === 0) {
    return null;
  }




  // ---------------------------------------------
  //   Data
  // ---------------------------------------------

  const _id = lodashGet(obj, ['_id'], '');
  const createdDate = lodashGet(obj, ['createdDate'], '');
  const name = lodashGet(obj, ['name'], '');
  const subtitle = lodashGet(obj, ['subtitle'], '');
  const src = '/img/common/thumbnail/none-game.jpg';
  const srcSet = '';




  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------

  // console.log(`
  //   ----------------------------------------\n
  //   app/gc/register/v2/card-temp.js
  // `);

  // console.log(`
  //   ----- obj -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(obj)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);

  // console.log(chalk`
  //   _id: {green ${_id}}
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
          cursor: pointer;
          margin: 12px 0 0 0;
        }
      `}
      onClick={() => handleGetEditData({ gamesTemps_id: _id })}
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
          src={src}
          srcSet={srcSet}
          width="48"
        />
      </div>




      {/* Right */}
      <div
        css={css`
          display: flex;
          flex-flow: column nowrap;
          line-height: 1;
          width: 100%;
          margin: 4px 0 0 0;
          padding: 4px 8px;
        `}
      >

        <div
          css={css`
            font-weight: bold;
          `}
        >
          {name}{subtitle}
        </div>


        <div
          css={css`
            display: flex;
            flex-flow: row wrap;
            align-items: center;
            margin: 4px 0 0 0;
          `}
        >

          <div
            css={css`
              margin: 0 4px 0 0;
            `}
          >
            Ver. {createdDate}
          </div>


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
                margin: 0 0 0 12px;
              `}
            >
              <div
                css={css`
                  font-size: 12px;
                `}
              >
                [仮登録]
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
