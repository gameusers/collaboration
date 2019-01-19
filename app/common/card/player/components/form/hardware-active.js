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

import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';




// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const Heading = styled.div`
  font-weight: bold;
  margin: 0 0 2px 0;
`;

const Description = styled.p`
  font-size: 14px;
  // line-height: 1.6em;
`;

const HardwareBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 24px 0 0 0;
`;

const StyledChip = styled(Chip)`
  && {
    margin: 0 6px 6px 0;
  }
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
  margin: 0;
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
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, _id, arr, search } = this.props;
    
    const {
      
      
      handleCardPlayerAddHardwareActive,
      handleCardPlayerDeleteHardwareActive,
      cardPlayerFormHardwareActiveSuggestionObj,
      cardPlayerFormHardwareActiveSuggestionSelectedObj,
      handleCardPlayerFormHardwareActiveSuggestionOnKeyDown,
      cardPlayerEditFormHardwareActiveTextFieldObj,
      handleCardPlayerEditHardwareActiveTextField,
      cardPlayerEditFormHardwareActiveTextFieldFocusObj,
      handleCardPlayerHardwareActiveTextFieldOnFocus,
      handleCardPlayerHardwareActiveTextFieldOnBlur,
      handleCardPlayerEditHardwareActiveSearch
      
    } = stores.cardPlayer;
    
    
    
    
    // --------------------------------------------------
    //   Component - Hardware
    // --------------------------------------------------
    
    let componentHardware = '';
    let componentHardwareArr = [];
    
    if (arr.length > 0) {
      
      for (const [index, valueObj] of arr.entries()) {
        
        componentHardwareArr.push(
          <StyledChip
            key={index}
            label={valueObj.name}
            color="primary"
            onDelete={() => handleCardPlayerDeleteHardwareActive(_id, valueObj.hardwareID)}
            variant="outlined"
          />
        );
        
      }
      
      
      if (componentHardwareArr.length > 0) {
        componentHardware = <HardwareBox>{componentHardwareArr}</HardwareBox>;
      }
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Text Field Input Value
    // --------------------------------------------------
    
    let inputValue = '';
    
    if (_id in cardPlayerEditFormHardwareActiveTextFieldObj) {
      inputValue = cardPlayerEditFormHardwareActiveTextFieldObj[_id];
    }
    
    
    // --------------------------------------------------
    //   Text Field Focus
    // --------------------------------------------------
    
    let onFocus = false;
    
    if (_id in cardPlayerEditFormHardwareActiveTextFieldFocusObj) {
      onFocus = cardPlayerEditFormHardwareActiveTextFieldFocusObj[_id];
    }
    
    
    
    
    // --------------------------------------------------
    //   Component - Suggestion
    // --------------------------------------------------
    
    let suggestionArr = [];
    
    if (_id in cardPlayerFormHardwareActiveSuggestionObj) {
      suggestionArr = cardPlayerFormHardwareActiveSuggestionObj[_id];
    }
    
    
    let componentSuggestionMenuItemsArr = [];
    
    if (onFocus && inputValue && suggestionArr.length > 0) {
      
      // キーボードの↓↑でハードウェアを選択するための番号
      let suggestionSelected = 9999;
      
      if (_id in cardPlayerFormHardwareActiveSuggestionSelectedObj) {
        suggestionSelected = cardPlayerFormHardwareActiveSuggestionSelectedObj[_id];
      }
      
      
      for (const [index, valueObj] of suggestionArr.entries()) {
        
        // すでに選択されているハードウェアを太字で表示するためのindex
        const index2 = arr.findIndex((value2Obj) => {
          return value2Obj.hardwareID === valueObj.hardwareID;
        });
        
        
        componentSuggestionMenuItemsArr.push(
          <MenuItem
            key={index}
            component="div"
            selected={index === suggestionSelected}
            onMouseDown={() => handleCardPlayerAddHardwareActive(_id, valueObj.hardwareID, valueObj.name)}
            style={{
              fontWeight: index2 !== -1 ? 'bold' : 'normal',
            }}
          >
            {valueObj.name}
          </MenuItem>
        );
        
      }
      
    }
    
    
    let componentSuggestion = '';
    
    if (componentSuggestionMenuItemsArr.length > 0) {
      
      componentSuggestion = 
        <Paper square>
          <MenuList>
            {componentSuggestionMenuItemsArr}
          </MenuList>
        </Paper>
      ;
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Console 出力
    // --------------------------------------------------
    
    // console.log(`
    //   ----- birthdayObj -----\n
    //   ${util.inspect(birthdayObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   value: {green ${value}}
    //   alternativeText: {green ${alternativeText}}
    //   search: {green ${search}}
    //   birthday: {green ${birthday}}
    // `);
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        
        <Heading>所有ハードウェア</Heading>
        
        <Description>入力すると所有ハードウェアが表示されます。ハードウェア名（またはSFC、N64などの略称）の一部を入力すると、入力フォームの下に一覧でハードウェアの正式名称が表示されます。一覧上でハードウェアをクリック（タップ）すると入力は完了です。この欄では複数のハードウェアを入力することが可能です。<br /><br />
        
          ゲームのハードウェア名だけでなく、「Android」「iOS」「PC」などもハードウェアとして入力できます。
        </Description>
        
        
        {componentHardware}
        
        
        <div
          onFocus={()=> handleCardPlayerHardwareActiveTextFieldOnFocus(_id)}
          onBlur={()=> handleCardPlayerHardwareActiveTextFieldOnBlur(_id)}
        >
          
          <StyledTextFieldWide
            id="hardwareActive"
            label="ハードウェア名"
            value={inputValue}
            onChange={(event) => handleCardPlayerEditHardwareActiveTextField(event, _id)}
            onKeyDown={(eventObj) => handleCardPlayerFormHardwareActiveSuggestionOnKeyDown(eventObj, _id, 'hardwareSuggestionSelected', 1)}
            margin="normal"
            autoComplete="off"
            inputProps={{
              maxLength: 50,
            }}
          />
          
          {componentSuggestion}
          
        </div>
        
        
        <SearchBox>
          <FormControlLabel
            control={
              <Checkbox
                checked={search}
                onChange={(event) => handleCardPlayerEditHardwareActiveSearch(event, _id)}
              />
            }
            label="所有ハードウェアで検索可能にする"
          />
        </SearchBox>
        
        
      </React.Fragment>
    );
    
  }
  
};