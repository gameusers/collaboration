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


// ---------------------------------------------
//   Lodash
// ---------------------------------------------

import lodashGet from 'lodash/get';


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

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


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

import IDChip from 'app/common/id/components/chip.js';
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

const cssBox = css`
  display: flex;
  flex-flow: row wrap;
  margin: 4px 0 8px 0;
  
  @media screen and (max-width: 480px) {
    flex-flow: column wrap;
  }
`;

const cssIDBox = css`
  cursor: pointer;
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
      pathArr,
      // type,
      // _id,
      handleSetIDsArr,
      idsArr,
      additionalGameLimit,
      // forUpdateOtherStorePathArr,
      
    } = this.props;
    
    
    const {
      
      dataObj,
      handleEdit,
      handleChangeEditID,
      handleDeleteDialogOpen,
      handleDeleteDialogClose,
      handleEditSubmit,
      handleDeleteSubmit,
      
    } = storeIDForm;
    
    
    const {
      
      handleGetGamesArr
      
    } = storeGameForm;
    
    
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = stores.layout.handleGetButtonDisabled({ pathArr });
    
    
    
    
    // --------------------------------------------------
    //   Component - 編集可能なID
    // --------------------------------------------------
    
    const componentsIDArr = [];
    const dataArr = lodashGet(dataObj, [...pathArr, 'dataArr'], []);
    
    for (const [index, valueObj] of dataArr.entries()) {
      
      const games_id = lodashGet(valueObj, ['gamesObj', '_id'], '');
      const gamesName = lodashGet(valueObj, ['gamesObj', 'name'], '');
      const gamesImagesAndVideosThumbnailObj = lodashGet(valueObj, ['gamesObj', 'imagesAndVideosThumbnailObj'], {});
      
      componentsIDArr.push(
        <div
          css={cssIDBox}
          key={index}
          onClick={() => handleChangeEditID({ pathArr, ids_id: valueObj._id })}
        >
          <IDChip
            platform={valueObj.platform}
            label={valueObj.label}
            id={valueObj.id}
            games_id={games_id}
            gamesName={gamesName}
            gamesImagesAndVideosThumbnailObj={gamesImagesAndVideosThumbnailObj}
          />
        </div>
      );
      
    }
    
    
    
    
    // --------------------------------------------------
    //   プラットフォーム
    // --------------------------------------------------
    
    const platform = lodashGet(dataObj, [...pathArr, 'platform'], '');
    const validationPlatformObj = validationIDsPlatform({ value: platform });
    
    
    // --------------------------------------------------
    //   ゲーム選択フォーム
    // --------------------------------------------------
    
    // ゲーム選択フォームを表示するかどうか　配列内のプラットフォームの場合、表示しない
    const gameSelectForm = ['PlayStation', 'Xbox', 'Nintendo', 'Steam', 'Origin', 'Discord', 'Skype', 'ICQ', 'Line'].indexOf(validationPlatformObj.value) === -1;
    
    // const gamesArr = handleGetGamesArr({ pathArr });
    
    
    
    
    // --------------------------------------------------
    //   ラベル
    // --------------------------------------------------
    
    const label = lodashGet(dataObj, [...pathArr, 'label'], '');
    const validationLabelObj = validationIDsLabel({ value: label });
    
    
    // --------------------------------------------------
    //   ID
    // --------------------------------------------------
    
    const id = lodashGet(dataObj, [...pathArr, 'id'], '');
    const validationIDObj = validationIDsID({ value: id });
    
    
    // --------------------------------------------------
    //   公開設定
    // --------------------------------------------------
    
    const publicSetting = lodashGet(dataObj, [...pathArr, 'publicSetting'], '');
    const validationPublicSettingObj = validationIDsPublicSetting({ value: publicSetting });
    
    
    // --------------------------------------------------
    //   検索可能
    // --------------------------------------------------
    
    const search = lodashGet(dataObj, [...pathArr, 'search'], true);
    
    
    // --------------------------------------------------
    //   IDを削除するか尋ねるダイアログを表示するための変数
    // --------------------------------------------------
    
    const deleteDialogOpen = lodashGet(dataObj, [...pathArr, 'deleteDialogOpen'], false);
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(chalk`
    //   gameSelectForm: {green ${gameSelectForm}}
    // `);
    
    // console.log(`
    //   ----- gamesArr -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(gamesArr)), { colors: true, depth: null })}\n
    //   --------------------\n
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
          編集したいIDを押してから、フォームの内容を編集してください。「編集する」ボタンを押すとIDの編集が完了します。<br /><br />
          
          IDは「<strong>ラベル:</strong> ID」という並びで表示されます。ラベルが未入力の場合はプラットフォーム、選択したゲームの名前が代わりに表示されます。
        </p>
        
        
        
        
        {/* 編集可能なID */}
        <h4 css={cssHeading}>[ 編集可能なID ]</h4>
        
        <div css={cssBox}>
          {componentsIDArr}
        </div>
        
        
        
        
        {/* 編集フォーム */}
        <h4 css={cssHeading}>[ 編集フォーム ]</h4>
        
        
        
        
        {/* プラットフォーム */}
        <div css={cssPlatformBox}>
          
          <FormControl
            style={{ minWidth: 300 }}
            error={validationPlatformObj.error}
          >
            
            <InputLabel htmlFor="platform">プラットフォーム</InputLabel>
            
            <Select
              id="platform"
              value={validationPlatformObj.value}
              onChange={(eventObj) => handleEdit({
                pathArr: [...pathArr, 'platform'],
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
            pathArr={pathArr}
            // gamesArr={gamesArr}
            additionalGameLimit={additionalGameLimit}
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
              pathArr: [...pathArr, 'label'],
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
            value={validationIDObj.value}
            onChange={(eventObj) => handleEdit({
              pathArr: [...pathArr, 'id'],
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
              value={validationPublicSettingObj.value}
              onChange={(eventObj) => handleEdit({
                pathArr: [...pathArr, 'publicSetting'],
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
                  pathArr: [...pathArr, 'search'],
                  value: eventObj.target.checked
                })}
              />
            }
            label="このIDを検索可能にする"
          />
        </div>
        
        
        
        
        {/* 「編集する」ボタン */}
        <div
          css={css`
            margin: 24px 0 12px 0;
          `}
        >
          
          <Button
            css={css`
              && {
                margin: 0 12px 0 0;
              }
            `}
            variant="outlined"
            color="primary"
            onClick={() => handleEditSubmit({
              pathArr,
              handleSetIDsArr,
              idsArr,
            })}
            disabled={buttonDisabled}
          >
            編集する
          </Button>
          
          
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleDeleteDialogOpen({
              pathArr,
            })}
            disabled={buttonDisabled}
          >
            削除する
          </Button>
          
        </div>
        
        
        
        
        {/* IDを削除するか尋ねるダイアログ */}
        <Dialog
          open={deleteDialogOpen}
          onClose={() => handleDeleteDialogClose({ pathArr })}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          
          <DialogTitle id="alert-dialog-title">ID削除</DialogTitle>
          
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              このIDを削除しますか？
            </DialogContentText>
          </DialogContent>
          
          <DialogActions>
            <Button
              onClick={() => handleDeleteSubmit({
                pathArr,
                handleSetIDsArr,
                idsArr,
              })}
              color="primary"
              autoFocus
            >
              はい
            </Button>
            
            <Button
              onClick={() => handleDeleteDialogClose({ pathArr })}
              color="primary"
            >
              いいえ
            </Button>
          </DialogActions>
          
        </Dialog>
        
        
      </div>
    );
    
  }
  
});