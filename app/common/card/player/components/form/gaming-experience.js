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
import { injectIntl } from 'react-intl';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const validationCardPlayersGamingExperience = require('../../../../../@database/card-players/validations/gaming-experience');
const validationCardPlayersGamingExperienceAlternativeText = require('../../../../../@database/card-players/validations/gaming-experience-alternative-text');


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
    
    const { stores, intl, _id, gamingExperienceObj } = this.props;
    
    const {
      
      handleCardPlayerEditGamingExperience,
      handleCardPlayerEditGamingExperienceAlternativeText,
      handleCardPlayerEditGamingExperienceSearch
      
    } = stores.cardPlayer;
    
    
    // --------------------------------------------------
    //   Validation
    // --------------------------------------------------
    
    const validationValueObj = validationCardPlayersGamingExperience({ required: false, value: gamingExperienceObj.value });
    const validationAlternativeTextObj = validationCardPlayersGamingExperienceAlternativeText({ required: false, value: gamingExperienceObj.alternativeText });
    
    
    // --------------------------------------------------
    //   日付のフォーマット
    // --------------------------------------------------
    
    const formattedDate = moment(validationValueObj.value).format('YYYY-MM-DD');
    
    
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
        
        <Heading>ゲーム歴</Heading>
        
        <Description>入力するとゲーム歴が表示されます。ゲームを始めた日か、ゲーム歴（固定値）のどちらかを入力してください。</Description>
        
        
        <StyledTextField
          id="gamingExperience"
          label="ゲームを始めた日"
          type="date"
          value={formattedDate}
          onChange={(eventObj) => handleCardPlayerEditGamingExperience({ _id, value: eventObj.target.value })}
          error={validationValueObj.error}
          helperText={intl.formatMessage({ id: validationValueObj.messageCode }, { numberOfCharacters: validationValueObj.numberOfCharacters })}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        
        <StyledTextField
          id="gamingExperienceAlternativeText"
          label="ゲーム歴（固定値）"
          value={validationAlternativeTextObj.value}
          onChange={(eventObj) => handleCardPlayerEditGamingExperienceAlternativeText({ _id, value: eventObj.target.value })}
          error={validationValueObj.error}
          helperText={intl.formatMessage({ id: validationValueObj.messageCode }, { numberOfCharacters: validationValueObj.numberOfCharacters })}
          margin="normal"
          inputProps={{
            maxLength: 20,
          }}
        />
        
        <SearchBox>
          <FormControlLabel
            control={
              <Checkbox
                checked={gamingExperienceObj.search}
                onChange={(eventObj) => handleCardPlayerEditGamingExperienceSearch({ _id, value: eventObj.target.checked })}
              />
            }
            label="ゲーム歴で検索可能にする"
          />
        </SearchBox>
        
      </React.Fragment>
    );
    
  }
  
});