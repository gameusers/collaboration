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
// import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
// import MenuItem from '@material-ui/core/MenuItem';
// import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

import { validationRecruitmentThreadsName } from '../../../../@database/recruitment-threads/validations/name';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import FormIDsInformations from '../form/ids-informations';
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
      recruitmentComments_id,
      publicSettingThread,
      
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
      handleSubmitRecruitmentComment,
      handleGetWebPushSubscribeObj,
      handleDeleteRecruitmentComment,
      handleHideFormRecruitmentComment,
      
    } = storeGcRecruitment;
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const name = lodashGet(dataObj, [...pathArr, 'name'], '');
    const comment = lodashGet(dataObj, [...pathArr, 'comment'], '');
    const webPush = lodashGet(dataObj, [...pathArr, 'webPush'], false);
    
    
    // --------------------------------------------------
    //   Validations
    // --------------------------------------------------
    
    const validationRecruitmentThreadsNameObj = validationRecruitmentThreadsName({ value: name });
    
    
    // --------------------------------------------------
    //   Limit
    // --------------------------------------------------
    
    const limit = parseInt(process.env.NEXT_PUBLIC_RECRUITMENT_COMMENT_IMAGES_AND_VIDEOS_LIMIT, 10);
    
    
    // --------------------------------------------------
    //   コメントを削除するか尋ねるダイアログを表示するための変数
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
    //   /app/gc/rec/components/form/comment.js
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
          onSubmit={(eventObj) => handleSubmitRecruitmentComment({
            eventObj,
            pathArr,
            gameCommunities_id,
            recruitmentThreads_id,
            recruitmentComments_id,
          })}
        >
          
          
          <h3
            css={css`
              font-weight: bold;
              margin: 0 0 12px 0;
            `}
          >
            コメント投稿フォーム
          </h3>
          
          
          <p
            css={css`
              margin: 0 0 14px 0;
            `}
          >
            こちらのフォームで募集にコメントが行えます。ログインして投稿するとコメントをいつでも編集できるようになり、ID・情報の公開相手を選ぶことができるようになります。
          </p>
          
          
          
          
          {/* Title & Handle Name & Comment */}
          <div css={cssBox}>
            
            
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
                placeholder="コメントを入力してください。"
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
                descriptionImage="コメントに表示する画像をアップロードできます。"
                descriptionVideo="コメントに表示する動画を登録できます。"
                showImageCaption={true}
                limit={limit}
              />
              
            </div>
            
            
          </div>
          
          
          
          
          {/* ID & Other Information */}
          <div css={cssBox}>
            
            <FormIDsInformations
              type="comment"
              pathArr={pathArr}
              gameCommunities_id={gameCommunities_id}
              recruitmentThreads_id={recruitmentThreads_id}
              recruitmentComments_id={recruitmentComments_id}
              publicSettingThread={publicSettingThread}
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
              ブラウザで通知を受け取れるプッシュ通知の設定を行えます。プッシュ通知を許可すると、コメントに返信があったときに通知を受け取れるのでおすすめです。
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
          
          
          
          
          {/* Buttons */}
          <div
            css={css`
              display: flex;
              flex-flow: row nowrap;
              border-top: 1px dashed #848484;
              margin: 24px 0 0 0;
              padding: 24px 0 0 0;
            `}
          >
            
            
            {/* Submit */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={buttonDisabled}
            >
              {recruitmentComments_id ? '編集する' : '投稿する'}
            </Button>
            
            
            {/* Delete */}
            {recruitmentComments_id &&
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
                onClick={() => handleHideFormRecruitmentComment({
                  pathArr,
                  recruitmentThreads_id,
                  recruitmentComments_id,
                })}
                disabled={buttonDisabled}
              >
                閉じる
              </Button>
            </div>
            
          </div>
          
          
          
          
          {/* コメントを削除するか尋ねるダイアログ */}
          <Dialog
            open={showDeleteDialog}
            onClose={() => handleEdit({
              pathArr: [...pathArr, 'showDeleteDialog'],
              value: false,
            })}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            
            <DialogTitle id="alert-dialog-title">コメント削除</DialogTitle>
            
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                コメントを削除しますか？
              </DialogContentText>
            </DialogContent>
            
            <DialogActions>
              <div
                css={css`
                  margin: 0 auto 0 0;
                `}
              >
                <Button
                  onClick={() => handleDeleteRecruitmentComment({
                    pathArr,
                    gameCommunities_id,
                    recruitmentThreads_id,
                    recruitmentComments_id,
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