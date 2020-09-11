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
import Link from 'next/link';
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

import IconPermIdentity from '@material-ui/icons/PermIdentity';


// --------------------------------------------------
//   Stores
// --------------------------------------------------

// import initStoreFollow from '../@stores/store';




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores')
@observer
export default class extends React.Component {
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    
    super(props);
    
    
    // --------------------------------------------------
    //   Path Array
    // --------------------------------------------------
    
    const gameCommunities_id = lodashGet(props, ['stores', 'data', 'headerObj', 'gameCommunities_id'], '');
    
    this.pathArr = [gameCommunities_id, 'followButton'];
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   componentDidMount
  // --------------------------------------------------
  
  componentDidMount() {
    
    
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
    
    const { stores, gameCommunities_id, followsObj } = this.props;
    
    const { 
      
      dataObj,
      handleEdit,
      handleFollow,
      
    } = stores.follow;
    
    
    const login = stores.data.getLogin();
    
    const admin = lodashGet(followsObj, ['admin'], false);
    const follow = lodashGet(followsObj, ['follow'], false);
    const followedCount = lodashGet(followsObj, ['followedCount'], 0);
    const followBlocked = lodashGet(followsObj, ['followBlocked'], false);
    
    
    // console.log(`
    //   ----- followsObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(followsObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = stores.layout.handleGetButtonDisabled({ pathArr: this.pathArr });
    
    
    
    
    // --------------------------------------------------
    //   フォローを解除するか尋ねるダイアログを表示するための変数
    // --------------------------------------------------
    
    const showDialogUnfollow = lodashGet(dataObj, [...this.pathArr, 'showDialogUnfollow'], false);
    
    
    
    
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
          <a className="link">
            <Button
              variant="contained"
              color="secondary"
              size="small"
            >
              フォローする
            </Button>
          </a>
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
            buttonDisabled === false ?
              () => handleFollow({
                pathArr: this.pathArr,
                type: 'followGc',
                gameCommunities_id
              })
            :
              () => {}
          }
          // onClick={() => handleFollow({
          //   pathArr: this.pathArr,
          //   type: 'followGc',
          //   gameCommunities_id
          // })}
          // disabled={buttonDisabled}
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
            buttonDisabled === false ?
              () => handleEdit({
                pathArr: [...this.pathArr, 'showDialogUnfollow'],
                value: true,
              })
            :
              () => {}
          }
          // onClick={() => handleEdit({
          //   pathArr: [...this.pathArr, 'showDialogUnfollow'],
          //   value: true,
          // })}
          // disabled={buttonDisabled}
        >
          フォロー中
        </Button>
      ;
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Component - Number of People
    // --------------------------------------------------
    
    let componentNumberOfPeople =  '';
    
    componentNumberOfPeople = 
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
    
    // console.log(chalk`
    //   headerDataOpen: {green ${headerDataOpen}}
    //   name: {green ${name}}
    //   hardware: {green ${hardware}}
    // `);
    
    // console.log(`\n---------- hardwareSortedArr ----------\n`);
    // console.dir(JSON.parse(JSON.stringify(hardwareSortedArr)));
    // console.log(`\n-----------------------------------\n`);
    
    // console.log(`
    //   ----- hardwareSortedArr -----\n
    //   ${util.inspect(hardwareSortedArr, { colors: true, depth: null })}\n
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
          open={showDialogUnfollow}
          onClose={() => handleEdit({
            pathArr: [...this.pathArr, 'showDialogUnfollow'],
            value: false,
          })}
          aria-labelledby="alert-dialog-title1"
          aria-describedby="alert-dialog-description1"
        >
          
          <DialogTitle id="alert-dialog-title1">フォロー解除</DialogTitle>
          
          <DialogContent>
            <DialogContentText id="alert-dialog-description1">
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
                onClick={() => handleFollow({
                  pathArr: this.pathArr,
                  type: 'unfollowGc',
                  gameCommunities_id
                })}
                color="primary"
                autoFocus
              >
                はい
              </Button>
            </div>
            
            <Button
              onClick={() => handleEdit({
                pathArr: [...this.pathArr, 'showDialogUnfollow'],
                value: false,
              })}
              color="primary"
            >
              いいえ
            </Button>
          </DialogActions>
          
        </Dialog>
        
        
      </div>
    );
    
    
  }
  
};