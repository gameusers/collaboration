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


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


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

const RegistrationButtonBox = styled.div`
  margin: 16px 0 0 0;
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


const SendButtonBox = styled.div`
  margin: 24px 0 0 0;
`;

const SearchBox = styled.div`
  margin: 12px 0 0 0;
`;




// --------------------------------------------------
//   Class
// --------------------------------------------------

@inject('stores')
@observer
export default class extends React.Component {
  
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
    
    const { stores, _id } = this.props;
    
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
      handleIDFormSearch
      
    } = stores.idSelectForm;
    
    
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    let buttonDisabled = true;
    
    if (`${_id}-idFormEditSubmit` in buttonDisabledObj) {
      buttonDisabled = buttonDisabledObj[`${_id}-idFormEditSubmit`];
    }
    
    
    
    
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
    //   フォーム - プラットフォーム
    // --------------------------------------------------
    
    let formPlatform = '';
    
    if (_id in idFormPlatformObj) {
      formPlatform = idFormPlatformObj[_id];
    }
    
    
    // --------------------------------------------------
    //   フォーム - ゲーム
    // --------------------------------------------------
    
    let formGameArr = [];
    
    if (_id in idFormGameObj) {
      formGameArr = idFormGameObj[_id];
    }
    
    
    // --------------------------------------------------
    //   フォーム - ラベル
    // --------------------------------------------------
    
    let formLabel = '';
    
    if (_id in idFormLabelObj) {
      formLabel = idFormLabelObj[_id];
    }
    
    
    // --------------------------------------------------
    //   フォーム - ID
    // --------------------------------------------------
    
    let formID = '';
    
    if (_id in idFormIDObj) {
      formID = idFormIDObj[_id];
    }
    
    
    // --------------------------------------------------
    //   フォーム - 公開設定
    // --------------------------------------------------
    
    let formPublicSetting = '';
    
    if (_id in idFormPublicSettingObj) {
      formPublicSetting = idFormPublicSettingObj[_id];
    }
    
    
    // --------------------------------------------------
    //   フォーム - 検索
    // --------------------------------------------------
    
    let formSearch = '';
    
    if (_id in idFormSearchObj) {
      formSearch = idFormSearchObj[_id];
    }
    
    
    
    // --------------------------------------------------
    //   Console 出力
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
    //   hobbyTextFieldCount: {green ${hobbyTextFieldCount}}
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <Container>
        
        
        <Description>
          編集したいIDを押して、下にあるフォームに必要なデータを入力してください。「編集する」ボタンを押すとIDの編集は完了します。<br /><br />
          
          IDは「<strong>ラベル:</strong> ID」という並びで表示されます。ラベルが未入力の場合はプラットフォーム、選択したゲームの名前が代わりに表示されます。
        </Description>
        
        
        
        
        {/* 編集可能なID */}
        <Heading>[ 編集可能なID ]</Heading>
        
        <IDsBox>
          {componentsIDArr}
        </IDsBox>
        
        
        
        
        {/* フォーム */}
        <Heading>[ フォーム ]</Heading>
        
        
        {/* プラットフォーム */}
        <PlatformBox>
          <FormControl style={{ minWidth: 300 }}>
            <InputLabel htmlFor="platform">プラットフォーム</InputLabel>
            <Select
              value={formPlatform}
              onChange={(eventObj) => handleIDFormPlatform({ eventObj, _id })}
              inputProps={{
                name: 'platform',
                id: 'platform',
              }}
            >
              <MenuItem value={'Other'}>その他</MenuItem>
              <MenuItem value={'PlayStation'}>PlayStation</MenuItem>
              <MenuItem value={'Xbox'}>Xbox</MenuItem>
              <MenuItem value={'Nintendo'}>Nintendo</MenuItem>
              <MenuItem value={'Steam'}>Steam</MenuItem>
              <MenuItem value={'PC'}>PC</MenuItem>
              <MenuItem value={'Android'}>Android</MenuItem>
              <MenuItem value={'iOS'}>iOS</MenuItem>
            </Select>
          </FormControl>
        </PlatformBox>
        
        
        {/* ゲーム選択 */}
        <GameSelectSuggestion
          _id={_id}
          selectedArr={formGameArr}
          func={handleIDFormGame}
          funcDelete={handleIDFormGameDelete}
        />
        
        
        {/* ラベル */}
        <StyledTextFieldWide
          id="label"
          label="ラベル"
          value={formLabel}
          onChange={(eventObj) => handleIDFormLabel({ eventObj, _id })}
          helperText="IDの左側に太字で表示されます"
          margin="normal"
          inputProps={{
            maxLength: 50,
          }}
        />
        
        
        {/* ID */}
        <StyledTextFieldWide
          id="label"
          label="ID"
          value={formID}
          onChange={(eventObj) => handleIDFormID({ eventObj, _id })}
          helperText="IDを入力してください"
          margin="normal"
          inputProps={{
            maxLength: 50,
          }}
        />
        
        
        {/* 公開設定 */}
        <PlatformBox>
          <FormControl style={{ minWidth: 300 }}>
            <InputLabel htmlFor="publicSetting">IDの公開設定</InputLabel>
            <Select
              value={formPublicSetting}
              onChange={(eventObj) => handleIDFormPublicSetting({ eventObj, _id })}
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
          </FormControl>
        </PlatformBox>
        
        
        {/* 検索可能 */}
        <SearchBox>
          <FormControlLabel
            control={
              <Checkbox
                checked={formSearch}
                onChange={(eventObj) => handleIDFormSearch({ eventObj, _id })}
              />
            }
            label="このIDを検索可能にする"
          />
        </SearchBox>
        
        
        
        {/* 「編集する」ボタン */}
        <SendButtonBox>
          <Button
            variant="outlined"
            color="primary"
            // onClick={() => handleIDFormSelectButton({
            //   _id,
            //   idArr: idFormDataSelectedObj[_id],
            //   func
            // })}
            disabled={buttonDisabled}
          >
            編集する
          </Button>
        </SendButtonBox>
        
        
      </Container>
    );
    
  }
  
};