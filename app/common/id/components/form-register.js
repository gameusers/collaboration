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

import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

import { validationIDsPlatform } from 'app/@database/ids/validations/platform.js';
import { validationIDsLabel } from 'app/@database/ids/validations/label.js';
import { validationIDsID } from 'app/@database/ids/validations/id.js';
import { validationIDsPublicSetting } from 'app/@database/ids/validations/public-setting.js';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import GameForm from 'app/common/game/components/form.js';




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
//   Emotion
//   https://emotion.sh/docs/composition
// --------------------------------------------------

const cssHeading = css`
  font-weight: bold;
  margin: 24px 0 0 0;
`;

const cssPlatformBox = css`
  margin: 12px 0 0 0;
`;

const cssTextField = css`
  && {
    width: 400px;
    
    @media screen and (max-width: 480px) {
      width: 100%;
    }
  }
`;






// --------------------------------------------------
//   Class
// --------------------------------------------------

@withStyles(stylesObj)
@inject('stores', 'storeIDForm', 'storeGameForm')
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
    
    // console.log(`
    //   ----- props.pathArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(props.pathArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // --------------------------------------------------
    //   Path Array
    //   Edit と Register で同じフォームを利用しているのでパスを変える必要がある
    // --------------------------------------------------
    
    // this.pathArr = ['Jk92aglWl', 'aaa', 'register'];
    this.selectAndEditPathArr = props.pathArr;
    this.pathArr = [props.pathArr.join('-'), 'register'];
    
    
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
      
      classes,
      stores,
      storeIDForm,
      storeGameForm,
      intl,
      additionalGameLimit
      
    } = this.props;
    
    
    const {
      
      dataObj,
      handleEdit,
      handleRegisterSubmit,
      
    } = storeIDForm;
    
    
    const {
      
      handleGetGamesArr
      
    } = storeGameForm;
    
    
    
    
    // --------------------------------------------------
    //   Button - Disable
    // --------------------------------------------------
    
    const buttonDisabled = stores.layout.handleGetButtonDisabled({ pathArr: this.pathArr });
    
    // console.log(`
    //   ----- this.pathArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(this.pathArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   buttonDisabled: {green ${buttonDisabled}}
    // `);
    
    
    // --------------------------------------------------
    //   プラットフォーム
    // --------------------------------------------------
    
    const platform = lodashGet(dataObj, [...this.pathArr, 'platform'], '');
    const validationPlatformObj = validationIDsPlatform({ value: platform });
    
    
    // --------------------------------------------------
    //   ゲーム選択フォーム
    // --------------------------------------------------
    
    // ゲーム選択フォームを表示するかどうか　配列内のプラットフォームの場合、表示しない
    const gameSelectForm = ['PlayStation', 'Xbox', 'Nintendo', 'Steam', 'Origin', 'Discord', 'Skype', 'ICQ', 'Line'].indexOf(validationPlatformObj.value) === -1;
    
    const gamesArr = handleGetGamesArr({ pathArr: this.pathArr });
    
    
    
    
    // --------------------------------------------------
    //   ラベル
    // --------------------------------------------------
    
    const label = lodashGet(dataObj, [...this.pathArr, 'label'], '');
    const validationLabelObj = validationIDsLabel({ value: label });
    
    
    // --------------------------------------------------
    //   ID
    // --------------------------------------------------
    
    const id = lodashGet(dataObj, [...this.pathArr, 'id'], '');
    const validationIDObj = validationIDsID({ value: id });
    
    
    // --------------------------------------------------
    //   公開設定
    // --------------------------------------------------
    
    const publicSetting = lodashGet(dataObj, [...this.pathArr, 'publicSetting'], '');
    const validationPublicSettingObj = validationIDsPublicSetting({ value: publicSetting });
    
    
    // --------------------------------------------------
    //   検索可能
    // --------------------------------------------------
    
    const search = lodashGet(dataObj, [...this.pathArr, 'search'], true);
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----------------------------------------\n
    //   /app/common/id/components/form-register.js
    // `);
    
    // console.log(`
    //   ----- this.pathArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(this.pathArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- gamesArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(gamesArr)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   _id: {green ${_id}}
    //   platform: {green ${platform}}
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <div
        css={css`
          padding: 8px 14px 16px 14px;
        `}
      >
        
        
        <p
          css={css`
            margin: 12px 0 0 0;
          `}
        >
          IDを登録する場合は、こちらのフォームに必要なデータを入力してから「登録する」ボタンを押してください。<br /><br />
          
          IDは「<strong>ラベル:</strong> ID」という並びで表示されます。ラベルが未入力の場合は、プラットフォームや選択したゲームの名前が代わりに表示されます。
        </p>
        
        
        
        
        {/* 登録フォーム */}
        <h4 css={cssHeading}>[ 登録フォーム ]</h4>
        
        
        {/* プラットフォーム */}
        <div css={cssPlatformBox}>
          
          <FormControl
            style={{ minWidth: 300 }}
            error={validationPlatformObj.error}
          >
            
            <InputLabel htmlFor="platform">プラットフォーム</InputLabel>
            
            <Select
              id="platform"
              value={platform}
              onChange={(eventObj) => handleEdit({
                pathArr: [...this.pathArr, 'platform'],
                value: eventObj.target.value
              })}
            >
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
              <MenuItem value={'Other'}>その他</MenuItem>
            </Select>
            
            <FormHelperText>{intl.formatMessage({ id: validationPlatformObj.messageID })}</FormHelperText>
            
          </FormControl>
          
        </div>
        
        
        
        
        {/* ゲーム選択 */}
        {gameSelectForm &&
          <GameForm
            pathArr={this.pathArr}
            gamesArr={gamesArr}
            additionalGameLimit={additionalGameLimit}
          />
        }
        
        
        
        
        {/* ラベル */}
        <div>
          <TextField
            css={cssTextField}
            id="label"
            label="ラベル"
            value={label}
            onChange={(eventObj) => handleEdit({
              pathArr: [...this.pathArr, 'label'],
              value: eventObj.target.value
            })}
            error={validationLabelObj.error}
            helperText={intl.formatMessage({ id: validationLabelObj.messageID }, { numberOfCharacters: validationLabelObj.numberOfCharacters })}
            margin="normal"
            inputProps={{
              maxLength: 30,
            }}
          />
        </div>
        
        
        
        
        {/* ID */}
        <div>
          <TextField
            css={cssTextField}
            id="id"
            label="ID"
            value={id}
            onChange={(eventObj) => handleEdit({
              pathArr: [...this.pathArr, 'id'],
              value: eventObj.target.value
            })}
            error={validationIDObj.error}
            helperText={intl.formatMessage({ id: validationIDObj.messageID }, { numberOfCharacters: validationIDObj.numberOfCharacters })}
            margin="normal"
            inputProps={{
              maxLength: 100,
            }}
          />
        </div>
        
        
        
        
        {/* 公開設定 */}
        <div css={cssPlatformBox}>
          
          <FormControl
            style={{ minWidth: 300 }}
            error={validationPublicSettingObj.error}
          >
            
            <InputLabel htmlFor="publicSetting">IDの公開設定</InputLabel>
            
            <Select
              id="publicSetting"
              value={publicSetting}
              onChange={(eventObj) => handleEdit({
                pathArr: [...this.pathArr, 'publicSetting'],
                value: eventObj.target.value
              })}
            >
              <MenuItem value={1}>誰にでも公開</MenuItem>
              <MenuItem value={2}>自分をフォローしているユーザーに公開</MenuItem>
              <MenuItem value={3}>自分がフォローしているユーザーに公開</MenuItem>
              <MenuItem value={4}>相互フォローで公開</MenuItem>
              <MenuItem value={5}>自分以外には公開しない</MenuItem>
            </Select>
            
            <FormHelperText>{intl.formatMessage({ id: validationPublicSettingObj.messageID })}</FormHelperText>
            
          </FormControl>
          
        </div>
        
        
        
        
        {/* 検索可能 */}
        <div
          css={css`
            margin: 24px 0 0 0;
          `}
        >
          <FormControlLabel
            classes={{
              label: classes.label
            }}
            control={
              <Checkbox
                checked={search}
                onChange={(eventObj) => handleEdit({
                  pathArr: [...this.pathArr, 'search'],
                  value: eventObj.target.checked
                })}
              />
            }
            label="このIDを検索可能にする"
          />
        </div>
        
        
        
        
        {/* 「登録する」ボタン */}
        <div
          css={css`
            margin: 24px 0 0 0;
          `}
        >
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleRegisterSubmit({
              pathArr: this.pathArr,
              selectAndEditPathArr: this.selectAndEditPathArr,
            })}
            disabled={buttonDisabled}
          >
            登録する
          </Button>
        </div>
        
        
      </div>
    );
    
  }
  
});