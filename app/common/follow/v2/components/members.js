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
import Router from 'next/router';
import { useIntl } from 'react-intl';
import { Element } from 'react-scroll';
import Pagination from 'rc-pagination';
import localeInfo from 'rc-pagination/lib/locale/ja_JP';
import moment from 'moment';
import Cookies from 'js-cookie';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';


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
//   Material UI / Icons
// ---------------------------------------------

// import IconDoubleArrow from '@material-ui/icons/DoubleArrow';


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
import { getCookie } from 'app/@modules/cookie.js';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import CardPlayer from 'app/common/card/v2/components/card-player.js';

// import Panel from 'app/common/layout/v2/components/panel.js';
// import Thread from 'app/common/forum/v2/components/thread.js';
// import FormThread from 'app/common/forum/v2/components/form/thread.js';






// --------------------------------------------------
//   Emotion
//   https://emotion.sh/docs/composition
// --------------------------------------------------

const cssButton = css`
  && {
    font-size: 12px;
    min-width: 40px;
    min-height: 24px;
    margin: 0 12px 0 0;
    padding: 2px 8px 0;
  }
`;


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
    users_id,
    gameCommunities_id,
    userCommunities_id,
    accessLevel,
    // propsCardPlayersObj,
    // propsFollowMembersObj,
    
  } = props;
  
  
  
  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
  
  const intl = useIntl();
  const classes = useStyles();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  
  const [controlType, setControlType] = useState(pageType === 'ur' ? 'follow' : 'followed');
  const [dialogType, setDialogType] = useState('unfollow');
  const [cardPlayersObj, setCardPlayersObj] = useState(props.cardPlayersObj);
  const [followMembersObj, setFollowMembersObj] = useState(props.followMembersObj);
  
  useEffect(() => {
    
    setButtonDisabled(false);
    
  }, []);
  
  
  
  
  // --------------------------------------------------
  //   States
  // --------------------------------------------------
  
  const stateUser = ContainerStateUser.useContainer();
  const stateLayout = ContainerStateLayout.useContainer();
  
  const { login, loginUsersObj } = stateUser;
  
  const {
    
    handleSnackbarOpen,
    handleLoadingOpen,
    handleLoadingClose,
    handleScrollTo,
    
  } = stateLayout;
  
  
  
  
  // --------------------------------------------------
  //   Handler
  // --------------------------------------------------
  
  /**
   * スレッドを読み込む
   * @param {number} page - スレッドのページ
   * @param {number} changeLimit - 1ページに表示する件数を変更する場合、値を入力する
   */
  const handleRead = async ({
    
    page,
    changeLimit,
    
  }) => {
    
    
    try {
      
      
      // ---------------------------------------------
      //   Router.push 用
      // ---------------------------------------------
      
      let url = '';
      let as = '';
      
      if (gameCommunities_id) {
        
        if (page === 1) {
          
          url = `/gc/[urlID]/index?urlID=${urlID}`;
          as = `/gc/${urlID}`;
          
        } else {
          
          url = `/gc/[urlID]/forum/[...slug]?urlID=${urlID}&page=${page}`;
          as = `/gc/${urlID}/forum/${page}`;
          
        }
        
      } else {
        
        if (page === 1) {
          
          url = `/uc/[userCommunityID]/index?userCommunityID=${userCommunityID}`;
          as = `/uc/${userCommunityID}`;
          
        } else {
          
          url = `/uc/[userCommunityID]/forum/[...slug]?userCommunityID=${userCommunityID}&page=${page}`;
          as = `/uc/${userCommunityID}/forum/${page}`;
          
        }
        
      }
      
      
      
      
      // ---------------------------------------------
      //   Change Limit / Set Cookie
      // ---------------------------------------------
      
      if (changeLimit) {
        
        Cookies.set('forumThreadLimit', changeLimit);
        
      }
      
      
      
      
      // ---------------------------------------------
      //   console.log
      // ---------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/common/forum/v2/components/forum.js - handleRead
      // `);
      
      // console.log(chalk`
      //   gameCommunities_id: {green ${gameCommunities_id}}
      //   userCommunities_id: {green ${userCommunities_id}}
      //   page: {green ${page}}
      //   changeLimit: {green ${changeLimit}}
        
      //   url: {green ${url}}
      //   as: {green ${as}}
      // `);
      
      // return;
      
      
      
      
      // ---------------------------------------------
      //   Router.push = History API pushState()
      // ---------------------------------------------
      
      await Router.push(url, as);
      
      
    } catch (errorObj) {}
    
    
  };
  
  
  
  
  /**
   * フォロワー / メンバーを読み込む
   * @param {string} users_id - DB users _id / ユーザーID
   * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティID
   * @param {string} userCommunities_id - DB user-communities _id / ユーザーコミュニティID
   * @param {string} changeControlType - 表示するタイプを変更する場合入力　フォロー、フォロワー、承認、ブロックのどれか
   * @param {number} page - スレッドのページ
   * @param {number} changeLimit - 1ページに表示する件数を変更する場合、値を入力する
   * @param {boolean} forceReload - 強制的に再読み込みする場合は true
   */
  const handleControlButton = async ({
    
    users_id,
    gameCommunities_id,
    userCommunities_id,
    changeControlType,
    pageType,
    page = 1,
    changeLimit,
    forceReload = false,
    
  }) => {
    
    
    try {
      
      
      // ---------------------------------------------
      //   Property
      // ---------------------------------------------
      
      let newControlType = changeControlType || controlType;
      
      const loadedDate = lodashGet(followMembersObj, [`${newControlType}Obj`, `page${page}Obj`, 'loadedDate'], '');
      const arr = lodashGet(followMembersObj, [`${newControlType}Obj`, `page${page}Obj`, 'arr'], []);
      
      let limit = parseInt((getCookie({ key: 'followLimit' }) || process.env.NEXT_PUBLIC_FOLLOWERS_LIMIT), 10);
      
      
      
      
      // ---------------------------------------------
      //   Change Limit
      // ---------------------------------------------
      
      if (changeLimit) {
        
        
        limit = changeLimit;
        
        
        // ---------------------------------------------
        //   Set Cookie - followLimit
        // ---------------------------------------------
        
        Cookies.set('followLimit', changeLimit);
        
        
      }
      
      
      
      
      // ---------------------------------------------
      //   再読込するかどうか
      // ---------------------------------------------
      
      let reload = false;
      
      
      
      // ---------------------------------------------
      //   controlType を変更する場合
      // ---------------------------------------------
      
      if (changeControlType) {
        
        
        // ---------------------------------------------
        //   Set controlType
        // ---------------------------------------------
        
        setControlType(changeControlType);
        
        
        // ---------------------------------------------
        //   再読込する
        // ---------------------------------------------
        
        reload = true;
        
        
      // ---------------------------------------------
      //   1ページに表示する件数を変更した場合、再読込
      // ---------------------------------------------
      
      } else if (changeLimit || forceReload) {
        
        
        // ---------------------------------------------
        //   再読込
        // ---------------------------------------------
        
        reload = true;
        
      
      // ---------------------------------------------
      //   最後の読み込み以降に更新があった場合
      //   または最後の読み込みからある程度時間（10分）が経っていた場合、再読込する
      // ---------------------------------------------
        
      } else if (loadedDate) {
        
        const datetimeNow = moment().utcOffset(0);
        const datetimeReloadLimit = moment(loadedDate).add(process.env.NEXT_PUBLIC_FOLLOWERS_RELOAD_MINUTES, 'm').utcOffset(0);
        
        if (datetimeNow.isAfter(datetimeReloadLimit)) {
          reload = true;
        }
        
      }
      
      
      
    } catch (errorObj) {}
    
    
  };
  
  
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const page = lodashGet(followMembersObj, [`${controlType}Obj`, 'page'], 1);
  const limit = lodashGet(followMembersObj, ['limit'], parseInt(process.env.NEXT_PUBLIC_FOLLOWERS_LIMIT, 10));
  const count = lodashGet(followMembersObj, [`${controlType}Obj`, 'count'], 0);
  const arr = lodashGet(followMembersObj, [`${controlType}Obj`, `page${page}Obj`, 'arr'], []);
  
  let approvalCount = lodashGet(followMembersObj, ['approvalObj', 'count'], 0);
  
  if (approvalCount > 99) {
    approvalCount = '99+';
  }
  
  const loginUsers_id = lodashGet(loginUsersObj, ['_id'], '');
  
  
  
  
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
  //   ----- arr -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(arr)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  
  
  
  // --------------------------------------------------
  //   ダイアログ
  // --------------------------------------------------
  
  // const dialogType = lodashGet(dataObj, [...pathArr, 'dialogObj', 'type'], 'unfollow');
  // const showDialog = lodashGet(dataObj, [...pathArr, 'showDialog'], false);
  
  
  let dialogTitle = '';
  let dialogDescription = '';
  
  
  if (pageType === 'uc') {
    
    if (dialogType === 'unfollow') {
      
      dialogTitle = 'コミュニティ退会';
      dialogDescription = 'コミュニティから退会させますか？';
      
    } else if (dialogType === 'approval') {
      
      dialogTitle = 'コミュニティへの参加承認';
      dialogDescription = 'コミュニティへの参加を承認しますか？';
      
    } else if (dialogType === 'unapproval') {
      
      dialogTitle = 'コミュニティへの参加拒否';
      dialogDescription = 'コミュニティへの参加を拒否しますか？';
      
    }
    
  } else {
    
    if (dialogType === 'unfollow') {
      
      dialogTitle = 'フォロー解除';
      dialogDescription = 'フォローを解除しますか？';
      
    } else if (dialogType === 'approval') {
      
      dialogTitle = 'フォロー承認';
      dialogDescription = 'フォローを承認しますか？';
      
    } else if (dialogType === 'unapproval') {
      
      dialogTitle = 'フォロー拒否';
      dialogDescription = 'フォローを拒否しますか？';
      
    }
    
  }
  
  
  if (dialogType === 'block') {
    
    dialogTitle = 'ブロック';
    dialogDescription = 'ブロックしますか？';
    
  } else if (dialogType === 'unblock') {
    
    dialogTitle = 'ブロック解除';
    dialogDescription = 'ブロックを解除しますか？';
    
  }
  
  
  
  
  // --------------------------------------------------
  //   Component - Card Players
  // --------------------------------------------------
  
  const componentsArr = [];
  
  
  for (const [index, cardPlayers_id] of arr.entries()) {
    
    
    // --------------------------------------------------
    //   CardPlayersObj
    // --------------------------------------------------
    
    const targetCardPlayersObj = lodashGet(cardPlayersObj, [cardPlayers_id], {});
    
    
    // --------------------------------------------------
    //   targetUsers_id - 管理する相手の users_id
    // --------------------------------------------------
    
    const targetUsers_id = lodashGet(cardPlayersObj, [cardPlayers_id, 'users_id'], '');
    
    
    // --------------------------------------------------
    //   push
    // --------------------------------------------------
    
    componentsArr.push(
      <div
        css={css`
          ${index === 0 ? 'margin: 0' : 'margin: 16px 0 0 0'};
        `}
        key={index}
      >
        
        
        {/* Card Player */}
        <CardPlayer
          obj={targetCardPlayersObj}
          showFollow={true}
          showEditButton={true}
          defaultExpanded={false}
        />
        
        
        
        
        {/* フォロワー管理ボタン（自分のカードには管理ボタンを表示しない） */}
        {(accessLevel >= 50 && loginUsers_id !== targetUsers_id) &&
          <Paper
            css={css`
              display: flex;
              flex-flow: row wrap;
              border-top: 1px dashed #A4A4A4;
              margin: 0 0 16px 0;
              padding: 10px 12px;
            `}
          >
            
            
            {controlType === 'follow' &&
              <div
                css={css`
                  margin: 0 16px 0 0;
                `}
              >
                <Button
                  css={cssButton}
                  variant="contained"
                  color="secondary"
                  disabled={buttonDisabled}
                  // onClick={() => handleShowDialog({
                  //   pathArr,
                  //   pathname,
                  //   users_id,
                  //   gameCommunities_id,
                  //   userCommunities_id,
                  //   targetUsers_id,
                  //   type: 'unfollow',
                  // })}
                >
                  {pageType === 'ur' ? 'フォロー解除' : '退会'}
                </Button>
              </div>
            }
            
            
            {controlType === 'approval' &&
              <React.Fragment>
                
                <Button
                  css={cssButton}
                  variant="contained"
                  color="secondary"
                  disabled={buttonDisabled}
                  // onClick={() => handleShowDialog({
                  //   pathArr,
                  //   pathname,
                  //   users_id,
                  //   gameCommunities_id,
                  //   userCommunities_id,
                  //   targetUsers_id,
                  //   type: 'approval',
                  // })}
                >
                  {pageType === 'ur' ? 'フォロー承認' : '参加承認'}
                </Button>
                
                
                <div
                  css={css`
                    margin: 0 16px 0 0;
                  `}
                >
                  <Button
                    css={cssButton}
                    variant="contained"
                    color="primary"
                    disabled={buttonDisabled}
                    // onClick={() => handleShowDialog({
                    //   pathArr,
                    //   pathname,
                    //   users_id,
                    //   gameCommunities_id,
                    //   userCommunities_id,
                    //   targetUsers_id,
                    //   type: 'unapproval',
                    // })}
                  >
                    {pageType === 'ur' ? 'フォロー拒否' : '参加拒否'}
                  </Button>
                </div>
                
              </React.Fragment>
            }
            
            
            {controlType !== 'block' &&
              <Button
                css={cssButton}
                variant="contained"
                color="secondary"
                disabled={buttonDisabled}
                // onClick={() => handleShowDialog({
                //   pathArr,
                //   pathname,
                //   users_id,
                //   gameCommunities_id,
                //   userCommunities_id,
                //   targetUsers_id,
                //   type: 'block',
                // })}
              >
                ブロック
              </Button>
            }
            
            
            {controlType === 'block' &&
              <Button
                css={cssButton}
                variant="contained"
                color="primary"
                disabled={buttonDisabled}
                // onClick={() => handleShowDialog({
                //   pathArr,
                //   pathname,
                //   users_id,
                //   gameCommunities_id,
                //   userCommunities_id,
                //   targetUsers_id,
                //   type: 'unblock',
                // })}
              >
                ブロック解除
              </Button>
            }
            
            
          </Paper>
        }
        
        
      </div>
    );
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return (
    <Element
      name="followMembers"
    >
      
      
      {/* Control Buttons */}
      <Paper
        css={css`
          display: flex;
          flex-flow: row wrap;
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
          
          
          {/* ユーザーページの場合のみフォローしているユーザーを表示する */}
          {pageType === 'ur' &&
            <Button
              onClick={() => handleControlButton({
                users_id,
                gameCommunities_id,
                userCommunities_id,
                changeControlType: 'follow',
                pageType,
                page: 1,
              })}
            >
              <span
                css={css`
                  font-weight: ${controlType === 'follow' ? 'bold' : 'normal'};
                `}
              >
                フォロー
              </span>
            </Button>
          }
          
          
          
          
          <Button
            onClick={() => handleControlButton({
              users_id,
              gameCommunities_id,
              userCommunities_id,
              changeControlType: 'followed',
              pageType,
              page: 1,
            })}
          >
            <span
              css={css`
                font-weight: ${controlType === 'followed' ? 'bold' : 'normal'};
              `}
            >
              {pageType === 'uc' ? 'メンバー' : 'フォロワー'}
            </span>
          </Button>
          
          
          
          
          {/* 管理者用 */}
          {accessLevel >= 50 &&
            <Button
              onClick={() => handleControlButton({
                users_id,
                gameCommunities_id,
                userCommunities_id,
                changeControlType: 'approval',
                pageType,
                page: 1,
              })}
            >
              <span
                css={css`
                  font-weight: ${controlType === 'approval' ? 'bold' : 'normal'};
                `}
              >
                承認 ({approvalCount})
              </span>
            </Button>
          }
          
          
          
          
          {/* 管理者用 */}
          {accessLevel >= 50 &&
            <Button
              onClick={() => handleControlButton({
                users_id,
                gameCommunities_id,
                userCommunities_id,
                changeControlType: 'block',
                pageType,
                page: 1,
              })}
            >
              <span
                css={css`
                  font-weight: ${controlType === 'block' ? 'bold' : 'normal'};
                `}
              >
                ブロック
              </span>
            </Button>
          }
          
          
        </ButtonGroup>
      
      </Paper>
      
      
      
      
      {/* Card Players */}
      {componentsArr}
      
      
      
      
      {/* Pagination */}
      <Paper
        css={css`
          display: flex;
          flex-flow: row wrap;
          padding: 0 8px 8px 8px;
        `}
      >
        
        
        {/* Pagination */}
        <div
          css={css`
            margin: 8px 24px 0 0;
          `}
        >
          
          <Pagination
            disabled={buttonDisabled}
            onChange={(page) => handleRead({
              page,
            })}
            pageSize={limit}
            current={page}
            total={count}
            locale={localeInfo}
          />
          
        </div>
        
        
        {/* Rows Per Page */}
        <FormControl
          css={css`
            margin: 8px 0 0 0 !important;
          `}
          variant="outlined"
        >
          
          <Select
            value={limit}
            onChange={(eventObj) => handleRead({
              page: 1,
              changeLimit: eventObj.target.value,
            })}
            input={
              <OutlinedInput
                classes={{
                  input: classes.input
                }}
                name="follow-members-pagination"
                id="outlined-rows-per-page"
              />
            }
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
          
        </FormControl>
        
        
      </Paper>
      
      
    </Element>
  );
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;