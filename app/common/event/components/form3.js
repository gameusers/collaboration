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
import { Element } from 'react-scroll';
import Pagination from 'rc-pagination';
import localeInfo from 'rc-pagination/lib/locale/ja_JP';
import lodashGet from 'lodash/get';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import { withStyles } from '@material-ui/core/styles';

// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import ExpansionPanel from '@material-ui/core/ExpansionPanel';
// import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
// import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// import Paper from '@material-ui/core/Paper';

// import OutlinedInput from '@material-ui/core/OutlinedInput';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

// const { validationForumThreadsName } = require('../../../@database/forum-threads/validations/name');


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Panel from '../../layout/components/panel';
import Paragraph from '../../layout/components/paragraph';
import ImageAndVideo from '../../image-and-video/components/image-and-video';




// --------------------------------------------------
//   Material UI Style Overrides
//   https://material-ui.com/styles/basics/
// --------------------------------------------------

const stylesObj = {
  
  expanded: {
    marginBottom: '0 !important',
  },
  
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
@inject('stores', 'storeForum')
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
    
    this.communities_id = this.props._id;
    this.pathArr = [this.props._id, 'eventObj'];
    
    
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
      storeForum,
      intl,
      _id,
      temporaryDataID,
      userCommunityID,
      gameCommunities_id,
      userCommunities_id,
      individual,
      
    } = this.props;
    
    
    
    
    // --------------------------------------------------
    //   Panel Expand Function
    // --------------------------------------------------
    
    const handlePanelExpand = lodashGet(stores, ['layout', 'handlePanelExpand'], () => {});
    const panelExpanded = stores.layout.handleGetPanelExpanded({ pathArr: this.pathArr });
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = stores.layout.handleGetButtonDisabled({ pathArr: this.pathArr });
    
    
    
    
    // --------------------------------------------------
    //   Forum
    // --------------------------------------------------
    
    const {
      
      dataObj,
      handleEdit,
      handleReadThreads,
      handleShowFormThread,
      
    } = storeForum;
    
    
    // --------------------------------------------------
    //   Link Return Top
    // --------------------------------------------------
    
    let linkReturnTopHref = '';
    let linkReturnTopAs = '';
    
    if (userCommunityID) {
      
      linkReturnTopHref = `/uc/[userCommunityID]?userCommunityID=${userCommunityID}`;
      linkReturnTopAs = `/uc/${userCommunityID}`;
      
    }
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   /app/common/forum/components/thread.js
    //   page: {green ${page}}
    //   count: {green ${count}}
    //   limit: {green ${limit}}
    //   userCommunityID: {green ${userCommunityID}}
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
      <Element
        name={`${_id}-event`}
      >
        
        
        <Panel _id="panelEvent" heading="イベント登録フォーム">
          
          
          <form
            css={css`
              padding: 0 0 8px;
            `}
            // name={`form-${forumThreads_id}`}
            // onSubmit={(eventObj) => handleSubmitFormThread({
            //   eventObj,
            //   pathArr: this.pathArr,
            //   gameCommunities_id,
            //   userCommunities_id,
            //   forumThreads_id,
            // })}
          >
            
            
            {/* Name */}
            <TextField
              css={css`
                && {
                  width: 100%;
                  max-width: 500px;
                }
              `}
              id="createTreadName"
              label="スレッド名"
              // value={validationForumThreadsNameObj.value}
              // onChange={(eventObj) => handleEdit({
              //   pathArr: [...this.pathArr, 'name'],
              //   value: eventObj.target.value
              // })}
              // error={validationForumThreadsNameObj.error}
              // helperText={intl.formatMessage({ id: validationForumThreadsNameObj.messageID }, { numberOfCharacters: validationForumThreadsNameObj.numberOfCharacters })}
              margin="normal"
              inputProps={{
                maxLength: 100,
              }}
            />
            
            
            
            
            {/* Description */}
            <div
              css={css`
                margin: 12px 0 0 0;
              `}
            >
              
              <TextareaAutosize
                css={css`
                  && {
                    width: 100%;
                    border-radius: 4px;
                    box-sizing: border-box;
                    padding: 8px 12px;
                    line-height: 1.8;
                    
                    &:focus {
                      outline: 1px #A9F5F2 solid;
                    }
                    
                    resize: none;
                  }
                `}
                rows={5}
                placeholder="スレッドについての説明、書き込みルールなどがあれば、こちらに記述してください。"
                // value={comment}
                onChange={(eventObj) => handleEdit({
                  pathArr: [...this.pathArr, 'comment'],
                  value: eventObj.target.value
                })}
                maxLength={3000}
                disabled={buttonDisabled}
              />
              
            </div>
            
            
            
            
            {/* Form Images & Videos */}
            <div
              css={css`
                margin: 12px 0 0 0;
              `}
            >
              
              <ImageAndVideoForm
                pathArr={this.pathArr}
                type="forum"
                descriptionImage="スレッドに表示する画像をアップロードできます。"
                descriptionVideo="スレッドに表示する動画を登録できます。"
                showImageCaption={true}
                limit={limit}
              />
              
            </div>
            
            
            
            
            {/* Buttons */}
            <div
              css={css`
                display: flex;
                flex-flow: row nowrap;
                margin: 24px 0 0 0;
              `}
            >
              
              
              {/* Submit */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={buttonDisabled}
              >
                {forumThreads_id ? 'スレッドを編集する' : 'スレッドを作成する'}
              </Button>
              
              
              {/* 削除ボタン */}
              {forumThreads_id &&
                <div
                  css={css`
                    margin: 0 0 0 24px;
                  `}
                >
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleEdit({
                      pathArr: [...this.pathArr, 'showDeleteDialog'],
                      value: true,
                    })}
                    disabled={buttonDisabled}
                  >
                    削除する
                  </Button>
                </div>
              }
              
              
              {/* Close */}
              {forumThreads_id &&
                <div
                  css={css`
                    margin: 0 0 0 auto;
                  `}
                >
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleEdit({
                      pathArr: [forumThreads_id, 'showForm'],
                      value: false
                    })}
                    disabled={buttonDisabled}
                  >
                    閉じる
                  </Button>
                </div>
              }
              
            </div>
            
            
            
            
            {/* スレッドを削除するか尋ねるダイアログ */}
            <Dialog
              open={showDeleteDialog}
              onClose={() => handleEdit({
                pathArr: [...this.pathArr, 'showDeleteDialog'],
                value: false,
              })}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              
              <DialogTitle id="alert-dialog-title">スレッド削除</DialogTitle>
              
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  スレッドを削除しますか？
                </DialogContentText>
              </DialogContent>
              
              <DialogActions>
                <div
                  css={css`
                    margin: 0 auto 0 0;
                  `}
                >
                  <Button
                    onClick={() => handleDeleteThread({
                      pathArr: this.pathArr,
                      gameCommunities_id,
                      userCommunities_id,
                      forumThreads_id,
                    })}
                    color="primary"
                    autoFocus
                  >
                    はい
                  </Button>
                </div>
                
                <Button
                  onClick={() => handleEdit({
                    pathArr: [...this.pathArr, 'showDeleteDialog'],
                    value: false,
                  })}
                  color="primary"
                >
                  いいえ
                </Button>
              </DialogActions>
              
            </Dialog>
            
            
          </form>
          
          
        </Panel>
        
        
      </Element>
    );
    
  }
  
});