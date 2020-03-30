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
import TextareaAutosize from 'react-autosize-textarea';
import lodashGet from 'lodash/get';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

import { validationRecruitmentThreadsTitle } from '../../../../@database/recruitment-threads/validations/title';
import { validationRecruitmentThreadsName } from '../../../../@database/recruitment-threads/validations/name';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Hardware from './hardware';
import ImageAndVideoForm from '../../../../common/image-and-video/components/form';




// --------------------------------------------------
//   Emotion
//   https://emotion.sh/docs/composition
// --------------------------------------------------

const cssBox = css`
  border-top: 1px dashed #848484;
  margin: 24px 0 0 0;
  padding: 24px 0 0 0;
`;




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores', 'storeGcRecruitment')
@observer
export default injectIntl(class extends React.Component {
  
  
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
    
    // 新規追加時
    this.pathArr = [props.gameCommunities_id, 'recruitmentFormThreadsObj'];
    
    // 編集時
    if (props.recruitmentThreads_id) {
      this.pathArr = [props.recruitmentThreads_id, 'recruitmentFormThreadsObj'];
    }
    
    
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
    
    const {
      
      stores,
      storeGcRecruitment,
      intl,
      gameCommunities_id,
      recruitmentThreads_id,
      
    } = this.props;
    
    
    
    
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
      handleSubmitFormThread,
      handleDeleteThread,
      
    } = storeGcRecruitment;
    
    
    // --------------------------------------------------
    //   Form Data
    // --------------------------------------------------
    
    const title = lodashGet(dataObj, [...this.pathArr, 'title'], '');
    const name = lodashGet(dataObj, [...this.pathArr, 'name'], '');
    const comment = lodashGet(dataObj, [...this.pathArr, 'comment'], '');
    const category = lodashGet(dataObj, [...this.pathArr, 'category'], 1);
    
    
    // --------------------------------------------------
    //   Validations
    // --------------------------------------------------
    
    const validationRecruitmentThreadsTitleObj = validationRecruitmentThreadsTitle({ value: title });
    const validationRecruitmentThreadsNameObj = validationRecruitmentThreadsName({ value: name });
    
    
    // --------------------------------------------------
    //   Limit
    // --------------------------------------------------
    
    const limit = parseInt(process.env.FORUM_THREAD_IMAGES_AND_VIDEOS_LIMIT, 10);
    
    
    // --------------------------------------------------
    //   募集を削除するか尋ねるダイアログを表示するための変数
    // --------------------------------------------------
    
    const showDeleteDialog = lodashGet(dataObj, [...this.pathArr, 'showDeleteDialog'], false);
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/common/forum/components/form-thread.js
    // `);
    
    // console.log(`
    //   ----- validationRecruitmentThreadsTitleObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(validationRecruitmentThreadsTitleObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   /app/common/forum/components/form-thread.js
    //   recruitmentThreads_id: {green ${recruitmentThreads_id}}
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <form
        css={css`
          padding: 0 0 8px;
        `}
        name={recruitmentThreads_id ? `form-thread-${recruitmentThreads_id}` : 'form-thread-new'}
        onSubmit={(eventObj) => handleSubmitFormThread({
          eventObj,
          pathArr: this.pathArr,
          gameCommunities_id,
          recruitmentThreads_id,
        })}
      >
        
        
        <p
          css={css`
            margin: 0 0 14px 0;
          `}
        >
          募集を新しく投稿する場合、こちらのフォームを利用して投稿してください。
        </p>
        
        
        
        
        {/* Hardware */}
        <div css={cssBox}>
          <Hardware />
        </div>
        
        
        
        
        {/* Category */}
        <div css={cssBox}>
          
          <h3
            css={css`
              font-weight: bold;
              margin: 0 0 2px 0;
            `}
          >
            カテゴリー
          </h3>
          
          <p
            css={css`
              margin: 0 0 24px 0;
            `}
          >
            当てはまるカテゴリーを選んでください。どのカテゴリーにも当てはまらない場合は「なし」を選んでください。
          </p>
          
          
          <FormControl>
            
            <InputLabel htmlFor="category">募集のカテゴリー</InputLabel>
            
            <Select
              css={css`
                && {
                  width: 200px;
                }
              `}
              _id="category"
              value={category}
              onChange={(eventObj) => handleEdit({
                pathArr: [...this.pathArr, 'category'],
                value: eventObj.target.value
              })}
            >
              <MenuItem value={1}>なし</MenuItem>
              <MenuItem value={2}>フレンド募集</MenuItem>
              <MenuItem value={3}>メンバー募集</MenuItem>
              <MenuItem value={4}>売買・交換相手募集</MenuItem>
            </Select>
            
          </FormControl>
          
        </div>
        
        
        
        
        {/* Title & Handle Name & Comment */}
        <div css={cssBox}>
          
          <TextField
            css={css`
              && {
                width: 100%;
                max-width: 500px;
                ${recruitmentThreads_id && `margin-top: 4px;`}
              }
            `}
            id="threadTitle"
            label="募集タイトル"
            value={validationRecruitmentThreadsTitleObj.value}
            onChange={(eventObj) => handleEdit({
              pathArr: [...this.pathArr, 'title'],
              value: eventObj.target.value
            })}
            error={validationRecruitmentThreadsTitleObj.error}
            helperText={intl.formatMessage({ id: validationRecruitmentThreadsTitleObj.messageID }, { numberOfCharacters: validationRecruitmentThreadsTitleObj.numberOfCharacters })}
            margin="normal"
            inputProps={{
              maxLength: 100,
            }}
          />
          
          
          
          
          {/* Name */}
          <TextField
            css={css`
              && {
                width: 100%;
                max-width: 500px;
                ${recruitmentThreads_id && `margin-top: 4px;`}
              }
            `}
            id="threadName"
            label="ハンドルネーム"
            value={validationRecruitmentThreadsNameObj.value}
            onChange={(eventObj) => handleEdit({
              pathArr: [...this.pathArr, 'name'],
              value: eventObj.target.value
            })}
            error={validationRecruitmentThreadsNameObj.error}
            helperText={intl.formatMessage({ id: validationRecruitmentThreadsNameObj.messageID }, { numberOfCharacters: validationRecruitmentThreadsNameObj.numberOfCharacters })}
            margin="normal"
            inputProps={{
              maxLength: 50,
            }}
          />
          
          
          
          
          {/* Comment */}
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
              placeholder="募集について必要な情報をこちらに記述してください。"
              value={comment}
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
              descriptionImage="募集に表示する画像をアップロードできます。"
              descriptionVideo="募集に表示する動画を登録できます。"
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
          `}
        >
          
          
          {/* Submit */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={buttonDisabled}
          >
            {recruitmentThreads_id ? '募集を編集する' : '募集を投稿する'}
          </Button>
          
          
          {/* 削除ボタン */}
          {recruitmentThreads_id &&
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
          {recruitmentThreads_id &&
            <div
              css={css`
                margin: 0 0 0 auto;
              `}
            >
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleEdit({
                  pathArr: [recruitmentThreads_id, 'showForm'],
                  value: false
                })}
                disabled={buttonDisabled}
              >
                閉じる
              </Button>
            </div>
          }
          
        </div>
        
        
        
        
        {/* 募集を削除するか尋ねるダイアログ */}
        <Dialog
          open={showDeleteDialog}
          onClose={() => handleEdit({
            pathArr: [...this.pathArr, 'showDeleteDialog'],
            value: false,
          })}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          
          <DialogTitle id="alert-dialog-title">募集削除</DialogTitle>
          
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              募集を削除しますか？
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
                  recruitmentThreads_id,
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
    );
    
  }
  
});