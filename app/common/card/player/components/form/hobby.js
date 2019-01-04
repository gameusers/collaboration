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

const Container = styled.div`
  margin: 0;
  padding: 0;
`;

const TextFieldBox = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
`;


// ----------------------------------------
//   共通
// ----------------------------------------

const TextP = styled.p`
  font-size: 14px;
  line-height: 1.6em;
`;

const Title = styled.div`
  font-weight: bold;
  margin: 0 0 2px 0;
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
    this.props.stores.layout.handleButtonDisabledObj(`${this.props._id}-edit-form-hobby`, false);
  }
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, _id } = this.props;
    
    const { buttonDisabledObj } = stores.layout;
    
    const {
      
      cardPlayerEditFormHobbyTextFieldCountObj,
      handleCardPlayerEditFormHobbyTextFieldCountIncrement,
      handleCardPlayerEditFormHobbyTextFieldCountDecrement
      
    } = stores.cardPlayer;
    
    
    
    
    // --------------------------------------------------
    //   Button - Disabled
    // --------------------------------------------------
    
    let buttonDisabled = true;
    
    if (`${_id}-edit-form-hobby` in buttonDisabledObj) {
      buttonDisabled = buttonDisabledObj[`${_id}-edit-form-hobby`];
    }
    
    
    
    
    // --------------------------------------------------
    //   Component
    // --------------------------------------------------
    
    let hobbyTextFieldCount = 1;
    
    if (_id in cardPlayerEditFormHobbyTextFieldCountObj) {
      hobbyTextFieldCount = cardPlayerEditFormHobbyTextFieldCountObj[_id];
    }
    
    
    const componentsArr = [];
    
    for (let i = 0; i < hobbyTextFieldCount; i++) {
      
      if (i === 0) {
        
        componentsArr.push(
          <StyledTextField
            // id="outlined-bare"
            // defaultValue="Bare"
            margin="dense"
            variant="outlined"
            key={i}
          />
        );
        
      } else {
        
        componentsArr.push(
          <StyledTextField
            // id="outlined-bare"
            // defaultValue="Bare"
            margin="dense"
            variant="outlined"
            key={i}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => handleCardPlayerEditFormHobbyTextFieldCountDecrement(_id)}
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
      
    }
    
    
    
    
    // --------------------------------------------------
    //   Console 出力
    // --------------------------------------------------
    
    // console.log(`
    //   ----- usersLoginObj -----\n
    //   ${util.inspect(usersLoginObj, { colors: true, depth: null })}\n
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
        
        <Title>趣味</Title>
        <TextP>入力すると趣味が表示されます。</TextP>
        
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
                // checked={this.state.checkedA}
                // onChange={this.handleChange('checkedA')}
              />
            }
            label="趣味で検索可能にする"
          />
        </SearchBox>
        
      </Container>
    );
    
  }
  
};