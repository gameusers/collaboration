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
//   Validations
// ---------------------------------------------

const { validationIDsPlatform } = require('../../../@database/ids/validations/platform');
const { validationIDsLabel } = require('../../../@database/ids/validations/label');
const { validationIDsID } = require('../../../@database/ids/validations/id');
const { validationIDsPublicSetting } = require('../../../@database/ids/validations/public-setting');


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
//   Components
// ---------------------------------------------

import GameForm from '../../game/components/form';




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

// const cssBox = css`
//   display: flex;
//   flex-flow: row wrap;
//   margin: 4px 0 8px 0;
  
//   @media screen and (max-width: 480px) {
//     flex-flow: column wrap;
//   }
// `;

// const cssIDBox = css`
//   cursor: pointer;
// `;

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
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

// const Container = styled.div`
//   padding: 8px 14px 16px 14px;
// `;

// const Description = styled.p`
//   margin: 12px 0 0 0;
// `;

// const Heading = styled.div`
//   font-weight: bold;
//   margin: 24px 0 0 0;
// `;

// const PlatformBox = styled.div`
//   margin: 12px 0 0 0;
// `;

// const StyledTextFieldWide = styled(TextField)`
//   && {
//     width: 400px;
    
//     @media screen and (max-width: 480px) {
//       width: 100%;
//     }
//   }
// `;

// const SendButtonBox = styled.div`
//   margin: 24px 0 0 0;
// `;

// const SearchBox = styled.div`
//   margin: 24px 0 0 0;
// `;




// --------------------------------------------------
//   Class
// --------------------------------------------------

@withStyles(stylesObj)
@inject('stores', 'storeIDForm')
@observer
export default injectIntl(class extends React.Component {
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    super(props);
  }
  
  
  // --------------------------------------------------
  //   componentDidMount
  // --------------------------------------------------
  
  componentDidMount() {
    
    
    // --------------------------------------------------
    //   Button - Enable
    // --------------------------------------------------
    
    this.props.stores.layout.handleButtonEnable({ _id: `${this.props._id}-idFormRegisterSubmit` });
    
    
  }
  
  
  // --------------------------------------------------
  //   render
  // --------------------------------------------------
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { classes, stores, storeIDForm, intl, _id } = this.props;
    
    const { buttonDisabledObj } = stores.layout;
    
    const {
      
      dataObj,
      handleEdit,
      handleGame,
      handleGameDelete,
      handleRegisterSubmit
      
    } = storeIDForm;
    
    
    // --------------------------------------------------
    //   Button - Disable
    // --------------------------------------------------
    
    const buttonDisabled = lodashGet(buttonDisabledObj, [`${_id}-idFormRegisterSubmit`], true);
    
    
    
    
    // --------------------------------------------------
    //   プラットフォーム
    // --------------------------------------------------
    
    const platform = lodashGet(dataObj, [_id, 'platform'], '');
    const validationPlatformObj = validationIDsPlatform({ value: platform });
    
    
    // --------------------------------------------------
    //   ゲーム選択フォーム
    // --------------------------------------------------
    
    const gamesArr = lodashGet(dataObj, [_id, 'gamesArr'], []);
    
    // ゲーム選択フォームを表示するかどうか　配列内のプラットフォームの場合、表示しない
    const gameSelectForm = ['PlayStation', 'Xbox', 'Nintendo', 'Steam', 'Origin', 'Discord', 'Skype', 'ICQ', 'Line'].indexOf(validationPlatformObj.value) === -1;
    
    
    // --------------------------------------------------
    //   ラベル
    // --------------------------------------------------
    
    const label = lodashGet(dataObj, [_id, 'label'], '');
    const validationLabelObj = validationIDsLabel({ value: label });
    
    
    // --------------------------------------------------
    //   ID
    // --------------------------------------------------
    
    const id = lodashGet(dataObj, [_id, 'id'], '');
    const validationIDObj = validationIDsID({ value: id });
    
    
    // --------------------------------------------------
    //   公開設定
    // --------------------------------------------------
    
    const publicSetting = lodashGet(dataObj, [_id, 'publicSetting'], '');
    const validationPublicSettingObj = validationIDsPublicSetting({ value: publicSetting });
    
    
    // --------------------------------------------------
    //   検索可能
    // --------------------------------------------------
    
    const search = lodashGet(dataObj, [_id, 'search'], true);
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   platform: {green ${platform}}
    // `);
    
    // console.log(`\n---------- validationPlatformObj ----------\n`);
    // console.dir(JSON.parse(JSON.stringify(validationPlatformObj)));
    // console.log(`\n-----------------------------------\n`);
    
    // console.log(chalk`
    //   label: {green ${label}}
    // `);
    
    // console.log(`\n---------- validationLabelObj ----------\n`);
    // console.dir(JSON.parse(JSON.stringify(validationLabelObj)));
    // console.log(`\n-----------------------------------\n`);
    
    // console.log(chalk`
    //   id: {green ${id}}
    // `);
    
    // console.log(`\n---------- validationIDObj ----------\n`);
    // console.dir(JSON.parse(JSON.stringify(validationIDObj)));
    // console.log(`\n-----------------------------------\n`);
    
    // console.log(chalk`
    //   publicSetting: {green ${publicSetting}}
    // `);
    
    // console.log(`\n---------- validationPublicSettingObj ----------\n`);
    // console.dir(JSON.parse(JSON.stringify(validationPublicSettingObj)));
    // console.log(`\n-----------------------------------\n`);
    
    // console.log(chalk`
    //   search: {green ${search}}
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
              value={validationPlatformObj.value}
              onChange={(eventObj) => handleEdit({
                pathArr: [_id, 'platform'],
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
            _id={_id}
            gamesArr={gamesArr}
            func={handleGame}
            funcDelete={handleGameDelete}
          />
        }
        
        
        
        
        {/* ラベル */}
        <div>
          <TextField
            css={cssTextField}
            id="label"
            label="ラベル"
            value={validationLabelObj.value}
            onChange={(eventObj) => handleEdit({
              pathArr: [_id, 'label'],
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
            id="label"
            label="ID"
            value={validationIDObj.value}
            onChange={(eventObj) => handleEdit({
              pathArr: [_id, 'id'],
              value: eventObj.target.value
            })}
            error={validationIDObj.error}
            helperText={intl.formatMessage({ id: validationIDObj.messageID }, { numberOfCharacters: validationIDObj.numberOfCharacters })}
            margin="normal"
            inputProps={{
              maxLength: 128,
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
              value={validationPublicSettingObj.value}
              onChange={(eventObj) => handleEdit({
                pathArr: [_id, 'publicSetting'],
                value: eventObj.target.value
              })}
              inputProps={{
                name: 'publicSetting',
                id: 'publicSetting',
              }}
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
                  pathArr: [_id, 'search'],
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
              _id,
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