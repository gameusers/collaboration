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
    //   サジェスト
    // --------------------------------------------------
    
    // const renderSuggestion = ({ getItemProps, inputValue, highlightedIndex, selectedItem }) => {
      
    //   console.log(chalk`
    //     inputValue: {green ${inputValue}}
    //     highlightedIndex: {green ${highlightedIndex}}
    //     selectedItem: {green ${selectedItem}}
    //   `);
      
    //   console.log(`
    //     ----- inputValue -----\n
    //     ${util.inspect(inputValue, { colors: true, depth: null })}\n
    //     --------------------\n
    //   `);
      
    //   console.log(`
    //     ----- getItemProps({ item: 'apple' }) -----\n
    //     ${util.inspect(getItemProps({ item: 'apple' }), { colors: true, depth: null })}\n
    //     --------------------\n
    //   `);
      
      
    //   const componentItemsArr = [];
      
    //   for (const [index, valueObj] of itemsArr.entries()) {
        
    //     const value = valueObj.value;
    //     const isHighlighted = highlightedIndex === index;
    //     const isSelected = (selectedItem || '').indexOf(value) > -1;
        
    //     componentItemsArr.push(
    //       <MenuItem
    //         {...getItemProps({ item: value })}
    //         key={value}
    //         selected={isHighlighted}
    //         component="div"
    //         style={{
    //           fontWeight: isSelected ? 500 : 400,
    //         }}
    //       >
    //         {value}
    //       </MenuItem>
    //     );
        
    //   }
      
    //   return (
    //     <Paper square>
    //       <MenuList>
    //         {componentItemsArr}
    //       </MenuList>
    //     </Paper>
    //   );
      
    // };
    
    
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
    
    for (const [index, valueObj] of cardPlayerEditFormHardwareActiveItemsArr.entries()) {
      
      if (onFocus && inputValue && valueObj.name.indexOf(inputValue) !== -1) {
        
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
        
        // console.log(index, valueObj.name);
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
    
    
    // function handleInputChange(event) {
      
      
    //   console.log(chalk`
    //     event.target.value: {green ${event.target.value}}
    //   `);
      
    //   // setInputValue(event.target.value);
    // }
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        
        <Heading>所有ハードウェア</Heading>
        
        <Description>入力すると所有ハードウェアが表示されます。現在、所有しているハードウェアを入力してください。</Description>
        
        
        <StyledTextFieldWide
          id="hardwareActive"
          label="ハードウェア名"
          value={inputValue}
          onChange={(event) => handleCardPlayerEditHardwareActiveTextField(event, _id)}
          onFocus={()=> handleCardPlayerHardwareActiveTextFieldOnFocus(_id)}
          onBlur={()=> handleCardPlayerHardwareActiveTextFieldOnBlur(_id)}
          // helperText="モデル名、機種名などを入力してください"
          margin="normal"
          inputProps={{
            maxLength: 50,
          }}
        />
        
        {componentSuggestion}
        
        
        {/*<Downshift
          onChange={selection => alert(`You selected ${selection.value}`)}
          itemToString={item => (item ? item.value : '')}
        >
          {({
            getInputProps,
            getItemProps,
            // getLabelProps,
            // getMenuProps,
            isOpen,
            inputValue,
            highlightedIndex,
            selectedItem,
          }) => (
            <div>
              <label {...getLabelProps()}>Enter a fruit</label>
              <input {...getInputProps()} />
              <StyledTextFieldWide
                id="hardwareActive"
                // label="ハードウェア名"
                // placeholder='Select multiple countries'
                // value={textFieldInputValue}
                // onChange={(event) => handleCardPlayerEditHardwareActiveTextField(event, _id)}
                margin="normal"
                inputProps={{
                  maxLength: 50,
                }}
                InputProps={getInputProps({
                  // startAdornment: selectedItem.map(item => (
                  //   <Chip
                  //     key={item}
                  //     tabIndex={-1}
                  //     label={item}
                  //     className={classes.chip}
                  //     onDelete={handleDelete(item)}
                  //   />
                  // )),
                  // onChange: handleInputChange,
                  onChange: (event) => handleCardPlayerEditHardwareActiveTextField(event, _id),
                  // onKeyDown: handleKeyDown,
                  placeholder: 'Select multiple countries',
                })}
              //   label: 'Label',
              // })
                // InputProps={{
                //   inputRef: ref,
                //   classes: {
                //     root: classes.inputRoot,
                //     input: classes.inputInput,
                //   },
                //   ...InputProps,
                // }}
                // {...other}
              />
              
              {isOpen
                ? renderSuggestion({inputValue, getItemProps})
                : null}
            </div>
          )}
        </Downshift>
        */}
        
        {/*<Downshift
          onChange={selection => alert(`You selected ${selection.value}`)}
          itemToString={item => (item ? item.value : '')}
        >
          {({
            getInputProps,
            getItemProps,
            getLabelProps,
            getMenuProps,
            isOpen,
            inputValue,
            highlightedIndex,
            selectedItem,
          }) => (
            <div>
              <label {...getLabelProps()}>Enter a fruit</label>
              <input {...getInputProps()} />
              <ul {...getMenuProps()}>
                {isOpen
                  ? items
                      .filter(item => !inputValue || item.value.includes(inputValue))
                      .map((item, index) => (
                        <li
                          {...getItemProps({
                            key: item.value,
                            index,
                            item,
                            style: {
                              backgroundColor:
                                highlightedIndex === index ? 'lightgray' : 'white',
                              fontWeight: selectedItem === item ? 'bold' : 'normal',
                            },
                          })}
                        >
                          {item.value}
                        </li>
                      ))
                  : null}
              </ul>
            </div>
          )}
        </Downshift>*/}
        
        
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