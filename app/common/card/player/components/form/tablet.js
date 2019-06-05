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
import TextareaAutosize from 'react-autosize-textarea';

/** @jsx jsx */
import { css, jsx } from '@emotion/core';


// ---------------------------------------------
//   Material UI
// ---------------------------------------------

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';




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
    
    const { classes, storeCardPlayer, intl, _id, tabletObj } = this.props;
    
    const { handleCardPlayerEditFormData } = storeCardPlayer;
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----- tabletObj -----\n
    //   ${util.inspect(JSON.parse(JSON.stringify(tabletObj)), { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   _id: {green ${_id}}
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
          タブレット
        </h3>
        
        
        <p>入力するとタブレットについての情報が表示されます。現在、利用しているタブレットの情報を入力してください。</p>
        
        
        <TextField
          css={css`
            && {
              width: 400px;
              
              @media screen and (max-width: 480px) {
                width: 100%;
              }
            }
          `}
          id="smartphoneModel"
          label="モデル・機種名"
          value={tabletObj.model}
          onChange={(eventObj) => handleCardPlayerEditFormData({
            pathArr: [_id, 'tabletObj', 'model'],
            value: eventObj.target.value
          })}
          margin="normal"
          inputProps={{
            maxLength: 50,
          }}
        />
        
        
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
          value={tabletObj.comment}
          onChange={(eventObj) => handleCardPlayerEditFormData({
            pathArr: [_id, 'tabletObj', 'comment'],
            value: eventObj.target.value
          })}
          maxLength={3000}
        />
        
        
        <div>
          <FormControlLabel
            classes={{
              label: classes.label
            }}
            control={
              <Checkbox
                checked={tabletObj.search}
                onChange={(eventObj) => handleCardPlayerEditFormData({
                  pathArr: [_id, 'tabletObj', 'search'],
                  value: eventObj.target.checked
                })}
              />
            }
            label="タブレットの情報で検索可能にする"
          />
        </div>
        
        
      </React.Fragment>
    );
    
  }
  
});