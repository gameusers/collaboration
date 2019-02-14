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
  font-size: 14px;
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
      
      handleCardPlayerEditAge,
      handleCardPlayerEditAgeAlternativeText,
      handleCardPlayerEditAgeSearch
      
    } = stores.cardPlayer;
    
    
    // --------------------------------------------------
    //   フォームの値
    // --------------------------------------------------
    
    const formValue = ageObj.value ? ageObj.value : '';
    const formValueError = ageObj.valueError ? ageObj.valueError : false;
    const formValueMessageID = ageObj.valueMessageID ? ageObj.valueMessageID : '4T_kAMjFU';
    const formValueNumberOfCharacters = ageObj.valueNumberOfCharacters ? ageObj.valueNumberOfCharacters : 0;
    
    const formAlternativeText = ageObj.alternativeText ? ageObj.alternativeText : '';
    const formAlternativeTextError = ageObj.alternativeTextError ? ageObj.alternativeTextError : false;
    const formAlternativeTextMessageID = ageObj.alternativeTextMessageID ? ageObj.alternativeTextMessageID : 'Qo5IGidJY';
    const formAlternativeTextNumberOfCharacters = ageObj.alternativeTextNumberOfCharacters ? ageObj.alternativeTextNumberOfCharacters : 0;
    
    const formSearch = ageObj.search ? ageObj.search : '';
    // const formSearchError = ageObj.searchError ? ageObj.searchError : false;
    // const formSearchMessageID = ageObj.searchMessageID ? ageObj.searchMessageID : 'Qo5IGidJY';
    // const formSearchNumberOfCharacters = ageObj.searchNumberOfCharacters ? ageObj.searchNumberOfCharacters : 0;
    
    
    // --------------------------------------------------
    //   フォーマット
    // --------------------------------------------------
    
    const formattedDate = moment(formValue).format('YYYY-MM-DD');
    
    
    // --------------------------------------------------
    //   Console 出力
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
        
        <Heading>年齢</Heading>
        
        <Description>入力すると年齢が表示されます。誕生日か、年齢（固定値）のどちらかを入力してください。</Description>
        
        
        <StyledTextField
          id="age"
          label="誕生日"
          type="date"
          value={formattedDate}
          onChange={(eventObj) => handleCardPlayerEditAge({ _id, value: eventObj.target.value })}
          error={formValueError}
          helperText={intl.formatMessage({ id: formValueMessageID }, { numberOfCharacters: formValueNumberOfCharacters })}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        
        <StyledTextField
          id="ageAlternativeText"
          label="年齢（固定値）"
          value={formAlternativeText}
          onChange={(eventObj) => handleCardPlayerEditAgeAlternativeText({ _id, value: eventObj.target.value })}
          error={formAlternativeTextError}
          helperText={intl.formatMessage({ id: formAlternativeTextMessageID }, { numberOfCharacters: formAlternativeTextNumberOfCharacters })}
          margin="normal"
          inputProps={{
            maxLength: 20,
          }}
        />
        
        <SearchBox>
          <FormControlLabel
            control={
              <Checkbox
                checked={formSearch}
                onChange={(eventObj) => handleCardPlayerEditAgeSearch({ _id, value: eventObj.target.checked })}
              />
            }
            label="年齢で検索可能にする"
          />
        </SearchBox>
        
      </React.Fragment>
    );
    
  }
  
});