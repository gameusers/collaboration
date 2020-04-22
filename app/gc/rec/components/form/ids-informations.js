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

/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import lodashGet from 'lodash/get';


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
      type,
      pathArr,
      gameCommunities_id,
      recruitmentThreads_id,
      recruitmentComments_id,
      publicSettingThread,
      
    } = this.props;
    
    
    const {
      
      dataObj,
      handleEdit,
      
    } = storeGcRecruitment;
    
    
    
    
    // --------------------------------------------------
    //   Property
    // --------------------------------------------------
    
    const idsArr = lodashGet(dataObj, [...pathArr, 'idsArr'], []);
    
    const platform1 = lodashGet(dataObj, [...pathArr, 'platform1'], 'Other');
    const platform2 = lodashGet(dataObj, [...pathArr, 'platform2'], 'Other');
    const platform3 = lodashGet(dataObj, [...pathArr, 'platform3'], 'Other');
    
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
    
    const publicSetting = lodashGet(dataObj, [...pathArr, 'publicSetting'], 1);
    
    
    // --------------------------------------------------
    //   login
    // --------------------------------------------------
    
    const login = stores.data.getLogin();
    
    
    
    
    
    
    // --------------------------------------------------
    //   Component - ID
    // --------------------------------------------------
    
    const componentsIDsArr = [];
    
    
    for (let i = 1; i <= 3; i++) {
      
      
      let platform = '';
      let validationObj = {};
      
      if (i === 1) {
        
        platform = platform1;
        validationObj = validationRecruitmentThreadsID1Obj;
        
      } else if (i === 2) {
        
        platform = platform2;
        validationObj = validationRecruitmentThreadsID2Obj;
        
      } else if (i === 3) {
        
        platform = platform3;
        validationObj = validationRecruitmentThreadsID3Obj;
        
      }
      
      
      componentsIDsArr.push(
        <div
          css={css`
            display: flex;
            flex-flow: row nowrap;
            padding: 0 0 0 16px;
            
            @media screen and (max-width: 480px) {
              flex-flow: column wrap;
              border-left: 4px solid #01DFA5;
              margin: 24px 0 0 0;
            }
          `}
          key={`ids-${i}`}
        >
          
            
          <div
            css={css`
              width: 100px;
              margin: 24px 24px 0 0;
              
              @media screen and (max-width: 480px) {
                margin: 0;
              }
            `}
          >
            
            <Select
              _id={`platform${i}`}
              value={platform}
              onChange={(eventObj) => handleEdit({
                pathArr: [...pathArr, `platform${i}`],
                value: eventObj.target.value
              })}
              displayEmpty
            >
              <MenuItem value={'Other'}>ID</MenuItem>
              <MenuItem value={'PlayStation'}>PlayStation</MenuItem>
              <MenuItem value={'Xbox'}>Xbox</MenuItem>
              <MenuItem value={'Nintendo'}>Nintendo</MenuItem>
              <MenuItem value={'PC'}>PC</MenuItem>
              <MenuItem value={'Android'}>Android</MenuItem>
              <MenuItem value={'iOS'}>iOS</MenuItem>
              <MenuItem value={'Steam'}>Steam</MenuItem>
              <MenuItem value={'Origin'}>Origin</MenuItem>
              <MenuItem value={'Discord'}>Discord</MenuItem>
              <MenuItem value={'Skype'}>Skype</MenuItem>
              <MenuItem value={'ICQ'}>ICQ</MenuItem>
              <MenuItem value={'Line'}>Line</MenuItem>
            </Select>
            
          </div>
          
          
          
          
          <div
            css={css`
              @media screen and (max-width: 480px) {
                margin: 8px 0 0 0;
              }
            `}
          >
            
            <TextField
              css={css`
                && {
                  margin: 8px 0 0 0;
                }
              `}
              id={`id${i}`}
              label={`ID ${i}`}
              value={validationObj.value}
              onChange={(eventObj) => handleEdit({
                pathArr: [...pathArr, `id${i}`],
                value: eventObj.target.value
              })}
              error={validationObj.error}
              helperText={intl.formatMessage({ id: validationObj.messageID }, { numberOfCharacters: validationObj.numberOfCharacters })}
              margin="normal"
              inputProps={{
                maxLength: 100,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            
          </div>
          
          
        </div>
      );
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Component - Information
    // --------------------------------------------------
    
    const componentsInformationsArr = [];
    
    
    for (let i = 1; i <= 5; i++) {
      
      
      let validationInformationTitleObj = {};
      let validationInformationObj = {};
      
      if (i === 1) {
        
        validationInformationTitleObj = validationRecruitmentThreadsInformationTitle1Obj;
        validationInformationObj = validationRecruitmentThreadsInformation1Obj;
        
      } else if (i === 2) {
        
        validationInformationTitleObj = validationRecruitmentThreadsInformationTitle2Obj;
        validationInformationObj = validationRecruitmentThreadsInformation2Obj;
        
      } else if (i === 3) {
        
        validationInformationTitleObj = validationRecruitmentThreadsInformationTitle3Obj;
        validationInformationObj = validationRecruitmentThreadsInformation3Obj;
        
      } else if (i === 4) {
        
        validationInformationTitleObj = validationRecruitmentThreadsInformationTitle4Obj;
        validationInformationObj = validationRecruitmentThreadsInformation4Obj;
        
      } else if (i === 5) {
        
        validationInformationTitleObj = validationRecruitmentThreadsInformationTitle5Obj;
        validationInformationObj = validationRecruitmentThreadsInformation5Obj;
        
      }
      
      
      componentsInformationsArr.push(
        <div
          css={css`
            display: flex;
            flex-flow: row nowrap;
            margin: 8px 0 0 0;
            padding: 0 0 0 16px;
            
            @media screen and (max-width: 480px) {
              flex-flow: column wrap;
              border-left: 4px solid #01DFA5;
              margin: 24px 0 0 0;
            }
          `}
          key={`informations-${i}`}
        >
          
          
          <div
            css={css`
              margin: 0 16px 0 0;
              
              @media screen and (max-width: 480px) {
                margin: 0;
              }
            `}
          >
            
            <TextField
              css={css`
                && {
                  margin: 8px 0 0 0;
                }
              `}
              id={`informationTitle${i}`}
              label={`タイトル ${i}`}
              value={validationInformationTitleObj.value}
              onChange={(eventObj) => handleEdit({
                pathArr: [...pathArr, `informationTitle${i}`],
                value: eventObj.target.value
              })}
              error={validationInformationTitleObj.error}
              helperText={intl.formatMessage({ id: validationInformationTitleObj.messageID }, { numberOfCharacters: validationInformationTitleObj.numberOfCharacters })}
              margin="normal"
              inputProps={{
                maxLength: 30,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            
          </div>
          
          
          
          
          <div
            css={css`
              @media screen and (max-width: 480px) {
                margin: 8px 0 0 0;
              }
            `}
          >
          
            <TextField
              css={css`
                && {
                  margin: 8px 0 0 0;
                }
              `}
              id={`information${i}`}
              label={`情報 ${i}`}
              value={validationInformationObj.value}
              onChange={(eventObj) => handleEdit({
                pathArr: [...pathArr, `information${i}`],
                value: eventObj.target.value
              })}
              error={validationInformationObj.error}
              helperText={intl.formatMessage({ id: validationInformationObj.messageID }, { numberOfCharacters: validationInformationObj.numberOfCharacters })}
              margin="normal"
              inputProps={{
                maxLength: 50,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            
          </div>
          
          
        </div>
      );
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Component - 公開設定
    // --------------------------------------------------
    
    let componentsPublicSettingSelectMenuItemsArr = [<MenuItem value={1} key="publicSettingSelectMenuItems1">誰にでも公開</MenuItem>];
    
    if (login) {
      
      if (type === 'thread') {
        
        componentsPublicSettingSelectMenuItemsArr = [
          <MenuItem value={1} key="publicSettingSelectMenuItems1">誰にでも公開</MenuItem>,
          <MenuItem value={2} key="publicSettingSelectMenuItems2">コメントした方に公開（全員）</MenuItem>,
          <MenuItem value={3} key="publicSettingSelectMenuItems3">コメントした方に公開（選択）</MenuItem>
        ];
        
      } else if (type === 'comment') {
        
        componentsPublicSettingSelectMenuItemsArr = [
          <MenuItem value={1} key="publicSettingSelectMenuItems1">誰にでも公開</MenuItem>,
          <MenuItem value={2} key="publicSettingSelectMenuItems2">募集者だけに公開</MenuItem>,
        ];
        
        if (publicSettingThread === 3) {
          componentsPublicSettingSelectMenuItemsArr.push(<MenuItem value={3} key="publicSettingSelectMenuItems3">募集者が自分に公開した場合</MenuItem>);
        }
        
      }
      
    }
    
    
    // --------------------------------------------------
    //   Component - 公開設定の解説
    // --------------------------------------------------
    
    let componentPublicSettingExplanation = '';
    
    
    // --------------------------------------------------
    //   - 募集フォーム
    // --------------------------------------------------
    
    if (type === 'thread') {
      
      if (publicSetting === 1) {
        
        componentPublicSettingExplanation = <p>このページにアクセスした人なら誰でもID・情報を見ることができます。</p>;
        
      } else if (publicSetting === 2) {
        
        componentPublicSettingExplanation = <p>ログインしてコメントしたユーザー全員にID・情報を公開します。</p>;
        
      } else if (publicSetting === 3) {
        
        componentPublicSettingExplanation = <p>ログインして返信したユーザーの中からID・情報を公開する相手を選べます。</p>;
        
      }
      
      
    // --------------------------------------------------
    //   - コメントフォーム
    // --------------------------------------------------
      
    } else if (type === 'comment') {
      
      if (publicSetting === 1) {
        
        componentPublicSettingExplanation = <p>このページにアクセスした人なら誰でもID・情報を見ることができます。</p>;
        
      } else if (publicSetting === 2) {
        
        componentPublicSettingExplanation = <p>募集者だけにID・情報を公開します。</p>;
        
      } else if (publicSetting === 3) {
        
        componentPublicSettingExplanation = <p>募集者が自分に対してID・情報を公開した場合、募集者だけに自分のID・情報を公開します。お互いが公開した場合だけ、相互に閲覧できるようになる設定です。</p>;
        
      }
      
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
    //   publicSettingThread: {green ${publicSettingThread}}
    // `);
    
    // console.log(`
    //   ----- pathArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(pathArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- ids_idsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(ids_idsArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- idsArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(idsArr)), { colors: true, depth: null })}\n
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
          ゲームやメッセージアプリのID・情報を掲載できます。募集に期限が設定されている場合、期限が来るとこちらで入力したID・情報は自動的に非表示になります。
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
            type="recruitment"
            _id={recruitmentComments_id || recruitmentThreads_id || gameCommunities_id}
            idsArr={idsArr}
            forUpdateOtherStorePathArr={pathArr}
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
            
            
            <div
              css={css`
                margin: 16px 0 0 0;
              `}
            >
              {componentsIDsArr}
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
            
            
            <div
              css={css`
                margin: 16px 0 0 0;
              `}
            >
              {componentsInformationsArr}
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
          
          <InputLabel id="publicSettingLabel">ID・情報の公開設定</InputLabel>
          
          <Select
            css={css`
              && {
                width: 280px;
              }
            `}
            labelId="publicSettingLabel"
            _id="publicSetting"
            label="ID・情報の公開設定"
            value={publicSetting}
            onChange={(eventObj) => handleEdit({
              pathArr: [...pathArr, 'publicSetting'],
              value: eventObj.target.value
            })}
          >
            {componentsPublicSettingSelectMenuItemsArr}
          </Select>
          
        </FormControl>
        
        
        {/* 公開設定の解説 */}
        {componentPublicSettingExplanation}
        
        
      </React.Fragment>
    );
    
  }
  
});