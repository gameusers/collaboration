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
import Router from 'next/router';
import { useIntl } from 'react-intl';
import { useSnackbar } from 'notistack';
import { Element } from 'react-scroll';
import Pagination from 'rc-pagination';
import localeInfo from 'rc-pagination/lib/locale/ja_JP';
import moment from 'moment';

/** @jsx jsx */
import { css, jsx } from '@emotion/react';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';
import lodashSet from 'lodash/set';
import lodashCloneDeep from 'lodash/cloneDeep';
import lodashMerge from 'lodash/merge';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Paper from '@material-ui/core/Paper';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


// ---------------------------------------------
//   States
// ---------------------------------------------

import { ContainerStateUser } from 'app/@states/user.js';
import { ContainerStateLayout } from 'app/@states/layout.js';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { fetchWrapper } from 'app/@modules/fetch.js';
import { CustomError } from 'app/@modules/error/custom.js';
import { getCookie, setCookie } from 'app/@modules/cookie.js';
import { showSnackbar } from 'app/@modules/snackbar.js';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import ListGc from 'app/common/follow/v2/list-gc.js';
import ListUr from 'app/common/follow/v2/list-ur.js';






// --------------------------------------------------
//   Material UI Style Overrides
//   https://material-ui.com/styles/basics/
// --------------------------------------------------

const useStyles = makeStyles({

  input: {
    fontSize: '12px',
    color: '#666',
    padding: '6px 26px 6px 12px',
  },

});






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

    pageType,
    listType,
    userID,
    users_id,
    gameCommunities_id,
    userCommunities_id,
    accessLevel,

  } = props;




  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------

  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [controlType, setControlType] = useState(pageType === 'ur' ? 'follow' : 'followed');
  
  const [followListGcObj, setFollowListGcObj] = useState(props.followListGcObj);
  const [cardPlayersObj, setCardPlayersObj] = useState(props.cardPlayersObj);
  const [followListUrObj, setFollowListUrObj] = useState(props.followListUrObj);


  useEffect(() => {


    // --------------------------------------------------
    //   Router.push でページを移動した際の処理
    //   ISO8601に変更があったら（ページを移動したら）更新する
    // --------------------------------------------------

    setButtonDisabled(false);

    setFollowListGcObj(props.followListGcObj);
    setCardPlayersObj(props.cardPlayersObj);
    setFollowListUrObj(props.followListUrObj);


  }, [props.ISO8601]);




  // --------------------------------------------------
  //   States
  // --------------------------------------------------

  // const stateUser = ContainerStateUser.useContainer();
  // const stateLayout = ContainerStateLayout.useContainer();

  // const { loginUsersObj } = stateUser;

  // const {

  //   setHeaderObj,
  //   handleDialogOpen,
  //   handleLoadingOpen,
  //   handleLoadingClose,
  //   handleScrollTo,

  // } = stateLayout;




  // --------------------------------------------------
  //   Handler
  // --------------------------------------------------

  /**
   * リストタイプを変更する / ページを移動する
   * @param {string} newListType - [gc / uc / ur]
   */
  const handleChangeListType = async ({

    newListType,

  }) => {


    // ---------------------------------------------
    //   Router.push = History API pushState()
    // ---------------------------------------------

    Router.push(`/ur/${userID}/follow/list/${newListType}`);


  };





  // --------------------------------------------------
  //   Component - List
  // --------------------------------------------------

  let componentList = '';

  if (listType === 'gc') {

    componentList =
      <ListGc
        followListGcObj={followListGcObj}
      />
    ;

  } else if (listType === 'uc') {

    // componentList =
    //   <ListGc
    //     followListGcObj={followListGcObj}
    //   />
    // ;

  } else if (listType === 'ur') {

    componentList =
      <ListUr
        cardPlayersObj={cardPlayersObj}
        setCardPlayersObj={setCardPlayersObj}
        followListUrObj={followListUrObj}
      />
    ;

  }




  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------

  // console.log(`
  //   ----------------------------------------\n
  //   /app/common/follow/v2/components/members.js
  // `);

  // console.log(chalk`
  //   users_id: {green ${users_id}}
  //   gameCommunities_id: {green ${gameCommunities_id}}
  //   userCommunities_id: {green ${userCommunities_id}}

  //   accessLevel: {green ${accessLevel}}

  //   page: {green ${page}}
  //   count: {green ${count}}
  //   limit: {green ${limit}}
  // `);

  // console.log(`
  //   ----- followListUrObj -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(followListUrObj)), { colors: true, depth: null })}\n
  //   --------------------\n
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
    <Element
      name="elementFollowList"
    >


      {/* Control Buttons */}
      <Paper
        css={css`
          display: flex;
          flex-flow: column wrap;
          margin: 0 0 16px 0;
          padding: 12px;
        `}
      >

        <ButtonGroup
          size="small"
          color="primary"
          aria-label="outlined primary button group"
          disabled={buttonDisabled}
        >


          {/* ゲームC */}
          <Button
            onClick={() => handleRead({
              changeControlType: 'follow',
              pageType,
              page: 1,
            })}
          >
            ゲームC
          </Button>




          {/* ユーザーC */}
          <Button
            onClick={() => handleRead({
              changeControlType: 'followed',
              pageType,
              page: 1,
            })}
          >
            ユーザーC
          </Button>




          {/* ユーザー */}
          <Button
            onClick={() => handleRead({
              changeControlType: 'administrator',
              pageType,
              page: 1,
            })}
          >
            ユーザー
          </Button>




          {/* 一覧 */}
          <Button
            onClick={() => handleRead({
              changeControlType: 'approval',
              pageType,
              page: 1,
            })}
          >
            <span
              css={css`
                font-weight: bold;
              `}
            >
              一覧
            </span>
          </Button>


        </ButtonGroup>




        {/* タイプ */}
        <div
          css={css`
            margin: 12px 0 0 0;
          `}
        >

          <FormControl>

            <Select
              value={listType}
              onChange={(eventObj) => handleChangeListType({ newListType: eventObj.target.value })}
              inputProps={{
                name: 'typeList',
                id: 'typeList',
              }}
            >
              <MenuItem value="gc">フォロー中のゲームコミュニティ</MenuItem>
              <MenuItem value="uc">参加中のユーザーコミュニティ</MenuItem>
              <MenuItem value="ur">フォロー中のユーザー</MenuItem>
            </Select>

          </FormControl>

        </div> 


      </Paper>




      {/* Component List */}
      {componentList}
      

    </Element>
  );


};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;
