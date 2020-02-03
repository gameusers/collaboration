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
// import moment from 'moment';
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

import CardPlayer from '../../../common/card/player/components/player';




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
@inject('stores', 'storeUcMember')
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
      storeUcMember,
      intl,
      userCommunities_id,
      pathArr,
      pathname,
      author,
      
    } = this.props;
    
    
    const {
      
      dataObj,
      handleEdit,
      handleReadMembers,
      handleOpenDialog,
      handleMembers,
      
    } = storeUcMember;
    
    
    const authorUsers_id = lodashGet(stores, ['data', 'loginUsersObj', '_id'], '');
    
    const type = lodashGet(dataObj, [...pathArr, 'type'], 'member');
    const page = lodashGet(dataObj, [...pathArr, 'membersObj', 'page'], 1);
    const count = lodashGet(dataObj, [...pathArr, 'membersObj', 'count'], 1);
    const limit = parseInt((stores.data.getCookie({ key: 'memberLimit' }) || process.env.COMMUNITY_MEMBER_LIMIT), 10);
    const arr = lodashGet(dataObj, [...pathArr, 'membersObj', `page${page}Obj`, 'arr'], []);
    
    let approvalCount = lodashGet(dataObj, [...pathArr, 'approvalCount'], 0);
    
    if (approvalCount > 99) {
      approvalCount = '99+';
    }
    
    let blockCount = lodashGet(dataObj, [...pathArr, 'blockCount'], 0);
    
    if (blockCount > 99) {
      blockCount = '99+';
    }
    
    
    
    
    // --------------------------------------------------
    //   ダイアログ
    // --------------------------------------------------
    
    const showDialogUnfollow = lodashGet(dataObj, [...pathArr, 'showDialogUnfollow'], false);
    const showDialogApproval = lodashGet(dataObj, [...pathArr, 'showDialogApproval'], false);
    const showDialogUnapproval = lodashGet(dataObj, [...pathArr, 'showDialogUnapproval'], false);
    const showDialogBlock = lodashGet(dataObj, [...pathArr, 'showDialogBlock'], false);
    const showDialogUnblock = lodashGet(dataObj, [...pathArr, 'showDialogUnblock'], false);
    
    
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = stores.layout.handleGetButtonDisabled({ pathArr });
    
    
    
    
    // --------------------------------------------------
    //   メンバー
    // --------------------------------------------------
    
    const componentCardPlayersArr = [];
    
    for (const [index, cardPlayers_id] of arr.entries()) {
      
      
      // --------------------------------------------------
      //   managedUsers_id
      // --------------------------------------------------
      
      const managedUsers_id = lodashGet(stores, ['data', 'cardPlayersObj', cardPlayers_id, 'users_id'], '');
      
      // console.log(chalk`
      //   authorUsers_id: {green ${authorUsers_id}}
      //   managedUsers_id: {green ${managedUsers_id}}
      // `);
      
      // console.log(`
      //   ----- cardPlayersObj -----\n
      //   ${util.inspect(JSON.parse(JSON.stringify(cardPlayersObj)), { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
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
          
          
          {/* Buttons */}
          {(author && authorUsers_id !== managedUsers_id) &&
            <div
              css={css`
                display: flex;
                flex-flow: row wrap;
                margin: 12px 0 16px 0;
              `}
            >
              
              
              {type === 'member' &&
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
                    onClick={() => handleOpenDialog({
                      pathArr,
                      managedUsers_id,
                      type: 'unfollow',
                    })}
                  >
                    退会
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
                    // onClick={() => handleMembers({
                    //   pathArr,
                    //   pathname,
                    //   userCommunities_id,
                    //   managedUsers_id,
                    //   type: 'approval',
                    // })}
                    // onClick={() => handleEdit({
                    //   pathArr: [...this.pathArr, 'showDialogApproval'],
                    //   value: true,
                    // })}
                    onClick={() => handleOpenDialog({
                      pathArr,
                      managedUsers_id,
                      type: 'approval',
                    })}
                  >
                    参加承認
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
                      // onClick={() => handleEdit({
                      //   pathArr: [...this.pathArr, 'showDialogUnapproval'],
                      //   value: true,
                      // })}
                      onClick={() => handleOpenDialog({
                        pathArr,
                        managedUsers_id,
                        type: 'unapproval',
                      })}
                    >
                      参加拒否
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
                  // onClick={() => handleEdit({
                  //   pathArr: [...this.pathArr, 'showDialogBlock'],
                  //   value: true,
                  // })}
                  onClick={() => handleOpenDialog({
                    pathArr,
                    managedUsers_id,
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
                  // onClick={() => handleEdit({
                  //   pathArr: [...this.pathArr, 'showDialogUnblock'],
                  //   value: true,
                  // })}
                  onClick={() => handleOpenDialog({
                    pathArr,
                    managedUsers_id,
                    type: 'unblock',
                  })}
                >
                  ブロック解除
                </Button>
              }
              
              
            </div>
          }
          
          
        </div>
      );
      
    }
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/uc/member/components/member.js
    // `);
    
    // console.log(chalk`
    //   type: {green ${type}}
    //   page: {green ${page}}
    //   count: {green ${count}}
    //   limit: {green ${limit}}
    // `);
    
    // console.log(`
    //   ----- arr -----\n
    //   ${util.inspect(arr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----------------------------------------
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        
        
        {/* Control Buttons */}
        {author &&
          <div
            css={css`
              margin: 0 0 24px 0;
            `}
          >
            <ButtonGroup
              variant="contained"
              aria-label="contained primary button group"
              disabled={buttonDisabled}
            >
            
              <Button
                onClick={() => handleReadMembers({
                  pathArr,
                  pathname,
                  userCommunities_id,
                  newType: 'member',
                  page: 1,
                })}
              >
                <span
                  css={css`
                    font-weight: ${type === 'member' ? 'bold' : 'normal'};
                  `}
                >
                  メンバー
                </span>
              </Button>
              
              <Button
                
                onClick={() => handleReadMembers({
                  pathArr,
                  pathname,
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
                  承認申請 ({approvalCount})
                </span>
              </Button>
              
              <Button
                onClick={() => handleReadMembers({
                  pathArr,
                  pathname,
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
                  ブロック ({blockCount})
                </span>
              </Button>
              
            </ButtonGroup>
          </div>
        }
        
        
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
              onChange={(page) => handleReadMembers({
                pathArr,
                pathname,
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
              onChange={(eventObj) => handleReadMembers({
                pathArr,
                pathname,
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
        
        
        
        
        {/* ダイアログ - 退会させる */}
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
                onClick={() => handleMembers({
                  pathArr,
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
          
        </Dialog>
        
        
        
        
        {/* ダイアログ - 参加承認 */}
        <Dialog
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
                onClick={() => handleMembers({
                  pathArr,
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
          
        </Dialog>
        
        
        
        
        {/* ダイアログ - 参加拒否 */}
        <Dialog
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
                onClick={() => handleMembers({
                  pathArr,
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
          
        </Dialog>
        
        
        
        
        {/* ダイアログ - ブロック */}
        <Dialog
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
                onClick={() => handleMembers({
                  pathArr,
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
          
        </Dialog>
        
        
        
        
        {/* ダイアログ - ブロック解除 */}
        <Dialog
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
                onClick={() => handleMembers({
                  pathArr,
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
          
        </Dialog>
        
        
      </React.Fragment>
    );
    
  }
  
});