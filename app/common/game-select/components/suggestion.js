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
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconClose from '@material-ui/icons/Close';


// ---------------------------------------------
//   Components
// ---------------------------------------------

// import IDSelectChip from '../../id-select/components/chip';




// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const StyledTextFieldWide = styled(TextField)`
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

@inject('stores')
@observer
export default class extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  
  componentDidMount() {
    this.props.stores.layout.handleButtonDisabledObj(`${this.props._id}-gameSelectSuggestion`, false);
  }
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, _id, selectedArr, func } = this.props;
    
    const { buttonDisabledObj } = stores.layout;
    
    const {
      
      gameSelectSuggestionTextFieldObj,
      handleGameSelectSuggestionTextField
      
    } = stores.gameSelectSuggestion;
    
    
    
    
    // --------------------------------------------------
    //   Dialog
    // --------------------------------------------------
    
    // let dialogOpen = false;
    
    // if (_id in idFormDialogObj) {
    //   dialogOpen = idFormDialogObj[_id];
    // }
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    let buttonDisabled = true;
    
    if (`${_id}-gameSelectSuggestion` in buttonDisabledObj) {
      buttonDisabled = buttonDisabledObj[`${_id}-gameSelectSuggestion`];
    }
    
    
    
    
    // --------------------------------------------------
    //   Component - Hardware
    // --------------------------------------------------
    
    // let componentHardware = '';
    // let componentHardwareArr = [];
    
    // if (arr.length > 0) {
      
    //   for (const [index, valueObj] of arr.entries()) {
        
    //     componentHardwareArr.push(
    //       <StyledChip
    //         key={index}
    //         label={valueObj.name}
    //         color="primary"
    //         onDelete={() => handleCardPlayerDeleteHardwareActive(_id, valueObj.hardwareID)}
    //         variant="outlined"
    //       />
    //     );
        
    //   }
      
      
    //   if (componentHardwareArr.length > 0) {
    //     componentHardware = <HardwareBox>{componentHardwareArr}</HardwareBox>;
    //   }
      
    // }
    
    
    
    
    // --------------------------------------------------
    //   Text Field Input Value
    // --------------------------------------------------
    
    let textFieldValue = '';
    
    if (_id in gameSelectSuggestionTextFieldObj) {
      textFieldValue = gameSelectSuggestionTextFieldObj[_id];
    }
    
    
    // // --------------------------------------------------
    // //   Text Field Focus
    // // --------------------------------------------------
    
    // let onFocus = false;
    
    // if (_id in cardPlayerEditFormHardwareActiveTextFieldFocusObj) {
    //   onFocus = cardPlayerEditFormHardwareActiveTextFieldFocusObj[_id];
    // }
    
    
    
    
    // // --------------------------------------------------
    // //   Component - Suggestion
    // // --------------------------------------------------
    
    // let suggestionArr = [];
    
    // if (_id in cardPlayerFormHardwareActiveSuggestionObj) {
    //   suggestionArr = cardPlayerFormHardwareActiveSuggestionObj[_id];
    // }
    
    
    // let componentSuggestionMenuItemsArr = [];
    
    // if (onFocus && inputValue && suggestionArr.length > 0) {
      
    //   // キーボードの↓↑でハードウェアを選択するための番号
    //   let suggestionSelected = 9999;
      
    //   if (_id in cardPlayerFormHardwareActiveSuggestionSelectedObj) {
    //     suggestionSelected = cardPlayerFormHardwareActiveSuggestionSelectedObj[_id];
    //   }
      
      
    //   for (const [index, valueObj] of suggestionArr.entries()) {
        
    //     // すでに選択されているハードウェアを太字で表示するためのindex
    //     const index2 = arr.findIndex((value2Obj) => {
    //       return value2Obj.hardwareID === valueObj.hardwareID;
    //     });
        
        
    //     componentSuggestionMenuItemsArr.push(
    //       <MenuItem
    //         key={index}
    //         component="div"
    //         selected={index === suggestionSelected}
    //         onMouseDown={() => handleCardPlayerAddHardwareActive(_id, valueObj.hardwareID, valueObj.name)}
    //         style={{
    //           fontWeight: index2 !== -1 ? 'bold' : 'normal',
    //         }}
    //       >
    //         {valueObj.name}
    //       </MenuItem>
    //     );
        
    //   }
      
    // }
    
    
    // let componentSuggestion = '';
    
    // if (componentSuggestionMenuItemsArr.length > 0) {
      
    //   componentSuggestion = 
    //     <Paper square>
    //       <MenuList>
    //         {componentSuggestionMenuItemsArr}
    //       </MenuList>
    //     </Paper>
    //   ;
      
    // }
    
    
    
    
    
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
      <React.Fragment>
        
        
        {/* 選択されたゲーム */}
        {/* componentHardware*/}
        
        
        <div
          // onFocus={()=> handleCardPlayerHardwareActiveTextFieldOnFocus(_id)}
          // onBlur={()=> handleCardPlayerHardwareActiveTextFieldOnBlur(_id)}
        >
          
          <StyledTextFieldWide
            id="hardwareActive"
            label="ゲーム"
            value={textFieldValue}
            onChange={(eventObj) => handleGameSelectSuggestionTextField({ eventObj, _id })}
            // onKeyDown={(eventObj) => handleCardPlayerFormHardwareActiveSuggestionOnKeyDown(eventObj, _id, 'hardwareSuggestionSelected', 1)}
            helperText="IDに関係するゲームの名前を入力してください"
            margin="normal"
            autoComplete="off"
            inputProps={{
              maxLength: 50,
            }}
          />
          
          {/* componentSuggestion*/}
          
        </div>
        
        
      </React.Fragment>
    );
    
  }
  
};