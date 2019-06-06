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

import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';


// ---------------------------------------------
//   Material UI / Icons
// ---------------------------------------------

import IconHeadsetMic from '@material-ui/icons/HeadsetMic';




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
    
    const { classes, storeCardPlayer, _id, value, comment, search } = this.props;
    
    const { handleCardPlayerEditFormData } = storeCardPlayer;
    
    
    // --------------------------------------------------
    //   console.log
    // --------------------------------------------------
    
    // console.log(`
    //   ----- ageObj -----\n
    //   ${util.inspect(ageObj, { colors: true, depth: null })}\n
    //   --------------------\n
    // `);
    
    // console.log(chalk`
    //   _id: {green ${_id}}
    //   value: {green ${value}}
    //   icon: {green ${icon}}
    //   comment: {green ${comment}}
    //   search: {green ${search}}
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
          ボイスチャット
        </h3>
        
        
        <p>入力するとボイスチャットについての情報が表示されます。</p>
        
        
        <div
          css={css`
            display: flex;
            flex-flow: row wrap;
            margin: 24px 0 0 0;
          `}
        >
        
          <div
            css={css`
              display: flex;
              flex-flow: row nowrap;
              margin: 3px 0 0 0;
            `}
          >
            <IconHeadsetMic
              css={css`
                && {
                  font-size: 24px;
                  margin: 0 6px 0 0;
                }
              `}
            />
            <div
              css={css`
                margin: 0 6px 0 0;
              `}
            >
              ボイスチャット:
            </div>
          </div>
        
        
          <FormControl>
            <Select
              value={value}
              onChange={(eventObj) => handleCardPlayerEditFormData({
                pathArr: [_id, 'voiceChatObj', 'value'],
                value: eventObj.target.value
              })}
              inputProps={{
                name: 'friend',
                id: 'friend',
              }}
            >
              <MenuItem value={true}>できる</MenuItem>
              <MenuItem value={false}>できない</MenuItem>
            </Select>
          </FormControl>
          
        </div>
        
        
        <div
          css={css`
            margin: 12px 0 0 0;
          `}
        >
          <TextareaAutosize
            css={css`
              && {
                width: 600px;
                max-width: 600px;
                border-radius: 4px;
                box-sizing: border-box;
                padding: 8px 12px;
                line-height: 1.8;
                
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
            value={comment}
            onChange={(eventObj) => handleCardPlayerEditFormData({
              pathArr: [_id, 'voiceChatObj', 'comment'],
              value: eventObj.target.value
            })}
            maxLength={3000}
          />
        </div>
        
        
        <div>
          <FormControlLabel
            classes={{
              label: classes.label
            }}
            control={
              <Checkbox
                checked={search}
                onChange={(eventObj) => handleCardPlayerEditFormData({
                  pathArr: [_id, 'voiceChatObj', 'search'],
                  value: eventObj.target.checked
                })}
              />
            }
            label="ボイスチャット欄の入力情報で検索可能にする"
          />
        </div>
        
        
      </React.Fragment>
    );
    
  }
  
});