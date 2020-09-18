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
import IconEdit from '@material-ui/icons/Edit';


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
    editable = false,

  } = props;


  // --------------------------------------------------
  //   データが存在しない場合、空のコンポーネントを返す
  // --------------------------------------------------

  if (Object.keys(obj).length === 0) {
    return null;
  }



  // console.log(`
  //   ----- obj -----\n
  //   ${util.inspect(obj, { colors: true, depth: null })}\n
  //   --------------------\n
  // `);


  // ---------------------------------------------
  //   Data
  // ---------------------------------------------

  const urlID = lodashGet(obj, ['urlID'], '');
  const name = lodashGet(obj, ['name'], '');
  const subtitle = lodashGet(obj, ['subtitle'], '');
  const src = lodashGet(obj, ['src'], '/img/common/thumbnail/none-game.jpg');
  const srcSet = lodashGet(obj, ['srcSet'], '');
  const developersPublishers = lodashGet(obj, ['developersPublishers'], '');
  const followedCount = lodashGet(obj, ['followedCount'], 0);
  const datetimeFrom = lodashGet(obj, ['datetimeFrom'], '');


  // --------------------------------------------------
  //   Link
  // --------------------------------------------------

  let linkHref = '/gc/[urlID]/';
  let linkAs = `/gc/${urlID}`;


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
    <Link
      href={linkHref}
      as={linkAs}
    >

      <a className="link">

        <Paper
          css={css`
            && {
              display: flex;
              flex-flow: row nowrap;
              align-items: center;
              margin: 12px 0 0 0;
            }
          `}
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
                // background-color: pink;
              `}
            >
              {name} {subtitle}
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

              <div>{developersPublishers}</div>


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


                {datetimeFrom &&
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
                          margin: 0 0 1px 0;
                        }
                      `}
                    />
                    <div
                      css={css`
                        font-size: 12px;
                        margin: 0 0 0 2px;
                      `}
                    >
                      {datetimeFrom}
                    </div>
                  </div>
                }


                {followedCount > 0 &&
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
                      {followedCount}
                    </div>
                  </div>
                }


                {/* {forumThreadCount > 0 &&
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
                      {forumThreadCount}
                    </div>
                  </div>
                }


                {recruitmentThreadCount > 0 &&
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
                      {recruitmentThreadCount}
                    </div>
                  </div>
                } */}

              </div>

            </div>

          </div>




          {/* Edit Button */}
          {editable &&
            <div
              css={css`
                margin: 0 10px 0 0;
              `}
            >
              <Button
                css={css`
                  && {
                    font-size: 12px;
                    height: 22px;
                    min-width: 54px;
                    min-height: 22px;
                    margin: 0 0 0 12px;
                    padding: 0 4px;

                    @media screen and (max-width: 480px) {
                      min-width: 36px;
                      min-height: 22px;
                    }
                  }
                `}
                variant="outlined"
                color="primary"
                // onClick={() => handleShowFormRecruitmentThread({
                //   pathArr: pathRecruitmentThreadEditFormArr,
                //   recruitmentThreads_id,
                // })}
              >
                <IconEdit
                  css={css`
                    && {
                      font-size: 16px;
                      margin: 0 2px 2px 0;

                      @media screen and (max-width: 480px) {
                        display: none;
                      }
                    }
                  `}
                />
                編集
              </Button>
            </div>
          }

        </Paper>

      </a>

    </Link>
  );


};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;
