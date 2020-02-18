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
//   Class
// --------------------------------------------------

@inject('stores', 'storeFollow')
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
    
    const users_id = lodashGet(props, ['stores', 'data', 'headerObj', 'users_id'], '');
    
    this.pathArr = [users_id, 'followButton'];
    
    
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
    
    const { stores, storeFollow, cssEmotion, buttonSize, users_id, followsObj } = this.props;
    
    const { 
      
      dataObj,
      handleEdit,
      handleFollowUr,
      
    } = storeFollow;
    
    
    const login = stores.data.getLogin();
    
    // const users_id = lodashGet(followsObj, ['users_id'], '');
    const approval = lodashGet(followsObj, ['approval'], false);
    const author = lodashGet(followsObj, ['author'], false);
    const follow = lodashGet(followsObj, ['follow'], false);
    const followApproval = lodashGet(followsObj, ['followApproval'], false);
    const followBlocked = lodashGet(followsObj, ['followBlocked'], false);
    
    
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = stores.layout.handleGetButtonDisabled({ pathArr: this.pathArr });
    
    
    
    
    // --------------------------------------------------
    //   フォロー解除 / フォロー申請を取り下げるか尋ねるダイアログを表示するための変数
    // --------------------------------------------------
    
    const showDialogUnfollow = lodashGet(dataObj, [...this.pathArr, 'showDialogUnfollow'], false);
    const showDialogUnfollowApproval = lodashGet(dataObj, [...this.pathArr, 'showDialogUnfollowApproval'], false);
    
    
    
    
    // --------------------------------------------------
    //   Component
    // --------------------------------------------------
    
    let componentButton =  '';
    
    
    // ---------------------------------------------
    //   - ログインしていない場合
    // ---------------------------------------------
    
    if (!login) {
      
      componentButton = 
        <Link href="/login">
          <Button
            variant="contained"
            color="secondary"
            size={buttonSize}
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
      
      
      // ---------------------------------------------
      //   - 承認制
      // ---------------------------------------------
      
      if (approval) {
        
        componentButton = 
          <Button
            variant="contained"
            color="secondary"
            size={buttonSize}
            onClick={() => handleFollowUr({
              pathArr: this.pathArr,
              type: 'followApproval',
              users_id
            })}
            disabled={buttonDisabled}
          >
            フォローする
          </Button>
        ;
        
        
      // ---------------------------------------------
      //   - だれでもフォロー可能
      // ---------------------------------------------
        
      } else {
        
        componentButton = 
          <Button
            variant="contained"
            color="secondary"
            size={buttonSize}
            onClick={() => handleFollowUr({
              pathArr: this.pathArr,
              type: 'follow',
              users_id
            })}
            disabled={buttonDisabled}
          >
            フォローする
          </Button>
        ;
        
      }
      
      
    }
    
    
    // ---------------------------------------------
    //   - ログインしていてフォロー済みである場合
    // ---------------------------------------------
    
    if (login && follow) {
      
      componentButton = 
        <Button
          variant="contained"
          color="primary"
          size={buttonSize}
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
    
    
    // ---------------------------------------------
    //   - 参加申請済みの場合
    // ---------------------------------------------
    
    if (followApproval) {
      
      componentButton = 
        <Button
          variant="contained"
          color="primary"
          size={buttonSize}
          onClick={() => handleEdit({
            pathArr: [...this.pathArr, 'showDialogUnfollowApproval'],
            value: true,
          })}
          disabled={buttonDisabled}
        >
          フォロー申請を取り下げる
        </Button>
      ;
      
    }
    
    
    // ---------------------------------------------
    //   - 作者またはブロックされている場合
    // ---------------------------------------------
    
    if (author || followBlocked) {
      return null;
    }
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/common/follow/components/ur-button.js
    // `);
    
    // console.log(`
    //   ----- lodashGet(stores, ['data', 'headerObj'], {}) -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(lodashGet(stores, ['data', 'headerObj'], {}))), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <div
        css={cssEmotion}
        // css={css`
        //   // margin: 12px 12px 4px;
        // `}
      >
        
        {componentButton}
        
        
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
          
          <DialogTitle id="alert-dialog-title1">フォローの解除</DialogTitle>
          
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
                onClick={() => handleFollowUr({
                  pathArr: this.pathArr,
                  type: 'unfollow',
                  users_id
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
        
        
        
        
        {/* フォロー申請を取り下げるか尋ねるダイアログ */}
        <Dialog
          open={showDialogUnfollowApproval}
          onClose={() => handleEdit({
            pathArr: [...this.pathArr, 'showDialogUnfollowApproval'],
            value: false,
          })}
          aria-labelledby="alert-dialog-title2"
          aria-describedby="alert-dialog-description2"
        >
          
          <DialogTitle id="alert-dialog-title2">フォロー申請の取り下げ</DialogTitle>
          
          <DialogContent>
            <DialogContentText id="alert-dialog-description2">
              フォロー申請を取り下げますか？
            </DialogContentText>
          </DialogContent>
          
          <DialogActions>
            <div
              css={css`
                margin: 0 auto 0 0;
              `}
            >
              <Button
                onClick={() => handleFollowUr({
                  pathArr: this.pathArr,
                  type: 'unfollowApproval',
                  users_id
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