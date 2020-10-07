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
// import Link from 'next/link';
// import moment from 'moment';

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

import Paper from '@material-ui/core/Paper';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


// ---------------------------------------------
//   States
// ---------------------------------------------

import { ContainerStateUser } from 'app/@states/user.js';
import { ContainerStateGcRegister } from 'app/@states/gc-register.js';






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

  const stateUser = ContainerStateUser.useContainer();
  const stateGcRegister = ContainerStateGcRegister.useContainer();

  const { loginUsersObj } = stateUser;
  const { approvalsArr, handleApproval } = stateGcRegister;

  const role = lodashGet(loginUsersObj, ['role'], '');
  const administrator = role === 'administrator' ? true : false;




  // --------------------------------------------------
  //   データが存在しない場合、空のコンポーネントを返す
  // --------------------------------------------------

  if (Object.keys(obj).length === 0) {
    return null;
  }




  // ---------------------------------------------
  //   Data
  // ---------------------------------------------

  const gamesTemps_id = lodashGet(obj, ['_id'], '');
  const createdDate = lodashGet(obj, ['createdDate'], '');
  // const createdDate = moment(lodashGet(obj, ['createdDate'], '')).utc().format('YYYY/MM/DD hh:mm');
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
  //   approvalsArr.includes(gamesTemps_id): {green ${approvalsArr.includes(gamesTemps_id)}}
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
    >


      {/* Left */}
      <div
        onClick={() => handleGetEditData({ gamesTemps_id })}
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
        onClick={() => handleGetEditData({ gamesTemps_id })}
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




      {/* Checkbox Approval */}
      {administrator &&
        <div
          css={css`
            margin: 0 0 0 24px;
          `}
        >
          <FormControlLabel
            control={
              <Checkbox
                css={css`
                  && {
                    // margin: 0 0 0 12px;
                    padding: 0;
                  }
                `}
                checked={approvalsArr.includes(gamesTemps_id)}
                onChange={() => handleApproval({ gamesTemps_id })}
              />
            }
          />
        </div>
      }


    </Paper>
  );


};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;
