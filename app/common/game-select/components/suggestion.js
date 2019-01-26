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
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

// import IconClose from '@material-ui/icons/Close';


// ---------------------------------------------
//   Components
// ---------------------------------------------

import GameSelectChip from '../../game-select/components/chip';




// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const SelectedGamesBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 12px 0 0 0;
  padding: 0;
  
  @media screen and (max-width: 480px) {
    flex-flow: column wrap;
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

// const StyledPaper = styled(Paper)`
//   && {
//     margin: 12px 0 0 0;
//   }
// `;




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
    // this.props.stores.layout.handleButtonDisabledObj(`${this.props._id}-gameSelectSuggestion`, false);
  }
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, _id, selectedArr, func, funcDelete } = this.props;
    
    // const { buttonDisabledObj } = stores.layout;
    
    const {
      
      gameSelectSuggestionSelectedObj,
      handleGameSelectSuggestionAdd,
      handleGameSelectSuggestionDelete,
      
      gameSelectSuggestionTextFieldObj,
      handleGameSelectSuggestionTextField,
      
      gameSelectSuggestionDataObj,
      gameSelectSuggestionKeyboardSelectedObj,
      handleGameSelectSuggestionOnKeyDown,
      
      gameSelectSuggestionTextFieldFocusObj,
      handleGameSelectSuggestionTextFieldOnFocus,
      handleGameSelectSuggestionTextFieldOnBlur
      
    } = stores.gameSelectSuggestion;
    
    
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    // let buttonDisabled = true;
    
    // if (`${_id}-gameSelectSuggestion` in buttonDisabledObj) {
    //   buttonDisabled = buttonDisabledObj[`${_id}-gameSelectSuggestion`];
    // }
    
    
    
    
    // --------------------------------------------------
    //   Component - Selected Game
    // --------------------------------------------------
    
    let componentSelected = '';
    let componentSelectedArr = [];
    
    // let selectedGamesArr = selectedArr;
    
    if (_id in gameSelectSuggestionSelectedObj) {
      selectedArr = gameSelectSuggestionSelectedObj[_id];
    }
    
    if (selectedArr.length > 0) {
      
      for (const [index, valueObj] of selectedArr.entries()) {
        
        // console.log(`
        //   ----- valueObj -----\n
        //   ${util.inspect(valueObj, { colors: true, depth: null })}\n
        //   --------------------\n
        // `);
        
        componentSelectedArr.push(
          <GameSelectChip
            _id={valueObj.games_id}
            gameID={valueObj.gameID}
            thumbnail={valueObj.thumbnail}
            name={valueObj.name}
            funcDelete={() => handleGameSelectSuggestionDelete({
              _id,
              games_id: valueObj._id,
              gameID: valueObj.gameID,
              thumbnail: valueObj.thumbnail,
              name: valueObj.name,
              funcDelete
            })}
            // funcDeleteArgumentsObj={{ _id, games_id: valueObj.games_id }}
            key={index}
          />
        );
        
      }
      
      componentSelected = <SelectedGamesBox>{componentSelectedArr}</SelectedGamesBox>;
      
    }
    
    // let selectedGamesArr = selectedArr;
    
    // if (_id in gameSelectSuggestionSelectedObj) {
    //   selectedGamesArr = gameSelectSuggestionSelectedObj[_id];
    // }
    
    // if (selectedGamesArr.length > 0) {
      
    //   for (const [index, valueObj] of selectedGamesArr.entries()) {
        
    //     // console.log(`
    //     //   ----- valueObj -----\n
    //     //   ${util.inspect(valueObj, { colors: true, depth: null })}\n
    //     //   --------------------\n
    //     // `);
        
    //     componentSelectedArr.push(
    //       <GameSelectChip
    //         _id={valueObj.games_id}
    //         gameID={valueObj.gameID}
    //         thumbnail={valueObj.thumbnail}
    //         name={valueObj.name}
    //         funcDelete={handleGameSelectSuggestionDelete}
    //         funcDeleteArgumentsObj={{ _id, games_id: valueObj.games_id }}
    //         key={index}
    //       />
    //     );
        
    //   }
      
    //   componentSelected = <SelectedGamesBox>{componentSelectedArr}</SelectedGamesBox>;
      
    // }
    
    
    
    
    // --------------------------------------------------
    //   Text Field Input Value
    // --------------------------------------------------
    
    let textFieldValue = '';
    
    if (_id in gameSelectSuggestionTextFieldObj) {
      textFieldValue = gameSelectSuggestionTextFieldObj[_id];
    }
    
    
    // --------------------------------------------------
    //   Text Field Focus
    // --------------------------------------------------
    
    let onFocus = false;
    
    if (_id in gameSelectSuggestionTextFieldFocusObj) {
      onFocus = gameSelectSuggestionTextFieldFocusObj[_id];
    }
    
    
    
    
    // --------------------------------------------------
    //   Component - Suggestion
    // --------------------------------------------------
    
    // サジェストのデータ配列
    let suggestionDataArr = [];
    
    if (_id in gameSelectSuggestionDataObj) {
      suggestionDataArr = gameSelectSuggestionDataObj[_id];
    }
    
    
    // サジェストのメニューを作成
    let componentSuggestionMenuItemsArr = [];
    
    if (onFocus && textFieldValue && suggestionDataArr.length > 0) {
      
      
      // キーボードの↓↑でハードウェアを選択するための番号、初期値は影響のない9999にしておく
      let suggestionSelected = 9999;
      
      if (_id in gameSelectSuggestionKeyboardSelectedObj) {
        suggestionSelected = gameSelectSuggestionKeyboardSelectedObj[_id];
      }
      
      
      // すでに選択されているハードウェアを太字で表示するための配列
      let selectedGamesArr = selectedArr;
      
      if (_id in gameSelectSuggestionSelectedObj) {
        selectedGamesArr = gameSelectSuggestionSelectedObj[_id];
      }
      
      
      for (const [index, valueObj] of suggestionDataArr.entries()) {
        
        // すでに選択されているハードウェアを太字で表示するためのindex
        const index2 = selectedGamesArr.findIndex((value2Obj) => {
          return value2Obj.games_id === valueObj._id;
        });
        
        // console.log(chalk`
        //   index2: {green ${index2}}
        // `);
        
        // console.log(`
        //   ----- selectedGamesArr -----\n
        //   ${util.inspect(selectedGamesArr, { colors: true, depth: null })}\n
        //   --------------------\n
        // `);
        
        // console.log(`
        //   ----- valueObj -----\n
        //   ${util.inspect(valueObj, { colors: true, depth: null })}\n
        //   --------------------\n
        // `);
        
        componentSuggestionMenuItemsArr.push(
          <MenuItem
            key={index}
            component="div"
            selected={index === suggestionSelected}
            onMouseDown={() => handleGameSelectSuggestionAdd({
              _id,
              games_id: valueObj._id,
              gameID: valueObj.gameID,
              thumbnail: valueObj.thumbnail,
              name: valueObj.name,
              func
            })}
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
        {componentSelected}
        
        
        <div
          onFocus={()=> handleGameSelectSuggestionTextFieldOnFocus(_id)}
          onBlur={()=> handleGameSelectSuggestionTextFieldOnBlur(_id)}
        >
          
          <StyledTextFieldWide
            id="hardwareActive"
            label="ゲーム"
            value={textFieldValue}
            onChange={(eventObj) => handleGameSelectSuggestionTextField({ eventObj, _id })}
            onKeyDown={(eventObj) => handleGameSelectSuggestionOnKeyDown({ eventObj, _id })}
            helperText="ゲーム名の一部を入力して、検索結果から選んでください"
            margin="normal"
            autoComplete="off"
            inputProps={{
              maxLength: 50,
            }}
          />
          
          {componentSuggestion}
          
        </div>
        
        
      </React.Fragment>
    );
    
  }
  
};