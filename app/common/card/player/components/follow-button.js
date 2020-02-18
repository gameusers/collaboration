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

import React from 'react';
import { inject, observer } from 'mobx-react';
import lodashGet from 'lodash/get';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


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

import IconFollowers from '@material-ui/icons/PermIdentity';




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores', 'storeCardPlayer', 'storeFollow')
@observer
export default class extends React.Component {
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    
    
    // --------------------------------------------------
    //   super
    // --------------------------------------------------
    
    super(props);
    
    
    // --------------------------------------------------
    //   Path Array
    // --------------------------------------------------
    
    this.pathArr = [props.cardPlayers_id, 'followButton'];
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   componentDidMount
  // --------------------------------------------------
  
  componentDidMount(){
    
    
    // --------------------------------------------------
    //   Button - Enable
    // --------------------------------------------------
    
    this.props.stores.layout.handleButtonEnable({ pathArr: this.pathArr });
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   render
  // --------------------------------------------------
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, storeCardPlayer, storeFollow, pathArr, users_id, followedCount, followed } = this.props;
    
    const { login, loginUsersObj } = stores.data;
    
    const {
      
      handleFollowSubmit,
      followDialogOpenObj,
      handleFollowDialogOpen,
      handleFollowDialogClose
      
    } = storeCardPlayer;
    
    const { 
      
      dataObj,
      handleEdit,
      handleFollowUr,
      
    } = storeFollow;
    
    
    
    
    // --------------------------------------------------
    //   ログインしていない場合、空のコンポーネントを返す
    // --------------------------------------------------
    
    if (!login) {
      return null;
    }
    
    
    // --------------------------------------------------
    //   自分のカードの場合、空のコンポーネントを返す
    // --------------------------------------------------
    
    if (users_id === loginUsersObj._id) {
      return null;
    }
    
    
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = stores.layout.handleGetButtonDisabled({ pathArr });
    
    
    
    
    // --------------------------------------------------
    //   フォロー解除 / フォロー申請を取り下げるか尋ねるダイアログを表示するための変数
    // --------------------------------------------------
    
    const showDialogUnfollow = lodashGet(dataObj, [...this.pathArr, 'showDialogUnfollow'], false);
    const showDialogUnfollowApproval = lodashGet(dataObj, [...this.pathArr, 'showDialogUnfollowApproval'], false);
    
    
    
    
    // --------------------------------------------------
    //   Component - Button
    // --------------------------------------------------
    
    let componentButton =
        <Button
          onClick={() => handleFollowUr({
            pathArr: this.pathArr,
            type: 'follow',
            users_id
          })}
          color="primary"
          autoFocus
        >
          フォローする
        </Button>
      ;
    
    if (followed) {
      componentButton = 
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleEdit({
            pathArr: [...this.pathArr, 'showDialogUnfollow'],
            value: true,
          })}
          disabled={buttonDisabled}
        >
          フォロー中
        </Button>
      ;
    }
    
    
    // --------------------------------------------------
    //   Dialog Open
    // --------------------------------------------------
    
    // let followDialogOpen = false;
    
    // if (users_id in followDialogOpenObj) {
    //   followDialogOpen = followDialogOpenObj[users_id];
    // }
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----- loginUsersObj -----\n
    //   ${util.inspect(loginUsersObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   users_id: {green ${users_id}}
    //   loginUsersObj._id: {green ${loginUsersObj._id}}
    //   followedCount: {green ${followedCount}}
    //   followed: {green ${followed}}
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <div
        css={css`
          display: flex;
          flex-flow: row wrap;
          align-items: center;
          
          margin: 28px 0 0 0;
        `}
      >
        
        
        {/* Button */}
        <div
          css={css`
            position: relative;
          `}
        >
          {componentButton}
        </div>
        
        
        {/* Followers */}
        <div
          css={css`
            display: flex;
            flex-flow: row wrap;
            align-items: center;
            margin: 0 0 0 10px;
          `}
        >
          <IconFollowers
            css={css`
              font-size: 24px;
              padding: 0;
            `}
          />
          {followedCount} 人
        </div>
        
        
        
        
        {/* Dialog */}
        <Dialog
          open={showDialogUnfollow}
          // onClose={() => handleFollowDialogClose(users_id)}
          onClose={() => handleEdit({
            pathArr: [...this.pathArr, 'showDialogUnfollow'],
            value: false,
          })}
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
            <Button onClick={() => handleFollowSubmit('unfollow', users_id)} color="primary" autoFocus>
              はい
            </Button>
            
            <Button onClick={() => handleFollowDialogClose(users_id)} color="primary">
              いいえ
            </Button>
          </DialogActions>
          
        </Dialog>
        
        
      </div>
    );
    
  }
  
};