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
    
    const userCommunities_id = lodashGet(props, ['stores', 'data', 'headerObj', 'userCommunities_id'], '');
    
    this.pathArr = [userCommunities_id, 'followButton'];
    
    
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
    
    const { stores, userCommunities_id, followsObj } = this.props;
    
    const { 
      
      dataObj,
      handleEdit,
      handleFollow,
      
    } = stores.follow;
    
    
    const login = stores.data.getLogin();
    
    const approval = lodashGet(followsObj, ['approval'], false);
    const admin = lodashGet(followsObj, ['admin'], false);
    const follow = lodashGet(followsObj, ['follow'], false);
    const followApproval = lodashGet(followsObj, ['followApproval'], false);
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
    //   コミュニティから退会 / 参加申請を取り下げるか尋ねるダイアログを表示するための変数
    // --------------------------------------------------
    
    const showDialogUnfollow = lodashGet(dataObj, [...this.pathArr, 'showDialogUnfollow'], false);
    const showDialogUnfollowApproval = lodashGet(dataObj, [...this.pathArr, 'showDialogUnfollowApproval'], false);
    
    
    
    
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
            コミュニティに参加する
          </Button>
        </Link>
      ;
      
    }
    
    
    // ---------------------------------------------
    //   - ログインしていてメンバーでない場合
    // ---------------------------------------------
    
    if (login && !follow) {
      
      
      // ---------------------------------------------
      //   - 承認制
      // ---------------------------------------------
      
      if (approval) {
        
        component = 
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleFollow({
              pathArr: this.pathArr,
              type: 'followApprovalUc',
              userCommunities_id
            })}
            disabled={buttonDisabled}
          >
            コミュニティに参加申請する
          </Button>
        ;
        
        
      // ---------------------------------------------
      //   - だれでも参加可能
      // ---------------------------------------------
        
      } else {
        
        component = 
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleFollow({
              pathArr: this.pathArr,
              type: 'followUc',
              userCommunities_id
            })}
            disabled={buttonDisabled}
          >
            コミュニティに参加する
          </Button>
        ;
        
      }
      
      
    }
    
    
    // ---------------------------------------------
    //   - ログインしていてメンバーである場合
    // ---------------------------------------------
    
    if (login && follow) {
      
      component = 
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
          コミュニティから退会する
        </Button>
      ;
      
    }
    
    
    // ---------------------------------------------
    //   - 参加申請済みの場合
    // ---------------------------------------------
    
    if (followApproval) {
      
      component = 
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleEdit({
            pathArr: [...this.pathArr, 'showDialogUnfollowApproval'],
            value: true,
          })}
          disabled={buttonDisabled}
        >
          参加申請を取り下げる
        </Button>
      ;
      
    }
    
    
    // ---------------------------------------------
    //   - 作者またはブロックされている場合
    // ---------------------------------------------
    
    if (admin || followBlocked) {
      return null;
    }
    
    
    
    
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
          margin: 12px 12px 4px;
        `}
      >
        
        {component}
        
        
        {/* コミュニティを退会するか尋ねるダイアログ */}
        <Dialog
          open={showDialogUnfollow}
          onClose={() => handleEdit({
            pathArr: [...this.pathArr, 'showDialogUnfollow'],
            value: false,
          })}
          aria-labelledby="alert-dialog-title1"
          aria-describedby="alert-dialog-description1"
        >
          
          <DialogTitle id="alert-dialog-title1">コミュニティの退会</DialogTitle>
          
          <DialogContent>
            <DialogContentText id="alert-dialog-description1">
              コミュニティから退会しますか？
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
                  type: 'unfollowUc',
                  userCommunities_id
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
        
        
        
        
        {/* 参加申請を取り下げるか尋ねるダイアログ */}
        <Dialog
          open={showDialogUnfollowApproval}
          onClose={() => handleEdit({
            pathArr: [...this.pathArr, 'showDialogUnfollowApproval'],
            value: false,
          })}
          aria-labelledby="alert-dialog-title2"
          aria-describedby="alert-dialog-description2"
        >
          
          <DialogTitle id="alert-dialog-title2">参加申請の取り下げ</DialogTitle>
          
          <DialogContent>
            <DialogContentText id="alert-dialog-description2">
              参加申請を取り下げますか？
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
                  type: 'unfollowApprovalUc',
                  userCommunities_id
                })}
                color="primary"
                autoFocus
              >
                はい
              </Button>
            </div>
            
            <Button
              onClick={() => handleEdit({
                pathArr: [...this.pathArr, 'showDialogUnfollowApproval'],
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