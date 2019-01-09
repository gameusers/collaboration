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
import Downshift from 'downshift';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';




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
  line-height: 1.6em;
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
      
      cardPlayerEditFormHardwareActiveItemsArr,
      cardPlayerEditFormHardwareActiveTextFieldObj,
      handleCardPlayerEditHardwareActiveTextField,
      cardPlayerEditFormHardwareActiveTextFieldFocusObj,
      handleCardPlayerHardwareActiveTextFieldOnFocus,
      handleCardPlayerHardwareActiveTextFieldOnBlur,
      handleCardPlayerEditHardwareActiveSearch
      
    } = stores.cardPlayer;
    
    
    
    
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
    
    let componentSuggestionMenuItemsArr = [];
    
    if (onFocus && inputValue && cardPlayerEditFormHardwareActiveItemsArr.length > 0) {
      
      for (const [index, valueObj] of cardPlayerEditFormHardwareActiveItemsArr.entries()) {
        
        componentSuggestionMenuItemsArr.push(
          <MenuItem
            key={index}
            // selected={isHighlighted}
            component="div"
            // style={{
            //   fontWeight: isSelected ? 500 : 400,
            // }}
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
        
        <Description>入力すると所有ハードウェアが表示されます。ハードウェア名の一部を入力すると、入力フォームの下に一覧でハードウェアの正式名称が表示されます。一覧上でハードウェアをクリック（タップ）すると入力は完了です。この欄では複数のハードウェアを入力することが可能です。<br /><br />
        
          ゲームのハードウェア名だけでなく、「Android」「iOS」「PC」などもハードウェアとして入力できます。
        </Description>
        
        
        <StyledTextFieldWide
          id="hardwareActive"
          label="ハードウェア名"
          value={inputValue}
          onChange={(event) => handleCardPlayerEditHardwareActiveTextField(event, _id)}
          onFocus={()=> handleCardPlayerHardwareActiveTextFieldOnFocus(_id)}
          onBlur={()=> handleCardPlayerHardwareActiveTextFieldOnBlur(_id)}
          // helperText="ゲームのハードウェア名、Android、iOS、PCなども入力できます"
          margin="normal"
          autoComplete="off"
          inputProps={{
            maxLength: 50,
          }}
        />
        
        {componentSuggestion}
        
        
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