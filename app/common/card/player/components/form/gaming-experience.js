// --------------------------------------------------
//   Import
// --------------------------------------------------

// ---------------------------------------------
//   Console
// ---------------------------------------------

import chalk from 'chalk';
import util from 'util';


// ---------------------------------------------
//   Node Packages
// ---------------------------------------------

import React from 'react';
import { inject, observer } from 'mobx-react';
import { injectIntl } from 'react-intl';
import moment from 'moment';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const { validationCardPlayersGamingExperience, validationCardPlayersGamingExperienceAlternativeText } = require('../../../../../@database/card-players/validations/gaming-experience');




// --------------------------------------------------
//   Material UI Style Overrides
//   https://material-ui.com/styles/basics/
// --------------------------------------------------

const stylesObj = {
  
  label: {
    fontSize: 14
  },
  
};




// --------------------------------------------------
//   Class
// --------------------------------------------------

@withStyles(stylesObj)
@inject('storeCardPlayer')
@observer
export default injectIntl(class extends React.Component {
  
  
  // --------------------------------------------------
  //   constructor
  // --------------------------------------------------
  
  constructor(props) {
    super(props);
  }
  
  
  // --------------------------------------------------
  //   render
  // --------------------------------------------------
  
  render() {
    
    
    // --------------------------------------------------
    //   Props
    // --------------------------------------------------
    
    const { classes, storeCardPlayer, intl, _id, gamingExperienceObj } = this.props;
    
    const {
      
      handleCardPlayerEditFormData,
      handleCardPlayerEditGamingExperience,
      handleCardPlayerEditGamingExperienceAlternativeText,
      
    } = storeCardPlayer;
    
    
    // --------------------------------------------------
    //   Validation
    // --------------------------------------------------
    
    const validationValueObj = validationCardPlayersGamingExperience({ value: gamingExperienceObj.value });
    const validationAlternativeTextObj = validationCardPlayersGamingExperienceAlternativeText({ value: gamingExperienceObj.alternativeText });
    
    
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
        
        
        <h3
          css={css`
            font-weight: bold;
            margin: 0 0 2px 0;
          `}
        >
          ゲーム歴
        </h3>
        
        
        <p>入力するとゲーム歴が表示されます。ゲームを始めた日か、ゲーム歴（固定値）のどちらかを入力してください。</p>
        
        
        <TextField
          css={css`
            && {
              width: 400px;
              
              @media screen and (max-width: 480px) {
                width: 100%;
              }
            }
          `}
          id="gamingExperience"
          label="ゲームを始めた日"
          type="date"
          value={formattedDate}
          onChange={(eventObj) => handleCardPlayerEditGamingExperience({ _id, value: eventObj.target.value })}
          error={validationValueObj.error}
          helperText={intl.formatMessage({ id: validationValueObj.messageID }, { numberOfCharacters: validationValueObj.numberOfCharacters })}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        
        
        <TextField
          css={css`
            && {
              width: 400px;
              
              @media screen and (max-width: 480px) {
                width: 100%;
              }
            }
          `}
          id="gamingExperienceAlternativeText"
          label="ゲーム歴（固定値）"
          value={validationAlternativeTextObj.value}
          onChange={(eventObj) => handleCardPlayerEditGamingExperienceAlternativeText({ _id, value: eventObj.target.value })}
          error={validationValueObj.error}
          helperText={intl.formatMessage({ id: validationValueObj.messageID }, { numberOfCharacters: validationValueObj.numberOfCharacters })}
          margin="normal"
          inputProps={{
            maxLength: 20,
          }}
        />
        
        
        <div>
          <FormControlLabel
            classes={{
              label: classes.label
            }}
            control={
              <Checkbox
                checked={gamingExperienceObj.search}
                onChange={(eventObj) => handleCardPlayerEditFormData({
                  pathArr: [_id, 'gamingExperienceObj', 'search'],
                  value: eventObj.target.checked
                })}
              />
            }
            label="ゲーム歴で検索可能にする"
          />
        </div>
        
        
      </React.Fragment>
    );
    
  }
  
});