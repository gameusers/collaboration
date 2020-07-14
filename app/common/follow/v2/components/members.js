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
// import Cookies from 'js-cookie';

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

// import { ContainerStateForum } from 'app/@states/forum.js';


// ---------------------------------------------
//   Components
// ---------------------------------------------

// import CardPlayer from '../../card/player/components/player';

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
    
    // urlID,
    // gameCommunities_id,
    // userCommunityID,
    // userCommunities_id,
    
    pageType,
    users_id,
    gameCommunities_id,
    userCommunities_id,
    pathArr,
    pathname,
    accessLevel,
    
  } = props;
  
  
  
  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
  
  const intl = useIntl();
  const classes = useStyles();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  
  
  useEffect(() => {
    
    setButtonDisabled(false);
    
  }, []);
  
  
  
  
  // --------------------------------------------------
  //   States
  // --------------------------------------------------
  
  // const stateForum = ContainerStateForum.useContainer();
  
  // const {
    
  //   forumThreadsObj,
    
  // } = stateForum;
  
  
  
  
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
  
  
  
  
  // --------------------------------------------------
  //   Thread
  // --------------------------------------------------
  
  // const page = lodashGet(forumThreadsObj, ['page'], 1);
  // const limit = lodashGet(forumThreadsObj, ['limit'], parseInt(process.env.NEXT_PUBLIC_FORUM_THREAD_LIMIT, 10));
  // const count = lodashGet(forumThreadsObj, ['count'], 0);
  // const arr = lodashGet(forumThreadsObj, [`page${page}Obj`, 'arr'], []);
  
  
  // // --------------------------------------------------
  // //   Link Return Top
  // // --------------------------------------------------
  
  // let linkReturnTopHref = '';
  // let linkReturnTopAs = '';
  
  
  // // ---------------------------------------------
  // //   - Game Community
  // // ---------------------------------------------
  
  // if (urlID) {
    
  //   linkReturnTopHref = `/gc/[urlID]/index?urlID=${urlID}`;
  //   linkReturnTopAs = `/gc/${urlID}`;
    
    
  // // ---------------------------------------------
  // //   - User Community
  // // ---------------------------------------------
  
  // } else if (userCommunityID) {
    
  //   linkReturnTopHref = `/uc/[userCommunityID]/index?userCommunityID=${userCommunityID}`;
  //   linkReturnTopAs = `/uc/${userCommunityID}`;
    
  // }
  
  
  
  
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
  
  const componentsArr = [];
  
  
  // for (let forumThreads_id of arr.values()) {
    
  //   componentsArr.push(
  //     <Thread
  //       key={forumThreads_id}
  //       urlID={urlID}
  //       gameCommunities_id={gameCommunities_id}
  //       userCommunityID={userCommunityID}
  //       userCommunities_id={userCommunities_id}
  //       forumThreads_id={forumThreads_id}
  //       enableAnonymity={enableAnonymity}
  //     />
  //   );
    
  // }
  
  
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return (
    <Element
      name="followMembers"
    >
      
      
      {/* Forum */}
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
      
      
    </Element>
  );
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;