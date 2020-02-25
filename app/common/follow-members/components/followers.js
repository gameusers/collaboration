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
import { injectIntl } from 'react-intl';
import Pagination from 'rc-pagination';
import localeInfo from 'rc-pagination/lib/locale/ja_JP';
import lodashGet from 'lodash/get';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Paper from '@material-ui/core/Paper';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import CardPlayer from '../../card/player/components/player';




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

const stylesObj = {
  
  input: {
    fontSize: '12px',
    color: '#666',
    padding: '6px 26px 6px 12px',
  },
  
};




// --------------------------------------------------
//   Class
// --------------------------------------------------

@withStyles(stylesObj)
@inject('stores', 'storeFollowMembers')
@observer
export default injectIntl(class extends React.Component {
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    
    super(props);
    
    
    // --------------------------------------------------
    //   Path Array
    // --------------------------------------------------
    
    this.pathArr = props.pathArr;
    
    
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
    
    const {
      
      classes,
      stores,
      storeFollowMembers,
      intl,
      pageType,
      users_id,
      gameCommunities_id,
      userCommunities_id,
      pathArr,
      pathname,
      accessLevel,
      
    } = this.props;
    
    
    const {
      
      dataObj,
      handleEdit,
      handleReadFollowers,
      handleShowDialog,
      handleManageFollowers,
      
    } = storeFollowMembers;
    
    
    const type = lodashGet(dataObj, [...pathArr, 'type'], 'follow');
    const page = lodashGet(dataObj, [...pathArr, 'followMembersObj', `${type}Obj`, 'page'], 1);
    const count = lodashGet(dataObj, [...pathArr, 'followMembersObj', `${type}Obj`, 'count'], 0);
    const limit = parseInt((stores.data.getCookie({ key: 'followLimit' }) || process.env.FOLLOWERS_LIMIT), 10);
    const arr = lodashGet(dataObj, [...pathArr, 'followMembersObj', `${type}Obj`, `page${page}Obj`, 'arr'], []);
    
    let approvalCount = lodashGet(dataObj, [...pathArr, 'followMembersObj', 'approvalObj', 'count'], 0);
    
    if (approvalCount > 99) {
      approvalCount = '99+';
    }
    
    
    
    
    // --------------------------------------------------
    //   loginUsers_id
    // --------------------------------------------------
    
    const loginUsers_id = lodashGet(stores, ['data', 'loginUsersObj', '_id'], '');
    
    
    
    
    // --------------------------------------------------
    //   ダイアログ
    // --------------------------------------------------
    
    const dialogType = lodashGet(dataObj, [...pathArr, 'dialogObj', 'type'], 'unfollow');
    const showDialog = lodashGet(dataObj, [...pathArr, 'showDialog'], false);
    
    
    let dialogTitle = '';
    let dialogDescription = '';
    
    
    if (pageType === 'uc') {
      
      if (dialogType === 'unfollow') {
        
        dialogTitle = 'コミュニティ退会';
        dialogDescription = 'コミュニティから退会させますか？';
        
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
        
      } else if (dialogType === 'block') {
        
        dialogTitle = 'ブロック';
        dialogDescription = 'ブロックしますか？';
        
      } else if (dialogType === 'block') {
        
        dialogTitle = 'ブロック解除';
        dialogDescription = 'ブロックを解除しますか？';
        
      }
      
    }
    
    
    
    // const showDialogUnfollow = lodashGet(dataObj, [...pathArr, 'showDialogUnfollow'], false);
    // const showDialogApproval = lodashGet(dataObj, [...pathArr, 'showDialogApproval'], false);
    // const showDialogUnapproval = lodashGet(dataObj, [...pathArr, 'showDialogUnapproval'], false);
    // const showDialogBlock = lodashGet(dataObj, [...pathArr, 'showDialogBlock'], false);
    // const showDialogUnblock = lodashGet(dataObj, [...pathArr, 'showDialogUnblock'], false);
    
    
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = stores.layout.handleGetButtonDisabled({ pathArr });
    
    
    
    
    // --------------------------------------------------
    //   Component - CardPlayers
    // --------------------------------------------------
    
    const componentCardPlayersArr = [];
    
    for (const [index, cardPlayers_id] of arr.entries()) {
      
      
      // --------------------------------------------------
      //   targetUsers_id - 管理する相手の users_id
      // --------------------------------------------------
      
      const targetUsers_id = lodashGet(stores, ['data', 'cardPlayersObj', cardPlayers_id, 'users_id'], '');
      
      
      componentCardPlayersArr.push(
        <div
          css={css`
            ${index === 0 ? 'margin: 0' : 'margin: 16px 0 0 0'};
          `}
          key={index}
        >
          
          
          {/* Card Player */}
          <CardPlayer
            cardPlayers_id={cardPlayers_id}
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
              
              
              {type === 'follow' &&
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
                    onClick={() => handleShowDialog({
                      // pathArr,
                      // managedUsers_id,
                      // pageType,
                      // type: 'unfollow',
                      pathArr,
                      pathname,
                      users_id,
                      gameCommunities_id,
                      userCommunities_id,
                      targetUsers_id,
                      type: 'unfollow',
                    })}
                  >
                    {pageType === 'ur' ? 'フォロー解除' : '退会'}
                  </Button>
                </div>
              }
              
              
              {type === 'approval' &&
                <React.Fragment>
                  
                  <Button
                    css={cssButton}
                    variant="contained"
                    color="secondary"
                    disabled={buttonDisabled}
                    onClick={() => handleShowDialog({
                      pathArr,
                      pathname,
                      users_id,
                      gameCommunities_id,
                      userCommunities_id,
                      targetUsers_id,
                      type: 'approval',
                    })}
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
                      onClick={() => handleShowDialog({
                        pathArr,
                        pathname,
                        users_id,
                        gameCommunities_id,
                        userCommunities_id,
                        targetUsers_id,
                        type: 'unapproval',
                      })}
                    >
                      {pageType === 'ur' ? 'フォロー拒否' : '参加拒否'}
                    </Button>
                  </div>
                  
                </React.Fragment>
              }
              
              
              {type !== 'block' &&
                <Button
                  css={cssButton}
                  variant="contained"
                  color="secondary"
                  disabled={buttonDisabled}
                  onClick={() => handleShowDialog({
                    pathArr,
                    pathname,
                    users_id,
                    gameCommunities_id,
                    userCommunities_id,
                    targetUsers_id,
                    type: 'block',
                  })}
                >
                  ブロック
                </Button>
              }
              
              
              {type === 'block' &&
                <Button
                  css={cssButton}
                  variant="contained"
                  color="primary"
                  disabled={buttonDisabled}
                  onClick={() => handleShowDialog({
                    pathArr,
                    pathname,
                    users_id,
                    gameCommunities_id,
                    userCommunities_id,
                    targetUsers_id,
                    type: 'unblock',
                  })}
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
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/common/follow-members/components/followers.js
    // `);
    
    // console.log(chalk`
    //   type: {green ${type}}
    //   page: {green ${page}}
    //   count: {green ${count}}
    //   limit: {green ${limit}}
      
    // `);
    
    // const followObj = lodashGet(dataObj, [...pathArr, 'followMembersObj', 'followObj'], {});
    
    // console.log(`
    //   ----- followObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(followObj)), { colors: true, depth: null })}\n
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
      <React.Fragment>
        
        
        {/* Control Buttons */}
        <Paper
          css={css`
            display: flex;
            flex-flow: row wrap;
            margin: 0 0 16px 0;
            padding: 12px 12px;
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
                onClick={() => handleReadFollowers({
                  pathArr,
                  pathname,
                  users_id,
                  gameCommunities_id,
                  userCommunities_id,
                  newType: 'follow',
                  page: 1,
                })}
              >
                <span
                  css={css`
                    font-weight: ${type === 'follow' ? 'bold' : 'normal'};
                  `}
                >
                  フォロー
                </span>
              </Button>
            }
            
            
            <Button
              onClick={() => handleReadFollowers({
                pathArr,
                pathname,
                users_id,
                gameCommunities_id,
                userCommunities_id,
                newType: 'followed',
                page: 1,
              })}
            >
              <span
                css={css`
                  font-weight: ${type === 'followed' ? 'bold' : 'normal'};
                `}
              >
                {pageType === 'uc' ? 'メンバー' : 'フォロワー'}
              </span>
            </Button>
            
            
            {/* 管理者用 */}
            {accessLevel >= 50 &&
              <Button
                onClick={() => handleReadFollowers({
                  pathArr,
                  pathname,
                  users_id,
                  gameCommunities_id,
                  userCommunities_id,
                  newType: 'approval',
                  page: 1,
                })}
              >
                <span
                  css={css`
                    font-weight: ${type === 'approval' ? 'bold' : 'normal'};
                  `}
                >
                  承認 ({approvalCount})
                </span>
              </Button>
            }
            
            
            {/* 管理者用 */}
            {accessLevel >= 50 &&
              <Button
                onClick={() => handleReadFollowers({
                  pathArr,
                  pathname,
                  users_id,
                  gameCommunities_id,
                  userCommunities_id,
                  newType: 'block',
                  page: 1,
                })}
              >
                <span
                  css={css`
                    font-weight: ${type === 'block' ? 'bold' : 'normal'};
                  `}
                >
                  ブロック
                </span>
              </Button>
            }
            
            
          </ButtonGroup>
        
        </Paper>
        
        
        
        
        {/* Member's Card Players */}
        {componentCardPlayersArr}
        
        
        
        
        {/* Pagination */}
        <Paper
          css={css`
            display: flex;
            flex-flow: row wrap;
            margin: 16px 0 0 0;
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
              onChange={(page) => handleReadFollowers({
                pathArr,
                pathname,
                users_id,
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
            disabled={buttonDisabled}
          >
            
            <Select
              value={limit}
              onChange={(eventObj) => handleReadFollowers({
                pathArr,
                pathname,
                users_id,
                gameCommunities_id,
                userCommunities_id,
                page: 1,
                newLimit: eventObj.target.value,
              })}
              input={
                <OutlinedInput
                  classes={{
                    input: classes.input
                  }}
                  name="member-pagination"
                  id="outlined-rows-per-page"
                />
              }
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
            
          </FormControl>
          
          
        </Paper>
        
        
        
        
        {/* ダイアログ */}
        <Dialog
          open={showDialog}
          onClose={() => handleEdit({
            pathArr: [...this.pathArr, 'showDialog'],
            value: false,
          })}
          aria-labelledby="alert-dialog-title1"
          aria-describedby="alert-dialog-description1"
        >
          
          <DialogTitle id="alert-dialog-title1">{dialogTitle}</DialogTitle>
          
          <DialogContent>
            <DialogContentText id="alert-dialog-description1">
              {dialogDescription}
            </DialogContentText>
          </DialogContent>
          
          <DialogActions>
            <div
              css={css`
                margin: 0 auto 0 0;
              `}
            >
              <Button
                onClick={() => handleManageFollowers({
                  pathArr,
                  pathname,
                  users_id,
                  gameCommunities_id,
                  userCommunities_id,
                })}
                color="primary"
                autoFocus
              >
                はい
              </Button>
            </div>
            
            <Button
              onClick={() => handleEdit({
                pathArr: [...this.pathArr, 'showDialog'],
                value: false,
              })}
              color="primary"
            >
              いいえ
            </Button>
          </DialogActions>
          
        </Dialog>
        
        
        
        
        {/* ダイアログ - 退会させる */}
        {/*<Dialog
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
              コミュニティから退会させますか？
            </DialogContentText>
          </DialogContent>
          
          <DialogActions>
            <div
              css={css`
                margin: 0 auto 0 0;
              `}
            >
              <Button
                onClick={() => handleManageFollowers({
                  pathArr,
                  pathname,
                  users_id,
                  gameCommunities_id,
                  userCommunities_id,
                  type: 'unfollow',
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
          
        </Dialog>*/}
        
        
        
        
        {/* ダイアログ - 参加承認 */}
        {/*<Dialog
          open={showDialogApproval}
          onClose={() => handleEdit({
            pathArr: [...this.pathArr, 'showDialogApproval'],
            value: false,
          })}
          aria-labelledby="alert-dialog-title2"
          aria-describedby="alert-dialog-description2"
        >
          
          <DialogTitle id="alert-dialog-title2">参加承認</DialogTitle>
          
          <DialogContent>
            <DialogContentText id="alert-dialog-description2">
              参加を承認しますか？
            </DialogContentText>
          </DialogContent>
          
          <DialogActions>
            <div
              css={css`
                margin: 0 auto 0 0;
              `}
            >
              <Button
                onClick={() => handleManageFollowers({
                  pathArr,
                  pathname,
                  users_id,
                  gameCommunities_id,
                  userCommunities_id,
                  type: 'approval',
                })}
                color="primary"
                autoFocus
              >
                はい
              </Button>
            </div>
            
            <Button
              onClick={() => handleEdit({
                pathArr: [...this.pathArr, 'showDialogApproval'],
                value: false,
              })}
              color="primary"
            >
              いいえ
            </Button>
          </DialogActions>
          
        </Dialog>*/}
        
        
        
        
        {/* ダイアログ - 参加拒否 */}
        {/*<Dialog
          open={showDialogUnapproval}
          onClose={() => handleEdit({
            pathArr: [...this.pathArr, 'showDialogUnapproval'],
            value: false,
          })}
          aria-labelledby="alert-dialog-title3"
          aria-describedby="alert-dialog-description3"
        >
          
          <DialogTitle id="alert-dialog-title3">参加拒否</DialogTitle>
          
          <DialogContent>
            <DialogContentText id="alert-dialog-description3">
              参加を拒否しますか？
            </DialogContentText>
          </DialogContent>
          
          <DialogActions>
            <div
              css={css`
                margin: 0 auto 0 0;
              `}
            >
              <Button
                onClick={() => handleManageFollowers({
                  pathArr,
                  pathname,
                  users_id,
                  gameCommunities_id,
                  userCommunities_id,
                  type: 'unapproval',
                })}
                color="primary"
                autoFocus
              >
                はい
              </Button>
            </div>
            
            <Button
              onClick={() => handleEdit({
                pathArr: [...this.pathArr, 'showDialogUnapproval'],
                value: false,
              })}
              color="primary"
            >
              いいえ
            </Button>
          </DialogActions>
          
        </Dialog>*/}
        
        
        
        
        {/* ダイアログ - ブロック */}
        {/*<Dialog
          open={showDialogBlock}
          onClose={() => handleEdit({
            pathArr: [...this.pathArr, 'showDialogBlock'],
            value: false,
          })}
          aria-labelledby="alert-dialog-title4"
          aria-describedby="alert-dialog-description4"
        >
          
          <DialogTitle id="alert-dialog-title4">ブロック</DialogTitle>
          
          <DialogContent>
            <DialogContentText id="alert-dialog-description4">
              ブロックしますか？<br />ブロックしたユーザーはコミュニティに参加できなくなります
            </DialogContentText>
          </DialogContent>
          
          <DialogActions>
            <div
              css={css`
                margin: 0 auto 0 0;
              `}
            >
              <Button
                onClick={() => handleManageFollowers({
                  pathArr,
                  pathname,
                  users_id,
                  gameCommunities_id,
                  userCommunities_id,
                  type: 'block',
                })}
                color="primary"
                autoFocus
              >
                はい
              </Button>
            </div>
            
            <Button
              onClick={() => handleEdit({
                pathArr: [...this.pathArr, 'showDialogBlock'],
                value: false,
              })}
              color="primary"
            >
              いいえ
            </Button>
          </DialogActions>
          
        </Dialog>*/}
        
        
        
        
        {/* ダイアログ - ブロック解除 */}
        {/*<Dialog
          open={showDialogUnblock}
          onClose={() => handleEdit({
            pathArr: [...this.pathArr, 'showDialogUnblock'],
            value: false,
          })}
          aria-labelledby="alert-dialog-title5"
          aria-describedby="alert-dialog-description5"
        >
          
          <DialogTitle id="alert-dialog-title5">ブロック解除</DialogTitle>
          
          <DialogContent>
            <DialogContentText id="alert-dialog-description5">
              ブロックを解除しますか？
            </DialogContentText>
          </DialogContent>
          
          <DialogActions>
            <div
              css={css`
                margin: 0 auto 0 0;
              `}
            >
              <Button
                onClick={() => handleManageFollowers({
                  pathArr,
                  pathname,
                  users_id,
                  gameCommunities_id,
                  userCommunities_id,
                  type: 'unblock',
                })}
                color="primary"
                autoFocus
              >
                はい
              </Button>
            </div>
            
            <Button
              onClick={() => handleEdit({
                pathArr: [...this.pathArr, 'showDialogUnblock'],
                value: false,
              })}
              color="primary"
            >
              いいえ
            </Button>
          </DialogActions>
          
        </Dialog>*/}
        
        
      </React.Fragment>
    );
    
  }
  
});