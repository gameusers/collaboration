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

import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputAdornment from '@material-ui/core/InputAdornment';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconAddCircle from '@material-ui/icons/AddCircle';
import IconRemoveCircle from '@material-ui/icons/RemoveCircle';




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

const TextFieldBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
`;

const StyledTextField = styled(TextField)`
  && {
    margin-right: 16px;
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
  
  
  componentDidMount(){
    this.props.stores.layout.handleButtonDisabledObj(`${this.props._id}-editFormHobby`, false);
  }
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, _id, arr, search } = this.props;
    
    const { buttonDisabledObj } = stores.layout;
    
    const {
      
      cardPlayerEditFormHobbyTextFieldCountObj,
      handleCardPlayerEditFormHobbyTextFieldCountIncrement,
      handleCardPlayerEditFormHobbyTextFieldCountDecrement,
      handleCardPlayerEditHobbySearch
      
    } = stores.cardPlayer;
    
    
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    let buttonDisabled = true;
    
    if (`${_id}-editFormHobby` in buttonDisabledObj) {
      buttonDisabled = buttonDisabledObj[`${_id}-editFormHobby`];
    }
    
    
    
    
    // --------------------------------------------------
    //   Component
    // --------------------------------------------------
    
    // テキストフィールドを表示する個数
    let hobbyTextFieldCount = arr.length;
    // let hobbyTextFieldCount = 5;
    
    if (_id in cardPlayerEditFormHobbyTextFieldCountObj) {
      hobbyTextFieldCount = cardPlayerEditFormHobbyTextFieldCountObj[_id];
    }
    
    
    const componentsArr = [];
    
    for (let i = 0; i < hobbyTextFieldCount; i++) {
      
      // console.log(i);
      
      let value = '';
      
      if (i < arr.length) {
        value = arr[i];
      }
      
      
      componentsArr.push(
        <StyledTextField
          value={value}
          margin="dense"
          variant="outlined"
          key={i}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => handleCardPlayerEditFormHobbyTextFieldCountDecrement(_id, i)}
                  disabled={buttonDisabled}
                >
                  <IconRemoveCircle />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      );
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Console 出力
    // --------------------------------------------------
    
    // console.log(`
    //   ----- arr -----\n
    //   ${util.inspect(arr, { colors: true, depth: null })}\n
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
        
        <Heading>趣味</Heading>
        <Description>入力すると趣味が表示されます。</Description>
        
        
        <TextFieldBox>
          
          {componentsArr}
          
          <IconButton
            onClick={() => handleCardPlayerEditFormHobbyTextFieldCountIncrement(_id)}
            disabled={buttonDisabled}
          >
            <IconAddCircle />
          </IconButton>
          
        </TextFieldBox>
        
        
        <SearchBox>
          <FormControlLabel
            control={
              <Checkbox
                checked={search}
                onChange={(event) => handleCardPlayerEditHobbySearch(event, _id)}
              />
            }
            label="趣味で検索可能にする"
          />
        </SearchBox>
        
      </React.Fragment>
    );
    
  }
  
};