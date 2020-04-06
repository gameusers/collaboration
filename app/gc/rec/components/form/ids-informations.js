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
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

import { validationRecruitmentThreadsID, validationRecruitmentThreadsInformationTitle, validationRecruitmentThreadsInformation } from '../../../../@database/recruitment-threads/validations/ids-informations';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import FormIDs from './ids';




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
    super(props);
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
      pathArr,
      gameCommunities_id,
      recruitmentThreads_id,
      
    } = this.props;
    
    
    
    
    // --------------------------------------------------
    //   Forum
    // --------------------------------------------------
    
    const {
      
      dataObj,
      handleEdit,
      
    } = storeGcRecruitment;
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const ids_idArr = lodashGet(dataObj, [...pathArr, 'ids_idArr'], []);
    
    const hardware1 = lodashGet(dataObj, [...pathArr, 'hardware1'], '');
    const hardware2 = lodashGet(dataObj, [...pathArr, 'hardware2'], '');
    const hardware3 = lodashGet(dataObj, [...pathArr, 'hardware3'], '');
    
    const id1 = lodashGet(dataObj, [...pathArr, 'id1'], '');
    const id2 = lodashGet(dataObj, [...pathArr, 'id2'], '');
    const id3 = lodashGet(dataObj, [...pathArr, 'id3'], '');
    
    const informationTitle1 = lodashGet(dataObj, [...pathArr, 'informationTitle1'], '');
    const informationTitle2 = lodashGet(dataObj, [...pathArr, 'informationTitle2'], '');
    const informationTitle3 = lodashGet(dataObj, [...pathArr, 'informationTitle3'], '');
    const informationTitle4 = lodashGet(dataObj, [...pathArr, 'informationTitle4'], '');
    const informationTitle5 = lodashGet(dataObj, [...pathArr, 'informationTitle5'], '');
    
    const information1 = lodashGet(dataObj, [...pathArr, 'information1'], '');
    const information2 = lodashGet(dataObj, [...pathArr, 'information2'], '');
    const information3 = lodashGet(dataObj, [...pathArr, 'information3'], '');
    const information4 = lodashGet(dataObj, [...pathArr, 'information4'], '');
    const information5 = lodashGet(dataObj, [...pathArr, 'information5'], '');
    
    
    // --------------------------------------------------
    //   Validations
    // --------------------------------------------------
    
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
    //   ID & Other Information のどちらを表示するか決める変数
    // --------------------------------------------------
    
    const showForm = lodashGet(dataObj, [...pathArr, 'showForm'], 'id');
    
    
    // --------------------------------------------------
    //   公開設定
    // --------------------------------------------------
    
    const openType = lodashGet(dataObj, [...pathArr, 'openType'], 1);
    
    
    // --------------------------------------------------
    //   login
    // --------------------------------------------------
    
    const login = stores.data.getLogin();
    
    
    
    
    // --------------------------------------------------
    //   Component - 公開設定
    // --------------------------------------------------
    
    let componentsOpenTypeSelectMenuItemsArr = [<MenuItem value={1} key="openTypeSelectMenuItems1">誰にでも公開</MenuItem>];
    
    if (login) {
      
      componentsOpenTypeSelectMenuItemsArr = [
        <MenuItem value={1} key="openTypeSelectMenuItems1">誰にでも公開</MenuItem>,
        <MenuItem value={2} key="openTypeSelectMenuItems2">返信者に公開（全員）</MenuItem>,
        <MenuItem value={3} key="openTypeSelectMenuItems3">返信者に公開（選択）</MenuItem>
      ];
      
    }
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/gc/rec/components/form/ids-informations.js
    // `);
    
    // console.log(chalk`
    //   recruitmentThreads_id: {green ${recruitmentThreads_id}}
    //   showForm: {green ${showForm}}
    // `);
    
    // console.log(`
    //   ----- pathArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- ids_idArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(ids_idArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        
          
        <h3
          css={css`
            font-weight: bold;
            margin: 0 0 2px 0;
          `}
        >
          ID・情報 （未記入でもOK）
        </h3>
        
        <p
          css={css`
            margin: 0 0 24px 0;
          `}
        >
          募集に必要なID・情報を掲載できます。募集の期限を設定した場合、期限が来るとこちらで入力したID・情報は自動的に非表示になります。
        </p>
        
        
        
        
        {/* Button */}
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          
          <Button
            onClick={(eventObj) => handleEdit({
              pathArr: [...pathArr, 'showForm'],
              value: 'id',
            })}
          >
            ID
          </Button>
          
          <Button
            onClick={(eventObj) => handleEdit({
              pathArr: [...pathArr, 'showForm'],
              value: 'information',
            })}
          >
            情報
          </Button>
          
        </ButtonGroup>
        
        
        
        
        {(showForm === 'id' && login) &&
          <FormIDs
            type="recruitmentForm"
            _id={recruitmentThreads_id || gameCommunities_id}
            ids_idArr={ids_idArr}
          />
        }
        
        
        
        {(showForm === 'id' && !login) &&
          <div
            css={css`
              margin: 24px 0 0 0;
            `}
          >
            
            
            <p>
              左側の選択フォームで入力するIDに関連しているハードを選んでください。該当するハードがない場合は最初に表示されている「ID」を選択してください。右側のフォームにはIDを入力します。
            </p>
            
            
            
            
            {/* ID 1 */}
            <div
              css={css`
                display: flex;
                flex-flow: row nowrap;
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
                    pathArr: [...pathArr, 'hardware1'],
                    value: eventObj.target.value
                  })}
                  displayEmpty
                >
                  <MenuItem value="">ID</MenuItem>
                  <MenuItem value="Zd_Ia4Hwm">Nintendo Switch</MenuItem>
                  <MenuItem value="TdK3Oc-yV">PS4</MenuItem>
                  <MenuItem value="uPqoiXA_8">Xbox One</MenuItem>
                  <MenuItem value="GTxWVd0z-">Wii U</MenuItem>
                  <MenuItem value="YNZ6nb1Ki">PS3</MenuItem>
                  <MenuItem value="08Qp5KxPA">Xbox 360</MenuItem>
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
                    pathArr: [...pathArr, 'id1'],
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
                    pathArr: [...pathArr, 'hardware2'],
                    value: eventObj.target.value
                  })}
                  displayEmpty
                >
                  <MenuItem value="">ID</MenuItem>
                  <MenuItem value="Zd_Ia4Hwm">Nintendo Switch</MenuItem>
                  <MenuItem value="TdK3Oc-yV">PS4</MenuItem>
                  <MenuItem value="uPqoiXA_8">Xbox One</MenuItem>
                  <MenuItem value="GTxWVd0z-">Wii U</MenuItem>
                  <MenuItem value="YNZ6nb1Ki">PS3</MenuItem>
                  <MenuItem value="08Qp5KxPA">Xbox 360</MenuItem>
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
                    pathArr: [...pathArr, 'id2'],
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
                    pathArr: [...pathArr, 'hardware3'],
                    value: eventObj.target.value
                  })}
                  displayEmpty
                >
                  <MenuItem value="">ID</MenuItem>
                  <MenuItem value="Zd_Ia4Hwm">Nintendo Switch</MenuItem>
                  <MenuItem value="TdK3Oc-yV">PS4</MenuItem>
                  <MenuItem value="uPqoiXA_8">Xbox One</MenuItem>
                  <MenuItem value="GTxWVd0z-">Wii U</MenuItem>
                  <MenuItem value="YNZ6nb1Ki">PS3</MenuItem>
                  <MenuItem value="08Qp5KxPA">Xbox 360</MenuItem>
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
                    pathArr: [...pathArr, 'id3'],
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
                margin: 0 0 8px 0;
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
                  margin: 0 12px 0 0;
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
                    pathArr: [...pathArr, 'informationTitle1'],
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
                    pathArr: [...pathArr, 'information1'],
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
                  margin: 0 12px 0 0;
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
                    pathArr: [...pathArr, 'informationTitle2'],
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
                    pathArr: [...pathArr, 'information2'],
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
                  margin: 0 12px 0 0;
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
                    pathArr: [...pathArr, 'informationTitle3'],
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
                    pathArr: [...pathArr, 'information3'],
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
                  margin: 0 12px 0 0;
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
                    pathArr: [...pathArr, 'informationTitle4'],
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
                    pathArr: [...pathArr, 'information4'],
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
                  margin: 0 12px 0 0;
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
                    pathArr: [...pathArr, 'informationTitle5'],
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
                    pathArr: [...pathArr, 'information5'],
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
        
        
        
        
        {/* 公開設定 */}
        <FormControl
          css={css`
            && {
              margin: 42px 0 16px 0;
            }
          `}
          variant="outlined"
        >
          
          <InputLabel id="openTypeLabel">ID・情報の公開設定</InputLabel>
          
          <Select
            css={css`
              && {
                width: 240px;
              }
            `}
            labelId="openTypeLabel"
            _id="openType"
            label="ID・情報の公開設定"
            value={openType}
            onChange={(eventObj) => handleEdit({
              pathArr: [...pathArr, 'openType'],
              value: eventObj.target.value
            })}
          >
            {componentsOpenTypeSelectMenuItemsArr}
          </Select>
          
        </FormControl>
        
        
        {openType === 1 ? (
          
          <p>
            このページにアクセスした人なら誰でもID・情報を見ることができます。
          </p>
          
        ) : openType === 2 ? (
          
          <p>
            ログインして返信したユーザー全員にID・情報を公開します。
          </p>
          
        ) : (
          
          <p>
            ログインして返信したユーザーの中からID・情報を公開する相手を選べます。
          </p>
          
        )}
        
        
      </React.Fragment>
    );
    
  }
  
});