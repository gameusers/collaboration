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

const { validationCardPlayersStatus } = require('../../../../../@database/card-players/validations/status');




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
    
    const { classes, storeCardPlayer, intl, _id, statusObj } = this.props;
    
    const { handleCardPlayerEditFormData } = storeCardPlayer;
    
    
    // --------------------------------------------------
    //   Validation
    // --------------------------------------------------
    
    const validationObj = validationCardPlayersStatus({ value: statusObj.value });
    
    
    
    
    // --------------------------------------------------
    //   Return
    // --------------------------------------------------
    
    return (
      <div
        css={css`
          border-top: 1px dashed #848484;
          margin: 24px 0 0 0;
          padding: 24px 0 0 0;
        `}
      >
        
        
        <TextField
          css={css`
            && {
              width: 400px;
              
              @media screen and (max-width: 480px) {
                width: 100%;
              }
            }
          `}
          id="status"
          label="ステータス"
          value={validationObj.value}
          onChange={(eventObj) => handleCardPlayerEditFormData({
            pathArr: [_id, 'statusObj', 'value'],
            value: eventObj.target.value
          })}
          error={validationObj.error}
          helperText={intl.formatMessage({ id: validationObj.messageID }, { numberOfCharacters: validationObj.numberOfCharacters })}
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
                checked={statusObj.search}
                onChange={(eventObj) => handleCardPlayerEditFormData({
                  pathArr: [_id, 'statusObj', 'search'],
                  value: eventObj.target.checked
                })}
              />
            }
            label="ステータスで検索可能にする"
          />
        </div>
        
        
      </div>
    );
    
  }
  
});