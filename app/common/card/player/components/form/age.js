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
  // line-height: 1.6em;
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
  
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { stores, _id, value, alternativeText, search } = this.props;
    
    const {
      
      handleCardPlayerEditBirthday,
      handleCardPlayerEditBirthdayAlternativeText,
      handleCardPlayerEditBirthdaySearch
      
    } = stores.cardPlayer;
    
    
    // --------------------------------------------------
    //   フォーマット
    // --------------------------------------------------
    
    const formattedDate = moment(value).format('YYYY-MM-DD');
    
    
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
        
        <Heading>年齢</Heading>
        
        <Description>入力すると年齢が表示されます。誕生日か、年齢（固定値）のどちらかを入力してください。</Description>
        
        
        <StyledTextField
          id="birthday"
          label="誕生日"
          type="date"
          value={formattedDate}
          onChange={(event) => handleCardPlayerEditBirthday(event, _id)}
          helperText="誕生日から年齢が自動で計算されます"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        
        <StyledTextField
          id="birthdayAlternativeText"
          label="年齢（固定値）"
          value={alternativeText}
          onChange={(event) => handleCardPlayerEditBirthdayAlternativeText(event, _id)}
          helperText="例えば17歳と入力すると、ずっと17歳に固定されます"
          margin="normal"
          inputProps={{
            maxLength: 20,
          }}
        />
        
        <SearchBox>
          <FormControlLabel
            control={
              <Checkbox
                checked={search}
                onChange={(event) => handleCardPlayerEditBirthdaySearch(event, _id)}
              />
            }
            label="年齢で検索可能にする"
          />
        </SearchBox>
        
      </React.Fragment>
    );
    
  }
  
};