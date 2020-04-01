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
import ButtonGroup from '@material-ui/core/ButtonGroup';
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
import { validationRecruitmentThreadsID } from '../../../../@database/recruitment-threads/validations/id';
import { validationRecruitmentThreadsInformationTitle, validationRecruitmentThreadsInformation } from '../../../../@database/recruitment-threads/validations/information';



// ---------------------------------------------
//   Components
// ---------------------------------------------

import FormHardwares from '../../../../common/form/components/hardwares';
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
    
    const hardware1 = lodashGet(dataObj, [...this.pathArr, 'hardware1'], 'none');
    const hardware2 = lodashGet(dataObj, [...this.pathArr, 'hardware2'], 'none');
    const hardware3 = lodashGet(dataObj, [...this.pathArr, 'hardware3'], 'none');
    const id3 = lodashGet(dataObj, [...this.pathArr, 'id3'], '');
    const id1 = lodashGet(dataObj, [...this.pathArr, 'id1'], '');
    const id2 = lodashGet(dataObj, [...this.pathArr, 'id2'], '');
    
    const informationTitle1 = lodashGet(dataObj, [...this.pathArr, 'informationTitle1'], '');
    const informationTitle2 = lodashGet(dataObj, [...this.pathArr, 'informationTitle2'], '');
    const informationTitle3 = lodashGet(dataObj, [...this.pathArr, 'informationTitle3'], '');
    const informationTitle4 = lodashGet(dataObj, [...this.pathArr, 'informationTitle4'], '');
    const informationTitle5 = lodashGet(dataObj, [...this.pathArr, 'informationTitle5'], '');
    
    const information1 = lodashGet(dataObj, [...this.pathArr, 'information1'], '');
    const information2 = lodashGet(dataObj, [...this.pathArr, 'information2'], '');
    const information3 = lodashGet(dataObj, [...this.pathArr, 'information3'], '');
    const information4 = lodashGet(dataObj, [...this.pathArr, 'information4'], '');
    const information5 = lodashGet(dataObj, [...this.pathArr, 'information5'], '');
    
    
    // --------------------------------------------------
    //   Validations
    // --------------------------------------------------
    
    const validationRecruitmentThreadsTitleObj = validationRecruitmentThreadsTitle({ value: title });
    const validationRecruitmentThreadsNameObj = validationRecruitmentThreadsName({ value: name });
    
    const validationRecruitmentThreadsID1Obj = validationRecruitmentThreadsID({ value: id1 });
    const validationRecruitmentThreadsID2Obj = validationRecruitmentThreadsID({ value: id2 });
    const validationRecruitmentThreadsID3Obj = validationRecruitmentThreadsID({ value: id3 });
    
    const validationRecruitmentThreadsInformationTitle1Obj = validationRecruitmentThreadsInformationTitle({ value: informationTitle1 });
    const validationRecruitmentThreadsInformationTitle2Obj = validationRecruitmentThreadsInformationTitle({ value: informationTitle2 });
    const validationRecruitmentThreadsInformationTitle3Obj = validationRecruitmentThreadsInformationTitle({ value: informationTitle3 });
    const validationRecruitmentThreadsInformationTitle4Obj = validationRecruitmentThreadsInformationTitle({ value: informationTitle4 });
    const validationRecruitmentThreadsInformationTitle5Obj = validationRecruitmentThreadsInformationTitle({ value: informationTitle5 });
    
    const validationRecruitmentThreadsInformation1Obj = validationRecruitmentThreadsInformation({ value: information1 });
    const validationRecruitmentThreadsInformation2Obj = validationRecruitmentThreadsInformation({ value: information2 });
    const validationRecruitmentThreadsInformation3Obj = validationRecruitmentThreadsInformation({ value: information3 });
    const validationRecruitmentThreadsInformation4Obj = validationRecruitmentThreadsInformation({ value: information4 });
    const validationRecruitmentThreadsInformation5Obj = validationRecruitmentThreadsInformation({ value: information5 });
    
    
    // --------------------------------------------------
    //   Limit
    // --------------------------------------------------
    
    const limit = parseInt(process.env.FORUM_THREAD_IMAGES_AND_VIDEOS_LIMIT, 10);
    
    
    // --------------------------------------------------
    //   ID & Other Information のどちらを表示するか決める変数
    // --------------------------------------------------
    
    const showForm = lodashGet(dataObj, [...this.pathArr, 'showForm'], 'id');
    
    
    // --------------------------------------------------
    //   募集を削除するか尋ねるダイアログを表示するための変数
    // --------------------------------------------------
    
    const showDeleteDialog = lodashGet(dataObj, [...this.pathArr, 'showDeleteDialog'], false);
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/gc/rec/components/form/thread.js
    // `);
    
    // console.log(chalk`
    //   recruitmentThreads_id: {green ${recruitmentThreads_id}}
    //   showForm: {green ${showForm}}
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
        
        
        
        
        {/* Form Hardware */}
        <div css={cssBox}>
          <FormHardwares
            pathArr={this.pathArr}
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
        
        
        
        
        {/* ID & Other Information */}
        <div css={cssBox}>
          
          <h3
            css={css`
              font-weight: bold;
              margin: 0 0 2px 0;
            `}
          >
            ID・その他の情報 （未記入でもOK）
          </h3>
          
          <p
            css={css`
              margin: 0 0 24px 0;
            `}
          >
            募集に必要なID・その他の情報を掲載できます。こちらの情報は期限が来ると自動的に非表示になります。
          </p>
          
          
          
          
          {/* Button */}
          <ButtonGroup color="primary" aria-label="outlined primary button group">
            
            <Button
              onClick={(eventObj) => handleEdit({
                pathArr: [...this.pathArr, 'showForm'],
                value: 'id',
              })}
            >
              ID
            </Button>
            
            <Button
              onClick={(eventObj) => handleEdit({
                pathArr: [...this.pathArr, 'showForm'],
                value: 'information',
              })}
            >
              その他の情報
            </Button>
            
          </ButtonGroup>
          
          
          
          
          {showForm === 'id' &&
            <div
              css={css`
                margin: 24px 0 0 0;
              `}
            >
              
              
              <p
                css={css`
                  margin: 0;
                `}
              >
                左側の選択フォームに関連しているハードを選んでください。該当するハードがない場合（スマホゲームなど）は最初に表示されている「ID」を選択してください。右側のフォームにはIDを入力します。
              </p>
              
              
              
              
              {/* ID 1 */}
              <div
                css={css`
                  display: flex;
                  flex-flow: row nowrap;
                  margin: 0;
                  // background-color: pink;
                `}
              >
                
                <FormControl
                  css={css`
                    && {
                      width: 100px;
                      margin: 24px 12px 0 0;
                    }
                  `}
                >
                  
                  <Select
                    _id="hardware1"
                    value={hardware1}
                    onChange={(eventObj) => handleEdit({
                      pathArr: [...this.pathArr, 'hardware1'],
                      value: eventObj.target.value
                    })}
                  >
                    <MenuItem value="none">ID</MenuItem>
                    <MenuItem value="Zd_Ia4Hwm">Nintendo Switch</MenuItem>
                    <MenuItem value="TdK3Oc-yV">PS4</MenuItem>
                    <MenuItem value="uPqoiXA_8">Xbox One</MenuItem>
                    <MenuItem value="GTxWVd0z-">Wii U</MenuItem>
                    <MenuItem value="YNZ6nb1Ki">PS3</MenuItem>
                    <MenuItem value="78lc0hPjL">Xbox</MenuItem>
                    <MenuItem value="qk9DiUwN-">3DS</MenuItem>
                    <MenuItem value="mOpBZsQBm">PS Vita</MenuItem>
                    <MenuItem value="efIOgWs3N">PSP</MenuItem>
                    <MenuItem value="P0UG-LHOQ">PC</MenuItem>
                    <MenuItem value="o-f3Zxd49">iOS</MenuItem>
                    <MenuItem value="SXybALV1f">Android</MenuItem>
                  </Select>
                  
                </FormControl>
                
                
                <div>
                  <TextField
                    css={css`
                      && {
                        margin: 8px 0 0 0;
                      }
                    `}
                    id="id1"
                    label="ID 1"
                    value={validationRecruitmentThreadsID1Obj.value}
                    onChange={(eventObj) => handleEdit({
                      pathArr: [...this.pathArr, 'id1'],
                      value: eventObj.target.value
                    })}
                    error={validationRecruitmentThreadsID1Obj.error}
                    helperText={intl.formatMessage({ id: validationRecruitmentThreadsID1Obj.messageID }, { numberOfCharacters: validationRecruitmentThreadsID1Obj.numberOfCharacters })}
                    margin="normal"
                    inputProps={{
                      maxLength: 100,
                    }}
                  />
                </div>
                
              </div>
              
              
              
              
              {/* ID 2 */}
              <div
                css={css`
                  display: flex;
                  flex-flow: row nowrap;
                  margin: 0;
                `}
              >
                
                <FormControl
                  css={css`
                    && {
                      width: 100px;
                      margin: 24px 12px 0 0;
                    }
                  `}
                >
                  
                  <Select
                    _id="hardware2"
                    value={hardware2}
                    onChange={(eventObj) => handleEdit({
                      pathArr: [...this.pathArr, 'hardware2'],
                      value: eventObj.target.value
                    })}
                  >
                    <MenuItem value="none">ID</MenuItem>
                    <MenuItem value="Zd_Ia4Hwm">Nintendo Switch</MenuItem>
                    <MenuItem value="TdK3Oc-yV">PS4</MenuItem>
                    <MenuItem value="uPqoiXA_8">Xbox One</MenuItem>
                    <MenuItem value="GTxWVd0z-">Wii U</MenuItem>
                    <MenuItem value="YNZ6nb1Ki">PS3</MenuItem>
                    <MenuItem value="78lc0hPjL">Xbox</MenuItem>
                    <MenuItem value="qk9DiUwN-">3DS</MenuItem>
                    <MenuItem value="mOpBZsQBm">PS Vita</MenuItem>
                    <MenuItem value="efIOgWs3N">PSP</MenuItem>
                    <MenuItem value="P0UG-LHOQ">PC</MenuItem>
                    <MenuItem value="o-f3Zxd49">iOS</MenuItem>
                    <MenuItem value="SXybALV1f">Android</MenuItem>
                  </Select>
                  
                </FormControl>
                
                
                <div>
                  <TextField
                    css={css`
                      && {
                        margin: 8px 0 0 0;
                      }
                    `}
                    id="id2"
                    label="ID 2"
                    value={validationRecruitmentThreadsID2Obj.value}
                    onChange={(eventObj) => handleEdit({
                      pathArr: [...this.pathArr, 'id2'],
                      value: eventObj.target.value
                    })}
                    error={validationRecruitmentThreadsID2Obj.error}
                    helperText={intl.formatMessage({ id: validationRecruitmentThreadsID2Obj.messageID }, { numberOfCharacters: validationRecruitmentThreadsID2Obj.numberOfCharacters })}
                    margin="normal"
                    inputProps={{
                      maxLength: 100,
                    }}
                  />
                </div>
                
              </div>
              
              
              
              
              {/* ID 3 */}
              <div
                css={css`
                  display: flex;
                  flex-flow: row nowrap;
                  width: 100%;
                  // background-color: pink;
                  margin: 0;
                `}
              >
                
                <FormControl
                  css={css`
                    && {
                      width: 100px;
                      margin: 24px 12px 0 0;
                    }
                  `}
                >
                  
                  <Select
                    _id="hardware3"
                    value={hardware3}
                    onChange={(eventObj) => handleEdit({
                      pathArr: [...this.pathArr, 'hardware3'],
                      value: eventObj.target.value
                    })}
                  >
                    <MenuItem value="none">ID</MenuItem>
                    <MenuItem value="Zd_Ia4Hwm">Nintendo Switch</MenuItem>
                    <MenuItem value="TdK3Oc-yV">PS4</MenuItem>
                    <MenuItem value="uPqoiXA_8">Xbox One</MenuItem>
                    <MenuItem value="GTxWVd0z-">Wii U</MenuItem>
                    <MenuItem value="YNZ6nb1Ki">PS3</MenuItem>
                    <MenuItem value="78lc0hPjL">Xbox</MenuItem>
                    <MenuItem value="qk9DiUwN-">3DS</MenuItem>
                    <MenuItem value="mOpBZsQBm">PS Vita</MenuItem>
                    <MenuItem value="efIOgWs3N">PSP</MenuItem>
                    <MenuItem value="P0UG-LHOQ">PC</MenuItem>
                    <MenuItem value="o-f3Zxd49">iOS</MenuItem>
                    <MenuItem value="SXybALV1f">Android</MenuItem>
                  </Select>
                  
                </FormControl>
                
                
                <div>
                  <TextField
                    css={css`
                      && {
                        margin: 8px 0 0 0;
                      }
                    `}
                    id="id3"
                    label="ID 3"
                    value={validationRecruitmentThreadsID3Obj.value}
                    onChange={(eventObj) => handleEdit({
                      pathArr: [...this.pathArr, 'id3'],
                      value: eventObj.target.value
                    })}
                    error={validationRecruitmentThreadsID3Obj.error}
                    helperText={intl.formatMessage({ id: validationRecruitmentThreadsID3Obj.messageID }, { numberOfCharacters: validationRecruitmentThreadsID3Obj.numberOfCharacters })}
                    margin="normal"
                    inputProps={{
                      maxLength: 100,
                    }}
                  />
                </div>
                
              </div>
              
            </div>
          }
          
          
          
          
          {showForm === 'information' &&
            <div
              css={css`
                margin: 24px 0 0 0;
              `}
            >
              
              
              <p
                css={css`
                  margin: 0 0 16px 0;
                `}
              >
                ID以外にも掲載したい情報がある場合はこちらに入力してください。
              </p>
              
              
              
              
              {/* Information 1 */}
              <div
                css={css`
                  display: flex;
                  flex-flow: row nowrap;
                `}
              >
                
                <div
                  css={css`
                    && {
                      margin: 0 12px 0 0;
                    }
                  `}
                >
                  <TextField
                    css={css`
                      && {
                        margin: 8px 0 0 0;
                      }
                    `}
                    id="informationTitle1"
                    label="タイトル 1"
                    value={validationRecruitmentThreadsInformationTitle1Obj.value}
                    onChange={(eventObj) => handleEdit({
                      pathArr: [...this.pathArr, 'informationTitle1'],
                      value: eventObj.target.value
                    })}
                    error={validationRecruitmentThreadsInformationTitle1Obj.error}
                    helperText={intl.formatMessage({ id: validationRecruitmentThreadsInformationTitle1Obj.messageID }, { numberOfCharacters: validationRecruitmentThreadsInformationTitle1Obj.numberOfCharacters })}
                    margin="normal"
                    inputProps={{
                      maxLength: 30,
                    }}
                  />
                </div>
                
                
                <div>
                  <TextField
                    css={css`
                      && {
                        margin: 8px 0 0 0;
                      }
                    `}
                    id="information1"
                    label="情報 1"
                    value={validationRecruitmentThreadsInformation1Obj.value}
                    onChange={(eventObj) => handleEdit({
                      pathArr: [...this.pathArr, 'information1'],
                      value: eventObj.target.value
                    })}
                    error={validationRecruitmentThreadsInformation1Obj.error}
                    helperText={intl.formatMessage({ id: validationRecruitmentThreadsInformation1Obj.messageID }, { numberOfCharacters: validationRecruitmentThreadsInformation1Obj.numberOfCharacters })}
                    margin="normal"
                    inputProps={{
                      maxLength: 100,
                    }}
                  />
                </div>
                
              </div>
              
              
              
              
              {/* Information 2 */}
              <div
                css={css`
                  display: flex;
                  flex-flow: row nowrap;
                `}
              >
                
                <div
                  css={css`
                    && {
                      margin: 0 12px 0 0;
                    }
                  `}
                >
                  <TextField
                    css={css`
                      && {
                        margin: 8px 0 0 0;
                      }
                    `}
                    id="informationTitle2"
                    label="タイトル 2"
                    value={validationRecruitmentThreadsInformationTitle2Obj.value}
                    onChange={(eventObj) => handleEdit({
                      pathArr: [...this.pathArr, 'informationTitle2'],
                      value: eventObj.target.value
                    })}
                    error={validationRecruitmentThreadsInformationTitle2Obj.error}
                    helperText={intl.formatMessage({ id: validationRecruitmentThreadsInformationTitle2Obj.messageID }, { numberOfCharacters: validationRecruitmentThreadsInformationTitle2Obj.numberOfCharacters })}
                    margin="normal"
                    inputProps={{
                      maxLength: 30,
                    }}
                  />
                </div>
                
                
                <div>
                  <TextField
                    css={css`
                      && {
                        margin: 8px 0 0 0;
                      }
                    `}
                    id="information2"
                    label="情報 2"
                    value={validationRecruitmentThreadsInformation2Obj.value}
                    onChange={(eventObj) => handleEdit({
                      pathArr: [...this.pathArr, 'information2'],
                      value: eventObj.target.value
                    })}
                    error={validationRecruitmentThreadsInformation2Obj.error}
                    helperText={intl.formatMessage({ id: validationRecruitmentThreadsInformation2Obj.messageID }, { numberOfCharacters: validationRecruitmentThreadsInformation2Obj.numberOfCharacters })}
                    margin="normal"
                    inputProps={{
                      maxLength: 100,
                    }}
                  />
                </div>
                
              </div>
              
              
              
              
              {/* Information 3 */}
              <div
                css={css`
                  display: flex;
                  flex-flow: row nowrap;
                `}
              >
                
                <div
                  css={css`
                    && {
                      margin: 0 12px 0 0;
                    }
                  `}
                >
                  <TextField
                    css={css`
                      && {
                        margin: 8px 0 0 0;
                      }
                    `}
                    id="informationTitle3"
                    label="タイトル 3"
                    value={validationRecruitmentThreadsInformationTitle3Obj.value}
                    onChange={(eventObj) => handleEdit({
                      pathArr: [...this.pathArr, 'informationTitle3'],
                      value: eventObj.target.value
                    })}
                    error={validationRecruitmentThreadsInformationTitle3Obj.error}
                    helperText={intl.formatMessage({ id: validationRecruitmentThreadsInformationTitle3Obj.messageID }, { numberOfCharacters: validationRecruitmentThreadsInformationTitle3Obj.numberOfCharacters })}
                    margin="normal"
                    inputProps={{
                      maxLength: 30,
                    }}
                  />
                </div>
                
                
                <div>
                  <TextField
                    css={css`
                      && {
                        margin: 8px 0 0 0;
                      }
                    `}
                    id="information3"
                    label="情報 3"
                    value={validationRecruitmentThreadsInformation3Obj.value}
                    onChange={(eventObj) => handleEdit({
                      pathArr: [...this.pathArr, 'information3'],
                      value: eventObj.target.value
                    })}
                    error={validationRecruitmentThreadsInformation3Obj.error}
                    helperText={intl.formatMessage({ id: validationRecruitmentThreadsInformation3Obj.messageID }, { numberOfCharacters: validationRecruitmentThreadsInformation3Obj.numberOfCharacters })}
                    margin="normal"
                    inputProps={{
                      maxLength: 100,
                    }}
                  />
                </div>
                
              </div>
              
              
              
              
              {/* Information 4 */}
              <div
                css={css`
                  display: flex;
                  flex-flow: row nowrap;
                `}
              >
                
                <div
                  css={css`
                    && {
                      margin: 0 12px 0 0;
                    }
                  `}
                >
                  <TextField
                    css={css`
                      && {
                        margin: 8px 0 0 0;
                      }
                    `}
                    id="informationTitle4"
                    label="タイトル 4"
                    value={validationRecruitmentThreadsInformationTitle4Obj.value}
                    onChange={(eventObj) => handleEdit({
                      pathArr: [...this.pathArr, 'informationTitle4'],
                      value: eventObj.target.value
                    })}
                    error={validationRecruitmentThreadsInformationTitle4Obj.error}
                    helperText={intl.formatMessage({ id: validationRecruitmentThreadsInformationTitle4Obj.messageID }, { numberOfCharacters: validationRecruitmentThreadsInformationTitle4Obj.numberOfCharacters })}
                    margin="normal"
                    inputProps={{
                      maxLength: 30,
                    }}
                  />
                </div>
                
                
                <div>
                  <TextField
                    css={css`
                      && {
                        margin: 8px 0 0 0;
                      }
                    `}
                    id="information4"
                    label="情報 4"
                    value={validationRecruitmentThreadsInformation4Obj.value}
                    onChange={(eventObj) => handleEdit({
                      pathArr: [...this.pathArr, 'information4'],
                      value: eventObj.target.value
                    })}
                    error={validationRecruitmentThreadsInformation4Obj.error}
                    helperText={intl.formatMessage({ id: validationRecruitmentThreadsInformation4Obj.messageID }, { numberOfCharacters: validationRecruitmentThreadsInformation4Obj.numberOfCharacters })}
                    margin="normal"
                    inputProps={{
                      maxLength: 100,
                    }}
                  />
                </div>
                
              </div>
              
              
              
              
              {/* Information 5 */}
              <div
                css={css`
                  display: flex;
                  flex-flow: row nowrap;
                `}
              >
                
                <div
                  css={css`
                    && {
                      margin: 0 12px 0 0;
                    }
                  `}
                >
                  <TextField
                    css={css`
                      && {
                        margin: 8px 0 0 0;
                      }
                    `}
                    id="informationTitle5"
                    label="タイトル 5"
                    value={validationRecruitmentThreadsInformationTitle5Obj.value}
                    onChange={(eventObj) => handleEdit({
                      pathArr: [...this.pathArr, 'informationTitle5'],
                      value: eventObj.target.value
                    })}
                    error={validationRecruitmentThreadsInformationTitle5Obj.error}
                    helperText={intl.formatMessage({ id: validationRecruitmentThreadsInformationTitle5Obj.messageID }, { numberOfCharacters: validationRecruitmentThreadsInformationTitle5Obj.numberOfCharacters })}
                    margin="normal"
                    inputProps={{
                      maxLength: 30,
                    }}
                  />
                </div>
                
                
                <div>
                  <TextField
                    css={css`
                      && {
                        margin: 8px 0 0 0;
                      }
                    `}
                    id="information5"
                    label="情報 5"
                    value={validationRecruitmentThreadsInformation5Obj.value}
                    onChange={(eventObj) => handleEdit({
                      pathArr: [...this.pathArr, 'information5'],
                      value: eventObj.target.value
                    })}
                    error={validationRecruitmentThreadsInformation5Obj.error}
                    helperText={intl.formatMessage({ id: validationRecruitmentThreadsInformation5Obj.messageID }, { numberOfCharacters: validationRecruitmentThreadsInformation5Obj.numberOfCharacters })}
                    margin="normal"
                    inputProps={{
                      maxLength: 100,
                    }}
                  />
                </div>
                
              </div>
              
              
            </div>
          }
          
          
        </div>
        
        
        
        
        
        
        {/* Buttons */}
        <div
          css={css`
            display: flex;
            flex-flow: row nowrap;
            margin: 36px 0 0 0;
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