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
import lodashSet from 'lodash/set';
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
//   States
// ---------------------------------------------

import { ContainerStateLoginUsers } from 'app/@states/login-users.js';
import { ContainerStateLayout } from 'app/@states/layout.js';






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
  
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  
  useEffect(() => {
    
    setButtonDisabled(false);
    
  }, []);
  
  
  
  
  
  // --------------------------------------------------
  //   States
  // --------------------------------------------------
  
  const stateLoginUser = ContainerStateLoginUsers.useContainer();
  const stateLayout = ContainerStateLayout.useContainer();
  
  const { loginUsersObj } = stateLoginUser;
  const { handleSnackbarOpen } = stateLayout;
  
  
  
  
  // --------------------------------------------------
  //   props
  // --------------------------------------------------
  
  const {
    
    gameCommunities_id,
    userCommunities_id,
    followsObj = {},
    
  } = props;
  
  
  
  
  // --------------------------------------------------
  //   handle
  // --------------------------------------------------
  
  const handleClick = async () => {
    
    
    try {
      
      
      // ---------------------------------------------
      //   Button Disable
      // ---------------------------------------------
      
      setButtonDisabled(true);
      
      
      
      
      // // ---------------------------------------------
      // //   FormData
      // // ---------------------------------------------
      
      // const formDataObj = {
        
      //   gameCommunities_id,
      //   userCommunities_id,
        
      // };
      
      
      // // ---------------------------------------------
      // //   Fetch
      // // ---------------------------------------------
      
      // const resultObj = await fetchWrapper({
        
      //   urlApi: `${process.env.NEXT_PUBLIC_URL_API}/v2/db/follows/upsert-follow`,
      //   methodType: 'POST',
      //   formData: JSON.stringify(formDataObj),
        
      // });
      
      
      // console.log(`
      //   ----- resultObj -----\n
      //   ${util.inspect(resultObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   Error
      // ---------------------------------------------
      
      // if ('errorsArr' in resultObj) {
      //   throw new CustomError({ errorsArr: resultObj.errorsArr });
      // }
      
      
      // --------------------------------------------------
      //   console.log
      // --------------------------------------------------
      
      // console.log(`
      //   ----------------------------------------\n
      //   /app/common/follow/stores/store.js - handleFollow
      // `);
      
      // console.log(chalk`
      //   type: {green ${type}}
      //   gameCommunities_id: {green ${gameCommunities_id}}
      //   userCommunities_id: {green ${userCommunities_id}}
      // `);
      
      // console.log(`
      //   ----- storeData.headerObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(storeData.headerObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
      // ---------------------------------------------
      //   メンバーかどうか、メンバー数を変更
      // ---------------------------------------------
      
      // if (lodashHas(resultObj, ['data', 'follow'])) {
      //   lodashSet(followsObj, ['follow'], resultObj.data.followedCount);
      // }
      
      // if (lodashHas(resultObj, ['data', 'followedCount'])) {
      //   lodashSet(followsObj, ['followedCount'], resultObj.data.followedCount);
      // }
      
      
      
      
      
      
      // ---------------------------------------------
      //   Snackbar: Success
      // ---------------------------------------------
      
      const type = '';
      
      let messageID = 'RTsMTGw-1';
      
      switch (type) {
        
        case 'followGc':
          messageID = 'RTsMTGw-1';
          break;
          
        case 'unfollowGc':
          messageID = '1z127R0YE';
          break;
          
        
        case 'followUc':
          messageID = 'SY6WWDyxQ';
          break;
          
        case 'unfollowUc':
          messageID = 'xWAfTONZ6';
          break;
          
        case 'followApprovalUc':
          messageID = 'PaC4bsJe2';
          break;
          
        case 'unfollowApprovalUc':
          messageID = 'HOo6u_sXD';
          break;
          
      }
      
      
      handleSnackbarOpen({
        
        variant: 'success',
        messageID,
        
      });
      
      
      
      // ---------------------------------------------
      //   リロードする
      // ---------------------------------------------
      
      // const pageTransition = lodashGet(resultObj, ['data', 'pageTransition'], false);
      
      // if (pageTransition) {
      //   window.location.reload();
      // }
      
      
    } catch (errorObj) {
      
      
      // ---------------------------------------------
      //   Snackbar: Error
      // ---------------------------------------------
      
      handleSnackbarOpen({
        
        variant: 'error',
        errorObj,
        
      });
      // storeLayout.handleSnackbarOpen({
      //   variant: 'error',
      //   errorObj,
      // });
      
      
    } finally {
      
      
      // ---------------------------------------------
      //   Button Enable
      // ---------------------------------------------
      
      setButtonDisabled(false);
      
      
      // // ---------------------------------------------
      // //   ダイアログを非表示にする
      // //   /app/common/follow/components/gc-uc-button.js
      // // ---------------------------------------------
      
      // this.handleEdit({
      //   pathArr: [...pathArr, 'showDialogUnfollow'],
      //   value: false,
      // });
      
      // this.handleEdit({
      //   pathArr: [...pathArr, 'showDialogUnfollowApproval'],
      //   value: false,
      // });
      
      
    }
    
    
  };
  
  
  
  
  // --------------------------------------------------
  //   Property
  // --------------------------------------------------
  
  const login = lodashHas(loginUsersObj, ['_id']);
  
  const admin = lodashGet(followsObj, ['admin'], false);
  // const follow = lodashGet(followsObj, ['follow'], false);
  const follow = true;
  const followedCount = lodashGet(followsObj, ['followedCount'], 0);
  const followBlocked = lodashGet(followsObj, ['followBlocked'], false);
  
  
  
  console.log(chalk`
    login: {green ${login}}
    lodashHas(loginUsersObj, ['_id']): {green ${lodashHas(loginUsersObj, ['_id'])}}
  `);
  
  console.log(`
    ----- loginUsersObj -----\n
    ${util.inspect(JSON.parse(JSON.stringify(loginUsersObj)), { colors: true, depth: null })}\n
    --------------------\n
  `);
  
  // console.log(`
  //   ----- followsObj -----\n
  //   ${util.inspect(JSON.parse(JSON.stringify(followsObj)), { colors: true, depth: null })}\n
  //   --------------------\n
  // `);
  
  
  
  
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
              // () => {}
              () => handleClick({
                
                // pathArr: this.pathArr,
                // type: 'followGc',
                // gameCommunities_id,
                
              })
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
  
  
  component = 
    <Button
      variant="contained"
      color="secondary"
      size="small"
      onClick={handleClick}
      disabled={buttonDisabled}
    >
      Snackbar
    </Button>
  ;
  
  
  
  
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
  
  // console.log(`
  //   ----------------------------------------\n
  //   /app/common/follow/v2/components/gc-button.js
  // `);
  
  // console.log(chalk`
  //   login: {green ${login}}
  // `);
  
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