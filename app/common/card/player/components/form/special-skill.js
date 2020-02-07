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
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputAdornment from '@material-ui/core/InputAdornment';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconAddCircle from '@material-ui/icons/AddCircle';
import IconRemoveCircle from '@material-ui/icons/RemoveCircle';




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
    
    const { classes, storeCardPlayer, intl, _id, specialSkillsObj } = this.props;
    
    const {
      
      handleCardPlayerEditFormData,
      handleCardPlayerAddSpecialSkillForm,
      handleCardPlayerRemoveSpecialSkillForm,
      
    } = storeCardPlayer;
    
    
    
    
    // --------------------------------------------------
    //   Component
    // --------------------------------------------------
    
    const componentsArr = [];
    
    for (const [index, value] of specialSkillsObj.valueArr.entries()) {
      
      componentsArr.push(
        <TextField
          css={css`
            && {
              width: 48%;
              margin-right: 12px;
              
              @media screen and (max-width: 480px) {
                width: 100%;
                margin-right: 0;
              }
            }
          `}
          id={`specialSkill-${index}`}
          value={value}
          onChange={(eventObj) => handleCardPlayerEditFormData({
            pathArr: [_id, 'specialSkillsObj', 'valueArr', index],
            value: eventObj.target.value
          })}
          margin="dense"
          variant="outlined"
          key={index}
          inputProps={{
            maxLength: 20,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => handleCardPlayerRemoveSpecialSkillForm({ _id, index })}
                >
                  <IconRemoveCircle />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      );
      
    }
    
    
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----- validationObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(validationObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   hobbyTextFieldCount: {green ${hobbyTextFieldCount}}
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
          特技
        </h3>
        
        
        <p>入力すると特技が表示されます。</p>
        
        
        <div
          css={css`
            display: flex;
            flex-flow: row wrap;
            align-items: center;
          `}
        >
          
          {/* フォーム */}
          {componentsArr}
          
          
          {/* フォーム追加ボタン */}
          <IconButton
            onClick={() => handleCardPlayerAddSpecialSkillForm({ _id })}
          >
            <IconAddCircle />
          </IconButton>
          
        </div>
        
        
        {/* 検索可能チェックボックス */}
        <div>
          <FormControlLabel
            classes={{
              label: classes.label
            }}
            control={
              <Checkbox
                checked={specialSkillsObj.search}
                onChange={(eventObj) => handleCardPlayerEditFormData({
                  pathArr: [_id, 'specialSkillsObj', 'search'],
                  value: eventObj.target.checked
                })}
              />
            }
            label="特技で検索可能にする"
          />
        </div>
        
        
      </React.Fragment>
    );
    
  }
  
});