// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

import chalk from 'chalk';
import util from 'util';


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

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
//   Components
// ---------------------------------------------

import IDSelectChip from './chip';
import GameSelectSuggestion from '../../game-select/components/suggestion';




// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const Container = styled.div`
  padding: 8px 14px 16px 14px;
`;

const Description = styled.p`
  font-size: 14px;
  margin: 12px 0 0 0;
`;

const Heading = styled.div`
  font-weight: bold;
  margin: 24px 0 0 0;
`;

const IDsBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 4px 0 24px 0;
  padding: 0;
  
  @media screen and (max-width: 480px) {
    flex-flow: column wrap;
  }
`;

const IDBox = styled.div`
  cursor: pointer;
`;

const PlatformBox = styled.div`
  margin: 12px 0 0 0;
`;

const StyledTextFieldWide = styled(TextField)`
  && {
    width: 400px;
    
    @media screen and (max-width: 480px) {
      width: 100%;
    }
  }
`;

const SearchBox = styled.div`
  margin: 24px 0 0 0;
`;

const SendButtonBox = styled.div`
  margin: 24px 0 0 0;
`;

const StyledButton = styled(Button)`
  && {
    margin: 0 12px 0 0;
  }
`;





// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores')
@observer
export default injectIntl(class extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  
  componentDidMount() {
    this.props.stores.layout.handleButtonDisabledObj(`${this.props._id}-idFormEditSubmit`, false);
  }
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, _id, func, selectedArr } = this.props;
    const { formatMessage } = this.props.intl;
    const { buttonDisabledObj } = stores.layout;
    
    const {
      
      idFormDataObj,
      
      handleIDFormSetEditForm,
      
      idFormPlatformObj,
      handleIDFormPlatform,
      
      idFormGameObj,
      handleIDFormGame,
      handleIDFormGameDelete,
      
      idFormLabelObj,
      handleIDFormLabel,
      
      idFormIDObj,
      handleIDFormID,
      
      idFormPublicSettingObj,
      handleIDFormPublicSetting,
      
      idFormSearchObj,
      handleIDFormSearch,
      
      idFormDeleteDialogOpenObj,
      handleIDFormDeleteDialogOpen,
      handleIDFormDeleteDialogClose,
      
      handleIDFormEditSubmit,
      handleIDFormDeleteSubmit
      
    } = stores.idSelectForm;
    
    
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = `${_id}-idFormEditSubmit` in buttonDisabledObj ? buttonDisabledObj[`${_id}-idFormEditSubmit`] : true;
    
    
    // --------------------------------------------------
    //   Component - 編集可能なID
    // --------------------------------------------------
    
    const componentsIDArr = [];
    const dataArr = _id in idFormDataObj ? idFormDataObj[_id] : [];
    
    for (const [index, valueObj] of dataArr.entries()) {
      
      let games_id = 'games_id' in valueObj ? valueObj.games_id : '';
      let gamesThumbnail = 'gamesThumbnail' in valueObj ? valueObj.gamesThumbnail : '';
      let gamesName = 'gamesName' in valueObj ? valueObj.gamesName : '';
      
      componentsIDArr.push(
        <IDBox
          key={index}
          onClick={() => handleIDFormSetEditForm({ _id, ids_id: valueObj._id })}
        >
          <IDSelectChip
            platform={valueObj.platform}
            label={valueObj.label}
            id={valueObj.id}
            games_id={games_id}
            gamesThumbnail={gamesThumbnail}
            gamesName={gamesName}
          />
        </IDBox>
      );
      
    }
    
    
    
    
    // --------------------------------------------------
    //   フォームの値 - プラットフォーム
    // --------------------------------------------------
    
    let formPlatformValue = '';
    let formPlatformError = false;
    let formPlatformMessageID = 'GHXngbv4G';
    let formPlatformNumberOfCharacters = 0;
    
    if (_id in idFormPlatformObj) {
      
      formPlatformValue = idFormPlatformObj[_id].value;
      formPlatformError = idFormPlatformObj[_id].error;
      
      if (idFormPlatformObj[_id].messageID) {
        formPlatformMessageID = idFormPlatformObj[_id].messageID;
      }
      
      formPlatformNumberOfCharacters = idFormPlatformObj[_id].numberOfCharacters;
      
    }
    
    
    // --------------------------------------------------
    //   フォームの値 - Game
    // --------------------------------------------------
    
    const formGameArr = _id in idFormGameObj ? idFormGameObj[_id] : [];
    
    
    // --------------------------------------------------
    //   フォームの値 - ラベル
    // --------------------------------------------------
    
    let formLabelValue = '';
    let formLabelError = false;
    let formLabelMessageID = 'ZlyG1tegW';
    let formLabelNumberOfCharacters = 0;
    
    if (_id in idFormLabelObj) {
      
      formLabelValue = idFormLabelObj[_id].value;
      formLabelError = idFormLabelObj[_id].error;
      
      if (idFormLabelObj[_id].messageID) {
        formLabelMessageID = idFormLabelObj[_id].messageID;
      }
      
      formLabelNumberOfCharacters = idFormLabelObj[_id].numberOfCharacters;
      
    }
    
    
    // --------------------------------------------------
    //   フォームの値 - ID
    // --------------------------------------------------
    
    let formIDValue = '';
    let formIDError = false;
    let formIDMessageID = 'oWwTCtWxC';
    let formIDNumberOfCharacters = 0;
    
    if (_id in idFormIDObj) {
      
      formIDValue = idFormIDObj[_id].value;
      formIDError = idFormIDObj[_id].error;
      
      if (idFormIDObj[_id].messageID) {
        formIDMessageID = idFormIDObj[_id].messageID;
      }
      
      formIDNumberOfCharacters = idFormIDObj[_id].numberOfCharacters;
      
    }
    
    
    // --------------------------------------------------
    //   フォームの値 - 公開設定
    // --------------------------------------------------
    
    let formPublicSettingValue = 0;
    let formPublicSettingError = false;
    let formPublicSettingMessageID = 'TogSfI8lD';
    let formPublicSettingNumberOfCharacters = 0;
    
    if (_id in idFormPublicSettingObj) {
      
      formPublicSettingValue = idFormPublicSettingObj[_id].value;
      formPublicSettingError = idFormPublicSettingObj[_id].error;
      
      if (idFormPublicSettingObj[_id].messageID) {
        formPublicSettingMessageID = idFormPublicSettingObj[_id].messageID;
      }
      
      formPublicSettingNumberOfCharacters = idFormPublicSettingObj[_id].numberOfCharacters;
      
    }
    
    
    // --------------------------------------------------
    //   フォームの値 - Search
    // --------------------------------------------------
    
    const formSearch = _id in idFormSearchObj ? idFormSearchObj[_id] : true;
    
    
    // --------------------------------------------------
    //   Game 選択フォームを表示しないプラットフォーム
    // --------------------------------------------------
    
    const noGameIDPlatformArr = ['PlayStation', 'Xbox', 'Nintendo', 'Steam'];
    
    
    
    
    // --------------------------------------------------
    //   IDを削除するか尋ねるダイアログを表示するための変数
    // --------------------------------------------------
    
    const deleteDialogOpen = _id in idFormDeleteDialogOpenObj ? idFormDeleteDialogOpenObj[_id] : false;
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----- stores.data.usersLoginObj -----\n
    //   ${util.inspect(stores.data.usersLoginObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- selectedArr -----\n
    //   ${util.inspect(selectedArr, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   formIDValue: {green ${formIDValue}}
    //   formIDError: {green ${formIDError}}
    //   formIDMessageID: {green ${formIDMessageID}}
    //   formIDNumberOfCharacters: {green ${formIDNumberOfCharacters}}
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Container>
        
        
        <Description>
          編集したいIDを押してから、フォームの内容を編集してください。「編集する」ボタンを押すとIDの編集が完了します。<br /><br />
          
          IDは「<strong>ラベル:</strong> ID」という並びで表示されます。ラベルが未入力の場合はプラットフォーム、選択したゲームの名前が代わりに表示されます。
        </Description>
        
        
        
        
        {/* 編集可能なID */}
        <Heading>[ 編集可能なID ]</Heading>
        
        <IDsBox>
          {componentsIDArr}
        </IDsBox>
        
        
        
        
        {/* 編集フォーム */}
        <Heading>[ 編集フォーム ]</Heading>
        
        
        {/* プラットフォーム */}
        <PlatformBox>
          <FormControl
            style={{ minWidth: 300 }}
            error={formPlatformError}
          >
            <InputLabel htmlFor="platform">プラットフォーム</InputLabel>
            <Select
              value={formPlatformValue}
              onChange={(eventObj) => handleIDFormPlatform({ _id, value: eventObj.target.value })}
              inputProps={{
                name: 'platform',
                id: 'platform',
              }}
            >
              <MenuItem value={'PlayStation'}>PlayStation</MenuItem>
              <MenuItem value={'Xbox'}>Xbox</MenuItem>
              <MenuItem value={'Nintendo'}>Nintendo</MenuItem>
              <MenuItem value={'Steam'}>Steam</MenuItem>
              <MenuItem value={'PC'}>PC</MenuItem>
              <MenuItem value={'Android'}>Android</MenuItem>
              <MenuItem value={'iOS'}>iOS</MenuItem>
              <MenuItem value={'Other'}>その他</MenuItem>
            </Select>
            <FormHelperText>{formatMessage({ id: formPlatformMessageID }, { numberOfCharacters: formPlatformNumberOfCharacters })}</FormHelperText>
          </FormControl>
        </PlatformBox>
        
        
        {/* ゲーム選択 */}
        {noGameIDPlatformArr.indexOf(formPlatformValue) === -1 &&
          <GameSelectSuggestion
            _id={_id}
            selectedArr={formGameArr}
            func={handleIDFormGame}
            funcDelete={handleIDFormGameDelete}
          />
        }
        
        
        {/* ラベル */}
        <div>
          <StyledTextFieldWide
            id="label"
            label="ラベル"
            value={formLabelValue}
            onChange={(eventObj) => handleIDFormLabel({ _id, value: eventObj.target.value })}
            error={formLabelError}
            helperText={formatMessage({ id: formLabelMessageID }, { numberOfCharacters: formLabelNumberOfCharacters })}
            margin="normal"
            inputProps={{
              maxLength: 30,
            }}
          />
        </div>
        
        
        {/* ID */}
        <div>
          <StyledTextFieldWide
            id="label"
            label="ID"
            value={formIDValue}
            onChange={(eventObj) => handleIDFormID({ _id, value: eventObj.target.value })}
            error={formIDError}
            helperText={formatMessage({ id: formIDMessageID }, { numberOfCharacters: formIDNumberOfCharacters })}
            margin="normal"
            inputProps={{
              maxLength: 128,
            }}
          />
        </div>
        
        
        {/* 公開設定 */}
        <PlatformBox>
          <FormControl
            style={{ minWidth: 300 }}
            error={formPublicSettingError}
          >
            <InputLabel htmlFor="publicSetting">IDの公開設定</InputLabel>
            <Select
              value={formPublicSettingValue}
              onChange={(eventObj) => handleIDFormPublicSetting({ _id, value: eventObj.target.value })}
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
            <FormHelperText>{formatMessage({ id: formPublicSettingMessageID }, { numberOfCharacters: formPublicSettingNumberOfCharacters })}</FormHelperText>
          </FormControl>
        </PlatformBox>
        
        
        {/* 検索可能 */}
        <SearchBox>
          <FormControlLabel
            control={
              <Checkbox
                checked={formSearch}
                onChange={(eventObj) => handleIDFormSearch({ _id, value: eventObj.target.checked })}
              />
            }
            label="このIDを検索可能にする"
          />
        </SearchBox>
        
        
        
        
        {/* ボタン */}
        <SendButtonBox>
          
          <StyledButton
            variant="outlined"
            color="primary"
            onClick={() => handleIDFormEditSubmit({
              _id,
              func,
              selectedArr
            })}
            disabled={buttonDisabled}
          >
            編集する
          </StyledButton>
          
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleIDFormDeleteDialogOpen({
              _id,
            })}
            disabled={buttonDisabled}
          >
            削除する
          </Button>
          
        </SendButtonBox>
        
        
        
        {/* IDを削除するか尋ねるダイアログ */}
        <Dialog
          open={deleteDialogOpen}
          onClose={() => handleIDFormDeleteDialogClose({ _id })}
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
              onClick={() => handleIDFormDeleteSubmit({
                _id,
                func,
                selectedArr
              })}
              color="primary"
              autoFocus
            >
              はい
            </Button>
            
            <Button
              onClick={() => handleIDFormDeleteDialogClose({ _id })}
              color="primary"
            >
              いいえ
            </Button>
          </DialogActions>
        </Dialog>
        
        
      </Container>
    );
    
  }
  
});