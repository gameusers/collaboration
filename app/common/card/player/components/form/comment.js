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
import TextareaAutosize from 'react-autosize-textarea';
import { injectIntl } from 'react-intl';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


// ---------------------------------------------
//   Validations
// ---------------------------------------------

const { validationCardPlayersComment } = require('../../../../../@database/card-players/validations/comment');




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
    
    const { classes, storeCardPlayer, intl, _id, commentObj } = this.props;
    
    const { handleCardPlayerEditFormData } = storeCardPlayer;
    
    
    // --------------------------------------------------
    //   Validation
    // --------------------------------------------------
    
    const validationObj = validationCardPlayersComment({ value: commentObj.value });
    
    
    
    
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
          コメント
        </h3>
        
        
        <TextareaAutosize
          css={css`
            && {
              width: 600px;
              max-width: 600px;
              border-radius: 4px;
              box-sizing: border-box;
              line-height: 1.8;
              margin: 6px 0 0 0;
              padding: 8px 12px;
              
              &:focus {
                outline: 1px #A9F5F2 solid;
              }
              
              @media screen and (max-width: 480px) {
                width: 100%;
                max-width: auto;
                resize: none;
              }
            }
          `}
          rows={5}
          placeholder="コメントを入力してください"
          value={validationObj.value}
          onChange={(eventObj) => handleCardPlayerEditFormData({
            pathArr: [_id, 'commentObj', 'value'],
            value: eventObj.target.value
          })}
          maxLength={3000}
        />
        
        
        <div
          css={css`
            margin: 0 0 10px 0;
          `}
        >
          <FormControlLabel
            classes={{
              label: classes.label
            }}
            control={
              <Checkbox
                checked={commentObj.search}
                onChange={(eventObj) => handleCardPlayerEditFormData({
                  pathArr: [_id, 'commentObj', 'search'],
                  value: eventObj.target.checked
                })}
              />
            }
            label="コメントで検索可能にする"
          />
        </div>
        
        
      </React.Fragment>
    );
    
  }
  
});