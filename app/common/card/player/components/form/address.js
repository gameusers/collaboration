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

const { validationCardPlayersAddressAlternativeText } = require('../../../../../@database/card-players/validations/address');




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
    
    const { classes, storeCardPlayer, intl, _id, addressObj } = this.props;
    
    const { handleCardPlayerEditFormData } = storeCardPlayer;
    
    
    // --------------------------------------------------
    //   Validation
    // --------------------------------------------------
    
    const validationAlternativeTextObj = validationCardPlayersAddressAlternativeText({ value: addressObj.alternativeText });
    
    
    
    
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
          住所
        </h3>
        
        
        <p>入力すると住所が表示されます。公開される情報なので、あまり詳しい情報は載せないようにしましょう。</p>
        
        
        <TextField
          css={css`
            && {
              width: 400px;
              
              @media screen and (max-width: 480px) {
                width: 100%;
              }
            }
          `}
          id="addressAlternativeText"
          label="住所"
          value={validationAlternativeTextObj.value}
          onChange={(eventObj) => handleCardPlayerEditFormData({
            pathArr: [_id, 'addressObj', 'alternativeText'],
            value: eventObj.target.value
          })}
          error={validationAlternativeTextObj.error}
          helperText={intl.formatMessage({ id: validationAlternativeTextObj.messageID }, { numberOfCharacters: validationAlternativeTextObj.numberOfCharacters })}
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
                checked={addressObj.search}
                onChange={(eventObj) => handleCardPlayerEditFormData({
                  pathArr: [_id, 'addressObj', 'search'],
                  value: eventObj.target.checked
                })}
              />
            }
            label="住所で検索可能にする"
          />
        </div>
        
        
      </React.Fragment>
    );
    
  }
  
});