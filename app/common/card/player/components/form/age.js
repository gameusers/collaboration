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
import moment from 'moment';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { injectIntl } from 'react-intl';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const { validationCardPlayersAge, validationCardPlayersAgeAlternativeText } = require('../../../../../@database/card-players/validations/age');


// ---------------------------------------------
//   Moment Locale
// ---------------------------------------------

moment.locale('ja');




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
    
    const { stores, intl, _id, ageObj } = this.props;
    
    const {
      
      handleCardPlayerEditFormData,
      handleCardPlayerEditAge,
      handleCardPlayerEditAgeAlternativeText,
      
    } = stores.cardPlayer;
    
    
    // --------------------------------------------------
    //   Validation
    // --------------------------------------------------
    
    const validationValueObj = validationCardPlayersAge({ value: ageObj.value });
    const validationAlternativeTextObj = validationCardPlayersAgeAlternativeText({ value: ageObj.alternativeText });
    
    
    // --------------------------------------------------
    //   日付のフォーマット
    // --------------------------------------------------
    
    let formattedDate = '';
    
    if (validationValueObj.value) {
      formattedDate = moment(validationValueObj.value).format('YYYY-MM-DD');
    }
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----- ageObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(ageObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(`
    //   ----- validationValueObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(validationValueObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
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
        
        <Heading>年齢</Heading>
        
        <Description>入力すると年齢が表示されます。誕生日か、年齢（固定値）のどちらかを入力してください。</Description>
        
        
        <StyledTextField
          id="age"
          label="誕生日"
          type="date"
          value={formattedDate}
          onChange={(eventObj) => handleCardPlayerEditAge({ _id, value: eventObj.target.value })}
          error={validationValueObj.error}
          helperText={intl.formatMessage({ id: validationValueObj.messageCode }, { numberOfCharacters: validationValueObj.numberOfCharacters })}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        
        <StyledTextField
          id="ageAlternativeText"
          label="年齢（固定値）"
          value={validationAlternativeTextObj.value}
          onChange={(eventObj) => handleCardPlayerEditAgeAlternativeText({ _id, value: eventObj.target.value })}
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
                checked={ageObj.search}
                onChange={(eventObj) => handleCardPlayerEditFormData({
                  pathArr: [_id, 'ageObj', 'search'],
                  value: eventObj.target.checked
                })}
              />
            }
            label="年齢で検索可能にする"
          />
        </SearchBox>
        
      </React.Fragment>
    );
    
  }
  
});