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

import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const { validationCardPlayersSex, validationCardPlayersSexAlternativeText } = require('../../../../../@database/card-players/validations/sex');




// --------------------------------------------------
//   styled-components でスタイルシートを書いてください
//   参考: https://github.com/styled-components/styled-components
// --------------------------------------------------

const Heading = styled.div`
  font-weight: bold;
  margin: 0 0 2px 0;
`;

const Description = styled.p`
  
`;

const SelectBox = styled.div`
  margin: 12px 0 0 0;
`;

const StyledTextField = styled(TextField)`
  && {
    margin-right: 16px;
  }
`;

const SearchBox = styled.div`
  
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
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, intl, _id, sexObj } = this.props;
    
    const {
      
      handleCardPlayerEditFormData,
      handleCardPlayerEditSex,
      handleCardPlayerEditSexAlternativeText,
      
    } = stores.cardPlayer;
    
    
    // --------------------------------------------------
    //   Validation
    // --------------------------------------------------
    
    const validationValueObj = validationCardPlayersSex({ value: sexObj.value });
    const validationAlternativeTextObj = validationCardPlayersSexAlternativeText({ value: sexObj.alternativeText });
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----- ageObj -----\n
    //   ${util.inspect(ageObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   value: {green ${value}}
    //   alternativeText: {green ${alternativeText}}
    //   search: {green ${search}}
    //   age: {green ${age}}
    // `);
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <React.Fragment>
        
        
        <Heading>性別</Heading>
        
        <Description>性別を選択してください。選択すると性別が表示されます。選択肢以外の値を入力したい場合は、その他のフォームに入力してください。</Description>
        
        
        <SelectBox>
          <FormControl>
            <Select
              value={validationValueObj.value}
              onChange={(eventObj) => handleCardPlayerEditSex({ _id, value: eventObj.target.value })}
              inputProps={{
                name: 'sex',
                id: 'sex',
              }}
            >
              <MenuItem value={''}></MenuItem>
              <MenuItem value={'male'}>男性</MenuItem>
              <MenuItem value={'female'}>女性</MenuItem>
            </Select>
          </FormControl>
        </SelectBox>
        
        
        <StyledTextField
          id="sexAlternativeText"
          label="性別（その他）"
          value={validationAlternativeTextObj.value}
          onChange={(eventObj) => handleCardPlayerEditSexAlternativeText({ _id, value: eventObj.target.value })}
          error={validationAlternativeTextObj.error}
          helperText={intl.formatMessage({ id: validationAlternativeTextObj.messageCode }, { numberOfCharacters: validationAlternativeTextObj.numberOfCharacters })}
          margin="normal"
          inputProps={{
            maxLength: 20,
          }}
        />
        
        
        <SearchBox>
          <FormControlLabel
            control={
              <Checkbox
                checked={sexObj.earch}
                onChange={(eventObj) => handleCardPlayerEditFormData({
                  pathArr: [_id, 'sexObj', 'search'],
                  value: eventObj.target.checked
                })}
              />
            }
            label="性別で検索可能にする"
          />
        </SearchBox>
        
        
      </React.Fragment>
    );
    
  }
  
});