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
import { injectIntl } from 'react-intl';
import { Element } from 'react-scroll';
import TextareaAutosize from 'react-autosize-textarea';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';


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
//   Material UI / Icon
// ---------------------------------------------

import IconReply from '@material-ui/icons/Reply';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

import { validationHandleName } from 'app/@validations/name.js';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import ImageAndVideoForm from 'app/common/image-and-video/components/form.js';






// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores', 'storeGcRecruitment')
@observer
export default injectIntl(class extends React.Component {
  
  
  // --------------------------------------------------
  //   componentDidMount
  // --------------------------------------------------
  
  componentDidMount() {
    
    
    // --------------------------------------------------
    //   Button - Enable
    // --------------------------------------------------
    
    this.props.stores.layout.handleButtonEnable({ pathArr: this.props.pathArr });
    
    
  }
  
  
  
  
  // --------------------------------------------------
  //   render
  // --------------------------------------------------
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const {
      
      stores,
      storeGcRecruitment,
      intl,
      pathArr = [],
      gameCommunities_id,
      recruitmentThreads_id,
      recruitmentComments_id,
      recruitmentReplies_id,
      replyToRecruitmentReplies_id,
      
    } = this.props;
    
    
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = stores.layout.handleGetButtonDisabled({ pathArr });
    
    
    
    
    // --------------------------------------------------
    //   storeGcRecruitment
    // --------------------------------------------------
    
    const {
      
      dataObj,
      handleEdit,
      handleSubmitRecruitmentReply,
      handleDeleteRecruitmentReply,
      handleHideFormRecruitmentReply,
      
    } = storeGcRecruitment;
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const name = lodashGet(dataObj, [...pathArr, 'name'], '');
    const comment = lodashGet(dataObj, [...pathArr, 'comment'], '');
    
    
    // --------------------------------------------------
    //   Validations
    // --------------------------------------------------
    
    const validationHandleNameObj = validationHandleName({ value: name });
    
    
    // --------------------------------------------------
    //   Limit
    // --------------------------------------------------
    
    const limit = parseInt(process.env.NEXT_PUBLIC_RECRUITMENT_REPLY_IMAGES_AND_VIDEOS_LIMIT, 10);
    
    
    // --------------------------------------------------
    //   Reply to
    // --------------------------------------------------
    
    const repliesDataObj = lodashGet(dataObj, [gameCommunities_id, 'recruitmentRepliesObj', 'dataObj'], {});
    
    // console.log(`
    //   ----- repliesDataObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(repliesDataObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    let replyToName = '';
    let replyTo = '';
    
    if (recruitmentReplies_id) {
      
      replyToName = lodashGet(repliesDataObj, [recruitmentReplies_id, 'replyToName'], '');
      
    } else if (replyToRecruitmentReplies_id) {
      
      const nonLoginUsersName = lodashGet(repliesDataObj, [replyToRecruitmentReplies_id, 'name'], '');
      const loginUsersName = lodashGet(repliesDataObj, [replyToRecruitmentReplies_id, 'cardPlayersObj', 'name'], '');
      
      replyToName = loginUsersName || nonLoginUsersName;
      
      if (!replyToName) {
        replyToName = 'ななしさん';
      }
      
    }
    
    if (replyToName) {
      replyTo = `${replyToName} | ${replyToRecruitmentReplies_id} への返信`;
    }
    
    
    // --------------------------------------------------
    //   返信を削除するか尋ねるダイアログを表示するための変数
    // --------------------------------------------------
    
    const showDeleteDialog = lodashGet(dataObj, [...pathArr, 'showDeleteDialog'], false);
    
    
    // --------------------------------------------------
    //   login
    // --------------------------------------------------
    
    const login = stores.data.getLogin();
    
    
    // --------------------------------------------------
    //   Element Name
    // --------------------------------------------------
    
    const elementName = pathArr.join('-');
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/gc/rec/components/form/reply.js
    // `);
    
    // console.log(`
    //   ----- pathArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   gameCommunities_id: {green ${gameCommunities_id}}
    //   recruitmentThreads_id: {green ${recruitmentThreads_id}}
    //   recruitmentComments_id: {green ${recruitmentComments_id}}
    //   recruitmentReplies_id: {green ${recruitmentReplies_id}}
    //   login: {green ${login}}
    //   elementName: {green ${elementName}}
    // `);
    
    // console.log(`
    //   ----- validationHandleNameObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(validationHandleNameObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Element
        css={css`
          margin: ${recruitmentReplies_id ? '0 0 24px 0' : '0'};
        `}
        name={elementName}
      >
        
        
        <form
          name={elementName}
          onSubmit={(eventObj) => handleSubmitRecruitmentReply({
            eventObj,
            pathArr,
            gameCommunities_id,
            recruitmentThreads_id,
            recruitmentComments_id,
            recruitmentReplies_id,
            replyToRecruitmentReplies_id,
          })}
        >
          
          
          {/* Title & Handle Name & Comment */}
          <div css={css`
            border-top: 1px dashed #848484;
            margin: 24px 0 0 0;
            padding: 24px 0 0 0;
          `}>
            
            
            {/* Reply To */}
            {replyTo &&
              <div
                css={css`
                  display: flex;
                  flex-flow: row nowrap;
                  margin: 0 0 12px 0;
                  color: #7401DF;
                `}
              >
                <IconReply
                  css={css`
                    && {
                      font-size: 16px;
                      margin: 4px 4px 0 0;
                    }
                  `}
                />
                <p>{replyTo}</p>
              </div>
            }
            
            
            {/* Name */}
            {!login &&
              <TextField
                css={css`
                  && {
                    width: 100%;
                    max-width: 500px;
                    margin-top: ${replyTo ? '4px' : '0'};
                  }
                `}
                id={`${pathArr.join('-')}-name`}
                label="ハンドルネーム"
                value={validationHandleNameObj.value}
                onChange={(eventObj) => handleEdit({
                  pathArr: [...pathArr, 'name'],
                  value: eventObj.target.value
                })}
                error={validationHandleNameObj.error}
                helperText={intl.formatMessage({ id: validationHandleNameObj.messageID }, { numberOfCharacters: validationHandleNameObj.numberOfCharacters })}
                margin="normal"
                inputProps={{
                  maxLength: 50,
                }}
              />
            }
            
            
            
            
            {/* Comment */}
            <div
              css={css`
                margin: ${login ? '0' : '12px 0 0 0'};
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
                placeholder="返信を入力してください。"
                value={comment}
                onChange={(eventObj) => handleEdit({
                  pathArr: [...pathArr, 'comment'],
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
                pathArr={pathArr}
                type="recruitment"
                descriptionImage="返信に表示する画像をアップロードできます。"
                descriptionVideo="返信に表示する動画を登録できます。"
                showImageCaption={true}
                limit={limit}
              />
              
            </div>
            
            
          </div>
          
          
          
          
          {/* Buttons */}
          <div
            css={css`
              display: flex;
              flex-flow: row nowrap;
              margin: 24px 0 0 0;
              // padding: 24px 0 0 0;
            `}
          >
            
            
            {/* Submit */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={buttonDisabled}
            >
              {recruitmentReplies_id ? '編集する' : '投稿する'}
            </Button>
            
            
            {/* Delete */}
            {recruitmentReplies_id &&
              <div
                css={css`
                  margin: 0 0 0 24px;
                `}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleEdit({
                    pathArr: [...pathArr, 'showDeleteDialog'],
                    value: true,
                  })}
                  disabled={buttonDisabled}
                >
                  削除する
                </Button>
              </div>
            }
            
            
            {/* Close */}
            <div
              css={css`
                margin: 0 0 0 auto;
              `}
            >
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleHideFormRecruitmentReply({
                  pathArr,
                  recruitmentComments_id,
                  recruitmentReplies_id,
                  replyToRecruitmentReplies_id,
                })}
                disabled={buttonDisabled}
              >
                閉じる
              </Button>
            </div>
            
          </div>
          
          
          
          
          {/* 返信を削除するか尋ねるダイアログ */}
          <Dialog
            open={showDeleteDialog}
            onClose={() => handleEdit({
              pathArr: [...pathArr, 'showDeleteDialog'],
              value: false,
            })}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            
            <DialogTitle id="alert-dialog-title">返信削除</DialogTitle>
            
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                返信を削除しますか？
              </DialogContentText>
            </DialogContent>
            
            <DialogActions>
              <div
                css={css`
                  margin: 0 auto 0 0;
                `}
              >
                <Button
                  onClick={() => handleDeleteRecruitmentReply({
                    pathArr,
                    gameCommunities_id,
                    recruitmentThreads_id,
                    recruitmentComments_id,
                    recruitmentReplies_id,
                  })}
                  color="primary"
                  autoFocus
                >
                  はい
                </Button>
              </div>
              
              <Button
                onClick={() => handleEdit({
                  pathArr: [...pathArr, 'showDeleteDialog'],
                  value: false,
                })}
                color="primary"
              >
                いいえ
              </Button>
            </DialogActions>
            
          </Dialog>
          
          
        </form>
        
        
      </Element>
    );
    
    
  }
  
  
});