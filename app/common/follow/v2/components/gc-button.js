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

import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import lodashGet from 'lodash/get';
import lodashHas from 'lodash/has';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconPermIdentity from '@material-ui/icons/PermIdentity';


// ---------------------------------------------
//   Contexts
// ---------------------------------------------

import { ContextLoginUser } from 'app/common/context/user.js';






// --------------------------------------------------
//   Function Components
// --------------------------------------------------

/**
 * 
 */
const Component = (props) => {
  
  
  // --------------------------------------------------
  //   Hooks
  // --------------------------------------------------
  
  const contextObj = useContext(ContextLoginUser);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  
  useEffect(() => {
    
    setButtonDisabled(false);
    
  }, []);
  
  
  
  
  // --------------------------------------------------
  //   props
  // --------------------------------------------------
  
  const {
    
    gameCommunities_id,
    userCommunities_id,
    followsObj = {},
    
  } = props;
  
  
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const login = lodashHas(contextObj, ['loginUsersObj', '_id']);
  
  const admin = lodashGet(followsObj, ['admin'], false);
  // const follow = lodashGet(followsObj, ['follow'], false);
  const follow = true;
  const followedCount = lodashGet(followsObj, ['followedCount'], 0);
  const followBlocked = lodashGet(followsObj, ['followBlocked'], false);
  
  
  
  // const { 
    
  //   dataObj,
  //   handleEdit,
  //   handleFollow,
    
  // } = stores.follow;
  
  console.log(`
    ----- contextObj -----\n
    ${util.inspect(JSON.parse(JSON.stringify(contextObj)), { colors: true, depth: null })}\n
    --------------------\n
  `);
  
  console.log(`
    ----- followsObj -----\n
    ${util.inspect(JSON.parse(JSON.stringify(followsObj)), { colors: true, depth: null })}\n
    --------------------\n
  `);
  
  
  
  
  // ---------------------------------------------
  //   - 作者またはブロックされている場合
  // ---------------------------------------------
  
  if (admin || followBlocked) {
    return null;
  }
  
  
  
  
  // --------------------------------------------------
  //   Component - Button
  // --------------------------------------------------
  
  let component =  '';
  
  
  // ---------------------------------------------
  //   - ログインしていない場合
  // ---------------------------------------------
  
  if (!login) {
    
    component = 
      <Link href="/login">
        <Button
          variant="contained"
          color="secondary"
          size="small"
        >
          フォローする
        </Button>
      </Link>
    ;
    
  }
  
  
  // ---------------------------------------------
  //   - ログインしていてフォローしていない場合
  // ---------------------------------------------
  
  if (login && !follow) {
    
    // component = <FollowButton type="followGc" color="secondary" buttonDisabled={buttonDisabled} />;
    
    component = 
      <Button
        variant="contained"
        color="secondary"
        size="small"
        onClick={
          buttonDisabled
            ?
              () => {}
              
            :
              () => {}
              // () => handleFollow({
              //   pathArr: this.pathArr,
              //   type: 'followGc',
              //   gameCommunities_id
              // })
        }
        disabled={buttonDisabled}
      >
        フォローする
      </Button>
    ;
    
  }
  
  
  // ---------------------------------------------
  //   - ログインしていてフォローしている場合
  // ---------------------------------------------
  
  if (login && follow) {
    
    // component =
    //   <FollowButton
    //     type="followGc"
    //     color="primary"
    //     buttonDisabled={buttonDisabled}
    //     func={setDialogOpen}
    //   />
    // ;
    
    component = 
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={
          buttonDisabled
            ?
              () => {}
            :
              () => setDialogOpen(true)
        }
        disabled={buttonDisabled}
      >
        フォロー中
      </Button>
    ;
    
  }
  
  
  
  
  // --------------------------------------------------
  //   Component - Number of People
  // --------------------------------------------------
  
  const componentNumberOfPeople =
    <div
      css={css`
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        margin: 0 0 0 10px;
      `}
    >
      <IconPermIdentity
        css={css`
          font-size: 24px;
          padding: 0;
        `}
      />
      {followedCount} 人
    </div>
  ;
  
  
  
  
  // --------------------------------------------------
  //   console.log
  // --------------------------------------------------
  
  console.log(`
    ----------------------------------------\n
    /app/common/follow/v2/components/gc-button.js
  `);
  
  console.log(chalk`
    login: {green ${login}}
  `);
  
  // console.log(`
  //   ----- linkArr -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(linkArr)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  
  
  
  // --------------------------------------------------
  //   Return
  // --------------------------------------------------
  
  return (
    <div
      css={css`
        border-top: 1px dashed #A4A4A4;
        margin: 12px 12px 4px;
        padding: 12px 0 0 0;
      `}
    >
      
      
      {/* Button */}
      <div
        css={css`
          display: flex;
          flex-flow: row wrap;
          align-items: center;
        `}
      >
        
        {component}
        
        {componentNumberOfPeople}
        
      </div>
      
      
      
      
      {/* フォローを解除するか尋ねるダイアログ */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        
        <DialogTitle id="alert-dialog-title">フォロー解除</DialogTitle>
        
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            フォローを解除しますか？
          </DialogContentText>
        </DialogContent>
        
        <DialogActions>
          <div
            css={css`
              margin: 0 auto 0 0;
            `}
          >
            <Button
              // onClick={() => handleFollow({
              //   pathArr: this.pathArr,
              //   type: 'unfollowGc',
              //   gameCommunities_id
              // })}
              color="primary"
              autoFocus
            >
              はい
            </Button>
          </div>
          
          <Button
            onClick={() => setDialogOpen(false)}
            color="primary"
          >
            いいえ
          </Button>
        </DialogActions>
        
      </Dialog>
      
      
    </div>
  );
  
  
};




// --------------------------------------------------
//   Export
// --------------------------------------------------

export default Component;