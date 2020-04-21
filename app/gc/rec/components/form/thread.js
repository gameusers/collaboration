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

import lodashGet from 'lodash/get';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
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

import FormHardwares from '../../../../common/hardware/components/form';
import FormIDsInformations from '../form/ids-informations';
import FormDeadline from '../form/deadline';
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
//   Material UI Style Overrides
//   https://material-ui.com/styles/basics/
// --------------------------------------------------

const stylesObj = {
  
  label: {
    fontSize: 14
  },
  
};




// --------------------------------------------------
//   Class
// --------------------------------------------------

@withStyles(stylesObj)
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
      
      classes,
      stores,
      storeGcRecruitment,
      intl,
      pathArr = [],
      gameCommunities_id,
      recruitmentThreads_id,
      
    } = this.props;
    
    
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = stores.layout.handleGetButtonDisabled({ pathArr });
    
    
    
    
    // --------------------------------------------------
    //   Forum
    // --------------------------------------------------
    
    const {
      
      dataObj,
      handleEdit,
      handleSubmitRecruitmentThread,
      handleGetWebPushSubscribeObj,
      handleDeleteThread,
      handleHideFormThread,
      
    } = storeGcRecruitment;
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const category = lodashGet(dataObj, [...pathArr, 'category'], '');
    const title = lodashGet(dataObj, [...pathArr, 'title'], '');
    const name = lodashGet(dataObj, [...pathArr, 'name'], '');
    const comment = lodashGet(dataObj, [...pathArr, 'comment'], '');
    const twitter = lodashGet(dataObj, [...pathArr, 'twitter'], false);
    const webPush = lodashGet(dataObj, [...pathArr, 'webPush'], false);
    
    const limitHardwares = parseInt(process.env.RECRUITMENT_THREAD_HARDWARES_LIMIT, 10);
    
    
    // --------------------------------------------------
    //   Validations
    // --------------------------------------------------
    
    const validationRecruitmentThreadsTitleObj = validationRecruitmentThreadsTitle({ value: title });
    const validationRecruitmentThreadsNameObj = validationRecruitmentThreadsName({ value: name });
    
    
    // --------------------------------------------------
    //   Limit
    // --------------------------------------------------
    
    const limit = parseInt(process.env.RECRUITMENT_THREAD_IMAGES_AND_VIDEOS_LIMIT, 10);
    
    
    // --------------------------------------------------
    //   募集を削除するか尋ねるダイアログを表示するための変数
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
    //   /app/gc/rec/components/form/thread.js
    // `);
    
    // console.log(`
    //   ----- pathArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   gameCommunities_id: {green ${gameCommunities_id}}
    //   recruitmentThreads_id: {green ${recruitmentThreads_id}}
    //   login: {green ${login}}
    //   formName: {green ${formName}}
    // `);
    
    // console.log(`
    //   ----- validationRecruitmentThreadsID1Obj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(validationRecruitmentThreadsID1Obj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Element
        name={elementName}
      >
        
        
        <form
          name={elementName}
          onSubmit={(eventObj) => handleSubmitRecruitmentThread({
            eventObj,
            pathArr,
            gameCommunities_id,
            recruitmentThreads_id,
          })}
        >
          
          
          {recruitmentThreads_id &&
            <React.Fragment>
            
              <h3
                css={css`
                  font-weight: bold;
                  margin: 0 0 12px 0;
                `}
              >
                募集編集フォーム
              </h3>
              
              
              <p
                css={css`
                  margin: 0 0 14px 0;
                `}
              >
                投稿済みの募集を編集できます。
              </p>
              
            </React.Fragment>
          }
          
          
          {!recruitmentThreads_id &&
            <p
              css={css`
                margin: 0 0 14px 0;
              `}
            >
              募集を新しく投稿する場合、こちらのフォームを利用して投稿してください。ログインして投稿すると募集をいつでも編集できるようになり、ID・情報の公開相手を選ぶことができるようになります。
            </p>
          }
          
          
          
          
          {/* Form Hardware */}
          <div css={cssBox}>
            <FormHardwares
              pathArr={pathArr}
              limit={limitHardwares}
            />
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
              
              <InputLabel shrink id="categoryLabel">募集のカテゴリー</InputLabel>
              
              <Select
                css={css`
                  && {
                    width: 200px;
                  }
                `}
                labelId="categoryLabel"
                _id="category"
                value={category}
                onChange={(eventObj) => handleEdit({
                  pathArr: [...pathArr, 'category'],
                  value: eventObj.target.value
                })}
                displayEmpty
              >
                <MenuItem value="">なし</MenuItem>
                <MenuItem value={1}>フレンド募集</MenuItem>
                <MenuItem value={2}>メンバー募集</MenuItem>
                <MenuItem value={3}>売買・交換相手募集</MenuItem>
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
                pathArr: [...pathArr, 'title'],
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
            {!login &&
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
                  pathArr: [...pathArr, 'name'],
                  value: eventObj.target.value
                })}
                error={validationRecruitmentThreadsNameObj.error}
                helperText={intl.formatMessage({ id: validationRecruitmentThreadsNameObj.messageID }, { numberOfCharacters: validationRecruitmentThreadsNameObj.numberOfCharacters })}
                margin="normal"
                inputProps={{
                  maxLength: 50,
                }}
              />
            }
            
            
            
            
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
                descriptionImage="募集に表示する画像をアップロードできます。"
                descriptionVideo="募集に表示する動画を登録できます。"
                showImageCaption={true}
                limit={limit}
              />
              
            </div>
            
            
          </div>
          
          
          
          
          {/* ID & Other Information */}
          <div css={cssBox}>
            
            <FormIDsInformations
              type="thread"
              pathArr={pathArr}
              gameCommunities_id={gameCommunities_id}
              recruitmentThreads_id={recruitmentThreads_id}
            />
            
          </div>
          
          
          
          
          {/* Deadline */}
          <div css={cssBox}>
            
            <FormDeadline
              pathArr={pathArr}
            />
            
          </div>
          
          
          
          
          {/* プッシュ通知 */}
          <div css={cssBox}>
            
            <h3
              css={css`
                font-weight: bold;
                margin: 0 0 2px 0;
              `}
            >
              プッシュ通知
            </h3>
            
            <p
              css={css`
                margin: 0 0 12px 0;
              `}
            >
              ブラウザで通知を受け取れるプッシュ通知の設定を行えます。プッシュ通知を許可すると、募集に返信があったときに通知を受け取れるのでおすすめです。
            </p>
            
            <p
              css={css`
                margin: 0 0 12px 0;
              `}
            >
              プッシュ通知に対応しているブラウザは Chrome、Edge、Firefox、Opera です。
            </p>
            
            <p
              css={css`
                margin: 0 0 12px 0;
              `}
            >
              過去にGame Usersからのプッシュ通知をブロックしたことがある方は、ブロックを解除しなければ通知を受けることができません。通知を受け取りたい方はブロックの解除方法を調べてから実行してください。
            </p>
            
            
            <div>
              <FormControlLabel
                classes={{
                  label: classes.label
                }}
                control={
                  <Checkbox
                    checked={webPush}
                    onChange={(eventObj) => handleGetWebPushSubscribeObj({
                      pathArr,
                      checked: eventObj.target.checked
                    })}
                  />
                }
                label="プッシュ通知を許可する"
              />
            </div>
            
          </div>
          
          
          
          
          {/* Twitter */}
          <div css={cssBox}>
            
            <h3
              css={css`
                font-weight: bold;
                margin: 0 0 2px 0;
              `}
            >
              Twitter
            </h3>
            
            <p
              css={css`
                margin: 0 0 12px 0;
              `}
            >
              Twitterアカウントをお持ちの場合、自分のTwitterアカウントを利用して募集を告知することができます。チェックしない場合は、Game UsersのTwitterアカウントで告知が行われます。
            </p>
            
            
            <div>
              <FormControlLabel
                classes={{
                  label: classes.label
                }}
                control={
                  <Checkbox
                    checked={twitter}
                    onChange={(eventObj) => handleEdit({
                      pathArr: [...pathArr, 'twitter'],
                      value: eventObj.target.checked
                    })}
                  />
                }
                label="自分のTwitterアカウントで告知する"
              />
            </div>
            
          </div>
          
          
          
          
          {/* Buttons */}
          <div
            css={css`
              display: flex;
              flex-flow: row nowrap;
              border-top: 1px dashed #848484;
              margin: 24px 0 0 0;
              padding: 36px 0 0 0;
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
            
            
            {/* Delete */}
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
            {recruitmentThreads_id &&
              <div
                css={css`
                  margin: 0 0 0 auto;
                `}
              >
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleHideFormThread({
                    pathArr,
                    recruitmentThreads_id,
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
              pathArr: [...pathArr, 'showDeleteDialog'],
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
                    pathArr,
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