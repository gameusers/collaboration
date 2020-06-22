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
// import SimpleIcons from 'simple-icons-react-component';
import moment from 'moment';
import Cookies from 'js-cookie';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';
import lodashCloneDeep from 'lodash/cloneDeep';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import ExpansionPanel from '@material-ui/core/ExpansionPanel';
// import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
// import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Paper from '@material-ui/core/Paper';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import Avatar from '@material-ui/core/Avatar';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

// import IconExpandLess from '@material-ui/icons/ExpandLess';
// import IconExpandMore from '@material-ui/icons/ExpandMore';
// import IconAssignment from '@material-ui/icons/Assignment';
// import IconPublic from '@material-ui/icons/Public';
// import IconDelete from '@material-ui/icons/Delete';
// import IconEdit from '@material-ui/icons/Edit';
import IconDoubleArrow from '@material-ui/icons/DoubleArrow';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Panel from 'app/common/layout/v2/components/panel.js';
// import Paragraph from 'app/common/layout/v2/components/paragraph.js';
// import ImageAndVideo from 'app/common/image-and-video/components/image-and-video.js';
import Thread from 'app/common/forum/v2/components/thread.js';
import FormThread from 'app/common/forum/v2/components/form-thread.js';
import FormComment from 'app/common/forum/components/form-comment.js';
import Comment from 'app/common/forum/components/comment.js';

// import FormName from 'app/common/form/components/name.js';


// ---------------------------------------------
//   Modules
// ---------------------------------------------

import { fetchWrapper } from 'app/@modules/fetch.js';
import { CustomError } from 'app/@modules/error/custom.js';
import { getCookie } from 'app/@modules/cookie.js';


// ---------------------------------------------
//   States
// ---------------------------------------------

import { ContainerStateLayout } from 'app/@states/layout.js';
import { ContainerStateGc } from 'app/@states/gc.js';






// --------------------------------------------------
//   Material UI Style Overrides
//   https://material-ui.com/styles/basics/
// --------------------------------------------------

const useStyles = makeStyles({
  
  expanded: {
    marginBottom: '0 !important',
  },
  
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
    
    urlID,
    gameCommunities_id,
    userCommunityID,
    userCommunities_id,
    
    enableAnonymity,
    individual,
    
  } = props;
  
  
  
  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
  
  const intl = useIntl();
  const classes = useStyles();
  // const [panelExpanded, setPanelExpanded] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  
  
  useEffect(() => {
    
    setButtonDisabled(false);
    
  }, []);
  
  
  
  
  // --------------------------------------------------
  //   States
  // --------------------------------------------------
  
  // const stateLayout = ContainerStateLayout.useContainer();
  const stateGc = ContainerStateGc.useContainer();
  
  // const {
    
  //   handleSnackbarOpen,
  //   handleDialogOpen,
  //   handleLoadingOpen,
  //   handleLoadingClose,
  //   handleScrollTo,
    
  // } = stateLayout;
  
  const {
    
    // gameCommunityObj,
    // setGameCommunityObj,
    forumThreadsObj,
    // setForumThreadsObj,
    // forumThreadsReload,
    // setForumThreadsReload,
    // setForumCommentsReload,
    
  } = stateGc;
  
  
  
  
  // --------------------------------------------------
  //   Handler
  // --------------------------------------------------
  
  /**
   * スレッドを読み込む
   * @param {string} gameCommunities_id - DB game-communities _id / ゲームコミュニティのID
   * @param {string} userCommunities_id - DB user-communities _id / ユーザーコミュニティのID
   * @param {number} page - スレッドのページ
   * @param {number} changeLimit - 1ページに表示する件数を変更する場合、値を入力する
   */
  const handleReadThreads = async ({
    
    gameCommunities_id,
    userCommunities_id,
    page,
    changeLimit,
    
  }) => {
    
    
    try {
      
      
      // ---------------------------------------------
      //   Router.push 用
      // ---------------------------------------------
      
      let url = '';
      let as = '';
      
      if (page === 1) {
        
        url = `/gc/[urlID]/index?urlID=${urlID}`;
        as = `/gc/${urlID}`;
        
      } else {
        
        url = `/gc/[urlID]/forum/[...slug]?urlID=${urlID}&page=${page}`;
        as = `/gc/${urlID}/forum/${page}`;
        
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
      //   /app/common/forum/v2/components/forum.js - handleReadThreads
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
      
      
    } catch (errorObj) {
      
      
      
    } finally {
      
      
      
    }
    
    
  };
  
  
  
  
  // --------------------------------------------------
  //   Thread
  // --------------------------------------------------
  
  const page = lodashGet(forumThreadsObj, ['page'], 1);
  const count = lodashGet(forumThreadsObj, ['count'], 0);
  const limit = lodashGet(forumThreadsObj, ['limit'], parseInt(process.env.NEXT_PUBLIC_FORUM_THREAD_LIMIT, 10));
  const arr = lodashGet(forumThreadsObj, [`page${page}Obj`, 'arr'], []);
  
  
  // --------------------------------------------------
  //   Link Return Top
  // --------------------------------------------------
  
  let linkReturnTopHref = '';
  let linkReturnTopAs = '';
  
  
  // ---------------------------------------------
  //   - Game Community
  // ---------------------------------------------
  
  if (urlID) {
    
    linkReturnTopHref = `/gc/[urlID]/index?urlID=${urlID}`;
    linkReturnTopAs = `/gc/${urlID}`;
    
    
  // ---------------------------------------------
  //   - User Community
  // ---------------------------------------------
  
  } else if (userCommunityID) {
    
    linkReturnTopHref = `/uc/[userCommunityID]/index?userCommunityID=${userCommunityID}`;
    linkReturnTopAs = `/uc/${userCommunityID}`;
    
  }
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  // console.log(`
  //   ----------------------------------------\n
  //   /app/common/forum/v2/components/forum.js
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
  //   Component - Thread
  // --------------------------------------------------
  
  const componentArr = [];
  
  
  for (let forumThreads_id of arr.values()) {
    
    
    // --------------------------------------------------
    //   dataObj
    // --------------------------------------------------
    
    const dataObj = lodashGet(forumThreadsObj, ['dataObj', forumThreads_id], {});
    
    
    // --------------------------------------------------
    //   push
    // --------------------------------------------------
    
    componentArr.push(
      <Thread
        key={forumThreads_id}
        urlID={urlID}
        gameCommunities_id={gameCommunities_id}
        userCommunityID={userCommunityID}
        userCommunities_id={userCommunities_id}
        forumThreads_id={forumThreads_id}
        dataObj={dataObj}
        enableAnonymity={enableAnonymity}
      />
    );
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return (
    <Element
      name="forumThreads"
    >
      
      
      {/* Form - Post New Thread */}
      <div
        css={css`
          margin: 0 0 16px 0;
        `}
      >
        
        <Panel
          heading="スレッド投稿フォーム"
          defaultExpanded={false}
        >
          
          <FormThread
            gameCommunities_id={gameCommunities_id}
            userCommunities_id={userCommunities_id}
            forumThreads_id=""
          />
          
        </Panel>
        
      </div>
      
      
      
      
      {/* Forum */}
      {componentArr}
      
      
      
      
      {/* Pagination */}
      {individual ? (
        
        <div
          css={css`
            margin: 24px 0 8px 0;
          `}
        >
          
          <Paper
            css={css`
              display: flex;
              flex-flow: row wrap;
              padding: 12px 0 12px 12px;
            `}
          >
            
            <Link href={linkReturnTopHref} as={linkReturnTopAs}>
              <Button
                type="submit"
                variant="outlined"
                size="small"
                disabled={buttonDisabled}
              >
                <IconDoubleArrow />
                フォーラムトップに戻る
              </Button>
            </Link>
            
          </Paper>
          
        </div>
        
      ) : (
        
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
              onChange={(page) => handleReadThreads({
                gameCommunities_id,
                userCommunities_id,
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
              onChange={(eventObj) => handleReadThreads({
                gameCommunities_id,
                userCommunities_id,
                page: 1,
                changeLimit: eventObj.target.value,
              })}
              input={
                <OutlinedInput
                  classes={{
                    input: classes.input
                  }}
                  name="forum-threads-pagination"
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
        
      )}
      
      
    </Element>
  );
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;