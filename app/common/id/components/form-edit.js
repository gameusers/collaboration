// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console 出力用
// ---------------------------------------------

import chalk from 'chalk';


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import lodashGet from 'lodash/get';


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

import IDChip from './chip';
import GameForm from '../../game/components/form';




// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const Container = styled.div`
  padding: 8px 14px 16px 14px;
`;

const Description = styled.p`
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
    
    // --------------------------------------------------
    //   Button - Enable
    // --------------------------------------------------
    
    this.props.stores.layout.handleButtonEnable({ _id: `${this.props._id}-idFormEditSubmit` });
    
  }
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, intl, _id, func, idArr } = this.props;
    const { buttonDisabledObj } = stores.layout;
    
    const {
      
      dataObj,
      handleEdit,
      
      handleSetEditForm,
      
      handleGame,
      handleGameDelete,
      
      handleDeleteDialogOpen,
      handleDeleteDialogClose,
      
      handleEditSubmit,
      handleDeleteSubmit
      
    } = stores.idForm;
    
    
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    const buttonDisabled = lodashGet(buttonDisabledObj, [`${_id}-idFormEditSubmit`], true);
    
    
    
    
    // --------------------------------------------------
    //   Component - 編集可能なID
    // --------------------------------------------------
    
    const componentsIDArr = [];
    const dataArr = lodashGet(dataObj, [_id, 'dataArr'], []);
    
    for (const [index, valueObj] of dataArr.entries()) {
      
      const games_id = lodashGet(valueObj, ['games_id'], '');
      const gamesThumbnailArr = lodashGet(valueObj, ['gamesImagesAndVideosObj', 'thumbnailArr'], []);
      const gamesName = lodashGet(valueObj, ['gamesName'], '');
      
      componentsIDArr.push(
        <IDBox
          key={index}
          onClick={() => handleSetEditForm({ _id, ids_id: valueObj._id })}
        >
          <IDChip
            platform={valueObj.platform}
            label={valueObj.label}
            id={valueObj.id}
            games_id={games_id}
            gamesThumbnailArr={gamesThumbnailArr}
            gamesName={gamesName}
          />
        </IDBox>
      );
      
    }
    
    
    
    
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
    //   IDを削除するか尋ねるダイアログを表示するための変数
    // --------------------------------------------------
    
    const deleteDialogOpen = lodashGet(dataObj, [_id, 'deleteDialogOpen'], false);
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----- stores.data.loginUsersObj -----\n
    //   ${util.inspect(stores.data.loginUsersObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- idArr -----\n
    //   ${util.inspect(idArr, { colors: true, depth: null })}\n
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
            <FormHelperText>{intl.formatMessage({ id: validationPlatformObj.messageCode })}</FormHelperText>
          </FormControl>
        </PlatformBox>
        
        
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
          <StyledTextFieldWide
            id="label"
            label="ラベル"
            value={validationLabelObj.value}
            onChange={(eventObj) => handleEdit({
              pathArr: [_id, 'label'],
              value: eventObj.target.value
            })}
            error={validationLabelObj.error}
            helperText={intl.formatMessage({ id: validationLabelObj.messageCode }, { numberOfCharacters: validationLabelObj.numberOfCharacters })}
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
            value={validationIDObj.value}
            onChange={(eventObj) => handleEdit({
              pathArr: [_id, 'id'],
              value: eventObj.target.value
            })}
            error={validationIDObj.error}
            helperText={intl.formatMessage({ id: validationIDObj.messageCode }, { numberOfCharacters: validationIDObj.numberOfCharacters })}
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
            <FormHelperText>{intl.formatMessage({ id: validationPublicSettingObj.messageCode })}</FormHelperText>
          </FormControl>
        </PlatformBox>
        
        
        {/* 検索可能 */}
        <SearchBox>
          <FormControlLabel
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
        </SearchBox>
        
        
        
        
        {/* 「編集する」ボタン */}
        <SendButtonBox>
          
          <StyledButton
            variant="outlined"
            color="primary"
            onClick={() => handleEditSubmit({
              _id,
              func,
              idArr
            })}
            disabled={buttonDisabled}
          >
            編集する
          </StyledButton>
          
          
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleDeleteDialogOpen({
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
          onClose={() => handleDeleteDialogClose({ _id })}
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
                _id,
                func,
                idArr
              })}
              color="primary"
              autoFocus
            >
              はい
            </Button>
            
            <Button
              onClick={() => handleDeleteDialogClose({ _id })}
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