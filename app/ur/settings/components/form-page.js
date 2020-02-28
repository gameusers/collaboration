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
import TextField from '@material-ui/core/TextField';
// import InputLabel from '@material-ui/core/InputLabel';
// import FormControl from '@material-ui/core/FormControl';
// import MenuItem from '@material-ui/core/MenuItem';
// import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

// import IconExpandLess from '@material-ui/icons/ExpandLess';
// import IconExpandMore from '@material-ui/icons/ExpandMore';
// import IconPlayerID from '@material-ui/icons/Mood';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

import { validationUsersUserID } from '../../../../app/@database/users/validations/user-id';
import { validationUsersPagesName } from '../../../../app/@database/users/validations/pages';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import Panel from '../../../../app/common/layout/components/panel';
import ImageAndVideoForm from '../../../../app/common/image-and-video/components/form';




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores', 'storeUrSettings')
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
    
    const { stores, storeUrSettings, intl, pathArr } = this.props;
    
    const {
      
      dataObj,
      handleEdit,
      handleSubmitPages,
      
    } = storeUrSettings;
    
    
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = stores.layout.handleGetButtonDisabled({ pathArr });
    
    
    
    
    // --------------------------------------------------
    //   User ID
    // --------------------------------------------------
    
    const userID = lodashGet(dataObj, [...pathArr, 'userID'], '');
    const validationUsersUserIDObj = validationUsersUserID({ value: userID });
    
    
    // --------------------------------------------------
    //   Approval
    // --------------------------------------------------
    
    const approval = lodashGet(dataObj, [...pathArr, 'approval'], false);
    
    
    
    
    // --------------------------------------------------
    //   Component - Pages Array
    // --------------------------------------------------
    
    const pagesArr = lodashGet(dataObj, [...pathArr, 'pagesObj', 'arr'], []);
    
    // console.log(`
    //   ----- storeUrSettings -----\n
    //   ${util.inspect(storeUrSettings, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- dataObj -----\n
    //   ${util.inspect(dataObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- form-page / pagesArr -----\n
    //   ${util.inspect(pagesArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    const componentsArr = [];
    
    for (const [index, valueObj] of pagesArr.entries()) {
      
      
      // --------------------------------------------------
      //   Validation
      // --------------------------------------------------
      
      const name = lodashGet(valueObj, ['name'], '');
      const validationUsersPagesNameObj = validationUsersPagesName({ value: name });
      
      
      // --------------------------------------------------
      //   Component
      // --------------------------------------------------
      
      componentsArr.push(
        <div key={index}>
          
          
          {/*<FormControl
            css={css`
              margin: 8px 0 0 0 !important;
            `}
            // variant="outlined"
            disabled={buttonDisabled}
          >
            
            <InputLabel htmlFor="pageType">変更するページ</InputLabel>
            
            <Select
              css={css`
                width: 250px;
              `}
              value={valueObj.type}
              onChange={(eventObj) => handleEdit({
                pathArr: ['pagesArr', 0, 'type'],
                value: eventObj.target.value
              })}
              inputProps={{
                name: 'pageType',
                id: 'pageType',
              }}
            >
              <MenuItem value={'top'}>トップページ</MenuItem>
            </Select>
            
          </FormControl>*/}
          
          
          
          
          <div
            css={css`
              // margin: 8px 0 12px 0;
            `}
          >
            <TextField
              css={css`
                width: 400px;
                
                @media screen and (max-width: 480px) {
                  width: 100%;
                }
              `}
              id="name"
              label="タイトル"
              value={validationUsersPagesNameObj.value}
              onChange={(eventObj) => handleEdit({
                pathArr: [...pathArr, 'pagesObj', 'arr', 0, 'name'],
                value: eventObj.target.value
              })}
              error={validationUsersPagesNameObj.error}
              helperText={intl.formatMessage({ id: validationUsersPagesNameObj.messageID }, { numberOfCharacters: validationUsersPagesNameObj.numberOfCharacters })}
              disabled={buttonDisabled}
              margin="normal"
              inputProps={{
                maxLength: 100,
              }}
            />
          </div>
          
          
          
          
          {/*<FormControl disabled={buttonDisabled}>
            
            <InputLabel htmlFor="pageLanguage">タイトルの言語</InputLabel>
            
            <Select
              css={css`
                width: 250px;
              `}
              value={valueObj.language}
              onChange={(eventObj) => handleEdit({
                pathArr: ['pagesArr', 0, 'language'],
                value: eventObj.target.value
              })}
              inputProps={{
                name: 'pageLanguage',
                id: 'pageLanguage',
              }}
            >
              <MenuItem value={'ja'}>日本語</MenuItem>
            </Select>
            
          </FormControl>*/}
          
          
        </div>
      );
      
      
      // console.log(`
      //   ----- valueObj -----\n
      //   ${util.inspect(valueObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      // console.log(`
      //   ----- validationUsersPagesNameObj -----\n
      //   ${util.inspect(validationUsersPagesNameObj, { colors: true, depth: null })}\n
      //   --------------------\n
      // `);
      
      
    }
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   topPageName: {green ${topPageName}}
    // `);
    
    // console.log(`
    //   ----- topObj -----\n
    //   ${util.inspect(topObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Panel
        heading="ユーザーページ設定"
        pathArr={pathArr}
        defaultExpanded={false}
      >
        
        
        <p>
          ユーザーページの設定を行います。ユーザーページというのは、各ユーザーごとに用意される固有のページになります。URLやページのタイトルを変更することが可能です。
        </p>
        
        
        
        
        {/* フォーム */}
        <form>
          
          
          {/* Image Top */}
          <div
            css={css`
              border-top: 1px dashed #848484;
              margin: 24px 0 0 0;
              padding: 24px 0 0 0;
            `}
          >
            
            <h3
              css={css`
                font-weight: bold;
                margin: 0 0 6px 0;
              `}
            >
              トップ画像
            </h3>
            
            <p>
              ユーザーページのトップに表示される大きな画像です。横長の画像（推奨サイズ 1920 x ---）をアップロードしてください。
            </p>
            
            <ImageAndVideoForm
              pathArr={pathArr}
              type="user"
              showVideoButton={false}
              showImageCaption={false}
              limit={1}
            />
            
          </div>
          
          
          
          
          {/* URL */}
          <div
            css={css`
              border-top: 1px dashed #848484;
              margin: 36px 0 0 0;
              padding: 24px 0 0 0;
            `}
          >
            
            <h3
              css={css`
                font-weight: bold;
                margin: 0 0 6px 0;
              `}
            >
              URL変更
            </h3>
            
            <p
            >
              ユーザーページのURLを入力してください。次の形式のURLになります。https://gameusers.org/ur/<span css={css`color: red;`}>***</span>　赤文字部分の文字列を入力してください。
            </p>
            
            <p
              css={css`
                margin: 0 0 8px 0;
              `}
            >
              利用できる文字は半角英数字とハイフン( - )アンダースコア( _ )です。3文字以上、32文字以内。
            </p>
            
            
            <div>
              <TextField
                css={css`
                  width: 400px;
                  
                  @media screen and (max-width: 480px) {
                    width: 100%;
                  }
                `}
                id="userID"
                label="URL"
                value={validationUsersUserIDObj.value}
                onChange={(eventObj) => handleEdit({
                  pathArr: [...pathArr, 'userID'],
                  value: eventObj.target.value
                })}
                error={validationUsersUserIDObj.error}
                helperText={intl.formatMessage({ id: validationUsersUserIDObj.messageID }, { numberOfCharacters: validationUsersUserIDObj.numberOfCharacters })}
                disabled={buttonDisabled}
                margin="normal"
                inputProps={{
                  maxLength: 32,
                }}
              />
            </div>
            
          </div>
          
          
          
          
          {/* Title */}
          <div
            css={css`
              border-top: 1px dashed #848484;
              margin: 24px 0 0 0;
              padding: 24px 0 0 0;
            `}
          >
            
            <h3
              css={css`
                font-weight: bold;
                margin: 0 0 6px 0;
              `}
            >
              ページのタイトル変更
            </h3>
            
            
            <p
              css={css`
                margin: 0 0 12px 0;
              `}
            >
              ユーザーページのタイトルを変更できます。
            </p>
            
            
            {componentsArr}
            
          
          </div>
          
          
          
          
          {/* 参加条件 */}
          <div
            css={css`
              border-top: 1px dashed #848484;
              margin: 24px 0 0 0;
              padding: 24px 0 0 0;
            `}
          >
            
            <h3
              css={css`
                font-weight: bold;
                margin: 0 0 6px 0;
              `}
            >
              フォロー承認制
            </h3>
            
            <p
              css={css`
                margin: 0 0 12px 0;
              `}
            >
              以下をチェックすると、あなたをフォローするのにあなたの承認が必要になります。チェックを外すと誰でもフォローができるようになります。
            </p>
            
            <p
              css={css`
                margin: 0 0 12px 0;
              `}
            >
              現時点ではフォロー関連の機能はほとんどありません。唯一存在しているのが、自分をフォローした相手だけに登録したID（ゲームハードのIDなど）を閲覧させる機能です。将来的には作成したコンテンツ（日記など）を、フォローしてくれている相手、または相互フォローしている相手だけに、閲覧させる機能を実装する予定です。
            </p>
            
            
            <div>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={approval}
                    onChange={(eventObj) => handleEdit({
                      pathArr: [...pathArr, 'approval'],
                      value: eventObj.target.checked
                    })}
                  />
                }
                label="フォロー承認制にする"
              />
            </div>
            
          </div>
          
          
          
          
          {/* Submit Button */}
          <div
            css={css`
              display: flex;
              flex-flow: row wrap;
              border-top: 1px dashed #848484;
              margin: 24px 0 0 0;
              padding: 24px 0 0 0;
            `}
          >
            
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSubmitPages({ pathArr: this.pathArr })}
              disabled={buttonDisabled}
            >
              送信する
            </Button>
            
          </div>
          
          
        </form>
        
        
      </Panel>
    );
    
  }
  
});