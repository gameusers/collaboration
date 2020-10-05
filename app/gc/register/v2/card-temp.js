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
