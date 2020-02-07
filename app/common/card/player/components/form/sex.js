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
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const { validationCardPlayersSex, validationCardPlayersSexAlternativeText } = require('../../../../../@database/card-players/validations/sex');




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
    
    const { classes, storeCardPlayer, intl, _id, sexObj } = this.props;
    
    const {
      
      handleCardPlayerEditFormData,
      handleCardPlayerEditSex,
      handleCardPlayerEditSexAlternativeText,
      
    } = storeCardPlayer;
    
    
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
        
        
        <h3
          css={css`
            font-weight: bold;
            margin: 0 0 2px 0;
          `}
        >
          性別
        </h3>
        
        
        <p>性別を選択してください。選択すると性別が表示されます。選択肢以外の値を入力したい場合は、その他のフォームに入力してください。</p>
        
        
        <div
          css={css`
            margin: 12px 0 0 0;
          `}
        >
          <FormControl>
            <Select
              value={validationValueObj.value}
              onChange={(eventObj) => handleCardPlayerEditSex({ _id, value: eventObj.target.value })}
              inputProps={{
                name: 'sex',
                id: 'sex',
              }}
            >
              <MenuItem value={'empty'}></MenuItem>
              <MenuItem value={'male'}>男性</MenuItem>
              <MenuItem value={'female'}>女性</MenuItem>
            </Select>
          </FormControl>
        </div>
        
        
        <TextField
          css={css`
            && {
              width: 400px;
              
              @media screen and (max-width: 480px) {
                width: 100%;
              }
            }
          `}
          id="sexAlternativeText"
          label="性別（その他）"
          value={validationAlternativeTextObj.value}
          onChange={(eventObj) => handleCardPlayerEditSexAlternativeText({ _id, value: eventObj.target.value })}
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
                checked={sexObj.search}
                onChange={(eventObj) => handleCardPlayerEditFormData({
                  pathArr: [_id, 'sexObj', 'search'],
                  value: eventObj.target.checked
                })}
              />
            }
            label="性別で検索可能にする"
          />
        </div>
        
        
      </React.Fragment>
    );
    
  }
  
});